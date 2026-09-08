import {validateScene,type RockPlacement} from '../../scene-tools/schema';
import {registerRockAuthoring} from './rock-authoring';
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {enclosedPlacements} from './rock-enclosure';
import {rockGrowthControls} from './rock-growth-controls';
import {bareRock,loadRockGrowth} from './rock-growth';
import footprints from './assets/rock-study-08/footprints';
import {toCreasedNormals} from 'three/addons/utils/BufferGeometryUtils.js';

/** Approved formations, available in the ordinary prototype and its Appearance panel. */
export function mountRockStudy(scene:T.Scene,obstacles:{x:number;z:number;r:number}[],touchPoints:T.Vector3[]){
 const originals=scene.children.filter(o=>typeof o.userData.rockSeed==='number');
 const props=scene.children.filter(o=>o.userData.formation?.kind==='mushroom'||o.userData.rockSeed>=100&&o.userData.rockSeed<200);
 for(const o of props)if(o.userData.rockSeed!==undefined){o.userData.formation={id:'stone-'+(o.userData.rockSeed-100),kind:'fragment'};o.name='Loose stone '+(o.userData.rockSeed-99);o.userData.contact=new T.Vector3(0,1,0);}
 const defaults=new Map(props.map(o=>[o,{position:o.position.clone(),scale:o.scale.clone(),yaw:o.rotation.y}]));
 const oldObstacles=[...obstacles],oldTouches=[...touchPoints];
 const staticTouches=oldTouches.filter(p=>![...originals,...props].some(o=>Math.hypot(p.x-o.position.x,p.z-o.position.z)<.01));
 const gateObstacles=oldObstacles.filter(o=>o.z===-7.5);
 const panel=document.getElementById('settings')!;
 function select(id:string,title:string,options:[string,string][]){
  const label=document.createElement('label');label.textContent=title;
  const input=document.createElement('select');input.id=id;
  options.forEach(([value,text])=>input.add(new Option(text,value)));label.append(input);panel.append(label);return input;
 }
 const arrangement=select('rockLayout','Rocks',[['full','Approved formations'],['enclosed','More enclosing · comparison'],['banks','Two-bank comparison'],['single','One group'],['original','Original rocks']]);
 const requestedLayout=new URLSearchParams(location.search).get('rockLayout');
 if(requestedLayout&&[...arrangement.options].some(o=>o.value===requestedLayout))arrangement.value=requestedLayout;
 const shading=select('rockShading','Rock shading',[['cel','Cel bands'],['edges','Crisper planes'],['soft','Soft']]);
 const growth=select('rockGrowth','Moss & lichen',[['raster','Generated patches'],['simple','Simple painted patches'],['bare','Bare stone']]);
 const growthControls=rockGrowthControls(panel);
 const status=document.createElement('small');status.id='rockLoad';status.style.cssText='display:block;margin:8px 0';status.setAttribute('role','status');panel.append(status);
 const retry=document.createElement('button');retry.id='rockRetry';retry.textContent='Retry loading rocks';retry.hidden=true;panel.append(retry);
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
  arrangement.disabled=shading.disabled=growth.disabled=true;retry.hidden=true;status.textContent='Loading rock formations…';
  let stage='loading';
  try{
  const [crest,bed,fragment]=await Promise.all(sources.map(loadAsset));stage='preparing';
  // Texture failure must never prevent the approved rock geometry from loading.
  const decals=await loadRockGrowth().catch(error=>{console.warn('Growth atlas unavailable',error);return null;});
  if(!decals){growth.value='simple';growth.options[0].disabled=true;}
  const single=new T.Group(),banks=new T.Group(),completion=new T.Group(),enclosing=new T.Group();enclosing.name='Enclosing banks comparison';single.name='Single rock comparison';banks.name='Connected outcrop composition';
  const meshes:{mesh:T.Mesh;soft:T.Material;edges:T.Material;cel:T.Material;geometry:T.BufferGeometry;creased:T.BufferGeometry;bare:T.BufferGeometry;bareCreased:T.BufferGeometry}[]=[];
  // Shared geometry/material variants: placements reuse the atlas and GPU resources.
  const variants=new Map<T.Mesh,typeof meshes[number]>();
  for(const source of [crest.scene,bed.scene,fragment.scene])source.traverse(o=>{
   if(!(o instanceof T.Mesh))return;
   const soft=(o.material as T.MeshStandardMaterial).clone();soft.normalScale.setScalar(.65);
   const edges=soft.clone();edges.normalScale.setScalar(.22);
   const cel=new T.MeshToonMaterial({map:soft.map,gradientMap:gradient,color:soft.color,vertexColors:true});
   const bare=bareRock(o.geometry);
   variants.set(o,{mesh:o,soft,edges,cel,geometry:o.geometry,creased:toCreasedNormals(o.geometry.clone(),Math.PI/8),bare,bareCreased:toCreasedNormals(bare.clone(),Math.PI/8)});
  });
  const formations:T.Group[]=[],copies=new Map<string,T.Group>();
  const copiedScenery=new T.Group();copiedScenery.name='Authored scenery copies';scene.add(copiedScenery);
  const colliders:{x:number;z:number;r:number}[]=[],newTouches:T.Vector3[]=[],enclosingColliders:typeof colliders=[],enclosingTouches:T.Vector3[]=[];
  function place(parent:T.Group,source:T.Group,x:number,z:number,y:number,sx:number,sy:number,sz:number,angle:number){
   const g=new T.Group();g.position.set(x,y,z);g.scale.set(sx,sy,sz);g.rotation.y=angle;parent.add(g);
   g.userData.formation={id:'rock-'+formations.length,kind:source===crest.scene?'basalt-group':'bedrock'};g.name=(source===crest.scene?'Basalt crest ':'Low bedrock ')+(formations.length+1);formations.push(g);
   source.traverse(o=>{if(!(o instanceof T.Mesh))return;const v=variants.get(o)!;const m=new T.Mesh(v.geometry,v.soft);m.position.copy(o.position);m.quaternion.copy(o.quaternion);m.scale.copy(o.scale);m.castShadow=true;m.receiveShadow=true;g.add(m);meshes.push({...v,mesh:m});});
   if(parent!==single){
    const targets=parent===enclosing?enclosingColliders:colliders,contacts=parent===enclosing?enclosingTouches:newTouches;
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
      centre.applyMatrix4(g.matrixWorld);targets.push({x:centre.x,z:centre.z,r});
     }
     const centre=min.clone().lerp(max,.5).applyMatrix4(g.matrixWorld);
     const ray=new T.Raycaster(new T.Vector3(centre.x,12,centre.z),new T.Vector3(0,-1,0));
     const hit=ray.intersectObject(g,true)[0];if(hit)contacts.push(hit.point.clone().add(new T.Vector3(0,.025,0)));
    }
   }
   decals?.add(g,source===crest.scene);
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
  // Optional composition using the same approved geometry: taller, closer side
  // banks and broader outboard beds. Move the rear crest to the northwest shoulder
  // and leave the v6 painting's junction / both outgoing trails uncovered.
  for(const [kind,...transform] of enclosedPlacements)place(enclosing,kind==='basalt-group'?crest.scene:bed.scene,...transform);
  const fragmentSource=fragment.scene.children.find(o=>o instanceof T.Mesh) as T.Mesh;
  const f=variants.get(fragmentSource)!;
  const unit=f.geometry.clone();unit.computeBoundingBox();const size=unit.boundingBox!.getSize(new T.Vector3());unit.center();unit.scale(1/size.x,1/size.y,1/size.z);
  const replacements=originals.filter(o=>o.userData.rockSeed>=100).map(o=>{
   const root=o as T.Mesh,children=[...o.children],material=root.material,casts=root.castShadow;
   const clear=new T.MeshBasicMaterial({visible:false});
   const mesh=new T.Mesh(unit,f.cel);mesh.castShadow=mesh.receiveShadow=true;o.add(mesh);mesh.visible=false;
   const bare=bareRock(unit);
   meshes.push({...f,mesh,geometry:unit,creased:toCreasedNormals(unit.clone(),Math.PI/8),bare,bareCreased:toCreasedNormals(bare.clone(),Math.PI/8)});
   return {root,children,material,casts,clear,mesh};
  });
  const bankSeeds=new Set([9,10,11,12,13,16,17,18]);
  function update(){
   const enclosed=arrangement.value==='enclosed',full=arrangement.value==='full'||enclosed;
   copiedScenery.visible=full;
   single.visible=arrangement.value==='single';banks.visible=arrangement.value==='full'||arrangement.value==='banks';completion.visible=arrangement.value==='full';enclosing.visible=enclosed;
   originals.forEach(o=>o.visible=full?o.userData.rockSeed>=100:arrangement.value==='original'||!(arrangement.value==='single'?new Set([11,12]):bankSeeds).has(o.userData.rockSeed));
   for(const o of [...formations,...props])if(o.userData.formation)o.visible=!o.userData.formation.deleted;
   replacements.forEach(v=>{v.root.material=full?v.clear:v.material;v.root.castShadow=full?false:v.casts;v.children.forEach(c=>c.visible=!full);v.mesh.visible=full;});
   obstacles.splice(0,obstacles.length,...(full?[...(enclosed?enclosingColliders:colliders),...gateObstacles]:oldObstacles));
   const otherTouches=[...staticTouches,...allProps().map(o=>{o.updateWorldMatrix(true,false);return o.userData.contact.clone().applyMatrix4(o.matrixWorld) as T.Vector3;})];
   touchPoints.splice(0,touchPoints.length,...(full?[...otherTouches,...(enclosed?enclosingTouches:newTouches)]:oldTouches));
   document.dispatchEvent(new CustomEvent('grow-rock-touch-points',{detail:touchPoints}));
   growthControls.setVisible(growth.value==='raster');
   decals?.configure(growthControls.settings);
   decals?.setVisible(growth.value==='raster');
   meshes.forEach(v=>{v.mesh.material=shading.value==='cel'?v.cel:shading.value==='edges'?v.edges:v.soft;v.mesh.geometry=growth.value==='simple'?(shading.value==='soft'?v.geometry:v.creased):(shading.value==='soft'?v.bare:v.bareCreased);});
   refreshFormations(false);
   status.dataset.ready='true';status.dataset.layout=arrangement.value;status.dataset.shading=shading.value;status.dataset.growth=growth.value;status.dataset.patches=String(decals?.count??0);status.dataset.patchCounts=JSON.stringify(decals?.counts??{moss:0,lichen:0});status.dataset.patchSettings=JSON.stringify(growthControls.settings);
  }
  scene.add(single,banks,completion,enclosing);arrangement.onchange=shading.onchange=growth.onchange=update;
  growthControls.onChange=()=>{decals?.configure(growthControls.settings);status.dataset.patches=String(decals?.count??0);status.dataset.patchCounts=JSON.stringify(decals?.counts??{moss:0,lichen:0});status.dataset.patchSettings=JSON.stringify(growthControls.settings);};
  const layoutBases=()=>formations.filter(g=>g.parent?.visible);
  const baseActive=()=>layoutBases().filter(g=>g.visible);
  const active=()=>[...baseActive(),...[...copies.values()].filter(g=>['basalt-group','bedrock'].includes(g.userData.formation.kind)&&copiedScenery.visible)];
  const allProps=()=>[...props.filter(g=>g.visible),...[...copies.values()].filter(g=>['fragment','mushroom'].includes(g.userData.formation.kind)&&copiedScenery.visible)];
  function refreshFormations(refreshGrowth=true){
   const full=['full','enclosed'].includes(arrangement.value);if(!full)return;
   const targets:{x:number;z:number;r:number}[]=[],contacts:T.Vector3[]=[];
   for(const g of active()){
    g.updateWorldMatrix(true,true);
    for(const box of footprints[g.userData.formation.kind as 'basalt-group'|'bedrock'].bounds){
     const min=new T.Vector3(...box.min as [number,number,number]),max=new T.Vector3(...box.max as [number,number,number]);
     if(max.y*g.scale.y+g.position.y<.5)continue;
     const dx=(max.x-min.x)*g.scale.x,dz=(max.z-min.z)*g.scale.z,r=Math.max(.22,Math.min(1.25,Math.min(dx,dz)*.49)),count=Math.max(1,Math.ceil(Math.max(dx,dz)/(r*1.5)));
     for(let i=0;i<count;i++){const p=min.clone().lerp(max,.5);if(dx>dz)p.x=T.MathUtils.lerp(min.x,max.x,(i+.5)/count);else p.z=T.MathUtils.lerp(min.z,max.z,(i+.5)/count);p.applyMatrix4(g.matrixWorld);targets.push({x:p.x,z:p.z,r});}
     const p=min.clone().lerp(max,.5).applyMatrix4(g.matrixWorld),ray=new T.Raycaster(new T.Vector3(p.x,40,p.z),new T.Vector3(0,-1,0));
     const hit=ray.intersectObjects(g.children.filter(o=>o instanceof T.Mesh&&!o.name.includes('surface patch')),false)[0];if(hit)contacts.push(hit.point.clone().add(new T.Vector3(0,.025,0)));
    }
   }
   obstacles.splice(0,obstacles.length,...targets,...gateObstacles);
   const otherTouches=[...staticTouches,...allProps().map(o=>{o.updateWorldMatrix(true,false);return o.userData.contact.clone().applyMatrix4(o.matrixWorld) as T.Vector3;})];
   touchPoints.splice(0,touchPoints.length,...otherTouches,...contacts);
   document.dispatchEvent(new CustomEvent('grow-rock-touch-points',{detail:touchPoints}));if(refreshGrowth){decals?.refresh();status.dataset.patches=String(decals?.count??0);status.dataset.patchCounts=JSON.stringify(decals?.counts??{moss:0,lichen:0});}
  }
  growthControls.setEnabled(!!decals);update();
  const editable=()=>[...baseActive(),...props.filter(o=>o.visible),...[...copies.values()].filter(()=>copiedScenery.visible)];
  const baseObjects=new Map([...formations,...props].map(o=>[o.userData.formation.id,o]));
  function capture():RockPlacement[]{return [...layoutBases(),...props,...formations.filter(g=>!g.parent?.visible&&g.userData.formation.deleted),...copies.values()].map(g=>({...g.userData.formation,position:g.position.toArray() as [number,number,number],scale:g.scale.toArray() as [number,number,number],yaw:g.rotation.y}));}
  function transform(g:T.Object3D,r:RockPlacement){g.position.fromArray(r.position);g.scale.fromArray(r.scale);g.rotation.set(0,r.yaw,0);}
  function createCopy(r:RockPlacement){
   const source=baseObjects.get(r.source!)!,g=new T.Group();g.name=source.name+' · copy '+r.id.slice(5,9);g.userData.formation={id:r.id,kind:r.kind,source:r.source};
   // Construct from the original asset's solid meshes, excluding disposable growth decals
   // and obsolete hidden stone geometry. Copies share the same shading variants.
   for(const child of source.children){
    if(!(child instanceof T.Mesh)||child.name.includes('surface patch')||!child.visible)continue;
    const v=meshes.find(v=>v.mesh===child),m=child.clone(false);g.add(m);if(v)meshes.push({...v,mesh:m});
   }
   if(source.userData.contact)g.userData.contact=(source.userData.contact as T.Vector3).clone();
   transform(g,r);copiedScenery.add(g);copies.set(r.id,g);
   if(['basalt-group','bedrock'].includes(r.kind))decals?.add(g,r.kind==='basalt-group',source as T.Group);
   return g;
  }
  function removeCopy(g:T.Group){
   decals?.remove(g);const members=new Set(g.children);
   for(let i=meshes.length-1;i>=0;i--)if(members.has(meshes[i].mesh))meshes.splice(i,1);
   g.removeFromParent();copies.delete(g.userData.formation.id);
   // Solid geometry/materials are shared with the asset kit; only decal geometry is owned.
  }
  function validateLayout(rocks:RockPlacement[]){
   validateScene({schema:1,sceneId:'validation',title:'Scenery',controls:{rockLayout:arrangement.value},rocks});
   if(layoutBases().some(g=>!rocks.some(r=>r.id===g.userData.formation.id))||rocks.some(r=>{
    const source=baseObjects.get(r.source??r.id);return !source||source.userData.formation.kind!==r.kind||!r.source&&!r.deleted&&!layoutBases().includes(source as T.Group)&&!props.includes(source);
   }))throw new Error('This version uses a different scenery asset layout');
  }
  registerRockAuthoring({list:editable,capture,
   apply(rocks){
    validateLayout(rocks);
    for(const g of copies.values())if(!rocks.some(r=>r.id===g.userData.formation.id&&r.source===g.userData.formation.source))removeCopy(g);
    for(const o of baseObjects.values())delete o.userData.formation.deleted;
    // Older formation-only saves restore loose props to their authored positions.
    for(const o of props){const d=defaults.get(o)!;o.position.copy(d.position);o.scale.copy(d.scale);o.rotation.set(0,d.yaw,0);}
    for(const r of rocks){const g=r.source?(copies.get(r.id)??createCopy(r)):baseObjects.get(r.id)!;transform(g,r);if(r.deleted)g.userData.formation.deleted=true;}update();refreshFormations();
   },
   paste(placement){
    const r={...placement,id:'copy-'+crypto.randomUUID(),source:placement.source??placement.id};delete r.deleted;
    validateLayout([...capture(),r]);const g=createCopy(r);update();refreshFormations();return g;
   },
   remove(id){
    const g=editable().find(g=>g.userData.formation.id===id);if(!g)throw new Error('Select editable scenery first');
    if(copies.has(id))removeCopy(g as T.Group);else g.userData.formation.deleted=true;
    update();refreshFormations();
   },refresh:refreshFormations});

  arrangement.disabled=shading.disabled=growth.disabled=false;status.textContent=decals?'Rock formations ready':'Rock formations ready · texture unavailable; simple patches retained';
  }catch(error){
   const detail=error instanceof Error?error.message:String(error);
   status.textContent=`Rock ${stage} failed: ${detail}`;retry.hidden=false;
   console.error('Rock formation study',stage,error);
  }
 }
 retry.onclick=()=>void loadStudy();void loadStudy();
}
