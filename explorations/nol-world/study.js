import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const $ = id => document.getElementById(id);
const scene = new T.Scene(); scene.background = new T.Color('#e6e9de');
scene.fog = new T.Fog('#e6e9de',42,100);
const renderer = new T.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2)); renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFShadowMap;
renderer.outputColorSpace=T.SRGBColorSpace; renderer.setClearColor('#e6e9de');
$('canvas').append(renderer.domElement);
scene.add(new T.HemisphereLight('#fcf6df','#6d8277',2.5));
const sun = new T.DirectionalLight('#fff4d7',3.2); sun.position.set(-12,24,12); sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048); Object.assign(sun.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:80}); sun.shadow.bias=-.0004; scene.add(sun);
const ortho = new T.OrthographicCamera(), perspective=new T.PerspectiveCamera(38,innerWidth/innerHeight,.1,160);
let camera=ortho, controls;
function cameraSetup(){
 const aspect=innerWidth/innerHeight; Object.assign(ortho,{left:-12*aspect,right:12*aspect,top:12,bottom:-12,near:.1,far:160});ortho.updateProjectionMatrix();
 perspective.aspect=aspect;perspective.updateProjectionMatrix();
 camera=$('camera').value==='iso'?ortho:perspective;
 camera.position.set(24,24,32); camera.lookAt(-2,3,0);
 controls?.dispose();controls=new OrbitControls(camera,renderer.domElement); controls.target.set(-2,3,0);controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.48;controls.minDistance=10;controls.maxDistance=70;controls.minZoom=.55;controls.maxZoom=2.6;
}
cameraSetup();
const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.92,...extra});
const moss=mat('#7f9871'), rock=mat('#717f78'), wood=mat('#b7ba98'), gold=mat('#e4aa78'), ivory=mat('#f2ead1');
function mesh(geo,material,parent=scene){const m=new T.Mesh(geo,material);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
const terrain=mesh(new T.CylinderGeometry(19,20,1.2,80),mat('#9eac8e'));terrain.position.y=-1;
const ring=mesh(new T.CylinderGeometry(19.5,17,2,70),rock);ring.position.y=-2.5;
const random = (()=>{let s=234;return()=>{s=(1664525*s+1013904223)>>>0;return s/4294967296;};})();
for(let i=0;i<125;i++){
 const a=random()*Math.PI*2,r=10+random()*8,x=Math.cos(a)*r,z=Math.sin(a)*r;
 const stone=mesh(new T.DodecahedronGeometry(.3+random()*.8,0),i%3?moss:rock);stone.position.set(x,-.1,z);stone.scale.y=.4+random();stone.rotation.set(random(),random(),random());
}
// Small instanced tufts give a brushed, grass-like edge without texture assets.
const blade=new T.ConeGeometry(.085,.55,3);blade.translate(0,.25,0);
const grass=new T.InstancedMesh(blade,moss,2200);const dummy=new T.Object3D();
for(let i=0;i<2200;i++){const a=random()*6.283,r=10+random()*8;dummy.position.set(Math.cos(a)*r,-.35,Math.sin(a)*r);dummy.rotation.set(random()*.3,random()*6.28,random()*.3);dummy.scale.setScalar(.5+random());dummy.updateMatrix();grass.setMatrixAt(i,dummy.matrix);}scene.add(grass);

const world=new T.Group(); world.position.x=4;scene.add(world);
let mode='plates',nodes=[],edges=[],extras=new T.Group();world.add(extras);
const colors=['#82b9a9','#a9c7ab','#e9bb8d','#aec7d1','#d0c69e'];
const ray=new T.Raycaster(),pointer=new T.Vector2();let pickables=[];
function label(text){const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#f7f4df';ctx.shadowColor='#29493b';ctx.shadowBlur=7;ctx.font='58px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,64,65);const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const sp=new T.Sprite(new T.SpriteMaterial({map:tex,depthTest:true}));sp.scale.set(1.25,1.25,1);return sp;}
function rounded(w,h,r){const s=new T.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s;}
function plateGeo(w,h){const g=new T.ExtrudeGeometry(rounded(w,h,Math.min(h/3,.95)),{depth:.48,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.12,bevelThickness:.12,curveSegments:14});g.rotateX(-Math.PI/2);return g;}
function clean(group){group.traverse(o=>{o.geometry?.dispose();if(o.material){const mm=Array.isArray(o.material)?o.material:[o.material];mm.forEach(m=>{if(![moss,rock,wood,gold,ivory].includes(m)){m.map?.dispose();m.dispose();}});}});group.clear();}
let treeGroup=new T.Group();world.add(treeGroup);
const descriptions={plates:['Glass terraces','Containment becomes elevation. Parent plates carry their children; the operator occupies an exposed central landing. Try the same structure in glass, resin, or stone.'],tree:['Living algebra','The root grows upward. Runes live at the forks; branches carry the relationship. A shallow depth keeps the gesture readable while the body remains fully three-dimensional.'],canyon:['Canyon graft','An expression grows out of a cliff. Rebranching changes its silhouette across the passage. This study explores the gesture; a real gate will need a collision-aware layout.']};
function rebuild(){
 clean(treeGroup);clean(extras); nodes=[];edges=[];pickables=[];
 $('material').disabled=mode!=='plates'; $('title').textContent=descriptions[mode][0];$('description').textContent=descriptions[mode][1];
 for(let i=0;i<5;i++){
  const g=new T.Group();treeGroup.add(g);
  const surf=$('material').value;
  let material= mode==='plates'?mat(colors[i],surf==='glass'?{transparent:true,opacity:.64,roughness:.16,metalness:.08,depthWrite:false}:surf==='plastic'?{roughness:.33}:{}):wood;
  if(surf==='stone'&&mode==='plates')material=mat(i<2?'#7f9277':'#a8b595');
  const body=mesh(mode==='plates'?plateGeo(i===0?14:i===1?8:2.8,i===0?9:i===1?5.7:2.3):new T.IcosahedronGeometry(i<2?.6:.65,1),material,g);
  if(mode==='plates'){
   const line=new T.LineSegments(new T.EdgesGeometry(body.geometry,35),new T.LineBasicMaterial({color:'#e6f1d9',transparent:true,opacity:.55}));g.add(line);
  }
  const rune=label(['+','+','a','b','c'][i]);g.add(rune);
  rune.position.set(0,mode==='plates'?.85:1,mode==='plates'&&i<2?1.8:0);
  const grip=mesh(new T.SphereGeometry(.65,12,8),new T.MeshBasicMaterial({visible:false}),g);grip.position.copy(rune.position);grip.userData.node=i;body.userData.node=i;pickables.push(grip,body);
  nodes.push(g);
 }
 if(mode!=='plates')for(let i=0;i<5;i++){
  const g=new T.CylinderGeometry(.15,.38,1,9,12);const v=g.attributes.position;
  for(let j=0;j<v.count;j++){const y=v.getY(j);v.setX(j,v.getX(j)+Math.sin((y+.5)*Math.PI)*.36);v.setZ(j,v.getZ(j)+Math.sin((y+.5)*Math.PI*2)*.12);}g.computeVertexNormals();edges.push(mesh(g,wood,treeGroup));
 }
 if(mode==='canyon'){
  for(const side of [-1,1])for(let i=0;i<9;i++){
   const m=mesh(new T.CylinderGeometry(1.7,2.2,11+(i%3),5),rock,extras);m.position.set(side*10,-.3,-10+i*2.5);m.rotation.z=side*.08;
   const cap=mesh(new T.CylinderGeometry(1.8,1.7,.35,5),moss,extras);cap.position.set(side*10,5.5+(i%3)*.5,-10+i*2.5);
  }
 }
 for(let i=0;i<7;i++){const m=mesh(new T.DodecahedronGeometry(.6+i*.08,0),moss,extras);m.position.set(-7+i*2,-.2,-5.5);m.scale.y=.5;}
}
// Two presentations of the SAME ordered term: +(+(a,b),c) ↔ +(a,+(b,c)).
// Identity of the five visible objects survives continuously across the move.
const plateA=[[0,.1,0],[-2.7,1.35,-.6],[-4.5,2.65,-1.5],[-.8,2.65,-1.5],[4.7,1.35,-.6]];
const plateB=[[0,.1,0],[2.7,1.35,-.6],[-4.7,1.35,-.6],[.8,2.65,-1.5],[4.5,2.65,-1.5]];
const treeA=[[0,.4,0],[-3,4.5,0],[-5.5,8,-.4],[-.5,8,.4],[5.5,8,0]];
const treeB=[[0,.4,0],[3,4.5,0],[-5.5,8,0],[.5,8,-.4],[5.5,8,.4]];
let amount=0,target=0,committed=0,drag=null,spaceStart=null;
const lerp=(a,b,t)=>a+(b-a)*t;
function location(i,t){const a=mode==='plates'?plateA[i]:treeA[i],b=mode==='plates'?plateB[i]:treeB[i];let p=new T.Vector3(...a).lerp(new T.Vector3(...b),t);const separation=Number($('spacing').value);if(mode==='plates')p.y*=separation;else {p.x*=separation;p.z*=separation;if(mode==='canyon')p.set(p.y-8,p.x*.55+5,p.z);}return p;}
function segment(m,a,b){const d=new T.Vector3().subVectors(b,a);m.position.copy(a).add(b).multiplyScalar(.5);m.scale.y=Math.max(.001,d.length());m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());}
function pose(){
 const scale=Number($('scale').value);treeGroup.scale.setScalar(scale);
 nodes.forEach((n,i)=>n.position.copy(location(i,amount)));
 if(mode!=='plates'){
  const p=nodes.map(n=>n.position);
  const root=mode==='canyon'?new T.Vector3(-10,3,0):new T.Vector3(0,-.4,0);
  segment(edges[0],root,p[0]);segment(edges[1],p[0],p[1]);
  segment(edges[2],p[1].clone().lerp(p[0],amount),p[2]);
  segment(edges[3],p[1],p[3]);segment(edges[4],p[0].clone().lerp(p[1],amount),p[4]);
 }
}
const avatar=new T.Group();scene.add(avatar);avatar.position.set(7,3,6);
mesh(new T.ConeGeometry(.38,.9,7),mat('#c98266'),avatar).position.y=.45;
mesh(new T.SphereGeometry(.25,12,8),ivory,avatar).position.y=1.1;
const hat=mesh(new T.ConeGeometry(.34,.42,7),mat('#36594f'),avatar);hat.position.y=1.37;hat.rotation.z=-.17;
function makeHand(){const g=new T.Group();scene.add(g);mesh(new T.BoxGeometry(.42,.38,.25),gold,g);for(let i=0;i<4;i++){const f=mesh(new T.BoxGeometry(.085,.28,.11),ivory,g);f.position.set(-.15+i*.1,.29,0);}const thumb=mesh(new T.BoxGeometry(.15,.26,.17),gold,g);thumb.position.set(-.29,.04,0);thumb.rotation.z=-.6;return g;}
const hands=[makeHand(),makeHand()];const tetherGeo=new T.BufferGeometry().setFromPoints([new T.Vector3(),new T.Vector3()]);const tether=new T.Line(tetherGeo,new T.LineBasicMaterial({color:'#ebc095',transparent:true,opacity:.7}));scene.add(tether);
const keys=new Set();
function finish(){committed=target>=.5?1:0;target=committed;$('expression').textContent=committed?'a + (b + c)':'(a + b) + c';$('status').textContent='Associativity · the value is unchanged';}
addEventListener('keydown',e=>{if(/INPUT|SELECT|BUTTON/.test(document.activeElement.tagName))return;if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();keys.add(e.key.toLowerCase());if(e.code==='Space'&&!spaceStart)spaceStart={pos:avatar.position.clone(),right:new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0).setY(0).normalize(),amount:target};});
addEventListener('keyup',e=>{keys.delete(e.key.toLowerCase());if(e.code==='Space'&&spaceStart){finish();spaceStart=null;}});
addEventListener('blur',()=>{keys.clear();spaceStart=null;drag=null;controls.enabled=true;});
renderer.domElement.addEventListener('pointerdown',e=>{
 pointer.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pickables)[0];
 if(hit){drag={x:e.clientX,amount:target,node:hit.object.userData.node};controls.enabled=false;renderer.domElement.setPointerCapture(e.pointerId);$('status').textContent='Pull horizontally · release to settle into a valid tree';}
},true);
renderer.domElement.addEventListener('pointermove',e=>{if(drag)target=T.MathUtils.clamp(drag.amount+(e.clientX-drag.x)/240,0,1);});
function release(){if(drag){finish();drag=null;controls.enabled=true;}}
renderer.domElement.addEventListener('pointerup',release);renderer.domElement.addEventListener('pointercancel',release);
$('rewrite').onclick=()=>{target=1-committed;finish();};
$('reset').onclick=()=>{target=amount=committed=0;avatar.position.set(7,3,6);$('scale').value='1';$('spacing').value='1';$('expression').textContent='(a + b) + c';cameraSetup();};
$('scenes').onclick=e=>{const b=e.target.closest('[data-scene]');if(!b)return;mode=b.dataset.scene;document.querySelectorAll('[data-scene]').forEach(x=>x.classList.toggle('active',x===b));rebuild();};
$('material').onchange=rebuild;$('camera').onchange=cameraSetup;
addEventListener('resize',()=>{renderer.setSize(innerWidth,innerHeight);cameraSetup();});rebuild();
let previous=performance.now();
function frame(now){requestAnimationFrame(frame);const dt=Math.min((now-previous)/1000,.04);previous=now;
 amount=lerp(amount,target,1-Math.exp(-dt*8));pose();
 const right=new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0);right.y=0;right.normalize();const forward=new T.Vector3();camera.getWorldDirection(forward);forward.y=0;forward.normalize();
 const dx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0),dz=(keys.has('w')||keys.has('arrowup')?1:0)-(keys.has('s')||keys.has('arrowdown')?1:0);
 const v=right.multiplyScalar(dx).add(forward.multiplyScalar(dz));if(v.length()>0){v.normalize();avatar.position.addScaledVector(v,dt*4);avatar.rotation.y=Math.atan2(v.x,v.z);}
 avatar.position.y=T.MathUtils.clamp(avatar.position.y+((keys.has('e')?1:0)-(keys.has('q')?1:0))*dt*4,.4,18);avatar.position.x=T.MathUtils.clamp(avatar.position.x,-18,22);avatar.position.z=T.MathUtils.clamp(avatar.position.z,-20,20);
 if(spaceStart){target=T.MathUtils.clamp(spaceStart.amount+avatar.position.clone().sub(spaceStart.pos).dot(spaceStart.right)/4,0,1);$('status').textContent='Exerting force · release Space to settle';}
 const t=now*.001;hands.forEach((h,i)=>{let dest=avatar.position.clone().add(new T.Vector3(i?1:-1,.85+Math.sin(t*2+i)*.12,-.3));if((drag||spaceStart)&&i===1){dest=nodes[drag?.node??1].getWorldPosition(new T.Vector3()).add(new T.Vector3(0,1.5,1));}h.position.lerp(dest,1-Math.exp(-dt*12));h.rotation.y=Math.sin(t+i)*.15;});
 tether.visible=!!(drag||spaceStart);if(tether.visible){tether.geometry.setFromPoints([avatar.position.clone().add(new T.Vector3(0,.9,0)),hands[1].position]);}
 if($('camera').value==='follow'){controls.enabled=false;const focus=avatar.position.clone().add(new T.Vector3(0,1,0));camera.position.lerp(focus.clone().add(new T.Vector3(12,10,16)),1-Math.exp(-dt*3));controls.target.lerp(focus,1-Math.exp(-dt*3));}controls.update();renderer.render(scene,camera);
}
requestAnimationFrame(frame);
