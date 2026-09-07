import * as T from 'three';
export type IdlePose={position:T.Vector3;orientation:T.Quaternion};
const copy=(p:IdlePose):IdlePose=>({position:p.position.clone(),orientation:p.orientation.clone()});
/** A quick flinch, with a fast rise and a softer settle before departure. */
export function startledPose(start:IdlePose,age:number,side=1):IdlePose{
 const t=T.MathUtils.clamp(age/.2,0,1),pulse=t<.3?Math.sin(t/.3*Math.PI/2):Math.cos((t-.3)/.7*Math.PI/2);
 return {position:start.position.clone().add(new T.Vector3(0,.16*pulse,0)),orientation:start.orientation.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),side*.17*pulse))};
}

/** Idle anticipation: the hands quietly wander out before starting an activity. */
export class IdleRoam {
 phase:'rest'|'drift'|'startle'|'return'='rest';age=0;poses:IdlePose[]=[];
 private starts:IdlePose[]=[];private targets:T.Vector3[]=[];private thresholds:number[]=[];private speeds:number[]=[];
 private velocities:T.Vector3[]=[];private delays:number[]=[];private ramps:number[]=[];private rhythms:{phase:number;rate:number}[]=[];
 private safe:(p:T.Vector3)=>boolean=()=>true;
 constructor(private random:()=>number=Math.random){}
 get active(){return this.phase!=='rest';}
 get state(){return {phase:this.phase,age:this.age,thresholds:this.thresholds,positions:this.poses.map(p=>p.position.toArray()),velocities:this.velocities.map(v=>v.toArray())};}
 setTerrain(safe:(p:T.Vector3)=>boolean){this.safe=safe;}
 preview(root:T.Object3D,hands:T.Object3D[]){this.cancel();this.age=2.2;this.update(0,true,false,false,root,hands);}
 cancel(){this.phase='rest';this.age=0;}
 ready(hand:number,root:T.Object3D){return this.phase==='drift'&&Math.hypot(this.poses[hand].position.x-root.position.x,this.poses[hand].position.z-root.position.z)>=this.thresholds[hand];}
 finish(hands:T.Object3D[]){if(this.phase==='drift'){this.poses=hands.map(h=>({position:h.position.clone(),orientation:h.quaternion.clone()}));this.enter('return');}}
 private enter(phase:typeof this.phase){this.phase=phase;this.age=0;this.starts=this.poses.map(copy);}
 private target(hand:number,root:T.Object3D){
  // Usually to the side or behind the body, sometimes still in front of it.
  const bearing=root.rotation.y+(hand?1:-1)*(.9+this.random()*2.2),radius=this.thresholds[hand]+.3;
  for(const turn of [0,.5,-.5,1,-1,1.7,-1.7,Math.PI]){
   const p=root.position.clone().add(new T.Vector3(Math.sin(bearing+turn)*radius,1+this.random()*.2,Math.cos(bearing+turn)*radius));
   if(this.safe(p)){this.targets[hand]=p;return;}
  }
  this.targets[hand]=this.poses[hand].position.clone();
 }
 update(dt:number,allowed:boolean,walking:boolean,busy:boolean,root:T.Object3D,hands:T.Object3D[]){
  dt=Math.min(.05,dt);
  if(!allowed){this.cancel();return;}
  if(walking){
   if(this.phase==='drift'){this.poses=hands.map(h=>({position:h.position.clone(),orientation:h.quaternion.clone()}));this.enter('startle');}
   else if(this.phase==='rest'){this.age=0;return;}
  }
  if(this.phase==='rest'){
   if(busy)return;this.age+=dt;if(this.age<2.2)return;
   this.poses=hands.map(h=>({position:h.position.clone(),orientation:h.quaternion.clone()}));this.thresholds=[0,1].map(()=>2.1+this.random()*.8);
   const quicker=this.random()<.5?0:1;
   this.speeds=[0,1].map(i=>i===quicker?.27+this.random()*.07:.17+this.random()*.05);
   this.velocities=[new T.Vector3(),new T.Vector3()];this.delays=[0,1].map(()=>this.random()*1.8);this.ramps=[0,1].map(()=>3.5+this.random()*3);
   this.rhythms=[0,1].map(()=>({phase:this.random()*Math.PI*2,rate:.45+this.random()*.4}));
   for(let i=0;i<2;i++)this.target(i,root);this.enter('drift');
  }
  if(this.phase==='drift'&&busy)return;
  this.age+=dt;
  if(this.phase==='drift'){
   for(let i=0;i<2;i++){
    const age=this.age-this.delays[i];if(age<=0)continue;
    const rhythm=this.rhythms[i],clock=age*rhythm.rate+rhythm.phase;
    const p=this.poses[i],target=this.targets[i].clone();target.y+=Math.sin(clock*.7)*.1;
    const delta=target.sub(p.position),direction=delta.clone().normalize();
    // Broad, independently timed bends, with inertia rather than straight
    // constant-speed travel. The first few seconds are barely a departure.
    direction.applyAxisAngle(new T.Vector3(0,1,0),Math.sin(clock)*.75+Math.sin(clock*1.73+rhythm.phase)*.28);
    const ramp=T.MathUtils.smoothstep(age/this.ramps[i],0,1),pace=.72+.28*Math.sin(clock*.81+1.2);
    const velocity=direction.multiplyScalar(Math.min(delta.length(),this.speeds[i]*ramp*pace));
    this.velocities[i].lerp(velocity,1-Math.exp(-dt*1.6));
    const step=this.velocities[i].clone().multiplyScalar(dt),next=p.position.clone().add(step);
    if(Math.hypot(next.x-root.position.x,next.z-root.position.z)>.78&&[.5,1,3].every(t=>this.safe(p.position.clone().addScaledVector(step,t))))p.position.copy(next);
    else{this.velocities[i].multiplyScalar(Math.exp(-dt*8));this.target(i,root);}
    if(delta.length()<.14&&this.age>3)this.target(i,root);
    p.orientation.slerp(root.quaternion.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),(i?-.18:.18)+Math.sin(clock*.6)*.09)),1-Math.exp(-dt*1.4));
   }
  }else if(this.phase==='startle'){
   this.poses=this.starts.map((p,i)=>startledPose(p,this.age,i?1:-1));if(this.age>=.2)this.enter('return');
  }else if(this.phase==='return'){
   const u=T.MathUtils.smoothstep(this.age/1.05,0,1);
   this.poses=this.starts.map((p,i)=>({position:p.position.clone().lerp(new T.Vector3((i?1:-1)*.9,1.03,.22).applyQuaternion(root.quaternion).add(root.position),u),orientation:p.orientation.clone().slerp(root.quaternion,u)}));
   if(this.age>=1.05)this.cancel();
  }
 }
}
