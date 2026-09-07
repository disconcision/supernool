import * as T from 'three';
import {Pose} from '../018-painted-ground/layout';
import {hash} from './canopy';
export type ShadowOptions={opacity:number;fringe:number;texture:number;anger:number;size:number;colour:string;form:string;arcs:boolean;time:number;enabled:boolean;drift:number;strike:T.Vector3};
const MAX=40,ARC=48;
// Analytic ellipsoid depth intervals form a single composited mantle. Overlapping
// lobes use maximum optical thickness, preventing accidental opaque layer stacks.
export function makeShadowCanopy(renderer:T.WebGLRenderer){
 const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:true,samples:4});target.depthTexture=new T.DepthTexture(1,1,T.UnsignedIntType);
 const u={sceneColour:{value:target.texture},sceneDepth:{value:target.depthTexture},invProjection:{value:new T.Matrix4()},cameraWorld:{value:new T.Matrix4()},centres:{value:Array.from({length:MAX},()=>new T.Vector4())},radii:{value:Array.from({length:MAX},()=>new T.Vector3())},count:{value:0},opacity:{value:.58},fringe:{value:.35},textureAmount:{value:.04},clock:{value:0},tint:{value:new T.Color('#9260d9')},resolution:{value:new T.Vector2()},segments:{value:Array.from({length:ARC},()=>new T.Vector4())},arcCount:{value:0},arcPower:{value:0}};
 const mat=new T.ShaderMaterial({depthTest:false,depthWrite:false,uniforms:u,vertexShader:'varying vec2 uv0;void main(){uv0=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`
 varying vec2 uv0;uniform sampler2D sceneColour,sceneDepth;uniform mat4 invProjection,cameraWorld;
 uniform vec4 centres[40];uniform vec3 radii[40];uniform int count;uniform float opacity,fringe,textureAmount,clock;uniform vec3 tint;uniform vec2 resolution;
 uniform vec4 segments[48];uniform int arcCount;uniform float arcPower;
 vec3 unproject(float depth){vec4 p=invProjection*vec4(uv0*2.-1.,depth*2.-1.,1.);return (cameraWorld*vec4(p.xyz/p.w,1.)).xyz;}
 float h(vec3 p){return fract(sin(dot(p,vec3(17.1,113.7,41.3)))*43758.5453);}
 float noise(vec3 p){vec3 a=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h(a),h(a+vec3(1,0,0)),f.x),mix(h(a+vec3(0,1,0)),h(a+vec3(1,1,0)),f.x),f.y),mix(mix(h(a+vec3(0,0,1)),h(a+vec3(1,0,1)),f.x),mix(h(a+vec3(0,1,1)),h(a+vec3(1,1,1)),f.x),f.y),f.z);}
 void main(){vec3 base=texture2D(sceneColour,uv0).rgb,ro=unproject(0.),rd=normalize(unproject(1.)-ro);float limit=length(unproject(texture2D(sceneDepth,uv0).x)-ro);
 float optical=0.,edge=10.,surfaceNoise=0.;
 for(int i=0;i<40;i++){if(i>=count)break;vec3 c=centres[i].xyz,r=radii[i],v=(ro-c)/r,w=rd/r;float aa=dot(w,w),t=-dot(v,w)/aa;vec3 closest=ro+rd*t;
 float distortion=(noise(closest*2.1+vec3(clock*.045,0.,0.))-.5)*.23+(noise(closest*5.8+vec3(clock*.026,0.,0.))-.5)*.065;
 float q=dot(v+w*t,v+w*t)+distortion;float halfDepth=sqrt(max(0.,(1.-q)/aa)),nearT=t-halfDepth;
 if(t<0.||nearT>limit)continue;
 edge=min(edge,q);
 float thickness=max(0.,min(t+halfDepth,limit)-max(0.,nearT));optical=max(optical,thickness);
 surfaceNoise=max(surfaceNoise,noise(closest*.9+clock*.018));}
 // Dark means attenuating the transmitted scene, not hiding it under lit leaf texture.
 float body=opacity*(1.-exp(-optical*2.6))*(1.-surfaceNoise*textureAmount*.2);vec3 black=vec3(.0015,.001,.003)*(1.+surfaceNoise*textureAmount*4.);
 vec3 colour=mix(base,black,body);
 float rim=exp(-abs(edge-1.)*37.)*fringe;float halo=exp(-abs(edge-1.)*10.)*fringe*.13;
 colour+=tint*(rim*.34+halo)*(1.+.08*sin(clock*1.5));
 float bolt=0.;for(int j=0;j<48;j++){if(j>=arcCount)break;vec2 a=segments[j].xy*resolution,b=segments[j].zw*resolution,p=uv0*resolution;vec2 d=b-a;float t=clamp(dot(p-a,d)/max(dot(d,d),.0001),0.,1.);float dist=length(p-a-d*t);bolt=max(bolt,exp(-dist*dist/1.15)+.15*exp(-dist*dist/26.));}
 colour+=mix(tint,vec3(1.),.27)*bolt*arcPower;
 gl_FragColor=vec4(colour,1.);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`});
 const screen=new T.Scene();screen.add(new T.Mesh(new T.PlaneGeometry(2,2),mat));const screenCamera=new T.Camera();let pose:Pose|undefined,anchors:{id:string;point:T.Vector3;scale:number}[]=[];
 function setPose(p:Pose){pose=p;anchors=[];for(const e of p.edges){if(e.id==='stem')continue;const node=p.nodes.get(e.id);if(node?.kind!=='op'||hash(e.id+'cloud')>.6)anchors.push({id:e.id,point:e.b.clone(),scale:Math.min(1,e.a.distanceTo(e.b)/.75)*(node?.kind==='op'?.64:1)});}}
 function render(scene:T.Scene,camera:T.OrthographicCamera,o:ShadowOptions){
 const size=renderer.getDrawingBufferSize(new T.Vector2());if(target.width!==size.x||target.height!==size.y)target.setSize(size.x,size.y);u.resolution.value.copy(size);
 camera.updateMatrixWorld();u.invProjection.value.copy(camera.projectionMatrixInverse);u.cameraWorld.value.copy(camera.matrixWorld);u.clock.value=o.time;u.opacity.value=o.opacity;u.fringe.value=o.fringe;u.textureAmount.value=o.texture;u.tint.value.set(o.colour);
 let n=0;const positions:T.Vector3[]=[];
 for(const a of anchors){if(a.scale<.001)continue;for(let k=0;k<3&&n<MAX;k++){
 const angle=hash(a.id+k)*6.283,spread=k===0?0:.66,sz=o.size*a.scale;const c=a.point.clone().add(new T.Vector3(Math.cos(angle)*spread,.15+(k===1?.45:0),Math.sin(angle)*spread).multiplyScalar(sz));
 c.x+=Math.sin(o.time*.5+hash(a.id)*6)*.14*o.drift*sz;c.y+=Math.sin(o.time*.7+hash(a.id)*4)*.14*o.drift*sz;
 const factor=k===0?1:.72;u.centres.value[n].set(c.x,c.y,c.z,1);u.radii.value[n].set(o.form==='S2'?1.5:1.12,o.form==='S2'?.65:o.form==='S3'?1.38:1.02,o.form==='S3'?.85:1.02).multiplyScalar(sz*factor);if(k===0)positions.push(c);n++;}}
 u.count.value=o.enabled?n:0;
 u.arcCount.value=0;u.arcPower.value=0;
 if(o.enabled&&o.arcs&&positions.length>1){const beat=Math.floor(o.time*1.1),phase=(o.time*1.1)%1;u.arcPower.value=(.18+.82*Math.pow(Math.max(0,1-phase*2.8),2))*(.45+o.anger*1.9);
 const forward=new T.Vector3();camera.getWorldDirection(forward);forward.negate();const tracks=o.anger>.6?3:o.anger>.2?2:1;
 for(let k=0;k<tracks;k++){const a=positions[(beat+k*3)%positions.length].clone().addScaledVector(forward,o.size*.88),end=positions[(beat+k*3+2)%positions.length].clone().addScaledVector(forward,o.size*.85);
 if(k===2){end.copy(o.strike);}const steps=12,delta=end.clone().sub(a),side=new T.Vector3().crossVectors(delta,forward).normalize();let prev=a.clone();
 for(let j=1;j<=steps;j++){const t=j/steps,point=a.clone().lerp(end,t);point.addScaledVector(side,(hash('arc:'+beat+':'+k+':'+j+':bend')-.5)*.7*Math.sin(Math.PI*t));const pa=prev.clone().project(camera),pb=point.clone().project(camera);u.segments.value[u.arcCount.value++].set(pa.x*.5+.5,pa.y*.5+.5,pb.x*.5+.5,pb.y*.5+.5);prev=point;}}}
 renderer.info.reset();renderer.info.autoReset=false;renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.setRenderTarget(null);renderer.render(screen,screenCamera);renderer.info.autoReset=true;
 }
 return {setPose,render,inspect:()=>({volumes:u.count.value,arcs:u.arcCount.value,opacity:u.opacity.value,centres:u.centres.value.slice(0,u.count.value).map(c=>c.toArray()),radii:u.radii.value.slice(0,u.count.value).map(r=>r.toArray())})};
}
