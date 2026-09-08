export type Term={id:string;kind:'num';value:number}|{id:string;kind:'var';name:string}|{id:string;kind:'op';op:'+'|'*';left:Term;right:Term};
/** merge maps retired IDs to survivors, or newborn IDs to source IDs for distribution. */
export type Action={key:string;label:string;detail:string;result:Term;merge?:Record<string,string>};
export const maxPlayableNodes=31;
export const fitsScene=(tree:Term,owner:Term,action:Action)=>count(tree)-count(owner)+count(action.result)<=maxPlayableNodes;
let next=1;const id=()=>`n${next++}`;
export const num=(value:number):Term=>({id:id(),kind:'num',value});
export const variable=(name:string):Term=>({id:id(),kind:'var',name});
export const op=(operator:'+'|'*',left:Term,right:Term):Term=>({id:id(),kind:'op',op:operator,left,right});
export function initial(){return op('+',op('+',op('+',op('*',num(2),variable('x')),num(0)),variable('y')),op('+',op('*',num(3),variable('x')),num(0)));}
export const children=(t:Term)=>t.kind==='op'?[t.left,t.right]:[];
export function walk(t:Term):Term[]{return [t,...children(t).flatMap(walk)];}
export const count=(t:Term)=>walk(t).length;
export function format(t:Term):string{return t.kind==='num'?String(t.value):t.kind==='var'?t.name:`(${format(t.left)} ${t.op==='*'?'×':'+'} ${format(t.right)})`;}
export function key(t:Term):string{return t.kind==='num'?String(t.value):t.kind==='var'?t.name:`${t.op}(${key(t.left)},${key(t.right)})`;}
export const same=(a:Term,b:Term)=>key(a)===key(b);
export function find(t:Term,id:string){return walk(t).find(n=>n.id===id);}
export function replace(t:Term,nodeId:string,value:Term):Term{return t.id===nodeId?value:t.kind==='op'?{...t,left:replace(t.left,nodeId,value),right:replace(t.right,nodeId,value)}:t;}
const literal=(t:Term,n:number)=>t.kind==='num'&&t.value===n;
export function actions(t:Term):Action[]{
 if(t.kind!=='op')return [];const out:Action[]=[],a=t.left,b=t.right;
 const add=(key:string,label:string,detail:string,result:Term,merge?:Record<string,string>)=>out.push({key,label,detail,result,merge});
 if(t.op==='+'){if(literal(a,0))add('zero-left','Remove zero','0 + A → A',b);if(literal(b,0))add('zero-right','Remove zero','A + 0 → A',a);}
 if(t.op==='*'){if(literal(a,0))add('absorb-left','Absorb into zero','0 × A → 0',a);if(literal(b,0))add('absorb-right','Absorb into zero','A × 0 → 0',b);if(literal(a,1))add('one-left','Remove one','1 × A → A',b);if(literal(b,1))add('one-right','Remove one','A × 1 → A',a);}
 if(a.kind==='num'&&b.kind==='num'&&Number.isSafeInteger(t.op==='+'?a.value+b.value:a.value*b.value))add('calculate','Combine numbers',`${a.value} ${t.op==='*'?'×':'+'} ${b.value}`,{id:t.id,kind:'num',value:t.op==='+'?a.value+b.value:a.value*b.value});
 if(t.op==='+'&&a.kind==='op'&&b.kind==='op'&&a.op==='*'&&b.op==='*'){
  // All four factor orientations. Preserve one occurrence, explicitly record its merge partner.
  for(const [factorA,otherA] of [[a.left,a.right],[a.right,a.left]])for(const [factorB,otherB] of [[b.left,b.right],[b.right,b.left]])if(same(factorA,factorB)){
   const merge:Record<string,string>={};const aa=walk(factorA),bb=walk(factorB);bb.forEach((n,i)=>merge[n.id]=aa[i].id);
   add('factor-'+factorA.id+'-'+factorB.id,'Factor common '+format(factorA),'A×X + B×X → (A+B)×X',{id:t.id,kind:'op',op:'*',left:{id:a.id,kind:'op',op:'+',left:otherA,right:otherB},right:factorA},merge);
  }
 }
 if(t.op==='*'){
  for(const [sum,factor,side] of [[a,b,'left'],[b,a,'right']] as const){if(sum.kind!=='op'||sum.op!=='+')continue;
   const correspondence:Record<string,string>={};
   const clone=(n:Term):Term=>{const fresh=id();correspondence[fresh]=n.id;return n.kind==='op'?{...n,id:fresh,left:clone(n.left),right:clone(n.right)}:{...n,id:fresh};};
   const copy=clone(factor),branch=id();correspondence[branch]=t.id;
   const product=(productId:string,operand:Term,f:Term):Term=>({id:productId,kind:'op',op:'*',left:side==='left'?operand:f,right:side==='left'?f:operand});
   add('distribute-'+side,'Distribute across the sum','A × (B + C) → A×B + A×C',
    {id:t.id,kind:'op',op:'+',left:product(sum.id,sum.left,factor),right:product(branch,sum.right,copy)},correspondence);
  }
 }
 add('swap','Swap branches',`A ${t.op} B → B ${t.op} A`,{...t,left:b,right:a});
 if(a.kind==='op'&&a.op===t.op)add('group-right','Regroup to the right','(A ⋄ B) ⋄ C → A ⋄ (B ⋄ C)',{id:a.id,kind:'op',op:t.op,left:a.left,right:{id:t.id,kind:'op',op:t.op,left:a.right,right:b}});
 if(b.kind==='op'&&b.op===t.op)add('group-left','Regroup to the left','A ⋄ (B ⋄ C) → (A ⋄ B) ⋄ C',{id:b.id,kind:'op',op:t.op,left:{id:t.id,kind:'op',op:t.op,left:a,right:b.left},right:b.right});
 return out;
}
export function evaluate(t:Term,x:number,y:number):number{return t.kind==='num'?t.value:t.kind==='var'?(t.name==='x'?x:y):t.op==='+'?evaluate(t.left,x,y)+evaluate(t.right,x,y):evaluate(t.left,x,y)*evaluate(t.right,x,y);}
/** Association and sibling order may vary, but identities/calculations still need rewriting. */
export function goalKey(t:Term):string{
 if(t.kind!=='op')return key(t);
 const parts=(n:Term):string[]=>n.kind==='op'&&n.op===t.op?[...parts(n.left),...parts(n.right)]:[goalKey(n)];
 return t.op+'['+parts(t).sort().join(',')+']';
}
export function solved(t:Term,target?:Term){
 if(target)return goalKey(t)===goalKey(target);
 const isX=(n:Term)=>n.kind==='var'&&n.name==='x';
 const isY=(n:Term)=>n.kind==='var'&&n.name==='y';
 const isFive=(n:Term)=>n.kind==='num'&&n.value===5;
 const product=(n:Term)=>n.kind==='op'&&n.op==='*'&&((isFive(n.left)&&isX(n.right))||(isX(n.left)&&isFive(n.right)));
 return t.kind==='op'&&t.op==='+'&&((product(t.left)&&isY(t.right))||(isY(t.left)&&product(t.right)));
}
// Hints search actual legal moves. They do not mutate the current term or auto-play a script.
export function hint(root:Term,allowed:(owner:Term,action:Action,tree:Term)=>boolean=()=>true,target?:Term):{nodeId:string;action:Action}|undefined{
 const queue:{t:Term;first?:{nodeId:string;action:Action};depth:number}[]=[{t:root,depth:0}],seen=new Set([key(root)]);let at=0;
 while(at<queue.length&&at<8000){const q=queue[at++];if(solved(q.t,target)&&q.first)return q.first;if(q.depth>=12)continue;
  for(const n of walk(q.t))for(const a of actions(n)){if(!allowed(n,a,q.t))continue;if(!fitsScene(q.t,n,a))continue;const t=replace(q.t,n.id,a.result),k=key(t);if(seen.has(k))continue;seen.add(k);queue.push({t,first:q.first??{nodeId:n.id,action:a},depth:q.depth+1});}
 }
}

/** Reading view; the spatial tree continues to show exact association. */
export function readable(t:Term,parent=0):string{if(t.kind==='num')return t.value<0?'('+String(t.value).replace('-','−')+')':String(t.value);if(t.kind==='var')return t.name;const precedence=t.op==='+'?1:2;let s:string;
 if(t.op==='*'&&t.left.kind==='num'&&t.right.kind==='var')s=readable(t.left)+readable(t.right);
 else s=readable(t.left,precedence)+(t.op==='+'?' + ':'\u00a0×\u00a0')+readable(t.right,precedence);
 return precedence<parent?'('+s+')':s;}
