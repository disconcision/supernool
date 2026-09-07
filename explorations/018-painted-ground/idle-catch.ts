import * as T from 'three';

/** Explicit affordance: only loose, hand-sized stones; never scenery or gates. */
export type CatchProp={object:T.Object3D;radius:number;groundY:number;touch:T.Vector3};
type Pose={position:T.Vector3;orientation:T.Quaternion;grasp:number};
type Phase='rest'|'scout'|'grip'|'lift'|'notice'|'spread'|'windup'|'throw'|'flight'|'catch'|'miss'|'retrieve'|'return'|'place';
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
 private elapsed=0;private budget=4;private flightTime=1;private reaction=.2;private reachSpeed=4;
 private target=new T.Vector3();private velocity=new T.Vector3();private spin=new T.Vector3(1,2,.7).normalize();
 private launch=new T.Vector3();private restingRotation=new T.Quaternion();private attachedRotation=new T.Quaternion();
 private loose=false;private bounces=0;private cooldown=4.5;
 private safe:(p:T.Vector3)=>boolean=()=>true;
 constructor(private random:()=>number=Math.random){}
 setProps(props:CatchProp[],safe?:(p:T.Vector3)=>boolean){this.cancel();this.props=props;this.safe=safe??(()=>true);}
 setEnabled(on:boolean){this.enabled=on;if(!on)this.cancel();}
 get active(){return this.phase!=='rest';}
 get state(){return {phase:this.phase,stone:this.prop?.object.userData.rockSeed??null,held:this.held,loose:this.loose,throws:this.throws,catches:this.catches,misses:this.misses,sessions:this.sessions,age:this.age,flightTime:this.flightTime,position:this.prop?.object.position.toArray()??null};}
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
  this.phase='rest';this.idle=0;this.cooldown=5+this.random()*4;
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
 private planThrow(){
  const receiver=1-this.holder;
  this.flightTime=.8+this.random()*.6;
  // The hand starts at its station; the stone is aimed off-centre. Late reactions
  // can genuinely fail the spatial catch test, rather than teleporting a catch.
  this.reaction=this.random()<.22?this.flightTime*.9:.14+this.random()*.15;
  this.reachSpeed=2.6+this.random()*2;
  const centre=catchSocket(this.homes[receiver]);
  this.target.copy(centre).add(new T.Vector3((this.random()-.5)*1.55,(this.random()-.5)*.65,(this.random()-.5)*1.2));
  if(!this.safe(this.target))this.target.copy(centre);
  this.enter('windup');
 }
 update(dt:number,allowed:boolean,root:T.Object3D,hands:T.Object3D[]){
  dt=Math.min(Math.max(dt,0),.05);
  if(!allowed||!this.enabled){if(this.active)this.cancel();this.idle=0;this.drop(dt);return;}
  if(this.phase==='rest'){
   this.drop(dt);if(this.loose)return;
   this.idle+=dt;if(this.idle<this.cooldown)return;
   const nearby=this.props.filter(p=>p.object.visible&&Math.hypot(p.object.position.x-root.position.x,p.object.position.z-root.position.z)<3.2&&this.safe(p.object.position));
   if(!nearby.length){this.idle=2;return;}
   this.prop=nearby[Math.floor(this.random()*nearby.length)];this.origin.copy(root.position);this.heading.copy(root.quaternion);
   this.home.copy(this.prop.object.position);this.restingRotation.copy(this.prop.object.quaternion);
   const side=this.home.clone().sub(this.origin).applyQuaternion(this.heading.clone().invert()).x;
   this.holder=side<0?0:1;this.poses=hands.map(h=>({position:h.position.clone(),orientation:h.quaternion.clone(),grasp:0}));
   // Stations sit forward of the body, clear of its head and each other.
   this.homes=[0,1].map(i=>({position:this.local((i?1:-1)*(1.05+this.random()*.35),1.25,.95),orientation:this.rotation(-Math.PI/2),grasp:0}));
   if(this.homes.some(p=>!this.safe(p.position))){this.prop=undefined;this.idle=0;return;}
   this.elapsed=0;this.budget=3+Math.floor(this.random()*5);this.throws=this.catches=this.misses=0;this.sessions++;this.enter('scout');
  }
  this.age+=dt;this.elapsed+=dt;
  const h=this.holder,r=1-h,o=this.prop!.object,down=this.rotation(Math.PI/2),palmUp=this.rotation(-Math.PI/2);
  const groundPalm=()=>this.palmAt(o.position,down);
  switch(this.phase){
   case 'scout':{
    const destination=groundPalm();destination.x+=Math.sin(this.age*4)*.1*(1-smooth(this.age/1.7));
    this.tween(h,destination,down,.04,this.age/1.7);if(this.age>=1.7)this.enter('grip');break;
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
    this.tween(r,this.homes[r].position,palmUp,0,this.age/.85);if(this.age>=.85)this.planThrow();break;
   case 'windup':{
    const away=this.target.clone().sub(this.starts[h].position).setY(0).normalize().multiplyScalar(-.36);
    this.tween(h,this.starts[h].position.clone().add(away).add(new T.Vector3(0,-.17,0)),this.rotation(-2.05),.92,this.age/.55);
    this.tween(r,this.homes[r].position,palmUp,0,this.age/.55);
    if(this.age>=.55)this.enter('throw');break;
   }
   case 'throw':{
    const forward=this.target.clone().sub(this.starts[h].position).setY(0).normalize().multiplyScalar(.48);
    this.tween(h,this.starts[h].position.clone().add(forward).add(new T.Vector3(0,.30,0)),palmUp,T.MathUtils.lerp(.9,0,smooth((this.age-.07)/.11)),this.age/.18);
    if(this.age>=.18){
     this.syncHeld();this.launch.copy(o.position);this.velocity.copy(this.target).sub(this.launch).divideScalar(this.flightTime);this.velocity.y+=4.9*this.flightTime;
     this.held=false;this.throws++;this.enter('flight');
    }break;
   }
   case 'flight':{
    const t=Math.min(this.age,this.flightTime);o.position.copy(this.launch).addScaledVector(this.velocity,t);o.position.y-=4.9*t*t;
    o.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(this.spin,dt*(4+this.throws)));
    this.tween(h,this.homes[h].position,palmUp,0,this.age/.35);
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
    if(this.age>=.55){if(this.throws>=this.budget||this.elapsed>24)this.enter('return');else this.planThrow();}break;
   case 'miss':
    this.drop(dt);
    // The reaching hand hangs open for a beat, then goes after the dropped stone.
    if(!this.loose&&this.age>.65){this.holder=r;if(this.safe(o.position)&&o.position.distanceTo(this.origin)<4.5)this.enter('retrieve');else this.cancel();}break;
   case 'retrieve':
    this.tween(h,groundPalm(),down,.04,this.age/1.15);
    if(this.age>=1.15){if(this.elapsed>24){this.cancel();}else this.enter('grip');}break;
   case 'return':
    this.tween(h,this.palmAt(this.home,down),down,.88,this.age/1.3);
    if(this.age>=1.3){this.syncHeld();this.held=false;o.position.copy(this.home);o.quaternion.copy(this.restingRotation);this.prop!.touch.set(o.position.x,this.prop!.groundY+this.prop!.radius,o.position.z);this.enter('place');}break;
   case 'place':
    this.tween(h,this.starts[h].position.clone().add(new T.Vector3(0,.22,0)),down,0,this.age/.6);
    if(this.age>=.6){this.cancel();this.cooldown=9+this.random()*9;}break;
  }
  this.syncHeld();
 }
}
