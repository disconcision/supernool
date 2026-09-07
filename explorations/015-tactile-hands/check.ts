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
