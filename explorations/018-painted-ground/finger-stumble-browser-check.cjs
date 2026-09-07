const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/finger-stumble-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Keep unrelated development edits from resetting a captured animation.
 await page.routeWebSocket(url=>url.hostname==='127.0.0.1'&&url.port==='3100',ws=>ws.send(JSON.stringify({type:'connected'})));
 // Seed only the walking controller and force the chance roll, preserving its random sequence.
 await page.route('**/finger-walk.ts*',async route=>{const response=await route.fetch(),source=await response.text(),forced=source.replace('constructor(random = Math.random)', 'constructor(random = (() => { let seed = 1; return () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; }; })())').replace('this.random() < (this.style === \"upright\" ? 0.48 : 0.24)', '(this.random(), true)');assert.notEqual(source,forced);await route.fulfill({response,body:forced});});
 for(const live of [false,true]){
  await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/'+(live?'?mode=body':'avatar-review.html'));
  if(live){await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#idleCatch').selectOption('explore');await page.locator('#idleWalkStyle').selectOption('spider');await page.locator('#character').selectOption('olive-cape');await page.locator('#closeSettings').click();}
  else{await page.locator('#motion').selectOption('inspect');await page.locator('#view').selectOption('quarter');}
  const prefix=live?'live-cape':'rig-wrap',state=()=>page.evaluate(live=>JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk),live);
  const wait=(phase,age=0)=>page.waitForFunction(({live,phase,age})=>{const s=JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk||'{}');return s.phase===phase&&s.age>=age;},{live,phase,age},{timeout:55000});
  let distance,minToe=Infinity;
  for(const [phase,age] of [['walk',.5],['fall',.2],['fallen',.05],['recover',.35],['dazed',.45]]){
   await wait(phase,age);const s=await state();
   if(phase==='fall')distance=s.distance;
   if(['fallen','recover','dazed'].includes(phase))assert.equal(s.distance,distance,'No travel while recovering');
   if(s.toeHeights)minToe=Math.min(minToe,...s.toeHeights);
   await page.screenshot({path:output+'/'+prefix+'-'+phase+'.png'});
  }
  await wait('walk');assert((await state()).distance>=distance);console.log(prefix,{minToe,distance});
  if(live){await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(100);assert(['rise','rejoin'].includes((await state()).phase));await page.keyboard.up('ArrowRight');await wait('rest');assert(+(await page.locator('#world').getAttribute('data-idle-cooldown'))>11);}
 }
 assert.deepEqual(errors,[]);console.log('Chrome: close-up and live-camera fall, pause, recovery, daze, resumed walk and movement return passed.');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
