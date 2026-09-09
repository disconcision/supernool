/** Generate data for the explanatory scope comparison; no gameplay imports change. */
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {initial,walk,find,same,replace,Term,format,evaluate} from '../../../explorations/018-painted-ground/algebra';
import {derivedGestures} from '../../../explorations/018-painted-ground/derived-gestures';
import {gestures,Gesture} from '../../../explorations/018-painted-ground/gestures';
const tree=initial();
const pathMap=(tree:Term)=>{const m=new Map<string,string>();const go=(t:Term,p:string)=>{m.set(t.id,p);if(t.kind==='op'){go(t.left,p+'L');go(t.right,p+'R');}};go(tree,'');return m;};
const paths=pathMap(tree);
const byPath=(path:string)=>walk(tree).find(n=>paths.get(n.id)===path)!;
const names:Record<string,string>={'':'R','L':'P','LL':'Q','LLL':'M','R':'S','RL':'N'};
const labels=Object.fromEntries(walk(tree).map(n=>[n.id,n.kind==='op'?names[paths.get(n.id)!]:n.kind==='num'?String(n.value):n.name]));
const base=derivedGestures(tree);
const fixed:Gesture[]=[];
for(const g of base){
 if(!g.action.key.startsWith('group')){fixed.push(g);continue;}
 // One entry per rewrite site/direction; derive fresh handles after remapping joints.
 if(fixed.some(h=>h.owner.id===g.owner.id&&h.action.key===g.action.key))continue;
 const outer=g.owner.id,inner=g.action.result.id;
 const swap=(t:Term):Term=>{const id=t.id===outer?inner:t.id===inner?outer:t.id;return t.kind==='op'?{...t,id,left:swap(t.left),right:swap(t.right)}:{...t,id};};
 const result=swap(g.action.result),oldPaths=pathMap(g.owner),newPaths=pathMap(result);
 for(const held of walk(g.owner)){
  if(!find(result,held.id)||oldPaths.get(held.id)===newPaths.get(held.id))continue;
  const carried=walk(g.owner).some(a=>a.id!==held.id&&oldPaths.get(held.id)!.startsWith(oldPaths.get(a.id)!)&&find(result,a.id)&&same(a,find(result,a.id)!)&&oldPaths.get(a.id)!==newPaths.get(a.id));
  if(!carried)fixed.push({...g,gripId:held.id,targetId:held.id,action:{...g.action,result},after:replace(tree,outer,result)});
 }
}
const joints=(g:Gesture)=>!g.action.key.startsWith('group')||g.gripId===g.owner.id||g.gripId===(g.owner.kind==='op'?(g.action.key==='group-right'?g.owner.left.id:g.owner.right.id):'');
const near=(g:Gesture)=>(paths.get(g.gripId)!.length-paths.get(g.owner.id)!.length)<=1;
const policies=[
 {id:'current',label:'Current · all participating roots',description:'Exchange the two pluses; moving whole operands can also initiate regrouping.',list:base},
 {id:'joints',label:'Regroup by junctions only',description:'Only the two pluses involved in associativity can initiate it. Other rules stay unchanged.',list:base.filter(joints)},
 {id:'near',label:'Rewrite at self or parent only',description:'Keep current handles, but reject rewrites rooted two or more levels above the grab.',list:base.filter(near)},
 {id:'fixed',label:'Keep the outer plus identity',description:'The outer plus stays the outer plus; the inner plus crosses sides. Moving operands remain handles.',list:fixed},
 {id:'fixed-joints',label:'Outer plus identity + junctions only',description:'Combine the alternative plus correspondence with junction-only regrouping.',list:fixed.filter(joints)},
 {id:'authored',label:'Earlier authored handles',description:'The earlier contact table: one inner-junction handle for each regroup; disappearing zeros initiate identity.',list:gestures(tree)}
];
const serial=(t:Term):any=>({id:t.id,label:labels[t.id]??(t.kind==='num'?String(t.value):t.kind==='var'?t.name:'?'),symbol:t.kind==='op'?(t.op==='*'?'×':'+'):t.kind==='num'?String(t.value):t.name,children:t.kind==='op'?[serial(t.left),serial(t.right)]:[]});
for(const p of policies)for(const g of p.list){for(const x of [-2,0,3])for(const y of [-1,4])assert.equal(evaluate(g.after,x,y),evaluate(tree,x,y));assert.equal(new Set(walk(g.after).map(n=>n.id)).size,walk(g.after).length);}
const rows=policies.map(p=>({id:p.id,label:p.label,description:p.description,candidates:p.list.map(g=>({key:g.owner.id+':'+g.action.key,grip:g.gripId,owner:g.owner.id,rule:g.action.key,label:g.action.label,result:serial(g.after),formula:format(g.after),target:g.derived?g.gripId:g.targetId,derived:!!g.derived}))}));
assert.equal(rows[0].candidates.filter(c=>c.grip===byPath('L').id).length,4);
assert.equal(rows[1].candidates.filter(c=>c.grip===byPath('L').id).length,3);
assert.equal(rows[2].candidates.filter(c=>c.grip===byPath('L').id).length,4);
assert.equal(rows[3].candidates.filter(c=>c.grip===byPath('L').id).length,3);
assert.equal(rows[4].candidates.filter(c=>c.grip===byPath('L').id).length,2);
const picks=[['L','P · the plus you identified'],['LLL','M · left 2×x'],['LL','Q · left 2x+0'],['','R · whole-tree root'],['LLR','0 · beside 2x'],['LLLL','2 · inside 2x'],['LLLR','x · inside 2x']].map(([p,label])=>({id:byPath(p).id,label}));
const out={tree:serial(tree),policies:rows,picks};
writeFileSync(process.argv[2],JSON.stringify(out));
console.table(picks.map(n=>({node:n.label,...Object.fromEntries(rows.map(p=>[p.id,p.candidates.filter(c=>c.grip===n.id).length]))})));
