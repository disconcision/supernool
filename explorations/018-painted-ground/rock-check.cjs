// Live Chrome integration check: ordinary route, dock controls, and asset recovery.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const url='http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body';
  const ready=()=>page.waitForFunction(()=>document.querySelector('#rockLoad')?.dataset.ready==='true');
  async function surroundings(){
   await page.getByRole('button',{name:'Open Inspect',exact:true}).click();
   await page.locator('#settings summary').filter({hasText:'Surroundings'}).click();
  }
  await page.goto(url);await ready();
  assert.equal(await page.locator('#rockLayout').inputValue(),'full');
  assert.equal(await page.locator('#rockShading').inputValue(),'cel');
  assert.equal(await page.locator('#rockGrowth').inputValue(),'raster');
  assert(+(await page.locator('#rockLoad').getAttribute('data-patches'))>20);
  assert.equal(await page.locator('#inspectDock #rockLayout').count(),1);
  await surroundings();
  for(const layout of ['enclosed','original','full']){
   await page.locator('#rockLayout').selectOption(layout);
   assert.equal(await page.locator('#rockLoad').getAttribute('data-layout'),layout);
  }
  for(const shading of ['soft','edges','cel'])await page.locator('#rockShading').selectOption(shading);
  for(const growth of ['bare','simple','raster'])await page.locator('#rockGrowth').selectOption(growth);
  await page.locator('#rockGrowthControls > summary').click();await page.locator('#mossControls > summary').click();
  assert.equal(await page.locator('#mossPlacement').inputValue(),'scatter');
  assert.equal(await page.locator('#lichenPlacement').inputValue(),'scatter');
  assert(+(await page.locator('#mossScale').inputValue())>+(await page.locator('#lichenScale').inputValue()));
  const initial=JSON.parse(await page.locator('#rockLoad').getAttribute('data-patch-settings'));
  const counts=JSON.parse(await page.locator('#rockLoad').getAttribute('data-patch-counts'));
  await page.locator('#mossOpacity').focus();await page.keyboard.press('Home');
  await page.waitForFunction(()=>JSON.parse(document.querySelector('#rockLoad').dataset.patchSettings).moss.opacity===0);
  assert.deepEqual(JSON.parse(await page.locator('#rockLoad').getAttribute('data-patch-counts')),counts,'Fading does not reseed either layer');
  await page.locator('#mossOpacity').focus();await page.keyboard.press('End');
  await page.locator('#mossBlend').selectOption('multiply');
  await page.getByRole('button',{name:'Reshuffle moss',exact:true}).click();
  await page.locator('#mossPlacement').selectOption('clusters');
  const saved=await page.locator('#rockLoad').getAttribute('data-patch-settings');
  assert.deepEqual(JSON.parse(saved).lichen,initial.lichen,'Moss controls leave lichen settings untouched');
  assert.equal(JSON.parse(await page.locator('#rockLoad').getAttribute('data-patch-counts')).lichen,counts.lichen);
  await page.reload();await ready();
  assert.equal(await page.locator('#rockLoad').getAttribute('data-patch-settings'),saved,'Independent settings survive reload');
  await surroundings();await page.locator('#rockGrowthControls > summary').click();await page.locator('#mossControls > summary').click();
  await page.locator('#mossAmount').focus();await page.keyboard.press('Home');
  await page.waitForFunction(()=>JSON.parse(document.querySelector('#rockLoad').dataset.patchCounts).moss===0);
  assert.equal(JSON.parse(await page.locator('#rockLoad').getAttribute('data-patch-counts')).lichen,counts.lichen,'Removing moss leaves lichen geometry intact');
  await page.locator('#lichenControls > summary').click();
  await page.locator('#lichenAmount').focus();await page.keyboard.press('Home');
  await page.waitForFunction(()=>document.querySelector('#rockLoad').dataset.patches==='0');
  await page.getByRole('button',{name:'Reset lichen',exact:true}).click();
  await page.getByRole('button',{name:'Reset moss',exact:true}).click();
  // A missing texture must leave the improved geometry usable.
  await page.route('**/growth-atlas-v1.png',route=>route.abort());
  await page.reload();await ready();
  assert.equal(await page.locator('#rockGrowth').inputValue(),'simple');
  assert.match(await page.locator('#rockLoad').textContent(),/texture unavailable/);
  await page.unroute('**/growth-atlas-v1.png');
  // A missing model must report the failure, retain the old scene, then recover.
  await page.route('**/rock-study-08/basalt-group.glb',route=>route.abort());
  await page.reload();
  await page.waitForFunction(()=>document.querySelector('#rockLoad')?.textContent.includes('failed:'));
  await surroundings();
  await page.unroute('**/rock-study-08/basalt-group.glb');
  await page.locator('#rockRetry').click();await ready();
  assert.equal(await page.locator('#rockGrowth').inputValue(),'raster');
  assert.deepEqual(errors,[]);
  console.log('Rocks: ordinary route, dock comparisons, distribution/opacity/persistence controls, texture fallback and model retry passed in Chrome.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
