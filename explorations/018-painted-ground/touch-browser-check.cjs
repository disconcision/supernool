const {chromium,devices}=require('playwright');
const assert=require('node:assert/strict');
const {mkdirSync}=require('node:fs');
const origin=process.env.SUPERNOOL_TEST_ORIGIN??'http://127.0.0.1:3100';
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 mkdirSync('.cache/touch-check',{recursive:true});
 try{
  const context=await browser.newContext({...devices['iPhone 13'],deviceScaleFactor:1});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const ready=()=>page.waitForFunction(()=>document.querySelector('#world')?.dataset.meshing==='ready',null,{timeout:60000});
  await page.goto(origin);await ready();assert.equal(await page.locator('#inputMode').inputValue(),'mouse');
  const cdp=await context.newCDPSession(page);
  const touch=(type,points)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:points.map(p=>({x:p.x,y:p.y,id:p.id??1,radiusX:5,radiusY:5,force:1}))});
  const open=()=>page.getByRole('button',{name:'Open Encounter',exact:true}).tap();
  const close=()=>page.getByRole('button',{name:'Collapse Encounter',exact:true}).tap();
  await open();await page.locator('#inputMode').selectOption('body');await page.reload();await ready();assert.equal(await page.locator('#inputMode').inputValue(),'body','Manual choice survives reload');
  await open();await page.locator('#inputMode').selectOption('mouse');await close();
  // Ground tapping must move the traveller without requiring the Approach button.
  const before=await page.locator('#world').getAttribute('data-player');
  await page.screenshot({path:'.cache/touch-check/phone-start.png'});await page.touchscreen.tap(195,470);await page.waitForFunction(p=>document.querySelector('#world').dataset.player!==p,before);console.log('Phone default, manual mode persistence and ground tap passed.');
  await open();await page.locator('#approach').tap();await close();
  await page.waitForFunction(()=>document.querySelector('#world').dataset.near==='true',null,{timeout:60000});await page.waitForTimeout(3000);
  await page.screenshot({path:'.cache/touch-check/phone-ready.png'});
  async function route(){
   await open();await page.locator('#hint').tap();await close();await page.waitForTimeout(200);
   return page.evaluate(()=>{const i=parseInt(document.querySelector('.spell.active').textContent)-1,a=document.querySelector('[data-role="source"]'),b=document.querySelectorAll('[data-role="destination"]')[i];return {from:{x:+a.getAttribute('cx'),y:+a.getAttribute('cy')-5},to:{x:+b.getAttribute('cx'),y:+b.getAttribute('cy')},rule:b.getAttribute('data-rule')};});
  }
  async function drag(r,fraction=1){for(let i=1;i<=20;i++){await touch('touchMove',[{x:r.from.x+(r.to.x-r.from.x)*fraction*i/20,y:r.from.y+(r.to.y-r.from.y)*fraction*i/20}]);await page.waitForTimeout(25);}}
  let r=await route();const term=await page.locator('#world').getAttribute('data-term');
  await touch('touchStart',[r.from]);await drag(r,.4);await page.screenshot({path:'.cache/touch-check/phone-midpoint.png'});
  await touch('touchCancel',[]);await page.waitForFunction(()=>document.querySelector('#world').dataset.busy==='false');assert.equal(await page.locator('#world').getAttribute('data-term'),term,'Cancelled touch cannot commit');
  for(let step=0;step<6;step++){
   r=await route();console.log('Touch route',step,r);
   await touch('touchStart',[r.from]);await page.waitForFunction(()=>document.querySelector('#world').dataset.grip!=='none');
   if(step===0){
    await page.evaluate(()=>{window.touchLog=[];for(const type of ['pointerdown','pointerup','pointercancel','lostpointercapture'])document.querySelector('canvas').addEventListener(type,e=>window.touchLog.push({type,id:e.pointerId,primary:e.isPrimary,x:e.clientX,y:e.clientY}));});
    await touch('touchStart',[r.from,{x:350,y:650,id:2}]);
    await touch('touchMove',[r.from,{x:320,y:600,id:2}]);
    // Lift only the secondary contact; keep the original finger on its rune.
    await touch('touchEnd',[{x:320,y:600,id:2}]);await page.waitForTimeout(100);
    assert(await page.evaluate(()=>window.touchLog.some(e=>e.type==='pointerup'&&!e.primary)),'Secondary finger actually lifted');
    assert.notEqual(await page.locator('#world').getAttribute('data-grip'),'none','Second finger must not release the first grip');
    assert.equal(await page.locator('#world').getAttribute('data-caught'),'false','Second finger must not advance a grip');
   }
   await drag(r);await page.screenshot({path:'.cache/touch-check/phone-drag-'+step+'.png'});await page.waitForFunction(()=>document.querySelector('#world').dataset.caught==='true',null,{timeout:10000});
   await touch('touchEnd',[]);await page.waitForFunction(()=>document.querySelector('#world').dataset.busy==='false');
  }
  assert.equal(await page.locator('#world').getAttribute('data-goal'),'true');await page.screenshot({path:'.cache/touch-check/phone-complete.png'});
  assert.deepEqual(errors,[]);console.log('Six touch-only rewrites, mid-drag cancellation, second-finger isolation, and phone screenshots passed.');await context.close();
  for(const [name,options,mode,path]of[
   ['tablet',devices['iPad Pro 11'],'mouse','/'],
   ['desktop',{viewport:{width:1280,height:720}},'body','/'],
   ['narrow desktop',{viewport:{width:390,height:844}},'body','/'],
   ['explicit mobile body',devices['iPhone 13'],'body','/?mode=body&mobileTest=1#touch'],
   ['explicit desktop pointer',{viewport:{width:1280,height:720}},'mouse','/explorations/018-painted-ground/?mode=mouse']
  ]){
   const ctx=await browser.newContext({...options,deviceScaleFactor:1}),p=await ctx.newPage();
   await p.goto(origin+path);await p.waitForFunction(()=>document.querySelector('#world')?.dataset.meshing==='ready',null,{timeout:60000});assert.equal(await p.locator('#inputMode').inputValue(),mode,name);
   if(name==='explicit mobile body'){assert.equal(new URL(p.url()).searchParams.get('mobileTest'),'1');assert.equal(new URL(p.url()).hash,'#touch');}
   if(name==='tablet')await p.screenshot({path:'.cache/touch-check/tablet.png'});
   console.log(name,'default passed');await ctx.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
