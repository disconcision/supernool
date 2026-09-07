const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true}),page=await browser.newPage({viewport:{width:1280,height:720}});
await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');await page.waitForFunction(()=>document.querySelector('#world').dataset.cameraZoom);await page.waitForTimeout(2200);
await page.getByRole('button',{name:'Open Encounter',exact:true}).click();await page.locator('#approach').click();await page.waitForFunction(()=>document.querySelector('#world').dataset.near==='true');await page.waitForTimeout(2400);
const data=()=>page.locator('#world').evaluate(e=>({...e.dataset}));console.log('Initial fit',(await data()).cameraZoom);
await page.locator('#world canvas').focus();await page.keyboard.press('Space');await page.keyboard.press('h');await page.keyboard.down('Space');
// Stationary held input must not gain rewrite progress during camera reframing.
await page.waitForTimeout(800);assert.equal(+(await data()).gestureProgress,0);await page.keyboard.up('Space');
await page.locator('#hudToggle').click();await page.screenshot({path:__dirname+'/assets/tree-auto-frame.png'});await page.keyboard.press('Escape');
await page.setViewportSize({width:420,height:900});
let previous=+(await data()).cameraZoom;for(let i=0;i<12;i++){await page.waitForTimeout(100);const z=+(await data()).cameraZoom;assert(z<=previous+.00002);assert(previous-z<.15,'Zoom must ease, not snap');previous=z;}
await page.waitForTimeout(8500);const d=await data();assert(+d.cameraZoom<=+d.fitZoom+.002);await page.screenshot({path:__dirname+'/assets/tree-auto-frame-narrow.png'});
console.log('Smooth outward fit, viewport fit and no passive grip progress passed.',d.cameraZoom,d.fitZoom);await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
