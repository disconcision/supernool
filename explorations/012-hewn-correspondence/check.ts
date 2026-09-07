import assert from 'node:assert/strict';import {specimen} from './spatial';import {sample} from './cases';import {prepare,valueAt,fill,Options} from './surface';import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';import * as T from 'three';
const o:Options={thickness:1.2,taper:.75,bow:.5,random:.4,twist:.8,facets:.45,seed:1,blend:.075,hewn:true};let states=0;
for(const rule of ['regroup','identity','swap'])for(const mapping of ['keep','exchange'])for(const complexity of ['simple','nested','uneven'])for(const spread of [0,.5,1]){
 let prev:number[]|undefined;
 for(let step=0;step<=40;step++){
  const t=step/40,c=specimen(rule,complexity,mapping,t,1,'depth',0,spread),original=sample(rule,complexity,mapping,t,1,'depth',0);
  assert.deepEqual(c.edges.map(e=>e.id),original.edges.map(e=>e.id));
  c.edges.forEach((e,i)=>{assert.equal(e.r,original.edges[i].r);for(const end of ['a','b'] as const){assert.equal(e[end].x,original.edges[i][end].x);assert.equal(e[end].y,original.edges[i][end].y);assert.ok(Number.isFinite(e[end].z));if(spread===0)assert.equal(e[end].z,original.edges[i][end].z);}
   if(e.r>1e-6&&e.a.distanceTo(e.b)>1e-6){const m=prepare(e,o);m.points.slice(1,-1).forEach(p=>assert.ok(valueAt(p.x,p.y,p.z,m,o)>0));}
  });
  if(complexity!=='simple'){const a=c.joints.find(j=>j.id==='a')!,x=c.joints.find(j=>j.id==='ax')!,d=[x.x-a.x,x.y-a.y,x.z-a.z];if(prev)d.forEach((v,i)=>assert.ok(Math.abs(v-prev![i])<1e-8));prev=d;}
  states++;
 }
}
const skin=new MarchingCubes(144,new T.MeshBasicMaterial(),false,false,120000);skin.isolation=0;let meshes=0;
for(const rule of ['regroup','identity','swap','generated'])for(const t of [.01,.5,.99])for(const spread of [0,1]){const c=specimen(rule,'uneven','exchange',t,1,'depth',0,spread);skin.reset();const members=fill(skin.field,144,c.edges,o);assert.ok(members.length<=40);skin.update();const n=skin.geometry.drawRange.count;assert.ok(n>0&&n<360000);for(const name of ['position','normal']){const a=skin.geometry.getAttribute(name).array;for(let i=0;i<n*3;i++)assert.ok(Number.isFinite(a[i]));}meshes++;}
console.log(JSON.stringify({states,meshes,checks:['spread preserves graph IDs, radii and x/y coordinates','zero spread recovers original embedding','carried A subtree local offsets remain fixed during rewriting','member interior centreline retained','finite extracted geometry; capacity respected'],limits:['GPU shading checked visually, not by this script','no proof of collision-free spatial embedding','no persistent mesh topology or UVs']},null,2));
