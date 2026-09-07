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
  const group=new T.Group();scene.add(group);
  const stone=new T.MeshStandardMaterial({color:side<0?'#6d918c':'#93aba0',roughness:.75,flatShading:true});
  const glow=new T.MeshBasicMaterial({color:side<0?'#a6e3d5':'#f1dba0'});
  part(new T.BoxGeometry(.38,.4,.14),stone,group);
  part(new T.BoxGeometry(.25,.035,.15),glow,group,[0,-.09,0]);
  const joints:T.Group[]=[];
  for(let i=0;i<3;i++){
   const finger=new T.Group();finger.position.set((i-1)*.145,.21,0);finger.rotation.z=(1-i)*.09;group.add(finger);joints.push(finger);
   part(new T.BoxGeometry(.115,.23,.12),stone,finger,[0,.12,0]);
   part(new T.BoxGeometry(.085,.17,.1),stone,finger,[0,.34,.025]);
   part(new T.BoxGeometry(.08,.018,.11),glow,finger,[0,.245,.014]);
  }
  const thumb=new T.Group();thumb.position.set(side*.245,-.04,.02);thumb.rotation.z=-side*.8;group.add(thumb);part(new T.BoxGeometry(.13,.24,.14),stone,thumb,[0,.1,0]);
  return {group,joints,thumb};
 }
 const hands=[hand(-1),hand(1)];
 function update(now:number,dt:number,moving:boolean,camera:T.Camera,grip?:T.Vector3,brace?:T.Vector3,active=1){
  const time=now/1000;
  legs.forEach((leg,i)=>leg.rotation.x=moving?Math.sin(time*10+i*Math.PI)*.45:0);
  arms.forEach((arm,i)=>{arm.rotation.x=grip?-.8:moving?-Math.sin(time*10+i*Math.PI)*.3:0;arm.rotation.z=grip?(i?-.22:.22):0;});
  body.position.y=moving?Math.abs(Math.sin(time*10))*.025:Math.sin(time*2)*.012;
  hands.forEach((h,i)=>{
   const contact=i===active?grip:brace;
   const rest=new T.Vector3((i?1:-1)*.9,1.03+Math.sin(time*2+i)*.07,.22).applyAxisAngle(new T.Vector3(0,1,0),root.rotation.y).add(root.position);
   const contactOffset=new T.Vector3((i?1:-1)*.58,-.3,.7).applyQuaternion(camera.quaternion);
   const destination=contact?contact.clone().add(contactOffset):rest;
   h.group.position.lerp(destination,1-Math.exp(-dt*(contact?25:8)));
   h.group.quaternion.copy(camera.quaternion);h.group.rotateZ(contact?(i?.23:-.23):(i?-.3:.3));
   h.joints.forEach((j,k)=>j.rotation.x=T.MathUtils.lerp(j.rotation.x,contact?-.85-k*.1:.08,1-Math.exp(-dt*16)));
   h.group.scale.setScalar(contact?1.15:1);
  });
 }
 return {root,update};
}
