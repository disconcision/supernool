import {CloudFormation,formationPoint,formationPhase} from './cloud-formation';
import * as T from 'three';
import {Pose} from '../018-painted-ground/layout';
import {hash} from './canopy';
import {makeShadowPatches,isPatchForm,CloudDeparture} from './shadow-patches';
import {makeShadowCanopy as makeLegacy,ShadowOptions as LegacyOptions} from './shadow-legacy';
import {mixedLightning,ProjectedLobe,ArcSettings,ArcPreview,LightningMemory} from './storm-lightning';
export type ShadowOptions=LegacyOptions&{visibility:string;roil:number;seed:number;density:number;fray:number;lightning:ArcSettings;arcPreview?:ArcPreview;strikePoints:T.Vector3[];arcGlow?:number;cloudFlash?:number;departure?:CloudDeparture;formation?:CloudFormation};
const MAX=64,ARC=80;
export function makeShadowCanopy(renderer:T.WebGLRenderer){
 const smallMemory:LightningMemory={};let lastEvents:ReturnType<typeof mixedLightning>['events']=[];let lastForm='';const patches=makeShadowPatches();
 let legacy:ReturnType<typeof makeLegacy>|undefined,lastLegacy=false,pose:Pose|undefined;
 const target=new T.WebGLRenderTarget(1,1,{type:T.HalfFloatType,depthBuffer:true,samples:4});target.depthTexture=new T.DepthTexture(1,1,T.UnsignedIntType);
 // A separate silhouette mask is an explicit readability treatment, not physical transmission.
 const host=new T.WebGLRenderTarget(1,1,{depthBuffer:true,samples:4});const maskMat=new T.MeshBasicMaterial({color:'white',side:T.DoubleSide});
 const u={dissolve:{value:0},patchCoverage:{value:patches.target.texture},patchMode:{value:0},sceneColour:{value:target.texture},sceneDepth:{value:target.depthTexture},hostMask:{value:host.texture},invProjection:{value:new T.Matrix4()},cameraWorld:{value:new T.Matrix4()},centres:{value:Array.from({length:MAX},()=>new T.Vector4())},radii:{value:Array.from({length:MAX},()=>new T.Vector3())},count:{value:0},opacity:{value:.72},fringe:{value:.55},textureAmount:{value:.18},clock:{value:0},roil:{value:.65},preserveHost:{value:.65},tint:{value:new T.Color('#9260d9')},resolution:{value:new T.Vector2()},segments:{value:Array.from({length:ARC},()=>new T.Vector4())},weights:{value:new Float32Array(ARC)},powers:{value:new Float32Array(ARC)},freeArcs:{value:new Float32Array(ARC)},arcGlow:{value:1},cloudFlash:{value:0},arcCount:{value:0},arcPower:{value:0}};
 const mat=new T.ShaderMaterial({depthTest:true,depthFunc:T.AlwaysDepth,depthWrite:true,uniforms:u,vertexShader:'varying vec2 uv0;void main(){uv0=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`
 varying vec2 uv0;uniform sampler2D sceneColour,sceneDepth,hostMask,patchCoverage;uniform float patchMode;uniform mat4 invProjection,cameraWorld;
 uniform vec4 centres[64];uniform vec3 radii[64];uniform int count;uniform float opacity,fringe,textureAmount,clock,roil,preserveHost,dissolve;uniform vec3 tint;uniform vec2 resolution;
 uniform vec4 segments[80];uniform float weights[80],powers[80],freeArcs[80];uniform int arcCount;uniform float arcPower,arcGlow,cloudFlash;
 vec3 unproject(float depth){vec4 p=invProjection*vec4(uv0*2.-1.,depth*2.-1.,1.);return (cameraWorld*vec4(p.xyz/p.w,1.)).xyz;}
 float h(vec3 p){return fract(sin(dot(p,vec3(17.1,113.7,41.3)))*43758.5453);}
 float noise(vec3 p){vec3 a=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h(a),h(a+vec3(1,0,0)),f.x),mix(h(a+vec3(0,1,0)),h(a+vec3(1,1,0)),f.x),f.y),mix(mix(h(a+vec3(0,0,1)),h(a+vec3(1,0,1)),f.x),mix(h(a+vec3(0,1,1)),h(a+vec3(1,1,1)),f.x),f.y),f.z);}
 void main(){vec3 base=texture2D(sceneColour,uv0).rgb,ro=unproject(0.),rd=normalize(unproject(1.)-ro);float limit=length(unproject(texture2D(sceneDepth,uv0).x)-ro),mask=texture2D(hostMask,uv0).r;
 float optical=0.,edge=10.,surfaceNoise=0.,top=0.,frontDepth=1e6,weightSum=0.;
 for(int i=0;i<64;i++){if(i>=count)break;vec3 c=centres[i].xyz,r=radii[i],v=(ro-c)/r,w=rd/r;float aa=dot(w,w),t=-dot(v,w)/aa,q=dot(v+w*t,v+w*t);
 // Reject distant pixels before evaluating cloud texture.
 if(q>1.5||t<0.)continue;
 vec3 p=(ro+rd*t-c)/r;float n=noise(p*2.4+vec3(0.,-clock*.17,clock*.09)+centres[i].w);
 float fine=noise(p*5.7+vec3(clock*.08,-clock*.12,0.)+centres[i].w);
 q+=(n-.5)*(.22+.2*roil)+(fine-.5)*.09;
 float halfDepth=sqrt(max(0.,(1.-q)/aa)),nearT=t-halfDepth;if(nearT>limit)continue;
 float smoothEdge=.12;float blend=clamp(.5+.5*(q-edge)/smoothEdge,0.,1.);edge=mix(q,edge,blend)-smoothEdge*blend*(1.-blend);
 float thickness=max(0.,min(t+halfDepth,limit)-max(0.,nearT));
 optical=max(optical,thickness);if(thickness>0.){
 // Smoothly blend front-surface texture across overlapping lobes; choosing a
 // single nearest lobe produces visible circular patches and temporal seams.
 float newFront=min(frontDepth,nearT),rescale=exp((newFront-frontDepth)*2.5);
 surfaceNoise*=rescale;top*=rescale;weightSum*=rescale;frontDepth=newFront;
 float weight=exp(-(nearT-frontDepth)*2.5)*smoothstep(0.,.5,thickness);
 surfaceNoise+=(n*.7+fine*.3)*weight;top+=clamp(p.y*.5+.5,0.,1.)*weight;weightSum+=weight;
 }}
 surfaceNoise/=max(.0001,weightSum);top/=max(.0001,weightSum);
 float body=opacity*(1.-exp(-optical*2.6))*(1.-textureAmount*(surfaceNoise*.3+top*.15));
 float cloudTexture=textureAmount*(.15+surfaceNoise*.85);vec3 black=vec3(.002,.002,.003)+vec3(.015,.013,.019)*cloudTexture*(.35+top*.65);
 vec2 coverage=texture2D(patchCoverage,uv0).rg;
 if(patchMode>.5){body=opacity*coverage.r;black=vec3(.002,.002,.004)+tint*coverage.g*textureAmount*.018;}
 float erosion=dissolve>0.?1.-smoothstep(surfaceNoise-.15,surfaceNoise+.15,mix(-.18,1.18,dissolve)):1.;if(patchMode<.5)body*=erosion;
 float preserve=1.-mask*preserveHost;
 vec3 colour=mix(base,black,body*preserve);
 float edgeVariation=.65+.35*surfaceNoise;float rim=exp(-abs(edge-1.)*24.)*fringe*edgeVariation;float halo=exp(-abs(edge-1.)*8.)*fringe*.07;rim*=erosion;halo*=erosion;
 if(patchMode>.5){vec2 px=2./resolution;float around=max(max(texture2D(patchCoverage,uv0+vec2(px.x,0)).r,texture2D(patchCoverage,uv0-vec2(px.x,0)).r),max(texture2D(patchCoverage,uv0+vec2(0,px.y)).r,texture2D(patchCoverage,uv0-vec2(0,px.y)).r));
 rim=abs(around-coverage.r)*fringe*1.15;halo=0.;}
 colour+=tint*((rim*.26+halo)*preserve+body*cloudFlash*.055*(.4+surfaceNoise));
 float bolt=0.;for(int j=0;j<80;j++){if(j>=arcCount)break;vec2 a=segments[j].xy*resolution,b=segments[j].zw*resolution,p=uv0*resolution;vec2 d=b-a;float t=clamp(dot(p-a,d)/max(dot(d,d),.0001),0.,1.);float dist=length(p-a-d*t),width=weights[j];bolt=max(bolt,(exp(-dist*dist/max(.2,width*.8))+.1*arcGlow*exp(-dist*dist/(14.+arcGlow*12.)))*width*powers[j]*(patchMode>.5&&freeArcs[j]<.5?(.25+.75*smoothstep(.015,.12,coverage.r)):1.));}
 // Even Depth-only mode keeps discharge strokes off the algebra and wood.
 colour+=mix(tint,vec3(1.),.35)*bolt*arcPower*(1.-mask);
 gl_FragColor=vec4(colour,1.);gl_FragDepth=texture2D(sceneDepth,uv0).r;
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 }`});
 const screen=new T.Scene();screen.add(new T.Mesh(new T.PlaneGeometry(2,2),mat));const screenCamera=new T.Camera();let anchors:{id:string;point:T.Vector3;scale:number}[]=[];
 function setPose(p:Pose){pose=p;legacy?.setPose(p);anchors=[];for(const e of p.edges){if(e.id==='stem')continue;const node=p.nodes.get(e.id);if(node?.kind!=='op'||hash(e.id+'cloud')>.6)anchors.push({id:e.id,point:e.b.clone(),scale:Math.min(1,e.a.distanceTo(e.b)/.75)*(node?.kind==='op'?.64:1)});}}
 function render(scene:T.Scene,camera:T.OrthographicCamera,o:ShadowOptions,drawBase?:()=>void){
 const destination=renderer.getRenderTarget();u.dissolve.value=o.departure?.dissolve??0;u.arcGlow.value=o.arcGlow??1;u.cloudFlash.value=o.cloudFlash??0;
 lastLegacy=['S1','S2','S3'].includes(o.form);if(lastLegacy){lastForm=o.form;if(!legacy){legacy=makeLegacy(renderer);if(pose)legacy.setPose(pose);}legacy.render(scene,camera,o,drawBase);return;}
 const patchMode=isPatchForm(o.form);u.patchMode.value=patchMode?1:0;
 const size=renderer.getDrawingBufferSize(new T.Vector2());if(target.width!==size.x||target.height!==size.y){target.setSize(size.x,size.y);host.setSize(size.x,size.y);}u.resolution.value.copy(size);
 camera.updateMatrixWorld();u.invProjection.value.copy(camera.projectionMatrixInverse);u.cameraWorld.value.copy(camera.matrixWorld);u.clock.value=o.time*o.drift;u.opacity.value=o.opacity;u.fringe.value=o.fringe;u.textureAmount.value=o.texture;u.tint.value.set(o.colour);u.roil.value=o.roil;u.preserveHost.value=o.visibility==='clear'?1:o.visibility==='readable'?.78:0;
 let n=0,projected:ProjectedLobe[]=[];const tt=o.time*o.drift;
 // Allocate lobes fairly across all host anchors rather than truncating a subtree.
 const lobes=Math.min(7,Math.floor(MAX/Math.max(1,anchors.length)));
 for(const a of (patchMode?[]:anchors)){if(a.scale<.001)continue;for(let k=0;k<lobes&&n<MAX;k++){
 const seed=hash(a.id+':'+k+':storm-lobe'),angle=k*2.399+hash(a.id)*6.28,sz=o.size*a.scale;
 let offset:T.Vector3,r:T.Vector3;
 if(o.form==='S5'){// Rising turrets widening into a wind-sheared anvil.
 offset=new T.Vector3(k<2?0:Math.cos(angle)*(.5+k*.07),k===0?.2:k===1?.85:1.15+seed*.3,Math.sin(angle)*.52);
 r=new T.Vector3(k<2?.72:.8,k===0?.88:k===1?.76:.42,.62);
 }else if(o.form==='S6'){// Low rolling fronts: wider overlapping shelves, scalloped undersides.
 offset=new T.Vector3(Math.cos(angle)*(k===0?0:.78),k===0?.18:Math.sin(angle)*.26,Math.sin(angle)*.62);
 r=new T.Vector3(k===0?1.35:.73,k===0?.57:.53,k===0?.93:.65);
 }else{// Cauliflower billows: several scales, outward rolling shoulder lobes.
 offset=new T.Vector3(Math.cos(angle)*(k===0?0:.64),k===0?.28:.24+Math.sin(angle)*.5+seed*.25,Math.sin(angle)*.58);
 r=new T.Vector3(k===0?1:.5+seed*.21,k===0?.86:.49+seed*.3,k===0?.93:.56+seed*.14);
 }
 const phase=tt*(.65+o.anger*.35)+seed*6.28;
 offset.x+=Math.sin(phase)*.16*o.roil;offset.y+=Math.cos(phase)*.2*o.roil;offset.z+=Math.sin(phase*.83)*.14*o.roil;
 r.multiplyScalar(1+Math.sin(phase+1.3)*.1*o.roil);const forming=o.formation?formationPhase(o.formation.progress,seed):1;
 if(o.formation){offset=formationPoint(offset,seed,o.formation);r.multiplyScalar(.18+.82*forming);}
 const c=a.point.clone().add(offset.multiplyScalar(sz));r.multiplyScalar(sz);if(o.departure){c.applyMatrix4(o.departure.matrix);r.multiplyScalar(o.departure.scale);}
 u.centres.value[n].set(c.x,c.y,c.z,seed*17);u.radii.value[n].copy(r);n++;
 const p=c.clone().project(camera),px=c.clone().add(new T.Vector3(r.x,0,0)).project(camera).sub(p),py=c.clone().add(new T.Vector3(0,r.y,0)).project(camera).sub(p),pz=c.clone().add(new T.Vector3(0,0,r.z)).project(camera).sub(p);
 projected.push({x:p.x*.5+.5,y:p.y*.5+.5,rx:Math.hypot(px.x,py.x,pz.x)*.5,ry:Math.hypot(px.y,py.y,pz.y)*.5});
 }}
 u.count.value=o.enabled?n:0;
 const autoReset=renderer.info.autoReset;if(autoReset)renderer.info.reset();renderer.info.autoReset=false;renderer.setRenderTarget(target);if(drawBase)drawBase();else renderer.render(scene,camera);
 if(patchMode&&pose){projected=patches.render(renderer,camera,target.depthTexture,pose,o);if(!o.enabled){renderer.setRenderTarget(patches.target);renderer.clear();u.patchMode.value=0;}}
 if(lastForm!==o.form){smallMemory.key=undefined;smallMemory.events?.clear();}lastForm=o.form;const project=(p:T.Vector3)=>{const q=p.clone().project(camera);return new T.Vector2(q.x*.5+.5,q.y*.5+.5);};
 const branchPoints=(pose?.edges??[]).filter(e=>e.id!=='stem').map(e=>project(e.a.clone().lerp(e.b,.72)));
 const bolt=mixedLightning(projected,branchPoints,o.strikePoints.map(project),o.time,o.anger,o.lightning,o.arcPreview,smallMemory);lastEvents=bolt.events;u.arcCount.value=o.enabled&&o.arcs?Math.min(ARC,bolt.segments.length):0;u.arcPower.value=bolt.segments.length?1:0;
 for(let i=0;i<u.arcCount.value;i++){const s=bolt.segments[i];u.segments.value[i].set(s.a.x,s.a.y,s.b.x,s.b.y);u.weights.value[i]=s.weight;u.powers.value[i]=s.power;u.freeArcs.value[i]=s.free?1:0;}
 const background=scene.background,override=scene.overrideMaterial,layers=camera.layers.mask,shadowUpdate=renderer.shadowMap.autoUpdate;renderer.shadowMap.autoUpdate=false;scene.background=new T.Color('black');scene.overrideMaterial=maskMat;camera.layers.set(1);renderer.setRenderTarget(host);renderer.render(scene,camera);scene.background=background;scene.overrideMaterial=override;camera.layers.mask=layers;renderer.shadowMap.autoUpdate=shadowUpdate;
 renderer.setRenderTarget(destination);renderer.render(screen,screenCamera);renderer.info.autoReset=autoReset;
 }
 function inspect(){const data=lastLegacy?legacy!.inspect():{volumes:u.count.value,arcs:u.arcCount.value,arcPower:u.arcPower.value,opacity:u.opacity.value,protection:u.preserveHost.value,time:u.clock.value,centres:u.centres.value.slice(0,u.count.value).map(c=>c.toArray()),radii:u.radii.value.slice(0,u.count.value).map(r=>r.toArray())};return {...data,events:lastEvents,patches:isPatchForm(lastForm)?patches.inspect():undefined};}
 return {setPose,render,inspect};
}
