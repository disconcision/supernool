import {RewriteRecord,recoveryRoute,replayRecovery,recoveryEmbedding} from './recovery-replay';
import {createEncounterPresentation} from './encounter-presentation';
import {EncounterState} from './encounter-sequence';
import {rootedEdges,rootOptions,mountRootControls} from './root-base';
import {setupSettings} from './settings';
import {createStartup} from './startup';
import {createInhabitation} from './inhabited';
import {createBurntBark} from './burnt-bark';
import type {IdlePreview} from './lehi';
import {mountSceneEditor} from './scene-editor';
import {addTravelHandControl} from './hand-travel';
import {setupControlReadouts} from './control-readouts';
import {createMist} from './mist';
import {fitZoom} from './framing';
import * as T from 'three';import {createPerformanceStats} from './stats';import {StanceAdjustment} from './stance';import {createRibbon} from './ribbon';import {ScreenGuides} from './guides';import {addBackdrop} from './backdrop';import {makeClearing} from './terrain';import {makeSigil,disposeSigil} from './sigils';import {setupHUD} from './hud';import {createSound} from './sound';import {directionalContact} from './navigation';import {rules,ruleId,ruleColor,Pin,allowsPin,advanceSpring,catchPull} from './interaction';import {createTraveller} from './traveller';import {Gesture,gestures,scoreDrag} from './gestures';import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Term,Action,initial,walk,count,format,readable,find,actions,replace,solved,hint} from './algebra';import {Pose,layout,transition} from './layout';import {Options,prepare} from './surface';import {makeShading} from './shading';
const $=(id:string)=>document.getElementById(id)!,value=(id:string)=>($(id) as HTMLInputElement).value;
const startup=createStartup();
const inhabitedStudy=new URLSearchParams(location.search).get('inhabited')==='1';let freeStudyCamera=false;
if(inhabitedStudy){document.title='supernool · 019 · Inhabited clearing';document.querySelector('#sceneTitleToggle')!.textContent='supernool · 019';document.querySelector('header h1')!.textContent='Inhabited clearing';document.body.dataset.study='019';}
const renderer=new T.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#bac7c1');renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;$('world').append(renderer.domElement);
const scene=new T.Scene();scene.fog=new T.Fog('#bac7c1',85,185);scene.add(new T.HemisphereLight('#fff5d9','#506451',2));const sun=new T.DirectionalLight('#fff0d0',2.5);sun.position.set(-8,16,10);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-23,right:23,top:23,bottom:-23,near:1,far:80});sun.shadow.bias=-.00012;sun.shadow.normalBias=.025;scene.add(sun);
const camera=new T.OrthographicCamera(-14,14,10,-10,.1,250);camera.position.set(39,32,63);if(new URLSearchParams(location.search).has('matteCapture'))camera.zoom=.78;const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,2,0);controls.enableDamping=true;controls.minZoom=.65;controls.maxZoom=2;controls.maxPolarAngle=Math.PI*.48;controls.mouseButtons={LEFT:null as any,MIDDLE:T.MOUSE.DOLLY,RIGHT:T.MOUSE.ROTATE};controls.update();
let framingFloor=Infinity,preferredZoom=camera.zoom,manualView=false,manualZoom=camera.zoom;
controls.addEventListener('start',()=>{manualView=true;manualZoom=camera.zoom;});
controls.addEventListener('change',()=>{if(manualView&&Math.abs(camera.zoom-manualZoom)>1e-6){preferredZoom=camera.zoom;manualZoom=camera.zoom;}});
controls.addEventListener('end',()=>{manualView=false;});
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h);camera.left=-11*w/h;camera.right=11*w/h;camera.top=11;camera.bottom=-11;const painted=value('backdrop')==='painted'&&!new URLSearchParams(location.search).has('matteCapture');controls.minZoom=Math.min(framingFloor,painted?Math.max(.9,.9*w/h/(16/9)):.65);controls.maxZoom=Math.max(2,controls.minZoom*1.5);controls.enableRotate=!inhabitedStudy||freeStudyCamera;controls.enablePan=inhabitedStudy?freeStudyCamera:!painted;if(freeStudyCamera){controls.minZoom=.25;controls.maxZoom=4;}camera.updateProjectionMatrix();}addEventListener('resize',resize);resize();
const backdrop=addBackdrop(scene,$('world'),renderer);backdrop.set(new URLSearchParams(location.search).has('matteCapture')?'block':'painted');
backdrop.setGroundShadows(true);
const preClearing=new Set(scene.children);const clearing=makeClearing(scene),obstacles=clearing.obstacles;for(const o of scene.children)if(!preClearing.has(o))o.userData.matteExclude=true;
function mesh(geo:T.BufferGeometry,mat:T.Material,pos:T.Vector3){const m=new T.Mesh(geo,mat);m.position.copy(pos);scene.add(m);return m;}
const mist=createMist(renderer);
const stats=createPerformanceStats(renderer);const ribbon=createRibbon(scene),stance=new StanceAdjustment();let stanceMoving=false;
const sound=createSound();addEventListener('pointerdown',e=>{if(e.isTrusted)sound.unlock();});addEventListener('keydown',e=>{if(e.isTrusted)sound.unlock();});
const treeScale=1.35*1.15*.92,treeOrigin=new T.Vector3(-1,0,-3),hero=new T.Group();hero.position.copy(treeOrigin);hero.scale.setScalar(treeScale);scene.add(hero);
const treeWorld=(p:T.Vector3)=>p.clone().multiplyScalar(treeScale).add(treeOrigin);
const ring=mesh(new T.RingGeometry(5.5,5.58,80),new T.MeshBasicMaterial({color:'#e6ddb7',side:T.DoubleSide,transparent:true,opacity:.45}),treeOrigin.clone().setY(.025));ring.rotation.x=-Math.PI/2;
const preLehi=new Set(scene.children);const lehi=createTraveller(scene, message=>$('characterStatus').textContent=message),avatar=lehi.root;for(const o of scene.children)if(!preLehi.has(o))o.userData.matteExclude=true;avatar.position.set(0,0,9);lehi.setIdleTerrain(clearing.canFingerWalk);
lehi.setCatchProps(clearing.catchProps,p=>Math.hypot(p.x,p.z)<13&&!obstacles.some(o=>Math.hypot(p.x-o.x,p.z-o.z)<o.r+.65));
clearing.setGroundShadows(true);
const treeShade=makeShading(),gradient=new T.DataTexture(new Uint8Array([45,110,185,255]),4,1,T.RedFormat);gradient.minFilter=gradient.magFilter=T.NearestFilter;gradient.needsUpdate=true;
const wood=()=>new T.MeshStandardMaterial({color:'#bba078',roughness:.9});const cel=()=>new T.MeshToonMaterial({color:'#bba078',gradientMap:gradient});
const materials={carved:treeShade.carved(wood()),cel:treeShade.carved(cel()),smooth:wood(),smoothCel:cel()};
const treeMesh=new T.Mesh<T.BufferGeometry,T.Material>(new T.BufferGeometry(),materials.carved);treeMesh.position.y=5;treeMesh.scale.setScalar(6);treeMesh.castShadow=true;treeMesh.receiveShadow=true;hero.add(treeMesh);
const runes=new T.Group();hero.add(runes);
const inhabitation=createInhabitation(renderer,scene,camera,treeMesh,Object.values(materials),treeWorld,treeScale,clearing.touchPoints,backdrop,sun,(kind,power,pan)=>sound.thunder(kind,power,pan));
const burntBark=createBurntBark(Object.values(materials));
const encounter=createEncounterPresentation(scene,treeOrigin,treeScale);
const mayRewrite=()=>document.body.dataset.sceneEditing!=='true'&&(!encounter.enabled||encounter.sequence.state==='active');
let tree=initial(),selected=tree.id,steps=0,history:{tree:Term;steps:number}[]=[],future:{tree:Term;steps:number}[]=[],near=false,loaded=false,epoch=0,shapeSeed=2,spread=1,navTarget:T.Vector3|undefined,suggested:{id:string;key:string}|undefined;
let hostTree=tree,recoveryTree:Term|undefined,hostSpread=1,insideRing=false;
let rewriteTrace:RewriteRecord[]=[],redoTrace:RewriteRecord[]=[],recoveryTrace:RewriteRecord[]=[];
function prepareRecovery(){const route=recoveryRoute(tree,rewriteTrace);recoveryTree=route.reduced;recoveryTrace=route.records;}
let exitAfterSettle=false;
let animation:{before:Term;after:Term;start:number;kind:string;merge:Record<string,string>;from:number;to:number;duration:number}|undefined,poseNow:Pose|undefined,lastKey='',idCounter=0;
function options():Options{return {...rootOptions(),thickness:+value('thickness'),taper:+value('taper'),bow:+value('bow'),random:+value('random'),twist:+value('twist'),facets:+value('facets'),seed:shapeSeed,blend:+value('blend'),hewn:value('surface')==='hewn',spread};}
function layoutOptions(){return {spread,seed:shapeSeed,irregularity:+value('irregularity'),height:value('height')};}
function updateRunes(pose:Pose){runes.children.forEach(disposeSigil);runes.clear();for(const [id,n] of pose.nodes){const p=pose.points.get(id);if(!p)continue;
 const s=makeSigil(n.kind==='op'?(n.op==='*'?'×':'+'):n.kind==='num'?String(n.value):n.name,n.kind==='op',id===selected,value('sigils'));
 s.position.copy(p).add(new T.Vector3(0,.22,.05));s.scale.setScalar((n.kind==='op'?.98:.91)*(id===selected?1.12:1));s.traverse(o=>o.userData.nodeId=id);s.userData.nodeId=id;runes.add(s);
 }runes.visible=near&&mayRewrite();}

type Job={id:number;kind:'hero'|'deco';epoch:number;pose:Pose;options:Options;resolution:number;final:boolean;origin?:T.Vector3;scale?:number};
let queue:Job[]=[],inflight:Job|undefined;const worker=new Worker(new URL('./mesh.worker.ts',import.meta.url),{type:'module'});
function pump(){if(inflight||!queue.length)return;inflight=queue.shift()!;worker.postMessage({id:inflight.id,edges:rootedEdges(inflight.pose.edges,inflight.options),options:inflight.options,resolution:inflight.resolution});}
function submit(job:Job){if(job.kind==='hero')queue=queue.filter(j=>j.kind!=='hero');queue.push(job);pump();}
worker.onmessage=event=>{const job=inflight;inflight=undefined;const data=event.data;if(!job||data.id!==job.id){pump();return;}if(data.error){if(!loaded)startup.fail('The tree could not be built. Please try again.');$('message').textContent='The surface could not be rebuilt: '+data.error;animation=undefined;ui();pump();return;}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(data.position,3));geo.setAttribute('normal',new T.BufferAttribute(data.normal,3));geo.computeBoundingSphere();
 if(job.kind==='hero'&&job.epoch===epoch){treeMesh.geometry.dispose();treeMesh.geometry=geo;const members=data.edges.map((e:any)=>prepare({...e,a:new T.Vector3(e.a.x,e.a.y,e.a.z),b:new T.Vector3(e.b.x,e.b.y,e.b.z)},job.options));const shifted=members.map((m:any)=>({...m,r:m.r*treeScale,tip:m.tip*treeScale,flare:m.flare*treeScale,e:{...m.e,a:treeWorld(m.e.a),b:treeWorld(m.e.b)},points:m.points.map(treeWorld)}));treeShade.feed(shifted,{...job.options,blend:job.options.blend*treeScale});poseNow=job.pose;if(mayRewrite())updateRunes(job.pose);else runes.visible=false;loaded=true;$('cost').textContent=`${data.position.length/9|0} triangles · ${Math.round(data.ms)} ms worker rebuild. Camera and walking stay on the main thread.`;$('world').dataset.nodes=String(count(tree));$('world').dataset.term=format(tree);$('world').dataset.meshing='ready';
  if(job.final&&animation){finishSettling();}else if(!animation&&!grip&&mayRewrite())ui(false);
 }else if(job.kind==='deco'){const s=job.scale!;const shade=makeShading();const mat=shade.carved(new T.MeshStandardMaterial({color:'#857a69',roughness:.93}));const transform=(p:T.Vector3)=>p.clone().multiplyScalar(s).add(job.origin!);const members=data.edges.map((e:any)=>prepare({...e,a:new T.Vector3(e.a.x,e.a.y,e.a.z),b:new T.Vector3(e.b.x,e.b.y,e.b.z)},job.options));shade.feed(members.map((m:any)=>({...m,r:m.r*s,tip:m.tip*s,flare:m.flare*s,e:{...m.e,a:transform(m.e.a),b:transform(m.e.b)},points:m.points.map(transform)})),{...job.options,blend:job.options.blend*s});const obj=new T.Mesh(geo,mat);obj.scale.setScalar(6*s);obj.position.copy(job.origin!).add(new T.Vector3(0,5*s,0));obj.castShadow=true;obj.userData.matteExclude=true;scene.add(obj);}else geo.dispose();pump();};
worker.onerror=e=>{startup.fail('The tree renderer could not start. Please try again.');$('message').textContent='Tree renderer error: '+e.message;};
function finishSettling(){
 animation=undefined;selected=find(tree,selected)?selected:tree.id;
 if(exitAfterSettle){if(encounter.enabled){prepareRecovery();encounter.sequence.paused=false;encounter.sequence.jump('release');}exitAfterSettle=false;clearMovement();handFocus=false;pin=undefined;hoverId=undefined;spotlight=undefined;lingerPoint=undefined;lastGesture=undefined;}
 ui();
}
// Slow framing during tree interaction only; wandering preserves the current zoom.
function frameTree(dt:number){
 if(!poseNow||document.body.dataset.sceneEditing==='true'||new URLSearchParams(location.search).has('matteCapture'))return;
 const cinematic=encounter.enabled&&(['awakening','release','recovery'].includes(encounter.sequence.state)||['healthy','active'].includes(encounter.sequence.state)&&encounter.sequence.age<3);
 const active=!freeStudyCamera&&(cinematic||(bodyMode()?handFocus:!!grip||!!animation));
 $('world').dataset.autoFraming=String(active);
 if(!active){
  $('world').dataset.cameraZoom=camera.zoom.toFixed(5);
  $('world').dataset.fitZoom=camera.zoom.toFixed(5);
  $('world').dataset.preferredZoom=preferredZoom.toFixed(5);
  return;
 }
 const poses=[poseNow];
 // Anticipate the chosen endpoint, so the camera starts making room during the pull.
 const after=grip?.chosen?.after??animation?.after;
 if(after)poses.push(layout(after,layoutOptions()));
 const framePoints:T.Vector3[]=[];
 for(const pose of poses){
  for(const p of pose.points.values())framePoints.push(treeWorld(p));
  for(const edge of pose.edges)for(const p of prepare(edge,options()).points)framePoints.push(treeWorld(p));
 }
 // Include glyphs, branch thickness and the contact hand, not just the skeleton.
 const desired=Math.min(preferredZoom,Math.max(.25,fitZoom(camera,framePoints,innerWidth,innerHeight,(encounter.enabled&&encounter.sequence.state!=='dormant'?2.1:.55)*treeScale)));
 if(!manualView&&Math.abs(desired-camera.zoom)>.0005){
  framingFloor=Math.min(framingFloor,desired);controls.minZoom=Math.min(controls.minZoom,framingFloor);
  camera.zoom=T.MathUtils.lerp(camera.zoom,desired,1-Math.exp(-dt*(desired<camera.zoom?.7:.45)));camera.updateProjectionMatrix();
 }
 $('world').dataset.cameraZoom=camera.zoom.toFixed(5);
 $('world').dataset.fitZoom=desired.toFixed(5);$('world').dataset.preferredZoom=preferredZoom.toFixed(5);
}
function requestPose(now:number){
 const channels=encounter.sequence.sample(encounter.timing),sequenced=encounter.enabled;
 const elapsed=animation?Math.min(1,(now-animation.start)/animation.duration):1;
 const u=grip?.chosen?grip.progress:animation?animation.from+(animation.to-animation.from)*elapsed:1,quant=Math.round(u*48)/48;
 const config=layoutOptions(),growth=channels.state==='healthy'?1:channels.state==='recovery'?Math.round(Math.min(1,encounter.sequence.age/encounter.timing.recovery)*480)/480:0,rear=sequenced?Math.round(channels.rear*100)/100:0;
 const key=JSON.stringify([epoch,tree.id,format(tree),grip?.chosen?.action.key,animation?.kind,animation?elapsed===1:false,quant,Math.round(spread*25),config,options(),value('resolution'),sequenced?channels.state:'off',growth,rear,encounter.flow]);
 if(key===lastKey)return;lastKey=key;
 const replay=sequenced&&channels.recovering?replayRecovery(recoveryTrace,hostTree,growth,config,options(),hostSpread,encounter.flow):undefined;
 let pose=replay?replay.pose:sequenced&&channels.state==='release'?layout(recoveryTree??tree,config):grip?.chosen?transition(tree,grip.chosen.after,quant,config,grip.chosen.action.key,grip.chosen.action.merge,options()):animation?transition(animation.before,animation.after,quant,config,animation.kind,animation.merge,options()):layout(tree,config);
 if(sequenced&&channels.recovering)pose={...pose,nodes:new Map(walk(hostTree).map(n=>[n.id,n]))};
 if(rear){const raise=(p:T.Vector3)=>new T.Vector3(p.x,p.y*(1+rear),p.z);pose={...pose,points:new Map([...pose.points].map(([id,p])=>[id,raise(p)])),edges:pose.edges.map(e=>({...e,a:raise(e.a),b:raise(e.b),curve:e.curve?raise(e.curve):undefined}))};}
 $('world').dataset.recoveryMove=replay?replay.phase==='rewind'?`Undo ${replay.kind} (${replay.index+1}/${recoveryTrace.length})`:'Return to spatial tree':'';
 submit({id:++idCounter,kind:'hero',epoch,pose,options:replay?{...options(),spread:replay.spread}:options(),resolution:+value('resolution'),final:!grip&&(!animation||elapsed===1)});$('world').dataset.meshing='working';
}

for(const [x,z,scale] of [[-8,-5,.6],[7,-7,.75]]){const root=initial();const t=root.kind==='op'?root.left:root;const opt={...options(),spread:1,hewn:true,thickness:.62,taper:.85,bow:.42,random:.55,twist:.32,facets:.45,blend:.08,rootFlare:.7,rootAmount:.45,seed:Math.round(x+20)};submit({id:++idCounter,kind:'deco',epoch,pose:layout(t,{spread:1,irregularity:.5,height:'depth',seed:opt.seed}),options:opt,resolution:112,final:true,origin:new T.Vector3(x,0,z),scale});}
function status(text:string){$('message').textContent=text;}
function nextClue(){
 const nodes=walk(tree);
 if(nodes.some(n=>n.kind==='num'&&n.value===0))return 'Hold a rune and pull. Press zeros into their junctions, or carry a branch around its sibling. Suggest a grip shows one route.';
 if(nodes.some(n=>actions(n).some(a=>a.key.startsWith('factor'))))return 'The x-products now share a junction. Bring one x rune to the other x to factor the shared branch.';
 if(nodes.some(n=>actions(n).some(a=>a.key==='calculate')))return 'The numeric leaves can combine. Gather the numbers into their + junction to finish the simplification.';
 return 'Bring the two x-products under one + junction. Swapping and regrouping preserve the whole branches.';
}
function ui(updateMessage=true){const busy=!!animation||!!grip;const done=solved(tree)&&!busy;$('expression').textContent=readable(tree);$('progress').textContent=`${count(tree)} nodes · ${steps} moves · start: 13 nodes`;$('bar').style.width=Math.min(100,Math.max(0,(13-count(tree))/8*100))+'%';$('goal').textContent=done?'5×x + y · same meaning, less structure.':'Simplify this tree to 5×x + y.';$('guideTitle').textContent=done?'Paths opened':'Help';$('approach').hidden=near;$('hint').hidden=!near||done;($('hint') as HTMLButtonElement).disabled=busy||!loaded;
 ($('undo') as HTMLButtonElement).disabled=!history.length||busy;($('redo') as HTMLButtonElement).disabled=!future.length||busy;($('reset') as HTMLButtonElement).disabled=busy;($('settingsButton') as HTMLButtonElement).disabled=busy;
 ($('inputMode') as HTMLSelectElement).disabled=busy;($('pinButton') as HTMLButtonElement).disabled=busy;($('clearPin') as HTMLButtonElement).disabled=busy||!pin;
 $('pinStatus').textContent=pin?'Holding '+format(find(tree,pin.id)!)+': position and incoming connection fixed.':'Second hand rests. F or Shift-click pins a node.';
 for(const box of document.querySelectorAll<HTMLInputElement>('#ruleList input'))box.disabled=busy;
 $('equippedCount').textContent=`${enabled.size} / ${rules.length} rules equipped`;
 for(const control of document.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLButtonElement>('#settings input,#settings select,#seed,#resetView'))control.disabled=busy||!!pin;
 $('selection').hidden=!near||!loaded||(bodyMode()&&!handFocus);const n=find(tree,selected);$('actions').replaceChildren();$('outline').replaceChildren();
 if(n){$('selectedLabel').textContent=readable(n);$('selectedHelp').textContent=n.kind==='op'?'Hold a rune and pull toward a destination. The other hand rests unless you pin a node.':'Grip this rune to move its branch. Available destinations appear while you hold it.';
 for(const a of actions(n).filter(a=>allowed(n,a))){const b=document.createElement('button');b.textContent="Show: "+a.label;const small=document.createElement('small');small.textContent=a.detail;b.append(small);b.disabled=busy||spread>.12;if(suggested?.id===n.id&&suggested.key===a.key)b.className='suggested';b.onclick=()=>showGesture(n,a);$('actions').append(b);}
 }
 for(const node of walk(tree)){const b=document.createElement('button');b.textContent=(node.kind==='op'?'◇ ':'· ')+format(node);b.onclick=()=>select(node.id);b.disabled=busy;$('outline').append(b);}
 if(updateMessage)status(done?'You used local rewrites to uncover the simpler tree. Walk on, or press Space to reach back in and explore the simpler tree.':animation?'The hands are letting the tree settle…':near?nextClue():'Walk into its pale stone circle. The branches will settle into a working plane.');
 if(poseNow)updateRunes(poseNow);}
function select(id:string){if(animation||grip||!near)return;selected=id;hoverId=undefined;ui(false);}
function showGesture(n:Term,a:Action){if(bodyMode()&&!handFocus)setHandFocus(true);spotlight=gestures(tree).find(g=>g.owner.id===n.id&&g.action.key===a.key&&allowed(g.owner,g.action));if(spotlight){selected=spotlight.gripId;ui(false);status(spotlight.instruction+'. Grip the contact, then follow its colored path. Spell names are listed separately.');drawGuides();}}
$('hint').onclick=()=>{if(!near||animation||grip)return;const h=hint(tree,(owner,a,t)=>allowed(owner,a,t));if(h){showGesture(find(tree,h.nodeId)!,h.action);}else status('No route found with the equipped rules and pin. Release the pin or re-enable rules in the noolbox; undo is also available.');};
$('undo').onclick=()=>{if(animation||grip||!history.length)return;if(encounter.enabled)encounter.sequence.jump('active');const record=rewriteTrace.pop();if(record)redoTrace.push(record);future.push({tree,steps});const prev=history.pop()!;tree=prev.tree;steps=prev.steps;epoch++;selected=tree.id;suggested=undefined;spotlight=undefined;pin=undefined;lastKey='';ui();drawGuides();};
$('redo').onclick=()=>{if(animation||grip||!future.length)return;if(encounter.enabled)encounter.sequence.jump('active');const record=redoTrace.pop();if(record)rewriteTrace.push(record);history.push({tree,steps});const next=future.pop()!;tree=next.tree;steps=next.steps;epoch++;selected=tree.id;suggested=undefined;spotlight=undefined;pin=undefined;lastKey='';ui();drawGuides();};
$('reset').onclick=()=>{if(animation||grip)return;tree=initial();hostTree=tree;rewriteTrace=[];redoTrace=[];recoveryTrace=[];recoveryTree=undefined;hostSpread=+value('spread');if(encounter.enabled)encounter.sequence.jump('dormant');selected=tree.id;history=[];future=[];steps=0;epoch++;suggested=undefined;spotlight=undefined;pin=undefined;lastKey='';ui();drawGuides();};
$('approach').onclick=()=>navTarget=new T.Vector3(0,0,bodyMode()?-.8:1.7);
$('settingsButton').onclick=()=>$('settings').hidden=!$('settings').hidden;$('closeSettings').onclick=()=>$('settings').hidden=true;
$('character').onchange=()=>lehi.choose(value('character'));
$('palette').onchange=()=>{lehi.setPalette(value('palette'));$('world').dataset.palette=value('palette');};
$('sigils').onchange=()=>{if(poseNow)updateRunes(poseNow);};
$('lighting').onchange=()=>{treeMesh.material=materials[value('lighting') as keyof typeof materials];};
for(const id of ['surface','resolution','thickness','taper','bow','random','irregularity','twist','facets','blend','spread','height'])$(id).addEventListener('input',()=>{lastKey='';});$('seed').onclick=()=>{shapeSeed++;lastKey='';};
type ScreenPoint={x:number;y:number};
type Grip={id:string;options:Gesture[];chosen?:Gesture;intent?:Gesture;progress:number;target:number;velocity:number;ready:boolean;cursorReady:boolean;caught:boolean;cursor:ScreenPoint;feedbackCursor?:ScreenPoint;from:ScreenPoint;keyboard:boolean;body:boolean;avatarStart:T.Vector3;gain:number;zoom:number;anchors:Map<Gesture,{from:ScreenPoint;to:ScreenPoint}>};
let grip:Grip|undefined,spotlight:Gesture|undefined,hoverId:string|undefined,activeHand=0,lastGesture:Gesture|undefined;
let handFocus=false;const releasedBeforeReuse=new Set<string>(),heldDirections=new Set<string>();
let pin:Pin|undefined,lingerPoint:T.Vector3|undefined,lastContactAt=0;
const enabled=new Set(rules.map(r=>r.id));
const keys=new Set<string>(),ray=new T.Raycaster(),pointer=new T.Vector2(),plane=new T.Plane(new T.Vector3(0,1,0),0),walkVelocity=new T.Vector3();
const guideSvg=$('gestureGuide'),spells=$('spells'),screenGuides=new ScreenGuides(scene);
const bodyMode=()=>value('inputMode')==='body';
function screen(p:T.Vector3):ScreenPoint{const v=p.clone().project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};}
function worldPoint(id:string,pose=poseNow){const p=pose?.points.get(id);return p?treeWorld(p):undefined;}
function allowed(owner:Term,action:Action,source=tree){return mayRewrite()&&enabled.has(ruleId(owner,action))&&allowsPin(source,owner,action,pin,layoutOptions());}
function anchors(g:Gesture){const before=layout(tree,layoutOptions()),after=layout(g.after,layoutOptions());const from=screen(treeWorld(before.points.get(g.gripId)!));
 const endpoint=g.action.key==='swap'||g.action.key.startsWith('group')?after.points.get(g.gripId)!:(after.points.get(g.targetId)??before.points.get(g.targetId))!;
 const to=screen(treeWorld(endpoint));return {from,to};}
function available(id:string){return gestures(tree,id).filter(g=>allowed(g.owner,g.action)).filter(g=>{const a=anchors(g);return Math.hypot(a.to.x-a.from.x,a.to.y-a.from.y)>10;});}
function togglePin(id=selected){if(grip||animation||!near||spread>.12)return;if(pin?.id===id)pin=undefined;else{const p=poseNow?.points.get(id);if(!p)return;pin={id,position:{x:p.x,y:p.y,z:p.z}};}spotlight=undefined;ui(false);status(pin?'The other hand holds this node fixed. Moves that relocate or reparent it are unavailable.':'Second-hand pin released.');}
function beginGrip(id:string,at:ScreenPoint,keyboard=false){if(!mayRewrite())return;if(bodyMode()&&!handFocus)return;if(animation||grip||!near||spread>.12||!loaded)return;const list=available(id);selected=id;if(!list.length){ui(false);status('No equipped gesture can move this contact with the current pin. Choose another node, release the pin, or open the noolbox.');return;}
 grip={id,options:list,progress:0,target:0,velocity:0,ready:false,cursorReady:false,caught:false,cursor:at,from:at,keyboard:keyboard||bodyMode(),body:bodyMode(),avatarStart:avatar.position.clone(),gain:+value('pullGain'),zoom:camera.zoom,anchors:new Map(list.map(g=>[g,anchors(g)]))};sound.start();clearMovement();controls.enabled=false;renderer.domElement.style.cursor='grabbing';epoch++;lastKey='';ui(false);status(bodyMode()?'GRIP · Keep Space held. Arrows move the traveller to pull; release Space to settle.':'Hold and pull along a colored path. Return to the source to change direction.');}
function updateGrip(at:ScreenPoint){if(!grip)return;const h=grip;h.feedbackCursor=at;
 // Camera fitting must not manufacture body pull or shift a frozen gesture's target.
 if(!h.keyboard){const ratio=h.zoom/camera.zoom;at={x:innerWidth/2+(at.x-innerWidth/2)*ratio,y:innerHeight/2+(at.y-innerHeight/2)*ratio};}
 const candidates=h.options.map(g=>{const a=h.anchors.get(g)!,score=scoreDrag(a.from,a.to,at);return {g,...score,rank:score.distance+(score.progress<=0?100:0)};}).sort((a,b)=>a.rank-b.rank);
 const best=candidates[0];if(!best)return;
 const chosen=h.caught&&h.chosen?h.chosen:h.intent??(h.chosen&&h.target>.12?h.chosen:best.g);const a=h.anchors.get(chosen)!,result=catchPull(h.caught,a.from,a.to,at),was=h.caught;
 h.chosen=chosen;h.caught=result.caught;h.target=result.progress;h.ready=h.caught;h.cursorReady=h.caught;
 if(h.caught&&!was)sound.catch();else if(was&&!h.caught)sound.uncatch();else sound.progress(h.target,chosen.owner.kind==='op'&&chosen.owner.op==='*');
 if(!h.body)h.progress=h.target;
 if(h.target<.035&&!h.caught&&h.progress<.04&&!h.intent){h.chosen=undefined;h.ready=false;}
 if(h.chosen)status(h.caught?'Ready · release to finish. Move back past halfway to reverse.':h.chosen.instruction+'. '+(h.body?'Move to pull; step back to relax.':'Follow the path; return to reverse.'));

}
function releaseGrip(allow=true){const h=grip;if(!h)return;const g=h.chosen,commit=allow&&h.ready;if(h.body)clearMovement();grip=undefined;controls.enabled=true;renderer.domElement.style.cursor='grab';epoch++;lastKey='';
 sound.finish(!!commit);const p=worldPoint(h.id);if(p)lingerPoint=p;lastContactAt=performance.now();
 if(g&&(commit||h.progress>.005)){lastGesture=g;const before=tree;exitAfterSettle=!!commit&&!solved(before)&&solved(g.after);if(commit){rewriteTrace.push({before,after:g.after,kind:g.action.key,merge:{...g.action.merge}});redoTrace=[];history.push({tree,steps});future=[];tree=g.after;steps++;hoverId=undefined;selected=find(tree,g.gripId)?g.gripId:g.action.result.id;spotlight=undefined;}
 animation={before,after:g.after,kind:g.action.key,merge:g.action.merge??{},start:performance.now(),from:h.progress,to:commit?1:0,duration:commit?Math.max(180,(1-h.progress)*500):350};
 }else lastGesture=undefined;ui(false);status(commit?'The rewrite settles under your hands.':'Released without changing the expression.');}
function chooseContact(offset:number){if(grip||animation||!near)return;const nodes=walk(tree);const i=nodes.findIndex(n=>n.id===selected);selected=nodes[(i+offset+nodes.length)%nodes.length].id;hoverId=undefined;spotlight=undefined;lingerPoint=worldPoint(selected);lastContactAt=performance.now();ui(false);}
// Do not carry a held walking key across walk / hand / pull transitions.
function clearMovement(){for(const key of heldDirections)releasedBeforeReuse.add(key);keys.clear();navTarget=undefined;walkVelocity.setScalar(0);}
function setHandFocus(on:boolean){if(on&&!mayRewrite()){status('This tree is '+encounter.sequence.state+'. Wait for awakening, or use the encounter preview controls.');return;}if(grip||animation)return;if(on&&(!near||spread>.12||!loaded)){status('Let the tree settle, then press Space to reach in.');return;}
 clearMovement();handFocus=on;hoverId=undefined;spotlight=undefined;
 lingerPoint=on?worldPoint(selected):undefined;
 if(!on)pin=undefined;
 ui(false);status(on?'HAND · Arrows move between sigils. Hold Space on a contact, then use arrows to pull with the traveller.':'WALK · Arrows move the traveller. Press Space near the tree to reach in.');
}
function navigateHand(dx:number,dy:number){if(!poseNow||animation)return;
 const contacts=Array.from(poseNow.points,([id,p])=>({id,...screen(treeWorld(p))}));
 const next=directionalContact(contacts,selected,dx,dy);
 if(next!==selected){selected=next;spotlight=undefined;lingerPoint=worldPoint(next);lastContactAt=performance.now();ui(false);}
}
function drawGuides(){
 const validHover=hoverId&&find(tree,hoverId)?hoverId:undefined;
 const focus=grip?.id??spotlight?.gripId??(bodyMode()?selected:validHover??selected);
 const list=near&&(!bodyMode()||handFocus)?(grip?.options??available(focus)):[];guideSvg.replaceChildren();screenGuides.begin();
 const selectedKey=grip?.chosen?.action.key??spotlight?.action.key;
 const signature=JSON.stringify([list.map(g=>[g.owner.id,g.action.key]),selectedKey,grip?.ready,bodyMode(),pin?.id,value('spellPlacement')]);
 if(spells.dataset.signature!==signature){spells.dataset.signature=signature;spells.replaceChildren();for(const [i,g]of list.entries()){const row=document.createElement('div');row.className='spell'+(g.action.key===selectedKey?' active':'');row.style.setProperty('--spell',ruleColor(g.owner,g.action));row.textContent=`${i+1} · ${g.action.label}`;spells.appendChild(row);}}
 const minY=poseNow?Math.min(...Array.from(poseNow.points.values()).map(p=>screen(treeWorld(p)).y)):200;
 const above=value('spellPlacement')==='above'&&minY>125;spells.className=above?'above':'side';
 if(above&&spells.parentElement!==document.body)document.body.appendChild(spells);else if(!above&&spells.parentElement!==$('selection'))$('selection').insertBefore(spells,$('spellEmpty'));
 $('spellEmpty').hidden=list.length>0;$('spellCount').textContent=`${list.length} available · ${pin?'second hand pinned':'second hand resting'}`;
 const el=(name:string,attrs:Record<string,string|number>)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',name);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,String(v));guideSvg.appendChild(n);screenGuides.add(name,attrs);return n;};
 for(const [i,g]of list.entries()){const a=anchors(g),color=ruleColor(g.owner,g.action),active=g.action.key===selectedKey,opacity=selectedKey&&!active?.55:.9;
 if(value('guideStyle')==='paths'||(value('guideStyle')==='auto'&&!bodyMode()))el('path',{d:`M ${a.from.x} ${a.from.y} L ${a.to.x} ${a.to.y}`,stroke:color,'stroke-width':active?2.5:1.5,opacity,'stroke-dasharray':i%2?'4 5':'none',fill:'none'});
 el('circle',{'data-role':'destination','data-rule':g.action.key,cx:a.to.x,cy:a.to.y,r:active&&grip?.ready?8:6,fill:color,opacity});
 if(value('guideStyle')==='branches'&&poseNow){const root=find(tree,g.gripId);const ids=new Set(root?walk(root).map(n=>n.id):[]);for(const edge of poseNow.edges)if(ids.has(edge.id)){const x=screen(treeWorld(edge.a)),y=screen(treeWorld(edge.b));el('path',{d:`M ${x.x} ${x.y} L ${y.x} ${y.y}`,stroke:color,'stroke-width':3,opacity:active?.6:.2,fill:'none'});}}
 }
 if(grip?.chosen){$('catchFeedback').textContent=grip.caught?'Ready · release to finish':'Pull to reshape · move back to reverse';$('catchFeedback').style.color=grip.caught?'#467035':ruleColor(grip.chosen.owner,grip.chosen.action);$('catchFeedback').hidden=false;
 }else $('catchFeedback').hidden=true;
 if(list.length){const a=anchors(list[0]);el('circle',{'data-role':'source',cx:a.from.x,cy:a.from.y,r:2,fill:'#f8e6a2',stroke:'#4c6554','stroke-width':1});}
 if(pin){const p=worldPoint(pin.id);if(p){const a=screen(p);el('path',{d:`M ${a.x-5} ${a.y+10} L ${a.x+5} ${a.y+10}`,stroke:'#45665d','stroke-width':3});}}
 const requestedHeld=grip?.id??(animation?lastGesture?.gripId:undefined);const glowId=runes.children.some(s=>s.userData.nodeId===requestedHeld)?requestedHeld:(grip?.chosen??lastGesture)?.action.result.id;
 const contactId=near&&!grip&&!animation?(bodyMode()?(handFocus?selected:undefined):hoverId):undefined;
 $('world').dataset.contactGlow=contactId??'';
 for(const s of runes.children){s.quaternion.copy(camera.quaternion);if(value('sigils')!=='legacy')s.rotateY(.16);const held=!!(grip||animation)&&s.userData.nodeId===glowId,contact=s.userData.nodeId===contactId;
 if(s.userData.front){s.userData.front.emissive.set(held||contact?'#b6eff0':s.userData.nodeId===pin?.id?'#204035':'#000000');s.userData.front.emissiveIntensity=held?.85:contact?.14:1;}
 if(s.userData.halo)s.userData.halo.visible=held||contact;if(s.userData.aura)s.userData.aura.uniforms.strength.value=held?.8:contact?.13:0;}
 screenGuides.finish(!document.body.classList.contains('clean-view'));$('world').dataset.guideMode=value('guideStyle')==='auto'?(bodyMode()?'points':'paths'):value('guideStyle');$('world').dataset.candidates=String(list.length);$('world').dataset.pin=pin?.id??'none';
}
function pick(e:{clientX:number;clientY:number}){pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(pointer,camera);return near?ray.intersectObjects(runes.children,true)[0]?.object.userData.nodeId as string|undefined:undefined;}
let groundDown:ScreenPoint|undefined;
renderer.domElement.tabIndex=0;
renderer.domElement.addEventListener('pointerdown',e=>{if(freeStudyCamera||document.body.dataset.sceneEditing==='true')return;if(e.button!==0)return;renderer.domElement.focus();const id=pick(e);if(id){if(e.shiftKey){togglePin(id);return;}if(bodyMode()){if(!handFocus)setHandFocus(true);select(id);lingerPoint=worldPoint(id);return;}beginGrip(id,{x:e.clientX,y:e.clientY});if(grip)renderer.domElement.setPointerCapture(e.pointerId);}else if(!bodyMode()||!handFocus)groundDown={x:e.clientX,y:e.clientY};});
renderer.domElement.addEventListener('pointermove',e=>{if(freeStudyCamera||document.body.dataset.sceneEditing==='true')return;if(grip&&!grip.keyboard)updateGrip({x:e.clientX,y:e.clientY});else if(!grip&&!bodyMode()){
 hoverId=pick(e);if(hoverId){lingerPoint=worldPoint(hoverId);lastContactAt=performance.now();}else if(near&&lingerPoint){const floatingPlane=new T.Plane().setFromNormalAndCoplanarPoint(camera.getWorldDirection(new T.Vector3()),lingerPoint);const p=ray.ray.intersectPlane(floatingPlane,new T.Vector3());if(p&&p.distanceTo(treeOrigin.clone().setY(4))<9)lingerPoint=p;}
 renderer.domElement.style.cursor=hoverId?'grab':'default';
}});
renderer.domElement.addEventListener('pointerup',e=>{if(freeStudyCamera||document.body.dataset.sceneEditing==='true')return;if(e.button!==0)return;if(grip&&!grip.keyboard){releaseGrip();if(renderer.domElement.hasPointerCapture(e.pointerId))renderer.domElement.releasePointerCapture(e.pointerId);}else if(groundDown&&Math.hypot(e.clientX-groundDown.x,e.clientY-groundDown.y)<5){pick(e);const p=ray.ray.intersectPlane(plane,new T.Vector3());if(p&&Math.hypot(p.x,p.z)<14)navTarget=p.setY(0);}groundDown=undefined;});
renderer.domElement.addEventListener('pointercancel',()=>releaseGrip(false));
addEventListener('keydown',e=>{if(document.body.dataset.sceneEditing==='true')return;if((e.target as HTMLElement).matches('input,select,textarea'))return;
 const key=e.key.toLowerCase();
 if(e.key==='Escape'){if(grip)releaseGrip(false);else if(bodyMode()&&handFocus)setHandFocus(false);spotlight=undefined;$('settings').hidden=true;$('toolbox').hidden=true;return;}
 if(key==='h'&&!e.repeat){$('hint').click();return;}
 if(key==='f'&&!e.repeat){if(!bodyMode()||handFocus)togglePin();return;}
 if(!bodyMode()&&['q','e'].includes(key)&&!e.repeat){chooseContact(key==='e'?1:-1);return;}
 if(grip&&/^[1-9]$/.test(e.key)&&grip.progress<.1){grip.intent=grip.options[+e.key-1];grip.chosen=grip.intent;return;}
 if(!bodyMode()&&key==='g'&&!e.repeat){e.preventDefault();if(grip)releaseGrip();else{const p=worldPoint(selected);if(p)beginGrip(selected,screen(p),true);}return;}
 if(e.code==='Space'){e.preventDefault();if(e.repeat)return;if(bodyMode()&&!handFocus){setHandFocus(true);return;}if(!grip){const id=bodyMode()?selected:hoverId??selected,p=worldPoint(id);if(p)beginGrip(id,screen(p),true);}return;}
 if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(key)){e.preventDefault();heldDirections.add(key);
  if(releasedBeforeReuse.has(key)||animation)return;
  if(bodyMode()&&handFocus&&!grip){navigateHand(key==='d'||key==='arrowright'?1:key==='a'||key==='arrowleft'?-1:0,key==='s'||key==='arrowdown'?1:key==='w'||key==='arrowup'?-1:0);return;}
  keys.add(key);navTarget=undefined;
  if(bodyMode()&&!e.repeat){const right=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0).setY(0).normalize(),forward=new T.Vector3(right.z,0,-right.x);const direction=key==='d'||key==='arrowright'?right:key==='a'||key==='arrowleft'?right.negate():key==='w'||key==='arrowup'?forward:forward.negate();walkVelocity.addScaledVector(direction,grip?.body ? (Math.abs(direction.dot(right))>.8?.14:.24) : .4).clampLength(0,grip?.body ? .8 : 3.2);}
 }
});
addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());heldDirections.delete(e.key.toLowerCase());releasedBeforeReuse.delete(e.key.toLowerCase());if(e.code==='Space'&&grip?.keyboard)releaseGrip();});
addEventListener('blur',()=>{releaseGrip(false);clearMovement();releasedBeforeReuse.clear();heldDirections.clear();});
function updateHands(now:number,dt:number,moving:boolean){const g=grip?.chosen??(animation?lastGesture:undefined);const id=grip?.id??(g?.gripId??(bodyMode()?(handFocus?selected:undefined):hoverId));let point=id?worldPoint(id):undefined;
 if(!point&&g)point=worldPoint(g.action.result.id);
 if(point){lingerPoint=point.clone();lastContactAt=now;}else if(value('handStay')==='stay'||now-lastContactAt<1200)point=lingerPoint;
 if(bodyMode()&&!handFocus&&!grip&&!animation)point=undefined;
 const brace=pin?worldPoint(pin.id):undefined;
 if(stanceMoving||(bodyMode()&&(grip||animation))||(near&&!moving))avatar.rotation.y=Math.atan2(treeOrigin.x-avatar.position.x,treeOrigin.z-avatar.position.z);
 lehi.update(now,dt,moving,camera,near?point:undefined,near?brace:undefined,activeHand,!!grip||!!animation,grip?.body?{velocity:walkVelocity,effort:.35+Math.min(1,Math.abs(grip.target-grip.progress))*.65}:undefined,handFocus,!!keys.size||!!navTarget);
 $('world').dataset.character=lehi.current();$('world').dataset.locomotion=lehi.locomotion();$('world').dataset.handActivity=avatar.userData.handActivity??'escort';
 const ends=lehi.linkEnds();ribbon.update(now,dt,value('bodyLink')==='ribbon',bodyMode()&&!!(grip||animation),ends.from,ends.to,camera,grip?Math.abs(grip.target-grip.progress):0);
 const idlePreviewStatus=document.getElementById('idlePreviewStatus');if(idlePreviewStatus&&avatar.userData.idlePreviewStatus&&idlePreviewStatus.textContent!==avatar.userData.idlePreviewStatus)idlePreviewStatus.textContent=avatar.userData.idlePreviewStatus;
 $('world').dataset.idleRoam=JSON.stringify(avatar.userData.idleRoam);
 $('world').dataset.idleCatch=JSON.stringify(avatar.userData.idleCatch);
 $('world').dataset.fingerWalk=JSON.stringify(avatar.userData.fingerWalk);$('world').dataset.idleCooldown=String(avatar.userData.idleCooldown);
 $('world').dataset.handState=!near?'home':point?'tree':'home';
}
for(const rule of rules){const label=document.createElement('label');label.className='rule';const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=true;checkbox.dataset.rule=rule.id;checkbox.onchange=()=>{if(checkbox.checked)enabled.add(rule.id);else enabled.delete(rule.id);spotlight=undefined;ui(false);};const text=document.createElement('span');text.textContent=rule.name;const small=document.createElement('small');small.textContent=rule.equation;text.append(small);label.append(checkbox,text);label.style.setProperty('--rule',rule.color);$('ruleList').append(label);}
$('toolboxButton').onclick=()=>$('toolbox').hidden=!$('toolbox').hidden;$('closeToolbox').onclick=()=>$('toolbox').hidden=true;
$('pinButton').onclick=()=>togglePin();$('clearPin').onclick=()=>{pin=undefined;spotlight=undefined;ui(false);};
$('inputMode').onchange=()=>{releaseGrip(false);keys.clear();walkVelocity.setScalar(0);hoverId=undefined;spotlight=undefined;handFocus=false;lingerPoint=undefined;pin=undefined;clearMovement();ui(false);renderer.domElement.focus();};
if(new URLSearchParams(location.search).get('mode')==='body')($('inputMode') as HTMLSelectElement).value='body';
$('interact').onclick=()=>{setHandFocus(!handFocus);renderer.domElement.focus();};
let last=performance.now(),nearOld=false;
function tick(now:number){requestAnimationFrame(tick);const frameMs=now-last;const dt=Math.min(.05,frameMs/1000);last=now;if(document.hidden)return;
 if(document.body.dataset.sceneEditing==='true'){keys.clear();navTarget=undefined;walkVelocity.setScalar(0);}
 const arrowWalk=bodyMode()||!grip;
 const dx=(keys.has('d')||(arrowWalk&&keys.has('arrowright'))?1:0)-(keys.has('a')||(arrowWalk&&keys.has('arrowleft'))?1:0),dz=(keys.has('s')||(arrowWalk&&keys.has('arrowdown'))?1:0)-(keys.has('w')||(arrowWalk&&keys.has('arrowup'))?1:0);
 const right=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0).setY(0).normalize(),forward=new T.Vector3(right.z,0,-right.x);
 const move=bodyMode()?right.clone().multiplyScalar(dx).addScaledVector(forward,-dz):new T.Vector3(dx,0,dz);
 if(grip?.body)move.addScaledVector(right,-move.dot(right)*.4);
 if(navTarget){move.copy(navTarget).sub(avatar.position);if(move.length()<.12){navTarget=undefined;move.setScalar(0);}}
 const load=grip?.body?Math.abs(grip.target-grip.progress):0;
 const pullDirectionScale=grip?.body?Math.min(1,move.length()):1;
 const targetVelocity=move.lengthSq()>.001?move.normalize().multiplyScalar(grip?.body ? .8*pullDirectionScale/(1+load*.5) : 3.2):move;
 if(bodyMode()&&!navTarget)walkVelocity.lerp(targetVelocity,1-Math.exp(-dt*(grip?.body?6:9)));else walkVelocity.copy(targetVelocity);
 if(bodyMode()&&handFocus&&!grip){walkVelocity.setScalar(0);navTarget=undefined;}
 let moving=walkVelocity.lengthSq()>.01;stanceMoving=false;
 if(moving){const proposed=avatar.position.clone().addScaledVector(walkVelocity,dt);if(Math.hypot(proposed.x,proposed.z)<14.5&&!obstacles.some(o=>Math.hypot(proposed.x-o.x,proposed.z-o.z)<o.r+.3)){avatar.position.copy(proposed);avatar.rotation.y=Math.atan2(walkVelocity.x,walkVelocity.z);}else{navTarget=undefined;walkVelocity.setScalar(0);}}
 // Automatic steps are confined to idle contact selection. Grip records the
 // current avatar position before this path is disabled, with velocity cleared.
 const stanceContact=bodyMode()?selected:hoverId;
 const stanceDelta=stance.step(now,dt,document.body.dataset.sceneEditing!=='true'&&value('stanceAssist')==='gentle'&&(bodyMode()?handFocus:!!hoverId)&&near&&spread<.12&&!grip&&!animation&&!pin&&!keys.size&&!navTarget,stanceContact??'',stanceContact?worldPoint(stanceContact):undefined,avatar.position,treeOrigin,right,p=>Math.hypot(p.x,p.z)<14.5&&!obstacles.some(o=>Math.hypot(p.x-o.x,p.z-o.z)<o.r+.3));
 if(stanceDelta.lengthSq()>0){avatar.position.add(stanceDelta);walkVelocity.copy(stanceDelta).divideScalar(Math.max(dt,.001));moving=true;stanceMoving=true;}
 if(grip?.keyboard){if(grip.body){const d=avatar.position.clone().sub(grip.avatarStart);updateGrip({x:grip.from.x+d.dot(right)*grip.gain,y:grip.from.y-d.dot(forward)*grip.gain});const spring=advanceSpring({value:grip.progress,velocity:grip.velocity},grip.target,dt,+value('mass'));grip.progress=spring.value;grip.velocity=spring.velocity;grip.ready=grip.caught;}
 else{const dx=(keys.has('arrowright')?1:0)-(keys.has('arrowleft')?1:0),dy=(keys.has('arrowdown')?1:0)-(keys.has('arrowup')?1:0);grip.cursor.x+=dx*dt*190;grip.cursor.y+=dy*dt*190;const here=screen(avatar.position),was=screen(grip.avatarStart);updateGrip({x:grip.cursor.x+(here.x-was.x)*2,y:grip.cursor.y+(here.y-was.y)*2});}}
 // Enter near the tree, then keep the whole interaction active until explicitly
 // leaving hand control. Distance cannot interrupt the interval between pulls.
 const inRing=Math.hypot(avatar.position.x-treeOrigin.x,avatar.position.z-treeOrigin.z)<5.5;
 encounter.readTiming();
 const stateBefore=encounter.sequence.state;
 if(encounter.enabled&&preferencesReady&&loaded&&document.body.dataset.sceneEditing!=='true'){
  if(encounter.sequence.state==='dormant'&&inRing&&!insideRing)hostSpread=spread;
  encounter.sequence.update(dt,inRing&&!insideRing,solved(tree)&&!animation&&!grip,encounter.timing);
 }
 insideRing=inRing;
 const channels=encounter.sequence.sample(encounter.timing);
 if(stateBefore!==channels.state){
  if(channels.state==='release'){prepareRecovery();handFocus=false;hoverId=undefined;pin=undefined;lingerPoint=undefined;spotlight=undefined;clearMovement();}
  ui(false);
 }
 near=mayRewrite()&&(handFocus||!!grip||!!animation||Math.hypot(avatar.position.x-treeOrigin.x,avatar.position.z-treeOrigin.z)<(nearOld?7.5:5.5));
 if(!near){pin=undefined;lingerPoint=undefined;hoverId=undefined;handFocus=false;}
 const target=encounter.enabled?(channels.state==='dormant'?+value('spread'):channels.recovering?recoveryEmbedding(channels.state==='healthy'?1:encounter.sequence.age/encounter.timing.recovery,hostSpread):0):(near?0:+value('spread'));
 const next=spread+(target-spread)*(1-Math.exp(-dt*4));spread=Math.abs(next-target)<.008?target:Math.round(next*1000)/1000;
 if(near!==nearOld){nearOld=near;if(!near&&grip)releaseGrip(false);ui();}runes.visible=near;ring.visible=!encounter.enabled;(ring.material as T.MeshBasicMaterial).color.set(solved(tree)?'#f1ce79':near?'#e6ddb7':'#bac8a8');
 if(!animation&&!grip&&spread===0&&near&&document.querySelector<HTMLButtonElement>('#actions button')?.disabled)ui(false);
 requestPose(now);controls.update();frameTree(dt);updateHands(now,dt,moving);drawGuides();
 encounter.update(dt,poseNow,walk(hostTree).filter(n=>n.kind!=='op').map(n=>n.id));
 const envelope=encounter.enabled?{...channels,...encounter.departure,flash:channels.flash*encounter.flashStrength,force:true}:undefined;
 sound.update({phase:encounter.enabled?channels.state:'dormant',age:encounter.sequence.age,reduction:Math.max(0,Math.min(1,(count(hostTree)-count(tree))/Math.max(1,count(hostTree)-5))),x:avatar.position.x,z:avatar.position.z,dt,recoveryCount:recoveryTrace.length,recoveryDuration:encounter.timing.recovery,paused:document.body.dataset.sceneEditing==='true'||encounter.enabled&&encounter.sequence.paused});
 inhabitation.update(dt,poseNow,shapeSeed,envelope);backdrop.decals.update(obstacles,encounter.enabled?channels:undefined);burntBark.update(poseNow,treeScale,encounter.enabled?channels.burn:1);
 $('world').dataset.encounterState=encounter.enabled?channels.state:'study';$('world').dataset.encounterProgress=String(channels.growth);
 mist.render(scene,camera,dt,{enabled:value('mistMode')==='on'&&value('backdrop')!=='plain'&&!new URLSearchParams(location.search).has('matteCapture'),strength:+value('mistDensity'),radius:+value('mistRadius'),texture:+value('mistTexture'),speed:+value('mistSpeed')},inhabitation.active?drawBase=>inhabitation.render(drawBase):undefined);sceneEditor?.render();stats.update(now,frameMs);
 if(startup.pending){
  // Both the original and current rock controls enable layout after loading;
  // failed optional art retains the procedural scenery beneath it.
  const rocksReady=!($('rockLayout') as HTMLSelectElement).disabled||/failed/i.test($('rockLoad').textContent??'');
  startup.frameReady(preferencesReady&&loaded&&!inflight&&queue.length===0&&backdrop.ready&&lehi.ready()&&rocksReady);
 }
 if(new URLSearchParams(location.search).has('matteCapture')){hero.visible=false;ring.visible=false;avatar.visible=false;scene.traverse(o=>{if(o.userData.matteExclude)o.visible=false;});}
 clearing.update((solved(tree)||encounter.enabled&&channels.recovering)&&!grip&&!animation,dt);$('world').dataset.caught=String(grip?.caught??false);$('world').dataset.goal=String(solved(tree));
 $('world').dataset.near=String(near);$('world').dataset.busy=String(!!animation||!!grip);$('world').dataset.grip=grip?.chosen?.action.key??(grip?'holding':'none');$('world').dataset.gestureProgress=String(grip?.progress??0);$('world').dataset.springTarget=String(grip?.target??0);$('world').dataset.player=`${avatar.position.x.toFixed(2)},${avatar.position.z.toFixed(2)}`;
 $('world').dataset.controlPhase=bodyMode()?(animation?'settling':grip?'pull':handFocus?'hand':'walk'):'mouse';
 $('world').dataset.pullGain=String(grip?.gain??+value('pullGain'));$('world').dataset.gripOrigin=grip?`${grip.avatarStart.x.toFixed(2)},${grip.avatarStart.z.toFixed(2)}`:'';$('world').dataset.stance=stance.phase;$('world').dataset.stanceShift=String(stance.shift);$('world').dataset.ribbon=String(ribbon.visible);$('world').dataset.facing=String(avatar.rotation.y);$('world').dataset.activeHand=activeHand===0?'right':'left';$('world').dataset.selected=selected;$('world').dataset.brace=pin?'pinned':'rest';
 $('interact').hidden=!bodyMode()||!near;($('interact') as HTMLButtonElement).disabled=!!grip||!!animation;$('interact').textContent=handFocus?'Leave tree · Esc':'Reach in · Space';
 $('controlHelp').textContent=bodyMode()?'Space: enter, then hold to grip · Arrows: select / move · Release: settle · Esc: cancel / leave · Optional F: pin, H: hint, 1–9: route':'WASD / arrows: move · Hold rune: pull · F / Shift-click: pin · H: hint · Esc: cancel';
 $('pullStatus').textContent=bodyMode()&&animation?'SETTLING · The tree is catching up; the motion is finishing':grip?.body?`PULL · Keep Space held · Spring ${Math.round(grip.progress*100)}% · pull ${Math.round(grip.target*100)}%${grip.ready?' · CAUGHT — release':''}`:bodyMode()?(handFocus?'HAND · Arrows choose a sigil · Hold Space, then move to pull · Esc leaves':'WALK · Arrows move the traveller · Space reaches into the tree'):'Hold a rune and pull · Shift-click to pin';
}
$('groundShadows').onchange=()=>{const on=value('groundShadows')==='on';clearing.setGroundShadows(on);backdrop.setGroundShadows(on);};
$('backdrop').onchange=()=>{backdrop.set(value('backdrop'));clearing.setGroundPainted(value('backdrop')!=='plain');resize();};$('resetView').onclick=()=>{framingFloor=Infinity;preferredZoom=1;camera.position.set(39,32,63);camera.zoom=1;controls.target.set(0,2,0);controls.update();resize();};$('previewSound').onclick=()=>{sound.unlock();sound.catch();};$('soundMode').onchange=()=>sound.setMode(value('soundMode'));$('volume').oninput=()=>sound.setVolume(+value('volume'));setupHUD();
const travellerPanel=Array.from($('settings').querySelectorAll('details')).find(d=>d.querySelector('summary')?.textContent==='Traveller')!;
addTravelHandControl(travellerPanel,style=>lehi.setTravelStyle(style));
const idleCatchLabel=document.createElement('label');idleCatchLabel.textContent='Idle hands';
const idleCatchSelect=document.createElement('select');idleCatchSelect.id='idleCatch';
idleCatchSelect.add(new Option('Finger walks & catch','catch'));idleCatchSelect.add(new Option('Finger walks only','explore'));idleCatchSelect.add(new Option('Catch only','catch-only'));idleCatchSelect.add(new Option('Resting hands','rest'));
idleCatchSelect.onchange=()=>lehi.setIdleMode(idleCatchSelect.value as 'catch'|'explore'|'catch-only'|'rest');idleCatchLabel.append(idleCatchSelect);travellerPanel.append(idleCatchLabel);
const walkStyleLabel=document.createElement('label');walkStyleLabel.textContent='Walking style';
const walkStyleSelect=document.createElement('select');walkStyleSelect.id='idleWalkStyle';
for(const [label,value] of [['Both walks','mixed'],['Quick spider walk','spider'],['Awkward upright walk','upright']])walkStyleSelect.add(new Option(label,value));
walkStyleSelect.onchange=()=>lehi.setIdleWalkStyle(walkStyleSelect.value as 'mixed'|'spider'|'upright');walkStyleLabel.append(walkStyleSelect);travellerPanel.append(walkStyleLabel);
const idleTest=document.createElement('details'),idleTestTitle=document.createElement('summary');idleTest.id='idleAnimationTest';idleTestTitle.textContent='Test idle animations';idleTest.append(idleTestTitle);
const idlePreviewLabel=document.createElement('label');idlePreviewLabel.textContent='Animation';const idlePreviewSelect=document.createElement('select');idlePreviewSelect.id='idlePreview';
for(const [label,value] of [['Wandering hands','roam'],['Play catch','catch'],['Spider walk','spider'],['Upright two-finger walk','upright'],['Spider walk + stumble','spider-stumble'],['Upright walk + stumble','upright-stumble']])idlePreviewSelect.add(new Option(label,value));
idlePreviewLabel.append(idlePreviewSelect);idleTest.append(idlePreviewLabel);
const idlePreviewPlay=document.createElement('button');idlePreviewPlay.id='playIdlePreview';idlePreviewPlay.textContent='Play animation';idlePreviewPlay.onclick=()=>lehi.previewIdle(idlePreviewSelect.value as IdlePreview,camera);
const idlePreviewStop=document.createElement('button');idlePreviewStop.id='stopIdlePreview';idlePreviewStop.textContent='Stop preview';idlePreviewStop.onclick=()=>lehi.stopIdlePreview();
const idlePreviewHelp=document.createElement('small');idlePreviewHelp.textContent='Skips the idle wait. Catch needs a nearby small rock; walks and stumbles need clear ground. Movement still brings the hands back.';
const idlePreviewStatus=document.createElement('small');idlePreviewStatus.id='idlePreviewStatus';idlePreviewStatus.setAttribute('role','status');idlePreviewStatus.textContent='Choose an animation, then play.';
idleTest.append(idlePreviewPlay,idlePreviewStop,idlePreviewHelp,idlePreviewStatus);travellerPanel.append(idleTest);
const handReview=document.createElement('a');handReview.href='avatar-review.html?hands';handReview.target='_blank';handReview.rel='noopener';handReview.textContent='Compare travelling hands up close ↗';handReview.style.display='block';travellerPanel.append(handReview);
const studyTools=document.createElement('div');studyTools.id='studyTools';studyTools.className='studyTools';
if(inhabitedStudy){
 const cameraUI=document.createElement('div');cameraUI.className='studyCamera';
 const toggle=document.createElement('button');toggle.id='studyCamera';toggle.textContent='Free camera';toggle.setAttribute('aria-pressed','false');
 const help=document.createElement('small');help.textContent='Drag: orbit · Shift-drag: pan · Wheel: zoom';help.hidden=true;
 toggle.onclick=()=>{if(grip)releaseGrip(false);freeStudyCamera=!freeStudyCamera;toggle.setAttribute('aria-pressed',String(freeStudyCamera));toggle.textContent=freeStudyCamera?'Return to scene camera':'Free camera';help.hidden=!freeStudyCamera;controls.mouseButtons.LEFT=freeStudyCamera?T.MOUSE.ROTATE:null as any;controls.mouseButtons.MIDDLE=freeStudyCamera?T.MOUSE.PAN:T.MOUSE.DOLLY;resize();if(!freeStudyCamera){controls.enableDamping=false;controls.update();$('resetView').click();controls.enableDamping=true;}$('world').dataset.cameraMode=freeStudyCamera?'free':'scene';};
 cameraUI.append(toggle,help);studyTools.append(cameraUI);$('world').dataset.cameraMode='scene';
}
inhabitation.mount($('settings'));
backdrop.decals.mount($('settings'));
burntBark.mount($('settings'));
mountRootControls($('settings'));
function jumpEncounter(state:EncounterState){
 // Developer previews share the lifecycle, but never mark the equation solved.
 if(grip)releaseGrip(false);animation=undefined;exitAfterSettle=false;handFocus=false;hoverId=undefined;lingerPoint=undefined;pin=undefined;spotlight=undefined;clearMovement();controls.enabled=true;
 if(state==='dormant'&&encounter.sequence.automatic){tree=initial();hostTree=tree;rewriteTrace=[];redoTrace=[];recoveryTrace=[];history=[];future=[];steps=0;selected=tree.id;recoveryTree=undefined;avatar.position.set(0,0,9);insideRing=false;hostSpread=+value('spread');}
 if(['release','recovery','healthy'].includes(state))prepareRecovery();
 encounter.sequence.jump(state);if(state==='dormant'||state==='healthy')spread=hostSpread;if(state==='release')spread=0;
 epoch++;lastKey='';ui(false);drawGuides();
}
encounter.mount($('settings'),jumpEncounter);
for(const [id,state]of [['charQuiet','dormant'],['charSpirit','active']] as const){const previous=$(id).onclick;$(id).onclick=e=>{if(encounter.enabled){encounter.sequence.automatic=false;encounter.sequence.paused=true;jumpEncounter(state);}else previous?.call($(id),e);};}

$('settings').prepend(studyTools);
const titleToggle=$('sceneTitleToggle'),subtitle=$('sceneSubtitle');let titlePinned=false,titleHover=false,titleFocus=false;
const updateTitle=()=>{const shown=titlePinned||titleHover||titleFocus;titleToggle.closest('header')!.classList.toggle('title-revealed',shown);titleToggle.setAttribute('aria-pressed',String(titlePinned));subtitle.setAttribute('aria-hidden',String(!shown));};
titleToggle.onpointerenter=()=>{titleHover=true;updateTitle();};titleToggle.onpointerleave=()=>{titleHover=false;updateTitle();};
titleToggle.onfocus=()=>{titleFocus=titleToggle.matches(':focus-visible');updateTitle();};titleToggle.onblur=()=>{titleFocus=false;updateTitle();};
titleToggle.onclick=()=>{titlePinned=!titlePinned;updateTitle();};
sound.mount();
for(const button of [titleToggle,...studyTools.querySelectorAll('button')])button.addEventListener('keydown',e=>{if([' ','Enter'].includes((e as KeyboardEvent).key))e.stopPropagation();});
setupControlReadouts();
let preferencesReady=false,sceneEditor:ReturnType<typeof mountSceneEditor>|undefined;
let editorWasPaused=false,editorWasFree=false;
function createEditor(){
return mountSceneEditor(scene,camera,renderer,controls,{
 canEdit:()=>loaded&&!animation&&!grip&&!pin,
 setEditing(on){clearMovement();if(on){editorWasPaused=encounter.sequence.paused;editorWasFree=freeStudyCamera;encounter.sequence.paused=true;freeStudyCamera=true;lehi.stopIdlePreview();lehi.setIdleMode('rest');lehi.settleIdleProps();}else{encounter.sequence.paused=editorWasPaused;freeStudyCamera=editorWasFree;lehi.setIdleMode(value('idleCatch') as any);}resize();if(on){releaseGrip(false);pin=undefined;handFocus=false;hoverId=undefined;spotlight=undefined;groundDown=undefined;}ui(false);},
 capture:()=>({treeSeed:String(shapeSeed),viewX:String(camera.position.x),viewY:String(camera.position.y),viewZ:String(camera.position.z),viewTargetX:String(controls.target.x),viewTargetY:String(controls.target.y),viewTargetZ:String(controls.target.z),viewZoom:String(camera.zoom)}),
 apply(values){
  // Scene definitions restart the encounter; they never restore an in-progress rewrite.
  encounter.sequence.automatic=true;encounter.sequence.paused=document.body.dataset.sceneEditing==='true';jumpEncounter('dormant');
  const number=(key:string)=>Number(values[key]);
  if(Number.isInteger(number('treeSeed'))&&number('treeSeed')>=0&&number('treeSeed')<=1000000){shapeSeed=number('treeSeed');lastKey='';}
  if(['viewX','viewY','viewZ','viewTargetX','viewTargetY','viewTargetZ','viewZoom'].every(key=>Number.isFinite(number(key)))){
   camera.position.set(number('viewX'),number('viewY'),number('viewZ'));controls.target.set(number('viewTargetX'),number('viewTargetY'),number('viewTargetZ'));preferredZoom=T.MathUtils.clamp(number('viewZoom'),.4,3);camera.zoom=preferredZoom;controls.update();camera.updateProjectionMatrix();
  }
 }
});

}
setupSettings(inhabitedStudy?'clearing-019':'clearing-018',$('settings'),'.dock input,.dock select',true).finally(async()=>{sceneEditor=createEditor();await sceneEditor.ready;preferencesReady=true;});
ui();requestAnimationFrame(tick);

// Read-only integration diagnostics; rendering uses the displayed worker pose.
(window as any).__inhabited=()=>({ ...inhabitation.inspect(),displayedIds:poseNow?[...poseNow.nodes.keys()]:[],treeIds:walk(tree).map(n=>n.id)});
