/** Native Web Audio instrument bank, shared by the live scene and offline sketch.
 * All start times use the audio clock; visual frame rate does not time the beat. */
export type AudioLayer='music'|'environment'|'effects';
export type AudioPhase='dormant'|'awakening'|'active'|'release'|'recovery'|'healthy';
export function createEncounterAudio(ctx:BaseAudioContext,destination:AudioNode=ctx.destination){
 const master=ctx.createGain(),compressor=ctx.createDynamicsCompressor();master.gain.value=.3;
 compressor.threshold.value=-10;compressor.knee.value=12;compressor.ratio.value=8;compressor.attack.value=.003;compressor.release.value=.22;master.connect(compressor);compressor.connect(destination);
 const buses={music:ctx.createGain(),environment:ctx.createGain(),effects:ctx.createGain()};buses.music.gain.value=.65;buses.environment.gain.value=.55;buses.effects.gain.value=.75;
 const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=38;hp.connect(master);Object.values(buses).forEach(b=>b.connect(hp));
 const reverb=ctx.createConvolver(),wet=ctx.createGain();wet.gain.value=.18;reverb.connect(wet);wet.connect(hp);buses.music.connect(reverb);
 let seed=71429;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const noise=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate),data=noise.getChannelData(0);let brown=0;
 for(let i=0;i<data.length;i++){brown=(brown+(random()*2-1)*.035)/1.02;data[i]=brown*2.5+(random()*2-1)*.18;}
 const impulse=ctx.createBuffer(2,ctx.sampleRate*1.7,ctx.sampleRate);for(let c=0;c<2;c++){const d=impulse.getChannelData(c);for(let i=0;i<d.length;i++)d[i]=(random()*2-1)*Math.pow(1-i/d.length,3)*.35;}reverb.buffer=impulse;
 let voices=0,peakVoices=0;const events:Record<string,number>={};
 const mark=(name:string)=>events[name]=(events[name]??0)+1;
 function finish(source:AudioScheduledSourceNode,nodes:AudioNode[],end:number){voices++;peakVoices=Math.max(voices,peakVoices);source.stop(end);source.onended=()=>{voices--;source.disconnect();nodes.forEach(n=>n.disconnect());};}
 function envelope(g:GainNode,t:number,level:number,attack:number,duration:number){g.gain.setValueAtTime(.00001,t);g.gain.exponentialRampToValueAtTime(Math.max(.00002,level),t+attack);g.gain.exponentialRampToValueAtTime(.00001,t+duration);}
 function tone(t:number,hz:number,duration:number,level:number,type:OscillatorType='sine',layer:AudioLayer='music',pan=0,endHz=hz,attack=.015){
 const osc=ctx.createOscillator(),g=ctx.createGain(),f=ctx.createBiquadFilter(),p=ctx.createStereoPanner();osc.type=type;osc.frequency.setValueAtTime(hz,t);osc.frequency.exponentialRampToValueAtTime(Math.max(20,endHz),t+duration);f.type='lowpass';f.frequency.value=type==='sawtooth'?650:2400;p.pan.value=pan;envelope(g,t,level,attack,duration);osc.connect(f);f.connect(g);g.connect(p);p.connect(buses[layer]);osc.start(t);finish(osc,[g,f,p],t+duration+.04);
 }
 function air(t:number,duration:number,level:number,frequency:number,endFrequency=frequency,pan=0,layer:AudioLayer='effects',attack=.01,q=.6){
 const s=ctx.createBufferSource(),f=ctx.createBiquadFilter(),g=ctx.createGain(),p=ctx.createStereoPanner();s.buffer=noise;s.loop=true;f.type='bandpass';f.Q.value=q;f.frequency.setValueAtTime(frequency,t);f.frequency.exponentialRampToValueAtTime(endFrequency,t+duration);p.pan.value=pan;envelope(g,t,level,attack,duration);s.connect(f);f.connect(g);g.connect(p);p.connect(buses[layer]);s.start(t,random()*3);finish(s,[f,g,p],t+duration+.05);
 }
 function environment(t:number,phase:AudioPhase,variation:number){
 mark('wind');const storm=phase==='awakening'||phase==='active';air(t,3.8,storm?.2:.16,380+variation*180,650,Math.sin(variation*9)*.65,'environment',1.1,.4);
 air(t+.2,1.7,.06,2200,3200,-.5+variation,'environment',.35,.5);
 }
 function beat(t:number,index:number,intensity:number){
 mark('beat');const i=index%16,root=[73.416,73.416,87.307,73.416,77.782,73.416,65.406,73.416][Math.floor(i/2)];
 if(i%4===0){tone(t,100,.24,.32,'sine','music',0,42);air(t,.09,.12,260,90,0,'music');}
 if(i%2===0)tone(t+.015,root,.29,.15+intensity*.12,'triangle','music',Math.sin(i)*.2,root,.012);
 if(i%4===2){air(t,.16,.18+intensity*.12,720,240,.25,'music');tone(t,146.8,.12,.055,'sine');}
 if(i%2===1||intensity>.55)air(t,.055,.035+intensity*.07,3700,2700,i%2?.35:-.35,'music',.004,1);
 if(i===0){tone(t,146.832,2.1,.035+intensity*.035,'sawtooth','music',-.3,146.832,.3);tone(t,155.56,1.9,.012+intensity*.025,'triangle','music',.3,155.56,.4);}
 if(intensity>.3&&i%4===1)tone(t,root*4,.42,.025+intensity*.025,'triangle','music',i<8?-.4:.4,root*4,.025);
 }
 function melody(t:number,index:number,healthy=false){
 mark('melody');const notes=[293.665,440,349.228,329.628,293.665,523.251,440,349.228];tone(t,notes[index%8],healthy?2.8:1.65,.12,'sine','music',Math.sin(index*1.7)*.4,notes[index%8],.09);
 tone(t,notes[index%8]*2,1.1,.021,'triangle','music',-.2,notes[index%8]*2,.04);
 if(index%4===0)[146.832,220,261.626].forEach((hz,i)=>tone(t,hz,3.5,.034,'triangle','music',(i-1)*.3,hz,.6));
 }
 function cue(t:number,phase:AudioPhase){mark(phase);
 if(phase==='awakening'){air(t,2.4,.7,160,1800,0,'effects',.5,.7);tone(t,55,2,.23,'sine','effects',0,73.4,.08);}
 if(phase==='release'){air(t,2.6,1.15,1900,100,0,'effects',.06,.45);air(t+.1,1.5,.5,800,3600,-.45,'effects',.18,.5);tone(t,95,1.8,.5,'sine','effects',0,28,.012);}
 if(phase==='recovery'){air(t,2,.18,900,2200,.4,'environment',.4,.4);}
 }
 function thunder(t:number,kind:'small'|'medium'|'large',power=1,pan=0){mark('thunder-'+kind);
 const big=kind==='large',medium=kind==='medium',gain=Math.min(1.5,power)*(big?.8:medium?.3:.055);
 air(t,.07,gain,big?1500:2600,600,pan,'effects',.004,.45);
 if(big||medium){air(t+.07,big?2.8:1.2,gain*1.1,190,65,pan*.6,'effects',.06,.55);tone(t+.06,big?58:90,big?1.8:.7,gain*.2,'sine','effects',pan,38,.015);}
 }
 function footstep(t:number,speed:number,side:number){mark('footstep');const gain=.12+Math.min(1,speed/6)*.1;air(t,.14,gain,650+random()*450,220,side*.18,'effects',.005,.6);tone(t,95+random()*22,.09,gain*.3,'sine','effects',side*.12,60);air(t+.025,.12,.055,2400,1700,side*.2,'effects',.008,.5);}
 function gesture(t:number,kind:'start'|'progress'|'catch'|'uncatch'|'commit'|'cancel',p=0){mark(kind);
 if(kind==='start'){air(t,.3,.23,300,900,0,'effects',.025,1.1);tone(t,110,.2,.07,'triangle','effects');}
 if(kind==='progress'){air(t,.18,.09+p*.05,350+p*450,280,0,'effects',.025,1.8);tone(t,73.4*(1+p*.5),.2,.035,'triangle','effects');}
 if(kind==='catch'){tone(t,293.665,.4,.18,'triangle','effects');tone(t+.035,440,.45,.1,'sine','effects');air(t,.07,.2,1000,300);}
 if(kind==='commit'){air(t,.25,.28,450,120);tone(t,73.4,.4,.18,'sine','effects');}
 if(kind==='uncatch'||kind==='cancel'){air(t,.18,.09,650,200);}
 }
 return {master,buses,environment,beat,melody,cue,thunder,footstep,gesture,tone,
  mix(volume:number,music:number,environment:number,effects:number,t=ctx.currentTime){master.gain.setTargetAtTime(volume,t,.06);buses.music.gain.setTargetAtTime(music,t,.15);buses.environment.gain.setTargetAtTime(environment,t,.15);buses.effects.gain.setTargetAtTime(effects,t,.06);},
  inspect:()=>({voices,peakVoices,events:{...events}})};
}
