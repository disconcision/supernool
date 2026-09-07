const {chromium}=require('playwright');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:1280,height:720},deviceScaleFactor:1});
 page.on('pageerror',e=>console.error(e));await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/'+(process.argv[2]||'?matteCapture=1'));
 await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');await page.waitForTimeout(2500);
 await page.locator('#hudToggle').click();await page.screenshot({path:__dirname+'/assets/'+(process.argv[3]||'camera-blockout.png')});await browser.close();})();
