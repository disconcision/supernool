const assert=require('node:assert/strict'),T=require('three'),{buildSync}=require('esbuild');
for(const name of ['idle-roam','lehi','idle-catch'])buildSync({entryPoints:[__dirname+'/'+name+'.ts'],bundle:true,platform:'node',external:['three'],outfile:'.cache/roam-test-'+name+'.cjs'});
const {IdleRoam}=require('../../.cache/roam-test-idle-roam.cjs'),{createLehi}=require('../../.cache/roam-test-lehi.cjs');
const {IdleCatch}=require('../../.cache/roam-test-idle-catch.cjs');
const rng=seed=>()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
const root=new T.Group(),makeHands=()=>[-1,1].map(side=>{const h=new T.Group();h.position.set(side*.9,1,.22);return h;});
let arrivals=0,rear=0,front=0;const thresholds=new Set();
for(let seed=1;seed<=40;seed++){
 const roam=new IdleRoam(rng(seed*11033)),hands=makeHands(),seen=new Set();
 const safe=p=>Math.hypot(p.x-2,p.z-.8)>.65&&Math.hypot(p.x+2,p.z+1)>.65;roam.setTerrain(safe);
 for(let frame=0;frame<2400;frame++){
  const previous=hands.map(h=>h.position.clone());roam.update(1/60,true,false,false,root,hands);
  if(roam.active)roam.poses.forEach((p,i)=>{assert(p.position.distanceTo(previous[i])<.006,'Anticipation drifts slowly');assert(safe(p.position));hands[i].position.copy(p.position);hands[i].quaternion.copy(p.orientation);});
  for(let i=0;i<2;i++)if(!seen.has(i)&&roam.ready(i,root)){seen.add(i);arrivals++;thresholds.add(roam.state.thresholds[i].toFixed(2));hands[i].position.z<0?rear++:front++;}
  if(seen.size===2)break;
 }
 roam.update(1/60,true,true,false,root,hands);assert.equal(roam.phase,'startle');
 const before=hands.map(h=>h.position.clone());for(let i=0;i<3;i++)roam.update(1/60,true,true,false,root,hands);
 assert(roam.poses.some((p,i)=>p.position.y>before[i].y+.1),'Movement produces a quick upward flinch');
 for(let i=0;i<90&&roam.active;i++){root.position.x+=.01;roam.update(1/60,true,true,false,root,hands);}
 assert(!roam.active,'Roaming hands return promptly');root.position.set(0,0,0);
}
assert(arrivals>65&&rear>front&&front>5);assert(thresholds.size>20,'Trigger distances vary');
for(const kind of ['roam','spider','upright','held','flight'])for(const urgent of [false,true]){
 const original=Math.random;Math.random=rng(351);const actor=createLehi(new T.Scene());Math.random=original;
 const camera=new T.PerspectiveCamera(),stone=new T.Object3D();stone.position.set(2.6,.08,0);
 actor.setIdleTerrain(()=>true);actor.setCatchProps([{object:stone,radius:.2,groundY:.08,touch:new T.Vector3()}]);
 actor.setIdleMode(kind==='held'||kind==='flight'?'catch-only':'explore');actor.setIdleWalkStyle(kind==='upright'?'upright':'spider');
 let frame=0,started=false;
 const tick=(moving=false,blocked=false)=>actor.update(frame++*1000/60,1/60,moving,camera,undefined,undefined,0,blocked);
 for(;frame<6000;){
  tick();const d=actor.root.userData,walk=d.fingerWalk,game=d.idleCatch;
  const active=walk.phase!=='rest'||game.phase!=='rest';
  if(!started&&active){const hand=walk.phase!=='rest'?walk.hand:game.holder,p=d.idleRoam.positions[hand];assert(Math.hypot(p[0],p[2])>=d.idleRoam.thresholds[hand]-.02,'Activity waits for the actual distance threshold');if(walk.phase!=='rest')assert(walk.route.every(p=>Math.hypot(p[0],p[2])>1.8),'Walk stays out from the body');else assert(game.separation>3,'Catch stations are spread out');started=true;}
  if(kind==='roam'?d.idleRoam.phase==='drift'&&d.idleRoam.age>2:kind==='held'?game.held:kind==='flight'?game.phase==='flight':walk.phase==='walk')break;
 }
 assert(frame<6000,'Requested activity became available');
 const before=actor.hands.map(h=>h.group.position.clone());tick(true,urgent);const d=actor.root.userData;
 if(urgent){assert.equal(d.idleRoam.phase,'rest');assert.equal(d.fingerWalk.phase,'rest');assert.equal(d.idleCatch.phase,'rest');}
 else{
  assert.equal(kind==='roam'?d.idleRoam.phase:kind==='held'||kind==='flight'?d.idleCatch.phase:d.fingerWalk.phase,'startle');
  if(kind==='held')assert(d.idleCatch.held,'Startle keeps the stone gripped');if(kind==='flight')assert(d.idleCatch.loose,'Airborne stone continues falling during startle');
  for(let i=0;i<4;i++)tick(true);assert(actor.hands.some((h,i)=>h.group.position.y>before[i].y+.1),'The rendered controller hands flinch before returning');
  for(let i=0;i<170;i++)tick(true);assert.equal(actor.root.userData.idleCatch.phase,'rest');assert.equal(actor.root.userData.fingerWalk.phase,'rest');assert.equal(actor.root.userData.idleRoam.phase,'rest');
 }
}
let widening=0;
for(let seed=1;seed<=30;seed++){
 const game=new IdleCatch(rng(seed*631)),hands=makeHands(),stone=new T.Object3D();stone.position.set(2.6,.08,0);
 // Both hands arrived on the same side, at many different world bearings.
 hands.forEach((h,i)=>h.position.set(2.5,1,(i?1:-1)*.2).applyAxisAngle(new T.Vector3(0,1,0),seed*.7));
 game.setProps([{object:stone,radius:.2,groundY:.08,touch:new T.Vector3()}]);game.requestStart(seed%2);game.update(1/60,true,root,hands);
 assert(game.active);let separation=game.state.separation;assert(separation>=3.2,'Same-side arrivals still have space for a proper throw');
 for(let frame=0;frame<2400&&game.active;frame++){
  game.update(1/60,true,root,hands,false,false);
  const next=game.state.separation;assert(next>=separation-.001,'Rallies spread apart regardless of roaming bearings');if(next>separation+.1)widening++;separation=next;
 }
}
assert(widening>10,'Roaming stations support progressively wider rallies');
console.log('Idle roaming: gradual obstacle-safe departure, varied distances, side/rear preference, distance-gated activities, all movement startles and urgent overrides passed.',{arrivals,rear,front});
