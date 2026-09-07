const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true}),page=await browser.newPage({viewport:{width:1280,height:720}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');await page.waitForFunction(()=>document.querySelector('#world').dataset.cameraZoom);
await page.getByRole('button',{name:'Open Encounter',exact:true}).click();await page.locator('#approach').click();await page.waitForFunction(()=>document.querySelector('#world').dataset.near==='true');await page.waitForFunction(()=>{const d=document.querySelector('#world').dataset;return Math.abs(+d.cameraZoom-+d.fitZoom)<.003},null,{timeout:30000});
await page.locator('#inputMode').selectOption('mouse');
const zoom=async()=>+(await page.locator('#world').getAttribute('data-camera-zoom'));const start=await zoom();
await page.evaluate(()=>{document.querySelector('#outline button').click();[...document.querySelectorAll('#actions button')].find(b=>b.textContent.startsWith('Show: Regroup to the left')).click();});await page.waitForTimeout(200);
const route=await page.evaluate(()=>{const i=parseInt(document.querySelector('.spell.active').textContent)-1,a=document.querySelector('[data-role="source"]');return {i,x:+a.getAttribute('cx'),y:+a.getAttribute('cy')};});
await page.mouse.move(route.x,route.y-5);await page.mouse.down();await page.keyboard.press(String(route.i+1));
for(let i=0;i<16;i++){
const p=await page.evaluate(i=>{const b=document.querySelectorAll('[data-role="destination"]')[i];return {x:+b.getAttribute('cx'),y:+b.getAttribute('cy')};},route.i);await page.mouse.move(p.x,p.y,{steps:4});await page.waitForTimeout(120);
}
assert.equal(await page.locator('#world').getAttribute('data-caught'),'true');await page.mouse.up();await page.waitForFunction(()=>document.querySelector('#world').dataset.busy==='false');await page.waitForTimeout(6000);const out=await zoom();assert(out<start-.03,'Taller rewrite must zoom out');
await page.locator('#hudToggle').click();await page.screenshot({path:__dirname+'/assets/matte-expanded-wide.png'});await page.keyboard.press('Escape');
await page.locator('#undo').click();await page.waitForTimeout(600);const early=await zoom();assert(early>out&&early<start-.01,'Return should start gradually');await page.waitForFunction(()=>{const d=document.querySelector('#world').dataset;return Math.abs(+d.cameraZoom-+d.fitZoom)<.003},null,{timeout:30000});const back=await zoom();assert(back>out+.03&&Math.abs(back-start)<.012,'Return to the tighter fit after undo');
await page.locator('#hudToggle').click();await page.screenshot({path:__dirname+'/assets/matte-expanded-return.png'});
assert.deepEqual(errors,[]);console.log({start,out,early,back},'Slow outward/return framing and real mouse rewrite passed.');await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
