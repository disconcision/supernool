const assert=require('node:assert/strict'),T=require('three'),{buildSync}=require('esbuild'),{mkdirSync}=require('node:fs');
mkdirSync('.cache',{recursive:true});
buildSync({entryPoints:[__dirname+'/idle-catch.ts'],bundle:true,platform:'node',external:['three'],outfile:'.cache/idle-catch.cjs'});
const {IdleCatch,catchSocket}=require('../../.cache/idle-catch.cjs');
function fixture(seed=2,random){
 let n=seed;const rng=()=>{n=(1664525*n+1013904223)>>>0;return n/4294967296;};
 const game=new IdleCatch(random??rng),root=new T.Group(),stone=new T.Object3D();stone.position.set(1.8,.08,0);stone.userData.rockSeed=111;
 const hands=[-1,1].map(side=>{const h=new T.Group();h.position.set(side*.9,1,.22);return h;});
 game.setProps([{object:stone,radius:.2,groundY:.08,touch:new T.Vector3()}]);
 const tick=(allowed=true,dt=1/60,walking=false)=>{game.update(dt,allowed,root,hands,walking);if(game.active)game.poses.forEach((p,i)=>{hands[i].position.copy(p.position);hands[i].quaternion.copy(p.orientation);});};
 const until=(phase)=>{for(let i=0;i<5000&&game.phase!==phase;i++)tick();assert.equal(game.phase,phase);};
 return {game,root,stone,hands,tick,until};
}
let catches=0,misses=0;const phases=new Set();
for(let seed=1;seed<=16;seed++){
 const f=fixture(seed);f.until('scout');let previousSeparation=f.game.state.separation;assert(previousSeparation>=3,'Hands start farther apart');
 let maxY=0;
 for(let i=0;i<4000&&f.game.active;i++){
  const prev=f.stone.position.clone();f.tick();const g=f.game;phases.add(g.phase);
  assert(g.state.separation>=previousSeparation-1e-8,'Successful rallies never shrink their stations');previousSeparation=g.state.separation;
  for(const v of [...f.stone.position.toArray(),...f.stone.quaternion.toArray()])assert(Number.isFinite(v));
  assert(f.stone.position.y>=.08-1e-6,'Stone stays above its ground support');
  assert(f.stone.position.distanceTo(prev)<.4,'No teleport between animation phases');
  if(g.held)assert(f.stone.position.distanceTo(catchSocket(g.poses[g.holder]))<1e-8,'Held rock follows the actual palm');
  maxY=Math.max(maxY,f.stone.position.y);
 }
 assert(f.game.misses<=1,'First miss ends the rally');assert(!f.game.active,'Sessions end within bounded time');assert(maxY>1.8,'Throws have a visible airborne arc');
 catches+=f.game.catches;misses+=f.game.misses;
 if(phases.has('place')&&f.game.phase==='rest'&&!f.game.state.loose){assert(f.stone.position.y===.08);}
}
assert(catches>10);assert(misses>0);for(const phase of ['grip','notice','windup','flight','catch','miss','rejoin'])assert(phases.has(phase),phase);
for(const phase of ['scout','grip','lift','notice','spread','windup','throw','flight','catch','miss','rejoin','return','place']){
 const f=fixture(2,phase==='return'||phase==='place'?()=>.5:undefined);f.until(phase);const before=f.stone.position.clone();f.tick(false);
 assert(!f.game.active&&!f.game.held,`Immediate interruption during ${phase}`);
 assert(f.stone.position.distanceTo(before)<.3,`No reset teleport during ${phase}`);
 for(let i=0;i<300;i++)f.tick(false);
 assert(Math.abs(f.stone.position.y-.08)<1e-8,`Interrupted stone settles during ${phase}`);
}
// Walking winds down continuously, even if the traveller stops or turns midway.
for(const phase of ['scout','grip','lift','windup','throw','flight','catch','miss']){
 const f=fixture();f.until(phase);const throws=f.game.throws;
 f.tick(true,1/60,true);assert(f.game.disengaging,`Walking disengages during ${phase}`);
 for(let i=0;i<135;i++){
  const before=f.stone.position.clone();f.root.position.x+=.03;f.root.rotation.y=i/200;
  f.tick(true,1/60,i<50);
  assert(f.stone.position.distanceTo(before)<.4,'Set-down / airborne exit has no teleport');
 }
 assert(!f.game.active&&!f.game.held);assert.equal(f.game.throws,throws,'Departure never initiates another throw');
 for(let i=0;i<180;i++)f.tick(false);
 assert(Math.abs(f.stone.position.y-.08)<1e-8);
}
{const f=fixture();f.until('lift');f.tick(true,1/60,true);assert.equal(f.game.phase,'startle');f.tick(false);assert(!f.game.active&&!f.game.held,'Tree interaction preempts the walking exit');}
for(const cause of ['disabled','unreachable','hidden']){
 const f=fixture();if(cause==='disabled')f.game.setEnabled(false);if(cause==='unreachable')f.root.position.x=20;if(cause==='hidden')f.stone.visible=false;
 for(let i=0;i<1200;i++)f.tick();assert(!f.game.active,cause);
}
// Input gating is checked through the shared controller, not just the scheduler.
buildSync({entryPoints:[__dirname+'/lehi.ts'],bundle:true,platform:'node',external:['three'],outfile:'.cache/idle-catch-lehi.cjs'});
const {createLehi}=require('../../.cache/idle-catch-lehi.cjs');
for(const cause of ['movement','contact','pin','rewrite','input']){
 const actor=createLehi(new T.Scene()),stone=new T.Object3D(),camera=new T.PerspectiveCamera();stone.position.set(1.8,.08,0);
 actor.setCatchProps([{object:stone,radius:.2,groundY:.08,touch:new T.Vector3()}]);
 actor.setIdleMode('catch-only');
 for(let i=0;i<3500;i++){
  actor.update(i*16,1/60,false,camera,undefined,undefined,0,false);
  if(actor.root.userData.idleCatch.held)break;
 }
 assert(actor.root.userData.idleCatch.held);
 actor.update(20000,1/60,cause==='movement',camera,cause==='contact'?new T.Vector3(0,2,-1):undefined,cause==='pin'?new T.Vector3(1,2,-1):undefined,0,cause==='rewrite',undefined,cause==='input');
 if(cause==='movement'){assert.equal(actor.root.userData.idleCatch.phase,'startle');assert(actor.root.userData.idleCatch.held,'Walking keeps the stone attached through set-down');}
 else{assert.equal(actor.root.userData.idleCatch.phase,'rest',cause);assert(!actor.root.userData.idleCatch.held,cause);}
}
console.log(`Idle catch: ${catches} catches, ${misses} misses; widening rallies, first-miss endings, palm attachment, continuity, walking exits and urgent interruptions passed.`);
