import {Term,actions,find,hint,key,replace,solved,count,walk} from './algebra';
import {Problem,instantiate} from './problems';
import {ruleId} from './interaction';
export type ReferenceStep={path:number[];rule:string;result:string};
export type ReferenceSolution={steps:ReferenceStep[];rules:string[];startNodes:number;targetNodes:number;peakNodes:number};
export function atPath(t:Term,path:number[]){for(const side of path){if(t.kind!=='op')throw Error('Invalid reference path');t=side===0?t.left:t.right;}return t;}
function pathTo(t:Term,id:string,path:number[]=[]):number[]|undefined {if(t.id===id)return path;if(t.kind==='op')return pathTo(t.left,id,[...path,0])??pathTo(t.right,id,[...path,1]);}
/** Offline witness generation, not a claim of global minimality or necessary axioms. */
export function referenceFor(p:Problem,excluded:string[]=[]):ReferenceSolution|undefined{
 let t=instantiate(p.start);const target=instantiate(p.target),steps:ReferenceStep[]=[],startNodes=count(t);let peakNodes=startNodes;
 while(!solved(t,target)&&steps.length<14){const h=hint(t,(n,a)=>!excluded.includes(ruleId(n,a)),target);if(!h)return;
  const owner=find(t,h.nodeId)!,a=h.action;steps.push({path:pathTo(t,owner.id)!,rule:ruleId(owner,a),result:key(a.result)});t=replace(t,owner.id,a.result);peakNodes=Math.max(peakNodes,count(t));
 }if(!solved(t,target))return;
 return {steps,rules:[...new Set(steps.map(s=>s.rule))].sort(),startNodes,targetNodes:count(t),peakNodes};
}
export function verifyReference(p:Problem,ref:ReferenceSolution){let t=instantiate(p.start),peak=count(t);const used=new Set<string>();
 if(ref.startNodes!==count(t))throw Error('Wrong start size');
 for(const step of ref.steps){const owner=atPath(t,step.path),a=actions(owner).find(a=>ruleId(owner,a)===step.rule&&key(a.result)===step.result);if(!a)throw Error('Illegal recorded move for '+p.id);used.add(step.rule);t=replace(t,owner.id,a.result);peak=Math.max(peak,count(t));if(new Set(walk(t).map(n=>n.id)).size!==count(t))throw Error('Duplicate node IDs');}
 if(!solved(t,instantiate(p.target))||peak!==ref.peakNodes||count(t)!==ref.targetNodes||[...used].sort().join()!==ref.rules.join())throw Error('Invalid reference metadata for '+p.id);
}
export const includesRules=(inventory:Iterable<string>,required:string[])=>{const owned=new Set(inventory);return required.every(r=>owned.has(r));};
/** Known sufficient alternatives, not a complete/minimal collection of rule bases. */
export const canSolveWith=(inventory:Iterable<string>,refs:ReferenceSolution[])=>{const owned=new Set(inventory);return refs.some(r=>includesRules(owned,r.rules));};
