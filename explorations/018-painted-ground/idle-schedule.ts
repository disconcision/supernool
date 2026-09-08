export type IdleKind='walk'|'catch';
export type IdleMode='catch'|'explore'|'catch-only'|'rest';

/** One quiet interval for all idle activities, including voluntary endings. */
export class IdleSchedule {
 remaining:number;mode:IdleMode='catch';private last?:IdleKind;private pending?:IdleKind;private catchWait=0;private lastHands:Record<IdleKind,number>;
 constructor(private random:()=>number=Math.random){this.remaining=7+random()*4;this.lastHands={walk:random()<.5?0:1,catch:random()<.5?0:1};}
 rest(){this.remaining=12+this.random()*10;this.pending=undefined;this.catchWait=0;}
 tick(dt:number,allowed:boolean,busy:boolean,handReady=false):{kind:IdleKind;hand:number;allowWalk:boolean}|undefined{
  if(busy)return;
  if(!allowed||this.mode==='rest'){this.remaining=Math.max(7,this.remaining);this.pending=undefined;this.catchWait=0;return;}
  if(this.pending==='catch'&&handReady)this.catchWait+=dt;
  this.remaining=Math.max(0,this.remaining-dt);if(this.remaining>0)return;
  const kind=this.pending??(this.mode==='explore'?'walk':this.mode==='catch-only'?'catch':this.last?(this.last==='walk'?'catch':'walk'):(this.random()<.5?'walk':'catch'));this.pending=kind;
  // Once the quiet period is over, notice brief nearby-stone opportunities.
  // Give a ready wandering hand a short opportunity before substituting a walk.
  this.remaining=kind==='catch'?.35:3;return {kind,hand:this.handFor(kind),allowWalk:kind==='walk'||(this.mode==='catch'&&this.catchWait>=2.5)};
 }
 handFor(kind:IdleKind){return 1-this.lastHands[kind];}
 started(kind:IdleKind,hand:number){this.last=kind;this.lastHands[kind]=hand;this.pending=undefined;this.catchWait=0;}
}
