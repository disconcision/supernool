import assert from 'node:assert/strict';
import {EncounterSequence,sequenceStates,sequenceTiming} from './encounter-sequence';
import {stormEvents,arcDefaults} from '../019-inhabited-trees/storm-lightning';
import {initial,hint,replace,solved,walk} from './algebra';
import {recoveryRoute,replayRecovery,recoveryReplayFraction} from './recovery-replay';
import {transition,layout} from './layout';
import {prepare,valueAt,Options} from './surface';
const seq=new EncounterSequence();
seq.update(2,false,false);assert.equal(seq.state,'dormant');assert.equal(seq.sample().shadow,0);
seq.update(.1,true,false);assert.equal(seq.state,'awakening');
seq.update(3,false,false);assert.equal(seq.state,'active','Leaving ring cannot abort awakening');
seq.update(5,true,false);assert.equal(seq.state,'active','Crossing again does not retrigger');
seq.update(0,false,true);assert.equal(seq.state,'release');
seq.update(2,false,true);assert.equal(seq.state,'recovery');
seq.update(9,false,true);assert.equal(seq.state,'healthy');assert.equal(seq.sample().burn,0);assert.equal(seq.sample().ring,0);assert.equal(seq.sample().leaves,1);
seq.update(20,true,true);assert.equal(seq.state,'healthy');
seq.jump('dormant');seq.automatic=false;seq.update(10,true,true);assert.equal(seq.state,'dormant');
seq.jump('awakening');seq.paused=true;seq.update(10,true,false);assert.equal(seq.age,0);
for(const state of sequenceStates)for(let i=0;i<=100;i++){
 seq.jump(state);seq.age=i/100*(sequenceTiming[state as keyof typeof sequenceTiming]||1);
 const c=seq.sample();for(const key of ['shadow','burn','growth','leaves','scorch','ring'] as const)assert(c[key]>=0&&c[key]<=1,`${state} ${key}`);
}
const seen=new Set<string>();
for(let t=0;t<1.5;t+=.01)for(const kind of ['small','medium','large'] as const){const es=stormEvents(kind,0,0,{...arcDefaults,smallRate:0,mediumRate:0,largeRate:0,cueAge:t});if(es.length)seen.add(kind);}
assert.equal(seen.size,3,'Transition burst includes all sizes');
for(const kind of ['small','medium','large'] as const)assert.equal(stormEvents(kind,0,0,{...arcDefaults,smallRate:0,mediumRate:0,largeRate:0,cueAge:2}).length,0,'Burst ends');
const original=initial(),route=recoveryRoute(original,[]),reduced=route.reduced;
assert(solved(reduced));assert.equal(route.records.length,6);
const opt:Options={spread:0,thickness:1,taper:.8,bow:.6,random:.5,twist:.4,facets:.4,seed:2,blend:.1,hewn:true};
const config={spread:0,irregularity:.4,height:'depth',seed:2};
function samePose(a:ReturnType<typeof layout>,b:ReturnType<typeof layout>){
 for(const [id,p]of b.points)assert(a.points.get(id)&&p.distanceTo(a.points.get(id)!)<1e-8,'Matching point '+id);
 assert.equal(a.edges.length,b.edges.length);
 for(const e of b.edges){const actual=a.edges.find(x=>x.id===e.id)!;assert(actual&&actual.a.distanceTo(e.a)<1e-8&&actual.b.distanceTo(e.b)<1e-8,'Matching member '+e.id+' '+JSON.stringify({a:actual?.a,b:actual?.b,wantA:e.a,wantB:e.b}));}
}
for(let index=0;index<route.records.length;index++){
 const record=route.records[route.records.length-1-index];
 for(const local of [0,.1,.25,.5,.75,.9]){
  const progress=(index+local)/route.records.length*recoveryReplayFraction;
  const replay=replayRecovery(route.records,original,progress,config,opt,1);
  assert.equal(replay.phase,'rewind');assert.equal(replay.spread,0,'No spatial curling during reversal');assert.equal(replay.kind,record.kind);
  const expected=local===0?layout(record.after,config):transition(record.before,record.after,1-local,config,record.kind,record.merge,opt);
  try{samePose(replay.pose,expected);}catch(e){console.error({index,local,kind:record.kind,replayIndex:replay.index,replayLocal:replay.local});throw e;}
  for(const e of replay.pose.edges){const m=prepare(e,opt);for(const p of m.points)assert(Number.isFinite(valueAt(p.x,p.y,p.z,m,opt)));}
 }
}
samePose(replayRecovery(route.records,original,0,config,opt,1).pose,layout(reduced,config));
samePose(replayRecovery(route.records,original,recoveryReplayFraction,config,opt,1).pose,layout(original,config));
samePose(replayRecovery(route.records,original,1,config,opt,1).pose,layout(original,{...config,spread:1}));
// Transitions meet at their shared recorded expression, without a whole-tree jump.
for(let index=1;index<=route.records.length;index++){
 const boundary=index/route.records.length*recoveryReplayFraction;
 const left=replayRecovery(route.records,original,boundary-1e-7,config,opt,1).pose;
 const right=replayRecovery(route.records,original,boundary+1e-7,config,opt,1).pose;
 for(const e of right.edges){const previous=left.edges.find(x=>x.id===e.id);if(previous)assert(e.a.distanceTo(previous.a)<.001&&e.b.distanceTo(previous.b)<.001,'Continuous operation boundary');}
}
// Preview completion extends the current recorded route rather than discarding it.
const partial=route.records.slice(0,2),extended=recoveryRoute(partial[1].after,partial);
assert.equal(partial.length,2);assert.equal(extended.records[0],partial[0]);assert(solved(extended.reduced));
assert.equal(walk(reduced).length,5,'Visual reversal leaves the solved expression alone');
console.log('Encounter: lifecycle, short mixed-size cues, exact reverse replay of six operations, planar-to-spatial phase, endpoint and boundary continuity, preview route extension passed.');
