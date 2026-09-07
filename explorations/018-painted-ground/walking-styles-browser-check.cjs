const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/walking-styles-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Keep unrelated development edits from resetting a captured animation.
 await page.routeWebSocket(url=>url.hostname==='127.0.0.1'&&url.port==='3100',ws=>ws.send(JSON.stringify({type:'connected'})));
 // Force the rare event only in this fixture, so upright recovery can also be inspected.
 await page.route('**/finger-walk.ts*',async route=>{const response=await route.fetch(),source=await response.text(),forced=source.replace('this.random() < (this.style === "upright" ? 0.48 : 0.24)','true');assert.notEqual(source,forced);await route.fulfill({response,body:forced});});
 for(const live of [false,true]){
  await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/'+(live?'?mode=body':'avatar-review.html'));
  if(live){await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#idleCatch').selectOption('explore');await page.locator('#idleWalkStyle').selectOption('upright');await page.locator('#character').selectOption('olive-cape');await page.locator('#closeSettings').click();}
  else{await page.locator('#motion').selectOption('upright');await page.locator('#view').selectOption('quarter');}
  const state=()=>page.evaluate(live=>JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk),live),prefix=live?'live-cape':'rig-wrap';
  const wait=(phase,age=0)=>page.waitForFunction(({live,phase,age})=>{const s=JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk||'{}');return s.phase===phase&&s.age>=age;},{live,phase,age},{timeout:60000});
  await wait('walk',.2);const thumbs=[],support=new Set(),swing=new Set();
  for(let i=0;i<32;i++){
   const s=await state();assert.equal(s.style,'upright');assert.equal(s.phase,'walk');assert(Math.abs(s.palmNormalY)<.11,'Palm remains vertical');thumbs.push(s.thumb);
   for(const k of [1,2]){if(s.steps[k].lift===0){assert(Math.abs(s.toeHeights[k]-.024)<.025,'Biped stance reaches the floor');support.add(k);}else if(s.steps[k].lift>.08){assert(s.toeHeights[k]>.09,'Long swinging stride clears floor');swing.add(k);}}
   for(const k of [0,3])assert(s.toeHeights[k]>.12,'Other digits stay tucked above the floor');
   if(i%10===0)await page.screenshot({path:output+'/'+prefix+'-stride-'+i+'.png'});
   await page.waitForTimeout(140);
  }
  assert.equal(support.size,2);assert.equal(swing.size,2);assert(Math.max(...thumbs)-Math.min(...thumbs)>1,'Thumb visibly participates in balancing');
  for(const [phase,age] of [['fallen',.05],['recover',.4],['dazed',.3]]){await wait(phase,age);await page.screenshot({path:output+'/'+prefix+'-'+phase+'.png'});}
  if(live){await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(100);assert(['rise','rejoin'].includes((await state()).phase));await page.keyboard.up('ArrowRight');await wait('rest');}
  else await wait('walk');
  console.log(prefix,'two alternating planted/swing fingers, upright palm, tucked spare digits, moving thumb and recovery passed');
 }
 assert.deepEqual(errors,[]);
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
