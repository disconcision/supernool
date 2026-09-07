import assert from 'node:assert/strict';
import * as T from 'three';
import {initial,walk,actions,replace,format,Term} from './algebra';
import {layout,transition} from './layout';
import {prepare,Options} from './surface';
const surface:Options={thickness:1.1,taper:.75,bow:.8,random:.4,twist:.5,facets:.4,seed:2,blend:.1,hewn:true,spread:0};
// Distances to actual curved members, not the straight skeleton chords.
function distance(p:T.Vector3,m:ReturnType<typeof prepare>){
 let lo=0,hi=1;const at=(t:number)=>m.e.a.clone().addScaledVector(m.d,t).addScaledVector(m.curve,Math.sin(Math.PI*t));
 for(let i=0;i<40;i++){const a=lo+(hi-lo)/3,b=hi-(hi-lo)/3;if(at(a).distanceToSquared(p)<at(b).distanceToSquared(p))hi=b;else lo=a;}
 return Math.min(at((lo+hi)/2).distanceTo(p),m.e.a.distanceTo(p),m.e.b.distanceTo(p));
}
let frontier=[initial()],seen=new Set<string>(),moves=0,frames=0;
for(let depth=0;depth<3;depth++){
 const next:Term[]=[];
 for(const tree of frontier)for(const n of walk(tree))for(const action of actions(n).filter(a=>a.key.startsWith('group'))){
  const after=replace(tree,n.id,action.result);moves++;
  for(const spread of [0,1])for(const bow of [0,.8]){
   const o={spread,irregularity:.25,height:'depth',seed:2},opt={...surface,spread,bow};
   for(const t of [0,.1,.25,.49,.5,.51,.75,.9,.9999,1]){
    const pose=transition(tree,after,t,o,action.key,{},opt),members=pose.edges.map(e=>prepare(e,opt));frames++;
    for(const [id,p]of pose.points)assert(Math.min(...members.map(m=>distance(p,m)))<1e-5,`${action.key} ${n.id} @${t}: sigil ${id} off wood`);
    // Walk the union of connected centrelines; every member must reach the stem.
    const reached=new Set([members.findIndex(m=>m.e.id==='stem')]);assert(!reached.has(-1));
    for(let pass=0;pass<members.length;pass++)for(let i=0;i<members.length;i++)for(let j=0;j<members.length;j++)if(reached.has(j)&&!reached.has(i)){
     const a=members[i],b=members[j];if(Math.min(distance(a.e.a,b),distance(a.e.b,b),distance(b.e.a,a),distance(b.e.b,a))<1e-5)reached.add(i);
    }
    assert.equal(reached.size,members.length,`${action.key} ${n.id} @${t}: detached member`);
    if(t===0||t===1){const expected=layout(t?after:tree,o);for(const [id,p]of expected.points)assert(p.distanceTo(pose.points.get(id)!)<1e-8);assert.equal(pose.edges.length,expected.edges.length);}
    if(t===.9999){const expected=layout(after,o),end=expected.edges.map(e=>prepare(e,opt));for(const m of members)for(const p of m.points)assert(Math.min(...end.map(e=>distance(p,e)))<.002,'No end-of-animation geometry snap');}
   }
  }
  const key=format(after);if(!seen.has(key)){seen.add(key);next.push(after);}
 }
 frontier=next;
}
console.log(`${moves} root/nested regroupings; ${frames} frames: sigils stay on wood, every member connected, endpoints match steady layouts. Includes spatial and high-bow trees.`);
