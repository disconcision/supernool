import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';
import {pose,Settings,V} from './motion';
import {prepare,fill} from './surface';
const $=(id:string)=>document.getElementById(id)!;
const val=(id:string)=>($(id) as HTMLInputElement).value;
const checked=(id:string)=>($(id) as HTMLInputElement).checked;
const host=$('canvas'),renderer=new T.WebGLRenderer({antialias:true});host.append(renderer.domElement);renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
const scene=new T.Scene();scene.background=new T.Color('#e5e9db');
scene.add(new T.HemisphereLight('#fff7df','#7c8971',2.4));const sun=new T.DirectionalLight('#fff4de',3);sun.position.set(-6,12,8);scene.add(sun);
const material=new T.MeshStandardMaterial({color:'#b4a583',roughness:.83,metalness:0});
const skin=new MarchingCubes(64,material,false,false,50000);skin.isolation=0;skin.scale.setScalar(6);skin.position.y=5;skin.frustumCulled=false;scene.add(skin);
const geo=new T.CylinderGeometry(6.7,7,.35,90);const ground=new T.Mesh(geo,new T.MeshStandardMaterial({color:'#a6b095',roughness:1}));ground.position.y=-.55;scene.add(ground);
const grid=new T.GridHelper(13,13,'#9eaa93','#c4cbb8');grid.position.y=-.36;scene.add(grid);
const parts=new T.Group();scene.add(parts);
const ortho=new T.OrthographicCamera();let camera:T.Camera=ortho,controls:OrbitControls;
function cameraSetup(){const w=host.clientWidth,h=host.clientHeight,a=w/Math.max(1,h);if(!w||!h)return;renderer.setSize(w,h,false);Object.assign(ortho,{left:-7*a,right:7*a,top:7,bottom:-7,near:.1,far:100});ortho.updateProjectionMatrix();camera=ortho;camera.position.set(12,10,16);camera.lookAt(0,3.5,0);controls?.dispose();controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,3.5,0);controls.enableDamping=true;controls.update();}cameraSetup();new ResizeObserver(cameraSetup).observe(host);
const palette:Record<string,string>={p:'#5976a1',q:'#a36a95',a:'#bd813f',b:'#508b9e',c:'#88749c',zero:'#819176'};
const textures=new Map<string,T.CanvasTexture>();
function rune(text:string,color:string){const key=text+color;let texture=textures.get(key);if(!texture){const c=document.createElement('canvas');c.width=256;c.height=128;const ctx=c.getContext('2d')!;ctx.fillStyle='#fff9e9';ctx.strokeStyle=color;ctx.lineWidth=6;ctx.beginPath();ctx.roundRect(7,7,242,114,30);ctx.fill();ctx.stroke();ctx.fillStyle=color;ctx.font='bold 55px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,128,67);texture=new T.CanvasTexture(c);textures.set(key,texture);}const s=new T.Sprite(new T.SpriteMaterial({map:texture,depthTest:false}));s.scale.set(.8,.4,1);s.renderOrder=10;return s;}
function clear(){parts.traverse(o=>{const m=o as T.Mesh;if(m.geometry)m.geometry.dispose();if(m.material){const arr=Array.isArray(m.material)?m.material:[m.material];arr.forEach(x=>x.dispose());}});parts.clear();}
function cylinder(a:V,b:V,r:number,color:string){const av=new T.Vector3(a.x,a.y,a.z),bv=new T.Vector3(b.x,b.y,b.z),d=bv.clone().sub(av);if(d.length()<.001)return;const m=new T.Mesh(new T.CylinderGeometry(r,r,d.length(),10),new T.MeshStandardMaterial({color,roughness:1}));m.position.copy(av.add(bv).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());parts.add(m);}
let progress=0,playing=false,dirty=true,last=0;
function settings():Settings{return {rule:val('rule'),mapping:val('mapping'),complexity:val('complexity'),anchor:val('anchor'),path:val('path'),t:progress,height:val('height'),irregularity:Number(val('irregularity'))};}
function update(){const s=settings(),p=pose(s);clear();skin.visible=val('form')!=='skeleton';material.wireframe=checked('wire');
 const started=performance.now(),segments=prepare(p.segments,{thickness:Number(val('thickness')),taper:Number(val('taper')),curve:Number(val('curve')),irregularity:Number(val('irregularity')),twist:Number(val('twist')),hewn:val('form')==='hewn'});
 if(skin.visible){skin.reset();fill(skin.field,64,segments,Number(val('blend')));skin.update();}
 if(val('form')==='skeleton')segments.forEach(e=>cylinder(e.a,e.b,.045,'#70866c'));
 if(checked('runes'))p.joints.forEach(j=>{const l=rune((['p','q'].includes(j.id)?j.id+' ':'')+j.label,palette[j.id]??'#a28155');l.position.set(j.x,j.y+.4,j.z);parts.add(l);});
 $('equation').textContent=s.rule==='identity'?'A → 0 + A':s.rule==='swap'?'A + B → B + A':s.mapping==='exchange'?'p(q(A,B),C) → q(A,p(B,C))':'p(q(A,B),C) → p(A,q(B,C))';
 $('status').textContent=skin.visible?`${Math.floor(skin.geometry.drawRange.count/3).toLocaleString()} triangles · ${Math.round(performance.now()-started)} ms rebuild · ${val('form')==='hewn'?'polygonal cross-sections':'rounded cross-sections'}`:'Same curved skeleton · no surface';
 $('note').textContent='Hewn uses bevelled octagonal sections with gradual twist, not triangle flat shading. Both surfaces are remeshed; fine planes and edge sharpness are limited by grid resolution. Irregularity is deterministic. Knots and bark textures are deferred.';
 for(const [id,enabled] of [['anchor',s.rule==='identity'],['mapping',s.rule==='regroup'],['height',s.rule==='regroup'],['path',s.rule==='swap'],['twist',val('form')==='hewn']] as [string,boolean][])($(id) as HTMLSelectElement).disabled=!enabled;
 dirty=false;
}
for(const id of ['rule','form','complexity','anchor','mapping','path','height','runes','wire'])$(id).onchange=()=>{playing=false;$('play').textContent='Play';dirty=true;};
for(const id of ['thickness','taper','curve','irregularity','twist','blend'])$(id).oninput=()=>{dirty=true;};
$('reset').onclick=cameraSetup;
$('time').oninput=()=>{progress=Number(val('time'))/1000;playing=false;$('play').textContent='Play';dirty=true;};
$('play').onclick=()=>{playing=!playing;if(playing&&progress>=1)progress=0;$('play').textContent=playing?'Pause':'Play';dirty=true;};
function tick(now:number){requestAnimationFrame(tick);if(playing){progress=Math.min(1,progress+Math.min(80,now-last)/5500);dirty=true;if(progress===1){playing=false;$('play').textContent='Replay';}}last=now;if(dirty){update();($('time') as HTMLInputElement).value=String(Math.round(progress*1000));$('progress').textContent=Math.round(progress*100)+'%';}controls.update();renderer.render(scene,camera);}requestAnimationFrame(tick);
