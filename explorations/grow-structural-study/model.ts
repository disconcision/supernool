/** A motion scaffold is deliberately unranked. It is NOT an intermediate algebraic term. */
export type Id = string;
export type Tree = { id: Id; label: string; children: Tree[] };
export type Term =
  | { kind: 'atom'; id: Id; symbol: string }
  | { kind: 'binary'; id: Id; operator: '+' | '*'; left: Term; right: Term };
export type Extend = { kind: 'extend'; parent: Id; index: number; count: number; id: Id; label: string };
export type Retract = { kind: 'retract'; id: Id };
export type Branch = { kind: 'branch'; source: Id; index: number; copies: Record<Id, Id> };
export type Merge = { kind: 'merge'; keep: Id; remove: Id };
export type Primitive2 = Extend | Retract;
export type Primitive4 = Primitive2 | Branch | Merge;
export type Basis = 'two' | 'four';
export type Event = { operation: Primitive4; inverse: Primitive4; born: Id[]; removed: Id[]; copied: Record<Id, Id>; restored?: boolean };
export type Step = { tree: Tree; event?: Event; caption: string };
export const atom = (id: Id, symbol = id): Term => ({ kind: 'atom', id, symbol });
export const bin = (id: Id, operator: '+' | '*', left: Term, right: Term): Term => ({kind:'binary',id,operator,left,right});
export const node = (id: Id, label: string, children: Tree[] = []): Tree => ({id,label,children});
export const clone = (t: Tree): Tree => ({...t,children:t.children.map(clone)});
export const ids = (t: Tree): Id[] => [t.id,...t.children.flatMap(ids)];
export function fromTerm(t: Term): Tree { return t.kind==='atom'?node(t.id,t.symbol):node(t.id,t.operator,[fromTerm(t.left),fromTerm(t.right)]); }
export const wrap = (t: Term): Tree => node('world','Ω',[fromTerm(t)]);
export function find(t: Tree,id: Id): Tree { if(t.id===id)return t;for(const c of t.children){try{return find(c,id);}catch{}}throw Error(`Missing node ${id}`); }
export function parent(t: Tree,id: Id): Tree {for(const c of t.children){if(c.id===id)return t;try{return parent(c,id);}catch{}}throw Error(`Missing parent for ${id}`);}
export function equal(a: Tree,b: Tree): boolean {return a.label===b.label&&a.children.length===b.children.length&&a.children.every((c,i)=>equal(c,b.children[i]));}
export function validate(t: Tree): void {const all=ids(t);if(t.id!=='world'||new Set(all).size!==all.length)throw Error('Invalid root or duplicate IDs');}
const integer=(n:number)=>Number.isInteger(n)&&n>=0;
export function apply(input: Tree, op: Primitive4): {tree:Tree;event:Event} {
 validate(input);const tree=clone(input);const event:Event={operation:op,inverse:op,born:[],removed:[],copied:{}};
 switch(op.kind){
 case 'extend': {
  const p=find(tree,op.parent);
  if(ids(tree).includes(op.id)||!integer(op.index)||!integer(op.count)||op.index>p.children.length||op.index+op.count>p.children.length)throw Error('Invalid extension');
  const kids=p.children.splice(op.index,op.count);p.children.splice(op.index,0,node(op.id,op.label,kids));event.born=[op.id];event.inverse={kind:'retract',id:op.id};break;
 }
 case 'retract': {
  if(op.id==='world')throw Error('Cannot retract sentinel');const p=parent(tree,op.id),i=p.children.findIndex(x=>x.id===op.id),n=p.children[i];
  p.children.splice(i,1,...n.children);event.removed=[n.id];event.inverse={kind:'extend',parent:p.id,index:i,count:n.children.length,id:n.id,label:n.label};break;
 }
 case 'branch': {
  const source=find(tree,op.source),p=parent(tree,source.id),old=ids(source),fresh=old.map(id=>op.copies[id]);
  if(!integer(op.index)||op.index>p.children.length||Object.keys(op.copies).length!==old.length||fresh.some(id=>!id||ids(tree).includes(id))||new Set(fresh).size!==fresh.length)throw Error('Invalid copy map or slot');
  const copy=(n:Tree):Tree=>node(op.copies[n.id],n.label,n.children.map(copy));p.children.splice(op.index,0,copy(source));event.born=fresh;event.copied={...op.copies};event.inverse={kind:'merge',keep:source.id,remove:op.copies[source.id]};break;
 }
 case 'merge': {
  if(op.keep===op.remove)throw Error('Merge needs two occurrences');const a=find(tree,op.keep),b=find(tree,op.remove),p=parent(tree,a.id),q=parent(tree,b.id);
  if(p.id!==q.id||!equal(a,b))throw Error('Merge requires equal sibling subtrees');
  const i=p.children.findIndex(n=>n.id===b.id),map:Record<Id,Id>={};const pair=(x:Tree,y:Tree)=>{map[x.id]=y.id;x.children.forEach((c,j)=>pair(c,y.children[j]));};pair(a,b);
  p.children.splice(i,1);event.removed=ids(b);event.copied=map;event.inverse={kind:'branch',source:a.id,index:i,copies:map};break;
 }
 }
 validate(tree);return {tree,event};
}
export function expression(t: Tree): string {
 if(t.id==='world')return t.children.length===1?expression(t.children[0]):`forest[${t.children.map(expression).join(', ')}]`;
 if(t.children.length===0)return t.label;
 if(['+','*'].includes(t.label)&&t.children.length===2)return `(${expression(t.children[0])} ${t.label==='*'?'×':'+'} ${expression(t.children[1])})`;
 return `${t.label}⟨${t.children.map(expression).join(', ')}⟩`;
}
export function value(t: Tree,env:Record<string,number>):number {
 if(t.id==='world'){if(t.children.length!==1)throw Error('Not one term');return value(t.children[0],env);}
 if(t.children.length===0){if(t.label==='0')return 0;if(t.label==='1')return 1;if(!(t.label in env))throw Error('Unknown atom');return env[t.label];}
 if(t.children.length!==2||!['+','*'].includes(t.label))throw Error('Not a ranked arithmetic term');
 const a=value(t.children[0],env),b=value(t.children[1],env);return t.label==='+'?a+b:a*b;
}
export type Rule = 'commute' | 'associate' | 'identity' | 'distribute';
export type Study = { rule: Rule; basis: Basis; before: Term; after: Term; steps: Step[]; explanation:string; expected:Tree };
export function study(rule:Rule,basis:Basis,nested=false,reverse=false):Study {
 const a=nested?bin('a','+',atom('x'),atom('y')):atom('a'), b=atom('b'),c=atom('c');
 const a2:Term=nested?bin('a2','+',atom('x2','x'),atom('y2','y')):atom('a2','a');
 let before:Term,after:Term;
 if(rule==='commute'){before=bin('p','+',a,b);after=bin('p','+',b,a);}
 else if(rule==='associate'){before=bin('p','+',bin('q','+',a,b),c);after=bin('p','+',a,bin('q','+',b,c));}
 else if(rule==='identity'){before=a;after=bin('p','+',atom('z','0'),a);}
 else {before=bin('m','*',a,bin('p','+',b,c));after=bin('p','+',bin('m','*',a,b),bin('m2','*',a2,c));}
 let current=wrap(before);const steps:Step[]=[{tree:current,caption:'Before — valid term'}];
 const act=(operation:Primitive4,caption:string)=>{const r=apply(current,operation);current=r.tree;steps.push({tree:current,event:r.event,caption});};
 const extend=(p:Id,index:number,count:number,id:Id,label:string,caption:string)=>act({kind:'extend',parent:p,index,count,id,label},caption);
 const retract=(id:Id,caption:string)=>act({kind:'retract',id},caption);
 function erase(n:Tree){n.children.forEach(erase);retract(n.id,`Retract ${n.label} [${n.id}]; save its identity for reconstruction`);}
 function build(n:Tree,p:Id,i:number){extend(p,i,0,n.id,n.label,`Extend ${n.label} [${n.id}] at child slot ${i}`);n.children.forEach((c,j)=>build(c,n.id,j));}
 if(rule==='associate'){
  retract('q','Retract inner + q; promote its children in order');extend('p',1,2,'q','+','Extend + q around the second and third children');
 }else if(rule==='identity'){
  extend('world',0,1,'p','+','Extend + p around the existing term');extend('p',0,0,'z','0','Extend zero as the first child; original term remains');
 }else if(rule==='commute'){
  erase(fromTerm(a));build(fromTerm(a),'p',1);
 }else{
  retract('m','Retract × m; expose a and the sum in a temporary forest');retract('p','Retract + p; expose a, b, c');extend('world',0,3,'p','+','Extend + p around the three children');
  if(basis==='four'){
   const map:Record<Id,Id>={};const pair=(x:Tree,y:Tree)=>{map[x.id]=y.id;x.children.forEach((n,i)=>pair(n,y.children[i]));};pair(fromTerm(a),fromTerm(a2));
   act({kind:'branch',source:a.id,index:2,copies:map},'Branch a into a2, after b; copy every descendant with explicit provenance');
  }else build(fromTerm(a2),'p',2);
  extend('p',0,2,'m','*','Extend × m around a and b');extend('p',1,2,'m2','*','Extend × m2 around the copied a and c');
 }
 const expected=wrap(after);if(JSON.stringify(current)!==JSON.stringify(expected))throw Error(`Wrong endpoint for ${rule}`);
 let resultSteps=steps;
 if(reverse){let r=current;resultSteps=[{tree:r,caption:'Before — valid term'}];for(let i=steps.length-1;i>0;i--){const next=apply(r,steps[i].event!.inverse);r=next.tree;resultSteps.push({tree:r,event:next.event,caption:next.event.operation.kind==='retract'?`Retract ${next.event.operation.id}; promote its children in order`:next.event.operation.kind==='extend'?`Extend ${next.event.operation.label} [${next.event.operation.id}] around ${next.event.operation.count} children at slot ${next.event.operation.index}`:next.event.operation.kind==='merge'?`Merge equal subtrees ${next.event.operation.remove} into ${next.event.operation.keep}`:`Branch ${next.event.operation.source}; restore its copied subtree`});}[before,after]=[after,before];}
 resultSteps[resultSteps.length-1].caption+=' — valid target term';
 return {rule,basis,before,after,steps:resultSteps,expected:wrap(after),explanation:rule==='commute'?'Both bases rebuild the moved operand. Endpoint IDs are restored, but continuous existence is lost. A direct exchange motion would need additional transport state.':rule==='associate'?'Three meaningful checkpoints: grouped left, one unranked junction, grouped right. q is removed and restored; keeping a latent joint is a future animation policy.':rule==='identity'?'The original subtree stays intact. Operator and zero appear as separate events. Reverse removes zero then unwraps the operator.':basis==='four'?'The branch event copies the full operand in one step; reversing it performs a checked merge. Operator scaffolding is still extended/retracted.':'The two-operation basis reconstructs the copied operand node by node. Compare this with explicit branching, especially for a nested operand.'};
}
