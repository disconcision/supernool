import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';
import {pose,fieldAt,Settings,V} from './motion';
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
const ortho=new T.OrthographicCamera(),perspective=new T.PerspectiveCamera(38,1,.1,100);let camera:T.Camera=ortho,controls:OrbitControls;
function cameraSetup(){const w=host.clientWidth,h=host.clientHeight,a=w/h;renderer.setSize(w,h);Object.assign(ortho,{left:-7*a,right:7*a,top:7,bottom:-7,near:.1,far:100});ortho.updateProjectionMatrix();perspective.aspect=a;perspective.updateProjectionMatrix();camera=val('camera')==='iso'?ortho:perspective;camera.position.set(12,10,16);controls?.dispose();controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,3.5,0);controls.enableDamping=true;controls.update();}cameraSetup();new ResizeObserver(cameraSetup).observe(host);
const palette:Record<string,string>={p:'#5976a1',q:'#a36a95',a:'#bd813f',b:'#508b9e',c:'#88749c',zero:'#819176'};
const textures=new Map<string,T.CanvasTexture>();
function rune(text:string,color:string){const key=text+color;let texture=textures.get(key);if(!texture){const c=document.createElement('canvas');c.width=256;c.height=128;const ctx=c.getContext('2d')!;ctx.fillStyle='#fff9e9';ctx.strokeStyle=color;ctx.lineWidth=6;ctx.beginPath();ctx.roundRect(7,7,242,114,30);ctx.fill();ctx.stroke();ctx.fillStyle=color;ctx.font='bold 55px Georgia';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,128,67);texture=new T.CanvasTexture(c);textures.set(key,texture);}const s=new T.Sprite(new T.SpriteMaterial({map:texture,depthTest:false}));s.scale.set(.8,.4,1);s.renderOrder=10;return s;}
function clear(){parts.traverse(o=>{const m=o as T.Mesh;if(m.geometry)m.geometry.dispose();if(m.material){const arr=Array.isArray(m.material)?m.material:[m.material];arr.forEach(x=>x.dispose());}});parts.clear();}
function cylinder(a:V,b:V,r:number,color:string){const av=new T.Vector3(a.x,a.y,a.z),bv=new T.Vector3(b.x,b.y,b.z),d=bv.clone().sub(av);if(d.length()<.001)return;const m=new T.Mesh(new T.CylinderGeometry(r,r,d.length(),10),new T.MeshStandardMaterial({color,roughness:1}));m.position.copy(av.add(bv).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());parts.add(m);}
function shelf(x:number,y:number,z:number,r:number,h:number,color:string,text:string){if(r<.01||h<.001)return;const m=new T.Mesh(new T.CylinderGeometry(r,r*1.035,h,64),new T.MeshStandardMaterial({color,roughness:.96,wireframe:checked('wire')}));m.position.set(x,y+h/2,z);parts.add(m);if(checked('runes')){const l=rune(text,color);l.position.set(x,y+h+.25,z);parts.add(l);}}
let progress=0,playing=false,dirty=true,last=0;
function settings():Settings{return {rule:val('rule'),mapping:val('mapping'),complexity:val('complexity'),anchor:val('anchor'),path:val('path'),t:progress};}
function update(){const plateau=val('form')==='plates';
 const uneven=document.querySelector<HTMLOptionElement>('#complexity option[value=uneven]')!;uneven.disabled=plateau;
 if(plateau&&val('complexity')==='uneven')($('complexity') as HTMLSelectElement).value='nested';
 const s=settings(),p=pose(s);clear();skin.visible=val('form')==='skin';material.wireframe=checked('wire');
 if(skin.visible){const size=64,blend=Number(val('blend'));skin.reset();for(let z=0;z<size;z++)for(let y=0;y<size;y++)for(let x=0;x<size;x++){skin.field[z*size*size+y*size+x]=fieldAt({x:(x/size*2-1)*6,y:5+(y/size*2-1)*6,z:(z/size*2-1)*6},p.segments,blend);}skin.update();}
 if(val('form')==='skeleton')p.segments.forEach(e=>cylinder(e.a,e.b,.045,'#70866c'));
 if(val('form')!=='plates'&&checked('runes'))p.joints.forEach(j=>{const l=rune((['p','q'].includes(j.id)?j.id+' ':'')+j.label,palette[j.id]??'#a28155');l.position.set(j.x,j.y+.35,j.z);parts.add(l);});
 if(val('form')==='plates'){
  const t=progress,raise=.25+Math.sin(Math.PI*t)*1.6;
  if(s.rule==='identity'){
   // A begins as the only semantic shelf. The parent grows beneath it, from the same origin.
   const ax=s.anchor==='fixed'?2.1*t:2.1,px=s.anchor==='fixed'?0:2.1*(1-t);
   shelf(px,0,0,3.8*t,.45*t,palette.p,'p +');
   shelf(ax,.45*t,0,s.complexity==='simple'?.65:1.15,.4,palette.a,s.complexity==='simple'?'A':'A +');
   if(s.complexity!=='simple'){shelf(ax-.4,.45*t+.4,0,.23,.18,'#d4b881','x');shelf(ax+.4,.45*t+.4,0,.23,.18,'#d4b881','y');}
   shelf(px-2.1*t,.45*t,0,.6*t,.4*t,palette.zero,'0');
  }else{
   const exchange=s.mapping==='exchange'&&s.rule==='regroup';
   if(s.rule==='regroup'){
    if(exchange){shelf(1.3*t,0,0,4.8*(1-t)+2*t,.45,palette.p,'p +');shelf(-1.3*(1-t),.5+Math.sin(Math.PI*t)*1.5,0,2*(1-t)+4.8*t,.4,palette.q,'q +');}
    else{shelf(0,0,0,4.8,.4,palette.p,'p +');shelf(-1.3+2.6*t,raise,0,2,.35,palette.q,'q +');}
   }else shelf(0,0,0,4.8,.4,palette.p,'p +');
   const A=s.rule==='swap'?p.A:{x:-2.6,z:0},B=s.rule==='swap'?p.B:{x:0,z:0};
   for(const [id,v] of [['a',A],['b',B],...(s.rule==='regroup'?[['c',{x:2.6,z:0}]]:[])] as [string,{x:number;z:number}][]){const h=s.rule==='regroup'?2.6:.5;shelf(v.x,h,v.z,id==='a'&&s.complexity!=='simple'?1.05:.6,.35,palette[id],id.toUpperCase());if(id==='a'&&s.complexity!=='simple'){shelf(v.x-.4,h+.35,v.z,.22,.18,'#d1b482','x');shelf(v.x+.4,h+.35,v.z,.22,.18,'#d1b482','y');}}
  }
 }
 $('equation').textContent=s.rule==='identity'?'A → 0 + A':s.rule==='swap'?'A + B → B + A':s.mapping==='exchange'?'p(q(A,B),C) → q(A,p(B,C))':'p(q(A,B),C) → p(A,q(B,C))';
 $('status').textContent=skin.visible?`${Math.floor(skin.geometry.drawRange.count/3).toLocaleString()} triangles · surface reconstructed from capsules`:'Geometric study · orbit camera to inspect depth';
 $('note').textContent=val('form')==='plates'?'The grey ground is not a term node. Coloured shelves are semantic nodes. Associativity lifts its support sheets to expose the role change; floating operands and collisions are unresolved.':s.rule==='identity'?'Fixed attachment: the plus occupies the original root location as A and zero separate. The original A subtree translates intact. Compare “Keep A” to see the previous anchoring policy.':'One extracted surface joins the members. Junctions blend while attachments slide. This is remeshing, not persistent-vertex skinning; intersections away from intended joints can still fuse.';
 for(const [id,enabled] of [['anchor',s.rule==='identity'],['mapping',s.rule==='regroup'],['path',s.rule==='swap']] as [string,boolean][])($(id) as HTMLSelectElement).disabled=!enabled;
 dirty=false;
}
for(const id of ['rule','form','complexity','anchor','mapping','path','runes','wire','blend'])$(id).onchange=()=>{playing=false;$('play').textContent='Play';dirty=true;};
$('camera').onchange=cameraSetup;$('reset').onclick=cameraSetup;
$('time').oninput=()=>{progress=Number(val('time'))/1000;playing=false;$('play').textContent='Play';dirty=true;};
$('play').onclick=()=>{playing=!playing;if(playing&&progress>=1)progress=0;$('play').textContent=playing?'Pause':'Play';dirty=true;};
function tick(now:number){requestAnimationFrame(tick);if(playing){progress=Math.min(1,progress+Math.min(80,now-last)/5500);dirty=true;if(progress===1){playing=false;$('play').textContent='Replay';}}last=now;if(dirty){update();($('time') as HTMLInputElement).value=String(Math.round(progress*1000));$('progress').textContent=Math.round(progress*100)+'%';}controls.update();renderer.render(scene,camera);}requestAnimationFrame(tick);
