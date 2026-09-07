/** Art-directed Markov-modulated Poisson flashes, plus separate intraflash strokes.
 * Research and deliberately non-physical choices: lightning-timing-notes.md. */
export type ArcClass='small'|'medium'|'large';
export type TimingSettings={smallRate:number;mediumRate:number;largeRate:number;duration:number;burstiness?:number;stormScale?:number;restrikes?:number;timingSeed?:number};
export type Flash={slot:number;start:number};
export type ActiveFlash=Flash&{power:number};
function random(seed:number){let a=seed>>>0;return ()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
const exponential=(r:()=>number)=>-Math.log(Math.max(1e-12,1-r()));
const kindSeed={small:1109,medium:7717,large:39043};
type Schedule={events:Flash[];until:number;candidate:number;nextState:number;active:boolean;r:()=>number;weather:()=>number};
const schedules=new Map<string,Schedule>();
function timeline(kind:ArcClass,end:number,anger:number,o:TimingSettings){
 const rate=o[`${kind}Rate`]*(1+anger*1.5),burst=o.burstiness??.75,scale=o.stormScale??1,seed=o.timingSeed??3;
 if(rate<=0)return [];
 const key=[kind,rate,burst,scale,seed].join(':');let s=schedules.get(key);
 if(!s){const weather=random(seed+7919),active=weather()<.25;
 s={events:[],until:0,candidate:0,nextState:exponential(weather)*(active?4:12)*scale,active,r:random(seed+kindSeed[kind]),weather};
 // Bounded number of parameter combinations; no dependence on frame order.
 if(schedules.size>=24)schedules.delete(schedules.keys().next().value!);schedules.set(key,s);
 }
 const maxRate=rate*(1+2.7*burst);
 while(s.until<end){
 s.candidate+=exponential(s.r)/maxRate;
 while(s.candidate>s.nextState){s.active=!s.active;s.nextState+=exponential(s.weather)*(s.active?4:12)*scale;}
 // Stationary activity fraction 1/4; weighted mean multiplier exactly one.
 const multiplier=s.active?1+2.7*burst:1-.9*burst;
 if(s.r()<multiplier/(1+2.7*burst))s.events.push({slot:s.events.length,start:s.candidate});
 s.until=s.candidate;
 }
 return s.events;
}
export function flashTimeline(kind:ArcClass,end:number,anger:number,o:TimingSettings){return timeline(kind,end,anger,o).filter(e=>e.start<=end);}
export function strokePattern(kind:ArcClass,slot:number,o:TimingSettings){
 const r=random((o.timingSeed??3)+kindSeed[kind]+Math.imul(slot+1,2654435761));
 const strokes=[{at:0,amplitude:.75+r()*.25}];let at=0;
 const chance=(o.restrikes??.55)*(kind==='small'?.3:kind==='medium'?.85:1.2);
 for(let i=1;i<5&&r()<chance;i++){
 const normal=Math.sqrt(2*exponential(r))*Math.cos(2*Math.PI*r());
 at+=Math.max(.025,Math.min(.18,.055*Math.exp(normal*.45)));
 strokes.push({at,amplitude:(.4+r()*.5)*Math.pow(.88,i-1)});
 }
 return strokes;
}
export function activeFlashes(kind:ArcClass,time:number,anger:number,o:TimingSettings):ActiveFlash[]{
 const events=timeline(kind,time,anger,o),duration=({small:.035,medium:.045,large:.055}[kind])*o.duration;
 let lo=0,hi=events.length;while(lo<hi){const mid=(lo+hi)>>>1;if(events[mid].start<time-1.5)lo=mid+1;else hi=mid;}
 const active:ActiveFlash[]=[];
 for(let i=lo;i<events.length&&events[i].start<=time;i++){
 const e=events[i],age=time-e.start;let power=0;
 for(const stroke of strokePattern(kind,e.slot,o)){const t=age-stroke.at;if(t>=0&&t<duration)power=Math.max(power,stroke.amplitude*Math.pow(1-t/duration,.65));}
 if(power>0)active.push({...e,power});
 }
 return active;
}
export function arcEvent(kind:ArcClass,time:number,anger:number,o:TimingSettings){return activeFlashes(kind,time,anger,o).sort((a,b)=>b.power-a.power)[0]??{slot:0,start:0,power:0};}
