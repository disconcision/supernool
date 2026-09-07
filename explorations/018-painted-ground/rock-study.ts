import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import footprints from './assets/rock-study-08/footprints';
import {toCreasedNormals} from 'three/addons/utils/BufferGeometryUtils.js';

/** Local composition/shading trial, explicitly enabled by the review URL. */
export function mountRockStudy(scene:T.Scene,obstacles:{x:number;z:number;r:number}[],touchPoints:T.Vector3[]){
 if(!new URLSearchParams(location.search).has('rockStudy'))return;
 const originals=scene.children.filter(o=>typeof o.userData.rockSeed==='number');
 const oldObstacles=[...obstacles],oldTouches=[...touchPoints];
 const gateObstacles=oldObstacles.filter(o=>o.z===-7.5);
 const panel=document.createElement('div');
 panel.style.cssText='position:fixed;right:16px;top:16px;z-index:300;font:13px system-ui;background:#e5e9da;color:#29382d;border:1px solid #87987a;border-radius:7px;padding:12px 14px;box-shadow:0 2px 12px #0002;width:225px';
 panel.innerHTML='<strong>Rock formations · study 08</strong><div id="rockLoad" style="margin:6px 0">Loading textures…</div>';
 function select(title:string,options:[string,string][]){
  const label=document.createElement('label');label.textContent=title;label.style.cssText='display:block;margin-top:9px';
  const input=document.createElement('select');input.style.cssText='display:block;width:100%;margin-top:4px;padding:5px;font:inherit;background:#f5f6ed;color:#29382d;border:1px solid #a9b39e;border-radius:3px';
  options.forEach(([value,text])=>input.add(new Option(text,value)));label.append(input);panel.append(label);return input;
 }
 const arrangement=select('Formation',[['full','Full boundary'],['banks','Two-bank comparison'],['single','One group'],['original','Original rocks']]);
 const shading=select('Rock shading',[['cel','Cel bands'],['edges','Crisper planes'],['soft','Soft textured']]);
 const shadow=select('Ground shadows',[['on','On'],['off','Off']]);
 shadow.onchange=()=>{const input=document.getElementById('groundShadows') as HTMLSelectElement;input.value=shadow.value;input.dispatchEvent(new Event('change'));};
 const link=document.createElement('a');link.href='http://127.0.0.1:3148/rock-reference-08/';link.textContent='Close-up & notes →';link.style.cssText='display:block;margin-top:10px;color:#315d44';panel.append(link);document.body.append(panel);
 const retry=document.createElement('button');retry.textContent='Retry loading rocks';retry.hidden=true;retry.style.cssText='margin-top:9px;padding:6px;font:inherit';panel.append(retry);
 const status=panel.querySelector('#rockLoad') as HTMLElement;status.setAttribute('role','status');
 const loader=new GLTFLoader(),gradient=new T.DataTexture(new Uint8Array([65,140,215,255]),4,1,T.RedFormat);gradient.minFilter=gradient.magFilter=T.NearestFilter;gradient.needsUpdate=true;
 const sources=[new URL('./assets/rock-study-08/basalt-group.glb',import.meta.url).href,new URL('./assets/rock-study-08/bedrock.glb',import.meta.url).href,new URL('./assets/rock-study-08/fragment.glb',import.meta.url).href];
 // Development reloads can arrive while assets are being copied. Validate the
 // complete binary and retry a failed fetch/decode instead of stranding the UI.
 async function loadAsset(url:string){
  for(let attempt=0;;attempt++){
   try{
    const response=await fetch(url,{cache:'no-store'});
    if(!response.ok)throw new Error(`${url.split('/').pop()}: HTTP ${response.status}`);
    const data=await response.arrayBuffer(),header=new DataView(data);
    if(data.byteLength<12||header.getUint32(0,true)!==0x46546c67||header.getUint32(8,true)!==data.byteLength)throw new Error('Incomplete rock download');
    return await loader.parseAsync(data,new URL('.',url).href);
   }catch(error){if(attempt>=1)throw error;await new Promise(resolve=>setTimeout(resolve,350));}
  }
 }
 async function loadStudy(){
  arrangement.disabled=shading.disabled=true;retry.hidden=true;status.textContent='Loading rock formations…';
  let stage='loading';
  try{
  const [crest,bed,fragment]=await Promise.all(sources.map(loadAsset));stage='preparing';
  const single=new T.Group(),banks=new T.Group(),completion=new T.Group();single.name='Single rock comparison';banks.name='Connected outcrop composition';
  const meshes:{mesh:T.Mesh;soft:T.Material;edges:T.Material;cel:T.Material;geometry:T.BufferGeometry;creased:T.BufferGeometry}[]=[];
  // Shared geometry/material variants: placements reuse the atlas and GPU resources.
  const variants=new Map<T.Mesh,typeof meshes[number]>();
  for(const source of [crest.scene,bed.scene,fragment.scene])source.traverse(o=>{
   if(!(o instanceof T.Mesh))return;
   const soft=(o.material as T.MeshStandardMaterial).clone();soft.normalScale.setScalar(.65);
   const edges=soft.clone();edges.normalScale.setScalar(.22);
   const cel=new T.MeshToonMaterial({map:soft.map,gradientMap:gradient,color:soft.color,vertexColors:true});
   variants.set(o,{mesh:o,soft,edges,cel,geometry:o.geometry,creased:toCreasedNormals(o.geometry.clone(),Math.PI/8)});
  });
  const colliders:{x:number;z:number;r:number}[]=[],newTouches:T.Vector3[]=[];
  function place(parent:T.Group,source:T.Group,x:number,z:number,y:number,sx:number,sy:number,sz:number,angle:number){
   const g=new T.Group();g.position.set(x,y,z);g.scale.set(sx,sy,sz);g.rotation.y=angle;parent.add(g);
   source.traverse(o=>{if(!(o instanceof T.Mesh))return;const v=variants.get(o)!;const m=new T.Mesh(v.geometry,v.soft);m.position.copy(o.position);m.quaternion.copy(o.quaternion);m.scale.copy(o.scale);m.castShadow=true;m.receiveShadow=true;g.add(m);meshes.push({...v,mesh:m});});
   if(parent!==single){
    g.updateMatrixWorld(true);
    const bounds=source===crest.scene?footprints['basalt-group'].bounds:footprints.bedrock.bounds;
    for(const box of bounds){
     const min=new T.Vector3(...box.min as [number,number,number]),max=new T.Vector3(...box.max as [number,number,number]);
     if(max.y*sy+y<.50)continue;
     const dx=(max.x-min.x)*sx,dz=(max.z-min.z)*sz,longX=dx>dz;
     const short=Math.min(dx,dz),long=Math.max(dx,dz),r=Math.max(.22,Math.min(1.25,short*.49));
     const count=Math.max(1,Math.ceil(long/(r*1.5)));
     for(let i=0;i<count;i++){
      const centre=min.clone().lerp(max,.5),u=(i+.5)/count;
      if(longX)centre.x=T.MathUtils.lerp(min.x,max.x,u);else centre.z=T.MathUtils.lerp(min.z,max.z,u);
      centre.applyMatrix4(g.matrixWorld);colliders.push({x:centre.x,z:centre.z,r});
     }
     const centre=min.clone().lerp(max,.5).applyMatrix4(g.matrixWorld);
     const ray=new T.Raycaster(new T.Vector3(centre.x,12,centre.z),new T.Vector3(0,-1,0));
     const hit=ray.intersectObject(g,true)[0];if(hit)newTouches.push(hit.point.clone().add(new T.Vector3(0,.025,0)));
    }
   }
   return g;
  }
  place(single,crest.scene,-11.65,-.05,-.12,1,1,1,Math.PI/2);
  // West bank: one taller remnant, beds continuing along its joint direction,
  // and broader low stone outside the grove, with exposed grass between ledges.
  place(banks,crest.scene,-12.1,-2.0,-.18,1.32,1.30,1.18,1.40);
  place(banks,bed.scene,-11.8,2.0,-.14,1.8,1.20,1.32,1.43);
  place(banks,bed.scene,-11.9,5.5,-.17,1.40,.84,1.48,1.39);
  place(banks,bed.scene,-15.0,1.5,-.12,1.8,.78,1.48,1.40);
  // Rear bank: wider than an individual ring stone, feathering into low beds.
  place(banks,crest.scene,-1.0,-12.4,-.15,1.75,1.34,1.25,-.12);
  place(banks,bed.scene,-1.4,-10.6,-.17,1.9,.82,1.42,-.08);
  // Complete the existing boundary with the same family; keep all three openings.
  place(completion,crest.scene,12.0,-2.7,-.24,1.25,1.12,1.28,-1.37);
  place(completion,bed.scene,12.1,1.6,-.18,1.65,1.05,1.36,-1.35);
  place(completion,bed.scene,13.0,5.0,-.23,1.55,.70,1.45,-1.29);
  place(completion,bed.scene,8.0,10.0,-.18,1.88,.77,1.62,-.56);
  place(completion,bed.scene,-7.0,10.3,-.17,1.95,.78,1.52,.46);
  const fragmentSource=fragment.scene.children.find(o=>o instanceof T.Mesh) as T.Mesh;
  const f=variants.get(fragmentSource)!;
  const unit=f.geometry.clone();unit.computeBoundingBox();const size=unit.boundingBox!.getSize(new T.Vector3());unit.center();unit.scale(1/size.x,1/size.y,1/size.z);
  const replacements=originals.filter(o=>o.userData.rockSeed>=100).map(o=>{
   const root=o as T.Mesh,children=[...o.children],material=root.material,casts=root.castShadow;
   const clear=new T.MeshBasicMaterial({visible:false});
   const mesh=new T.Mesh(unit,f.cel);mesh.castShadow=mesh.receiveShadow=true;o.add(mesh);mesh.visible=false;
   meshes.push({...f,mesh,geometry:unit,creased:toCreasedNormals(unit.clone(),Math.PI/8)});
   return {root,children,material,casts,clear,mesh};
  });
  const bankSeeds=new Set([9,10,11,12,13,16,17,18]);
  function update(){
   const full=arrangement.value==='full';
   single.visible=arrangement.value==='single';banks.visible=full||arrangement.value==='banks';completion.visible=full;
   originals.forEach(o=>o.visible=full?o.userData.rockSeed>=100:arrangement.value==='original'||!(arrangement.value==='single'?new Set([11,12]):bankSeeds).has(o.userData.rockSeed));
   replacements.forEach(v=>{v.root.material=full?v.clear:v.material;v.root.castShadow=full?false:v.casts;v.children.forEach(c=>c.visible=!full);v.mesh.visible=full;});
   obstacles.splice(0,obstacles.length,...(full?[...colliders,...gateObstacles]:oldObstacles));
   const otherTouches=oldTouches.filter(p=>!originals.some(o=>Math.hypot(p.x-o.position.x,p.z-o.position.z)<.01));
   touchPoints.splice(0,touchPoints.length,...(full?[...otherTouches,...newTouches]:oldTouches));
   document.dispatchEvent(new CustomEvent('grow-rock-touch-points',{detail:touchPoints}));
   meshes.forEach(v=>{v.mesh.material=shading.value==='cel'?v.cel:shading.value==='edges'?v.edges:v.soft;v.mesh.geometry=shading.value==='soft'?v.geometry:v.creased;});
  }
  scene.add(single,banks,completion);arrangement.onchange=shading.onchange=update;update();
  arrangement.disabled=shading.disabled=false;status.textContent='Ready · quiet surfaces, placed moss';
  }catch(error){
   const detail=error instanceof Error?error.message:String(error);
   status.textContent=`Rock ${stage} failed: ${detail}`;retry.hidden=false;
   console.error('Rock formation study',stage,error);
  }
 }
 retry.onclick=()=>void loadStudy();void loadStudy();
}
