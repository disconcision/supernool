const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 page.setDefaultTimeout(30000);
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text()+' '+m.location().url);});
 await page.route('**/favicon.ico',route=>route.fulfill({status:204}));
 await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/notes.html');
 const pixels=await page.evaluate(async()=>{
  const T=await import('/node_modules/.vite/deps/three.js');
  const {createMist}=await import('/explorations/018-painted-ground/mist.ts');
  const {makeSigil}=await import('/explorations/018-painted-ground/sigils.ts');
  const renderer=new T.WebGLRenderer({preserveDrawingBuffer:true});renderer.setSize(256,256);
  const scene=new T.Scene(),camera=new T.OrthographicCamera(-2,2,2,-2,.1,100);camera.position.z=10;camera.updateMatrixWorld();
  scene.add(new T.HemisphereLight(0xffffff,0xffffff,2));
  const add=(color,x,y,z,size,overlay=false,order=0,depth=true)=>{
   const m=new T.Mesh(new T.PlaneGeometry(size,size),new T.MeshBasicMaterial({color,transparent:overlay,depthTest:depth,depthWrite:depth}));
   m.position.set(x,y,z);m.userData.mistOverlay=overlay;m.renderOrder=order;scene.add(m);return m;
  };
  add('#304329',0,0,-30,100);
  const sigil=makeSigil('+',true,false,'raised');scene.add(sigil);
  add('#ff0000',-.2,0,1,.2,true,20); // A hand over the badge.
  add('#ffff00',-.2,0,2,.06,true,30,false); // Guide above that hand.
  add('#ff0000',1,0,0,.3,true,20); // Another hand behind solid world geometry.
  add('#0000ff',1,0,1,.4);
  const hidden=add('#ff00ff',0,0,3,1,true,30,false);hidden.visible=false;
  const mist=createMist(renderer),gl=renderer.getContext();
  const sample=()=>{const data=new Uint8Array(256*256*4);gl.readPixels(0,0,256,256,gl.RGBA,gl.UNSIGNED_BYTE,data);
   const get=(x,y)=>Array.from(data.slice((y*256+x)*4,(y*256+x)*4+3));
   return {sigil:get(128,128),hand:get(115,132),guide:get(115,128),occludedHand:get(192,128),landscape:get(20,20)};};
  const render=enabled=>{mist.render(scene,camera,0,{enabled,strength:1,radius:5,texture:0,speed:0});return sample();};
  const clear=render(false),fog=render(true),clearAgain=render(false);
  const restored={camera:camera.layers.mask,hidden:hidden.visible,autoClear:renderer.autoClear,layer:sigil.layers.mask};
  renderer.dispose();return {clear,fog,clearAgain,restored};
 });
 for(const probe of ['sigil','hand','guide','occludedHand'])assert.deepEqual(pixels.fog[probe],pixels.clear[probe],probe+' must preserve color / occlusion');
 assert.deepEqual(pixels.clear.occludedHand,[0,0,255]);
 assert.deepEqual(pixels.clear.hand,[255,0,0]);assert.deepEqual(pixels.clear.guide,[255,255,0]);
 assert.ok(pixels.fog.landscape[0]>pixels.clear.landscape[0]+50,'Background fog must remain visible');
 assert.deepEqual(pixels.clearAgain,pixels.clear,'Bypass must still work after fog');
 assert.deepEqual(pixels.restored,{camera:1,hidden:false,autoClear:true,layer:1});
 console.log('Depth/overlay pixel regression:',pixels);
 await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');
 await page.waitForFunction(()=>document.querySelector('#world')?.dataset.meshing==='ready');
 await page.getByRole('button',{name:'Open Encounter',exact:true}).click();await page.locator('#approach').click();
 await page.waitForFunction(()=>document.querySelector('#world').dataset.near==='true');await page.waitForTimeout(2800);
 await page.locator('#world canvas').focus();await page.keyboard.press('Space');
 await page.evaluate(()=>{for(const [id,v] of Object.entries({mistDensity:1,mistTexture:3,mistSpeed:0,mistRadius:7})){const e=document.getElementById(id);e.value=String(v);e.dispatchEvent(new Event('input',{bubbles:true}));}});
 await page.addStyleTag({content:'.dock {visibility:hidden !important}'});
 await page.locator('#world canvas').focus();await page.keyboard.press('h');await page.waitForTimeout(500);
 fs.mkdirSync('.cache/mist-overlay',{recursive:true});
 await page.screenshot({path:'.cache/mist-overlay/selection.png'});
 await page.keyboard.down('Space');await page.waitForFunction(()=>document.querySelector('#world').dataset.controlPhase==='pull');await page.waitForTimeout(800);
 await page.screenshot({path:'.cache/mist-overlay/grip.png'});
 await page.keyboard.up('Space');await page.keyboard.press('Escape');
 await page.locator('#inputMode').selectOption('mouse',{force:true});
 await page.locator('#world canvas').focus();await page.keyboard.press('h');await page.waitForTimeout(200);
 const route=await page.evaluate(()=>{const i=parseInt(document.querySelector('.spell.active').textContent)-1,a=document.querySelector('[data-role="source"]'),b=document.querySelectorAll('[data-role="destination"]')[i];return {i,x:+a.getAttribute('cx'),y:+a.getAttribute('cy'),u:+b.getAttribute('cx'),v:+b.getAttribute('cy')};});
 await page.mouse.move(route.x,route.y-5);await page.mouse.down();await page.keyboard.press(String(route.i+1));
 await page.mouse.move(route.x+(route.u-route.x)*.45,route.y+(route.v-route.y)*.45,{steps:15});await page.waitForTimeout(650);
 await page.screenshot({path:'.cache/mist-overlay/tween.png'});
 await page.mouse.up();await page.waitForFunction(()=>document.querySelector('#world').dataset.busy==='false');
 for(const mode of ['layered','legacy']){
  await page.locator('#sigils').selectOption(mode,{force:true});await page.waitForTimeout(300);
  await page.screenshot({path:'.cache/mist-overlay/'+mode+'.png'});
 }
 assert.deepEqual(errors,[]);console.log('Live selection, grip, tween, layered and legacy screenshots captured without errors.');
 }finally{await browser.close();}})();
