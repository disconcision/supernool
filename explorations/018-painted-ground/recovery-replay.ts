import {Term,hint,replace,solved} from './algebra';
import {LayoutOptions,layout,transition} from './layout';
import {Options} from './surface';

export type RewriteRecord={before:Term;after:Term;kind:string;merge:Record<string,string>};
export const recoveryReplayFraction=.78;
export function recoveryEmbedding(progress:number,hostSpread:number){
 const a=Math.max(0,Math.min(1,(progress-recoveryReplayFraction)/(1-recoveryReplayFraction)));
 return hostSpread*a*a*(3-2*a);
}

/** Previewing recovery completes a copy of the current route, not the live AST. */
export function recoveryRoute(tree:Term,history:RewriteRecord[]){
 const records=[...history];let reduced=tree;
 for(let i=0;i<12&&!solved(reduced);i++){
  const h=hint(reduced);if(!h)break;
  const after=replace(reduced,h.nodeId,h.action.result);
  records.push({before:reduced,after,kind:h.action.key,merge:{...h.action.merge}});reduced=after;
 }
 return {records,reduced};
}

/** Play the same geometric functions backward; do not infer inverse rule names.
 * The final interval changes only the restored host's embedding into 3D. */
export function replayRecovery(records:RewriteRecord[],host:Term,progress:number,config:LayoutOptions,options:Options,hostSpread:number){
 const t=Math.max(0,Math.min(1,progress)),flat={...config,spread:0},surface={...options,spread:0};
 if(records.length&&t<recoveryReplayFraction){
  const cursor=t/recoveryReplayFraction*records.length,index=Math.min(records.length-1,Math.floor(cursor));
  const step=records[records.length-1-index],u=1-(cursor-index);
  const pose=u>=1?layout(step.after,flat):u<=0?layout(step.before,flat):transition(step.before,step.after,u,flat,step.kind,step.merge,surface);
  return {pose,phase:'rewind' as const,index,kind:step.kind,local:u,spread:0};
 }
 const u=(t-recoveryReplayFraction)/(1-recoveryReplayFraction),a=Math.max(0,Math.min(1,u)),spread=recoveryEmbedding(t,hostSpread);
 return {pose:layout(host,{...config,spread}),phase:'spatial' as const,index:records.length,kind:'spatial',local:a,spread};
}
