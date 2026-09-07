import {startledPose} from './idle-roam';
import * as T from 'three';
export type WalkStyle='spider'|'upright';
export type FingerStep={advance:number;lift:number};
export type WalkPose={position:T.Vector3;orientation:T.Quaternion};
const smooth=(t:number)=>T.MathUtils.smoothstep(t,0,1),up=new T.Vector3(0,1,0);

/** Four staggered steps, with a long stance and a shorter lifted recovery. */
export function fingerSteps(distance:number):FingerStep[]{
 return [0,.5,.25,.75].map(offset=>{
  const phase=(distance/.27+offset)%1;
  if(phase<.72)return {advance:.0972-.27*phase,lift:0};
  const t=(phase-.72)/.28;return {advance:T.MathUtils.lerp(-.0972,.0972,smooth(t)),lift:Math.sin(Math.PI*t)*.095};
 });
}

/** Deliberately oversized, slow alternating strides on the two longest fingers. */
export function uprightSteps(distance:number):FingerStep[]{
 return [0,0,.5,0].map((offset,index)=>{
  if(index===0||index===3)return {advance:0,lift:.2};
  const phase=(distance/.54+offset)%1;
  if(phase<.5)return {advance:.135-.54*phase,lift:0};
  const t=(phase-.5)/.5;
  return {advance:T.MathUtils.lerp(-.135,.135,smooth(t)),lift:Math.sin(Math.PI*t)*.035};
 });
}

/** Solve in the splayed finger's plane, keeping stance height through palm sway. */
export function walkingFingerAngles(a:number,b:number,base:T.Vector3,scale:number,offset:T.Vector3,pose:WalkPose,direction:T.Vector3,step:FingerStep,splay:number,forwardOffset:number){
 const origin=base.clone().multiplyScalar(scale).add(offset).applyQuaternion(pose.orientation).add(pose.position);
 const plane=pose.orientation.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),splay));
 const y=new T.Vector3(0,scale,0).applyQuaternion(plane),z=new T.Vector3(0,0,scale).applyQuaternion(plane);
 const fy=y.dot(direction),fz=z.dot(direction),height=.024+step.lift-origin.y,forward=forwardOffset+step.advance,det=y.y*fz-z.y*fy;
 return solveFinger(a,b,(height*fz-forward*z.y)/det,(forward*y.y-height*fy)/det);
}

/** A little surface excursion; the path is sampled against a supplied footprint test. */
export class FingerWalk {
 phase:'rest'|'land'|'walk'|'fall'|'fallen'|'recover'|'dazed'|'startle'|'rise'|'rejoin'='rest';hand=0;age=0;distance=0;
 style:WalkStyle='spider';preference:WalkStyle|'mixed'='mixed';
 contactPose:WalkPose={position:new T.Vector3(),orientation:new T.Quaternion()};thumb=0;
 pose:WalkPose={position:new T.Vector3(),orientation:new T.Quaternion()};weight=0;steps=fingerSteps(0);
 route:T.Vector3[]=[];private start!:WalkPose;private startWeight=0;private index=0;private speed=.35;private direction=new T.Vector3(0,0,1);
 private safe?:(p:T.Vector3)=>boolean;
 private planted=-1;private plantedPoint=new T.Vector3();private plantOffset=new T.Vector3();private groundedPose?:WalkPose;
 private pivot=new T.Vector3();private pivotLocal=new T.Vector3();
 private tripAt=Infinity;private tripSide=1;private upright!:WalkPose;private dazeDuration=1.8;
 constructor(private random:()=>number=Math.random){}
 get active(){return this.phase!=='rest';}
 get leaving(){return this.phase==='startle'||this.phase==='rise'||this.phase==='rejoin';}
 get state(){return {phase:this.phase,style:this.style,age:this.age,hand:this.hand,distance:this.distance,weight:this.weight,support:this.planted,anchor:this.plantedPoint.toArray(),position:this.pose.position.toArray(),pivot:this.pivot.toArray(),pivotLocal:this.pivotLocal.toArray(),route:this.route.map(p=>p.toArray())};}
 get gait(){return {weight:this.weight,style:this.style,steps:this.steps,contactPose:this.contactPose,direction:this.direction,thumb:this.thumb,recordContacts:this.recordContacts};}
 private gaitSteps(distance:number){return this.style==='upright'?uprightSteps(distance):fingerSteps(distance);}
 setTerrain(safe:(p:T.Vector3)=>boolean){this.safe=safe;}
 startWalk(root:T.Object3D,hands:T.Object3D[],hand:number,camera?:T.Camera){
  if(!this.safe)return false;
  const origin=root.position.clone(),roamed=Math.hypot(hands[hand].position.x-origin.x,hands[hand].position.z-origin.z)>1.7,valid=(p:T.Vector3)=>p.distanceTo(origin)>(roamed?1.8:.95)&&p.distanceTo(origin)<(roamed?4.6:3.9)&&this.safe!(p);
  this.style=this.preference==='mixed'?(this.random()<.5?'spider':'upright'):this.preference;
  this.route=[];
  for(let attempt=0;attempt<16;attempt++){
   const angle=root.rotation.y+(hand?1:-1)*(.45+this.random()*2.4),radius=1.3+this.random()*1.2;
   const p=roamed?hands[hand].position.clone().add(new T.Vector3(Math.sin(angle)*.25,0,Math.cos(angle)*.25)):origin.clone().add(new T.Vector3(Math.sin(angle)*radius,0,Math.cos(angle)*radius));p.y=0;
   if(valid(p)){this.route.push(p);break;}
  }
  if(!this.route.length)return false;
  let heading=this.random()*Math.PI*2;
  // A gentle preference for the viewer-facing direction; the random heading
  // still spans every bearing and obstacle avoidance keeps the final say.
  const towardCamera=camera?.getWorldDirection(new T.Vector3()).negate().setY(0);
  if(towardCamera&&towardCamera.lengthSq()>1e-6){
   const direction=new T.Vector3(Math.sin(heading),0,Math.cos(heading)).addScaledVector(towardCamera.normalize(),.45);
   heading=Math.atan2(direction.x,direction.z);
  }
  const count=this.style==='upright'?12+Math.floor(this.random()*5):20+Math.floor(this.random()*14);
  for(let j=0;j<count;j++){
   const p=this.route[this.route.length-1];let next:T.Vector3|undefined;
   const drift=(this.random()-.5)*.7;
   for(const turn of [drift,.6,-.6,1.15,-1.15,1.8,-1.8,Math.PI]){
    const angle=heading+turn,delta=new T.Vector3(Math.sin(angle)*.16,0,Math.cos(angle)*.16);
    // Validate the whole step and a little look-ahead, not just its endpoint.
    if([.25,.5,.75,1,1.5].every(t=>valid(p.clone().addScaledVector(delta,t)))){next=p.clone().add(delta);heading=angle;break;}
   }
   if(!next)break;this.route.push(next);
  }
  if(this.route.length<9){this.route=[];return false;}
  this.planted=-1;this.plantOffset.setScalar(0);this.groundedPose=undefined;
  this.hand=hand;this.index=0;this.distance=0;this.steps=this.gaitSteps(0);this.weight=0;this.speed=this.style==='upright'?.18+this.random()*.025:.38+this.random()*.10;
  // One possible mishap per excursion, after the gait has had time to establish itself.
  this.tripAt=this.random()<(this.style==='upright'?.48:.24)?Math.max(1.2,(this.route.length-1)*.16*(.35+this.random()*.3)):Infinity;
  this.tripSide=this.random()<.5?-1:1;this.dazeDuration=1.6+this.random()*.7;
  this.pose={position:hands[hand].position.clone(),orientation:hands[hand].quaternion.clone()};
  this.direction.copy(this.route[1]).sub(this.route[0]).normalize();this.contactPose=this.groundPose(this.route[0]);this.enter('land');return true;
 }
 private enter(phase:typeof this.phase){this.phase=phase;this.age=0;this.startWeight=this.weight;this.start={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()};}
 cancel(){this.phase='rest';this.weight=0;this.planted=-1;}
 resetContacts(){this.planted=-1;}
 private groundPose(center:T.Vector3){
  const upright=this.style==='upright',cycle=this.distance/.54*Math.PI*2,sway=Math.sin(cycle);
  const heading=new T.Quaternion().setFromAxisAngle(up,Math.atan2(this.direction.x,this.direction.z))
   .multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),upright?Math.PI:Math.PI/2));
  let orientation=heading,height=.38;
  if(upright){
   const steps=uprightSteps(this.distance);
   // Match near-straight reach on the unequal long fingers by rocking the palm,
   // rather than absorbing their changing reach in two deeply bent joints.
   const reach=(angle:number)=>{
    const rotation=heading.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),angle));
    return [1,2].map(k=>{
     const length=(k===1?.388:.358)+.435-.003,step=steps[k];
     const base=new T.Vector3((k-1.5)*.145*.68,.48*.68-.17,0).applyQuaternion(rotation);
     const plane=rotation.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),(1.5-k)*.10));
     const leg=new T.Vector3(0,Math.sqrt(length*length-(step.advance/.68)**2)*.68,0).applyQuaternion(plane);
     return .024+step.lift-base.y-leg.y;
    });
   };
   let lo=-.55,hi=.55;
   for(let i=0;i<12;i++){const mid=(lo+hi)/2,h=reach(mid);if(h[0]>h[1])lo=mid;else hi=mid;}
   const angle=(lo+hi)/2;
   orientation=heading.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),angle));
   height=Math.min(...reach(angle))-.004;
  }
  const position=center.clone().addScaledVector(this.direction,upright?0:-.39).setY(height);
  if(upright)position.addScaledVector(new T.Vector3(this.direction.z,0,-this.direction.x),-.06*sway);
  return {position,orientation};
 }
 update(dt:number,allowed:boolean,walking:boolean,root:T.Object3D){
  if(!this.active)return;if(!allowed){this.cancel();return;}dt=Math.min(.05,dt);
  if(walking&&!this.leaving)this.enter('startle');
  this.age+=dt;this.thumb=Math.sin(this.distance/(this.style==='upright'?.54:.27)*Math.PI*2);
  if(this.phase==='land'){
   const target=this.groundPose(this.route[0]),u=smooth(this.age/1.25);
   this.pose.position.copy(this.start.position).lerp(target.position,u);this.pose.position.y+=Math.sin(Math.PI*u)*.25;
   this.pose.orientation.copy(this.start.orientation).slerp(target.orientation,u);this.weight=u;
   if(this.age>=1.25)this.enter('walk');
  }else if(this.phase==='walk'){
   const a=this.route[this.index],b=this.route[this.index+1];
   if(!b||!this.safe!(a)||!this.safe!(b)){this.enter('rise');return;}
   this.distance+=this.speed*dt*(this.style==='upright'?.35+.9*Math.sin(this.distance/.54*Math.PI*2)**2:1);const traveled=this.distance-this.index*.16,u=T.MathUtils.clamp(traveled/.16,0,1);
   const center=a.clone().lerp(b,u),direction=b.clone().sub(a).normalize();
   this.direction.lerp(direction,1-Math.exp(-dt*9)).normalize();
   this.pose=this.groundPose(center);this.contactPose={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()};this.steps=this.gaitSteps(this.distance);this.weight=1;
   if(this.style==='upright')this.pose.position.add(this.plantOffset);
   if(u>=1){this.index++;if(this.index>=this.route.length-1)this.enter('rise');}
   if(this.phase==='walk'&&this.distance>=this.tripAt){
    this.tripAt=Infinity;
    if(this.style==='upright'){if(this.steps[1].lift>0)this.tripSide=1;else if(this.steps[2].lift>0)this.tripSide=-1;}
    // The same conservative footprint used for walking must also clear the sideways tip.
    const side=new T.Vector3(this.direction.z,0,-this.direction.x).multiplyScalar(this.tripSide),reach=this.style==='upright'?.9:.3;
    if([.25,.5,.75,1].every(t=>this.safe!(center.clone().addScaledVector(side,reach*t)))){
     this.upright={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()};
     this.pivot.copy(center).setY(.024);this.capturePivot();this.enter('fall');
    }
   }
  }else if(this.phase==='fall'){
   const t=T.MathUtils.clamp(this.age/.48,0,1),u=t*t;
   this.tipPose(u);
   if(t===1)this.enter('fallen');
  }else if(this.phase==='fallen'){
   // A small impact recoil, then a beat to register what happened.
   const recoil=Math.sin(Math.min(1,this.age/.28)*Math.PI)*.07;
   this.tipPose(1-recoil);
   if(this.age>=.52)this.enter('recover');
  }else if(this.phase==='recover'){
   const u=smooth(this.age/.95);
   this.tipPose(1-u);
   if(this.style==='spider')this.pose.position.y+=Math.sin(Math.PI*u)*.07;
   if(this.age>=.95)this.enter('dazed');
  }else if(this.phase==='dazed'){
   const t=T.MathUtils.clamp(this.age/this.dazeDuration,0,1),envelope=Math.sin(Math.PI*t)*(1-t);
   this.pose.position.copy(this.upright.position);
   this.pose.orientation.copy(this.upright.orientation)
    .multiply(new T.Quaternion().setFromAxisAngle(up,Math.sin(this.age*8)*.19*envelope))
    .multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),Math.sin(this.age*5)*.22*envelope));
   // Hesitant toe shuffles rather than continuing the route while disoriented.
   this.steps=this.gaitSteps(this.distance+Math.sin(this.age*5)*.018*envelope);
   if(t===1)this.enter('walk');
  }else if(this.phase==='startle'){
   this.pose=startledPose(this.start,this.age,this.hand?1:-1);if(this.age>=.2)this.enter('rise');
  }else if(this.phase==='rise'){
   const u=smooth(this.age/.45);this.pose.position.copy(this.start.position).add(new T.Vector3(0,.4*u,0));this.weight=this.startWeight*(1-u);
   // Even a fallen hand rights itself as it lifts to follow a moving avatar.
   this.pose.orientation.copy(this.start.orientation).slerp(this.groundPose(this.pose.position).orientation,u);
   if(this.age>=.45)this.enter('rejoin');
  }else if(this.phase==='rejoin'){
   const u=smooth(this.age/1),escort=new T.Vector3((this.hand?1:-1)*.9,1.03,.22).applyQuaternion(root.quaternion).add(root.position);
   this.pose.position.copy(this.start.position).lerp(escort,u);this.pose.orientation.copy(this.start.orientation).slerp(root.quaternion,u);
   if(this.age>=1)this.cancel();
  }
 }
 /** Constrain the active rig after articulation, using its actual fingertip.
  * Translating the palm by the contact error makes sway and turns rotate about
  * that planted point. Accumulate the correction across support transfers. */
 readonly recordContacts=(points:T.Vector3[],hand?:T.Object3D)=>{
  if(this.style==='upright'){
   if(this.phase==='walk'||(this.phase==='fall'&&this.age===0)){
    const support=[1,2].find(k=>this.steps[k].lift===0)!;
    if(this.planted!==support){this.planted=support;this.plantedPoint.copy(points[support]).setY(.024);}
    const correction=this.plantedPoint.clone().sub(points[support]);
    const next=this.pose.position.clone().add(correction);
    if(this.phase==='walk'&&this.groundedPose&&![.25,.5,.75,1].every(t=>this.safe!(this.groundedPose!.position.clone().lerp(next,t)))){
     // The planted solve may deviate from the nominal route at a corner.
     // Lift away from the last clear pose rather than slide the planted toe.
     this.pose={position:this.groundedPose.position.clone(),orientation:this.groundedPose.orientation.clone()};
     hand?.position.copy(this.pose.position);hand?.quaternion.copy(this.pose.orientation);this.planted=-1;this.enter('rise');
    }else{
     this.pose.position.copy(next);this.plantOffset.add(correction);hand?.position.add(correction);points.forEach(p=>p.add(correction));
     this.groundedPose={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()};
    }
   }
   if(this.phase==='fall'&&this.age===0){
    // Preserve the existing tumble, now starting from the corrected stance.
    this.upright.position.copy(this.pose.position);
    const side=new T.Vector3(this.direction.z,0,-this.direction.x).multiplyScalar(this.tripSide);
    const planted=points.filter((p,k)=>this.steps[k]?.lift===0&&p.y<.075);
    planted.sort((a,b)=>b.dot(side)-a.dot(side));
    if(planted[0]){this.pivot.copy(planted[0]);this.capturePivot();}
   }
  }
  return this.state;
 };
 private capturePivot(){this.pivotLocal.copy(this.pivot).sub(this.upright.position).applyQuaternion(this.upright.orientation.clone().invert());}
 private tipPose(amount:number){
  if(this.style==='spider'){
   const side=new T.Vector3(this.direction.z,0,-this.direction.x).multiplyScalar(this.tripSide);
   this.pose.position.copy(this.upright.position).addScaledVector(side,.24*amount);this.pose.position.y-=.12*amount;
   this.pose.orientation.copy(this.upright.orientation).multiply(new T.Quaternion().setFromAxisAngle(up,-this.tripSide*1.48*amount));return;
  }
  const rotation=new T.Quaternion().setFromAxisAngle(this.direction,-this.tripSide*1.22*amount);
  this.pose.orientation.copy(rotation).multiply(this.upright.orientation);
  this.pose.position.copy(this.upright.position).sub(this.pivot).applyQuaternion(rotation).add(this.pivot);
 }
}

/** Planar two-link solve; the distal finger and tip form one walking toe. */
export function solveFinger(a:number,b:number,advance:number,height:number){
 const distance=T.MathUtils.clamp(Math.hypot(advance,height),Math.abs(a-b)+.001,a+b-.001);
 const angle=Math.atan2(height,advance),bend=Math.acos(T.MathUtils.clamp((distance*distance-a*a-b*b)/(2*a*b),-1,1));
 return {base:angle-Math.atan2(b*Math.sin(bend),a+b*Math.cos(bend)),middle:bend};
}
