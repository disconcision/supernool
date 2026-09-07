const {chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs/promises');const path=require('node:path');
(async()=>{
 const sceneId='copy-check-'+Date.now(),folder=path.resolve('scenes',sceneId),browser=await chromium.launch({channel:'chrome',headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
  const url='http://127.0.0.1:3101/explorations/018-painted-ground/?mode=body&rockLayout=enclosed&editor=1&scene='+sceneId;
  await page.goto(url);await page.waitForFunction(()=>document.querySelector('#sceneStatus')?.textContent.includes('Built-in scene'));await page.locator('#editScene').click();
  const count=()=>page.locator('#editorSelection option').count();const selected=()=>page.locator('#editorSelection').inputValue();
  const capture=()=>page.evaluate(async()=>{const {rockAuthoring}=await import('/explorations/018-painted-ground/rock-authoring.ts');return rockAuthoring.capture();});
  assert.equal(await count(),68);assert.equal(await page.locator('#pasteScenery').isDisabled(),true);
  await page.locator('#editorSelection').selectOption('rock-16');await page.locator('#copyScenery').click();
  const original=(await capture()).find(r=>r.id==='rock-16');
  await page.locator('#editorX').fill('-10');await page.locator('#editorX').press('Tab');
  const patchesBefore=await page.locator('#rockLoad').getAttribute('data-patches');
  await page.locator('#pasteScenery').click();const copyId=await selected();assert.match(copyId,/^copy-/);assert.equal(await count(),69);
  let copy=(await capture()).find(r=>r.id===copyId);assert.equal(copy.source,'rock-16');assert.equal(copy.position[0],original.position[0]+1,'Copy must retain the transform at copy time');assert.equal(copy.position[2],original.position[2]+1);
  assert.ok(+(await page.locator('#rockLoad').getAttribute('data-patches'))>+patchesBefore,'Formation copy receives projected growth');
  await page.locator('#undoScene').click();assert.equal(await count(),68);assert.equal(await page.locator('#rockLoad').getAttribute('data-patches'),patchesBefore,'Undo unregisters copied growth');
  await page.locator('#redoScene').click();assert.equal(await count(),69);assert.equal(await selected(),copyId);
  // Duplicating a copy still resolves to an original asset, rather than a chain of copies.
  await page.locator('#world canvas').focus();await page.keyboard.press('Meta+d');const secondId=await selected();assert.notEqual(secondId,copyId);assert.equal((await capture()).find(r=>r.id===secondId).source,'rock-16');
  await page.locator('#undoScene').click();assert.equal(await count(),69);
  // All prop families and Cmd/Ctrl keyboard variants work without hijacking text editing.
  for(const [id,key] of [['rock-15','Meta'],['stone-0','Control'],['fungus-0','Meta']]){
   await page.locator('#editorSelection').selectOption(id);await page.locator('#world canvas').focus();await page.keyboard.press(key+'+c');await page.keyboard.press(key+'+v');
   const pasted=await selected();assert.equal((await capture()).find(r=>r.id===pasted).source,id);
  }
  const savedCopies=(await capture()).filter(r=>r.source);assert.equal(savedCopies.length,4);
  await page.locator('#editorX').fill('0');await page.locator('#editorX').press('Tab');await page.locator('#editorZ').fill('6');await page.locator('#editorZ').press('Tab');
  const beforeText=await count();await page.locator('#sceneTitle').fill('Copies persist');await page.keyboard.press('Meta+a');await page.keyboard.press('Meta+c');assert.equal(await count(),beforeText);assert.equal(await selected(),savedCopies.at(-1).id);
  await page.locator('#saveScene').click();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.startsWith('Saved “'));await page.locator('#defaultScene').click();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.includes('is now the default'));
  const saved=await capture();await page.reload();await page.waitForFunction(()=>document.querySelector('#sceneStatus').textContent.includes('Loaded Copies persist'));await page.locator('#editScene').click();assert.deepEqual(await capture(),saved);
  await page.locator('#editorSelection').selectOption(copyId);await page.locator('#editorX').fill('-2');await page.locator('#editorX').press('Tab');await page.locator('#editorZ').fill('7');await page.locator('#editorZ').press('Tab');await page.waitForTimeout(250);await page.screenshot({path:'.cache/editor/copied-formation.png'});
  // A clean selection does not erase the scenery clipboard; it survives reload.
  await page.locator('#editorSelection').selectOption('');assert.equal(await page.locator('#pasteScenery').isEnabled(),true);await page.locator('#pasteScenery').click();assert.equal((await capture()).at(-1).source,'fungus-0');
  assert.deepEqual(errors,[]);console.log('Copy/paste: immutable snapshot, offset, four asset families, copy-of-copy, growth cleanup, undo/redo, keyboard/text-focus isolation, saved reload, and persistent scenery clipboard passed.');
 }finally{await browser.close();await fs.rm(folder,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exit(1)});
