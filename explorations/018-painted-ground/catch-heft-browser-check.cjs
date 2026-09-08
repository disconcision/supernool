const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/catch-heft-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 for(const [character,heavy] of [['olive-cape',false],['olive-cape',true],['blue-wrap',true]]){
  const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.routeWebSocket(url=>url.hostname==='127.0.0.1'&&url.port==='3100',ws=>ws.send(JSON.stringify({type:'connected'})));
  // Keep a known accessible prop for repeatable visual review. The heavy
  // fixture uses the actual dimensions of newly admitted authored stone 104.
  let fixtureApplied=false;
  await page.route(/\/terrain\.ts(?:\?.*)?$/,async route=>{const response=await route.fetch();let body=await response.text();
   assert(body.includes('if (catchProfile)'));body=body.replace('if (catchProfile)','if (catchProfile && seed === 111)');
   if(heavy){const dimensions='0.25 + rand(i) * 0.45, 0.2 + rand(i + 4) * 0.5';assert(body.includes(dimensions));body=body.replace(dimensions,'i === 11 ? .54228563 : 0.25 + rand(i) * 0.45, i === 11 ? .43169650 : 0.2 + rand(i + 4) * 0.5');}
   fixtureApplied=true;await route.fulfill({response,body});});
  await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
  assert(fixtureApplied,'The terrain fixture must be applied, including Vite timestamp URLs');
  await page.getByRole('button',{name:'Open Inspect',exact:true}).click();await page.locator('#idleCatch').selectOption('rest');await page.locator('#character').selectOption(character);
  await page.getByText('Test idle animations',{exact:true}).click();await page.locator('#idlePreview').selectOption('catch');await page.locator('#playIdlePreview').click();await page.locator('#closeSettings').click();
  const name=character+(heavy?'-heavier':'-light');
  await page.waitForFunction(()=>{const s=JSON.parse(document.querySelector('#world').dataset.idleCatch);return s.phase==='lift'&&s.age>.35;});
  const effort=await page.evaluate(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).effort);assert(heavy?effort>.4&&effort<.5:effort===0,JSON.stringify({name,effort,state:await page.evaluate(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch))}));
  await page.screenshot({path:output+'/'+name+'-lift.png'});
  await page.waitForFunction(()=>{const s=JSON.parse(document.querySelector('#world').dataset.idleCatch);return s.phase==='windup'&&s.age>.4;});await page.screenshot({path:output+'/'+name+'-windup.png'});
  await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).phase==='flight');
  await page.waitForFunction(()=>['catch','miss'].includes(JSON.parse(document.querySelector('#world').dataset.idleCatch).phase));await page.screenshot({path:output+'/'+name+'-receive.png'});
  await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(100);await page.keyboard.up('ArrowRight');await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).phase==='rest');
  assert.deepEqual(errors,[]);console.log(name,'lift, windup, receiving and movement exit passed; effort',effort);await page.close();
 }
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
