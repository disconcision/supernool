import {Action,Term,actions,walk,replace,find,same} from './algebra';
import type {Gesture} from './gestures';

const glyph=(n:Term)=>n.kind==='op'?n.op:n.kind==='num'?`#${n.value}`:`$${n.name}`;
const remap=(t:Term,ids:Map<string,string>):Term=>t.kind==='op'?{...t,id:ids.get(t.id)??t.id,left:remap(t.left,ids),right:remap(t.right,ids)}:{...t,id:ids.get(t.id)??t.id};
const paths=(t:Term)=>{const out=new Map<string,string>();const visit=(n:Term,p:string)=>{out.set(n.id,p);if(n.kind==='op'){visit(n.left,p+'L');visit(n.right,p+'R');}};visit(t,'');return out;};

/** Preserve operator glyphs when the algebra constructors reuse IDs for different
 * symbols. Stable same-glyph occurrences take priority; remaining operators match
 * in traversal order. This is an explicit, provisional occurrence policy, not a
 * consequence of algebraic equality. No action-name dispatch or target table. */
export function correspond(owner:Term,action:Action):Action{
 const old=walk(owner),fresh=walk(action.result),ids=new Map<string,string>(),used=new Set<string>();
 for(const n of fresh){const prior=old.find(o=>o.id===n.id&&glyph(o)===glyph(n));if(prior){ids.set(n.id,prior.id);used.add(prior.id);}}
 for(const n of fresh.filter(n=>n.kind==='op'&&!ids.has(n.id))){const prior=old.find(o=>o.kind==='op'&&!used.has(o.id)&&glyph(o)===glyph(n));if(prior){ids.set(n.id,prior.id);used.add(prior.id);}}
 // Unmatched nodes retain their constructor IDs unless a matched occurrence now
 // owns that ID. Fresh IDs are local to this candidate and stable across queries.
 for(const n of fresh)if(!ids.has(n.id)){let next=n.id;if(used.has(next)){do{next+=':new';}while(used.has(next)||old.some(o=>o.id===next)||fresh.some(o=>o.id===next));}ids.set(n.id,next);used.add(next);}
 const merge:Record<string,string>={};
 for(const [a,b] of Object.entries(action.merge??{})){
  // Clone provenance has a fresh output key; coalescence has a retired input key.
  if(!old.some(n=>n.id===a))merge[ids.get(a)??a]=b;
  else merge[a]=ids.get(b)??b;
 }
 return {...action,result:remap(action.result,ids),merge};
}

/** Prefer the occurrence physically held by the user when equal copies merge.
 * Re-identify the complete retained subtree, so its descendants travel with it. */
function preferHeld(action:Action,held:Term):Action{
 if(find(action.result,held.id))return action;
 const destination=action.merge?.[held.id];
 const twin=destination?find(action.result,destination):undefined;
 if(!twin||!same(held,twin))return action;
 const sources=walk(held),copies=walk(twin),ids=new Map(copies.map((n,i)=>[n.id,sources[i].id]));
 const merge:Record<string,string>={};
 for(const [a,b] of Object.entries(action.merge??{}))if(!sources.some(n=>n.id===a))merge[a]=ids.get(b)??b;
 copies.forEach((n,i)=>merge[n.id]=sources[i].id);
 return {...action,result:remap(action.result,ids),merge};
}

/** Derived contacts: a surviving occurrence changes its local syntactic slot.
 * An unchanged carried subtree is one handle, not one per descendant. Global
 * layout movement alone never turns an untouched passenger into a handle. */
export function derivedGestures(tree:Term,gripId?:string):Gesture[]{
 const out:Gesture[]=[];
 for(const owner of walk(tree))for(const raw of actions(owner)){
  const base=correspond(owner,raw),beforePaths=paths(owner);
  for(const held of walk(owner)){
   if(gripId&&held.id!==gripId)continue;
   const mergingBranch=walk(owner).find(n=>beforePaths.get(held.id)!.startsWith(beforePaths.get(n.id)!)&&base.merge?.[n.id]&&find(base.result,base.merge[n.id])&&same(n,find(base.result,base.merge[n.id])!));
   let action=preferHeld(base,mergingBranch??held);
   // Evaluation creates a value rather than preserving either input's value.
   // Both numeric contributors may carry that result. Absorption/identity already
   // have a surviving input and therefore do not use this fallback.
   if(!find(action.result,held.id)&&held.kind==='num'&&owner.kind==='op'&&owner.left.kind==='num'&&owner.right.kind==='num'&&action.result.kind==='num'&&action.result.id===owner.id){
    action={...action,result:{...action.result,id:held.id}};
   }
   const afterPaths=paths(action.result),next=find(action.result,held.id);
   if(!next||beforePaths.get(held.id)===afterPaths.get(held.id))continue;
   const carried=walk(owner).some(ancestor=>ancestor.id!==held.id&&beforePaths.get(held.id)!.startsWith(beforePaths.get(ancestor.id)!)&&find(action.result,ancestor.id)&&same(ancestor,find(action.result,ancestor.id)!)&&beforePaths.get(ancestor.id)!==afterPaths.get(ancestor.id));
   if(carried)continue;
   out.push({owner,action,gripId:held.id,braceId:owner.id,targetId:held.id,derived:true,instruction:`${action.label}: carry this occurrence to its resulting position`,after:replace(tree,owner.id,action.result)});
  }
 }
 return out;
}
