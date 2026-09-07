export type Tree={id:string;label:string;children:Tree[]};
export type Mapping='keep-root'|'exchange-roles';
export type DirectEdit={kind:'swap';parent:string;left:number;right:number}|{kind:'regroup';parent:string;direction:'right'|'left';mapping?:Mapping}|{kind:'add-zero';target:string;sum:string;zero:string};
export const n=(id:string,label=id,children:Tree[]=[]):Tree=>({id,label,children});
export const ids=(t:Tree):string[]=>[t.id,...t.children.flatMap(ids)];
export function locate(t:Tree,id:string):Tree {if(t.id===id)return t;for(const c of t.children){if(ids(c).includes(id))return locate(c,id);}throw Error('Missing '+id);}
export function apply(t:Tree,e:DirectEdit):Tree {
 const visit=(v:Tree):Tree=>{
 if(e.kind==='add-zero'&&v.id===e.target)return n(e.sum,'+',[n(e.zero,'0'),v]);
 if(e.kind!=='add-zero'&&v.id===e.parent){
  if(e.kind==='swap'){const a=[...v.children];if(e.left===e.right||![e.left,e.right].every(i=>Number.isInteger(i)&&i>=0&&i<a.length))throw Error('Bad swap slots');[a[e.left],a[e.right]]=[a[e.right],a[e.left]];return {...v,children:a};}
  if(v.label!=='+'||v.children.length!==2)throw Error('Regroup needs a binary sum');
  const q=v.children[e.direction==='right'?0:1];if(q.label!=='+'||q.children.length!==2)throw Error('Regroup needs a nested sum');
  if(e.mapping==='exchange-roles'){
   if(e.direction==='right'){const [a,b]=q.children,c=v.children[1];return {...q,children:[a,{...v,children:[b,c]}]};}
   const a=v.children[0],[b,c]=q.children;return {...q,children:[{...v,children:[a,b]},c]};
  }
  if(e.direction==='right'){const [a,b]=q.children,c=v.children[1];return {...v,children:[a,{...q,children:[b,c]}]};}
  const a=v.children[0],[b,c]=q.children;return {...v,children:[{...q,children:[a,b]},c]};
 }
 return {...v,children:v.children.map(visit)};
 };
 locate(t,e.kind==='add-zero'?e.target:e.parent);
 if(e.kind==='add-zero'&&(e.sum===e.zero||ids(t).some(id=>id===e.sum||id===e.zero)))throw Error('Fresh IDs required');
 return visit(t);
}
export type Rule='swap'|'regroup'|'identity';
export type Complexity='simple'|'nested'|'uneven';
export function example(rule:Rule,complexity:Complexity,mapping:Mapping='keep-root'){
 const a=complexity==='simple'?n('a'):complexity==='nested'?n('a','+',[n('x'),n('y')]):n('a','+',[n('x'),n('u','×',[n('y'),n('z')])]);
 const b=complexity==='uneven'?n('b','+',[n('v'),n('w')]):n('b'),c=n('c');
 const before=rule==='identity'?a:rule==='swap'?n('p','+',[a,b]):n('p','+',[n('q','+',[a,b]),c]);
 const edit:DirectEdit=rule==='swap'?{kind:'swap',parent:'p',left:0,right:1}:rule==='regroup'?{kind:'regroup',parent:'p',direction:'right',mapping}:{kind:'add-zero',target:'a',sum:'p',zero:'zero'};
 return {before,after:apply(before,edit),edit,a,b,c};
}
export const expr=(t:Tree):string=>t.children.length?'('+t.children.map(expr).join(' '+t.label+' ')+')':t.label;
export type V={x:number;y:number;z:number};
export type Path='flat'|'orbit';
/** A rigid operand root follows this path; descendants inherit its translation. */
export function swapPosition(side:-1|1,t:number,path:Path,r=150):V {
 return {x:side*r*(path==='flat'?1-2*t:Math.cos(Math.PI*t)),y:130,z:path==='orbit'?side*r*Math.sin(Math.PI*t):0};
}
