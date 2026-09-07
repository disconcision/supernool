import * as T from 'three';import assert from 'node:assert/strict';import {construct} from './geometry';import {sample} from './cases';
const options={sides:7,twist:1.2,bow:.2,normals:'strips',junction:'rounded'};
let runs=0,problems:any[]=[];
for(const rule of ['fork','generated','identity','regroup'])for(const complexity of ['simple','nested','uneven'])for(const mapping of ['keep','exchange'])for(const t of [0,.02,.25,.5,.75,1]){
 const c=sample(rule,complexity,mapping,t);const r=construct(c.edges,options);assert.ok(Array.from(r.geometry.getAttribute('position').array).every(Number.isFinite));assert.ok(Array.from(r.geometry.getAttribute('normal').array).every(Number.isFinite));if(r.boundary||r.nonmanifold)problems.push({rule,complexity,mapping,t,boundary:r.boundary,nonmanifold:r.nonmanifold});r.geometry.dispose();runs++;
}
const e=[{a:new T.Vector3(0,0,0),b:new T.Vector3(0,4,0),r:.3,id:'a'}];const a=construct(e,options),b=construct(e,{...options,normals:'all'}),c=construct(e,{...options,normals:'flat'});
assert.deepEqual(a.geometry.getAttribute('position').array,b.geometry.getAttribute('position').array);assert.notDeepEqual(a.geometry.getAttribute('normal').array,b.geometry.getAttribute('normal').array);assert.notDeepEqual(a.geometry.getAttribute('normal').array,c.geometry.getAttribute('normal').array);
assert.equal(problems.length,0,'Unexpected open or multiply shared edges: '+JSON.stringify(problems));
console.log(JSON.stringify({runs,normalComparison:'passed',problemCount:problems.length,problems},null,2));
