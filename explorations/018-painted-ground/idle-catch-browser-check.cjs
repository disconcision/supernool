const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/idle-catch-v2-review';mkdirSync(output,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 try{
 const page=await browser.newPage({viewport:{width:1920,height:1200},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 // Repeatable throws without changing the gameplay defaults.
 await page.addInitScript(()=>{let seed=7;Math.random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};});
 await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');
 await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
 await page.waitForFunction(()=>document.querySelector('#world').dataset.character==='blue-wrap');
 const state=()=>page.evaluate(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch));
 const phase=async(name,min=0)=>page.waitForFunction(([n,t])=>{const s=JSON.parse(document.querySelector('#world').dataset.idleCatch);return s.phase===n&&s.age>=t;},[name,min],{timeout:60000});
 await phase('grip',.25);await page.screenshot({path:output+'/grip.png',clip:{x:430,y:700,width:580,height:230}});
 await phase('notice');const initialSeparation=(await state()).separation;await page.screenshot({path:output+'/lift-and-notice.png',clip:{x:430,y:650,width:580,height:280}});
 await phase('flight',.25);await page.screenshot({path:output+'/flight-live.png'});
 await phase('catch',.12);await page.screenshot({path:output+'/catch.png',clip:{x:430,y:650,width:580,height:280}});
 assert((await state()).catches>0);
 await phase('flight',.2);const before=await state();assert(before.separation>initialSeparation+.5,'Successful catch spreads both hands outward');
 await page.screenshot({path:output+'/wider-rally.png'});
 await page.locator('#world canvas').focus();await page.keyboard.down('ArrowUp');
 await page.waitForFunction(()=>document.querySelector('#world').dataset.handActivity==='disengaging');
 await page.screenshot({path:output+'/walking-rejoin.png'});await page.keyboard.up('ArrowUp');
 await page.waitForFunction(()=>document.querySelector('#world').dataset.handActivity==='escort');
 assert.equal((await state()).phase,'rest');await page.waitForTimeout(180);await page.keyboard.up('ArrowUp');
 await page.waitForFunction(()=>{const s=JSON.parse(document.querySelector('#world').dataset.idleCatch);return !s.loose&&!s.held;});
 assert((await state()).position[1]<before.position[1],'Interrupted airborne stone falls');
 // Off is a live comparison; it also cancels an active pickup/game.
 await page.getByRole('button',{name:'Open Inspect',exact:true}).click();
 if(!await page.locator('#idleCatch').isVisible())await page.locator('#settings summary').filter({hasText:'Traveller'}).click();
 await page.locator('#idleCatch').selectOption('explore');await page.waitForTimeout(7000);assert.equal((await state()).phase,'rest');
 await page.locator('#idleCatch').selectOption('catch');
 // Start the second figure at an authored nearby stone; interrupted throws may
 // legitimately land beyond the next game's reach.
 await page.reload();await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
 await page.getByRole('button',{name:'Open Inspect',exact:true}).click();
 await page.locator('#character').selectOption('olive-cape');
 await page.waitForFunction(()=>document.querySelector('#world').dataset.character==='olive-cape');
 await page.locator('#closeSettings').click();await phase('lift',.5);
 await page.screenshot({path:output+'/cape-lift.png',clip:{x:430,y:650,width:580,height:280}});
 await page.locator('#world canvas').focus();await page.keyboard.down('ArrowDown');
 await phase('depart',.2);assert((await state()).held,'Stone stays gripped during set-down');
 await page.screenshot({path:output+'/walking-set-down.png',clip:{x:350,y:620,width:750,height:400}});
 await page.keyboard.up('ArrowDown');await page.waitForFunction(()=>JSON.parse(document.querySelector('#world').dataset.idleCatch).phase==='rest');
 assert(!(await state()).held);
 assert.deepEqual(errors,[]);console.log('Chrome: both art figures, pickup / notice / flight / catch, widening separation, airborne and held walking exits, grounded settling and Explore-only comparison passed. Screenshots:',output);
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
