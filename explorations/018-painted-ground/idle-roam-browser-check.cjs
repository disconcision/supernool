const {chromium}=require('playwright'),assert=require('node:assert/strict'),{mkdirSync}=require('node:fs');
const output='.cache/idle-roam-review';mkdirSync(output,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});try{
 const page=await browser.newPage({viewport:{width:1600,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.routeWebSocket(url=>url.hostname==='127.0.0.1'&&url.port==='3100',ws=>ws.send(JSON.stringify({type:'connected'})));
 await page.addInitScript(()=>{let seed=17;Math.random=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};});
 const read=()=>page.evaluate(()=>{const d=document.querySelector('#world').dataset;return {roam:JSON.parse(d.idleRoam),walk:JSON.parse(d.fingerWalk),catch:JSON.parse(d.idleCatch),player:d.player,activity:d.handActivity};});
 for(const kind of (process.env.IDLE_ROAM_CASES??'roam,spider,upright,held,flight').split(',')){
  await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');
  await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
  await page.getByRole('button',{name:'Open Inspect',exact:true}).click();
  await page.locator('#idleCatch').selectOption(['held','flight'].includes(kind)?'catch-only':'explore');
  if(['spider','upright'].includes(kind))await page.locator('#idleWalkStyle').selectOption(kind);
  if(['upright','held'].includes(kind))await page.locator('#character').selectOption('olive-cape');
  await page.locator('#closeSettings').click();
  await page.waitForFunction(()=>{const r=JSON.parse(document.querySelector('#world').dataset.idleRoam);return r.phase==='drift'&&r.age>.4;});
  const initial=await read();await page.waitForTimeout(1800);const drifting=await read();
  const travel=drifting.roam.positions.map((p,i)=>Math.hypot(...p.map((v,k)=>v-initial.roam.positions[i][k])));
  assert(travel.every(d=>d>=0&&d<.12),'Departure begins very slowly');assert.equal(drifting.walk.phase,'rest');assert.equal(drifting.catch.phase,'rest');
  if(kind!=='roam'){
   await page.waitForFunction(kind=>{const d=document.querySelector('#world').dataset,w=JSON.parse(d.fingerWalk),c=JSON.parse(d.idleCatch);return kind==='held'?c.phase==='notice':kind==='flight'?c.phase==='flight'&&c.age>.15:w.phase==='walk'&&w.age>.2;},kind,{timeout:90000});
   const playing=await read(),root=playing.player.split(',').map(Number),radius=p=>Math.hypot(p[0]-root[0],p[2]-root[1]);
   if(['spider','upright'].includes(kind)){assert(radius(playing.roam.positions[playing.walk.hand])>=playing.roam.thresholds[playing.walk.hand]-.04);assert(playing.walk.route.every(p=>radius(p)>1.75));}
   else assert(playing.catch.separation>3,'Catch starts farther apart');
   console.log(kind,'activity at roaming radii',playing.roam.positions.map(p=>radius(p).toFixed(2)));
  }
  await page.screenshot({path:output+'/'+kind+'-before.png'});
  await page.evaluate(()=>{window.__startles=[];function sample(){const d=document.querySelector('#world').dataset;window.__startles.push({r:JSON.parse(d.idleRoam),w:JSON.parse(d.fingerWalk),c:JSON.parse(d.idleCatch)});if(window.__startles.length<100)requestAnimationFrame(sample);}sample();});
  await page.locator('#world canvas').focus();await page.keyboard.down('ArrowRight');await page.waitForTimeout(70);await page.screenshot({path:output+'/'+kind+'-startle.png'});
  await page.waitForTimeout(80);await page.keyboard.up('ArrowRight');
  await page.waitForFunction(()=>{const d=document.querySelector('#world').dataset;return JSON.parse(d.idleRoam).phase==='rest'&&JSON.parse(d.fingerWalk).phase==='rest'&&JSON.parse(d.idleCatch).phase==='rest';},{},{timeout:6000});
  const samples=await page.evaluate(()=>window.__startles),key=kind==='roam'?'r':['spider','upright'].includes(kind)?'w':'c';
  assert(samples.some(s=>s[key].phase==='startle'),kind+' has a visible startle phase');
  if(kind==='held')assert(samples.some(s=>s.c.phase==='startle'&&s.c.held),'Held stone stays attached during flinch');
  if(kind==='flight')assert(samples.some(s=>s.c.phase==='startle'&&s.c.loose),'Airborne stone continues falling during flinch');
  await page.screenshot({path:output+'/'+kind+'-returned.png'});console.log(kind,'gradual departure, distant activity and movement startle/return passed');
 }
 assert.deepEqual(errors,[]);
 }finally{await browser.close();}})().catch(e=>{console.error(e);process.exit(1)});
