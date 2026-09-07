const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/walking-styles-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Keep the wandering-hand choice and route repeatable in this fixture.
 await page.addInitScript(()=>{let seed=17;Math.random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};});
 // Keep unrelated development edits from resetting a captured animation.
 await page.routeWebSocket(url=>url.hostname==='127.0.0.1'&&url.port==='3100',ws=>ws.send(JSON.stringify({type:'connected'})));
 // Force the rare event only in this fixture, so upright recovery can also be inspected.
 await page.route('**/finger-walk.ts*',async route=>{const response=await route.fetch(),source=await response.text(),forced=source.replace('this.random() < (this.style === "upright" ? 0.48 : 0.24)','true');assert.notEqual(source,forced);await route.fulfill({response,body:forced});});
 for(const live of [false,true]){
  await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/'+(live?'?mode=body':'avatar-review.html'));
  if(live){await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#idleCatch').selectOption('explore');await page.locator('#idleWalkStyle').selectOption('upright');await page.locator('#character').selectOption('olive-cape');await page.locator('#closeSettings').click();}
  else{await page.locator('#motion').selectOption('upright');await page.locator('#view').selectOption('quarter');}
  const state=()=>page.evaluate(live=>JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk),live),prefix=live?'live-cape':'rig-wrap';
  const wait=(phase,age=0)=>page.waitForFunction(({live,phase,age})=>{const s=JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk||'{}');return s.phase===phase&&s.age>=age;},{live,phase,age},{timeout:60000}).catch(async e=>{console.log(prefix,await state());throw e;});
  await wait('walk',.2);const thumbs=[],support=new Set(),swing=new Set();
  await page.evaluate(live=>{window.__stanceSamples=[];let previous;function sample(){const s=JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk);if(s.phase!=='walk')return;const p=s.toes[s.support];if(previous&&previous.support===s.support)window.__stanceSamples.push(Math.hypot(...p.map((v,k)=>v-previous.point[k])));previous={support:s.support,point:p};requestAnimationFrame(sample);}sample();},live);
  for(let i=0;i<32;i++){
   const s=await state();assert.equal(s.style,'upright');assert.equal(s.phase,'walk');assert(Math.abs(s.palmNormalY)<.11,'Palm remains vertical');thumbs.push(s.thumb);assert(Math.max(...s.knees)<.38,'Fingers stay nearly straight');
   for(const k of [1,2]){if(s.steps[k].lift===0){assert(Math.abs(s.toeHeights[k]-.024)<.025,'Biped stance reaches the floor');support.add(k);}else if(s.steps[k].lift>.025){assert(s.toeHeights[k]>.045,'Shallow swinging stride clears floor');swing.add(k);}}
   for(const k of [0,3])assert(s.toeHeights[k]>.12,'Other digits stay tucked above the floor');
   if(i%10===0)await page.screenshot({path:output+'/'+prefix+'-stride-'+i+'.png'});
   await page.waitForTimeout(140);
  }
  const stance=await page.evaluate(()=>window.__stanceSamples);assert(stance.length>30);assert(Math.max(...stance)<.002,'Actual loaded fingertip stays planted between rendered frames');
  assert.equal(support.size,2);assert.equal(swing.size,2);assert(Math.max(...thumbs)-Math.min(...thumbs)>1,'Thumb visibly participates in balancing');
  if(process.env.WALK_CONTACT_ONLY){
   if(live){await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(100);assert(['startle','rise','rejoin'].includes((await state()).phase));await page.keyboard.up('ArrowRight');await wait('rest');}
   else await page.locator('#motion').selectOption('idle');
   console.log(prefix,'rendered stance remains fixed through both supporting fingers and weight shifts; movement/idle exit passed');continue;
  }
  await wait('fall',.02);const first=await state(),pivot=first.pivot;
  const distance=(a,b)=>Math.hypot(...a.map((v,k)=>v-b[k]));
  const toe=first.toes.findIndex(p=>distance(p,pivot)<.001);assert(toe>=0,'Fall starts at a rendered planted fingertip');
  await page.evaluate(({live,pivot,toe})=>{
   window.__fingerPivotSamples=[];
   function sample(){const s=JSON.parse((live?document.querySelector('#world'):document.body).dataset.fingerWalk);if(!['fall','fallen','recover'].includes(s.phase))return;window.__fingerPivotSamples.push(Math.hypot(...s.toes[toe].map((v,k)=>v-pivot[k])));requestAnimationFrame(sample);}sample();
  },{live,pivot,toe});
  const captured=new Set();
  for(let frame=0;frame<50;frame++){
   const s=await state();if(!['fall','fallen','recover'].includes(s.phase))break;
   assert(distance(s.toes[toe],pivot)<.002,'Actual rendered pivot fingertip remains fixed');assert(Math.min(s.toeHeights[1],s.toeHeights[2])>.020,'Neither walking finger tips through the floor');
   if(!captured.has(s.phase)&&s.age>(s.phase==='fall'?.2:s.phase==='recover'?.35:.05)){await page.screenshot({path:output+'/'+prefix+'-'+s.phase+'.png'});captured.add(s.phase);}
   await page.waitForTimeout(70);
  }
  const samples=await page.evaluate(()=>window.__fingerPivotSamples);assert(samples.length>8);assert(Math.max(...samples)<.002,'Rendered contact stays fixed between screenshots');assert(captured.has('fallen')&&captured.has('recover'));await wait('dazed',.3);await page.screenshot({path:output+'/'+prefix+'-dazed.png'});
  if(live){await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(100);assert(['startle','rise','rejoin'].includes((await state()).phase));await page.keyboard.up('ArrowRight');await wait('rest');}
  else await wait('walk');
  console.log(prefix,'two alternating planted/swing fingers, upright palm, tucked spare digits, moving thumb and recovery passed');
 }
 assert.deepEqual(errors,[]);
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
