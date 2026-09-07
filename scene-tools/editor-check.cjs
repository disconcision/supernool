const {chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs/promises');const path=require('node:path');
(async()=>{const sceneId='check-'+Date.now(),folder=path.resolve('scenes',sceneId),b=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await b.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error'&&m.text().includes('THREE.WebGLProgram'))errors.push(m.text());});
 const url='http://127.0.0.1:3101/explorations/018-painted-ground/?mode=body&rockLayout=enclosed&editor=1&scene='+sceneId;
 await page.goto(url);await page.waitForFunction(()=>document.querySelector('#sceneStatus')?.textContent.includes('Built-in scene'));
 await page.locator('#editScene').click();await page.locator('#editorSelection').selectOption('rock-16');
 const start=await page.locator('#editorX').inputValue();
 // Drag the visible red X handle using the actual pointer.
 await page.mouse.move(559,357);await page.waitForTimeout(100);await page.mouse.down();await page.mouse.move(619,370,{steps:12});await page.mouse.up();await page.waitForTimeout(400);
 console.log('Gizmo X',start,'→',await page.locator('#editorX').inputValue());
 assert.notEqual(await page.locator('#editorX').inputValue(),start,'Transform handle must move the rock');
 await page.locator('#undoScene').click();assert.equal(await page.locator('#editorX').inputValue(),start);

 // All handles are available in the same mode: height, yaw, and proportional size.
 for(const [field,from,to] of [['editorY',[496,250],[496,215]],['editorYaw',[635,380],[600,397]],['editorScale',[570,293],[600,263]]]){
  const before=await page.locator('#'+field).inputValue();await page.mouse.move(...from);await page.mouse.down();await page.mouse.move(...to,{steps:10});await page.mouse.up();await page.waitForTimeout(150);
  console.log(field,before,'→',await page.locator('#'+field).inputValue());assert.notEqual(await page.locator('#'+field).inputValue(),before,field+' combined drag');
  await page.locator('#undoScene').click();assert.equal(await page.locator('#'+field).inputValue(),before);
 }
 await page.screenshot({path:'.cache/editor/combined-verified.png'});
 // Loose stones and mushrooms are independent, persistent objects.
 assert.equal(await page.locator('#editorSelection option').count(),68);
 await page.locator('#editorSelection').selectOption('');await page.mouse.click(948,682);assert.equal(await page.locator('#editorSelection').inputValue(),'stone-8');
 await page.locator('#editorSelection').selectOption('');await page.mouse.click(1042,659);assert.equal(await page.locator('#editorSelection').inputValue(),'fungus-0');
 await page.locator('#editorY').fill('0.25');await page.locator('#editorY').press('Tab');
 await page.locator('#editorSelection').selectOption('stone-0');await page.locator('#editorScale').fill('0.9');await page.locator('#editorScale').press('Tab');
 await page.locator('#editorSelection').selectOption('rock-16');
 await page.locator('#editorX').fill('-11');await page.locator('#editorX').press('Tab');await page.locator('#undoScene').click();assert.equal(await page.locator('#editorX').inputValue(),start);await page.locator('#redoScene').click();assert.equal(await page.locator('#editorX').inputValue(),'-11.00');
 // Editing keyboard shortcuts must not walk the traveller.
 const player=await page.locator('#world').getAttribute('data-player');await page.locator('#world canvas').focus();await page.keyboard.down('w');await page.waitForTimeout(400);await page.keyboard.up('w');assert.equal(await page.locator('#world').getAttribute('data-player'),player);
 await page.getByRole('button',{name:'Appearance',exact:true}).click();await page.locator('#settings summary').filter({hasText:'Surroundings'}).click();await page.locator('#rockShading').selectOption('soft');await page.locator('#rockGrowthControls > summary').click();await page.locator('#mossControls > summary').click();await page.locator('#mossOpacity').focus();await page.keyboard.press('Home');await page.keyboard.press('ArrowRight');
 await page.getByRole('button',{name:'Scene',exact:true}).click();await page.locator('#sceneTitle').fill('Saved layout and settings');await page.locator('#saveScene').click();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.startsWith('Saved “'));
 let files=await fs.readdir(path.join(folder,'versions'));assert.equal(files.length,1);const first=JSON.parse(await fs.readFile(path.join(folder,'versions',files[0]),'utf8'));assert.equal(first.controls.rockShading,'soft');assert.equal(first.controls.mossOpacity,'0.05');assert.equal(first.rocks.find(r=>r.id==='rock-16').position[0],-11);assert.equal(first.rocks.find(r=>r.id==='fungus-0').position[1],.25);assert.equal(first.rocks.find(r=>r.id==='stone-0').scale[0],.9);
 await page.locator('#defaultScene').click();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.includes('is now the default'));
 await page.reload();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.includes('Loaded Saved layout and settings'));assert.equal(await page.locator('#rockShading').inputValue(),'soft');assert.equal(await page.locator('#mossOpacity').inputValue(),'0.05');await page.locator('#editScene').click();await page.locator('#editorSelection').selectOption('fungus-0');assert.equal(await page.locator('#editorY').inputValue(),'0.25');await page.locator('#editorSelection').selectOption('stone-0');assert.equal(await page.locator('#editorScale').inputValue(),'0.90');await page.locator('#editorSelection').selectOption('rock-16');assert.equal(await page.locator('#editorX').inputValue(),'-11.00');
 await page.locator('#editorX').fill('-10.5');await page.locator('#editorX').press('Tab');await page.locator('#defaultScene').click();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.startsWith('Save a version first'));
 await page.locator('#sceneTitle').fill('Second version');await page.locator('#saveScene').click();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.startsWith('Saved “'));files=await fs.readdir(path.join(folder,'versions'));assert.equal(files.length,2);assert.equal(JSON.parse(await fs.readFile(path.join(folder,'default.json'),'utf8')).versionId,first.versionId,'Saving alone must not replace the default');
 await page.locator('#sceneVersions').selectOption(first.versionId);await page.locator('#loadScene').click();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.includes('Loaded Saved layout and settings'));await page.locator('#editorSelection').selectOption('fungus-0');assert.equal(await page.locator('#editorY').inputValue(),'0.25');await page.locator('#editorSelection').selectOption('stone-0');assert.equal(await page.locator('#editorScale').inputValue(),'0.90');await page.locator('#editorSelection').selectOption('rock-16');assert.equal(await page.locator('#editorX').inputValue(),'-11.00');
 await page.screenshot({path:'.cache/editor/saved-version.png'});
 // Malformed snapshots and cross-origin writes must not reach the project files.
 const invalid=await page.request.post('http://127.0.0.1:3101/__scene-editor/'+sceneId,{data:{...first,rocks:[{...first.rocks[0],scale:[0,1,1]}]}});assert.equal(invalid.status(),400);
 const foreign=await page.request.post('http://127.0.0.1:3101/__scene-editor/'+sceneId,{headers:{Origin:'https://unrelated.example'},data:first});assert.equal(foreign.status(),403);

 // Formation-only saves from the previous editor still load; new props use authored defaults.
 const legacyResponse=await page.request.post('http://127.0.0.1:3101/__scene-editor/'+sceneId,{data:{...first,title:'Legacy formation-only scene',rocks:first.rocks.filter(r=>r.id.startsWith('rock-'))}});assert.equal(legacyResponse.status(),201);const legacy=await legacyResponse.json();
 await page.request.put('http://127.0.0.1:3101/__scene-editor/'+sceneId+'/default',{data:{versionId:legacy.versionId}});
 await page.reload();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.includes('Loaded Legacy formation-only scene'));
 await page.locator('#editScene').click();await page.locator('#editorSelection').selectOption('fungus-0');assert.equal(await page.locator('#editorY').inputValue(),'0.00');
 await page.locator('#editorSelection').selectOption('rock-16');assert.equal(await page.locator('#editorX').inputValue(),'-11.00');
 // The outline also renders with atmosphere disabled, without shader errors.
 await page.getByRole('button',{name:'Appearance',exact:true}).click();await page.locator('#settings summary').filter({hasText:'Surroundings'}).click();await page.locator('#mistMode').selectOption('off');await page.getByRole('button',{name:'Scene',exact:true}).click();await page.waitForTimeout(200);await page.screenshot({path:'.cache/editor/outline-clear.png'});
 assert.deepEqual(errors,[]);console.log('Scene editor: combined X/height/yaw/size drags, visible prop picking, legacy saves, numeric edit, undo/redo, play/edit isolation, file saves, settings+layout reload, retained versions, explicit default promotion, input/origin validation passed.');
}finally{await b.close();await fs.rm(folder,{recursive:true,force:true});}})().catch(e=>{console.error(e);process.exit(1)});
