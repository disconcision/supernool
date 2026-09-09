import assert from 'node:assert/strict';
import * as T from 'three';
import {initial,actions,replace,walk} from './algebra';
import {layout,transition} from './layout';
import {prepare,valueAt,Options} from './surface';
import {rootedEdges} from './root-base';
const options:Options={thickness:1,taper:.8,bow:.8,random:.5,twist:.4,facets:.4,seed:2,blend:.1,hewn:true,rootAmount:.65,rootReach:1.6,rootFlare:.55};
const tree=initial(),config={spread:1,irregularity:.4,height:'depth',seed:2};
let frames=0;
for(const node of walk(tree))for(const action of actions(node)){
 const after=replace(tree,node.id,action.result);
 for(const t of [0,.25,.5,.75,1]){
  const pose=transition(tree,after,t,config,action.key,action.merge??{},options);
  const original=pose.edges.length,edges=rootedEdges(pose.edges,options),stem=prepare(edges.find(e=>e.id==='stem')!,options);
  assert.equal(pose.edges.length,original,'Adornments must not mutate expression geometry');
  assert.equal(edges.length,original+5);
  for(const e of edges.slice(original)){
   assert(valueAt(e.a.x,e.a.y,e.a.z,stem,options)>0,'Each root starts inside the trunk');
   assert(e.b.y<-.3,'Root ends buried beneath ground');
   const m=prepare(e,options);
   assert(m.tip<m.r*.11,'Roots taper into buried tips');
   for(const p of m.points)assert(Number.isFinite(valueAt(p.x,p.y,p.z,m,options)));
  }
  frames++;
 }
}
const stem={id:'stem',a:new T.Vector3(0,-.12,0),b:new T.Vector3(0,2,0),r:.43};
const plain={...options,bow:0,rootFlare:0},flared={...plain,rootFlare:1};
assert(valueAt(.6,0,0,prepare(stem,flared),flared)>0);
assert(valueAt(.6,0,0,prepare(stem,plain),plain)<0);
assert.equal(valueAt(.3,1.7,0,prepare(stem,plain),plain),valueAt(.3,1.7,0,prepare(stem,flared),flared),'Flare ends below upper trunk');
assert.equal(rootedEdges(layout(tree,config).edges,{...options,rootAmount:0}).length,layout(tree,config).edges.length);
console.log(`Root base: ${frames} rewrite frames, buried tapered roots, trunk attachment, local flare and unchanged expression structure.`);
