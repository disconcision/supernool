import {IdleRoam} from './idle-roam';
import {FingerWalk,walkingFingerAngles,WalkStyle} from './finger-walk';
import {IdleSchedule,IdleMode} from './idle-schedule';
import {IdleCatch} from './idle-catch';
import type {CatchProp} from './idle-catch';
import {TravelHands} from './hand-travel';
import * as T from 'three';
// Provisional short-mantle silhouette informed by reference-lab/avatar-scale A.
// Auxiliary hands are separate tools; ordinary small arms remain on the body.
export function createLehi(scene:T.Scene){
 const root=new T.Group(),body=new T.Group();root.add(body);scene.add(root);
 const mat=(color:string)=>new T.MeshToonMaterial({color});
 const coat=mat('#356b73'),dark=mat('#364654'),skin=mat('#d4ad87'),hair=mat('#363a49'),gold=mat('#d9b875');
 function part(g:T.BufferGeometry,m:T.Material,parent:T.Object3D,p:number[]=[0,0,0]){const o=new T.Mesh(g,m);o.position.set(p[0],p[1],p[2]);o.castShadow=true;parent.add(o);return o;}
 const legs=[-1,1].map(side=>{const g=new T.Group();g.position.set(side*.13,.52,0);body.add(g);part(new T.CylinderGeometry(.075,.055,.4,5),dark,g,[0,-.19,0]);part(new T.BoxGeometry(.16,.11,.23),dark,g,[0,-.43,.045]);return g;});
 part(new T.CylinderGeometry(.19,.25,.5,7),dark,body,[0,.76,0]);
 part(new T.CylinderGeometry(.17,.35,.24,7),coat,body,[0,1,-.035]);
 const mantle=part(new T.ConeGeometry(.35,.53,5,1,true),coat,body,[0,.74,-.12]);mantle.scale.z=.6;
 part(new T.IcosahedronGeometry(.235,1),skin,body,[0,1.3,0]);
 part(new T.SphereGeometry(.244,8,5,0,Math.PI*2,0,Math.PI*.6),hair,body,[0,1.34,-.04]);
 for(const x of [-.085,.085])part(new T.BoxGeometry(.042,.055,.025),dark,body,[x,1.3,.211]);
 part(new T.BoxGeometry(.07,.07,.05),gold,body,[.06,.99,.23]);
 const arms=[-1,1].map(side=>{const g=new T.Group();g.position.set(side*.26,.98,0);body.add(g);part(new T.CylinderGeometry(.062,.047,.34,5),coat,g,[0,-.15,0]);part(new T.IcosahedronGeometry(.07,0),skin,g,[0,-.34,0]);return g;});
 const halo=part(new T.RingGeometry(.42,.47,32),new T.MeshBasicMaterial({color:'#eee0b4',side:T.DoubleSide}),root,[0,.025,0]);halo.rotation.x=-Math.PI/2;
 function hand(side:number){
  const group=new T.Group();group.userData.mistOverlay=true;group.userData.hand=side<0?'right':'left';scene.add(group);
  const stone=new T.MeshStandardMaterial({color:side<0?'#6d918c':'#93aba0',roughness:.75,flatShading:true,transparent:true});
  const glow=new T.MeshBasicMaterial({color:side<0?'#a6e3d5':'#f1dba0',transparent:true});
  part(new T.BoxGeometry(.38,.4,.14),stone,group);
  part(new T.BoxGeometry(.25,.035,.15),glow,group,[0,-.09,0]);
  const joints:T.Group[]=[],tips:T.Group[]=[];
  for(let i=0;i<3;i++){
   const finger=new T.Group();finger.position.set((i-1)*.145,.21,0);finger.rotation.z=(1-i)*.09;group.add(finger);joints.push(finger);
   part(new T.BoxGeometry(.115,.20,.12),stone,finger,[0,.10,0]);
   const tip=new T.Group();tip.position.y=.21;finger.add(tip);tips.push(tip);
   part(new T.BoxGeometry(.085,.17,.1),stone,tip,[0,.085,0]);
   part(new T.BoxGeometry(.09,.025,.12),glow,finger,[0,.205,0]);
  }
  const thumb=new T.Group();thumb.position.set(-side*.245,-.04,.02);thumb.rotation.z=side*.8;group.add(thumb);part(new T.BoxGeometry(.13,.24,.14),stone,thumb,[0,.1,0]);
  // Draw opaque-looking hand pieces after the transparent sigils, retaining
  // depth testing/writes for the hand itself and the surrounding world.
  group.traverse(o=>{if(o instanceof T.Mesh)o.renderOrder=20;});
  return {group,joints,tips,thumb};
 }
 // The character faces local +Z: anatomical right is local -X.
 const hands=[hand(-1),hand(1)],orientation=new T.Quaternion();
 const catchGame=new IdleCatch(),fingerWalk=new FingerWalk(),idleSchedule=new IdleSchedule(),roam=new IdleRoam();
 const travel=new TravelHands();let travelSpeed=0,travelPhase=0;
 const fingerGrasps=hands.map(()=>[0,0,0,0,0]);
 let grasp=[0,0],idleTime=0;
 function update(now:number,dt:number,moving:boolean,camera:T.Camera,grip?:T.Vector3,brace?:T.Vector3,active=0,engaged=true,pull?:{velocity:T.Vector3;effort:number},idleBlocked=false,walkingIntent=false){
  const time=now/1000;
  travel.update(dt,travelSpeed,moving,!grip&&!brace&&!engaged&&!pull);
  root.userData.travelHandPose=travel.style;root.userData.travelHandWeight=travel.weight;
  const allowed=!grip&&!brace&&!engaged&&!pull&&!idleBlocked,walking=moving||walkingIntent;
  const wasBusy=catchGame.active||fingerWalk.active;
  const wasRoaming=roam.active;roam.update(dt,allowed&&idleSchedule.mode!=='rest',walking,wasBusy,root,hands.map(h=>h.group));
  const request=idleSchedule.tick(dt,allowed&&!walking,wasBusy);
  if(request){
   const catchHand=request.kind==='catch'?catchGame.nearbyHand(root,hands.map(h=>h.group),[0,1].map(i=>roam.ready(i,root)),request.hand):undefined;
   if(catchHand!==undefined){catchGame.requestStart(catchHand);catchGame.update(dt,allowed,root,hands.map(h=>h.group),walking,true);}
   const walkHand=idleSchedule.handFor('walk');
   if(!catchGame.active&&idleSchedule.mode!=='catch-only'&&roam.ready(walkHand,root)&&fingerWalk.startWalk(root,hands.map(h=>h.group),walkHand,camera))idleSchedule.started('walk',walkHand);
   else if(catchGame.active)idleSchedule.started('catch',catchHand!);
  }
  if(!request||!catchGame.active)catchGame.update(dt,allowed,root,hands.map(h=>h.group),walking,false);
  fingerWalk.update(dt,allowed,walking,root);
  const busy=catchGame.active||fingerWalk.active;
  if(wasBusy&&!busy){roam.finish(hands.map(h=>h.group));idleSchedule.rest();}
  if(wasRoaming&&!roam.active&&!busy)idleSchedule.rest();
  root.userData.idleRoam=roam.state;
  root.userData.idleCatch=catchGame.state;root.userData.fingerWalk=fingerWalk.state;root.userData.idleCooldown=idleSchedule.remaining;
  idleTime=walking||!allowed||busy?0:idleTime+dt;
  root.userData.handActivity=roam.phase==='startle'||catchGame.disengaging||fingerWalk.leaving?'disengaging':catchGame.active?'playing-catch':fingerWalk.active?'finger-walking':roam.phase==='drift'?'roaming':grip||brace?'tree':'escort';
  const effort=pull?T.MathUtils.clamp(pull.effort,0,1):0;
  const localVelocity=pull?.velocity.clone().applyAxisAngle(new T.Vector3(0,1,0),-root.rotation.y);
  const gait=time*(pull?8:10),stride=pull?.23:.45;
  legs.forEach((leg,i)=>{const phase=Math.sin(gait+i*Math.PI);leg.rotation.x=moving?phase*stride*(localVelocity&&localVelocity.z<-.1?-1:1):0;leg.rotation.z=pull&&moving?phase*T.MathUtils.clamp(localVelocity!.x,-1,1)*.12:0;});
  arms.forEach((arm,i)=>{const contact=i===active?grip:brace;arm.rotation.x=contact?-(pull?1.05:.8):moving&&!pull?-Math.sin(gait+i*Math.PI)*.3:0;arm.rotation.z=contact?(i?-.22:.22):0;});
  const ease=1-Math.exp(-dt*10);
  body.rotation.x=T.MathUtils.lerp(body.rotation.x,pull?-.10-effort*.10:0,ease);
  body.position.y=T.MathUtils.lerp(body.position.y,(moving?Math.abs(Math.sin(gait))*(pull?.012:.025):Math.sin(time*2)*.012)-(pull?.04+effort*.025:0),ease);
  hands.forEach((h,i)=>{
   const contact=i===active?grip:brace;
   const travelling=travel.sample(i?1:-1,travelPhase);
   const travelWeight=contact?0:travel.weight;
   const rest=new T.Vector3((i?1:-1)*.9,1.03+Math.sin(time*2+i)*.07,.22).lerp(travelling.position,travelWeight).applyAxisAngle(new T.Vector3(0,1,0),root.rotation.y).add(root.position);
   const cameraRight=new T.Vector3(1,0,0).applyQuaternion(camera.quaternion);
   const sideOnScreen=new T.Vector3(i?1:-1,0,0).applyQuaternion(root.quaternion).dot(cameraRight);
   const contactOffset=new T.Vector3(sideOnScreen*.10-.52,-.30,.80).applyQuaternion(camera.quaternion);
   const destination=contact?contact.clone().add(contactOffset):rest;
   h.group.position.lerp(destination,1-Math.exp(-dt*(contact?25:moving?18:8)));
   // Anatomical sides and palm direction follow the body, including at work.
   // Camera-facing palms used to swap apparent handedness when the body turned.
   orientation.copy(root.quaternion);
   orientation.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),contact?(i?.18:-.18):(i?-.22:.22)));
   if(travelWeight>0)orientation.slerp(root.quaternion.clone().multiply(travelling.orientation),travelWeight);
   h.group.quaternion.slerp(orientation,1-Math.exp(-dt*14));
   grasp[i]=T.MathUtils.lerp(grasp[i],contact&&(engaged||i!==active)?1:travelling.grasp*travelWeight,1-Math.exp(-dt*12));
   // Restrained resting fidgets between the larger idle activities.
   const free=!moving&&!contact&&!engaged&&!pull?T.MathUtils.smoothstep(idleTime,.6,1.8):0;
   const digits=fingerGrasps[i];
   for(let k=0;k<digits.length;k++){
    const idlePulse=Math.pow(.5+.5*Math.sin(time*1.35+i*2.3-k*.72),4);
    const fidget=.025+.16*idlePulse;
    const target=grasp[i]+free*fidget*(k===4?.55:1);
    digits[k]=contact?grasp[i]:T.MathUtils.lerp(digits[k],target,1-Math.exp(-dt*10));
   }
   h.joints.forEach((j,k)=>{j.rotation.x=.06+digits[k]*(.48+k*.045);h.tips[k].rotation.x=digits[k]*(1.0+k*.06);});
   h.thumb.rotation.x=digits[4]*.65;h.thumb.rotation.z=(i?1:-1)*(.8-digits[4]*.25);
   h.group.userData.fingerGrasps=digits;
   h.group.userData.grasp=grasp[i];
   h.group.scale.setScalar(contact?1.15:1);
   h.group.userData.fingerWalk=undefined;h.joints.forEach((j,k)=>{j.scale.setScalar(1);j.rotation.z=(1-k)*.09;});
   if(roam.active&&roam.poses[i]){h.group.position.copy(roam.poses[i].position);h.group.quaternion.copy(roam.poses[i].orientation);}
   if(catchGame.active){
    const play=catchGame.poses[i];h.group.position.copy(play.position);h.group.quaternion.copy(play.orientation);
    grasp[i]=play.grasp;
    for(let k=0;k<digits.length;k++)digits[k]=play.grasp;
    h.joints.forEach((j,k)=>{j.rotation.x=.06+digits[k]*(.48+k*.045);h.tips[k].rotation.x=digits[k]*(1+k*.06);});
    h.thumb.rotation.x=digits[4]*.65;h.thumb.rotation.z=(i?1:-1)*(.8-digits[4]*.25);
    h.group.userData.grasp=play.grasp;
   }
   if(fingerWalk.active&&fingerWalk.hand===i){
    h.group.position.copy(fingerWalk.pose.position);h.group.quaternion.copy(fingerWalk.pose.orientation);
    const weight=fingerWalk.weight,upright=fingerWalk.style==='upright';h.group.userData.fingerWalk=fingerWalk.gait;
    h.joints.forEach((j,k)=>{
     const index=upright?k+1:k,step=fingerWalk.steps[index],splay=(1-k)*(upright?.08:.22),scale=upright?1.5:1;
     const angles=upright&&k===2?{base:1.25,middle:1.8}:walkingFingerAngles(.21*scale,.17*scale,j.position,1,new T.Vector3(),fingerWalk.contactPose,fingerWalk.gait.direction,step,splay,upright?0:.13);
     j.scale.setScalar(T.MathUtils.lerp(1,scale,weight));
     j.quaternion.slerp(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),splay).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),angles.base)),weight);h.tips[k].rotation.x=T.MathUtils.lerp(h.tips[k].rotation.x,angles.middle,weight);
    });
    h.group.updateMatrixWorld(true);
    const toes=h.tips.map(t=>t.localToWorld(new T.Vector3(0,.17,0)));
    fingerWalk.recordContacts(upright?[new T.Vector3(0,1,0),toes[0],toes[1],new T.Vector3(0,1,0)]:toes);
    h.thumb.rotation.x=T.MathUtils.lerp(h.thumb.rotation.x,.35+fingerWalk.thumb*.3,weight);
    h.thumb.rotation.z=T.MathUtils.lerp(h.thumb.rotation.z,(i?1:-1)*(1+fingerWalk.thumb*.2),weight);
   }
  });
 }
 return {root,body,hands,update,setIdleWalkStyle:(style:WalkStyle|'mixed')=>{fingerWalk.preference=style;fingerWalk.cancel();idleSchedule.rest();},setIdleTerrain:(safe:(p:T.Vector3)=>boolean)=>{fingerWalk.setTerrain(safe);roam.setTerrain(safe);},setIdleMode:(mode:IdleMode)=>{idleSchedule.mode=mode;if(mode==='rest')roam.cancel();catchGame.setEnabled(mode==='catch'||mode==='catch-only');if(mode==='rest'||mode==='catch-only')fingerWalk.cancel();idleSchedule.rest();},setCatchProps:(props:CatchProp[],safe?:(p:T.Vector3)=>boolean)=>catchGame.setProps(props,safe),setIdleCatch:(on:boolean)=>catchGame.setEnabled(on),setTravelStyle:(style:string)=>travel.setStyle(style),setTravelMotion(speed:number,phase:number){travelSpeed=speed;travelPhase=phase;},linkEnds(){root.updateMatrixWorld(true);hands[0].group.updateMatrixWorld(true);return {from:arms[0].localToWorld(new T.Vector3(0,-.34,0)),to:hands[0].group.localToWorld(new T.Vector3(0,-.20,0))};}};
}
