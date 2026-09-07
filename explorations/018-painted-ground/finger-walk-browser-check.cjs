const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/finger-walk-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1920,height:1200}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.env.SCENE_URL??'http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');
 await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
 await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#idleCatch').selectOption('explore');await page.locator('#closeSettings').click();
 const state=()=>page.evaluate(()=>JSON.parse(document.querySelector('#world').dataset.fingerWalk));
 const walking=()=>page.waitForFunction(()=>{const s=JSON.parse(document.querySelector('#world').dataset.fingerWalk);return s.phase==='walk'&&s.distance>.3;},null,{timeout:50000});
 await walking();const first=await state();await page.screenshot({path:output+'/live-walk-1.png'});
 let samples=0,swings=0;
 for(let i=0;i<16;i++){
  const s=await state();if(s.phase!=='walk')break;
  if(s.toeHeights)for(let k=0;k<4;k++){if(s.steps[k].lift===0){assert(Math.abs(s.toeHeights[k])<.075,'Actual imported fingertip supports the ground');samples++;}else if(s.steps[k].lift>.06){assert(s.toeHeights[k]>.045,'Swing toe lifts clear');swings++;}}
  await page.waitForTimeout(90);
 }
 assert(samples>8&&swings>2);await page.screenshot({path:output+'/live-walk-2.png'});
 await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.fingerWalk).phase==='rest');
 assert(+(await page.locator('#world').getAttribute('data-idle-cooldown'))>11);
 await page.waitForTimeout(10000);assert.equal((await state()).phase,'rest','Shared quiet interval');
 await walking();const second=await state();assert.notEqual(first.hand,second.hand,'Both hands take walks');assert.notDeepEqual(first.route,second.route,'Routes vary');
 await page.screenshot({path:output+'/other-hand.png'});
 await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(120);assert(['rise','rejoin'].includes((await state()).phase));await page.keyboard.up('ArrowRight');
 await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.fingerWalk).phase==='rest');
 // Same walking gait on the second figure.
 await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#character').selectOption('olive-cape');await page.locator('#closeSettings').click();
 await walking();await page.screenshot({path:output+'/cape-walk.png'});
 assert.deepEqual(errors,[]);console.log('Chrome: both hands and art figures finger-walk on the live ground; actual supporting/swing toe heights, varied routes, quiet cooldown and graceful movement exit passed.',{samples,swings});
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
