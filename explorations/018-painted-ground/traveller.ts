import * as T from 'three';
import {walkingFingerAngles} from './finger-walk';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {createArmSwing} from './arm-swing';
import {createStride} from './gait';
import {createLehi} from './lehi';

// Keep the controller root and all contact transforms stable across appearances.
// Asset hand names are artist-side labels: use root X and thumb placement instead.
export function createTraveller(scene:T.Scene,status:(message:string)=>void){
 const controller=createLehi(scene),root=controller.root,loader=new GLTFLoader();
 const gradient=new T.DataTexture(new Uint8Array([65,145,220,255]),4,1,T.RedFormat);
 gradient.minFilter=gradient.magFilter=T.NearestFilter;gradient.needsUpdate=true;
 const scale=.72;
 type Digit={node:T.Object3D;rest:T.Quaternion;amount:number;index:number;walk?:{a:number;b:number;segment:'base'|'middle'|'tip'}};
 type Variant={model:T.Group;mixer:T.AnimationMixer;actions:Record<string,T.AnimationAction>;hands:T.Object3D[];digits:Digit[][];wrist:T.Mesh;arms:ReturnType<typeof createArmSwing>;motion:string;lean:number;stride:ReturnType<typeof createStride>;colors:{material:T.MeshToonMaterial;original:T.Color;role:number}[]};
 const variants=new Map<string,Variant>();let requested='blue-wrap',active:Variant|undefined,current='checkpoint';
 const originalHands=controller.hands.map(h=>[...h.group.children]);
 let palette='raincoat';
 const palettes:Record<string,string[]>={raincoat:['#edbf3e','#845a2a','#ffdf86'],ember:['#c95543','#693c4c','#e8a966'],cyan:['#51c8d2','#316473','#b6ece0'],fern:['#81b44f','#365745','#d2d976']};
 function paint(v:Variant){const colors=palettes[palette];for(const c of v.colors)c.material.color.copy(colors?new T.Color(colors[c.role]):c.original);}
 let running=false,speed=0;const previous=root.position.clone();let initialized=false;
 function select(name:string){
  requested=name;
  if(name!=='checkpoint'&&!variants.has(name)){status('Loading '+name+'…');return;}
  for(const v of variants.values()){v.model.visible=false;v.hands.forEach(h=>h.visible=false);}
  active=variants.get(name);current=name;controller.body.visible=!active;
  controller.hands.forEach(h=>h.group.userData.artHand=!!active);controller.resetWalkContacts();
  originalHands.forEach(parts=>parts.forEach(p=>p.visible=!active));
  if(active){active.model.visible=true;active.hands.forEach(h=>h.visible=true);}
  status(active?'Art handoff 01 · run / walk / articulated hands':'Previous procedural figure retained for comparison.');
 }
 async function load(name:string){
  const gltf=await loader.loadAsync((name==='blue-wrap'?new URL('./assets/avatars/blue-wrap.glb',import.meta.url):new URL('./assets/avatars/olive-cape.glb',import.meta.url)).href);
  const model=gltf.scene;model.updateMatrixWorld(true);
  const handRoots:T.Object3D[]=[];
  model.traverse(o=>{if(o.name.includes('hovering_HAND'))handRoots.push(o);});
  handRoots.sort((a,b)=>a.getWorldPosition(new T.Vector3()).x-b.getWorldPosition(new T.Vector3()).x);
  if(handRoots.length!==2)throw new Error(name+': expected two articulated hands');
  const digits:Digit[][]=[];
  handRoots.forEach((hand,i)=>{
   controller.hands[i].group.attach(hand);
   hand.position.set(0,-.17,0);hand.quaternion.identity();hand.scale.setScalar(.68);hand.visible=false;
   const joints:Digit[]=[];
   hand.traverse(o=>{
    if(/base_joint|middle_joint|tip_joint|Opposing_thumb|distal_joint/.test(o.name))joints.push({node:o,rest:o.quaternion.clone(),index:/thumb/i.test(o.name)?4:Number(o.name.match(/Finger[_ ](\d)/i)?.[1]??0),amount:/middle_joint/.test(o.name)?.55:/tip_joint/.test(o.name)?.40:/Opposing_thumb/.test(o.name)?.25:.32});
    if(o instanceof T.Mesh){o.castShadow=true;o.renderOrder=20;const materials=(Array.isArray(o.material)?o.material:[o.material]).map(m=>{const c=m.clone();c.transparent=true;c.depthTest=true;c.depthWrite=true;return c;});o.material=Array.isArray(o.material)?materials:materials[0];}
   });
   for(let digit=0;digit<4;digit++){
    const base=joints.find(d=>d.index===digit&&/base_joint/.test(d.node.name)),middle=joints.find(d=>d.index===digit&&/middle_joint/.test(d.node.name)),tip=joints.find(d=>d.index===digit&&/tip_joint/.test(d.node.name));
    if(base&&middle&&tip){const a=middle.node.position.y,b=tip.node.position.y+.172;for(const [joint,segment] of [[base,'base'],[middle,'middle'],[tip,'tip']] as const)joint.walk={a,b,segment};}
   }
   digits.push(joints);
  });
  const wrists:T.SkinnedMesh[]=[],colors:Variant['colors']=[];
  model.traverse(o=>{if(o instanceof T.Mesh){o.castShadow=true;
   const style=(m:T.MeshStandardMaterial)=>{
    const material=new T.MeshToonMaterial({color:m.color,emissive:m.emissive,emissiveIntensity:m.emissiveIntensity,side:m.side,gradientMap:gradient});
    // Palette roles come from authored materials. "garment" contains "arm";
    // substring-based mesh exclusions previously left the back hood gray.
    const role=/main.fabric/i.test(m.name)?0:/dark.lining|trousers/i.test(m.name)?1:/seam|cuff.trim/i.test(m.name)?2:-1;
    if(role>=0)colors.push({material,original:m.color.clone(),role});
    material.name=m.name;return material;
   };
   o.material=Array.isArray(o.material)?o.material.map(m=>style(m as T.MeshStandardMaterial)):style(o.material as T.MeshStandardMaterial);
   if(o instanceof T.SkinnedMesh&&o.name.includes('bodily_hand'))wrists.push(o);
  }});
  // The body has no arm bones yet. Attach the ribbon to the actual skinned
  // ordinary right hand; don't claim an IK reach pose or attach it in midair.
  const center=(mesh:T.SkinnedMesh)=>{mesh.skeleton.update();mesh.computeBoundingBox();return mesh.boundingBox!.getCenter(new T.Vector3()).applyMatrix4(mesh.matrixWorld);};
  wrists.sort((a,b)=>center(a).x-center(b).x);if(!wrists[0])throw new Error(name+': ordinary wrist missing');
  const stride=createStride(model,scale),arms=createArmSwing(model);
  const mixer=new T.AnimationMixer(model),actions:Record<string,T.AnimationAction>={};
  for(const clip of gltf.animations)actions[clip.name]=mixer.clipAction(clip);
  for(const clip of ['Idle','Walk','Hover'])if(!actions[clip])throw new Error(name+': missing '+clip);
  actions.Idle.play();model.scale.setScalar(scale);model.visible=false;root.add(model);
  const variant={model,mixer,actions,hands:handRoots,digits,wrist:arms.hands[0]??wrists[0],arms,motion:'Idle',lean:0,colors,stride};paint(variant);variants.set(name,variant);
  if(requested===name)select(name);
 }
 for(const name of ['blue-wrap','olive-cape'])load(name).catch(e=>{console.error(e);if(requested===name){status('Figure failed to load; previous figure remains available. '+e.message);}});
 function update(...args:Parameters<typeof controller.update>){
  const [,dt,moving,,grip,brace,,,pull]=args;
  const displacement=root.position.clone().sub(previous);const distance=initialized?displacement.length():0;previous.copy(root.position);initialized=true;
  speed=T.MathUtils.lerp(speed,distance/Math.max(dt,.001),1-Math.exp(-dt*10));
  controller.setTravelMotion(speed,active?.stride.phase??(args[0]/1000*1.7)%1);
  controller.update(...args);
  if(!active)return;
  // Grounded only. Retiming is bounded; controller speeds are chosen to fit
  // this short authored stride instead of substituting a hovering animation.
  running=moving&&speed>2&&!pull&&!grip;
  active.stride.restore();
  const motion=moving&&speed>.045?'Walk':'Idle';
  if(motion!==active.motion){active.actions[active.motion].fadeOut(.16);active.actions[motion].reset().setEffectiveWeight(1).fadeIn(.16).play();active.motion=motion;}
  const local=displacement.clone().applyAxisAngle(new T.Vector3(0,1,0),-root.rotation.y);
  // Walk remains the cloth/sway layer; feet are solved by the stride controller.
  active.actions.Walk.setEffectiveTimeScale(T.MathUtils.clamp(speed*.6/(2*(pull?.28:.44)*scale)*2,.3,3.6));
  active.stride.restore();active.mixer.update(dt);active.stride.update(dt,local,moving,!!pull,running);active.arms.update(active.stride.phase,active.stride.weight,running,!!grip,dt);
  const effort=pull?T.MathUtils.clamp(pull.effort,0,1):0;
  active.lean=T.MathUtils.lerp(active.lean,pull?-.08-effort*.08:running?.09:0,1-Math.exp(-dt*10));active.model.rotation.x=0;active.stride.lean(active.lean);
  active.digits.forEach((digits,i)=>{
   const hand=controller.hands[i].group,walk=hand.userData.fingerWalk;
   const poses=new Map<number,{base:number;middle:number;splay:number}>();
   if(walk)for(const d of digits.filter(d=>d.walk?.segment==='base')){
    const upright=walk.style==='upright',leg=d.index===1||d.index===2,splay=(1.5-d.index)*(upright?.10:.19);
    const angles=upright&&!leg?{base:1.25,middle:1.8}:walkingFingerAngles(d.walk!.a,d.walk!.b,d.node.position,.68,new T.Vector3(0,-.17,0),walk.contactPose,walk.direction,walk.steps[d.index],splay,upright?0:.204);
    poses.set(d.index,{...angles,splay});
   }
   for(const d of digits){
    const curl=(hand.userData.fingerGrasps as number[])[d.index]??hand.userData.grasp;
    d.node.quaternion.copy(d.rest).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),curl*d.amount));
    if(walk&&d.walk){
     const p=poses.get(d.index)!,q=new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),d.walk.segment==='base'?p.base:d.walk.segment==='middle'?p.middle:0);
     if(d.walk.segment==='base')q.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),p.splay));
     d.node.quaternion.slerp(q,walk.weight);
    }else if(walk&&d.index===4){
     const q=d.rest.clone().multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(1,0,0),.3+walk.thumb*.25));
     if(/Opposing_thumb|Opposing thumb/.test(d.node.name))q.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),(i?1:-1)*(.28+walk.thumb*.18)));
     d.node.quaternion.slerp(q,walk.weight);
    }
   }
   if(walk?.weight>.99){hand.updateMatrixWorld(true);const tips=digits.filter(d=>d.walk?.segment==='tip'),toes=tips.map(d=>d.node.localToWorld(new T.Vector3(0,.172,0)));Object.assign(root.userData.fingerWalk,walk.recordContacts(toes,hand));hand.updateMatrixWorld(true);toes.forEach((p,k)=>p.copy(tips[k].node.localToWorld(new T.Vector3(0,.172,0))));root.userData.fingerWalk.toeHeights=toes.map(p=>p.y);root.userData.fingerWalk.toes=toes.map(p=>p.toArray());root.userData.fingerWalk.knees=[1,2].map(k=>poses.get(k)?.middle);root.userData.fingerWalk.steps=walk.steps;root.userData.fingerWalk.thumb=walk.thumb;root.userData.fingerWalk.palmNormalY=new T.Vector3(0,0,1).applyQuaternion(hand.quaternion).y;}
  });
 }
 return {root,update,previewIdle:controller.previewIdle,stopIdlePreview:controller.stopIdlePreview,setCatchProps:controller.setCatchProps,setIdleCatch:controller.setIdleCatch,setTravelStyle:controller.setTravelStyle,setIdleWalkStyle:controller.setIdleWalkStyle,setIdleTerrain:controller.setIdleTerrain,setIdleMode:controller.setIdleMode,choose:select,setPalette(name:string){palette=name;variants.forEach(paint);},current:()=>current,locomotion:()=>running?'Run':active?.motion??'procedural',linkEnds(){
  const ends=controller.linkEnds();if(active){root.updateMatrixWorld(true);const m=active.wrist;if(m instanceof T.SkinnedMesh)m.skeleton.update();const p=new T.Vector3(),sum=new T.Vector3();const n=m.geometry.attributes.position.count;for(let i=0;i<n;i++)sum.add(m.getVertexPosition(i,p));ends.from.copy(m.localToWorld(sum.divideScalar(n)));ends.to.copy(active.hands[0].localToWorld(new T.Vector3(0,0,0)));}return ends;
 }};
}
