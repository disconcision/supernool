import {Term,Action,find,replace} from './algebra';
import {layout,transition,LayoutOptions} from './layout';
export const rules=[
 {id:'swap-add',name:'Swap · addition',equation:'A + B ↔ B + A',color:'#347e9b'},
 {id:'swap-mul',name:'Swap · multiplication',equation:'A × B ↔ B × A',color:'#347e9b'},
 {id:'assoc-add',name:'Regroup · addition',equation:'(A + B) + C ↔ A + (B + C)',color:'#b36148'},
 {id:'assoc-mul',name:'Regroup · multiplication',equation:'(A × B) × C ↔ A × (B × C)',color:'#b36148'},
 {id:'zero',name:'Additive identity',equation:'A + 0 → A',color:'#64883c'},
 {id:'one',name:'Multiplicative identity',equation:'A × 1 → A',color:'#64883c'},
 {id:'factor',name:'Common factor',equation:'A×X + B×X → (A+B)×X',color:'#8963a6'},
 {id:'eval-add',name:'Gather numbers · addition',equation:'3 + 2 → 5',color:'#a58120'},
 {id:'eval-mul',name:'Gather numbers · multiplication',equation:'3 × 2 → 6',color:'#a58120'},
];
export function ruleId(owner:Term,a:Action){const suffix=owner.kind==='op'&&owner.op==='*'?'mul':'add';return a.key==='swap'?'swap-'+suffix:a.key.startsWith('group')?'assoc-'+suffix:a.key.startsWith('zero')?'zero':a.key.startsWith('one')?'one':a.key.startsWith('factor')?'factor':'eval-'+suffix;}
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

/** Catch once a sufficiently aligned pull completes. Beyond the catch, lateral
 * drift and overshoot cannot undo it; retreat below 55% or Escape can. */
export function catchPull(caught:boolean,from:{x:number;y:number},to:{x:number;y:number},cursor:{x:number;y:number}){
 const dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy);if(length<1)return {caught:false,progress:0};
 const x=cursor.x-from.x,y=cursor.y-from.y,along=(x*dx+y*dy)/(length*length),side=Math.abs(x*dy-y*dx)/length;
 const aligned=side<=Math.max(30,Math.min(60,length*.4));
 const next=caught?along>=.55:along>=.9&&aligned;
 return {caught:next,progress:next?1:Math.max(0,Math.min(aligned?.9:.82,along))};
}
