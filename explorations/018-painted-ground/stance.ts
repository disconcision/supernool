import * as T from 'three';
/** Small contact-selection adjustment. Never called as a source of grip input. */
export class StanceAdjustment {
 private base?:T.Vector3;private first?:T.Vector3;private id='';private changedAt=0;private blocked=false;
 phase='off';shift=0;
 reset(){this.base=undefined;this.first=undefined;this.id='';this.blocked=false;this.phase='off';this.shift=0;}
 step(now:number,dt:number,enabled:boolean,id:string,contact:T.Vector3|undefined,position:T.Vector3,origin:T.Vector3,right:T.Vector3,free:(p:T.Vector3)=>boolean){
  const zero=new T.Vector3();if(!enabled||!contact){this.reset();return zero;}
  if(!this.base){this.base=position.clone();this.first=contact.clone();this.id=id;this.changedAt=now;}
  if(id!==this.id){this.id=id;this.changedAt=now;this.blocked=false;}
  this.shift=position.distanceTo(this.base);
  if(now-this.changedAt<140){this.phase='waiting';return zero;}
  if(this.blocked){this.phase='blocked';return zero;}
  const distance=Math.hypot(this.base.x-origin.x,this.base.z-origin.z),strength=1-T.MathUtils.smoothstep(distance,3,8);
  const side=T.MathUtils.clamp(contact.clone().sub(this.first!).dot(right)*.42*strength,-1.1,1.1);
  const inward=origin.clone().sub(this.base).setY(0);const returnDistance=Math.min(1.8,Math.max(0,distance-3.5));
  const target=this.base.clone().addScaledVector(right,side).addScaledVector(inward.normalize(),returnDistance),delta=target.sub(position).setY(0),gap=delta.length();
  if(gap<.09){this.phase='settled';return zero;}
  delta.setLength(Math.min(gap-.06,.65*dt));
  if(!free(position.clone().add(delta))){this.blocked=true;this.phase='blocked';return zero;}
  this.phase='adjusting';return delta;
 }
}
