import * as T from 'three';
/** The handoff has rigid arms bound to Body, without shoulder bones. Bake those
 * rigid pieces into shoulder groups; keep the torso and leg skin untouched. */
export function createArmSwing(model:T.Object3D){
 model.updateMatrixWorld(true);const body=model.getObjectByName('Body')!;
 const pieces:T.SkinnedMesh[]=[];model.traverse(o=>{if(o instanceof T.SkinnedMesh&&/upper_arm|forearm|cut_sleeve|bodily_hand/.test(o.name))pieces.push(o);});
 const groups:T.Group[]=[],hands:T.Mesh[]=[];
 for(const sign of [-1,1]){
  const selected=pieces.filter(m=>{m.skeleton.update();m.computeBoundingBox();return Math.sign(m.boundingBox!.getCenter(new T.Vector3()).applyMatrix4(m.matrixWorld).x)===sign;});
  const positions=new Map<T.SkinnedMesh,T.Vector3[]>(),bounds=new T.Box3();
  for(const m of selected){const vertices=Array.from({length:m.geometry.attributes.position.count},(_,i)=>body.worldToLocal(m.localToWorld(m.getVertexPosition(i,new T.Vector3()))));positions.set(m,vertices);if(m.name.includes('upper_arm'))vertices.forEach(p=>bounds.expandByPoint(p));}
  const pivot=bounds.getCenter(new T.Vector3());pivot.y=bounds.max.y-.025;
  const group=new T.Group();group.name='Procedural shoulder '+sign;group.position.copy(pivot);body.add(group);groups.push(group);
  const elbow=new T.Group();elbow.position.set(0,bounds.min.y-pivot.y,0);group.add(elbow);group.userData.elbow=elbow;
  for(const m of selected){const geo=m.geometry.clone();geo.setAttribute('position',new T.Float32BufferAttribute(positions.get(m)!.flatMap(p=>p.clone().sub(pivot).toArray()),3));geo.deleteAttribute('skinIndex');geo.deleteAttribute('skinWeight');geo.computeVertexNormals();geo.computeBoundingSphere();const lower=/forearm|bodily_hand/.test(m.name);if(lower)geo.translate(-elbow.position.x,-elbow.position.y,-elbow.position.z);const copy=new T.Mesh(geo,m.material);copy.name=m.name+' swing';copy.castShadow=true;(lower?elbow:group).add(copy);m.visible=false;if(m.name.includes('bodily_hand'))hands.push(copy);}
 }
 return {hands,update(phase:number,weight:number,running:boolean,working:boolean,dt:number){
  groups.forEach((g,i)=>{const swing=-Math.sin(phase*2*Math.PI+i*Math.PI)*weight*(running?.8:.32);
   g.rotation.x=T.MathUtils.lerp(g.rotation.x,working?(i===0?-.65:-.08):swing,1-Math.exp(-dt*16));
   const elbow=g.userData.elbow as T.Group;elbow.rotation.x=T.MathUtils.lerp(elbow.rotation.x,working?-.25:running?-.85:-.08,1-Math.exp(-dt*10));
   g.rotation.z=T.MathUtils.lerp(g.rotation.z,(i===0?1:-1)*(running?.14:.04),1-Math.exp(-dt*10));
  });
 }};
}
