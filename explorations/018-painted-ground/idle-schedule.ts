export type IdleKind='walk'|'catch';
export type IdleMode='catch'|'explore'|'catch-only'|'rest';

/** One quiet interval for all idle activities, including voluntary endings. */
export class IdleSchedule {
 remaining:number;mode:IdleMode='catch';private last?:IdleKind;private lastHands:Record<IdleKind,number>;
 constructor(private random:()=>number=Math.random){this.remaining=7+random()*4;this.lastHands={walk:random()<.5?0:1,catch:random()<.5?0:1};}
 rest(){this.remaining=12+this.random()*10;}
 tick(dt:number,allowed:boolean,busy:boolean):{kind:IdleKind;hand:number}|undefined{
  if(busy)return;
  if(!allowed||this.mode==='rest'){this.remaining=Math.max(7,this.remaining);return;}
  this.remaining=Math.max(0,this.remaining-dt);if(this.remaining>0)return;
  const kind=this.mode==='explore'?'walk':this.mode==='catch-only'?'catch':this.last?(this.last==='walk'?'catch':'walk'):(this.random()<.5?'walk':'catch');
  // Once the quiet period is over, notice brief nearby-stone opportunities.
  this.remaining=kind==='catch'?.35:3;return {kind,hand:this.handFor(kind)};
 }
 handFor(kind:IdleKind){return 1-this.lastHands[kind];}
 started(kind:IdleKind,hand:number){this.last=kind;this.lastHands[kind]=hand;}
}
