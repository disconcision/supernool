import * as T from 'three';
import {Pose} from '../018-painted-ground/layout';
import {makeGrowthCluster} from './growth-canopy';
import {disposeGroup,hash} from './canopy';
import {ProjectedLobe} from './storm-lightning';
export type CloudDeparture={matrix:T.Matrix4;rotation:T.Quaternion;scale:number;dissolve:number};
export type PatchOptions={form:string;seed:number;size:number;density:number;fray:number;time:number;drift:number;roil:number;departure?:CloudDeparture};
export const isPatchForm=(form:string)=>['S7','S8','S9'].includes(form);
// Reuse the living G1/G3/G2 constructions, but render coverage into a separate
// maximum-blended buffer. Layer count never silently makes the host opaque.
export function makeShadowPatches(){
 const scene=new T.Scene();scene.background=new T.Color('black');const groups=new Map<string,T.Group>();
 const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:false});
 const u={dissolve:{value:0},clock:{value:0},roil:{value:.8},fray:{value:.55},depth:{value:null as T.Texture|null},resolution:{value:new T.Vector2()}};
 let key='',cards=0,triangles=0;
 function build(p:Pose,o:PatchOptions){
 const ids=p.edges.filter(e=>e.id!=='stem'&&(p.nodes.get(e.id)?.kind!=='op'||hash(e.id+'cloud')>.6)).map(e=>e.id);
 const next=[o.form,o.seed,o.density,ids.join(',')].join(':');if(key===next)return;key=next;
 for(const g of groups.values())disposeGroup(g);groups.clear();scene.clear();cards=triangles=0;
 for(const id of ids){
 const form=o.form==='S8'?'G3':o.form==='S9'?'G2':'G1';
 const g=makeGrowthCluster(id,{form,style:'F5',seed:o.seed,size:1,density:o.density,backing:0,offshoots:0,finish:'painted',normalSharing:.85,shadeDepth:.85,brushScale:1,normals:true,wire:false,palette:'upland'});
 // Keep exactly the living patch layout, but remove ordinary wood and solid backing.
 for(const obj of [...g.children])if(!(obj instanceof T.InstancedMesh)){g.remove(obj);disposeGroup(obj);}
 for(const obj of g.children){if(!(obj instanceof T.InstancedMesh))continue;const old=obj.material as T.MeshStandardMaterial,map=old.map;old.dispose();
 if(o.form==='S9'){
 const matrix=new T.Matrix4(),position=new T.Vector3(),rotation=new T.Quaternion(),scale=new T.Vector3();
 for(let i=0;i<obj.count;i++){obj.getMatrixAt(i,matrix);matrix.decompose(position,rotation,scale);
 const radial=new T.Vector3(position.x,.15,position.z).normalize(),upright=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,0,1),radial);
 rotation.slerp(upright,.7);scale.y*=1.25;position.y+=.28;matrix.compose(position,rotation,scale);obj.setMatrixAt(i,matrix);}obj.instanceMatrix.needsUpdate=true;
 }
 obj.material=new T.ShaderMaterial({uniforms:{...u,brush:{value:map},kind:{value:o.form==='S8'?1:o.form==='S9'?2:0}},side:T.DoubleSide,transparent:true,depthTest:false,depthWrite:false,toneMapped:false,blending:T.CustomBlending,blendEquation:T.MaxEquation,blendSrc:T.OneFactor,blendDst:T.OneFactor,vertexShader:`
 uniform float clock,roil;varying vec2 vUv;varying vec3 patchLocal;
 void main(){vUv=uv;vec3 q=(instanceMatrix*vec4(position,1.)).xyz;patchLocal=q;
 float phase=instanceMatrix[3].x*2.7+instanceMatrix[3].z*3.1;
 q.x+=sin(clock*.65+q.y*2.+phase)*.13*roil;
 q.z+=cos(clock*.48+q.x*1.8+phase)*.11*roil;
 q.y+=sin(clock*.54+phase)*.065*roil;
 gl_Position=projectionMatrix*modelViewMatrix*vec4(q,1.);}`,fragmentShader:`
 varying vec2 vUv;varying vec3 patchLocal;uniform sampler2D brush,depth;uniform vec2 resolution;uniform float clock,fray,kind,dissolve;
 float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float n(vec2 p){vec2 a=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(a),h(a+vec2(1,0)),f.x),mix(h(a+vec2(0,1)),h(a+vec2(1)),f.x),f.y);}
 float fbm(vec2 p){return n(p)*.57+n(p*2.07)*.28+n(p*4.13)*.15;}
 void main(){if(gl_FragCoord.z>texture2D(depth,gl_FragCoord.xy/resolution).r+.00002)discard;
 vec2 uv=vUv;vec2 p=uv*5.+patchLocal.xz*.6;
 vec2 warp=vec2(fbm(p+vec2(0.,clock*.09)),fbm(p+vec2(clock*.07,17.)))-.5;
 p+=warp*(1.2+fray*2.);float grain=fbm(p);
 uv+=warp*.065*fray;float paint=texture2D(brush,uv).a;
 float border=1.-smoothstep(.64,1.,length((vUv-.5)*2.));
 float coverage;
 if(kind<.5){coverage=paint*mix(1.,smoothstep(.22,.62,grain),fray*.75);}
 else if(kind<1.5){float phase=p.x*5.+fbm(p*1.6)*6.;float fibre=pow(.5+.5*sin(phase),3.);fibre=mix(fibre,.3125,smoothstep(.8,3.,fwidth(phase)));
 coverage=border*mix(smoothstep(.26,.61,grain),max(fibre,smoothstep(.32,.65,grain)*.65),.4+fray*.4);}
 else{coverage=border*smoothstep(.22+fray*.14,.65,grain);}
 if(dissolve>0.)coverage*=1.-smoothstep(grain-.12,grain+.12,mix(-.15,1.15,dissolve));
 if(coverage<.002)discard;
 gl_FragColor=vec4(coverage,coverage*(.5+.5*grain),0.,1.);
 }`});cards+=obj.count;triangles+=obj.count*(obj.geometry.index?.count??obj.geometry.attributes.position.count)/3;
 }
 groups.set(id,g);scene.add(g);
 }
 }
 function render(renderer:T.WebGLRenderer,camera:T.OrthographicCamera,depth:T.Texture,p:Pose,o:PatchOptions){
 build(p,o);const size=renderer.getDrawingBufferSize(new T.Vector2());if(target.width!==size.x||target.height!==size.y)target.setSize(size.x,size.y);u.resolution.value.copy(size);u.depth.value=depth;u.clock.value=o.time*o.drift;u.roil.value=o.roil;u.fray.value=o.fray;u.dissolve.value=o.departure?.dissolve??0;
 const projected:ProjectedLobe[]=[];const matrix=new T.Matrix4();
 for(const [id,g]of groups){const e=p.edges.find(e=>e.id===id)!;const scale=Math.min(1,e.a.distanceTo(e.b)/.75)*(p.nodes.get(id)?.kind==='op'?.64:1)*o.size;g.visible=scale>.001;g.position.copy(e.b);g.scale.setScalar(scale);g.quaternion.identity().slerp(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),e.b.clone().sub(e.a).normalize()),.25);if(o.departure){g.position.applyMatrix4(o.departure.matrix);g.scale.multiplyScalar(o.departure.scale);g.quaternion.premultiply(o.departure.rotation);}g.updateMatrixWorld(true);
 for(const obj of g.children){if(!(obj instanceof T.InstancedMesh)||!g.visible)continue;for(let i=0;i<obj.count;i+=12){obj.getMatrixAt(i,matrix);const c=new T.Vector3().setFromMatrixPosition(matrix).applyMatrix4(g.matrixWorld),p=c.clone().project(camera);const r=.62*scale*(o.departure?.scale??1);const dx=c.clone().add(new T.Vector3(r,0,0)).project(camera).sub(p),dy=c.clone().add(new T.Vector3(0,r,0)).project(camera).sub(p),dz=c.clone().add(new T.Vector3(0,0,r)).project(camera).sub(p);projected.push({x:p.x*.5+.5,y:p.y*.5+.5,rx:Math.hypot(dx.x,dy.x,dz.x)*.5,ry:Math.hypot(dx.y,dy.y,dz.y)*.5});}}
 }
 renderer.setRenderTarget(target);renderer.render(scene,camera);return projected;
 }
 return {target,render,inspect:()=>({cards,triangles,attachments:[...groups].map(([id,g])=>({id,position:g.position.toArray(),visible:g.visible,scale:g.scale.x}))})};
}
