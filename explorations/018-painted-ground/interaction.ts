import {Term,Action,find,replace} from './algebra';
import {layout,transition,LayoutOptions} from './layout';
import {rules} from './rule-definitions';
export {rules} from './rule-definitions';
export function ruleId(owner:Term,a:Action){const suffix=owner.kind==='op'&&owner.op==='*'?'mul':'add';return a.key==='swap'?'swap-'+suffix:a.key.startsWith('group')?'assoc-'+suffix:a.key.startsWith('zero')?'zero':a.key.startsWith('one')?'one':a.key.startsWith('factor')?'factor':a.key.startsWith('absorb')?'absorb':a.key.startsWith('distribute')?'distribute':'eval-'+suffix;}
export function ruleColor(owner:Term,a:Action){return rules.find(r=>r.id===ruleId(owner,a))!.color;}
export type Pin={id:string;position:{x:number;y:number;z:number}};
/** A strict pin rejects deletion, relabeling, reparenting and spatial displacement. */
export function allowsPin(tree:Term,owner:Term,action:Action,pin:Pin|undefined,options:LayoutOptions){
 if(!pin)return true;
 const after=replace(tree,owner.id,action.result),a=find(tree,pin.id),b=find(after,pin.id);
 if(!a||!b||a.kind!==b.kind)return false;
 if(a.kind==='op'&&b.kind==='op'&&a.op!==b.op)return false;
 if(a.kind==='num'&&b.kind==='num'&&a.value!==b.value)return false;
 if(a.kind==='var'&&b.kind==='var'&&a.name!==b.name)return false;
 const old=layout(tree,options),next=layout(after,options);
 if(old.parents.get(pin.id)!==next.parents.get(pin.id))return false;
 for(const t of [0,.25,.5,.75,1]){
  const p=transition(tree,after,t,options,action.key,action.merge).points.get(pin.id);
  if(!p||Math.hypot(p.x-pin.position.x,p.y-pin.position.y,p.z-pin.position.z)>.025)return false;
 }
 return true;
}
export type Spring={value:number;velocity:number};
/** A scalar spring on the rewrite coordinate, not a rigid-body tree simulation. */
export function advanceSpring(s:Spring,target:number,dt:number,mass:number){
 const steps=Math.max(1,Math.ceil(dt/.008)),h=dt/steps,k=65,damping=2*.85*Math.sqrt(k*mass);
 let {value,velocity}=s;
 for(let i=0;i<steps;i++){velocity+=(k*(target-value)-damping*velocity)/mass*h;value+=velocity*h;if(value<0){value=0;velocity=Math.max(0,velocity);}if(value>1){value=1;velocity=Math.min(0,velocity);}}
 return {value,velocity};
}

/** Once a route is chosen, its single motion coordinate is also the acceptance
 * coordinate. Sideways input cannot show a nearly completed pose then veto it.
 * The final 18% settles into place; retreat below 55% explicitly reverses. */
export function catchPull(caught:boolean,from:{x:number;y:number},to:{x:number;y:number},cursor:{x:number;y:number}){
 const dx=to.x-from.x,dy=to.y-from.y,l2=dx*dx+dy*dy;if(l2<1)return {caught:false,progress:0};
 const along=((cursor.x-from.x)*dx+(cursor.y-from.y)*dy)/l2;
 const next=caught?along>=.55:along>=.82;
 return {caught:next,progress:next?1:Math.max(0,Math.min(1,along))};
}
