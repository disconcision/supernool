const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/catch-anticipation-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.routeWebSocket(url=>url.hostname==='127.0.0.1'&&url.port==='3100',ws=>ws.send(JSON.stringify({type:'connected'})));
 await page.addInitScript(()=>{let seed=17;Math.random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};});
 for(const character of (process.env.CATCH_FIGURES??'blue-wrap,olive-cape').split(',')){
  await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
  await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#idleCatch').selectOption('catch-only');await page.locator('#character').selectOption(character);await page.locator('#closeSettings').click();
  await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).phase==='scout',null,{timeout:90000});
  // Capture continuously before the brief wind-up begins, even if screenshot commands are slow.
  await page.evaluate(()=>{window.__pickup=[];window.__anticipation=[];function frame(){const s=JSON.parse(document.querySelector('#world').dataset.idleCatch);if(s.phase==='scout')window.__pickup.push(s);if(['windup','throw','flight'].includes(s.phase))window.__anticipation.push(s);if(s.phase!=='flight')requestAnimationFrame(frame);}frame();});
  await page.waitForTimeout(600);await page.screenshot({path:output+'/'+character+'-local-pickup.png'});
  await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).phase==='windup',null,{timeout:15000});
  const pickup=await page.evaluate(()=>window.__pickup),start=pickup[0].hands[pickup[0].holder].position,stone=pickup[0].position;
  assert(Math.hypot(start[0]-stone[0],start[2]-stone[2])<=1.63,'Catch begins from a stone near the initiating hand');
  for(const s of pickup){const p=s.hands[s.holder].position;assert(Math.hypot(p[0]-start[0],p[2]-start[2])<1.85,'Pickup stays local without crossing back through the body');}

  await page.screenshot({path:output+'/'+character+'-ready.png'});
  await page.waitForFunction(()=>{const s=JSON.parse(document.querySelector('#world').dataset.idleCatch);return s.phase==='windup'&&s.age>s.windupTime*.3;});
  await page.screenshot({path:output+'/'+character+'-feint.png',clip:{x:370,y:480,width:550,height:300}});
  await page.waitForFunction(()=>{const s=JSON.parse(document.querySelector('#world').dataset.idleCatch);return s.phase==='windup'&&s.age>s.windupTime*.7;});
  await page.screenshot({path:output+'/'+character+'-anticipate.png',clip:{x:370,y:480,width:550,height:300}});
  await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).phase==='flight');
  const samples=await page.evaluate(()=>window.__anticipation),wind=samples.filter(s=>s.phase==='windup'),receiver=1-wind[0].holder;
  assert(wind.length>15,'Captured the complete anticipation interval');assert(Math.min(...wind.map(s=>s.cue))<-.35&&Math.max(...wind.map(s=>s.cue))>.35,'Thrower feints in both directions');
  const first=wind[0].hands[receiver].position,travel=Math.max(...wind.map(s=>Math.hypot(...s.hands[receiver].position.map((v,k)=>v-first[k]))));assert(travel>.15,'Waiting hand visibly repositions');
  assert(wind.some(s=>Math.abs(s.readCue-s.cue)>.2),'Receiver trails the visible cue');
  await page.screenshot({path:output+'/'+character+'-release.png'});
  await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(100);await page.keyboard.up('ArrowRight');
  await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).phase==='rest');
  console.log(character,'feint, delayed anticipation, release and walking exit passed; receiver travel',travel.toFixed(3));
 }
 assert.deepEqual(errors,[]);
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
