// Capture actual 018 states through legal mouse gestures; never modify its source.
const {chromium}=require('playwright');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({channel:'chrome',headless:true});try{
 const p=await b.newPage({viewport:{width:1600,height:1000}});p.setDefaultTimeout(30000);const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body');
 await p.waitForFunction(()=>document.querySelector('#world').dataset.meshing==='ready');
 await p.getByRole('button',{name:'Open Encounter',exact:true}).click();await p.locator('#approach').click();
 await p.waitForFunction(()=>document.querySelector('#world').dataset.near==='true');await p.waitForTimeout(2800);
 await p.locator('#inputMode').selectOption('mouse');
 await p.evaluate(()=>{const e=document.getElementById('mistSpeed');e.value='0';e.dispatchEvent(new Event('input',{bubbles:true}));});
 await p.addStyleTag({content:'header,.dock {visibility:hidden !important}'});
 const states=[];
 async function capture(step){await p.mouse.move(1550,950);await p.waitForTimeout(600);const meta=await p.locator('#world').evaluate(e=>({term:e.dataset.term,nodes:e.dataset.nodes,zoom:e.dataset.cameraZoom,goal:e.dataset.goal}));await p.screenshot({path:__dirname+'/references/state-'+step+'.png'});states.push({step,...meta});}
 await capture(0);
 for(let step=1;step<=6;step++){
  await p.locator('#world canvas').focus();await p.keyboard.press('h');await p.waitForTimeout(180);
  const route=await p.evaluate(()=>{const i=parseInt(document.querySelector('.spell.active').textContent)-1,a=document.querySelector('[data-role="source"]'),b=document.querySelectorAll('[data-role="destination"]')[i];return {i,x:+a.getAttribute('cx'),y:+a.getAttribute('cy'),u:+b.getAttribute('cx'),v:+b.getAttribute('cy')};});
  await p.mouse.move(route.x,route.y-5);await p.mouse.down();await p.keyboard.press(String(route.i+1));await p.mouse.move(route.u,route.v,{steps:30});
  await p.waitForFunction(()=>document.querySelector('#world').dataset.caught==='true');await p.mouse.up();
  await p.waitForFunction(()=>document.querySelector('#world').dataset.busy==='false');await capture(step);
 }
 fs.writeFileSync(__dirname+'/references/states.json',JSON.stringify({source:'018-painted-ground',viewport:{width:1600,height:1000},notes:'Actual mouse rewrites; header/docks hidden for reference; mist drift frozen. Live automatic framing retained.',states,errors},null,2));console.log(states);if(errors.length)throw Error(errors.join('\n'));
 }finally{await b.close();}})();
