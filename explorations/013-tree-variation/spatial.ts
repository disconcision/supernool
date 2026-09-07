import * as T from 'three';
import {sample as base,retractAmounts} from './cases';
/** Presentation deformation: changes embedding, never algebra or graph incidence. */
export function specimen(rule:string,complexity:string,mapping:string,t:number,seed:number,height:string,irregularity:number,spread:number,motion='slide'){
 const c=base(rule,complexity,mapping,t,seed,height,irregularity,motion);
 if(rule==='generated'){
  const originals=new Map(c.joints.map(j=>[j.id,new T.Vector3(j.x,j.y,j.z)])),grown=new Map<string,T.Vector3>();
  for(const j of c.joints){const parent=j.id.slice(0,-1),p=originals.get(parent),gp=grown.get(parent);if(!p||!gp){grown.set(j.id,new T.Vector3(j.x,j.y,0));continue;}
   const span=Math.abs(j.x-p.x),angle=(j.id.length-2)*2.399963+seed*.37,side=j.id.endsWith('1')?1:-1;
   grown.set(j.id,gp.clone().add(new T.Vector3(side*span*Math.cos(angle),j.y-p.y,side*span*Math.sin(angle))));
  }
  const move=(v:T.Vector3)=>{const j=c.joints.find(j=>new T.Vector3(j.x,j.y,j.z).distanceToSquared(v)<1e-10);return j?new T.Vector3(v.x,v.y,0).lerp(grown.get(j.id)!,spread):v.clone();};
  return {edges:c.edges.map(e=>({...e,a:move(e.a),b:move(e.b)})),joints:c.joints.map(j=>({...j,...move(new T.Vector3(j.x,j.y,j.z))}))};
 }
 const depth=(id:string)=>{
  if(rule==='generated')return [...id].reduce((z,ch,i)=>z+(ch==='1'?1:-1)*.7/Math.sqrt(i+1),0);
  if(rule==='regroup'&&motion==='retract'){
   const {left,right}=retractAmounts(t);
   if(id==='p')return mapping==='exchange'?.8*right:0;
   if(id==='q')return mapping==='exchange'?.8*left:.8*(left+right);
  }
  if(id==='p')return rule==='regroup'&&mapping==='exchange'?.8*t:0;
  if(id==='q')return mapping==='exchange'?.8*(1-t):.8;
  if(id==='zero')return 1.3*t;
  const prefix=id[0],root=prefix==='a'?-1.3*(rule==='identity'?t:1):prefix==='b'?-.6:1.35;
  return root+[...id.slice(1)].reduce((z,ch)=>z+({x:-.45,y:.45,z:.3,w:-.3}[ch]??0),0);
 };
 const original=c.joints.map(j=>new T.Vector3(j.x,j.y,j.z)),depths=c.joints.map(j=>depth(j.id));
 const p=c.joints.findIndex(j=>j.id==='p'),q=c.joints.findIndex(j=>j.id==='q');
 const move=(v:T.Vector3)=>{
  if(v.lengthSq()<1e-12)return v.clone();
  if(rule==='fork')return v.clone().add(new T.Vector3(0,0,spread*Math.sign(v.x)*1.3));
  const found=original.findIndex(j=>j.distanceToSquared(v)<1e-10);let dz=found>=0?depths[found]:0;
  if(found<0&&p>=0&&q>=0){const d=original[q].clone().sub(original[p]),s=v.clone().sub(original[p]).dot(d)/d.lengthSq();if(s>=0&&s<=1&&original[p].clone().addScaledVector(d,s).distanceTo(v)<1e-5)dz=depths[p]+s*(depths[q]-depths[p]);}
  return new T.Vector3(v.x,v.y,(rule==='generated'?spread*v.z:v.z)+spread*dz);
 };
 return {edges:c.edges.map(e=>({...e,a:move(e.a),b:move(e.b)})),joints:c.joints.map((j,i)=>({...j,...move(original[i])}))};
}
