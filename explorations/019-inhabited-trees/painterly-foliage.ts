import * as T from 'three';
import {material,rng,Settings} from './canopy';
export type PaintSettings=Settings&{normalSharing:number;shadeDepth:number;brushScale:number};
const maps=new Map<string,T.CanvasTexture>();
// Overlapping irregular brush marks: no outline or repeating split down each leaf.
function brushTexture(seed:number,scale:number){const key=seed+':'+scale;if(maps.has(key))return maps.get(key)!;
 const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d')!,r=rng(seed+971);
 for(let i=0;i<55;i++){const a=r()*Math.PI*2,rad=Math.sqrt(r()),px=256+Math.cos(a)*rad*179,py=256+Math.sin(a)*rad*172,len=(55+r()*44)*scale,w=len*(.65+r()*.55),g=.79+r()*.2;
 x.save();x.translate(px,py);x.rotate(r()*6.28);x.fillStyle=`rgb(${g*251},${g*255},${g*243})`;x.beginPath();for(let j=0;j<8;j++){const t=j*Math.PI/4,f=.74+r()*.3,xx=Math.cos(t)*len*.65*f,yy=Math.sin(t)*w*.48*f;j?x.lineTo(xx,yy):x.moveTo(xx,yy);}x.closePath();x.fill();
 for(let j=0;j<1;j++){x.fillStyle=`rgba(${r()>.5?'255,255,244':'82,91,74'},.025)`;x.fillRect((r()-.5)*len*.7,(r()-.5)*w*.5,len*.45,w*.09);}x.restore();}
 const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;maps.set(key,t);return t;
}
export function paintPatch(mesh:T.InstancedMesh,o:PaintSettings,form:string){
 const m=material(o,brushTexture(o.seed%4,o.brushScale)),original=m.onBeforeCompile;
 const normals=new Float32Array(mesh.count*3),shade=new Float32Array(mesh.count),matrix=new T.Matrix4(),position=new T.Vector3();
 for(let i=0;i<mesh.count;i++){mesh.getMatrixAt(i,matrix);position.setFromMatrixPosition(matrix);const centreY=form==='G3'?-.65:.18;
 const n=new T.Vector3(position.x*.62,(position.y-centreY)*1.2+.5,position.z*.62).normalize();n.toArray(normals,i*3);
 const radial=Math.min(1,Math.hypot(position.x,position.z)/1.45),height=T.MathUtils.clamp((position.y+(form==='G3'?1.8:.5))/(form==='G3'?2.2:1.4),0,1);
 shade[i]=T.MathUtils.clamp(radial*.35+height*.65,0,1);
 // Coherent group colour replaces independently bright/dark individual cards.
 mesh.setColorAt(i,new T.Color('#ffffff'));
 }
 mesh.geometry.setAttribute('canopyNormal',new T.InstancedBufferAttribute(normals,3));mesh.geometry.setAttribute('canopyExposure',new T.InstancedBufferAttribute(shade,1));
 const colours:Record<string,string[]>={upland:['#35493c','#6c7e43','#abb46b'],fresh:['#294b44','#507c4c','#a1b966'],gold:['#544a36','#918248','#c8b778']};const c=colours[o.palette]||colours.upland;m.emissive.set(c[0]);m.emissiveIntensity=.35;
 m.onBeforeCompile=(s,r)=>{original(s,r);s.uniforms.normalSharing={value:o.normalSharing};s.uniforms.shadeDepth={value:o.shadeDepth};s.uniforms.canopyShadow={value:new T.Color(c[0])};s.uniforms.canopyMid={value:new T.Color(c[1])};s.uniforms.canopyLight={value:new T.Color(c[2])};
 s.vertexShader='attribute vec3 canopyNormal;attribute float canopyExposure;uniform float normalSharing;varying float exposure;varying vec3 paintedLocal;\n'+s.vertexShader;
 s.vertexShader=s.vertexShader.replace('#include <defaultnormal_vertex>','#include <defaultnormal_vertex>\ntransformedNormal=mix(transformedNormal,normalMatrix*canopyNormal,normalSharing);');
 s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nexposure=canopyExposure;paintedLocal=(instanceMatrix*vec4(position,1.)).xyz;');
 s.fragmentShader='varying float exposure;varying vec3 paintedLocal;uniform float shadeDepth;uniform vec3 canopyShadow,canopyMid,canopyLight;\n'+s.fragmentShader;
 s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 float dapple=sin(paintedLocal.x*2.1+sin(paintedLocal.z*2.4))*sin(paintedLocal.y*2.7+paintedLocal.z*1.3)*.08;
 float value=clamp(exposure+dapple,0.,1.);
 vec3 pigment=mix(canopyShadow,canopyMid,smoothstep(.05,.62,value));pigment=mix(pigment,canopyLight,smoothstep(.55,1.,value)*.7);
 diffuseColor.rgb*=mix(canopyMid,pigment,shadeDepth);
 `);
 };
 m.customProgramCacheKey=()=> '019-canopy-shared-normals-v1';
 const old=mesh.material;mesh.material=m;if(Array.isArray(old))old.forEach(m=>m.dispose());else old.dispose();mesh.instanceColor!.needsUpdate=true;
}
