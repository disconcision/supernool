import * as T from 'three';import {directionalContact} from './navigation';import {rules,ruleId,ruleColor,Pin,allowsPin,advanceSpring} from './interaction';import {createLehi} from './lehi';import {Gesture,gestures,scoreDrag} from './gestures';import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
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
function rune(text:string,selected:boolean){const k=text+selected+value('sigils');let map=textures.get(k);if(!map){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d')!;ctx.fillStyle=selected?'#e4c981':'#f4efd8';ctx.strokeStyle=selected?'#92753a':'#66806b';ctx.lineWidth=7;ctx.beginPath();if(value('sigils')==='stone'){ctx.fillStyle=selected?'#b7c19c':'#4b7067';ctx.strokeStyle=selected?'#f1d088':'#aacbb6';ctx.moveTo(36,12);ctx.lineTo(91,17);ctx.lineTo(116,62);ctx.lineTo(86,112);ctx.lineTo(29,108);ctx.lineTo(12,61);ctx.closePath();}else ctx.arc(64,64,51,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle=value('sigils')==='stone'?'#fff0bf':'#334c3d';ctx.font='bold 66px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,64,65);map=new T.CanvasTexture(c);textures.set(k,map);}return new T.SpriteMaterial({map,depthTest:false,depthWrite:false,fog:false,toneMapped:false});}
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
 ($('inputMode') as HTMLSelectElement).disabled=busy;($('pinButton') as HTMLButtonElement).disabled=busy;($('clearPin') as HTMLButtonElement).disabled=busy||!pin;
 $('pinStatus').textContent=pin?'Holding '+format(find(tree,pin.id)!)+': position and incoming connection fixed.':'Second hand rests. F or Shift-click pins a node.';
 for(const box of document.querySelectorAll<HTMLInputElement>('#ruleList input'))box.disabled=busy;
 $('equippedCount').textContent=`${enabled.size} / ${rules.length} rules equipped`;
 for(const control of document.querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLButtonElement>('#settings input,#settings select,#seed'))control.disabled=busy||!!pin;
 $('selection').hidden=!near||!loaded||(bodyMode()&&!handFocus);const n=find(tree,selected);$('actions').replaceChildren();$('outline').replaceChildren();
 if(n){$('selectedLabel').textContent=format(n);$('selectedHelp').textContent=n.kind==='op'?'Hold a rune and pull toward a destination. The other hand rests unless you pin a node.':'Grip this rune to move its branch. Available destinations appear while you hold it.';
 for(const a of actions(n).filter(a=>allowed(n,a))){const b=document.createElement('button');b.textContent="Show: "+a.label;const small=document.createElement('small');small.textContent=a.detail;b.append(small);b.disabled=busy||spread>.12;if(suggested?.id===n.id&&suggested.key===a.key)b.className='suggested';b.onclick=()=>showGesture(n,a);$('actions').append(b);}
 }
 for(const node of walk(tree)){const b=document.createElement('button');b.textContent=(node.kind==='op'?'◇ ':'· ')+format(node);b.onclick=()=>select(node.id);b.disabled=busy;$('outline').append(b);}
 if(updateMessage)status(done?'You used local rewrites to uncover the simpler tree. Undo to explore another route, or walk away and let it spread again.':animation?'The hands are letting the tree settle…':near?nextClue():'Walk into its pale stone circle. The branches will settle into a working plane.');
 if(poseNow)updateRunes(poseNow);}
function select(id:string){if(animation||grip||!near)return;selected=id;hoverId=undefined;ui(false);}
function showGesture(n:Term,a:Action){if(bodyMode()&&!handFocus)setHandFocus(true);spotlight=gestures(tree).find(g=>g.owner.id===n.id&&g.action.key===a.key&&allowed(g.owner,g.action));if(spotlight){selected=spotlight.gripId;ui(false);status(spotlight.instruction+'. Grip the contact, then follow its colored path. Spell names are listed separately.');drawGuides();}}
$('hint').onclick=()=>{if(!near||animation||grip)return;const h=hint(tree,(owner,a,t)=>allowed(owner,a,t));if(h){showGesture(find(tree,h.nodeId)!,h.action);}else status('No route found with the equipped rules and pin. Release the pin or re-enable rules in the noolbox; undo is also available.');};
$('undo').onclick=()=>{if(animation||grip||!history.length)return;future.push({tree,steps});const prev=history.pop()!;tree=prev.tree;steps=prev.steps;epoch++;selected=tree.id;suggested=undefined;spotlight=undefined;pin=undefined;lastKey='';ui();drawGuides();};
$('redo').onclick=()=>{if(animation||grip||!future.length)return;history.push({tree,steps});const next=future.pop()!;tree=next.tree;steps=next.steps;epoch++;selected=tree.id;suggested=undefined;spotlight=undefined;pin=undefined;lastKey='';ui();drawGuides();};
$('reset').onclick=()=>{if(animation||grip)return;tree=initial();selected=tree.id;history=[];future=[];steps=0;epoch++;suggested=undefined;spotlight=undefined;pin=undefined;lastKey='';ui();drawGuides();};
$('approach').onclick=()=>navTarget=new T.Vector3(0,0,bodyMode()?-.8:1.7);
$('settingsButton').onclick=()=>$('settings').hidden=!$('settings').hidden;$('closeSettings').onclick=()=>$('settings').hidden=true;
$('sigils').onchange=()=>{if(poseNow)updateRunes(poseNow);};
$('lighting').onchange=()=>{treeMesh.material=materials[value('lighting') as keyof typeof materials];};
for(const id of ['surface','resolution','thickness','taper','bow','random','irregularity','twist','facets','blend','spread','height'])$(id).addEventListener('input',()=>{lastKey='';});$('seed').onclick=()=>{shapeSeed++;lastKey='';};
type ScreenPoint={x:number;y:number};
type Grip={id:string;options:Gesture[];chosen?:Gesture;intent?:Gesture;progress:number;target:number;velocity:number;ready:boolean;cursorReady:boolean;cursor:ScreenPoint;from:ScreenPoint;keyboard:boolean;body:boolean;avatarStart:T.Vector3};
let grip:Grip|undefined,spotlight:Gesture|undefined,hoverId:string|undefined,activeHand=1,lastGesture:Gesture|undefined;
let handFocus=false;const releasedBeforeReuse=new Set<string>(),heldDirections=new Set<string>();
let pin:Pin|undefined,lingerPoint:T.Vector3|undefined,lastContactAt=0;
const enabled=new Set(rules.map(r=>r.id));
const keys=new Set<string>(),ray=new T.Raycaster(),pointer=new T.Vector2(),plane=new T.Plane(new T.Vector3(0,1,0),0),walkVelocity=new T.Vector3();
const guideSvg=$('gestureGuide'),spells=$('spells');
const bodyMode=()=>value('inputMode')==='body';
function screen(p:T.Vector3):ScreenPoint{const v=p.clone().project(camera);return {x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};}
function worldPoint(id:string,pose=poseNow){return pose?.points.get(id)?.clone().add(treeOrigin);}
function allowed(owner:Term,action:Action,source=tree){return enabled.has(ruleId(owner,action))&&allowsPin(source,owner,action,pin,layoutOptions());}
function anchors(g:Gesture){const before=layout(tree,layoutOptions()),after=layout(g.after,layoutOptions());const from=screen(before.points.get(g.gripId)!.clone().add(treeOrigin));
 const endpoint=g.action.key==='swap'||g.action.key.startsWith('group')?after.points.get(g.gripId)!:(after.points.get(g.targetId)??before.points.get(g.targetId))!;
 const to=screen(endpoint.clone().add(treeOrigin));return {from,to};}
function available(id:string){return gestures(tree,id).filter(g=>allowed(g.owner,g.action)).filter(g=>{const a=anchors(g);return Math.hypot(a.to.x-a.from.x,a.to.y-a.from.y)>10;});}
function togglePin(id=selected){if(grip||animation||!near||spread>.12)return;if(pin?.id===id)pin=undefined;else{const p=poseNow?.points.get(id);if(!p)return;pin={id,position:{x:p.x,y:p.y,z:p.z}};}spotlight=undefined;ui(false);status(pin?'The other hand holds this node fixed. Moves that relocate or reparent it are unavailable.':'Second-hand pin released.');}
function beginGrip(id:string,at:ScreenPoint,keyboard=false){if(bodyMode()&&!handFocus)return;if(animation||grip||!near||spread>.12||!loaded)return;const list=available(id);selected=id;if(!list.length){ui(false);status('No equipped gesture can move this contact with the current pin. Choose another node, release the pin, or open the noolbox.');return;}
 grip={id,options:list,progress:0,target:0,velocity:0,ready:false,cursorReady:false,cursor:at,from:at,keyboard:keyboard||bodyMode(),body:bodyMode(),avatarStart:avatar.position.clone()};clearMovement();controls.enabled=false;renderer.domElement.style.cursor='grabbing';epoch++;lastKey='';ui(false);status(bodyMode()?'GRIP · Keep Space held. Arrows move Lehi to pull; release Space to settle.':'Hold and pull along a colored path. Return to the source to change direction.');}
function updateGrip(at:ScreenPoint){if(!grip)return;const h=grip;
 const candidates=h.options.map(g=>{const a=anchors(g),score=scoreDrag(a.from,a.to,at);return {g,...score,rank:score.distance+(score.progress<=0?100:0)};}).sort((a,b)=>a.rank-b.rank);
 const best=candidates[0];if(!best)return;
 const chosen=h.intent??(h.chosen&&h.target>.12?h.chosen:best.g);const a=anchors(chosen),score=scoreDrag(a.from,a.to,at);h.chosen=chosen;h.target=score.progress;h.cursorReady=score.ready;
 if(!h.body){h.progress=h.target;h.ready=score.ready;}
 if(h.target<.035&&h.progress<.04&&!h.intent){h.chosen=undefined;h.ready=false;}
 if(h.chosen)status(h.chosen.instruction+'. '+(h.ready?'Release to complete.':h.body?'Move Lehi to pull; step back to relax.':'Keep pulling; return toward the source to reverse.'));
}
function releaseGrip(allow=true){const h=grip;if(!h)return;const g=h.chosen,commit=allow&&h.ready;if(h.body)clearMovement();grip=undefined;controls.enabled=true;renderer.domElement.style.cursor='grab';epoch++;lastKey='';
 const p=worldPoint(h.id);if(p)lingerPoint=p;lastContactAt=performance.now();
 if(g&&h.progress>.005){lastGesture=g;const before=tree;if(commit){history.push({tree,steps});future=[];tree=g.after;steps++;hoverId=undefined;selected=find(tree,g.gripId)?g.gripId:g.action.result.id;spotlight=undefined;}
 animation={before,after:g.after,kind:g.action.key,merge:g.action.merge??{},start:performance.now(),from:h.progress,to:commit?1:0,duration:commit?180:350};
 }else lastGesture=undefined;ui(false);status(commit?'The rewrite settles under your hands.':'Released without changing the expression.');}
function chooseContact(offset:number){if(grip||animation||!near)return;const nodes=walk(tree);const i=nodes.findIndex(n=>n.id===selected);selected=nodes[(i+offset+nodes.length)%nodes.length].id;hoverId=undefined;spotlight=undefined;lingerPoint=worldPoint(selected);lastContactAt=performance.now();ui(false);}
// Do not carry a held walking key across walk / hand / pull transitions.
function clearMovement(){for(const key of heldDirections)releasedBeforeReuse.add(key);keys.clear();navTarget=undefined;walkVelocity.setScalar(0);}
function setHandFocus(on:boolean){if(grip||animation)return;if(on&&(!near||spread>.12||!loaded)){status('Let the tree settle, then press E to reach in.');return;}
 clearMovement();handFocus=on;hoverId=undefined;spotlight=undefined;
 lingerPoint=on?worldPoint(selected):undefined;
 if(!on)pin=undefined;
 ui(false);status(on?'HAND · Arrows move between sigils. Hold Space on a contact, then use arrows to pull with Lehi.':'WALK · Arrows move Lehi. Press E near the tree to reach in.');
}
function navigateHand(dx:number,dy:number){if(!poseNow||animation)return;
 const contacts=Array.from(poseNow.points,([id,p])=>({id,...screen(p.clone().add(treeOrigin))}));
 const next=directionalContact(contacts,selected,dx,dy);
 if(next!==selected){selected=next;spotlight=undefined;lingerPoint=worldPoint(next);lastContactAt=performance.now();ui(false);}
}
function drawGuides(){
 const validHover=hoverId&&find(tree,hoverId)?hoverId:undefined;
 const focus=grip?.id??spotlight?.gripId??(bodyMode()?selected:validHover??selected);
 const list=near&&(!bodyMode()||handFocus)?(grip?.options??available(focus)):[];guideSvg.replaceChildren();
 const selectedKey=grip?.chosen?.action.key??spotlight?.action.key;
 const signature=JSON.stringify([list.map(g=>[g.owner.id,g.action.key]),selectedKey,grip?.ready,bodyMode(),pin?.id,value('spellPlacement')]);
 if(spells.dataset.signature!==signature){spells.dataset.signature=signature;spells.replaceChildren();for(const [i,g]of list.entries()){const row=document.createElement('div');row.className='spell'+(g.action.key===selectedKey?' active':'');row.style.setProperty('--spell',ruleColor(g.owner,g.action));row.textContent=`${i+1} · ${g.action.label}`;spells.appendChild(row);}}
 const minY=poseNow?Math.min(...Array.from(poseNow.points.values()).map(p=>screen(p.clone().add(treeOrigin)).y)):200;
 const above=value('spellPlacement')==='above'&&minY>125;spells.className=above?'above':'side';
 if(above&&spells.parentElement!==document.body)document.body.appendChild(spells);else if(!above&&spells.parentElement!==$('selection'))$('selection').insertBefore(spells,$('spellEmpty'));
 $('spellEmpty').hidden=list.length>0;$('spellCount').textContent=`${list.length} available · ${pin?'second hand pinned':'second hand resting'}`;
 const el=(name:string,attrs:Record<string,string|number>)=>{const n=document.createElementNS('http://www.w3.org/2000/svg',name);for(const [k,v]of Object.entries(attrs))n.setAttribute(k,String(v));guideSvg.appendChild(n);return n;};
 for(const [i,g]of list.entries()){const a=anchors(g),color=ruleColor(g.owner,g.action),active=g.action.key===selectedKey,opacity=selectedKey&&!active?.55:.9;
 if(value('guideStyle')==='paths')el('path',{d:`M ${a.from.x} ${a.from.y} L ${a.to.x} ${a.to.y}`,stroke:color,'stroke-width':active?2.5:1.5,opacity,'stroke-dasharray':i%2?'4 5':'none',fill:'none'});
 el('circle',{'data-role':'destination','data-rule':g.action.key,cx:a.to.x,cy:a.to.y,r:active&&grip?.ready?6:4,fill:color,opacity,stroke:'#fff7e5','stroke-width':1});
 if(value('guideStyle')==='branches'&&poseNow){const root=find(tree,g.gripId);const ids=new Set(root?walk(root).map(n=>n.id):[]);for(const edge of poseNow.edges)if(ids.has(edge.id)){const x=screen(edge.a.clone().add(treeOrigin)),y=screen(edge.b.clone().add(treeOrigin));el('path',{d:`M ${x.x} ${x.y} L ${y.x} ${y.y}`,stroke:color,'stroke-width':3,opacity:active?.6:.2,fill:'none'});}}
 }
 if(list.length){const a=anchors(list[0]);el('circle',{'data-role':'source',cx:a.from.x,cy:a.from.y,r:2,fill:'#f8e6a2',stroke:'#4c6554','stroke-width':1});}
 if(pin){const p=worldPoint(pin.id);if(p){const a=screen(p);el('path',{d:`M ${a.x-5} ${a.y+10} L ${a.x+5} ${a.y+10}`,stroke:'#45665d','stroke-width':3});}}
 for(const sprite of runes.children){const s=sprite as T.Sprite;const current=list.find(g=>g.gripId===s.userData.nodeId);s.material.color.set(s.userData.nodeId===pin?.id?'#b6e3d1':'#ffffff');}
 $('world').dataset.candidates=String(list.length);$('world').dataset.pin=pin?.id??'none';
}
function pick(e:{clientX:number;clientY:number}){pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(pointer,camera);return near?ray.intersectObjects(runes.children)[0]?.object.userData.nodeId as string|undefined:undefined;}
let groundDown:ScreenPoint|undefined;
renderer.domElement.tabIndex=0;
renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0)return;renderer.domElement.focus();const id=pick(e);if(id){if(e.shiftKey){togglePin(id);return;}if(bodyMode()){if(!handFocus)setHandFocus(true);select(id);lingerPoint=worldPoint(id);return;}beginGrip(id,{x:e.clientX,y:e.clientY});if(grip)renderer.domElement.setPointerCapture(e.pointerId);}else if(!bodyMode()||!handFocus)groundDown={x:e.clientX,y:e.clientY};});
renderer.domElement.addEventListener('pointermove',e=>{if(grip&&!grip.keyboard)updateGrip({x:e.clientX,y:e.clientY});else if(!grip&&!bodyMode()){
 hoverId=pick(e);if(hoverId){lingerPoint=worldPoint(hoverId);lastContactAt=performance.now();}else if(near&&lingerPoint){const floatingPlane=new T.Plane().setFromNormalAndCoplanarPoint(camera.getWorldDirection(new T.Vector3()),lingerPoint);const p=ray.ray.intersectPlane(floatingPlane,new T.Vector3());if(p&&p.distanceTo(treeOrigin.clone().setY(4))<9)lingerPoint=p;}
 renderer.domElement.style.cursor=hoverId?'grab':'default';
}});
renderer.domElement.addEventListener('pointerup',e=>{if(e.button!==0)return;if(grip&&!grip.keyboard){releaseGrip();if(renderer.domElement.hasPointerCapture(e.pointerId))renderer.domElement.releasePointerCapture(e.pointerId);}else if(groundDown&&Math.hypot(e.clientX-groundDown.x,e.clientY-groundDown.y)<5){pick(e);const p=ray.ray.intersectPlane(plane,new T.Vector3());if(p&&Math.hypot(p.x,p.z)<14)navTarget=p.setY(0);}groundDown=undefined;});
renderer.domElement.addEventListener('pointercancel',()=>releaseGrip(false));
addEventListener('keydown',e=>{if((e.target as HTMLElement).matches('input,select,textarea'))return;
 const key=e.key.toLowerCase();
 if(e.key==='Escape'){if(grip)releaseGrip(false);else if(bodyMode()&&handFocus)setHandFocus(false);spotlight=undefined;$('settings').hidden=true;$('toolbox').hidden=true;return;}
 if(key==='h'&&!e.repeat){$('hint').click();return;}
 if(key==='f'&&!e.repeat){if(!bodyMode()||handFocus)togglePin();return;}
 if(bodyMode()&&key==='e'){e.preventDefault();if(!e.repeat)setHandFocus(!handFocus);return;}
 if(!bodyMode()&&['q','e'].includes(key)&&!e.repeat){chooseContact(key==='e'?1:-1);return;}
 if(grip&&/^[1-9]$/.test(e.key)&&grip.progress<.1){grip.intent=grip.options[+e.key-1];grip.chosen=grip.intent;return;}
 if(!bodyMode()&&key==='g'&&!e.repeat){e.preventDefault();if(grip)releaseGrip();else{const p=worldPoint(selected);if(p)beginGrip(selected,screen(p),true);}return;}
 if(e.code==='Space'){e.preventDefault();if(!e.repeat&&!grip){const id=bodyMode()?selected:hoverId??selected,p=worldPoint(id);if(p)beginGrip(id,screen(p),true);}return;}
 if(e.key==='Tab'&&near&&(e.target===renderer.domElement||grip)){e.preventDefault();activeHand=1-activeHand;return;}
 if(['arrowup','arrowdown','arrowleft','arrowright','w','a','s','d'].includes(key)){e.preventDefault();heldDirections.add(key);
  if(releasedBeforeReuse.has(key)||animation)return;
  if(bodyMode()&&handFocus&&!grip){navigateHand(key==='d'||key==='arrowright'?1:key==='a'||key==='arrowleft'?-1:0,key==='s'||key==='arrowdown'?1:key==='w'||key==='arrowup'?-1:0);return;}
  keys.add(key);navTarget=undefined;
  if(bodyMode()&&!e.repeat){const right=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0).setY(0).normalize(),forward=new T.Vector3(right.z,0,-right.x);const direction=key==='d'||key==='arrowright'?right:key==='a'||key==='arrowleft'?right.negate():key==='w'||key==='arrowup'?forward:forward.negate();walkVelocity.addScaledVector(direction,1.6).clampLength(0,3.6);}
 }
});
addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());heldDirections.delete(e.key.toLowerCase());releasedBeforeReuse.delete(e.key.toLowerCase());if(e.code==='Space'&&grip?.keyboard)releaseGrip();});
addEventListener('blur',()=>{releaseGrip(false);clearMovement();releasedBeforeReuse.clear();heldDirections.clear();});
function updateHands(now:number,dt:number,moving:boolean){const g=grip?.chosen??(animation?lastGesture:undefined);const id=grip?.id??(g?.gripId??(bodyMode()?(handFocus?selected:undefined):hoverId));let point=id?worldPoint(id):undefined;
 if(!point&&g)point=worldPoint(g.action.result.id);
 if(point){lingerPoint=point.clone();lastContactAt=now;}else if(value('handStay')==='stay'||now-lastContactAt<1200)point=lingerPoint;
 if(bodyMode()&&!handFocus&&!grip&&!animation)point=undefined;
 const brace=pin?worldPoint(pin.id):undefined;
 if(near&&!moving)avatar.rotation.y=Math.atan2(treeOrigin.x-avatar.position.x,treeOrigin.z-avatar.position.z);
 lehi.update(now,dt,moving,camera,near?point:undefined,near?brace:undefined,activeHand,!!grip||!!animation);
 $('world').dataset.handState=!near?'home':point?'tree':'home';
}
for(const rule of rules){const label=document.createElement('label');label.className='rule';const checkbox=document.createElement('input');checkbox.type='checkbox';checkbox.checked=true;checkbox.dataset.rule=rule.id;checkbox.onchange=()=>{if(checkbox.checked)enabled.add(rule.id);else enabled.delete(rule.id);spotlight=undefined;ui(false);};const text=document.createElement('span');text.textContent=rule.name;const small=document.createElement('small');small.textContent=rule.equation;text.append(small);label.append(checkbox,text);label.style.setProperty('--rule',rule.color);$('ruleList').append(label);}
$('toolboxButton').onclick=()=>$('toolbox').hidden=!$('toolbox').hidden;$('closeToolbox').onclick=()=>$('toolbox').hidden=true;
$('pinButton').onclick=()=>togglePin();$('clearPin').onclick=()=>{pin=undefined;spotlight=undefined;ui(false);};
$('inputMode').onchange=()=>{releaseGrip(false);keys.clear();walkVelocity.setScalar(0);hoverId=undefined;spotlight=undefined;handFocus=false;lingerPoint=undefined;pin=undefined;clearMovement();ui(false);renderer.domElement.focus();};
if(new URLSearchParams(location.search).get('mode')==='body')($('inputMode') as HTMLSelectElement).value='body';
$('interact').onclick=()=>{setHandFocus(!handFocus);renderer.domElement.focus();};
let last=performance.now(),nearOld=false;
function tick(now:number){requestAnimationFrame(tick);const dt=Math.min(.05,(now-last)/1000);last=now;if(document.hidden)return;
 const arrowWalk=bodyMode()||!grip;
 const dx=(keys.has('d')||(arrowWalk&&keys.has('arrowright'))?1:0)-(keys.has('a')||(arrowWalk&&keys.has('arrowleft'))?1:0),dz=(keys.has('s')||(arrowWalk&&keys.has('arrowdown'))?1:0)-(keys.has('w')||(arrowWalk&&keys.has('arrowup'))?1:0);
 const right=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0).setY(0).normalize(),forward=new T.Vector3(right.z,0,-right.x);
 const move=bodyMode()?right.clone().multiplyScalar(dx).addScaledVector(forward,-dz):new T.Vector3(dx,0,dz);
 if(navTarget){move.copy(navTarget).sub(avatar.position);if(move.length()<.12){navTarget=undefined;move.setScalar(0);}}
 const load=grip?.body?Math.abs(grip.target-grip.progress):0;
 const targetVelocity=move.lengthSq()>.001?move.normalize().multiplyScalar(3.6/(1+load*1.8)):move;
 if(bodyMode()&&!navTarget)walkVelocity.lerp(targetVelocity,1-Math.exp(-dt*9));else walkVelocity.copy(targetVelocity);
 if(bodyMode()&&handFocus&&!grip){walkVelocity.setScalar(0);navTarget=undefined;}
 const moving=walkVelocity.lengthSq()>.01;
 if(moving){const proposed=avatar.position.clone().addScaledVector(walkVelocity,dt);if(Math.hypot(proposed.x,proposed.z)<14.5&&!obstacles.some(o=>Math.hypot(proposed.x-o.x,proposed.z-o.z)<o.r+.3)){avatar.position.copy(proposed);avatar.rotation.y=Math.atan2(walkVelocity.x,walkVelocity.z);}else{navTarget=undefined;walkVelocity.setScalar(0);}}
 if(grip?.keyboard){if(grip.body){const d=avatar.position.clone().sub(grip.avatarStart);updateGrip({x:grip.from.x+d.dot(right)*85,y:grip.from.y-d.dot(forward)*85});const spring=advanceSpring({value:grip.progress,velocity:grip.velocity},grip.target,dt,+value('mass'));grip.progress=spring.value;grip.velocity=spring.velocity;grip.ready=grip.cursorReady&&grip.progress>=.88&&Math.abs(grip.velocity)<.5;}
 else{const dx=(keys.has('arrowright')?1:0)-(keys.has('arrowleft')?1:0),dy=(keys.has('arrowdown')?1:0)-(keys.has('arrowup')?1:0);grip.cursor.x+=dx*dt*190;grip.cursor.y+=dy*dt*190;const here=screen(avatar.position),was=screen(grip.avatarStart);updateGrip({x:grip.cursor.x+(here.x-was.x)*2,y:grip.cursor.y+(here.y-was.y)*2});}}
 // Keep the encounter alive through a held gesture and its settling motion.
 // Proximity gates approach/departure, not whether an already-held pull survives.
 near=!!grip||!!animation||Math.hypot(avatar.position.x-treeOrigin.x,avatar.position.z-treeOrigin.z)<(nearOld?7.5:5.5);
 if(!near){pin=undefined;lingerPoint=undefined;hoverId=undefined;handFocus=false;}
 const target=near?0:+value('spread'),next=spread+(target-spread)*(1-Math.exp(-dt*4));spread=Math.abs(next-target)<.008?target:Math.round(next*1000)/1000;
 if(near!==nearOld){nearOld=near;if(!near&&grip)releaseGrip(false);ui();}runes.visible=near;(ring.material as T.MeshBasicMaterial).color.set(solved(tree)?'#f1ce79':near?'#e6ddb7':'#bac8a8');
 if(!animation&&!grip&&spread===0&&near&&document.querySelector<HTMLButtonElement>('#actions button')?.disabled)ui(false);
 requestPose(now);controls.update();updateHands(now,dt,moving);drawGuides();renderer.render(scene,camera);
 $('world').dataset.near=String(near);$('world').dataset.busy=String(!!animation||!!grip);$('world').dataset.grip=grip?.chosen?.action.key??(grip?'holding':'none');$('world').dataset.gestureProgress=String(grip?.progress??0);$('world').dataset.springTarget=String(grip?.target??0);$('world').dataset.player=`${avatar.position.x.toFixed(2)},${avatar.position.z.toFixed(2)}`;
 $('world').dataset.controlPhase=bodyMode()?(animation?'settling':grip?'pull':handFocus?'hand':'walk'):'mouse';
 $('world').dataset.selected=selected;$('world').dataset.brace=pin?'pinned':'rest';
 $('interact').hidden=!bodyMode()||!near;($('interact') as HTMLButtonElement).disabled=!!grip||!!animation;$('interact').textContent=handFocus?'Leave tree · E':'Reach in · E';
 $('controlHelp').textContent=bodyMode()?'E: walk / hand · Arrows: move hand or Lehi · Hold Space: grip and pull · Release: settle · Esc: cancel · Optional F: pin, H: hint, 1–9: route':'WASD / arrows: move · Hold rune: pull · F / Shift-click: pin · H: hint · Esc: cancel';
 $('pullStatus').textContent=bodyMode()&&animation?'SETTLING · The tree is catching up; hand control resumes shortly':grip?.body?`PULL · Keep Space held · Spring ${Math.round(grip.progress*100)}% · pull ${Math.round(grip.target*100)}%${grip.ready?' · release ready':''}`:bodyMode()?(handFocus?'HAND · Arrows choose a sigil · Hold Space, then move to pull · E leaves':'WALK · Arrows move Lehi · E reaches into the tree'):'Hold a rune and pull · Shift-click to pin';
}ui();requestAnimationFrame(tick);
