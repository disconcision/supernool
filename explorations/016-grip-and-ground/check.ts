import assert from 'node:assert/strict';import {initial,walk,actions,replace,evaluate,hint,solved,count,format} from './algebra';import {layout,transition} from './layout';
let tree=initial(),route:any[]=[];assert.equal(count(tree),13);
for(let step=0;step<12&&!solved(tree);step++){const start=performance.now(),h=hint(tree);assert.ok(h,'Hint search must find a route');const old=tree;tree=replace(tree,h.nodeId,h.action.result);route.push({move:h.action.label,before:format(old),after:format(tree),hintMs:Math.round(performance.now()-start)});
 for(const x of [-3,0,2])for(const y of [-2,0,4])assert.equal(evaluate(old,x,y),evaluate(tree,x,y));
 assert.equal(new Set(walk(tree).map(n=>n.id)).size,count(tree));
 for(const spread of [0,1])for(const t of [0,.25,.5,.75,1]){const p=transition(old,tree,t,{spread,irregularity:.25,height:'depth',seed:2},h.action.key,h.action.merge);p.edges.forEach(e=>assert.ok([e.a.x,e.a.y,e.a.z,e.b.x,e.b.y,e.b.z,e.r].every(Number.isFinite)));}
}
assert.ok(solved(tree));
// Every offered move on a range of reachable states preserves exact integer evaluations.
let frontier=[initial()],seen=new Set<string>(),checked=0;
for(let depth=0;depth<3;depth++){const next:typeof frontier=[];for(const t of frontier)for(const n of walk(t))for(const a of actions(n)){const changed=replace(t,n.id,a.result);for(const x of [-2,0,3])for(const y of [-1,0,2])assert.equal(evaluate(changed,x,y),evaluate(t,x,y));checked++;const k=format(changed);if(!seen.has(k)){seen.add(k);next.push(changed);}}frontier=next;}
console.log(JSON.stringify({initialNodes:13,finalNodes:count(tree),moves:route.length,route,checkedLegalMoves:checked},null,2));

import {gestures,scoreDrag} from './gestures';
let tactileTree=initial();let contacts=0;
while(!solved(tactileTree)){
 const h=hint(tactileTree)!;
 const g=gestures(tactileTree).find(g=>g.owner.id===h.nodeId&&g.action.key===h.action.key);
 assert.ok(g,`A physical contact must exist for ${h.action.key}`);
 assert.ok(walk(tactileTree).some(n=>n.id===g.gripId));
 assert.ok(walk(tactileTree).some(n=>n.id===g.braceId));
 assert.ok(walk(tactileTree).some(n=>n.id===g.targetId));
 assert.equal(format(g.after),format(replace(tactileTree,h.nodeId,h.action.result)));
 tactileTree=g.after;contacts++;
}
assert.equal(contacts,6);
assert.equal(scoreDrag({x:0,y:0},{x:100,y:0},{x:50,y:0}).ready,false);
assert.equal(scoreDrag({x:0,y:0},{x:100,y:0},{x:100,y:0}).ready,true);
assert.equal(scoreDrag({x:0,y:0},{x:100,y:0},{x:100,y:80}).ready,false);
assert.equal(scoreDrag({x:0,y:0},{x:100,y:0},{x:0,y:0}).progress,0);
console.log('Six physical gesture mappings and cancellation/commit thresholds passed.');

import {rules,ruleId,allowsPin,advanceSpring} from './interaction';
const pinTree=initial(),pinLayout={spread:0,irregularity:.25,height:'depth',seed:2};
const rootPoint=layout(pinTree,pinLayout).points.get(pinTree.id)!;
const rootPin={id:pinTree.id,position:rootPoint};
const rootMoves=actions(pinTree);
assert.equal(allowsPin(pinTree,pinTree,rootMoves.find(a=>a.key==='swap')!,rootPin,pinLayout),true);
for(const a of rootMoves.filter(a=>a.key.startsWith('group')))assert.equal(allowsPin(pinTree,pinTree,a,rootPin,pinLayout),false);
const leaf=walk(pinTree).find(n=>n.kind==='var')!;
assert.equal(allowsPin(pinTree,pinTree,rootMoves.find(a=>a.key==='swap')!,{id:leaf.id,position:layout(pinTree,pinLayout).points.get(leaf.id)!},pinLayout),false);
for(const n of walk(pinTree))for(const a of actions(n))assert.ok(rules.some(r=>r.id===ruleId(n,a)));
assert.equal(hint(pinTree,()=>false),undefined);
for(const mass of [.6,1.4,3]){
 let s={value:0,velocity:0};s=advanceSpring(s,1,.016,mass);assert.ok(s.value>0&&s.value<.1,'Spring must lag a sudden pull');
 for(let i=0;i<500;i++)s=advanceSpring(s,1,.016,mass);assert.ok(s.value>.999);
 for(let i=0;i<500;i++)s=advanceSpring(s,0,.016,mass);assert.ok(s.value<.001);assert.ok(Number.isFinite(s.velocity));
}
console.log('Root-pin swap/regroup discrimination, displaced-leaf pin rejection, loadout filtering and spring convergence passed.');

import * as T from 'three';import {directionalContact} from './navigation';
const navCamera=new T.OrthographicCamera(-11*1280/720,11*1280/720,11,-11,.1,90);navCamera.position.set(13,12,21);navCamera.lookAt(0,2,0);navCamera.updateMatrixWorld();
let navTree=initial(),navStates=0;
while(true){
 const pose=layout(navTree,{spread:0,irregularity:.25,height:'depth',seed:2});
 const projected=Array.from(pose.points,([id,p])=>{const v=p.clone().add(new T.Vector3(-1,0,-3)).project(navCamera);return {id,x:(v.x+1)*640,y:(1-v.y)*360};});
 for(const start of projected){const reached=new Set([start.id]),queue=[start.id];for(let at=0;at<queue.length;at++)for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const next=directionalContact(projected,queue[at],dx,dy);if(!reached.has(next)){reached.add(next);queue.push(next);}}assert.equal(reached.size,projected.length,'Every contact must be reachable by arrows from '+start.id);}
 navStates++;if(solved(navTree))break;const h=hint(navTree)!;navTree=replace(navTree,h.nodeId,h.action.result);
}
console.log(`Directional hand navigation reaches every contact from every starting contact in all ${navStates} simplification states.`);
