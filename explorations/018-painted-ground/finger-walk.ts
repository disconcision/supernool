import * as T from 'three';
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

/** A little surface excursion; the path is sampled against a supplied footprint test. */
export class FingerWalk {
 phase:'rest'|'land'|'walk'|'rise'|'rejoin'='rest';hand=0;age=0;distance=0;
 pose:WalkPose={position:new T.Vector3(),orientation:new T.Quaternion()};weight=0;steps=fingerSteps(0);
 route:T.Vector3[]=[];private start!:WalkPose;private startWeight=0;private index=0;private speed=.35;private direction=new T.Vector3(0,0,1);
 private safe?:(p:T.Vector3)=>boolean;
 constructor(private random:()=>number=Math.random){}
 get active(){return this.phase!=='rest';}
 get leaving(){return this.phase==='rise'||this.phase==='rejoin';}
 get state(){return {phase:this.phase,hand:this.hand,distance:this.distance,weight:this.weight,position:this.pose.position.toArray(),route:this.route.map(p=>p.toArray())};}
 setTerrain(safe:(p:T.Vector3)=>boolean){this.safe=safe;}
 startWalk(root:T.Object3D,hands:T.Object3D[],hand:number){
  if(!this.safe)return false;
  const origin=root.position.clone(),valid=(p:T.Vector3)=>p.distanceTo(origin)>.95&&p.distanceTo(origin)<3.9&&this.safe!(p);
  this.route=[];
  for(let attempt=0;attempt<16;attempt++){
   const angle=root.rotation.y+(hand?1:-1)*(.45+this.random()*2.4),radius=1.3+this.random()*1.2;
   const p=origin.clone().add(new T.Vector3(Math.sin(angle)*radius,0,Math.cos(angle)*radius));p.y=0;
   if(valid(p)){this.route.push(p);break;}
  }
  if(!this.route.length)return false;
  let heading=this.random()*Math.PI*2;
  const count=20+Math.floor(this.random()*14);
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
  this.hand=hand;this.index=0;this.distance=0;this.steps=fingerSteps(0);this.weight=0;this.speed=.38+this.random()*.10;
  this.pose={position:hands[hand].position.clone(),orientation:hands[hand].quaternion.clone()};
  this.direction.copy(this.route[1]).sub(this.route[0]).normalize();this.enter('land');return true;
 }
 private enter(phase:typeof this.phase){this.phase=phase;this.age=0;this.startWeight=this.weight;this.start={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()};}
 cancel(){this.phase='rest';this.weight=0;}
 private groundPose(center:T.Vector3){
  return {position:center.clone().addScaledVector(this.direction,-.39).add(new T.Vector3(0,.38,0)),orientation:new T.Quaternion().setFromAxisAngle(up,Math.atan2(this.direction.x,this.direction.z)).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),Math.PI/2))};
 }
 update(dt:number,allowed:boolean,walking:boolean,root:T.Object3D){
  if(!this.active)return;if(!allowed){this.cancel();return;}dt=Math.min(.05,dt);
  if(walking&&!this.leaving)this.enter('rise');
  this.age+=dt;
  if(this.phase==='land'){
   const target=this.groundPose(this.route[0]),u=smooth(this.age/1.25);
   this.pose.position.copy(this.start.position).lerp(target.position,u);this.pose.position.y+=Math.sin(Math.PI*u)*.25;
   this.pose.orientation.copy(this.start.orientation).slerp(target.orientation,u);this.weight=u;
   if(this.age>=1.25)this.enter('walk');
  }else if(this.phase==='walk'){
   const a=this.route[this.index],b=this.route[this.index+1];
   if(!b||!this.safe!(a)||!this.safe!(b)){this.enter('rise');return;}
   this.distance+=this.speed*dt;const traveled=this.distance-this.index*.16,u=T.MathUtils.clamp(traveled/.16,0,1);
   const center=a.clone().lerp(b,u),direction=b.clone().sub(a).normalize();
   this.direction.lerp(direction,1-Math.exp(-dt*9)).normalize();
   this.pose=this.groundPose(center);this.steps=fingerSteps(this.distance);this.weight=1;
   if(u>=1){this.index++;if(this.index>=this.route.length-1)this.enter('rise');}
  }else if(this.phase==='rise'){
   const u=smooth(this.age/.45);this.pose.position.copy(this.start.position).add(new T.Vector3(0,.4*u,0));this.weight=this.startWeight*(1-u);
   if(this.age>=.45)this.enter('rejoin');
  }else if(this.phase==='rejoin'){
   const u=smooth(this.age/1),escort=new T.Vector3((this.hand?1:-1)*.9,1.03,.22).applyQuaternion(root.quaternion).add(root.position);
   this.pose.position.copy(this.start.position).lerp(escort,u);this.pose.orientation.copy(this.start.orientation).slerp(root.quaternion,u);
   if(this.age>=1)this.cancel();
  }
 }
}

/** Planar two-link solve; the distal finger and tip form one walking toe. */
export function solveFinger(a:number,b:number,advance:number,height:number){
 const distance=T.MathUtils.clamp(Math.hypot(advance,height),Math.abs(a-b)+.001,a+b-.001);
 const angle=Math.atan2(height,advance),bend=Math.acos(T.MathUtils.clamp((distance*distance-a*a-b*b)/(2*a*b),-1,1));
 return {base:angle-Math.atan2(b*Math.sin(bend),a+b*Math.cos(bend)),middle:bend};
}
