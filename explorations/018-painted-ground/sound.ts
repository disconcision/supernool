import {createEncounterAudio,AudioPhase} from './encounter-audio';
export type SoundFrame={phase:AudioPhase;age:number;reduction:number;x:number;z:number;dt:number;paused:boolean};
/** One audio-clock scheduler per page, unlocked by a real user gesture. */
export function createSound(){
 let ctx:AudioContext|undefined,bank:ReturnType<typeof createEncounterAudio>|undefined,buffer:AudioBuffer|undefined,loading=false,mode='thematic',volume=.3,lastBucket=0,lastAt=0,lastAudibleMode='thematic';
 let frame:SoundFrame={phase:'dormant',age:0,reduction:0,x:0,z:0,dt:0,paused:false},lastPhase='',step=0,nextBeat=0,nextWind=0,lastPosition:{x:number;z:number}|undefined,travel=0,foot=0,lastThunder=-99;
 let lastMix='';let timer:ReturnType<typeof setInterval>|undefined,owner=true,channel:BroadcastChannel|undefined;
 const ownerId=Math.random().toString(36);try{channel=new BroadcastChannel('supernool-audio-owner');channel.onmessage=e=>{if(e.data!==ownerId){owner=false;if(ctx)void ctx.suspend();}};}catch{}
 const numeric=(id:string,f:number)=>{const el=document.getElementById(id) as HTMLInputElement|null;return el?+el.value:f;};
 const scoreOn=()=>((document.getElementById('audioScore') as HTMLSelectElement|null)?.value??'on')==='on';
 function mix(){if(!ctx||!bank)return;const score=scoreOn(),audible=mode!=='off'&&owner&&!document.hidden;
 const levels=[audible?volume:0,score?numeric('audioMusic',.65)*(frame.phase==='release'?.14:1):0,score?numeric('audioEnvironment',.55):0,numeric('audioEffects',.75)] as const;const key=levels.join(':');if(key!==lastMix){lastMix=key;bank.mix(...levels);}}
 function scheduler(){if(!ctx||!bank||ctx.state!=='running'||!owner||document.hidden)return;mix();const now=ctx.currentTime;
 if(mode!=='off'&&scoreOn()){
  if(lastPhase!==frame.phase){lastPhase=frame.phase;step=0;nextBeat=now+.025;bank.cue(now+.01,frame.phase);}
  if(nextWind<now-.2)nextWind=now;
  if(nextWind<now+.12){nextWind+=bank.environment(nextWind,frame.phase,Math.random());}
  const dark=frame.phase==='active'||frame.phase==='awakening',calm=frame.phase==='recovery'||frame.phase==='healthy';
  if(nextBeat<now-.2)nextBeat=now+.015; // Drop missed beats after a stalled/hidden tab; never catch up in a burst.
  if(dark||calm)while(nextBeat<now+.12){if(dark)bank.beat(nextBeat,step,frame.reduction);else bank.melody(nextBeat,step,frame.phase==='healthy');step++;nextBeat+=dark?.3125:frame.phase==='healthy'?2.4:.8;}
 }
 const status=document.getElementById('audioStatus');if(status){const i=bank.inspect();status.textContent=`${mode==='off'?'Muted':frame.phase+' · '+(scoreOn()?'procedural score':'effects only')} · ${i.voices} audio voices`;status.dataset.phase=frame.phase;status.dataset.context=ctx.state;status.dataset.events=JSON.stringify(i.events);status.dataset.peakVoices=String(i.peakVoices);}
 }
 function unlock(){owner=true;channel?.postMessage(ownerId);if(!ctx){ctx=new AudioContext();bank=createEncounterAudio(ctx);timer=setInterval(scheduler,25);}if(ctx.state!=='running')void ctx.resume().catch(()=>{});if(mode==='recorded')loadSample();mix();}
 document.addEventListener('visibilitychange',()=>{if(!ctx)return;if(document.hidden){void ctx.suspend();lastPhase='';}else if(owner){nextBeat=nextWind=ctx.currentTime+.03;void ctx.resume().catch(()=>{});}});
 addEventListener('pagehide',()=>{if(timer)clearInterval(timer);channel?.close();if(ctx)void ctx.close();});
 const ready=()=>!!ctx&&!!bank&&owner&&!document.hidden&&mode!=='off'&&ctx.state==='running';
 function legacy(notes:number[],level=.15,duration=.2){if(!ready())return;notes.forEach((hz,i)=>bank!.tone(ctx!.currentTime+i*.012,hz,duration,level/notes.length,'triangle','effects'));}
 function gesture(kind:Parameters<ReturnType<typeof createEncounterAudio>['gesture']>[1],p=0){if(ready())bank!.gesture(ctx!.currentTime,kind,p);}
 function loadSample(){if(loading||!ctx)return;loading=true;fetch(new URL('../../assets/audio/tiup-comm-out.wav',import.meta.url)).then(r=>r.arrayBuffer()).then(b=>ctx!.decodeAudioData(b)).then(b=>buffer=b).catch(()=>{});}
 return {unlock,setMode(v:string){mode=v;if(v!=='off')lastAudibleMode=v;const mute=document.getElementById('audioMute');if(mute){mute.textContent=v==='off'?'Unmute audio':'Mute audio';mute.setAttribute('aria-pressed',String(v==='off'));}mix();if(v==='recorded')loadSample();},setVolume(v:number){volume=v;mix();},
  update(next:SoundFrame){const distance=lastPosition?Math.hypot(next.x-lastPosition.x,next.z-lastPosition.z):0;lastPosition={x:next.x,z:next.z};frame=next;
   if(!ready()||distance>1||distance<.0001){if(distance>1||!ready())travel=0;return;}travel+=distance;const speed=distance/Math.max(.001,next.dt),stride=speed>3?.95:.6;
   if(travel>=stride){travel%=stride;bank!.footstep(ctx!.currentTime,speed,(foot++%2)*2-1);}
  },
  thunder(kind:'small'|'medium'|'large',power:number,pan=0){if(!ready()||!scoreOn()||frame.paused)return;const now=ctx!.currentTime;if(now-lastThunder<(kind==='small'?.16:.055))return;lastThunder=now;bank!.thunder(now+(kind==='large'?.07:.015),kind,power,pan);},
  start(){lastBucket=0;mode==='thematic'?gesture('start'):legacy([196],.08,.12);},
  progress(p:number,multiply:boolean){const bucket=Math.min(3,Math.floor(p*4));if(bucket===lastBucket)return;const reverse=bucket<lastBucket;lastBucket=bucket;if(performance.now()-lastAt<110)return;lastAt=performance.now();if(mode==='thematic'){gesture('progress',p);return;}const root=multiply?196:261.63;legacy([root*(reverse?.5:1),root*(bucket===2?1.5:2)],.09+bucket*.02,.2);},
  catch(){if(mode==='thematic'){gesture('catch');return;}if(mode==='recorded'&&buffer&&ready()){const s=ctx!.createBufferSource(),g=ctx!.createGain();s.buffer=buffer;g.gain.value=.45;s.connect(g);g.connect(bank!.buses.effects);s.start();s.onended=()=>{s.disconnect();g.disconnect();};}else legacy([523.25,783.99,1046.5],.3,.4);},
  uncatch(){mode==='thematic'?gesture('uncatch'):legacy([261.63,196],.12,.16);},
  finish(commit:boolean){mode==='thematic'?gesture(commit?'commit':'cancel'):legacy(commit?[130.81,261.63]:[146.83],commit?.1:.05,.2);},
  mount(){const select=document.getElementById('soundMode') as HTMLSelectElement;select.insertBefore(new Option('Wood, earth & resonance','thematic',true,true),select.firstChild);select.value='thematic';
   const mute=document.createElement('button');mute.id='audioMute';mute.type='button';mute.textContent='Mute audio';mute.setAttribute('aria-pressed','false');mute.onclick=()=>{select.value=select.value==='off'?lastAudibleMode:'off';select.dispatchEvent(new Event('change',{bubbles:true}));};(document.getElementById('studyTools')??select.closest('details')!).prepend(mute);
   const panel=select.closest('details')!;const label=document.createElement('label');label.innerHTML='Encounter soundtrack<select id="audioScore"><option value="on">On · wind, pulse & regrowth</option><option value="off">Off · interaction effects only</option></select>';panel.append(label);
   for(const [id,name,value] of [['audioMusic','Music',.65],['audioEnvironment','Wind & rustling',.55],['audioEffects','Effects & footsteps',.75]] as const){const l=document.createElement('label');l.innerHTML=`${name}<input id="${id}" type="range" min="0" max="1" step=".05" value="${value}">`;panel.append(l);}
   const note=document.createElement('p');note.textContent='Audio starts after a click/key press and pauses in background tabs. Newest interacted tab owns sound on this port. Encounter state buttons audition the mood; lightning sounds follow live flashes, not paused scrubbing.';panel.append(note);
   const link=document.createElement('a');link.href='audio-review.html';link.target='_blank';link.textContent='Listen to a 34-second soundtrack sketch ↗';panel.append(link);
   const status=document.createElement('p');status.id='audioStatus';status.textContent='Sound waiting for a click or key press.';panel.append(status);
   for(const id of ['audioScore','audioMusic','audioEnvironment','audioEffects'])document.getElementById(id)!.addEventListener('input',mix);
  }
 };
}
