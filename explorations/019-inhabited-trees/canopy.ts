import * as T from 'three';
import {mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
export type Style='F1'|'F2'|'F3'|'F5'|'F6';
export type Settings={style:Style;seed:number;size:number;density:number;palette:string;normals:boolean;wire:boolean};
export const wind={time:{value:0},strength:{value:.25}};
export function hash(s:string){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0)/4294967296;}
function rng(seed:number){let h=seed>>>0;return ()=>{h=(Math.imul(h,1664525)+1013904223)>>>0;return h/4294967296;};}
const texture=new Map<number,T.CanvasTexture>();
// Code-native cluster texture: a small branch spray containing many painted leaf marks.
// Alpha-tested aggregate patches, not thousands of separate scene objects.
function sprayTexture(seed:number){if(texture.has(seed))return texture.get(seed)!;
 const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d')!,r=rng(seed+37);
 for(let i=0;i<38;i++){const angle=r()*Math.PI*2,rad=Math.sqrt(r()),px=128+Math.cos(angle)*rad*100,py=128+Math.sin(angle)*rad*91;
 const len=24+r()*26,width=16+r()*16,theta=r()*Math.PI*2,g=.74+r()*.24;
 x.save();x.translate(px,py);x.rotate(theta);x.fillStyle=`rgb(${g*255},${g*255},${g*240})`;x.beginPath();x.moveTo(-len*.6,0);x.lineTo(-len*.18,-width*.55);x.lineTo(len*.4,-width*.32);x.lineTo(len*.67,0);x.lineTo(len*.12,width*.51);x.lineTo(-len*.4,width*.32);x.closePath();x.fill();x.fillStyle=`rgba(255,255,225,${.08+r()*.1})`;x.beginPath();x.moveTo(-len*.5,0);x.lineTo(len*.55,0);x.lineTo(0,-width*.4);x.closePath();x.fill();x.restore();
 }
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;texture.set(seed,t);return t;
}
const palette:Record<string,[string,string]>={upland:['#647536','#abb762'],fresh:['#426943','#91b25a'],gold:['#837135','#c6b76a']};
function addWind(m:T.MeshStandardMaterial){m.onBeforeCompile=s=>{if(!m.map){s.vertexShader='varying vec3 leafLocal;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nleafLocal=position;');s.fragmentShader=`varying vec3 leafLocal;
float leafHash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float leafNoise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(leafHash(i),leafHash(i+vec3(1,0,0)),f.x),mix(leafHash(i+vec3(0,1,0)),leafHash(i+vec3(1,1,0)),f.x),f.y),mix(mix(leafHash(i+vec3(0,0,1)),leafHash(i+vec3(1,0,1)),f.x),mix(leafHash(i+vec3(0,1,1)),leafHash(i+vec3(1,1,1)),f.x),f.y),f.z);}
`+s.fragmentShader;s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\nfloat paint=leafNoise(leafLocal*5.)*.7+leafNoise(leafLocal*14.)*.3;diffuseColor.rgb*=.78+.32*smoothstep(.35,.65,paint);');}s.fragmentShader=s.fragmentShader.replace('#include <normal_fragment_begin>', '#include <normal_fragment_begin>\n#ifdef DOUBLE_SIDED\n normal *= faceDirection;\n#endif');s.uniforms.canopyTime=wind.time;s.uniforms.canopyWind=wind.strength;s.vertexShader='uniform float canopyTime; uniform float canopyWind;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
 float phase=position.x*2.3+position.y*1.7;
 #ifdef USE_INSTANCING
 phase+=instanceMatrix[3].x*2.+instanceMatrix[3].z*2.7;
 #endif
 transformed.x+=canopyWind*.035*sin(canopyTime*1.7+phase)*(position.y+1.3);
 transformed.z+=canopyWind*.024*sin(canopyTime*2.1+phase*.7);`);};m.customProgramCacheKey=()=> '019-canopy-wind-v1';}
function material(o:Settings,map?:T.Texture){const m=new T.MeshStandardMaterial({color:'#ffffff',roughness:1,metalness:0,side:T.DoubleSide,map,alphaTest:map ? .48 : 0,alphaToCoverage:!!map,wireframe:o.wire});addWind(m);return m;}
function lobe(detail:number,seed:number,flat:boolean){const g=new T.IcosahedronGeometry(1,detail),p=g.attributes.position,r=rng(seed),colors=[];
 for(let i=0;i<p.count;i++){const v=new T.Vector3().fromBufferAttribute(p,i),f=1+.085*Math.sin(v.x*5+seed)+.05*Math.cos(v.z*7+v.y*4);p.setXYZ(i,v.x*f,v.y*f,v.z*f);const light=.83+.17*(v.y+1)/2;colors.push(light,light,light*.94);}
 g.setAttribute('color',new T.Float32BufferAttribute(colors,3));g.deleteAttribute('normal');const merged=mergeVertices(g);g.dispose();merged.computeVertexNormals();return flat?merged.toNonIndexed():merged;
}
function cardsGeometry(shaped:boolean){const g=new T.PlaneGeometry(1,1,2,2),p=g.attributes.position,n=g.attributes.normal;
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);p.setZ(i,.2*(1-4*x*x-2*y*y));const v=new T.Vector3(x*1.2,y*1.2,shaped?1:8).normalize();n.setXYZ(i,v.x,v.y,v.z);}return g;}
export function makeCluster(id:string,o:Settings){const group=new T.Group(),r=rng(Math.floor(hash(id+o.seed)*4294967295)),base=new T.Color(palette[o.palette][0]),light=new T.Color(palette[o.palette][1]);
 const tint=()=>base.clone().lerp(light,.2+r()*.55);
 if(o.style==='F5'){
 const count=Math.round(30*o.density),geo=cardsGeometry(o.normals),mat=material(o,sprayTexture(o.seed%4));const mesh=new T.InstancedMesh(geo,mat,count),obj=new T.Object3D();
 for(let i=0;i<count;i++){const y=1-2*(i+.5)/count,theta=i*2.399963+r()*.6,v=new T.Vector3(Math.sqrt(1-y*y)*Math.cos(theta),y,Math.sqrt(1-y*y)*Math.sin(theta)),rad=.35+.65*Math.pow(r(),.35);
 obj.position.copy(v).multiply(new T.Vector3(1.2,.78,1.05)).multiplyScalar(rad);obj.position.y+=.2;
 const normal=v.clone().add(new T.Vector3(0,.65,0)).normalize();obj.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal);obj.rotateZ(r()*6.28);obj.scale.setScalar(1.15+r()*.5);obj.updateMatrix();mesh.setMatrixAt(i,obj.matrix);mesh.setColorAt(i,tint());}
 mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;group.add(mesh);
 // A subdued opaque interior gives the foliage body; textured patches break its contour.
 const coreMat=material(o);coreMat.color.copy(base).multiplyScalar(.95);const core=new T.Mesh(lobe(1,Math.floor(r()*1000),false),coreMat);core.scale.set(.92,.65,.82);core.position.y=.2;group.add(core);
 }else{
 const count=o.style==='F2'?3:o.style==='F6'?7:3;
 for(let i=0;i<count;i++){const mat=material(o);mat.color.copy(tint());mat.flatShading=o.style!=='F3';mat.vertexColors=true;
 let geo:T.BufferGeometry=lobe(o.style==='F3'||o.style==='F2'?2:1,Math.floor(r()*1000),false),m=new T.Mesh(geo,mat),a=i*2.4;
 if(o.style==='F1'){mat.vertexColors=false;geo.dispose();geo=new T.DodecahedronGeometry(1,0);m.geometry=geo;m.position.set(Math.cos(a)*.45,.15+(i===2?.38:0),Math.sin(a)*.4);m.scale.set(.88,.7,.86);m.rotation.set(r()*.3,r()*.5,r()*.25);}
 else if(o.style==='F2'){m.position.set(Math.cos(a)*.28,i*.4-.28,Math.sin(a)*.28);m.scale.set(1.3-i*.18,.23,1.05-i*.12);}
 else if(o.style==='F6'){mat.vertexColors=false;geo.dispose();const points=[new T.Vector2(.015,-1.9),new T.Vector2(.14,-1.55),new T.Vector2(.32,-.95),new T.Vector2(.46,-.3),new T.Vector2(.43,.14),new T.Vector2(.29,.43),new T.Vector2(.01,.55)];geo=new T.LatheGeometry(points,12);m.geometry=geo;mat.flatShading=false;m.position.set(Math.cos(a)*(.3+r()*.6),r()*.35,Math.sin(a)*(.3+r()*.6));m.scale.set(.8+r()*.5,.8+r()*.35,.8+r()*.5);m.rotation.z=(r()-.5)*.18;const p=geo.attributes.position;for(let j=0;j<p.count;j++){const y=p.getY(j),angle=Math.atan2(p.getZ(j),p.getX(j)),f=1+.09*Math.sin(angle*5+y*2);p.setX(j,p.getX(j)*f+.12*y*y);p.setZ(j,p.getZ(j)*f);}geo.computeVertexNormals();}
 else{m.position.set(Math.cos(a)*.45,.15+(i===2?.38:0),Math.sin(a)*.4);m.scale.set(.88,.68,.85);}
 group.add(m);}
 // F6 uses leaf-textured skirts to break the otherwise solid silhouette.
 if(o.style==='F6'){const mat=material(o,sprayTexture(o.seed%4)),geo=cardsGeometry(true),mesh=new T.InstancedMesh(geo,mat,35);const obj=new T.Object3D();for(let i=0;i<35;i++){const a=r()*6.28;obj.position.set(Math.cos(a)*.75,-r()*1.4,Math.sin(a)*.75);obj.rotation.set(0,-a+Math.PI/2,(r()-.5)*.4);obj.scale.set(.6,.9,1);obj.updateMatrix();mesh.setMatrixAt(i,obj.matrix);mesh.setColorAt(i,tint());}mesh.frustumCulled=false;group.add(mesh);}
 }
 group.scale.setScalar(o.size);return group;
}
export function disposeGroup(group:T.Object3D){const geos=new Set<T.BufferGeometry>(),mats=new Set<T.Material>();group.traverse(o=>{if(o instanceof T.Mesh){geos.add(o.geometry);(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>mats.add(m));}});geos.forEach(g=>g.dispose());mats.forEach(m=>m.dispose());}
