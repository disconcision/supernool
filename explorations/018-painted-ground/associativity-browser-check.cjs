const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true}),page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');
await page.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
await page.getByRole('button',{name:'Open Encounter',exact:true}).click();await page.locator('#approach').click();await page.waitForFunction(()=>document.querySelector('#world').dataset.near==='true');await page.waitForTimeout(2700);
await page.locator('#inputMode').selectOption('mouse');
// Use the real outline/action UI to choose cases; mouse drags perform every rewrite.
await page.evaluate(()=>document.querySelector('#outline button').click());
for(let step=0;step<7;step++){
 const chosen=await page.evaluate(async step=>{
  const alg=await import('./algebra.ts');
  const tree=window.reviewTree??alg.initial();
  const cases=alg.walk(tree).flatMap(n=>alg.actions(n).filter(a=>a.key.startsWith('group')).map(a=>({n,a})));
  const c=step===0?cases.find(c=>c.n.id!==tree.id):cases[step%cases.length];
  window.reviewTree=alg.replace(tree,c.n.id,c.a.result);
  const index=alg.walk(tree).findIndex(n=>n.id===c.n.id);document.querySelectorAll('#outline button')[index].click();
  const label='Show: '+c.a.label;[...document.querySelectorAll('#actions button')].find(b=>b.textContent.startsWith(label)).click();
  return {owner:c.n.id,rule:c.a.key,after:alg.format(window.reviewTree)};
 },step);
 await page.waitForTimeout(200);
 const route=await page.evaluate(()=>{const i=parseInt(document.querySelector('.spell.active').textContent)-1,a=document.querySelector('[data-role="source"]'),b=document.querySelectorAll('[data-role="destination"]')[i];return {i,from:{x:+a.getAttribute('cx'),y:+a.getAttribute('cy')},to:{x:+b.getAttribute('cx'),y:+b.getAttribute('cy')}};});
 await page.mouse.move(route.from.x,route.from.y-5);await page.mouse.down();await page.keyboard.press(String(route.i+1));
 for(const t of [.25,.5,.75,1]){
  // Follow the live projected guide while automatic framing eases outward.
  for(let follow=0;follow<4;follow++){
   const live=await page.evaluate(i=>{const a=document.querySelector('[data-role="source"]'),b=document.querySelectorAll('[data-role="destination"]')[i];return {x0:+a.getAttribute('cx'),y0:+a.getAttribute('cy'),x1:+b.getAttribute('cx'),y1:+b.getAttribute('cy')};},route.i);
   await page.mouse.move(live.x0+(live.x1-live.x0)*t,live.y0+(live.y1-live.y0)*t,{steps:5});await page.waitForTimeout(180);
  }
  await page.waitForTimeout(800);
  if(step<3)await page.screenshot({path:__dirname+`/assets/assoc-${step}-${t}.png`});
 }
 if(await page.locator('#world').getAttribute('data-caught')!=='true')console.log('Uncaught',step,route,await page.locator('#world').evaluate(e=>({...e.dataset})));
 assert.equal(await page.locator('#world').getAttribute('data-caught'),'true');
 await page.mouse.up();await page.waitForFunction(()=>document.querySelector('#world').dataset.busy==='false');
 assert.equal(await page.locator('#world').getAttribute('data-term'),chosen.after);console.log(step,chosen);
}
assert.deepEqual(errors,[]);await browser.close();console.log('Seven real mouse regroupings, root and nested, in both directions passed.');
})().catch(e=>{console.error(e);process.exit(1)});
