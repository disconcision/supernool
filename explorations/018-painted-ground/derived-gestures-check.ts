import assert from 'node:assert/strict';
import {derivedGestures} from './derived-gestures';
import {instantiate,problems} from './problems';
import {walk,count,find,key,evaluate,hint,solved} from './algebra';
import {layout,transition} from './layout';
const options={spread:0,irregularity:0,height:'depth',seed:1};
let candidates=0;
for(const problem of problems){
 const tree=instantiate(problem.start);
 for(const g of derivedGestures(tree)){
  candidates++;
  assert.equal(new Set(walk(g.after).map(n=>n.id)).size,count(g.after),'unique occurrence IDs');
  assert.ok(find(g.after,g.gripId),'held occurrence survives');
  for(const x of [-2,0,3])for(const y of [-1,0,2])assert.ok(evaluate(tree,x,y)===evaluate(g.after,x,y));
  for(const t of [0,.25,.5,.75,1]){
   const pose=transition(tree,g.after,t,options,g.action.key,g.action.merge);
   assert.ok(pose.points.has(g.gripId));
   for(const p of pose.points.values())assert.ok([p.x,p.y,p.z].every(Number.isFinite));
   if(t===1)assert.ok(pose.points.get(g.gripId)!.distanceTo(layout(g.after,options).points.get(g.gripId)!)<1e-8,'grip arrives at the advertised endpoint');
  }
 }
 // All existing reference-hint routes remain realizable with at least one
 // structurally derived contact. This does not certify gesture disambiguation.
 let current=tree;const target=instantiate(problem.target);
 for(let i=0;i<12&&!solved(current,target);i++){
  const h=hint(current,()=>true,target);assert.ok(h,problem.id);
  const candidates=derivedGestures(current).filter(g=>g.owner.id===h.nodeId&&key(g.action.result)===key(h.action.result));
  assert.ok(candidates.length,`${problem.id}: no contact for ${h.action.key}`);
  const g=candidates.find(g=>layout(current,options).points.get(g.gripId)!.distanceTo(layout(g.after,options).points.get(g.gripId)!)>.01);
  assert.ok(g,`${problem.id}: all contacts stationary for ${h.action.key}`);current=g.after;
 }
 assert.ok(solved(current,target),problem.id);
}
const absorption=instantiate(['*',['+','x','y'],0]);
const zero=walk(absorption).find(n=>n.kind==='num')!;
assert.ok(derivedGestures(absorption,zero.id).some(g=>g.action.key==='absorb-right'));
assert.ok(!derivedGestures(absorption).some(g=>g.action.key==='absorb-right'&&g.gripId!==zero.id));
const identity=instantiate(['+',['+','x','y'],0]);
assert.ok(identity.kind==='op');
assert.ok(derivedGestures(identity,identity.left.id).some(g=>g.action.key==='zero-right'));
assert.ok(!derivedGestures(identity,identity.right.id).some(g=>g.action.key==='zero-right'));
assert.ok(identity.left.kind==='op');
assert.ok(!derivedGestures(identity,identity.left.left.id).some(g=>g.owner.id===identity.id&&g.action.key==='zero-right'),'carried leaves not independent handles');
const factor=instantiate(['+',['*',3,['+','x','y']],['*',-3,['+','x','y']]]);
assert.ok(factor.kind==='op'&&factor.right.kind==='op');const held=factor.right.right;
const factored=derivedGestures(factor,held.id).find(g=>g.action.key.startsWith('factor'))!;
assert.ok(factored);assert.equal(key(find(factored.after,held.id)!),key(held));
for(const n of walk(held))assert.ok(find(factored.after,n.id));
for(const n of walk(held).slice(1))assert.ok(!derivedGestures(factor,n.id).some(g=>g.action.key.startsWith('factor')&&g.owner.id===factor.id),'interior of a matching factor is carried, not an independent merge handle');
// Distribution keeps the sum's + symbol, instead of silently turning the held +
// into one of the newborn products. The candidate geometry uses that same map.
const distributed=derivedGestures(absorption).find(g=>g.action.key==='distribute-left'&&g.gripId===(absorption.kind==='op'?absorption.left.id:''));
assert.ok(distributed);const sum=find(distributed.after,distributed.gripId)!;assert.ok(sum.kind==='op'&&sum.op==='+');
console.log(`Derived contacts: ${candidates} candidates, 15 solution routes, survivor/whole-subtree/endpoint checks passed.`);
