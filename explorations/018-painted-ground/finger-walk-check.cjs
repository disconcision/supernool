const T=require('three'),assert=require('node:assert/strict'),{buildSync}=require('esbuild');
for(const module of ['finger-walk','idle-schedule','lehi'])buildSync({entryPoints:[__dirname+'/'+module+'.ts'],bundle:true,platform:'node',external:['three'],outfile:'.cache/finger-test-'+module+'.cjs'});
const {FingerWalk,fingerSteps,solveFinger}=require('../../.cache/finger-test-finger-walk.cjs');
const {IdleSchedule}=require('../../.cache/finger-test-idle-schedule.cjs');
const {createLehi}=require('../../.cache/finger-test-lehi.cjs');
const rng=seed=>()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
const root=new T.Group(),hands=[-1,1].map(x=>{const h=new T.Group();h.position.set(x*.9,1,.22);return h;});
const obstacles=[{x:1.5,z:1,r:.7},{x:-1,z:-1.6,r:.65}],safe=p=>obstacles.every(o=>Math.hypot(p.x-o.x,p.z-o.z)>o.r);
const starts=[];let successful=0;
for(let seed=1;seed<=30;seed++){
 const walk=new FingerWalk(rng(seed));walk.setTerrain(safe);if(!walk.startWalk(root,hands,seed%2))continue;successful++;
 starts.push(walk.route[0]);assert(walk.route.length>=9);
 for(let j=1;j<walk.route.length;j++)for(let k=0;k<=10;k++)assert(safe(walk.route[j-1].clone().lerp(walk.route[j],k/10)),'Segments avoid the obstacle footprints');
 let previous=walk.pose.position.clone();
 for(let i=0;i<2000&&walk.active;i++){
  walk.update(1/60,true,false,root);assert(walk.pose.position.distanceTo(previous)<.25,'No position jump on landing, corners or exit');previous.copy(walk.pose.position);
  assert(walk.pose.position.toArray().every(Number.isFinite));
 }
 assert(!walk.active,'Finite excursion');assert(walk.distance>1);
}
assert(successful>25);assert(starts.some(p=>p.x<0)&&starts.some(p=>p.x>0));assert(new Set(starts.map(p=>p.toArray().map(v=>v.toFixed(1)).join(','))).size>20,'Varied start positions');
for(let i=0;i<200;i++){
 const steps=fingerSteps(i/200*.27);assert(steps.filter(s=>s.lift===0).length>=2,'At least two supporting fingers');
 for(const [k,step] of steps.entries()){
  const a=[.308,.388,.358,.268][k],b=.435,y=.30+step.advance/.68,z=(.38-.024-step.lift)/.68,q=solveFinger(a,b,y,z);
  assert(Math.abs(a*Math.cos(q.base)+b*Math.cos(q.base+q.middle)-y)<1e-8);
  assert(Math.abs(a*Math.sin(q.base)+b*Math.sin(q.base+q.middle)-z)<1e-8,'Toe reaches its floor or swing target');
 }
}
// A planted fingertip moves backward exactly as far as the palm advances.
const first=fingerSteps(.02)[0],next=fingerSteps(.021)[0];assert(Math.abs((next.advance-first.advance)+.001)<1e-9);
const schedule=new IdleSchedule(rng(5)),byKind={walk:[],catch:[]};
for(let i=0;i<8;i++){
 let choice;for(let frame=0;frame<2000&&!choice;frame++)choice=schedule.tick(1/60,true,false);
 assert(choice);byKind[choice.kind].push(choice.hand);schedule.started(choice.kind,choice.hand);schedule.rest();
 for(let j=0;j<11*60;j++)assert.equal(schedule.tick(1/60,true,false),undefined,'Shared quiet period applies to both activities');
}
for(const values of Object.values(byKind)){assert(values.length>=3);for(let i=1;i<values.length;i++)assert.notEqual(values[i],values[i-1],'Each activity uses both hands');}
// Full controller: a voluntary catch ending cannot immediately launch a walk.
const actor=createLehi(new T.Scene()),stone=new T.Object3D();stone.position.set(1.8,.08,0);actor.setCatchProps([{object:stone,radius:.2,groundY:.08,touch:new T.Vector3()}]);actor.setIdleTerrain(safe);
const camera=new T.PerspectiveCamera();let previousBusy=false,endings=0,sawCatch=false,sawWalk=false,quiet=0;
for(let i=0;i<12000;i++){
 actor.update(i*1000/60,1/60,false,camera,undefined,undefined,0,false);
 const d=actor.root.userData,busy=d.idleCatch.phase!=='rest'||d.fingerWalk.phase!=='rest';
 assert(!(d.idleCatch.phase!=='rest'&&d.fingerWalk.phase!=='rest'),'Activities are mutually exclusive');
 sawCatch||=d.idleCatch.phase!=='rest';sawWalk||=d.fingerWalk.phase!=='rest';
 if(previousBusy&&!busy){quiet=11.9;endings++;}
 if(quiet>0){assert(!busy,'Nothing starts during the post-activity cooldown');quiet-=1/60;}
 previousBusy=busy;
}
assert(sawCatch&&sawWalk&&endings>=3);
for(const urgent of [false,true]){
 const walk=new FingerWalk(rng(9));walk.setTerrain(safe);assert(walk.startWalk(root,hands,0));
 for(let i=0;i<120;i++)walk.update(1/60,true,false,root);
 walk.update(1/60,!urgent,true,root);
 assert(urgent?!walk.active:walk.leaving,'Tree contact is immediate; walking gets a lift-off and return');
}
console.log('Finger walks: obstacle-safe varied routes, alternating planted/swing toes, reachable finger IK, both hands, mutual exclusion and shared post-activity cooldown passed.');
