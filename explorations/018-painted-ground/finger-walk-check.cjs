const T=require('three'),assert=require('node:assert/strict'),{buildSync}=require('esbuild');
for(const module of ['finger-walk','idle-schedule','lehi'])buildSync({entryPoints:[__dirname+'/'+module+'.ts'],bundle:true,platform:'node',external:['three'],outfile:'.cache/finger-test-'+module+'.cjs'});
const {FingerWalk,fingerSteps,uprightSteps,walkingFingerAngles,solveFinger}=require('../../.cache/finger-test-finger-walk.cjs');
const {IdleSchedule}=require('../../.cache/finger-test-idle-schedule.cjs');
const {createLehi}=require('../../.cache/finger-test-lehi.cjs');
const rng=seed=>()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;};
const root=new T.Group(),hands=[-1,1].map(x=>{const h=new T.Group();h.position.set(x*.9,1,.22);return h;});
const obstacles=[{x:1.5,z:1,r:.7},{x:-1,z:-1.6,r:.65}],safe=p=>obstacles.every(o=>Math.hypot(p.x-o.x,p.z-o.z)>o.r);
const starts=[];let successful=0;
for(let seed=1;seed<=30;seed++){
 const walk=new FingerWalk(rng(seed));walk.preference='spider';walk.setTerrain(safe);if(!walk.startWalk(root,hands,seed%2))continue;successful++;
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
// Bias follows the camera's horizontal view, while preserving away-facing routes.
for(const bearing of [0,Math.PI/2]){
 const camera=new T.PerspectiveCamera();camera.position.set(Math.sin(bearing)*8,6,Math.cos(bearing)*8);camera.lookAt(0,0,0);
 const toward=new T.Vector3(Math.sin(bearing),0,Math.cos(bearing));let biased=0,neutral=0,away=0;
 for(let seed=1;seed<=600;seed++)for(const useCamera of [false,true]){
  const walk=new FingerWalk(rng(seed*11033));walk.setTerrain(safe);assert(walk.startWalk(root,hands,seed%2,useCamera?camera:undefined));
  const forward=walk.route[1].clone().sub(walk.route[0]).dot(toward)>0;
  if(useCamera){if(forward)biased++;else away++;}else if(forward)neutral++;
  assert(walk.route.every(safe),'Camera preference never overrides terrain clearance');
 }
 assert(biased>neutral+35,'Camera-facing headings become more common');assert(away>100,'The bias still allows other directions');
 console.log('Camera route preference',{bearing,biased,neutral,away,total:600});
}
const overhead=new T.PerspectiveCamera();overhead.position.set(0,8,0);overhead.up.set(0,0,-1);overhead.lookAt(0,0,0);
const overheadWalk=new FingerWalk(rng(6));overheadWalk.setTerrain(safe);assert(overheadWalk.startWalk(root,hands,0,overhead));assert(overheadWalk.route.every(p=>p.toArray().every(Number.isFinite)),'Overhead camera has a stable unbiased fallback');
// Stumbles are occasional, happen once, freeze the route and recover in order.
const mishap=['fall','fallen','recover','dazed'];let stumbles=0,stumbleSeed;
for(let seed=1;seed<=100;seed++){
 const walk=new FingerWalk(rng(seed));walk.preference='spider';walk.setTerrain(()=>true);assert(walk.startWalk(root,hands,seed%2));
 const phases=[];let frozenDistance,upright,previous=walk.pose.orientation.clone();
 for(let i=0;i<2000&&walk.active;i++){
  const before=walk.phase;walk.update(1/60,true,false,root);
  assert(previous.angleTo(walk.pose.orientation)<.3,'No rotation jump through a tumble or recovery');previous.copy(walk.pose.orientation);
  if(before!==walk.phase&&mishap.includes(walk.phase))phases.push(walk.phase);
  if(walk.phase==='fall'&&before==='walk'){frozenDistance=walk.distance;upright=walk.pose.orientation.clone();assert(frozenDistance>=1.2);}
  if(mishap.includes(walk.phase))assert.equal(walk.distance,frozenDistance,'Fallen and dazed hands do not travel');
  if(before==='dazed'&&walk.phase==='walk')assert(walk.pose.orientation.angleTo(upright)<1e-6,'Recovery returns to the original upright heading');
 }
 assert(!walk.active);
 if(phases.length){stumbles++;stumbleSeed??=seed;assert.deepEqual(phases,mishap,'One complete mishap per walk');assert(walk.distance>frozenDistance+.2,'Walking resumes after the daze');}
}
assert(stumbles>=12&&stumbles<=36,'A minority of walks include a tumble');
// Both gait planes reach the floor with splay and palm sway; upright uses only digits 1 and 2.
let maxUprightKnee=0,pivotSamples=0,uprightStumbleSeed,uprightFalls=0,spiderTime=0,uprightTime=0;const mixed=new Set();
for(const style of ['spider','upright'])for(let seed=1;seed<=50;seed++){
 const walk=new FingerWalk(rng(seed*11033));walk.preference=style;walk.setTerrain(()=>true);assert(walk.startWalk(root,hands,seed%2));
 let time=0,pivotIndex=-1,stanceIndex=-1,stancePoint,stanceSamples=0;
 while(walk.active&&time<45){
  walk.update(1/60,true,false,root);time+=1/60;
  if(style==='upright'&&walk.phase==='fall'&&walk.age===0){uprightFalls++;uprightStumbleSeed??=seed*11033;}
  if(!['walk','fall','fallen','recover'].includes(walk.phase))continue;
  const gait=walk.gait,toes=Array.from({length:4},()=>new T.Vector3(0,1,0));
  if(walk.phase==='walk')assert(style==='upright'?Math.abs(new T.Vector3(0,0,1).applyQuaternion(walk.pose.orientation).y)<.11:true,'Upright palm faces horizontally');
  for(let k=0;k<4;k++){
   if(style==='upright'&&(k===0||k===3))continue;
   const a=[.308,.388,.358,.268][k],b=.435,base=new T.Vector3((k-1.5)*.145,.48,0),splay=(1.5-k)*(style==='upright'?.10:.19),step=gait.steps[k];
   const q=walkingFingerAngles(a,b,base,.68,new T.Vector3(0,-.17,0),gait.contactPose,gait.direction,step,splay,style==='upright'?0:.204);
   if(style==='upright'&&walk.phase==='walk')maxUprightKnee=Math.max(maxUprightKnee,q.middle);
   const toe=new T.Vector3(0,a*Math.cos(q.base)+b*Math.cos(q.base+q.middle),a*Math.sin(q.base)+b*Math.sin(q.base+q.middle));
   toe.applyAxisAngle(new T.Vector3(0,0,1),splay).add(base).multiplyScalar(.68).add(new T.Vector3(0,-.17,0)).applyQuaternion(gait.contactPose.orientation).add(gait.contactPose.position);
   assert(Math.abs(toe.y-(.024+step.lift))<1e-7,'Splayed and swaying fingers still plant or clear the floor');
   toes[k]=toe;
  }
  const rendered=toes.map(p=>p.clone().sub(gait.contactPose.position).applyQuaternion(gait.contactPose.orientation.clone().invert()).applyQuaternion(walk.pose.orientation).add(walk.pose.position));
  walk.recordContacts(rendered);
  if(style==='upright'&&walk.phase==='walk'){
   const support=walk.state.support;assert([1,2].includes(support));
   if(support!==stanceIndex){stancePoint=rendered[support].clone();stanceIndex=support;}
   else{assert(rendered[support].distanceTo(stancePoint)<1e-7,'The loaded fingertip stays fixed through palm sway and route turns');stanceSamples++;}
   assert(Math.abs(rendered[support].y-.024)<1e-7);
   assert(rendered[3-support].y>=.024-1e-7,'Swinging fingertip stays clear of the floor');
  }
  if(style==='upright'&&walk.phase==='fall'&&walk.age===0){const pivot=new T.Vector3().fromArray(walk.state.pivot);pivotIndex=rendered.findIndex(p=>p.distanceTo(pivot)<1e-8);assert(pivotIndex>=0,'A planted fingertip supplies the fall pivot');}
  if(pivotIndex>=0&&['fall','fallen','recover'].includes(walk.phase)){
   assert(rendered[pivotIndex].distanceTo(new T.Vector3().fromArray(walk.state.pivot))<1e-7,'The supporting fingertip stays fixed throughout tipping and recovery');pivotSamples++;
   for(const k of [1,2])assert(rendered[k].y>.020,'The other walking finger does not tip through the floor');
  }

 }
 assert(!walk.active,'Both styles complete');if(style==='upright')assert(stanceSamples>200,'Several complete anchored steps were checked');if(style==='spider')spiderTime+=time/walk.distance;else uprightTime+=time/walk.distance;
 const randomWalk=new FingerWalk(rng(seed*11033));randomWalk.setTerrain(()=>true);randomWalk.startWalk(root,hands,0);mixed.add(randomWalk.style);
}
assert(maxUprightKnee<.38,'Upright gait uses shallow middle-joint bends');assert(pivotSamples>100);
assert.equal(mixed.size,2);assert(uprightTime>spiderTime*2,'Upright is substantially slower');assert(uprightFalls>=14&&uprightFalls<=35,'Upright is more liable to fall');
for(const style of ['spider','upright'])for(const phase of mishap)for(const urgent of [false,true]){
 const walk=new FingerWalk(rng(style==='spider'?stumbleSeed:uprightStumbleSeed));walk.preference=style;walk.setTerrain(()=>true);assert(walk.startWalk(root,hands,0));
 for(let i=0;i<2000&&walk.phase!==phase;i++)walk.update(1/60,true,false,root);
 assert.equal(walk.phase,phase);walk.update(1/60,!urgent,true,root);
 assert(urgent?!walk.active:walk.leaving,'Every tumble phase yields immediately to interaction or gracefully to movement');
 for(let i=0;i<100&&walk.active;i++)walk.update(1/60,true,true,root);
 assert(!walk.active,'Movement never waits for the entire daze');
}
for(let i=0;i<200;i++)assert(uprightSteps(i/200*.54).filter((s,k)=>(k===1||k===2)&&s.lift===0).length>=1,'At least one biped finger supports each step');
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
// Catch gets a bounded opportunity only after a hand is ready; waiting for
// departure cannot spend that opportunity, and walking cannot steal it early.
{
 const s=new IdleSchedule(rng(8));s.started('walk',0);s.remaining=0;
 assert.equal(s.tick(1/60,true,false,false).kind,'catch');
 for(let i=0;i<600;i++){const request=s.tick(1/60,true,false,false);if(request)assert(!request.allowWalk);}
 for(let i=0;i<149;i++){const request=s.tick(1/60,true,false,true);if(request)assert(!request.allowWalk,'Give catch the full opportunity');}
 let fallback=false;for(let i=0;i<30;i++){const request=s.tick(1/60,true,false,true);fallback||=!!request?.allowWalk;}assert(fallback,'A missing stone does not starve walking');
 s.tick(1/60,false,false,true);s.remaining=0;assert(!s.tick(1/60,true,false,true).allowWalk,'Movement resets the opportunity');
 s.mode='catch-only';s.rest();s.remaining=0;for(let i=0;i<600;i++){const request=s.tick(1/60,true,false,true);if(request)assert(!request.allowWalk,'Catch-only never falls back to a walk');}
}
// Full controller: a voluntary catch ending cannot immediately launch a walk.
const originalRandom=Math.random;Math.random=rng(351);const actor=createLehi(new T.Scene());Math.random=originalRandom;
// A clearing with local opportunities on all sides isolates scheduling from
// whether a single distant stone happens to be encountered by a wandering hand.
actor.setCatchProps(Array.from({length:12},(_,i)=>{const object=new T.Object3D();object.position.set(Math.sin(i*Math.PI/6)*2.8,.08,Math.cos(i*Math.PI/6)*2.8);return {object,radius:.2,groundY:.08,touch:new T.Vector3()};}));actor.setIdleTerrain(safe);
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
 const walk=new FingerWalk(rng(9));walk.preference='spider';walk.setTerrain(safe);assert(walk.startWalk(root,hands,0));
 for(let i=0;i<120;i++)walk.update(1/60,true,false,root);
 walk.update(1/60,!urgent,true,root);
 assert(urgent?!walk.active:walk.leaving,'Tree contact is immediate; walking gets a lift-off and return');
}
// The procedural comparison uses its own rendered toe lengths, too.
{
 const actor=createLehi(new T.Scene()),camera=new T.PerspectiveCamera();actor.setIdleTerrain(()=>true);actor.setIdleMode('explore');actor.setIdleWalkStyle('upright');
 let samples=0,lastSupport=-1,lastPoint;
 for(let frame=0;frame<5000&&samples<240;frame++){
  actor.update(frame*1000/60,1/60,false,camera,undefined,undefined,0,false);const s=actor.root.userData.fingerWalk;
  if(s.phase!=='walk')continue;
  const p=actor.hands[s.hand].tips[s.support-1].localToWorld(new T.Vector3(0,.17,0));
  assert(Math.abs(p.y-.024)<1e-7,'Procedural supporting toe is grounded');
  if(s.support===lastSupport)assert(p.distanceTo(lastPoint)<1e-7,'Procedural stance is anchored');
  lastSupport=s.support;lastPoint=p;samples++;
 }
 assert(samples===240);
}
console.log('Finger walks: routes, planted/swing toes, IK, hand choice, shared cooldown and interruptible stumble/recovery passed.',{spiderStumbles:stumbles,outOf:100,uprightFalls,outOfUpright:50,uprightSlowerBy:(uprightTime/spiderTime).toFixed(1),maxKneeDegrees:(maxUprightKnee*180/Math.PI).toFixed(1),pivotSamples});
