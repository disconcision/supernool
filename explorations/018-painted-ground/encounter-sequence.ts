export type EncounterState='dormant'|'awakening'|'active'|'release'|'recovery'|'healthy';
export const sequenceStates:EncounterState[]=['dormant','awakening','active','release','recovery','healthy'];
export type SequenceTiming={awakening:number;release:number;recovery:number};
export const sequenceTiming:SequenceTiming={awakening:3,release:1.8,recovery:8};
const clamp=(t:number)=>Math.max(0,Math.min(1,t));
const smooth=(t:number)=>{t=clamp(t);return t*t*(3-2*t);};
/** No renderer or equation ownership. Transient channels multiply authored settings. */
export class EncounterSequence{
 state:EncounterState='dormant';age=0;paused=false;automatic=true;
 jump(state:EncounterState){this.state=state;this.age=0;}
 next(){const i=sequenceStates.indexOf(this.state);this.jump(sequenceStates[Math.min(5,i+1)]);}
 update(dt:number,inside:boolean,solved:boolean,timing:SequenceTiming=sequenceTiming){
  if(this.paused)return;
  if(this.automatic&&this.state==='dormant'&&inside)this.jump('awakening');
  if(this.automatic&&this.state==='active'&&solved)this.jump('release');
  this.age+=dt;
  for(let i=0;i<3;i++){
   const duration=timing[this.state as keyof SequenceTiming];
   if(!duration||this.age<duration)break;
   const extra=this.age-duration;this.next();this.age=extra;
  }
 }
 sample(timing:SequenceTiming=sequenceTiming){
  const s=this.state,u=clamp(this.age/(timing[s as keyof SequenceTiming]||1));
  const awake=s==='awakening'?smooth(u/.65):s==='active'?1:s==='release'?1-smooth(u/.85):0;
  const growth=s==='healthy'?1:s==='recovery'?smooth(u):0;
  const release=s==='release'?u:0;
  return {state:s,shadow:awake,cloudGrowth:s==='awakening'?.08+.92*smooth(u/.8):1,
   burn:s==='healthy'?0:s==='recovery'?1-smooth(u/.65):1,
   growth,leaves:s==='healthy'?1:s==='recovery'?smooth((u-.1)/.9):0,
   scorch:s==='healthy'?.18:s==='recovery'?1-.82*smooth(u):1,
   ring:s==='release'?1-smooth(u):s==='recovery'||s==='healthy'?0:1,
   ringScale:s==='release'?1+u*2.2:s==='awakening'?1+.12*Math.sin(u*Math.PI*4)*(1-u):1,
   flash:s==='awakening'?Math.exp(-Math.pow((this.age-.28)/.16,2))*.85:s==='release'?Math.exp(-Math.pow((this.age-.12)/.13,2)):0,
   cueAge:s==='awakening'||s==='release'?this.age:-1,
   interactive:s==='active',recovering:s==='recovery'||s==='healthy',release,
   rear:s==='awakening'?Math.sin(Math.PI*u)*.065:0};
 }
}
