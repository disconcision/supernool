const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const origin=process.env.SUPERNOOL_TEST_ORIGIN??'http://127.0.0.1:3100';
const {mkdirSync}=require('node:fs');mkdirSync('.cache/release-browser',{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(origin+'/explorations/018-painted-ground/?mode=body');
await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
await page.getByRole('button',{name:'Open Encounter',exact:true}).click();
if(process.env.AVATAR){await page.locator('#settingsButton').click();await page.locator('#character').selectOption(process.env.AVATAR);await page.waitForFunction(n=>document.querySelector('#world').dataset.character===n,process.env.AVATAR);await page.locator('#closeSettings').click();}
await page.locator('#approach').click();
await page.waitForFunction(()=>document.querySelector('#world').dataset.near==='true');await page.waitForTimeout(2600);
await page.locator('#world canvas').focus();await page.keyboard.press('Space');
await page.waitForFunction(()=>document.querySelector('#world').dataset.controlPhase==='hand');
await page.locator('#hudToggle').click();await page.screenshot({path:'.cache/release-browser/sigils-raised.png'});await page.keyboard.press('Escape');
// Do the first five legal grips with the actual mouse. Finish in body mode.
if(!process.env.BODY_ALL)await page.locator('#inputMode').selectOption('mouse');
for(let step=0;step<6;step++){
 if(step===5&&!process.env.BODY_ALL){await page.locator('#inputMode').selectOption('body');await page.locator('#world canvas').focus();await page.keyboard.press('Space');}
 await page.locator('#world canvas').focus();await page.keyboard.press('h');await page.waitForTimeout(150);
 const route=await page.evaluate(()=>{const active=document.querySelector('.spell.active'),i=parseInt(active.textContent)-1;const a=document.querySelector('[data-role="source"]'),b=document.querySelectorAll('[data-role="destination"]')[i];return {i,from:{x:+a.getAttribute('cx'),y:+a.getAttribute('cy')},to:{x:+b.getAttribute('cx'),y:+b.getAttribute('cy')},rule:b.getAttribute('data-rule')};});
 console.log(step,route);
 if(step<5&&!process.env.BODY_ALL){await page.mouse.move(route.from.x,route.from.y-5);await page.mouse.down();await page.keyboard.press(String(route.i+1));if(step===2||step===3){const dx=route.to.x-route.from.x,dy=route.to.y-route.from.y,l=Math.hypot(dx,dy);
 await page.mouse.move(route.from.x+dx*.3,route.from.y+dy*.3,{steps:8});
 await page.mouse.move(route.from.x+dx*.84-dy/l*100,route.from.y+dy*.84+dx/l*100,{steps:15});
 }else await page.mouse.move(route.to.x,route.to.y,{steps:30});}
 else {
  await page.keyboard.down('Space');await page.keyboard.press(String(route.i+1));
  // A feedback controller acting only through real arrow key input and DOM telemetry.
  const initial=(await page.locator('#world').getAttribute('data-player')).split(',').map(Number);
  const right=[21/Math.hypot(13,21),-13/Math.hypot(13,21)],forward=[right[1],-right[0]]; // corrected below: camera forward basis = (right.z, -right.x)
  const gain=+(await page.locator('#world').getAttribute('data-pull-gain'));const target=[(route.to.x-route.from.x)/gain,-(route.to.y-route.from.y)/gain];
  let held=new Set();
  for(let t=0;t<120;t++){
   if(await page.locator('#world').getAttribute('data-caught')==='true')break;
   const p=(await page.locator('#world').getAttribute('data-player')).split(',').map(Number),d=[p[0]-initial[0],p[1]-initial[1]];
   const ex=target[0]-(d[0]*right[0]+d[1]*right[1]),ey=target[1]-(d[0]*forward[0]+d[1]*forward[1]);
   const next=new Set();if(Math.abs(ex)>.025)next.add(ex>0?'ArrowRight':'ArrowLeft');if(Math.abs(ey)>.025)next.add(ey>0?'ArrowUp':'ArrowDown');
   for(const k of held)if(!next.has(k))await page.keyboard.up(k);for(const k of next)if(!held.has(k))await page.keyboard.down(k);held=next;await page.waitForTimeout(50);
  }
  for(const k of held)await page.keyboard.up(k);
 }
 await page.waitForFunction(()=>document.querySelector('#world').dataset.caught==='true',{timeout:10000});
 if(step===2){assert.equal(await page.locator('[data-role="pull-cursor"]').count(),0);await page.screenshot({path:'.cache/release-browser/identity-forgiving-catch.png'});}
 if(step===0)await page.screenshot({path:'.cache/release-browser/catch-feedback.png'});
 if(step<5&&!process.env.BODY_ALL)await page.mouse.up();else await page.keyboard.up('Space');
 await page.waitForFunction(()=>document.querySelector('#world').dataset.busy==='false');
 if(process.env.BODY_ALL){await page.waitForTimeout(700);const p=(await page.locator('#world').getAttribute('data-player')).split(',').map(Number);const distance=Math.hypot(p[0]+1,p[1]+3);console.log('Working distance after rewrite',step,distance.toFixed(2));assert(distance<5.5,'Repeated pulls must stay in the working area');}
}
assert.equal(await page.locator('#world').getAttribute('data-goal'),'true');assert.equal(await page.locator('#world').getAttribute('data-control-phase'),'walk');
await page.locator('#world canvas').focus();await page.keyboard.press('Space');await page.waitForFunction(()=>document.querySelector('#world').dataset.controlPhase==='hand');
await page.locator('#hudToggle').click();await page.screenshot({path:'.cache/release-browser/goal-sigils.png'});await page.mouse.move(650,350);await page.mouse.wheel(0,-220);await page.waitForTimeout(900);await page.screenshot({path:'.cache/release-browser/zoomed-paint.png'});
await page.setViewportSize({width:980,height:896});await page.waitForTimeout(800);await page.screenshot({path:'.cache/release-browser/narrow-paint.png'});
await page.keyboard.press('Escape');await page.locator('#settingsButton').click();await page.locator('#settings summary').filter({hasText:'Tree & sigils'}).click();await page.locator('#sigils').selectOption('layered');await page.locator('#closeSettings').click();await page.locator('#hudToggle').click();await page.screenshot({path:'.cache/release-browser/sigils-layered.png'});
console.log(process.env.BODY_ALL?'Six body-only rewrites passed;':'Six actual UI gestures, both identity eliminations accepted at 84% with 100px lateral offset, no diamond, final body pull, automatic goal exit and re-entry passed. Errors:',errors);assert.deepEqual(errors,[]);await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
