import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {initial,actions,walk,replace,Term} from '../018-painted-ground/algebra';
import {layout,transition,Pose} from '../018-painted-ground/layout';
import {prepare,Options,Edge} from '../018-painted-ground/surface';
import {makeShading} from '../018-painted-ground/shading';
import {makeSigil,disposeSigil} from '../018-painted-ground/sigils';
import {createTraveller} from '../018-painted-ground/traveller';
import {makeCluster,disposeGroup,wind,hash,Style,Settings} from './canopy';
import {makeShadowCanopy} from './shadow-canopy';
import {addBarkEnergy} from './shadow-bark';
import {makeGrowthCluster,makeOffshoots,placeOffshoots,Offshoot,GrowthSettings} from './growth-canopy';
const shadowStudy=document.body.dataset.study==='shadow';
const growthStudy=document.body.dataset.study==='growth';
const $=(id:string)=>document.getElementById(id)!,val=(id:string)=>($(id) as HTMLInputElement).value,num=(id:string)=>+val(id),checked=(id:string)=>($(id) as HTMLInputElement).checked;
if(growthStudy&&new URLSearchParams(location.search).get('finish')==='previous')($( 'finish') as HTMLSelectElement).value='previous';
const scene=new T.Scene();scene.background=new T.Color('#a5b0a4');scene.fog=new T.Fog('#a5b0a4',38,80);
const renderer=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;$('view').append(renderer.domElement);
const shadow=shadowStudy?makeShadowCanopy(renderer):undefined;
const camera=new T.OrthographicCamera(-10,10,8,-8,.1,120);camera.position.set(14,12,22);const orbit=new OrbitControls(camera,renderer.domElement);orbit.target.set(0,4,0);orbit.enableDamping=true;orbit.maxPolarAngle=Math.PI*.49;orbit.minZoom=.55;orbit.maxZoom=3;
const hemi=new T.HemisphereLight('#eef0cd','#344638',2);scene.add(hemi);const sun=new T.DirectionalLight('#fff1c9',3);sun.position.set(-8,15,9);scene.add(sun);
const spill=[new T.PointLight('#9060dd',0,17,2),new T.PointLight('#9060dd',0,15,2)];spill[0].position.set(-2,2.2,1);spill[1].position.set(2.5,3,-1.5);scene.add(...spill);
const ground=new T.Mesh(new T.CircleGeometry(60,100),new T.MeshStandardMaterial({color:'#65735d',roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.y=-.16;scene.add(ground);
const rocks:T.Mesh[]=[];for(let i=0;i<22;i++){const a=i*2.399963,r=7+hash('rock'+i)*5;const m=new T.Mesh(new T.IcosahedronGeometry(1,0),new T.MeshStandardMaterial({color:new T.Color('#60685c').multiplyScalar(.85+hash('tone'+i)*.3),flatShading:true,roughness:1}));m.position.set(Math.cos(a)*r,.25,Math.sin(a)*r);m.scale.set(.5+hash('x'+i)*1.5,.4+hash('y'+i)*1.6,.8+hash('z'+i));m.rotation.y=a;scene.add(m);rocks.push(m);}
const strikeRock=rocks.reduce((a,b)=>a.position.distanceToSquared(new T.Vector3(-6,0,2))<b.position.distanceToSquared(new T.Vector3(-6,0,2))?a:b);const strikePoint=strikeRock.position.clone().add(new T.Vector3(0,strikeRock.scale.y*.75,0));
// Small irregular ground patches establish scale without painting over the live matte.
for(let i=0;i<80;i++){const a=i*2.4,r=4+hash('patch'+i)*12;const m=new T.Mesh(new T.CircleGeometry(.15+hash('p'+i)*.55,7),new T.MeshStandardMaterial({color:i%3?'#758269':'#5a7055',roughness:1}));m.rotation.x=-Math.PI/2;m.position.set(Math.cos(a)*r,-.153+i*.00001,Math.sin(a)*r);scene.add(m);}
const avatar=createTraveller(scene,()=>{});avatar.choose('olive-cape');avatar.setPalette('raincoat');avatar.root.position.set(.5,0,2.8);avatar.root.scale.setScalar(.78);
const shade=makeShading(),woodMat=shade.carved(new T.MeshStandardMaterial({color:'#9b8359',roughness:1}));
const barkEnergy=shadowStudy?addBarkEnergy(woodMat):undefined;
const wood=new T.Mesh(new T.BufferGeometry(),woodMat);wood.position.y=5;wood.scale.setScalar(6);scene.add(wood);if(shadowStudy)wood.layers.enable(1);
const foliage=new T.Group(),twigs=new T.Group(),sigils=new T.Group();scene.add(foliage,twigs,sigils);
const twigMat=new T.MeshStandardMaterial({color:'#8c774e',roughness:1});
const o:Options={thickness:1.05,taper:.78,bow:.45,random:.5,twist:.24,facets:.45,seed:3,blend:.16,hewn:true,spread:1};
const baseTree=initial();
const offshootGroup=new T.Group();scene.add(offshootGroup);let offshoots:Offshoot[]=[];
let canopyTriangles=0;
let terminalIds:string[]=[],clusters=new Map<string,T.Group>(),twigGroups=new Map<string,T.Group>(),currentPose:Pose|undefined;
function settings():Settings{return {style:val('style') as Style,seed:num('seed'),size:num('size'),density:num('density'),palette:val('palette'),normals:checked('normals'),wire:checked('wire')};}
function growthSettings():GrowthSettings{return {...settings(),form:val('style'),backing:num('backing'),offshoots:num('offshoots'),finish:val('finish'),normalSharing:num('normalSharing'),shadeDepth:num('shadeDepth'),brushScale:num('brushScale')};}
function maturePose():Pose{
 const edges:Edge[]=[],points=new Map<string,T.Vector3>(),parents=new Map<string,string>(),nodes=new Map<string,Term>(),seed=num('seed'),spread=num('spread'),t=num('pose');
 function branch(id:string,p:T.Vector3,depth:number,angle:number){points.set(id,p);if(depth===3||(val('specimen')==='uneven'&&depth===2&&hash(id+seed)<.25)){nodes.set(id,{kind:'var',id,name:id});return;}
 nodes.set(id,{kind:'op',id,op:'+',left:null!,right:null!});
 for(let i=0;i<2;i++){const sign=i?1:-1,theta=angle+sign*.7,len=(depth===0?2.15:depth===1?1.8:1.2)*(1+.28*(hash(id+i+seed)-.5)),side=(depth===0?2.05:depth===1?1.5:1.05)*sign;
 const target=p.clone().add(new T.Vector3(side*Math.cos(angle),len,spread*side*Math.sin(angle)));target.x+=Math.sin(t*Math.PI)*(hash(id+'bend')-.5)*.65;target.z+=spread*Math.sin(t*Math.PI)*.5*Math.sin(angle+id.length);
 const child=id+i;parents.set(child,id);edges.push({id:child,a:p,b:target,r:.34*Math.pow(.67,depth)});branch(child,target,depth+1,theta+1.25);}
 }
 const root=new T.Vector3(0,1.8,0);edges.push({id:'stem',a:new T.Vector3(0,-.12,0),b:root,r:.52});branch('host',root,0,.35);return {edges,points,parents,nodes};
}
function specimen():Pose{
 if(['mature','uneven'].includes(val('specimen')))return maturePose();
 const tree=baseTree,kind=val('specimen'),owner=kind==='zero'?walk(tree).find(n=>actions(n).some(a=>a.key.startsWith('zero')))!:tree;
 const action=actions(owner).find(a=>kind==='swap'?a.key==='swap':kind==='group'?a.key.startsWith('group'):a.key.startsWith('zero'))!;
 const after=replace(tree,owner.id,action.result);return transition(tree,after,num('pose'),{seed:num('seed'),spread:num('spread'),height:'depth',irregularity:.5},action.key,action.merge,o);
}
function rebuildClusters(p:Pose){disposeGroup(foliage);foliage.clear();clusters.clear();
 // Do not dispose the shared twig material; own geometries only.
 twigs.traverse(obj=>{if(obj instanceof T.Mesh)obj.geometry.dispose();});twigs.clear();twigGroups.clear();
 const ids=terminalIds;
 for(const id of ids){const g=shadowStudy?new T.Group():growthStudy?makeGrowthCluster(id,growthSettings()):makeCluster(id,settings());clusters.set(id,g);foliage.add(g);const tg=new T.Group();
 for(let k=0;k<(shadowStudy||growthStudy&&val('style')!=='F5'?0:5);k++){const a=k*2.399+hash(id)*6,b=new T.Vector3(Math.cos(a)*(.45+k*.09),.5+hash(id+k)*.4,Math.sin(a)*(.45+k*.09));const geo=new T.CylinderGeometry(.014,.045,b.length(),5,1);geo.translate(0,b.length()/2,0);const m=new T.Mesh(geo,twigMat);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),b.clone().normalize());tg.add(m);}twigGroups.set(id,tg);twigs.add(tg);}
 if(growthStudy){disposeGroup(offshootGroup);offshootGroup.clear();offshoots=makeOffshoots(['mature','uneven'].includes(val('specimen'))?p:layout(baseTree,{seed:num('seed'),spread:num('spread'),height:'depth',irregularity:.5}),growthSettings());offshoots.forEach(s=>offshootGroup.add(s.root));}
 foliage.traverse(obj=>{if(obj instanceof T.Mesh)obj.frustumCulled=false;});
 canopyTriangles=0;foliage.traverse(obj=>{if(obj instanceof T.Mesh)canopyTriangles+=(obj.geometry.index?.count??obj.geometry.attributes.position.count)/3*(obj instanceof T.InstancedMesh?obj.count:1);});
 if(growthStudy)offshootGroup.traverse(obj=>{if(obj instanceof T.Mesh)canopyTriangles+=(obj.geometry.index?.count??obj.geometry.attributes.position.count)/3*(obj instanceof T.InstancedMesh?obj.count:1);});
 applyPose(p);
}
function applyPose(p:Pose){currentPose=p;shadow?.setPose(p);
 for(const id of terminalIds){const e=p.edges.find(e=>e.id===id),g=clusters.get(id),tg=twigGroups.get(id);if(!g||!tg)continue;
 if(!e){g.visible=tg.visible=false;continue;}g.visible=checked('foliage');tg.visible=true;const m=prepare(e,o);g.position.copy(e.b);tg.position.copy(e.b);
 // Persistent IDs/local groups travel together. Stabilized orientation avoids a canopy roll at vertical tangencies.
 const q=new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),m.axis);g.quaternion.identity().slerp(q,.25);tg.quaternion.copy(g.quaternion);
 const growth=Math.min(1,m.len/.7),scale=num('size')*growth;g.scale.setScalar(scale);tg.scale.setScalar(growth);
 }
 if(growthStudy){placeOffshoots(offshoots,p,o);for(const shoot of offshoots)shoot.foliage.visible=checked('foliage');}
 sigils.children.forEach(disposeSigil);sigils.clear();if(checked('sigils')&&!['mature','uneven'].includes(val('specimen'))){for(const [id,n]of p.nodes){const point=p.points.get(id);if(!point)continue;const s=makeSigil(n.kind==='op'?(n.op==='+'?'+':'×'):n.kind==='num'?String(n.value):n.name,n.kind==='op',false,'carved');s.position.copy(point).add(new T.Vector3(0,.15,.15));s.scale.setScalar(.7);if(shadowStudy)s.traverse(c=>{if(!c.userData.hitTarget)c.layers.enable(1);});sigils.add(s);}}
}
const worker=new Worker(new URL('../018-painted-ground/mesh.worker.ts',import.meta.url),{type:'module'});
let sequence=0,busy=false,pending:{id:number;pose:Pose;options:Options}|undefined,active:typeof pending,epoch=0;
function pump(){if(busy||!pending)return;busy=true;active=pending;pending=undefined;worker.postMessage({id:active.id,edges:active.pose.edges,options:active.options,resolution:88});}
function requestPose(){Object.assign(o,{seed:num('seed'),spread:num('spread')});const p=specimen();pending={id:++sequence,pose:p,options:{...o}};document.body.dataset.ready='false';pump();}
worker.onmessage=ev=>{busy=false;const job=active,data=ev.data;if(data.error){$('status').textContent=data.error;document.body.dataset.error=data.error;pump();return;}if(job&&data.id===job.id){
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(data.position,3));geo.setAttribute('normal',new T.BufferAttribute(data.normal,3));geo.computeBoundingSphere();wood.geometry.dispose();wood.geometry=geo;
 const members=data.edges.map((e:any)=>prepare({...e,a:new T.Vector3(e.a.x,e.a.y,e.a.z),b:new T.Vector3(e.b.x,e.b.y,e.b.z)},job.options));shade.feed(members,job.options);
 const ids=['mature','uneven'].includes(val('specimen'))?[...job.pose.nodes].filter(([,n])=>n.kind!=='op').map(([id])=>id):walk(baseTree).filter(n=>n.kind!=='op').map(n=>n.id);if(ids.join()!==terminalIds.join()){terminalIds=ids;rebuildClusters(job.pose);}else applyPose(job.pose);
 $('status').textContent=`${terminalIds.length} attached crown groups · ${Math.round(data.ms)} ms wood rebuild`;document.body.dataset.ready=String(!pending);document.body.dataset.pose=String(num('pose'));}
 pump();};worker.onerror=e=>{document.body.dataset.error=e.message;$('status').textContent=e.message;};
function resize(){renderer.setSize(innerWidth,innerHeight);const h=8.5;camera.left=-h*innerWidth/innerHeight;camera.right=-camera.left;camera.top=h;camera.bottom=-h;camera.updateProjectionMatrix();}resize();addEventListener('resize',resize);
const labels:Record<string,string>={S4:'Cauliflower billows: larger overlapping bodies with smaller moving shoulder lobes. Forked discharges follow exposed cloud borders.',S5:'Rising anvils: upright turrets spread into broad upper shelves. Same controlled transmission and exterior flashes.',S6:'Rolling banks: low spreading cloud fronts with scalloped moving shoulders. Compare the stronger horizontal silhouette.',S1:'Overlapping lobed volumes, near-black interiors and a narrow coloured fringe. Darkness is composited once, so overlapping lobes do not stack into opaque black.',S2:'Broader low banks of shadow with less vertical bulk. The same depth-aware transmission and edge treatment.',S3:'Taller storm columns: an alternative silhouette, using the same mantle shader.',G1:'Angular textured sprays: directional patches follow woody fans; thin tapered backing replaces rounded cores. Original F5 texture plus F1 angular structure is the reference.',G2:'Layered textured fans: overlapping sprays of leaves along small branches. Original F2 tiering, with F5 texture rather than solid plates.',G3:'Continuous drapes: overlapping textured patches run along hanging twig curves from top to bottom. Original F6 is the reference; no separate solid cap.',F5:'Instanced curved leaf-cluster cards: alpha-tested texture, shaped normals and vertex wind. Density changes card count. Rotate to inspect the volume.',F1:'Low-poly irregular solid clusters. Broad planar surfaces echo the hewn branches; a deliberately geometric extreme.',F2:'Three overlapping flattened lobes per terminal cluster. Layered silhouettes, with open gaps between the tiers.',F3:'Rounded irregular volumes with broad colour variation. A simple solid canopy comparison.',F6:'Tapered hanging volumes with leaf-textured skirts. A hybrid of collective geometry and edge detail.'};
const conceptURL=shadowStudy?new URL('./round-04/shadow-body.png',import.meta.url).href:new URL('./round-02/foliage.png',import.meta.url).href;$('concept').style.backgroundImage=`url(${conceptURL})`;($('conceptLink') as HTMLAnchorElement).href=conceptURL;
function sync(){if(shadowStudy)for(const id of ['visibility','roil'])($(id) as HTMLInputElement).disabled=['S1','S2','S3'].includes(val('style'));if(growthStudy)for(const id of ['normalSharing','shadeDepth','brushScale'])($(id) as HTMLInputElement).disabled=val('finish')!=='painted';if(growthStudy)($('backing') as HTMLInputElement).disabled=['G3','F5'].includes(val('style'));for(const name of ['seed','size','density','spread','pose','wind','light',...(growthStudy?['offshoots','backing','normalSharing','shadeDepth','brushScale']:[]),...(shadowStudy?['opacity','fringe','texture','anger','branchGlow','roil','barkFlow','effectTime']:[])])$(name+'Value').textContent=num(name).toFixed(name==='seed'||name==='light'?0:2);$('method').textContent=labels[val('style')]+(growthStudy&&val('finish')==='painted'?' Painterly volume adds shared canopy normals, grouped colour and irregular brush marks.':'');for(const id of ['density','normals'])($(id) as HTMLInputElement).disabled=!growthStudy&&val('style')!=='F5';const pos:Record<string,string>={S4:'0% 0%',S5:'0% 0%',S6:'0% 0%',S1:'0% 0%',S2:'0% 0%',S3:'0% 0%',G1:'50% 100%',G2:'50% 0%',G3:'100% 100%',F1:'0% 0%',F2:'50% 0%',F3:'100% 0%',F5:'50% 100%',F6:'100% 100%'};$('concept').style.backgroundPosition=pos[val('style')];wind.strength.value=num('wind');woodMat.wireframe=checked('wire');}
for(const id of ['style','size','density','palette','normals','wire',...(growthStudy?['finish']:[]),...(growthStudy?['offshoots','backing','normalSharing','shadeDepth','brushScale']:[])])$(id).addEventListener('input',()=>{sync();if(currentPose)rebuildClusters(currentPose);});
for(const id of ['pose','spread','seed','specimen'])$(id).addEventListener('input',()=>{if(id==='seed'){terminalIds=[];}sync();requestPose();});
$('foliage').onchange=()=>{foliage.visible=checked('foliage');if(currentPose)applyPose(currentPose);};$('sigils').onchange=()=>{if(currentPose)applyPose(currentPose);};if(shadowStudy)for(const id of ['opacity','fringe','texture','anger','branchGlow','roil','barkFlow','effectTime'])$(id).oninput=sync;$('wind').oninput=sync;$('light').oninput=sync;
if(shadowStudy){$('sampleFlash').onclick=()=>{($('animateEffects') as HTMLInputElement).checked=false;($('effectTime') as HTMLInputElement).value=String(hash('delay0')*.16+.015);sync();};$('effectTime').oninput=()=>{($('animateEffects') as HTMLInputElement).checked=false;sync();};}
let playing=false,playClock=0;$('play').onclick=()=>{playing=!playing;playClock=Math.acos(1-2*num('pose'));$('play').textContent=playing?'Pause pose':'Play pose';};$('resetView').onclick=()=>{camera.position.set(14,12,22);camera.zoom=1;orbit.target.set(0,4,0);camera.updateProjectionMatrix();};
const hide=()=>document.body.classList.toggle('clean');$('hide').onclick=hide;addEventListener('keydown',e=>{if(e.key.toLowerCase()==='h'&&!(e.target instanceof HTMLInputElement))hide();});
let previous=performance.now(),total=0,frames=0,clock=0,lastPose=0;
function frame(now:number){requestAnimationFrame(frame);const elapsed=(now-previous)/1000,dt=Math.min(.05,elapsed);previous=now;clock+=dt;wind.time.value=clock;orbit.update();avatar.update(now,dt,false,camera);
 if(playing&&now-lastPose>125){playClock+=.08;($( 'pose') as HTMLInputElement).value=String((1-Math.cos(playClock))/2);sync();requestPose();lastPose=now;}
 const s=val('spill');for(const l of spill){l.color.set(s==='blue'?'#507fcf':s==='amber'?'#c79548':'#9b64cf');l.intensity=s==='off'?0:num('light')*(.93+.07*Math.sin(clock*1.8));}hemi.intensity=s==='off'?1.25:shadowStudy?1:.55;sun.intensity=s==='off'?2:shadowStudy?1.5:1;
 if(shadow){const colour=s==='blue'?'#507fcf':s==='amber'?'#c79548':'#9260d9';const legacy=['S1','S2','S3'].includes(val('style')),effectTime=checked('animateEffects')?clock:num('effectTime');woodMat.emissive.set(colour);woodMat.emissiveIntensity=legacy?num('branchGlow')*.65:0;if(barkEnergy){barkEnergy.barkTint.value.set(colour);barkEnergy.barkClock.value=effectTime;barkEnergy.barkPower.value=legacy?0:num('branchGlow');barkEnergy.barkFlow.value=num('barkFlow');}for(const sigil of sigils.children){const m=sigil.userData.front;if(m){m.emissive.copy(m.color);m.emissiveIntensity=.65;}}shadow.render(scene,camera,{opacity:num('opacity'),fringe:num('fringe'),texture:num('texture'),anger:num('anger'),size:num('size'),colour,form:val('style'),arcs:checked('arcs'),time:effectTime,visibility:val('visibility'),roil:num('roil'),strike:strikePoint,drift:num('wind'),enabled:checked('foliage')});}else renderer.render(scene,camera);frames++;total+=elapsed;if(total>.6){const info={fps:Math.round(frames/total),triangles:renderer.info.render.triangles,calls:renderer.info.render.calls,geometries:renderer.info.memory.geometries,style:val('style'),clusters:terminalIds.length,canopyTriangles};$('stats').textContent=`${info.fps} fps · ${shadowStudy?'cloud '+(shadow?.inspect().volumes??0)+' volumes':'canopy '+info.canopyTriangles.toLocaleString()+' tris'} · scene ${info.calls} draws`;document.body.dataset.stats=JSON.stringify(info);frames=0;total=0;}}
sync();requestPose();requestAnimationFrame(frame);

// Read-only inspection surface for the study's attachment/performance checks.
(window as any).__canopyStudy={inspect:()=>({
 style:val('style'),seed:num('seed'),canopyTriangles,shadow:shadow?.inspect(),
 offshoots:offshoots.map(s=>({id:s.id,member:s.member,t:s.t,visible:s.root.visible,position:s.root.position.toArray(),scale:s.root.scale.x})),
 attachments:terminalIds.map(id=>{const e=currentPose?.edges.find(e=>e.id===id),g=clusters.get(id);return {id,visible:g?.visible??false,position:g?.position.toArray(),endpoint:e?.b.toArray(),scale:g?.scale.x};}),
 finite:wood.geometry.attributes.position?Array.from(wood.geometry.attributes.position.array).every(Number.isFinite):true,
 foliageMeshes:[...clusters.values()].reduce((n,g)=>n+g.children.length,0)
})};
