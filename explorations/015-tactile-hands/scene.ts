import * as T from 'three';import {createLehi} from './lehi';import {Gesture,gestures,scoreDrag} from './gestures';import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {Term,Action,initial,walk,count,format,find,actions,replace,solved,hint} from './algebra';import {Pose,layout,transition} from './layout';import {Options,prepare} from './surface';import {makeShading} from './shading';
const $=(id:string)=>document.getElementById(id)!,value=(id:string)=>($(id) as HTMLInputElement).value;
const renderer=new T.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor('#bac7c1');renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;$('world').append(renderer.domElement);
const scene=new T.Scene();scene.fog=new T.Fog('#bac7c1',26,60);scene.add(new T.HemisphereLight('#fff5d9','#506451',2));const sun=new T.DirectionalLight('#fff0d0',2.5);sun.position.set(-8,16,10);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-18,right:18,top:18,bottom:-18});sun.shadow.bias=-.001;scene.add(sun);
const camera=new T.OrthographicCamera(-14,14,10,-10,.1,90);camera.position.set(13,12,21);const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,2,0);controls.enableDamping=true;controls.minZoom=.65;controls.maxZoom=2;controls.maxPolarAngle=Math.PI*.48;controls.mouseButtons={LEFT:null as any,MIDDLE:T.MOUSE.DOLLY,RIGHT:T.MOUSE.ROTATE};controls.update();
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h);camera.left=-11*w/h;camera.right=11*w/h;camera.top=11;camera.bottom=-11;camera.updateProjectionMatrix();}addEventListener('resize',resize);resize();
const rockMat=new T.MeshStandardMaterial({color:'#6e7c76',roughness:1,flatShading:true}),mossMat=new T.MeshStandardMaterial({color:'#718565',roughness:1,flatShading:true});
function mesh(geo:T.BufferGeometry,mat:T.Material,pos:T.Vector3,scale?:T.Vector3){const m=new T.Mesh(geo,mat);m.position.copy(pos);if(scale)m.scale.copy(scale);m.castShadow=true;m.receiveShadow=true;scene.add(m);return m;}
mesh(new T.CylinderGeometry(16,17,1,64),new T.MeshStandardMaterial({color:'#87957c',roughness:1}),new T.Vector3(0,-.52,0));
const obstacles:{x:number;z:number;r:number}[]=[];
const rand=(n:number)=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
for(let i=0;i<42;i++){const angle=i*2.3999,r=8+rand(i)*6,x=Math.cos(angle)*r,z=Math.sin(angle)*r;if(z>5&&Math.abs(x)<4)continue;const s=.6+rand(i+4)*1.8;const stone=mesh(new T.IcosahedronGeometry(1,0),rockMat,new T.Vector3(x,s*.27-.1,z),new T.Vector3(s,s*.55,s*.8));stone.rotation.set(rand(i)*.3,rand(i+3)*6,.1);obstacles.push({x,z,r:s*.8});if(i%2===0)mesh(new T.IcosahedronGeometry(1,1),mossMat,new T.Vector3(x,s*.47,z),new T.Vector3(s*.75,.13,s*.55));}
for(let i=0;i<9;i++){const z=8-i*1.1;mesh(new T.CylinderGeometry(.36,.44,.09,6),new T.MeshStandardMaterial({color:i%2?'#c3c3a9':'#adb79d',roughness:1}),new T.Vector3(Math.sin(i)*.24,.02,z),new T.Vector3(1,1,1.3));}
const treeOrigin=new T.Vector3(-1,0,-3),hero=new T.Group();hero.position.copy(treeOrigin);scene.add(hero);
const ring=mesh(new T.RingGeometry(5.5,5.58,80),new T.MeshBasicMaterial({color:'#e6ddb7',side:T.DoubleSide,transparent:true,opacity:.45}),treeOrigin.clone().setY(.025));ring.rotation.x=-Math.PI/2;
const lehi=createLehi(scene),avatar=lehi.root;avatar.position.set(0,0,9);
const treeShade=makeShading(),gradient=new T.DataTexture(new Uint8Array([45,110,185,255]),4,1,T.RedFormat);gradient.minFilter=gradient.magFilter=T.NearestFilter;gradient.needsUpdate=true;
const wood=()=>new T.MeshStandardMaterial({color:'#bba078',roughness:.9});const cel=()=>new T.MeshToonMaterial({color:'#bba078',gradientMap:gradient});
const materials={carved:treeShade.carved(wood()),cel:treeShade.carved(cel()),smooth:wood(),smoothCel:cel()};
const treeMesh=new T.Mesh<T.BufferGeometry,T.Material>(new T.BufferGeometry(),materials.carved);treeMesh.position.y=5;treeMesh.scale.setScalar(6);treeMesh.castShadow=true;treeMesh.receiveShadow=true;hero.add(treeMesh);
const runes=new T.Group();hero.add(runes);const textures=new Map<string,T.CanvasTexture>();
function rune(text:string,selected:boolean){const k=text+selected+value('sigils');let map=textures.get(k);if(!map){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d')!;ctx.fillStyle=selected?'#e4c981':'#f4efd8';ctx.strokeStyle=selected?'#92753a':'#66806b';ctx.lineWidth=7;ctx.beginPath();if(value('sigils')==='stone'){ctx.fillStyle=selected?'#b7c19c':'#4b7067';ctx.strokeStyle=selected?'#f1d088':'#aacbb6';ctx.moveTo(36,12);ctx.lineTo(91,17);ctx.lineTo(116,62);ctx.lineTo(86,112);ctx.lineTo(29,108);ctx.lineTo(12,61);ctx.closePath();}else ctx.arc(64,64,51,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle=value('sigils')==='stone'?'#fff0bf':'#334c3d';ctx.font='bold 66px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,64,65);map=new T.CanvasTexture(c);textures.set(k,map);}return new T.SpriteMaterial({map,depthTest:false,fog:false,toneMapped:false});}
let tree=initial(),selected=tree.id,steps=0,history:{tree:Term;steps:number}[]=[],future:{tree:Term;steps:number}[]=[],near=false,loaded=false,epoch=0,shapeSeed=2,spread=1,navTarget:T.Vector3|undefined,suggested:{id:string;key:string}|undefined;
let animation:{before:Term;after:Term;start:number;kind:string;merge:Record<string,string>;from:number;to:number;duration:number}|undefined,poseNow:Pose|undefined,lastKey='',idCounter=0;
function options():Options{return {thickness:+value('thickness'),taper:+value('taper'),bow:+value('bow'),random:+value('random'),twist:+value('twist'),facets:+value('facets'),seed:shapeSeed,blend:+value('blend'),hewn:value('surface')==='hewn',spread};}
function layoutOptions(){return {spread,seed:shapeSeed,irregularity:+value('irregularity'),height:value('height')};}
function updateRunes(pose:Pose){runes.children.forEach(o=>(o as T.Sprite).material.dispose());runes.clear();for(const [id,n] of pose.nodes){const p=pose.points.get(id);if(!p)continue;const s=new T.Sprite(rune(n.kind==='op'?(n.op==='*'?'×':'+'):n.kind==='num'?String(n.value):n.name,id===selected));s.position.copy(p).add(new T.Vector3(0,.22,.05));s.scale.setScalar(id===selected?.95:.74);s.userData.nodeId=id;s.renderOrder=10;runes.add(s);}runes.visible=near;}
type Job={id:number;kind:'hero'|'deco';epoch:number;pose:Pose;options:Options;resolution:number;final:boolean;origin?:T.Vector3;scale?:number};
let queue:Job[]=[],inflight:Job|undefined;const worker=new Worker(new URL('./mesh.worker.ts',import.meta.url),{type:'module'});
function pump(){if(inflight||!queue.length)return;inflight=queue.shift()!;worker.postMessage({id:inflight.id,edges:inflight.pose.edges,options:inflight.options,resolution:inflight.resolution});}
function submit(job:Job){if(job.kind==='hero')queue=queue.filter(j=>j.kind!=='hero');queue.push(job);pump();}
worker.onmessage=event=>{const job=inflight;inflight=undefined;const data=event.data;if(!job||data.id!==job.id){pump();return;}if(data.error){$('message').textContent='The surface could not be rebuilt: '+data.error;animation=undefined;ui();pump();return;}
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(data.position,3));geo.setAttribute('normal',new T.BufferAttribute(data.normal,3));geo.computeBoundingSphere();
 if(job.kind==='hero'&&job.epoch===epoch){treeMesh.geometry.dispose();treeMesh.geometry=geo;const members=data.edges.map((e:any)=>prepare({...e,a:new T.Vector3(e.a.x,e.a.y,e.a.z),b:new T.Vector3(e.b.x,e.b.y,e.b.z)},job.options));const shifted=members.map((m:any)=>({...m,e:{...m.e,a:m.e.a.clone().add(treeOrigin),b:m.e.b.clone().add(treeOrigin)},points:m.points.map((p:T.Vector3)=>p.clone().add(treeOrigin))}));treeShade.feed(shifted,job.options);poseNow=job.pose;updateRunes(job.pose);loaded=true;$('loading').hidden=true;$('cost').textContent=`${data.position.length/9|0} triangles · ${Math.round(data.ms)} ms worker rebuild. Camera and walking stay on the main thread.`;$('world').dataset.nodes=String(count(tree));$('world').dataset.term=format(tree);$('world').dataset.meshing='ready';
  if(job.final&&animation){animation=undefined;selected=find(tree,selected)?selected:tree.id;ui();}else if(!animation&&!grip)ui(false);
 }else if(job.kind==='deco'){const s=job.scale!;const mat=new T.MeshStandardMaterial({color:'#7d8b77',roughness:1});const obj=new T.Mesh(geo,mat);obj.scale.setScalar(6*s);obj.position.copy(job.origin!).add(new T.Vector3(0,5*s,0));obj.castShadow=true;scene.add(obj);}else geo.dispose();pump();};
worker.onerror=e=>{$('loading').textContent='Tree renderer error: '+e.message;};
function requestPose(now:number){const elapsed=animation?Math.min(1,(now-animation.start)/animation.duration):1;const u=grip?.chosen?grip.progress:animation?animation.from+(animation.to-animation.from)*elapsed:1;const quant=Math.round(u*48)/48;const config=layoutOptions();const key=JSON.stringify([epoch,tree.id,format(tree),grip?.chosen?.action.key,animation?.kind,animation?elapsed===1:false,quant,Math.round(spread*25),config,options(),value('resolution')]);if(key===lastKey)return;lastKey=key;
 const pose=grip?.chosen?transition(tree,grip.chosen.after,quant,config,grip.chosen.action.key,grip.chosen.action.merge):animation?transition(animation.before,animation.after,quant,config,animation.kind,animation.merge):layout(tree,config);submit({id:++idCounter,kind:'hero',epoch,pose,options:options(),resolution:+value('resolution'),final:!grip&&(!animation||elapsed===1)});$('world').dataset.meshing='working';}
for(const [x,z,scale] of [[-8,-5,.6],[7,-7,.75]]){const root=initial();const t=root.kind==='op'?root.left:root;const opt={...options(),spread:1,thickness:.9,bow:.45,seed:Math.round(x+20)};submit({id:++idCounter,kind:'deco',epoch,pose:layout(t,{spread:1,irregularity:.5,height:'depth',seed:opt.seed}),options:opt,resolution:64,final:true,origin:new T.Vector3(x,0,z),scale});}
function status(text:string){$('message').textContent=text;}
function nextClue(){
 const nodes=walk(tree);
 if(nodes.some(n=>n.kind==='num'&&n.value===0))return 'Hold a rune and pull. Press zeros into their junctions, or carry a branch around its sibling. Suggest a grip shows one route.';
 if(nodes.some(n=>actions(n).some(a=>a.key.startsWith('factor'))))return 'The x-products now share a junction. Bring one x rune to the other x to factor the shared branch.';
 if(nodes.some(n=>actions(n).some(a=>a.key==='calculate')))return 'The numeric leaves can combine. Gather the numbers into their + junction to finish the simplification.';
 return 'Bring the two x-products under one + junction. Swapping and regrouping preserve the whole branches.';
}
function ui(updateMessage=true){const busy=!!animation||!!grip;const done=solved(tree)&&!busy;$('expression').textContent=format(tree);$('progress').textContent=`${count(tree)} nodes · ${steps} moves · start: 13 nodes`;$('bar').style.width=Math.min(100,Math.max(0,(13-count(tree))/8*100))+'%';$('goal').textContent=done?'5×x + y · same meaning, less structure.':'Simplify this tree to 5×x + y.';$('guideTitle').textContent=done?'The canopy is untangled':near?'Listen, then reshape':'Meet the tree';$('approach').hidden=near;$('hint').hidden=!near||done;($('hint') as HTMLButtonElement).disabled=busy||!loaded;
 ($('undo') as HTMLButtonElement).disabled=!history.length||busy;($('redo') as HTMLButtonElement).disabled=!future.length||busy;($('reset') as HTMLButtonElement).disabled=busy;($('settingsButton') as HTMLButtonElement).disabled=busy;
 for(const control of document.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLButtonElement>('#settings input,#settings select,#seed'))control.disabled=busy;
 $('selection').hidden=!near||!loaded;const n=find(tree,selected);$('actions').replaceChildren();$('outline').replaceChildren();
 if(n){$('selectedLabel').textContent=format(n);$('selectedHelp').textContent=n.kind==='op'?'Hold a rune and pull toward a destination. The two hands grip and brace.':'Grip this rune to move its branch. Available destinations appear while you hold it.';
 for(const a of actions(n)){const b=document.createElement('button');b.textContent="Show: "+a.label;const small=document.createElement('small');small.textContent=a.detail;b.append(small);b.disabled=busy||spread>.12;if(suggested?.id===n.id&&suggested.key===a.key)b.className='suggested';b.onclick=()=>showGesture(n,a);$('actions').append(b);}
 }
 for(const node of walk(tree)){const b=document.createElement('button');b.textContent=(node.kind==='op'?'◇ ':'· ')+format(node);b.onclick=()=>select(node.id);b.disabled=busy;$('outline').append(b);}
 if(updateMessage)status(done?'You used local rewrites to uncover the simpler tree. Undo to explore another route, or walk away and let it spread again.':animation?'The hands are letting the tree settle…':near?nextClue():'Walk into its pale stone circle. The branches will settle into a working plane.');
 if(poseNow)updateRunes(poseNow);}
function select(id:string){if(animation||grip||!near)return;selected=id;ui(false);}
function showGesture(n:Term,a:Action){spotlight=gestures(tree).find(g=>g.owner.id===n.id&&g.action.key===a.key);if(spotlight){selected=spotlight.gripId;ui(false);status(spotlight.instruction+'. Hold the gold grip, then pull toward the outlined destination.');drawGuides();}}
$('hint').onclick=()=>{if(!near||animation||grip)return;const h=hint(tree);if(h){showGesture(find(tree,h.nodeId)!,h.action);}else status('Try bringing like products next to one another, or undo a move to explore another route.');};
$('undo').onclick=()=>{if(animation||grip||!history.length)return;future.push({tree,steps});const prev=history.pop()!;tree=prev.tree;steps=prev.steps;epoch++;selected=tree.id;suggested=undefined;spotlight=undefined;lastKey='';ui();drawGuides();};
$('redo').onclick=()=>{if(animation||grip||!future.length)return;history.push({tree,steps});const next=future.pop()!;tree=next.tree;steps=next.steps;epoch++;selected=tree.id;suggested=undefined;spotlight=undefined;lastKey='';ui();drawGuides();};
$('reset').onclick=()=>{if(animation||grip)return;tree=initial();selected=tree.id;history=[];future=[];steps=0;epoch++;suggested=undefined;spotlight=undefined;lastKey='';ui();drawGuides();};
$('approach').onclick=()=>navTarget=new T.Vector3(0,0,1.7);
$('settingsButton').onclick=()=>$('settings').hidden=!$('settings').hidden;$('closeSettings').onclick=()=>$('settings').hidden=true;
$('sigils').onchange=()=>{if(poseNow)updateRunes(poseNow);};
$('lighting').onchange=()=>{treeMesh.material=materials[value('lighting') as keyof typeof materials];};
for(const id of ['surface','resolution','thickness','taper','bow','random','irregularity','twist','facets','blend','spread','height'])$(id).addEventListener('input',()=>{lastKey='';});$('seed').onclick=()=>{shapeSeed++;lastKey='';};
type ScreenPoint={x:number;y:number};
type Grip={id:string;options:Gesture[];chosen?:Gesture;progress:number;ready:boolean;cursor:ScreenPoint;from:ScreenPoint;keyboard:boolean;avatarStart:T.Vector3};
let grip:Grip|undefined,spotlight:Gesture|undefined,hoverId:string|undefined,activeHand=1,lastGesture:Gesture|undefined;
const keys=new Set<string>(),ray=new T.Raycaster(),pointer=new T.Vector2(),plane=new T.Plane(new T.Vector3(0,1,0),0);
const guideSvg=document.getElementById('gestureGuide')!;
function screen(p:T.Vector3):ScreenPoint{const v=p.clone().project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};}
function worldPoint(id:string,pose=poseNow){return pose?.points.get(id)?.clone().add(treeOrigin);}
function anchors(g:Gesture){const before=layout(tree,layoutOptions()),after=layout(g.after,layoutOptions());const from=screen(before.points.get(g.gripId)!.clone().add(treeOrigin));
 // Moves with surviving grips end at their new layout positions. Absorptions aim at a receiving contact.
 const endpoint=g.action.key==='swap'||g.action.key.startsWith('group')?after.points.get(g.gripId)!:(after.points.get(g.targetId)??before.points.get(g.targetId))!;
 const to=screen(endpoint.clone().add(treeOrigin));return {from,to};}
function available(id:string){const list=gestures(tree,id).sort((a,b)=>Number(b.action.key!=='swap')-Number(a.action.key!=='swap'));
 const out:Gesture[]=[];for(const g of list){const a=anchors(g);if(Math.hypot(a.to.x-a.from.x,a.to.y-a.from.y)<20)continue;if(out.some(other=>{const b=anchors(other);return Math.hypot(a.to.x-b.to.x,a.to.y-b.to.y)<22;}))continue;out.push(g);}return out;}
function beginGrip(id:string,at:ScreenPoint,keyboard=false){if(animation||grip||!near||spread>.12||!loaded)return;const list=available(id);selected=id;if(!list.length){ui(false);status('This contact has no direct move here. Try a neighboring branch or ask for a suggested grip.');return;}
 grip={id,options:list,progress:0,ready:false,cursor:at,from:at,keyboard,avatarStart:avatar.position.clone()};navTarget=undefined;controls.enabled=false;renderer.domElement.style.cursor='grabbing';epoch++;lastKey='';ui(false);status('Hold and pull toward a ring. Move back to reverse; release away from a destination to let go.');drawGuides();}
function updateGrip(at:ScreenPoint){if(!grip)return;const h=grip;
 const candidates=h.options.map(g=>{const a=anchors(g),score=scoreDrag(a.from,a.to,at);return {g,a,...score,rank:score.distance+(score.progress<=0?100:0)};}).sort((a,b)=>a.rank-b.rank);
 const best=candidates[0];if(!best)return;
 if(h.chosen&&h.progress>.12){const a=anchors(h.chosen),score=scoreDrag(a.from,a.to,at);h.progress=score.progress;h.ready=score.ready;}else{h.chosen=best.g;h.progress=best.progress;h.ready=best.ready;}
 if(h.progress<.035){h.chosen=undefined;h.ready=false;}
 status(h.chosen?`${h.chosen.instruction}. ${h.ready?'Release to complete.':'Keep pulling toward the ring; pull back to reverse.'}`:'Pull toward one of the outlined destinations.');
}
function releaseGrip(allow=true){const h=grip;if(!h)return;const g=h.chosen,commit=allow&&h.ready;grip=undefined;controls.enabled=true;renderer.domElement.style.cursor='grab';epoch++;lastKey='';
 if(g&&h.progress>.005){lastGesture=g;const before=tree;if(commit){history.push({tree,steps});future=[];tree=g.after;steps++;selected=find(tree,g.gripId)?g.gripId:g.action.result.id;spotlight=undefined;}
 animation={before,after:g.after,kind:g.action.key,merge:g.action.merge??{},start:performance.now(),from:h.progress,to:commit?1:0,duration:commit?180:300};
 }else lastGesture=undefined;ui(false);status(commit?'The rewrite settles under your hands.':'Released without changing the expression.');drawGuides();}
function drawGuides(){const list=grip?grip.chosen?[grip.chosen]:grip.options:spotlight&&near?[spotlight]:[];guideSvg.replaceChildren();
 const el=(name:string,attrs:Record<string,string|number>,text?:string)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',name);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,String(v));if(text)n.textContent=text;guideSvg.appendChild(n);return n;};
 for(const g of list){const a=anchors(g),color=grip?.ready?'#d8bb65':'#eee6c8';el('path',{d:`M ${a.from.x} ${a.from.y} L ${a.to.x} ${a.to.y}`,stroke:color,'stroke-width':2,'stroke-dasharray':'5 7',fill:'none'});el('circle',{cx:a.to.x,cy:a.to.y,r:grip?.ready?24:20,fill:'#324c3d55',stroke:color,'stroke-width':3});el('text',{x:a.to.x+27,y:a.to.y+4,fill:'#233f34','font-size':13,stroke:'#faf7e4','stroke-width':3,'paint-order':'stroke'},g.action.label);
 if(!grip)el('circle',{cx:a.from.x,cy:a.from.y,r:18,fill:'none',stroke:'#d7b34e','stroke-width':3});}
}
function pick(e:{clientX:number;clientY:number}){pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(pointer,camera);return near?ray.intersectObjects(runes.children)[0]?.object.userData.nodeId as string|undefined:undefined;}
let groundDown:ScreenPoint|undefined;
renderer.domElement.tabIndex=0;
renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0)return;renderer.domElement.focus();const id=pick(e);if(id){beginGrip(id,{x:e.clientX,y:e.clientY});if(grip)renderer.domElement.setPointerCapture(e.pointerId);}else groundDown={x:e.clientX,y:e.clientY};});
renderer.domElement.addEventListener('pointermove',e=>{if(grip&&!grip.keyboard)updateGrip({x:e.clientX,y:e.clientY});else{hoverId=pick(e);renderer.domElement.style.cursor=hoverId?'grab':'default';}});
renderer.domElement.addEventListener('pointerup',e=>{if(e.button!==0)return;if(grip&&!grip.keyboard){releaseGrip();if(renderer.domElement.hasPointerCapture(e.pointerId))renderer.domElement.releasePointerCapture(e.pointerId);}else if(groundDown&&Math.hypot(e.clientX-groundDown.x,e.clientY-groundDown.y)<5){pick(e);const p=ray.ray.intersectPlane(plane,new T.Vector3());if(p&&Math.hypot(p.x,p.z)<14)navTarget=p.setY(0);}groundDown=undefined;});
renderer.domElement.addEventListener('pointercancel',()=>releaseGrip(false));
addEventListener('keydown',e=>{if((e.target as HTMLElement).matches('input,select,textarea'))return;
 if(e.key==='Escape'){releaseGrip(false);spotlight=undefined;$('settings').hidden=true;drawGuides();return;}
 if(e.key.toLowerCase()==='g'&&!e.repeat){e.preventDefault();if(grip)releaseGrip();else{const id=selected,p=worldPoint(id);if(p)beginGrip(id,screen(p),true);}return;}
 if(grip?.keyboard&&e.key.startsWith('Arrow')&&!e.repeat){grip.cursor.x+=(e.key==='ArrowRight'?8:e.key==='ArrowLeft'?-8:0);grip.cursor.y+=(e.key==='ArrowDown'?8:e.key==='ArrowUp'?-8:0);}
 if(e.code==='Space'){e.preventDefault();if(!e.repeat&&!grip){const id=hoverId??selected,p=worldPoint(id);if(p)beginGrip(id,screen(p),true);}return;}
 if(e.key==='Tab'&&near&&(e.target===renderer.domElement||grip)){e.preventDefault();activeHand=1-activeHand;return;}
 if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','w','a','s','d'].includes(e.key)){e.preventDefault();keys.add(e.key.toLowerCase());navTarget=undefined;}
});
addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());if(e.code==='Space'&&grip?.keyboard)releaseGrip();});
addEventListener('blur',()=>{keys.clear();releaseGrip(false);});
function updateHands(now:number,dt:number,moving:boolean){const g=grip?.chosen??(animation?lastGesture:undefined);const id=grip?.id??(g?.gripId??hoverId);let point=id?worldPoint(id):undefined;
 if(!point&&g)point=worldPoint(g.action.result.id);
 const brace=g?worldPoint(g.braceId)??worldPoint(g.owner.id):grip?worldPoint(grip.options[0].braceId):undefined;
 if(near&&!moving)avatar.rotation.y=Math.atan2(treeOrigin.x-avatar.position.x,treeOrigin.z-avatar.position.z);
 lehi.update(now,dt,moving,camera,near?point:undefined,near?brace:undefined,activeHand);
}
let last=performance.now(),nearOld=false;
function tick(now:number){requestAnimationFrame(tick);const dt=Math.min(.05,(now-last)/1000);last=now;if(document.hidden)return;
 const move=new T.Vector3((keys.has('d')||(!grip&&keys.has('arrowright'))?1:0)-(keys.has('a')||(!grip&&keys.has('arrowleft'))?1:0),0,(keys.has('s')||(!grip&&keys.has('arrowdown'))?1:0)-(keys.has('w')||(!grip&&keys.has('arrowup'))?1:0));
 if(navTarget){move.copy(navTarget).sub(avatar.position);if(move.length()<.12){navTarget=undefined;move.setScalar(0);}}
 const moving=move.lengthSq()>.001;
 if(moving){move.normalize();const proposed=avatar.position.clone().addScaledVector(move,dt*3.6);if(Math.hypot(proposed.x,proposed.z)<14.5&&!obstacles.some(o=>Math.hypot(proposed.x-o.x,proposed.z-o.z)<o.r+.3)){avatar.position.copy(proposed);avatar.rotation.y=Math.atan2(move.x,move.z);}else navTarget=undefined;}
 if(grip?.keyboard){const dx=(keys.has('arrowright')?1:0)-(keys.has('arrowleft')?1:0),dy=(keys.has('arrowdown')?1:0)-(keys.has('arrowup')?1:0);grip.cursor.x+=dx*dt*190;grip.cursor.y+=dy*dt*190;const here=screen(avatar.position),was=screen(grip.avatarStart);updateGrip({x:grip.cursor.x+(here.x-was.x)*2,y:grip.cursor.y+(here.y-was.y)*2});}
 near=Math.hypot(avatar.position.x-treeOrigin.x,avatar.position.z-treeOrigin.z)<5.5;
 const target=near?0:+value('spread');const next=spread+(target-spread)*(1-Math.exp(-dt*4));spread=Math.abs(next-target)<.008?target:Math.round(next*1000)/1000;
 if(near!==nearOld){nearOld=near;if(!near&&grip)releaseGrip(false);ui();}runes.visible=near;(ring.material as T.MeshBasicMaterial).color.set(solved(tree)?'#f1ce79':near?'#e6ddb7':'#bac8a8');
 if(!animation&&!grip&&spread===0&&near&&document.querySelector<HTMLButtonElement>('#actions button')?.disabled)ui(false);
 requestPose(now);controls.update();updateHands(now,dt,moving);drawGuides();renderer.render(scene,camera);$('world').dataset.near=String(near);$('world').dataset.busy=String(!!animation||!!grip);$('world').dataset.grip=grip?.chosen?.action.key??(grip?'holding':'none');$('world').dataset.gestureProgress=String(grip?.progress??0);$('world').dataset.player=`${avatar.position.x.toFixed(2)},${avatar.position.z.toFixed(2)}`;
}ui();requestAnimationFrame(tick);
