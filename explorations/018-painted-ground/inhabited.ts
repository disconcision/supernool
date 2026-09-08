import * as T from 'three';
import {Pose} from './layout';
import {makeShadowCanopy,ShadowOptions} from '../019-inhabited-trees/shadow-canopy';
import {addBarkEnergy} from '../019-inhabited-trees/shadow-bark';
import {arcDefaults,ArcSettings,ArcPreview,largeContact} from '../019-inhabited-trees/storm-lightning';
import {activeFlashes,ArcClass} from '../019-inhabited-trees/lightning-timing';
import {hash} from '../019-inhabited-trees/canopy';

/** An optional renderer on the existing scene. Never owns an AST, layout or input loop. */
export function createInhabitation(renderer:T.WebGLRenderer,scene:T.Scene,camera:T.OrthographicCamera,treeMesh:T.Mesh,materials:(T.MeshStandardMaterial|T.MeshToonMaterial)[],transform:(p:T.Vector3)=>T.Vector3,scale:number,contacts:T.Vector3[],paint:{setLocalLight:(lights:{position:T.Vector3;intensity:number}[],tint:T.Color,reach:number,gain:number)=>void},sun:T.DirectionalLight){
 const panel=document.createElement('details');panel.id='inhabitedControls';const title=document.createElement('summary');title.textContent='Inhabited tree · shadow & light';panel.append(title);
 const values:Record<string,HTMLInputElement|HTMLSelectElement>={};
 function select(id:string,label:string,choices:[string,string][],value:string){const el=document.createElement('select');el.id=id;for(const [v,t] of choices)el.add(new Option(t,v));el.value=value;const wrap=document.createElement('label');wrap.textContent=label;wrap.append(el);panel.append(wrap);values[id]=el;return el;}
 function range(id:string,label:string,min:number,max:number,step:number,value:number,parent:HTMLElement=panel){const wrap=document.createElement('label');wrap.textContent=label;const out=document.createElement('output'),el=document.createElement('input');el.id=id;el.type='range';el.min=String(min);el.max=String(max);el.step=String(step);el.value=String(value);const update=()=>out.textContent=Number(el.value).toFixed(step<.01?3:2);el.addEventListener('input',update);update();wrap.append(out,el);parent.append(wrap);values[id]=el;}
 const enabled=select('spiritMode','Inhabitation',[['off','Clear tree · checkpoint'],['on','Shadow spirit']],new URLSearchParams(location.search).get('inhabited')==='1'?'on':'off');
 select('spiritForm','Shadow form',[['S7','Painted shadow canopy'],['S8','Fibrous shade'],['S9','Turbulent patch banks'],['S4','Cauliflower billows'],['S5','Rising anvils'],['S6','Rolling banks']],'S7');
 select('spiritPalette','Spirit colour',[['violet','Violet'],['blue','Blue'],['amber','Amber']],'violet');
 select('spiritVisibility','Tree visibility',[['readable','Lift the skeleton'],['clear','Clear skeleton'],['depth','Depth / transmission']],'readable');
 const section=(name:string)=>{const d=document.createElement('details'),s=document.createElement('summary');s.textContent=name;d.append(s);panel.append(d);return d;};
 const cloud=section('Canopy & bark');
 for(const [id,label,min,max,step,v] of [
 ['spiritOpacity','Darkness',0,.9,.01,.72],['spiritFringe','Coloured fringe',0,1.5,.05,.55],['spiritSize','Cloud extent',.4,1.8,.05,1.25],['spiritDensity','Patch density',.4,1.6,.1,1],['spiritFray','Fraying / openings',0,1,.05,.55],['spiritRoil','Billowing',0,1.5,.05,.85],['spiritTexture','Interior texture',0,1,.05,.22],['spiritBark','Bark edge energy',0,1,.05,.4],['spiritFlow','Bark flow',0,1,.05,.65],['spiritDrift','Cloud evolution speed',0,2,.05,.65]
 ] as [string,string,number,number,number,number][])range(id,label,min,max,step,v,cloud);
 const light=section('Lighting');light.open=true;
 for(const [id,label,min,max,step,v] of [
 ['spiritLight','Steady light strength',0,120,2,28],['spiritReach','Light reach',5,35,1,18],['spiritHeight','Steady light height',.5,8,.25,2.75],['spiritPulse','Steady pulsation',0,.8,.05,.1],['spiritGround','Painted ground response',0,3,.1,1],['spiritFlash','Lightning illumination',0,250,5,85],['spiritHalo','Arc glow radius / strength',0,4,.1,1],['spiritCloudFlash','Light inside cloud',0,3,.1,1],['spiritSun','Sun strength',0,4,.1,sun.intensity],['spiritFill','Ambient fill',0,3,.1,2]
 ] as [string,string,number,number,number,number][])range(id,label,min,max,step,v,light);
 const shadowSelect=select('spiritShadows','Large-strike shadows',[['off','Off · cheaper'],['on','On · comparison']],'off');light.append(shadowSelect.closest('label')!);
 const bolts=section('Lightning timing & reach');
 range('spiritAnger','Agitation (manual preview)',0,1,.05,.2,bolts);
 const specs:[string,string,number,number,number][]=[['smallRate','Small flashes / second',0,4,.05],['mediumRate','Medium flashes / second',0,1,.01],['largeRate','Large flashes / second',0,.3,.005],['smallSize','Small arc reach',.3,2,.05],['mediumSize','Medium arc reach',.3,2,.05],['largeSize','Large strike reach',.3,2,.05],['rockShare','Strikes to scenery (fraction)',0,1,.05],['duration','Flash duration multiplier',.4,2,.1],['burstiness','Storm burstiness (0 = Poisson)',0,1,.05],['stormScale','Lull / active-spell timescale',.25,3,.05],['restrikes','Re-flash tendency',0,.8,.05]];
 for(const [id,label,min,max,step] of specs)range('spirit_'+id,label,min,max,step,arcDefaults[id as keyof ArcSettings]!,bolts);
 let preview:ArcPreview|undefined,previewUntil=0;
 for(const [name,kind] of [['Small flash','small'],['Medium flash','medium'],['Branch strike','branch'],['Scenery strike','rock']] as [string,ArcPreview][]){const b=document.createElement('button');b.textContent=name;b.onclick=()=>{preview=kind;previewUntil=clock+.35;};bolts.append(b);}
 const note=document.createElement('p');note.textContent='Live scene experiment: existing rewrites, hands, terrain and rocks. Preview buttons produce a brief flash. In study 019, enable Free camera below the title to inspect; Return to scene camera restores the framing. The painted backdrop remains a single-view asset.';panel.append(note);
 const status=document.createElement('small');status.id='spiritStatus';panel.append(status);
 const v=(id:string)=>values[id].value,n=(id:string)=>+v(id);
 let effect:ReturnType<typeof makeShadowCanopy>|undefined,lastPose:Pose|undefined,worldPose:Pose|undefined,clock=0;
 const bark=materials.map(addBarkEnergy),pool=Array.from({length:4},()=>new T.PointLight('#9260d9',0,18,2));pool.forEach(l=>{l.visible=false;scene.add(l);});
 pool[1].shadow.mapSize.set(512,512);pool[1].shadow.camera.near=.1;pool[1].shadow.camera.far=35;pool[1].shadow.bias=-.0003;pool[1].shadow.normalBias=.04;
 const ambient=scene.children.find(o=>o instanceof T.HemisphereLight) as T.HemisphereLight;
 const original={sun:sun.intensity,fill:ambient.intensity};let wasOn=false;
 let settings:ShadowOptions|undefined,lastSettings:ArcSettings=arcDefaults;
 function update(dt:number,p:Pose|undefined,seed:number){
 clock+=dt;const on=v('spiritMode')==='on'&&!!p;
 if(!on){pool.forEach(l=>{l.visible=false;l.intensity=0;l.castShadow=false;});bark.forEach(b=>b.barkPower.value=0);paint.setLocalLight([],new T.Color(),18,0);if(wasOn){sun.intensity=original.sun;ambient.intensity=original.fill;}wasOn=false;status.textContent='Clear-tree checkpoint';settings=undefined;return;}
 wasOn=true;if(!effect)effect=makeShadowCanopy(renderer);
 if(p!==lastPose){lastPose=p;worldPose={...p,points:new Map([...p!.points].map(([id,p])=>[id,transform(p)])),edges:p!.edges.map(e=>({...e,a:transform(e.a),b:transform(e.b),r:e.r*scale}))};effect.setPose(worldPose);}
 treeMesh.layers.enable(1);
 const colour=v('spiritPalette')==='blue'?'#507fcf':v('spiritPalette')==='amber'?'#c79548':'#9260d9',tint=new T.Color(colour),anger=n('spiritAnger');
 if(clock>previewUntil)preview=undefined;
 lastSettings={...arcDefaults,timingSeed:seed};for(const [id]of specs)(lastSettings as any)[id]=n('spirit_'+id);
 const branch=worldPose!.edges.filter(e=>e.id!=='stem').map(e=>e.a.clone().lerp(e.b,.72)),project=(p:T.Vector3)=>{const q=p.clone().project(camera);return new T.Vector2(q.x*.5+.5,q.y*.5+.5);};camera.updateMatrixWorld();
 const candidates=contacts.filter(p=>p.y>.05&&p.distanceTo(transform(new T.Vector3()))<25);
 const events=(['large','medium','small'] as ArcClass[]).flatMap(kind=>{const forced=preview&&(preview===kind||(kind==='large'&&(preview==='branch'||preview==='rock')));return (preview?(forced?[{slot:0,start:clock,power:.85}]:[]):activeFlashes(kind,clock,anger,lastSettings)).map(e=>({...e,kind}));});
 for(const l of pool){l.visible=true;l.intensity=0;l.color.copy(tint);l.distance=n('spiritReach');l.castShadow=false;}
 pool[0].position.copy(transform(new T.Vector3(0,0,0))).add(new T.Vector3(0,0,2.2));pool[0].position.y=n('spiritHeight');pool[0].intensity=n('spiritLight')*(1-n('spiritPulse')*.5+n('spiritPulse')*.5*Math.sin(clock*1.8));
 let flash=0;events.slice(0,3).forEach((e,i)=>{if(!branch.length)return;const l=pool[i+1];let point=branch[Math.floor(hash(e.kind+e.slot+'origin')*branch.length)].clone();
 if(e.kind==='large'){const c=largeContact(branch.map(project),candidates.map(project),e.slot,lastSettings.largeSize,lastSettings.rockShare,preview);if(c)point=c.rock?candidates[c.to].clone().add(new T.Vector3(0,.3,0)):branch[c.from].clone().lerp(branch[c.to],.5);}
 if(e.kind!=='large')point.add(camera.position.clone().sub(point).normalize().multiplyScalar(1.1));l.position.copy(point);l.intensity=n('spiritFlash')*e.power*(e.kind==='small'?.08:e.kind==='medium'?.4:1);l.castShadow=i===0&&e.kind==='large'&&v('spiritShadows')==='on'&&l.intensity>0;flash=Math.max(flash,e.power*(e.kind==='small'?.1:e.kind==='medium'?.5:1));});
 sun.intensity=n('spiritSun');ambient.intensity=n('spiritFill');paint.setLocalLight(pool,tint,n('spiritReach'),n('spiritGround'));
 bark.forEach(b=>{b.barkClock.value=clock;b.barkPower.value=n('spiritBark');b.barkTint.value.copy(tint);b.barkFlow.value=n('spiritFlow');});
 settings={form:v('spiritForm'),opacity:n('spiritOpacity'),fringe:n('spiritFringe'),texture:n('spiritTexture'),anger,size:n('spiritSize')*scale,colour,arcs:true,time:clock,enabled:true,drift:n('spiritDrift'),strike:candidates[0]??new T.Vector3(),strikePoints:candidates,visibility:v('spiritVisibility'),roil:n('spiritRoil'),seed,density:n('spiritDensity'),fray:n('spiritFray'),lightning:lastSettings,arcPreview:preview,arcGlow:n('spiritHalo'),cloudFlash:flash*n('spiritCloudFlash')};
 status.textContent=`Same live tree · ${worldPose!.nodes.size} sigils · ${events.length?'discharge':'quiet'} · ${pool.filter(l=>l.intensity>0).length} local lights`;
 }
 return {mount(parent:HTMLElement){parent.append(panel);},update,get active(){return !!settings;},render(drawBase?:()=>void){if(settings)effect!.render(scene,camera,settings,drawBase);},inspect(){return {active:!!settings,poseIds:worldPose?[...worldPose.nodes.keys()]:[],lights:pool.map(l=>({power:l.intensity,position:l.position.toArray(),shadow:l.castShadow})),shadow:effect?.inspect()};}};
}
