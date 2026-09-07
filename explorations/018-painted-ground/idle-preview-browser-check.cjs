const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/idle-preview-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.routeWebSocket(url=>url.hostname==='127.0.0.1'&&url.port==='3100',ws=>ws.send(JSON.stringify({type:'connected'})));
 await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
 await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#idleCatch').selectOption('rest');
 await page.getByText('Test idle animations',{exact:true}).click();await page.locator('#playIdlePreview').scrollIntoViewIfNeeded();await page.screenshot({path:output+'/menu.png'});
 for(const kind of ['catch','spider','upright','spider-stumble','upright-stumble','roam']){
  await page.locator('#idlePreview').selectOption(kind);await page.locator('#playIdlePreview').click();
  await page.waitForFunction(kind=>{const d=document.querySelector('#world').dataset;return JSON.parse(kind==='catch'?d.idleCatch:kind==='roam'?d.idleRoam:d.fingerWalk).phase!=='rest';},kind,{timeout:2000});
  assert.equal(await page.locator('#idleCatch').inputValue(),'rest');assert.equal(await page.locator('#idleWalkStyle').inputValue(),'mixed');
  if(!['catch','roam'].includes(kind)){await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.fingerWalk).phase==='walk');assert.equal(await page.evaluate(()=>JSON.parse(document.querySelector('#world').dataset.fingerWalk).style),kind.startsWith('upright')?'upright':'spider');}
  await page.screenshot({path:output+'/'+kind+'.png'});
  await page.locator('#stopIdlePreview').click();await page.waitForFunction(()=>{const d=document.querySelector('#world').dataset;return ['idleRoam','idleCatch','fingerWalk'].every(k=>JSON.parse(d[k]).phase==='rest');});await page.waitForTimeout(750);
  console.log(kind,'starts promptly and stops without changing automatic idle settings');
 }
 await page.locator('#idlePreview').selectOption('upright');await page.locator('#playIdlePreview').click();await page.locator('#closeSettings').click();await page.waitForTimeout(1400);await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(100);await page.keyboard.up('ArrowRight');await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.fingerWalk).phase==='rest');
 assert.deepEqual(errors,[]);console.log('Preview movement interruption passed');
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
