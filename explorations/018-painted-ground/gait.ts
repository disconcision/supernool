import * as T from 'three';
const down=new T.Vector3(0,-1,0),forward=new T.Vector3(0,0,1);
/** Flat-ground two-link gait. Existing skin/rig, longer foot paths; no terrain IK. */
export function createStride(model:T.Object3D,scale:number){
 const bones:T.Bone[]=[];model.traverse(o=>{if(o instanceof T.Bone)bones.push(o);});
 const root=bones.find(b=>b.name==='Root')!,body=bones.find(b=>b.name==='Body')!;
 const legs=bones.filter(b=>b.name.startsWith('Thigh')).sort((a,b)=>a.position.x-b.position.x).map(hip=>{
  const shin=hip.children.find(b=>b instanceof T.Bone) as T.Bone,foot=shin.children.find(b=>b instanceof T.Bone) as T.Bone;
  const hipRest=hip.quaternion.clone(),shinRest=hipRest.clone().multiply(shin.quaternion),footRest=shinRest.clone().multiply(foot.quaternion);
  return {hip,shin,foot,at:hip.position.clone(),hipRest,shinRest,footRest,upper:shin.position.length(),lower:foot.position.length()};
 });
 if(!root||!body||legs.length!==2)throw new Error('Stride requires Root, Body and two thigh/shin/foot chains');
 const tunic=bones.find(b=>b.name.startsWith('Tunic'));const bodyPose=body.quaternion.clone(),tunicPose=tunic?.quaternion.clone();
 const rootRest=root.position.clone();let phase=0,weight=0,heading=0;const direction=forward.clone();
 let runningWeight=0;
 return {restore(){body.quaternion.copy(bodyPose);if(tunic&&tunicPose)tunic.quaternion.copy(tunicPose);},lean(angle:number){body.quaternion.copy(bodyPose).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),angle));},get phase(){return phase;},get weight(){return weight;},update(dt:number,displacement:T.Vector3,moving:boolean,pulling:boolean,running=false){
  bodyPose.copy(body.quaternion);if(tunic&&tunicPose)tunicPose.copy(tunic.quaternion);
  runningWeight=T.MathUtils.lerp(runningWeight,running?1:0,1-Math.exp(-dt*7));
  const amplitude=pulling?.28:T.MathUtils.lerp(.36,.54,runningWeight),duty=T.MathUtils.lerp(.60,.42,runningWeight);
  const distance=displacement.length();if(distance>.00001){const target=Math.atan2(displacement.x,displacement.z);heading+=Math.atan2(Math.sin(target-heading),Math.cos(target-heading))*(1-Math.exp(-dt*12));direction.set(Math.sin(heading),0,Math.cos(heading));}
  if(moving)phase=(phase+distance*duty/(2*amplitude*scale))%1;
  weight=T.MathUtils.lerp(weight,moving?1:0,1-Math.exp(-dt*10));
  root.position.copy(rootRest);
  const feet=legs.map((leg,i)=>{
   const t=(phase+i*.5)%1;let offset:number,lift=0;
   if(t<duty)offset=1-2*t/duty;
   else{const u=(t-duty)/(1-duty),v=-2*(1-duty)/duty;
    // Hermite endpoints match the backward velocity of the stance foot.
    offset=-(2*u*u*u-3*u*u+1)+(u*u*u-2*u*u+u)*v+(-2*u*u*u+3*u*u)+(u*u*u-u*u)*v;
    lift=Math.sin(Math.PI*u)**2*(pulling?.065:T.MathUtils.lerp(.08,.28,runningWeight));
   }
   return new T.Vector3(leg.at.x,.18,leg.at.z).addScaledVector(direction,offset*amplitude*weight).add(new T.Vector3(0,lift*weight,0));
  });
  // Stable pelvis height; knee flexion absorbs stance instead of lifting the
  // entire head twice per cycle. Running has a short flight phase and low bounce.
  const reach=amplitude*weight;
  const hipY=.18+Math.sqrt((Math.min(...legs.map(l=>l.upper+l.lower))-.012)**2-reach*reach)+runningWeight*weight*.018*Math.sin(phase*4*Math.PI);
  body.position.y=hipY;
  legs.forEach((leg,i)=>{
   leg.hip.position.copy(leg.at).setY(hipY);const delta=feet[i].clone().sub(leg.hip.position),d=delta.length(),axis=delta.clone().normalize();
   const a=(leg.upper**2-leg.lower**2+d*d)/(2*d),height=Math.sqrt(Math.max(0,leg.upper**2-a*a));
   const bend=forward.clone().addScaledVector(axis,-forward.dot(axis)).normalize();
   const knee=leg.hip.position.clone().addScaledVector(axis,a).addScaledVector(bend,height);
   const qHip=new T.Quaternion().setFromUnitVectors(down,knee.clone().sub(leg.hip.position).normalize()).multiply(leg.hipRest);
   const qShin=new T.Quaternion().setFromUnitVectors(down,feet[i].clone().sub(knee).normalize()).multiply(leg.shinRest);
   leg.hip.quaternion.copy(qHip);leg.shin.quaternion.copy(qHip).invert().multiply(qShin);leg.foot.quaternion.copy(qShin).invert().multiply(leg.footRest);
  });
  // Additional room for the longer forward step, layered on the authored cloth
  // track. This is a simple clearance response, not collision cloth.
  if(tunic)tunic.quaternion.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),-.24*weight*Math.max(0,...feet.map(p=>p.z))/amplitude));
 }};
}
