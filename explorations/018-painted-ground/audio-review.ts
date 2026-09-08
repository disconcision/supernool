import {recoveryCueTimes} from './recovery-replay';
import {createEncounterAudio,AudioPhase} from './encounter-audio';
const button=document.getElementById('render') as HTMLButtonElement;
button.onclick=async()=>{
 button.disabled=true;const status=document.getElementById('status')!;status.textContent='Rendering the shared synth bank…';
 try{
 const windOnly=(document.getElementById('reviewMode') as HTMLSelectElement).value==='wind',seconds=windOnly?60:34;
 const ctx=new OfflineAudioContext(2,44100*seconds,44100),bank=createEncounterAudio(ctx);bank.mix(.3,.65,.55,.75,0);
 for(let t=0;t<seconds;){const phase:AudioPhase=windOnly||t<4?'dormant':t<7?'awakening':t<18?'active':t<20?'release':t<28?'recovery':'healthy';t+=bank.environment(t,phase,(Math.sin(t*7)+1)/2);}
 if(!windOnly){
 for(let t=.25;t<3.5;t+=.34)bank.footstep(t,5,Math.round(t/.34)%2?1:-1);
 bank.cue(4,'awakening');bank.thunder(4.2,'large',1,-.4);bank.thunder(4.6,'medium',.8,.3);
 for(let i=0,t=4;t<18;t+=.3125,i++)bank.beat(t,i,Math.max(0,(t-7)/11));
 for(const t of [8,10,12,14,16]){bank.gesture(t,'start');bank.gesture(t+.2,'progress',.7);bank.gesture(t+.5,'catch');bank.gesture(t+.65,'commit');}
 bank.thunder(9.4,'small',.8,.4);bank.thunder(13.2,'medium',.9,-.4);bank.thunder(16.5,'large',1,.5);
 bank.cue(18,'release');bank.cue(20,'recovery');recoveryCueTimes(6,8).forEach((t,i)=>bank.melody(20+t,i));for(let i=0,t=28;t<34;t+=2.4,i++)bank.melody(t,i,true);
 }
 const rendered=await ctx.startRendering();let peak=0,squares=0,nonfinite=0;for(let c=0;c<2;c++)for(const sample of rendered.getChannelData(c)){if(!Number.isFinite(sample))nonfinite++;peak=Math.max(peak,Math.abs(sample));squares+=sample*sample;}
 if(nonfinite||peak>=1)throw new Error(`Audio validation failed: ${nonfinite} invalid samples, peak ${peak}. No WAV exported.`);
 const bytes=new ArrayBuffer(44+rendered.length*4),view=new DataView(bytes),word=(at:number,s:string)=>{for(let i=0;i<s.length;i++)view.setUint8(at+i,s.charCodeAt(i));};
 word(0,'RIFF');view.setUint32(4,bytes.byteLength-8,true);word(8,'WAVE');word(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,2,true);view.setUint32(24,44100,true);view.setUint32(28,176400,true);view.setUint16(32,4,true);view.setUint16(34,16,true);word(36,'data');view.setUint32(40,bytes.byteLength-44,true);
 for(let i=0;i<rendered.length;i++)for(let c=0;c<2;c++)view.setInt16(44+i*4+c*2,Math.max(-1,Math.min(1,rendered.getChannelData(c)[i]))*32767,true);
 const url=URL.createObjectURL(new Blob([bytes],{type:'audio/wav'}));(document.getElementById('player') as HTMLAudioElement).src=url;const download=document.getElementById('download') as HTMLAnchorElement;download.href=url;download.download=windOnly?'supernool-wind-sketch.wav':'supernool-encounter-sketch.wav';download.hidden=false;
 document.getElementById('metrics')!.textContent=JSON.stringify({seconds,peak,peakDb:20*Math.log10(peak),rms:Math.sqrt(squares/(rendered.length*2)),nonfinite,events:bank.inspect().events},null,2);status.textContent='Ready. Press Play below. This sketch does not change your scene settings.';
 }catch(e){status.textContent='Could not render: '+String(e);}finally{button.disabled=false;}
};
