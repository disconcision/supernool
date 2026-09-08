import * as T from 'three';
import {EncounterSequence,EncounterState,sequenceStates,sequenceTiming} from './encounter-sequence';
import {Pose} from './layout';
import {makeGrowthCluster,GrowthSettings} from '../019-inhabited-trees/growth-canopy';
import {disposeGroup,wind} from '../019-inhabited-trees/canopy';

export function createEncounterPresentation(scene:T.Scene,origin:T.Vector3,treeScale:number){
 const sequence=new EncounterSequence();let enabled=new URLSearchParams(location.search).get('inhabited')==='1';
 const timing={...sequenceTiming};
 const group=new T.Group();group.position.copy(origin);scene.add(group);
 const mat=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,uniforms:{time:{value:0},alpha:{value:1},tint:{value:new T.Color('#aa78df')}},vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`varying vec2 vUv;uniform float time,alpha;uniform vec3 tint;void main(){float angle=atan(vUv.y-.5,vUv.x-.5);float shimmer=.65+.2*sin(angle*19.-time*2.3)+.15*sin(angle*43.+time*3.1);gl_FragColor=vec4(tint*(1.+shimmer*.35),alpha*shimmer);}`});
 const ring=new T.Mesh(new T.RingGeometry(5.46,5.56,128),mat);ring.rotation.x=-Math.PI/2;ring.position.y=.18;group.add(ring);
 const shade=new T.Mesh(new T.RingGeometry(5.44,5.58,100),new T.MeshBasicMaterial({color:'#302039',transparent:true,opacity:.12,depthWrite:false,side:T.DoubleSide}));shade.rotation.x=-Math.PI/2;shade.position.y=.005;group.add(shade);
 const foliage=new T.Group();foliage.position.copy(origin);foliage.scale.setScalar(treeScale);scene.add(foliage);
 const clusters=new Map<string,T.Group>();let lastKey='',clock=0;let onJump:(s:EncounterState)=>void=()=>{};
 const number=(id:string,f:number)=>{const e=document.getElementById(id) as HTMLInputElement|null;return e?+e.value:f;};
 function update(dt:number,p:Pose|undefined){
  clock+=dt;wind.time.value=clock;wind.strength.value=.32;
  const channels=sequence.sample(timing);group.visible=enabled;ring.visible=shade.visible=channels.ring>.001;
  ring.scale.setScalar(channels.ringScale);shade.scale.copy(ring.scale);mat.uniforms.time.value=clock;mat.uniforms.alpha.value=channels.ring*(.65+channels.flash*.35);(shade.material as T.MeshBasicMaterial).opacity=.12*channels.ring;
  const palette=(document.getElementById('spiritPalette') as HTMLSelectElement)?.value;
  mat.uniforms.tint.value.set(palette==='blue'?'#759cec':palette==='amber'?'#d6ac68':'#aa78df');
  foliage.visible=enabled&&channels.leaves>.001&&!!p;
  const ids=p?[...p.nodes].filter(([,n])=>n.kind!=='op').map(([id])=>id):[];
  const size=number('sequenceLeafSize',1),density=number('sequenceLeafDensity',1);
  const key=ids.join(',')+':'+size+':'+density;
  if(foliage.visible&&key!==lastKey){
   lastKey=key;disposeGroup(foliage);foliage.clear();clusters.clear();
   const settings:GrowthSettings={style:'F5',form:'G1',seed:3,size,density,palette:'fresh',normals:true,wire:false,backing:.35,offshoots:.5,finish:'painted',normalSharing:.8,shadeDepth:.7,brushScale:1};
   for(const id of ids){const c=makeGrowthCluster(id,settings);foliage.add(c);clusters.set(id,c);}
  }
  if(foliage.visible)for(const [id,c]of clusters){const point=p!.points.get(id);c.visible=!!point;if(point){c.position.copy(point);const edge=p!.edges.find(e=>e.id===id);const emergence=edge?Math.min(1,edge.a.distanceTo(edge.b)/.65):0;c.scale.setScalar(size*channels.leaves*emergence);}}
  const scrub=document.getElementById('sequenceScrub') as HTMLInputElement|null;if(scrub&&document.activeElement!==scrub)scrub.value=String(Math.min(1,sequence.age/(timing[sequence.state as keyof typeof timing]||1)));
  const status=document.getElementById('sequenceStatus');if(status)status.textContent=`${sequence.state} · ${sequence.age.toFixed(1)} s${sequence.state==='recovery'?' · '+(document.getElementById('world')?.dataset.recoveryMove||''):''}${sequence.paused?' · paused':''}${!sequence.automatic?' · manual preview':''}`;
  return channels;
 }
 function mount(host:HTMLElement,callback:(s:EncounterState)=>void){onJump=callback;const panel=document.createElement('details');panel.id='encounterSequence';
  panel.innerHTML=`<summary>Encounter · states & transitions</summary><label>Sequence<select id="sequenceEnabled"><option value="on">On · encounter lifecycle</option><option value="off">Off · free material study</option></select></label><p id="sequenceStatus" role="status"></p><div id="sequenceStates" style="display:flex;flex-wrap:wrap;gap:6px"></div><p>State buttons jump directly and hold for inspection. Play next follows the sequence from that state. Restart re-arms the approach encounter and resets the puzzle. Recovery retraces your rewrites in the working plane, then returns the restored tree to its spatial shape. Sequence mode controls when the spirit and burnt treatment appear; Off restores the independent material-study toggles.</p><button id="sequenceNext" type="button">Play next transition</button> <button id="sequencePause" type="button">Pause / resume</button> <button id="sequenceRestart" type="button">Restart encounter</button>`;
  for(const state of sequenceStates){const b=document.createElement('button');b.type='button';b.textContent=state[0].toUpperCase()+state.slice(1);b.onclick=()=>{sequence.automatic=false;sequence.paused=true;onJump(state);};panel.querySelector('#sequenceStates')!.append(b);}
  const range=(id:string,label:string,min:number,max:number,step:number,value:number)=>{const l=document.createElement('label');l.innerHTML=`${label}<input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">`;panel.append(l);};
  range('sequenceScrub','Transition position',0,1,.01,0);
  const scrub=panel.querySelector<HTMLInputElement>('#sequenceScrub')!;scrub.dataset.transient='true';scrub.oninput=()=>{sequence.paused=true;sequence.age=+scrub.value*(timing[sequence.state as keyof typeof timing]||1);};
  const releaseStyle=document.createElement('label');releaseStyle.innerHTML='Canopy release<select id="sequenceDeparture"><option value="swirl">Spin, expand & dissolve</option><option value="fade">Fade in place · earlier comparison</option></select>';panel.append(releaseStyle);
  range('sequenceDepartureTurns','Release turns',0,3,.05,1.35);range('sequenceDepartureExpansion','Release expansion',0,5,.1,2.8);
  range('sequenceAwakening','Awakening seconds',1,6,.25,3);range('sequenceRelease','Release seconds',.6,4,.1,1.8);range('sequenceRecovery','Rewind + spatial return seconds',3,15,.5,8);range('sequenceLeafSize','Living canopy size',.4,1.8,.05,1);range('sequenceLeafDensity','Living canopy density',.4,1.6,.1,1);range('sequenceFlash','Transition flash strength',0,2,.05,1);
  host.prepend(panel);
  const mode=panel.querySelector<HTMLSelectElement>('#sequenceEnabled')!;mode.value=enabled?'on':'off';mode.onchange=()=>{enabled=mode.value==='on';sequence.automatic=true;sequence.paused=false;onJump(enabled?'dormant':'active');};
  panel.querySelector<HTMLButtonElement>('#sequenceNext')!.onclick=()=>{sequence.paused=false;const next=sequenceStates[Math.min(5,sequenceStates.indexOf(sequence.state)+1)];onJump(next);};
  panel.querySelector<HTMLButtonElement>('#sequencePause')!.onclick=()=>{sequence.paused=!sequence.paused;};
  panel.querySelector<HTMLButtonElement>('#sequenceRestart')!.onclick=()=>{sequence.automatic=true;sequence.paused=false;onJump('dormant');};
 }
 return {sequence,timing,mount,update,get enabled(){return enabled;},get departure(){return {depart:(document.getElementById('sequenceDeparture') as HTMLSelectElement)?.value!=='fade',departureTurns:number('sequenceDepartureTurns',1.35),departureExpansion:number('sequenceDepartureExpansion',2.8)};},get flashStrength(){return number('sequenceFlash',1);},readTiming(){timing.awakening=number('sequenceAwakening',3);timing.release=number('sequenceRelease',1.8);timing.recovery=number('sequenceRecovery',8);}};
}
