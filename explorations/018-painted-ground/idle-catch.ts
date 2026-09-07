import {startledPose} from './idle-roam';
import * as T from 'three';

/** Explicit affordance: only loose, hand-sized stones; never scenery or gates. */
export type CatchProp={object:T.Object3D;radius:number;groundY:number;touch:T.Vector3};
type Pose={position:T.Vector3;orientation:T.Quaternion;grasp:number};
type Phase='rest'|'scout'|'grip'|'lift'|'notice'|'spread'|'windup'|'throw'|'flight'|'catch'|'miss'|'return'|'place'|'startle'|'depart'|'rejoin';
const socket=new T.Vector3(0,.12,.19),xAxis=new T.Vector3(1,0,0);
const smooth=(t:number)=>T.MathUtils.smoothstep(t,0,1);
const pose=(p:Pose):Pose=>({position:p.position.clone(),orientation:p.orientation.clone(),grasp:p.grasp});
export function catchSocket(p:Pose){return socket.clone().applyQuaternion(p.orientation).add(p.position);}

/** Choreography plus a ballistic stone, independent of tree interaction and art rig. */
export class IdleCatch {
 phase:Phase='rest';poses:Pose[]=[];age=0;idle=0;throws=0;catches=0;misses=0;sessions=0;
 enabled=true;prop?:CatchProp;held=false;holder=0;
 private props:CatchProp[]=[];private starts:Pose[]=[];private homes:Pose[]=[];
 private origin=new T.Vector3();private home=new T.Vector3();private heading=new T.Quaternion();
 private elapsed=0;private flightTime=1;private reaction=.2;private reachSpeed=4;
 private target=new T.Vector3();private velocity=new T.Vector3();private spin=new T.Vector3(1,2,.7).normalize();
 private launch=new T.Vector3();private restingRotation=new T.Quaternion();private attachedRotation=new T.Quaternion();
 private loose=false;private bounces=0;private cooldown=7;
 private throwDirection=new T.Vector3();private throwRotation=new T.Quaternion();private departureCenter=new T.Vector3();
 private requestedHand?:number;
 private safe:(p:T.Vector3)=>boolean=()=>true;
 constructor(private random:()=>number=Math.random){}
 setProps(props:CatchProp[],safe?:(p:T.Vector3)=>boolean){this.cancel();this.props=props;this.safe=safe??(()=>true);}
 setEnabled(on:boolean){this.enabled=on;if(!on)this.cancel();}
 requestStart(hand:number){this.requestedHand=hand;this.idle=this.cooldown;}
 get disengaging(){return this.phase==='startle'||this.phase==='depart'||this.phase==='rejoin';}
 get active(){return this.phase!=='rest';}
 get state(){return {phase:this.phase,holder:this.holder,separation:this.homes.length?this.homes[0].position.distanceTo(this.homes[1].position):0,stone:this.prop?.object.userData.rockSeed??null,held:this.held,loose:this.loose,throws:this.throws,catches:this.catches,misses:this.misses,sessions:this.sessions,age:this.age,flightTime:this.flightTime,position:this.prop?.object.position.toArray()??null};}
 private enter(phase:Phase){this.phase=phase;this.age=0;this.starts=this.poses.map(pose);}
 private local(x:number,y:number,z:number){return new T.Vector3(x,y,z).applyQuaternion(this.heading).add(this.origin);}
 private rotation(pitch:number){return this.heading.clone().multiply(new T.Quaternion().setFromAxisAngle(xAxis,pitch));}
 private palmAt(center:T.Vector3,rotation:T.Quaternion){return center.clone().sub(socket.clone().applyQuaternion(rotation));}
 private tween(i:number,position:T.Vector3,orientation:T.Quaternion,grasp:number,t:number){
  const a=this.starts[i],p=this.poses[i],u=smooth(t);p.position.copy(a.position).lerp(position,u);p.orientation.copy(a.orientation).slerp(orientation,u);p.grasp=T.MathUtils.lerp(a.grasp,grasp,u);
 }
 private attach(){
  this.held=true;this.loose=false;
  this.attachedRotation.copy(this.poses[this.holder].orientation).invert().multiply(this.prop!.object.quaternion);
 }
 private syncHeld(){if(this.held&&this.prop){this.prop.object.position.copy(catchSocket(this.poses[this.holder]));this.prop.object.quaternion.copy(this.poses[this.holder].orientation).multiply(this.attachedRotation);}}
 cancel(){
  if(this.phase==='flight'){this.velocity.y-=9.8*Math.min(this.age,this.flightTime);this.loose=true;this.bounces=0;}
  if(this.held){this.syncHeld();this.held=false;this.loose=true;this.velocity.set(0,0,0);this.bounces=0;}
  this.phase='rest';this.idle=0;this.cooldown=7+this.random()*4;
 }
 private drop(dt:number){
  if(!this.loose||!this.prop)return;
  const o=this.prop.object;
  o.position.addScaledVector(this.velocity,dt);o.position.y-=4.9*dt*dt;this.velocity.y-=9.8*dt;
  o.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(this.spin,dt*5));
  if(o.position.y<=this.prop.groundY){
   o.position.y=this.prop.groundY;
   if(this.bounces++===0&&Math.abs(this.velocity.y)>1.2){this.velocity.y=Math.abs(this.velocity.y)*.25;this.velocity.x*=.3;this.velocity.z*=.3;}
   else{this.loose=false;this.velocity.setScalar(0);o.quaternion.copy(this.restingRotation);this.prop.touch.set(o.position.x,this.prop.groundY+this.prop.radius,o.position.z);}
  }
 }
 private facing(direction:T.Vector3){
  const forward=direction.clone().setY(0).normalize(),up=new T.Vector3(0,1,0);
  return new T.Quaternion().setFromRotationMatrix(new T.Matrix4().makeBasis(new T.Vector3().crossVectors(forward,up),forward,up));
 }
 private spreadOut(){
  // Each successful exchange invites another step out. Preserve clear footprints
  // along the move; banks can constrain one hand without shrinking the game.
  const apart=this.homes[1].position.clone().sub(this.homes[0].position).setY(0).normalize();
  for(let i=0;i<2;i++){
   const direction=apart.clone().multiplyScalar(i?1:-1);
   const step=.35+this.random()*.2,candidate=this.homes[i].position.clone().addScaledVector(direction,step);
   if(candidate.distanceTo(this.origin)<4.6&&[.25,.5,.75,1].every(t=>this.safe(this.homes[i].position.clone().lerp(candidate,t))))this.homes[i].position.copy(candidate);
  }
  this.enter('spread');
 }
 private planThrow(){
  const receiver=1-this.holder,separation=this.homes[0].position.distanceTo(this.homes[1].position);
  this.flightTime=.85+this.random()*.3+Math.min(.35,(separation-3)*.07);
  const difficulty=Math.min(1,this.catches/6),late=this.random()<.08+difficulty*.52;
  this.reaction=late?this.flightTime*(.80+difficulty*.13):.14+this.random()*.15;
  this.reachSpeed=2.7+this.random()*1.6;
  const centre=catchSocket(this.homes[receiver]),scatter=1+difficulty*1.8;
  this.target.copy(centre).add(new T.Vector3((this.random()-.5)*1.25*scatter,(this.random()-.5)*.5,(this.random()-.5)*scatter));
  if(!this.safe(this.target))this.target.copy(centre);
  this.throwDirection.copy(this.target).sub(this.poses[this.holder].position).setY(0).normalize();
  this.throwRotation.copy(this.facing(this.throwDirection));
  this.enter('windup');
 }
 private depart(){
  if(this.phase==='flight'){this.velocity.y-=9.8*Math.min(this.age,this.flightTime);this.loose=true;this.bounces=0;}
  this.departureCenter.copy(this.prop!.object.position);this.enter(this.held?'depart':'rejoin');
 }
 update(dt:number,allowed:boolean,root:T.Object3D,hands:T.Object3D[],walking=false,canStart=true){
  dt=Math.min(Math.max(dt,0),.05);
  if(!allowed||!this.enabled){if(this.active)this.cancel();this.idle=0;this.drop(dt);return;}
  if(walking){this.idle=0;if(this.active&&!this.disengaging){if(this.phase==='flight'){this.velocity.y-=9.8*Math.min(this.age,this.flightTime);this.loose=true;this.bounces=0;}this.enter('startle');}else if(!this.active){this.drop(dt);return;}}
  if(this.phase==='rest'){
   this.drop(dt);if(this.loose)return;if(!canStart){this.idle=0;return;}
   this.idle+=dt;if(this.idle<this.cooldown)return;
   let nearby=this.props.filter(p=>p.object.visible&&Math.hypot(p.object.position.x-root.position.x,p.object.position.z-root.position.z)<3.2&&this.safe(p.object.position));
   const roamed=hands.some(h=>Math.hypot(h.position.x-root.position.x,h.position.z-root.position.z)>1.7);
   if(roamed){const distant=nearby.filter(p=>Math.hypot(p.object.position.x-root.position.x,p.object.position.z-root.position.z)>1.7);if(distant.length)nearby=distant;}
   if(!nearby.length){this.idle=2;return;}
   this.prop=nearby[Math.floor(this.random()*nearby.length)];this.origin.copy(root.position);this.heading.copy(root.quaternion);
   this.home.copy(this.prop.object.position);this.restingRotation.copy(this.prop.object.quaternion);
   const side=this.home.clone().sub(this.origin).applyQuaternion(this.heading.clone().invert()).x;
   this.holder=this.requestedHand??(side<0?0:1);this.requestedHand=undefined;this.poses=hands.map(h=>({position:h.position.clone(),orientation:h.quaternion.clone(),grasp:0}));
   // Keep the roaming bearings; direct controller previews use the original forward stations.
   this.homes=[0,1].map(i=>{const position=this.local((i?1:-1)*(1.5+this.random()*.25),1.25,1.35);if(roamed){const offset=hands[i].position.clone().sub(this.origin).setY(0);offset.setLength(T.MathUtils.clamp(offset.length(),2.5,3.2));position.copy(this.origin).add(offset).setY(1.25);}return {position,orientation:this.rotation(-Math.PI/2),grasp:0};});
   if(roamed&&this.homes[0].position.distanceTo(this.homes[1].position)<3.2){
    const receiver=1-this.holder,offset=this.homes[receiver].position.clone().sub(this.origin);
    // Two drifting hands may end up on the same side. The receiver steps around
    // the avatar to a clear, separated station before the first throw.
    for(const turn of [.5,-.5,1,-1,1.5,-1.5,Math.PI]){
     const candidate=offset.clone().applyAxisAngle(new T.Vector3(0,1,0),turn).add(this.origin);
     if(candidate.distanceTo(this.homes[this.holder].position)>=3.2&&this.safe(candidate)){this.homes[receiver].position.copy(candidate);break;}
    }
   }
   if(this.homes.some(p=>!this.safe(p.position))||(roamed&&this.homes[0].position.distanceTo(this.homes[1].position)<3.2)){this.prop=undefined;this.idle=0;return;}
   this.elapsed=0;this.throws=this.catches=this.misses=0;this.sessions++;this.enter('scout');
  }
  this.age+=dt;this.elapsed+=dt;
  const h=this.holder,r=1-h,o=this.prop!.object,down=this.rotation(Math.PI/2),palmUp=this.rotation(-Math.PI/2);
  const groundPalm=()=>this.palmAt(o.position,down);
  switch(this.phase){
   case 'startle':
    this.poses=this.starts.map((p,i)=>({...startledPose(p,this.age,i?1:-1),grasp:p.grasp}));this.drop(dt);
    if(this.age>=.2){this.syncHeld();this.depart();}break;
   case 'scout':{
    const destination=groundPalm();destination.x+=Math.sin(this.age*4)*.1*(1-smooth(this.age/1.7));
    this.tween(h,destination,down,.04,this.age/1.7);
    const u=smooth(this.age/1.7),front=this.local(0,.9,1.8);
    this.poses[h].position.copy(this.starts[h].position).multiplyScalar((1-u)*(1-u)).addScaledVector(front,2*u*(1-u)).addScaledVector(destination,u*u);
    if(this.age>=1.7)this.enter('grip');break;
   }
   case 'grip':
    this.tween(h,groundPalm(),down,.88,this.age/.65);
    if(this.age>=.65){this.attach();this.enter('lift');}break;
   case 'lift':
    this.tween(h,this.homes[h].position,palmUp,.88,this.age/1.05);
    if(this.age>=1.05)this.enter('notice');break;
   case 'notice':{
    const perk=this.starts[r].position.clone().add(new T.Vector3(0,.35,0));
    this.tween(r,perk,this.rotation(-.7),.02,this.age/.3);if(this.age>=.65)this.enter('spread');break;
   }
   case 'spread':
    for(let i=0;i<2;i++)this.tween(i,this.homes[i].position,palmUp,i===h?.88:0,this.age/.95);
    if(this.age>=.95)this.planThrow();break;
   case 'windup':{
    const backswing=this.starts[h].position.clone().addScaledVector(this.throwDirection,-.58).add(new T.Vector3(0,-.38,0));
    this.tween(h,backswing,this.throwRotation.clone().multiply(new T.Quaternion().setFromAxisAngle(xAxis,-.25)),.92,this.age/.65);
    this.tween(r,this.homes[r].position,palmUp,0,this.age/.65);
    if(this.age>=.65)this.enter('throw');break;
   }
   case 'throw':{
    // Accelerate through the release instead of stopping at the apex of a flick.
    const u=Math.min(1,this.age/.24),p=this.poses[h];
    p.position.copy(this.starts[h].position).addScaledVector(this.throwDirection,.95*u*u);p.position.y+=.6*u*u;
    p.orientation.copy(this.starts[h].orientation).slerp(this.throwRotation,u*u);p.grasp=.92*(1-smooth((u-.6)/.4));
    if(this.age>=.24){
     this.syncHeld();this.launch.copy(o.position);this.velocity.copy(this.target).sub(this.launch).divideScalar(this.flightTime);this.velocity.y+=4.9*this.flightTime;
     this.held=false;this.throws++;this.enter('flight');
    }break;
   }
   case 'flight':{
    const t=Math.min(this.age,this.flightTime);o.position.copy(this.launch).addScaledVector(this.velocity,t);o.position.y-=4.9*t*t;
    o.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(this.spin,dt*(4+this.throws)));
    const follow=this.starts[h].position.clone().addScaledVector(this.throwDirection,.35).add(new T.Vector3(0,.18,0));
    if(this.age<.25){const u=1-Math.pow(1-this.age/.25,3);this.poses[h].position.copy(this.starts[h].position).lerp(follow,u);this.poses[h].orientation.copy(this.throwRotation);this.poses[h].grasp=0;}
    else{this.poses[h].position.copy(follow).lerp(this.homes[h].position,smooth((this.age-.25)/.45));this.poses[h].orientation.copy(this.throwRotation).slerp(palmUp,smooth((this.age-.25)/.45));}
    const receiver=this.poses[r],destination=this.palmAt(this.target,palmUp);
    if(this.age>this.reaction){const delta=destination.sub(receiver.position);receiver.position.addScaledVector(delta,Math.min(1,this.reachSpeed*dt/Math.max(delta.length(),.001)));}
    receiver.orientation.slerp(palmUp,1-Math.exp(-dt*12));receiver.grasp=0;
    if(this.age>=this.flightTime){
     if(catchSocket(receiver).distanceTo(o.position)<.17){this.holder=r;this.catches++;this.attach();this.enter('catch');}
     else{this.misses++;this.velocity.y-=9.8*this.flightTime;this.loose=true;this.bounces=0;this.enter('miss');}
    }break;
   }
   case 'catch':
    this.tween(h,this.starts[h].position.clone().add(new T.Vector3(0,-.12,0)),palmUp,.88,this.age/.28);
    if(this.age>=.55){if(this.elapsed>30)this.enter('return');else this.spreadOut();}break;
   case 'miss':
    this.drop(dt);
    // A miss ends the increasingly ambitious rally. Linger over the fallen
    // stone, then disengage; no immediate new rally at the same distance.
    if(!this.loose&&this.age>.9)this.enter('rejoin');break;
   case 'return':
    this.tween(h,this.palmAt(this.home,down),down,.88,this.age/1.3);
    if(this.age>=1.3){this.syncHeld();this.held=false;o.position.copy(this.home);o.quaternion.copy(this.restingRotation);this.prop!.touch.set(o.position.x,this.prop!.groundY+this.prop!.radius,o.position.z);this.enter('place');}break;
   case 'place':
    this.tween(h,this.starts[h].position.clone().add(new T.Vector3(0,.22,0)),down,0,this.age/.6);
    if(this.age>=.6)this.enter('rejoin');break;
   case 'depart':{
    const u=smooth(this.age/.65),center=this.departureCenter.clone();center.y=T.MathUtils.lerp(center.y,this.prop!.groundY,u);
    const hand=this.poses[h];hand.orientation.copy(this.starts[h].orientation).slerp(down,u);hand.position.copy(this.palmAt(center,hand.orientation));
    hand.grasp=this.starts[h].grasp*(1-smooth((this.age-.55)/.25));
    this.syncHeld();
    if(this.age>=.8){this.held=false;o.position.y=this.prop!.groundY;o.quaternion.copy(this.restingRotation);this.prop!.touch.set(o.position.x,this.prop!.groundY+this.prop!.radius,o.position.z);this.enter('rejoin');}break;
   }
   case 'rejoin':
    this.drop(dt);
    for(let i=0;i<2;i++){
     const escort=new T.Vector3((i?1:-1)*.9,1.03,.22).applyQuaternion(root.quaternion).add(root.position);
     this.tween(i,escort,root.quaternion,0,this.age/1.05);
    }
    if(this.age>=1.05){this.cancel();this.cooldown=12+this.random()*10;}break;
  }
  this.syncHeld();
 }
}
