import * as T from 'three';
import {hash} from './canopy';
export type ProjectedLobe={x:number;y:number;rx:number;ry:number};
export type LightningMemory={key?:string;picks?:{index:number;angle:number}[]};
export type BoltSegment={a:T.Vector2;b:T.Vector2;weight:number};
// Short discharge paths on exposed cloud borders. No branch endpoints are used.
export function exteriorLightning(lobes:ProjectedLobe[],time:number,anger:number,memory:LightningMemory={}){
 const rate=.65+anger*1.5,slot=Math.floor(time*rate),phase=time-slot/rate;
 const delay=hash('delay'+slot)*.16,duration=.055+anger*.035;
 const envelope=(t:number)=>t>=0&&t<duration?Math.pow(1-t/duration,.65):0;
 const power=(envelope(phase-delay)+envelope(phase-delay-duration-.045)*.32)*(.28+anger*.85);
 const segments:BoltSegment[]=[];if(power===0||!lobes.length)return {segments,power,slot};
 const candidates:{l:ProjectedLobe;angle:number}[]=[],span=.38+anger*.68;
 const exposed=(p:T.Vector2,own:ProjectedLobe)=>!lobes.some(l=>l!==own&&((p.x-l.x)/l.rx)**2+((p.y-l.y)/l.ry)**2<.99);
 const at=(l:ProjectedLobe,a:number)=>new T.Vector2(l.x+Math.cos(a)*l.rx,l.y+Math.sin(a)*l.ry);
 const key=slot+':'+anger+':'+lobes.length;
 if(memory.key!==key){
 for(const l of lobes)for(let i=0;i<32;i++){const angle=i*Math.PI/16;if([0,.25,.5,.75,1].every(t=>exposed(at(l,angle+span*t),l)))candidates.push({l,angle});}
 if(!candidates.length)return {segments,power:0,slot};
 memory.key=key;memory.picks=Array.from({length:anger>.72?2:1},(_,k)=>{const c=candidates[Math.floor(hash('candidate'+slot+':'+k+':choice')*candidates.length)];return {index:lobes.indexOf(c.l),angle:c.angle};});}
 for(const [k,pick] of memory.picks!.entries()){
 const l=lobes[pick.index],angle=pick.angle;
 const points:T.Vector2[]=[];
 for(let i=0;i<=8;i++){const a=angle+span*i/8,p=at(l,a),radial=new T.Vector2(Math.cos(a),Math.sin(a));
 p.addScaledVector(radial,(hash('bend'+slot+':'+k+':'+i+':jitter')-.38)*Math.min(l.rx,l.ry)*.08);points.push(p);
 if(i)segments.push({a:points[i-1],b:p,weight:1-i*.025});}
 for(const j of [3,6]){const a=angle+span*j/8,origin=points[j],length=Math.min(l.rx,l.ry)*(.16+anger*.17);let prev=origin;
 for(let f=1;f<=4;f++){const direction=a+(j===3?.4:-.4),p=origin.clone().add(new T.Vector2(Math.cos(direction),Math.sin(direction)).multiplyScalar(length*f/4));
 p.add(new T.Vector2(-Math.sin(direction),Math.cos(direction)).multiplyScalar((hash('fork'+slot+':'+j+':'+f+':bend')-.5)*length*.3));segments.push({a:prev,b:p,weight:.48-f*.065});prev=p;}}
 }
 return {segments,power,slot};
}
