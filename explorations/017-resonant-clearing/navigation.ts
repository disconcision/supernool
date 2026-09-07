export type Contact = {id:string;x:number;y:number};
/** Screen-space selection: choose a nearby contact in the requested direction.
 * A directional cone avoids hopping sideways when the user presses up. */
export function directionalContact(contacts:Contact[],current:string,dx:number,dy:number):string {
 const from=contacts.find(p=>p.id===current);if(!from)return contacts[0]?.id??current;
 const length=Math.hypot(dx,dy);if(!length)return current;
 let best=current,score=Infinity;
 for(const p of contacts){if(p.id===current)continue;const x=p.x-from.x,y=p.y-from.y,d=Math.hypot(x,y),along=(x*dx+y*dy)/length;
  if(d<1||along/d<.45)continue;
  const candidate=d*(1+2*(1-along/d));
  if(candidate<score){score=candidate;best=p.id;}
 }
 return best;
}
