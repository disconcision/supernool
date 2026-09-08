import assert from 'node:assert/strict';
import {EncounterSequence,sequenceStates,sequenceTiming} from './encounter-sequence';
import {stormEvents,arcDefaults} from '../019-inhabited-trees/storm-lightning';
import {initial,hint,replace,solved,walk} from './algebra';
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
const original=initial();let reduced=original;
for(let i=0;i<12&&!solved(reduced);i++){const h=hint(reduced)!;reduced=replace(reduced,h.nodeId,h.action.result);}
assert(solved(reduced));
const opt:Options={thickness:1,taper:.8,bow:.6,random:.5,twist:.4,facets:.4,seed:2,blend:.1,hewn:true};
for(let i=0;i<=40;i++){
 const t=i/40,config={spread:t,irregularity:.4,height:'depth',seed:2};
 const p=transition(reduced,original,t,config,'regrow',{},opt);
 for(const e of p.edges){const m=prepare(e,opt);for(const q of m.points)assert(Number.isFinite(valueAt(q.x,q.y,q.z,m,opt)));}
 if(i===40){const end=layout(original,config);for(const [id,q]of end.points)assert(q.distanceTo(p.points.get(id)!)<1e-8,JSON.stringify({id,expected:q.toArray(),actual:p.points.get(id)?.toArray(),edges:p.edges.map(e=>e.id)}));for(const e of end.edges){const actual=p.edges.find(a=>a.id===e.id)!;assert(actual&&actual.a.distanceTo(e.a)<1e-8&&actual.b.distanceTo(e.b)<1e-8,'Exact restored member '+e.id);}}
 assert.equal(walk(reduced).length,5,'Regrowth must not restore the original equation');
}
console.log('Encounter: approach, one-shot awakening, solve/release/recovery, pause/manual previews, bounded envelopes, mixed short burst and 41 regrowth poses passed.');
