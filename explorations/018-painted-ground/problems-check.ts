import assert from 'node:assert/strict';
import {problems,instantiate} from './problems';
import {solved,hint,replace,walk,evaluate,actions,count,format,fitsScene} from './algebra';
import {gestures} from './gestures';
import {rules,ruleId} from './interaction';
import {layout,transition} from './layout';
for(const p of problems){
 let tree=instantiate(p.start);const goal=instantiate(p.target),route:string[]=[],started=performance.now();
 for(let i=0;i<14&&!solved(tree,goal);i++){
  const h=hint(tree,undefined,goal);assert(h,'No hint route for '+p.id+' from '+format(tree));
  const g=gestures(tree).find(g=>g.owner.id===h.nodeId&&g.action.key===h.action.key);
  // Expansion actions allocate fresh IDs per enumeration; action keys and owner identify the same rewrite.
  assert(g,'Missing gesture for '+h.action.key);const before=tree;tree=g.after;route.push(h.action.key);
  assert.equal(new Set(walk(tree).map(n=>n.id)).size,count(tree));
  for(const x of [-3,0,2])for(const y of [-2,0,4])assert.equal(evaluate(tree,x,y),evaluate(before,x,y));
  for(const spread of [0,1])for(const t of [0,.25,.5,.75,1]){
   const pose=transition(before,tree,t,{spread,irregularity:.25,height:'depth',seed:2},g.action.key,g.action.merge);
   for(const e of pose.edges)assert([...e.a.toArray(),...e.b.toArray(),e.r].every(Number.isFinite));
  }
 }
 assert(solved(tree,goal),'Unfinished '+p.id);console.log(p.id,route,Math.round(performance.now()-started)+'ms');
 for(const n of walk(instantiate(p.start)))for(const a of actions(n))assert(rules.some(r=>r.id===ruleId(n,a)));
}
// Goal equivalence allows rearrangement, not unevaluated numerical equality.
assert(solved(instantiate(['+','y',['*','x',5]]),instantiate(['+',['*',5,'x'],'y'])));
assert(!solved(instantiate(['+',2,3]),instantiate(5)));
assert(!solved(instantiate(['+','x',0]),instantiate('x')));
assert.equal(hint(instantiate(['+',2,3]),()=>false,instantiate(5)),undefined);
assert(!actions(instantiate(['*',Number.MAX_SAFE_INTEGER,2])).some(a=>a.key==='calculate'));
// Compound copies retain exact source correspondence, unique occurrences and meaning on either side.
for(const expr of [ ['*',['+','x',2],['+','y',3]], ['*',['+',2,3],['*','x','y']] ] as const){
 const t=instantiate(expr as any);
 for(const a of actions(t).filter(a=>a.key.startsWith('distribute'))){
  const ids=new Set(walk(t).map(n=>n.id));
  const copied=walk(a.result).filter(n=>!ids.has(n.id));assert(copied.length>0);
  for(const n of copied)assert(ids.has(a.merge![n.id]));
  const old=layout(t,{spread:0,irregularity:.25,height:'depth',seed:2});
  for(const u of [.1,.25,.5,.75,.9]){
   const pose=transition(t,a.result,u,{spread:0,irregularity:.25,height:'depth',seed:2},a.key,a.merge);
   for(const n of copied){const parent=pose.parents.get(n.id)!;
    if(a.merge![parent]===old.parents.get(a.merge![n.id])){
     const member=pose.edges.find(e=>e.id===n.id);assert(member);
     assert(member.a.distanceTo(pose.points.get(parent)!)<1e-9,'Copy must stay attached to its copied parent');
    }
   }
  }
  assert.equal(new Set(walk(a.result).map(n=>n.id)).size,count(a.result));
  for(const x of [-2,0,3])for(const y of [-1,0,4])assert.equal(evaluate(t,x,y),evaluate(a.result,x,y));
 }
}
console.log('Goal, disabled-rule, exact-integer and compound-copy checks passed');

let huge=instantiate('x');for(let i=0;i<16;i++)huge={id:'cap'+i,kind:'op',op:'+',left:huge,right:instantiate('y')};
const tooLarge=instantiate(['*',['+','x','y'],1]);assert(!fitsScene(huge,huge,{key:'test',label:'',detail:'',result:{id:'expanded',kind:'op',op:'*',left:huge,right:tooLarge}}));
