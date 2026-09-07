import * as T from 'three';
import {DecalGeometry} from 'three/addons/geometries/DecalGeometry.js';

/** The original broad mineral color, without the old painted growth islands. */
export function bareRock(geometry:T.BufferGeometry){
 const bare=geometry.clone(),p=bare.getAttribute('position'),colors=[];
 for(let i=0;i<p.count;i++){
  // glTF is Y-up; the Blender authoring coordinates were Z-up.
  const shade=1+.055*Math.sin(p.getX(i)*.73-p.getZ(i)*.34+p.getY(i)*1.1);
  colors.push(.086*shade,.10*shade,.105*shade);
 }
 bare.setAttribute('color',new T.Float32BufferAttribute(colors,3));return bare;
}

export type GrowthSettings={placement:'authored'|'scatter'|'clusters';scale:number;amount:number;spread:number;smallBias:number;seed:number;opacity:number;saturation:number;brightness:number;blend:'normal'|'multiply'};
export type GrowthKind='moss'|'lichen';
export type GrowthLayers=Record<GrowthKind,GrowthSettings>;
const shared:GrowthSettings={placement:'scatter',scale:1,amount:1,spread:.5,smallBias:1,seed:0,opacity:.7,saturation:.55,brightness:1,blend:'normal'};
export const growthDefaults:GrowthLayers={
 moss:{...shared,scale:2.3,amount:1.2,smallBias:.6,spread:.65},
 lichen:{...shared,scale:.85,amount:1.2,smallBias:1.2,saturation:.5}
};

export async function loadRockGrowth(){
 const atlas=await new T.TextureLoader().loadAsync(new URL('./assets/growth-decals/growth-atlas-v1.png',import.meta.url).href);
 atlas.colorSpace=T.SRGBColorSpace;atlas.anisotropy=4;
 const moss=createGrowthLayer(atlas,'moss'),lichen=createGrowthLayer(atlas,'lichen');
 return {
  add(group:T.Group,tall:boolean){moss.add(group,tall);lichen.add(group,tall);},
  configure(next:GrowthLayers){moss.configure(next.moss);lichen.configure(next.lichen);},
  setVisible(on:boolean){moss.setVisible(on);lichen.setVisible(on);},
  refresh(){moss.refresh();lichen.refresh();},
  get count(){return moss.count+lichen.count;},
  get counts(){return {moss:moss.count,lichen:lichen.count};}
 };
}
function createGrowthLayer(atlas:T.Texture,kind:GrowthKind){
 const uniforms={growthSaturation:{value:1},growthBrightness:{value:1},growthMultiply:{value:0}};
 const material=new T.MeshStandardMaterial({map:atlas,color:0xb5b6a6,roughness:1,
  transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2});
 // Cut out only the atlas background, independently of the opacity slider.
 // Multiply blends toward neutral white at zero opacity, so it cannot leave dark boxes.
 material.onBeforeCompile=shader=>{
  Object.assign(shader.uniforms,uniforms);
  shader.fragmentShader='uniform float growthSaturation;\nuniform float growthBrightness;\nuniform float growthMultiply;\n'+shader.fragmentShader;
  shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
   if(sampledDiffuseColor.a < .18) discard;
   float grey=dot(diffuseColor.rgb,vec3(.2126,.7152,.0722));
   diffuseColor.rgb=mix(vec3(grey),diffuseColor.rgb,growthSaturation)*growthBrightness;
  `).replace('#include <dithering_fragment>',`#include <dithering_fragment>
   if(growthMultiply>.5) gl_FragColor.rgb=mix(vec3(1.),gl_FragColor.rgb,gl_FragColor.a);
  `);
 };
 material.customProgramCacheKey=()=> 'growth-adjustments-v1';
 const patches:T.Mesh[]=[],formations:{group:T.Group;tall:boolean;surfaces:T.Mesh[]}[]=[];
 const sites=[[-1.05,-.65],[-1.15,.42],[-2.22,.30],[1.38,.12],[.76,-.80]];
 let settings={...growthDefaults[kind]},visible=true,geometryKey='';
 function rebuild(){
  for(const p of patches){p.removeFromParent();p.geometry.dispose();}patches.length=0;
  formations.forEach(({group,tall,surfaces},index)=>{
   group.updateWorldMatrix(true,true);
   // Each formation owns a stable random stream. Changing color/opacity never moves patches.
   let state=(settings.seed*9301+index*49297+233280+(kind==='lichen'?71093:0))>>>0;
   const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
   const choices=tall?[0,3,1,4]:[1,2,3],authored=settings.placement==='authored';
   const count=Math.round((authored?(tall?2:1):(tall?6:4))*settings.amount);
   for(let j=0;j<count;j++){
    // Log-uniform diameters at bias 1: frequency is inversely proportional to diameter.
    // Higher bias makes small flecks more common; lower bias favors large colonies.
    const width=authored?(kind==='lichen'?.72:1.25)*(1+(index%3)*.12)*settings.scale:
     .16*Math.pow(10,Math.pow(random(),settings.smallBias))*settings.scale;
    let hit:T.Intersection<T.Object3D>|undefined;
    for(let attempt=0;attempt<12;attempt++){
     const site=sites[choices[(index+j+settings.seed)%choices.length]];
     let x=site[0],z=site[1];
     if(settings.placement==='scatter'){
      x=-2.55+random()*4.85;z=-1.48+random()*3.1;
     }else{
      const radius=(authored?settings.spread:.12+settings.spread)*Math.sqrt(random()),angle=random()*Math.PI*2;
      x+=Math.cos(angle)*radius;z+=Math.sin(angle)*radius;
     }
     const origin=new T.Vector3(x,8,z).applyMatrix4(group.matrixWorld);
     const probe=new T.Raycaster(origin,new T.Vector3(0,-1,0)).intersectObjects(surfaces,false)[0];
     if(!probe?.face)continue;
     const n=probe.face.normal.clone().applyMatrix3(new T.Matrix3().getNormalMatrix(probe.object.matrixWorld)).normalize();
     if(n.y<.25)continue;
     // Keep colonies apart in scattered mode. Clusters intentionally allow nearby flecks.
     if(settings.placement==='scatter'&&patches.some(p=>p.parent===group&&p.userData.centre.distanceTo(probe.point)<width*(.15+settings.spread*.35)))continue;
     hit=probe;break;
    }
    if(!hit?.face)continue;
    const normal=hit.face.normal.clone().applyMatrix3(new T.Matrix3().getNormalMatrix(hit.object.matrixWorld)).normalize();
    const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),normal);
    q.multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),index*1.73+j*2.1+settings.seed*.63));
    const cell=(kind==='lichen'?3:0)+(authored?(index+j)%3:Math.floor(random()*3));
    const geometry=new DecalGeometry(hit.object as T.Mesh,hit.point,new T.Euler().setFromQuaternion(q),new T.Vector3(width,width*(j===0?1.2:.85),Math.min(.75,.2+width*.2)));
    // A broad patch must not stretch into vertical stripes around a sharp corner.
    const positions=geometry.getAttribute('position'),indices:number[]=[];
    const a=new T.Vector3(),b=new T.Vector3(),c=new T.Vector3();
    for(let i=0;i<positions.count;i+=3){
     a.fromBufferAttribute(positions,i);b.fromBufferAttribute(positions,i+1);c.fromBufferAttribute(positions,i+2);
     if(b.sub(a).cross(c.sub(a)).normalize().dot(normal)>.35)indices.push(i,i+1,i+2);
    }
    if(!indices.length){geometry.dispose();continue;}geometry.setIndex(indices);
    const uv=geometry.getAttribute('uv');
    for(let i=0;i<uv.count;i++)uv.setXY(i,(uv.getX(i)+cell%3)/3,(uv.getY(i)+1-Math.floor(cell/3))/2);
    const patch=new T.Mesh(geometry,material);patch.name=kind+' surface patch';patch.receiveShadow=true;patch.visible=visible;
    patch.userData.centre=hit.point.clone();
    geometry.applyMatrix4(group.matrixWorld.clone().invert());group.add(patch);patches.push(patch);
   }
  });
 }
 return {
  add(group:T.Group,tall:boolean){formations.push({group,tall,surfaces:group.children.filter(o=>o instanceof T.Mesh) as T.Mesh[]});},
  configure(next:GrowthSettings){
   settings={...next};material.opacity=settings.opacity;
   uniforms.growthSaturation.value=settings.saturation;uniforms.growthBrightness.value=settings.brightness;
   uniforms.growthMultiply.value=settings.blend==='multiply'?1:0;
   material.blending=settings.blend==='multiply'?T.CustomBlending:T.NormalBlending;
   material.blendSrc=T.ZeroFactor;material.blendDst=T.SrcColorFactor;
   material.blendSrcAlpha=T.ZeroFactor;material.blendDstAlpha=T.OneFactor;
   const key=JSON.stringify([settings.placement,settings.scale,settings.amount,settings.spread,settings.smallBias,settings.seed]);
   if(key!==geometryKey){geometryKey=key;rebuild();}
  },
  setVisible(on:boolean){visible=on;patches.forEach(p=>p.visible=on);},
  refresh(){rebuild();},
  get count(){return patches.length;}
 };
}
