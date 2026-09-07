import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {fill,Options} from './surface';import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';import {sample} from './cases';
const $=(s:string)=>document.getElementById(s)!,val=(s:string)=>($(s) as HTMLInputElement).value,check=(s:string)=>($(s) as HTMLInputElement).checked;
const host=$('canvas'),renderer=new T.WebGLRenderer({antialias:true});host.append(renderer.domElement);renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
const scene=new T.Scene();scene.background=new T.Color('#e8e0cf');scene.add(new T.HemisphereLight('#fff6e2','#776f5b',1.3));const sun=new T.DirectionalLight('#fff3d9',3);sun.position.set(-8,10,5);scene.add(sun);
const floor=new T.Mesh(new T.CylinderGeometry(6,6.3,.25,64),new T.MeshStandardMaterial({color:'#c5b899',roughness:1}));floor.position.y=-.4;scene.add(floor);
const camera=new T.OrthographicCamera(-8,8,7,-7,.1,100);camera.position.set(10,8,17);camera.lookAt(0,3,0);const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,3,0);controls.enableDamping=true;
function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.left=-6*w/h;camera.right=6*w/h;camera.top=6;camera.bottom=-6;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(host);resize();
let t=0,dirty=true,playing=false,last=0,seed=1;const labels=new T.Group();scene.add(labels);const textures=new Map<string,T.CanvasTexture>();
function label(text:string){let tex=textures.get(text);if(!tex){const c=document.createElement('canvas');c.width=128;c.height=64;const ctx=c.getContext('2d')!;ctx.fillStyle='#fff8e7';ctx.fillRect(0,0,128,64);ctx.fillStyle='#514c3e';ctx.font='bold 28px Georgia';ctx.textAlign='center';ctx.fillText(text,64,42);tex=new T.CanvasTexture(c);textures.set(text,tex);}const s=new T.Sprite(new T.SpriteMaterial({map:tex,depthTest:false}));s.scale.set(.65,.325,1);return s;}
const material=new T.MeshStandardMaterial({color:'#c0a073',roughness:.85});
const skin=new MarchingCubes(96,material,false,false,120000);skin.isolation=0;skin.scale.setScalar(6);skin.position.y=5;skin.frustumCulled=false;scene.add(skin);
function update(){const before=performance.now();const c=sample(val('rule'),val('complexity'),val('mapping'),t,seed,val('height'),Number(val('lengthRandom')));
 const options:Options={thickness:+val('thickness'),taper:+val('taper'),bow:+val('bow'),random:+val('random'),twist:+val('twist'),facets:+val('facets'),seed,blend:+val('blend')};
 skin.reset();const members=fill(skin.field,96,c.edges,options);skin.update();material.wireframe=check('wire');
 labels.children.forEach(o=>((o as T.Sprite).material as T.Material).dispose());labels.clear();if(check('runes'))for(const j of c.joints){const s=label((['p','q'].includes(j.id)?j.id+' ':'')+j.label);s.position.set(j.x,j.y+.35,j.z);labels.add(s);}
 $('audit').textContent=`${members.length} continuous members · 96³ surface grid · narrowest end radius ${Math.min(...members.map(m=>m.tip)).toFixed(3)}`;
 $('status').textContent=`${Math.round(performance.now()-before)} ms rebuild · unified envelope; seven-sided sections`;
 $('equation').textContent=val('rule')==='regroup'?(val('mapping')==='exchange'?'p(q(A,B),C) → q(A,p(B,C))':'p(q(A,B),C) → p(A,q(B,C))'):val('rule')==='identity'?'A → 0 + A · fixed attachment':val('rule')==='swap'?'A + B → B + A · orbit':val('rule')==='generated'?'Generated tree · same construction rules':'Seven longitudinal strips · one fork';
 const active=['identity','regroup','swap'].includes(val('rule'));($('time') as HTMLInputElement).disabled=!active;($('play') as HTMLButtonElement).disabled=!active;($('mapping') as HTMLSelectElement).disabled=val('rule')!=='regroup';dirty=false;}
for(const id of ['rule','complexity','mapping','height','wire','runes'])$(id).onchange=()=>{dirty=true;playing=false;$('play').textContent='Play';};
for(const id of ['twist','bow','thickness','taper','random','lengthRandom','facets','blend'])$(id).oninput=()=>dirty=true;
$('time').oninput=()=>{t=Number(val('time'))/1000;playing=false;dirty=true;$('play').textContent='Play';};$('play').onclick=()=>{playing=!playing;if(playing&&t>=1)t=0;$('play').textContent=playing?'Pause':'Play';};
$('seed').onclick=()=>{seed++;playing=false;dirty=true;};$('reset').onclick=()=>{camera.position.set(10,8,17);camera.zoom=1;controls.target.set(0,3,0);camera.updateProjectionMatrix();controls.update();};
document.querySelectorAll<HTMLButtonElement>('[data-time]').forEach(b=>b.onclick=()=>{t=Number(b.dataset.time);playing=false;dirty=true;$('play').textContent='Play';});
document.querySelectorAll<HTMLButtonElement>('[data-camera]').forEach(b=>b.onclick=()=>{const views:Record<string,number[]>={front:[0,5,20],back:[0,5,-20],side:[20,5,0],oblique:[10,8,17]};camera.position.fromArray(views[b.dataset.camera!]);controls.target.set(0,3,0);controls.update();});
function tick(now:number){requestAnimationFrame(tick);if(playing){t=Math.min(1,t+Math.min(100,now-last)/6000);dirty=true;if(t===1){playing=false;$('play').textContent='Replay';}}last=now;if(dirty)update();($('time') as HTMLInputElement).value=String(Math.round(t*1000));$('progress').textContent=Math.round(t*100)+'%';controls.update();renderer.render(scene,camera);}requestAnimationFrame(tick);
