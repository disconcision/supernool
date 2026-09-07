import * as T from 'three';
import {hash} from './canopy';
import {ArcClass,TimingSettings,activeFlashes} from './lightning-timing';
export {arcEvent,flashTimeline,strokePattern} from './lightning-timing';
export type ProjectedLobe={x:number;y:number;rx:number;ry:number};
export type LightningMemory={events?:Map<string,LightningMemory>;key?:string;picks?:{index:number;angle:number}[]};
export type BoltSegment={a:T.Vector2;b:T.Vector2;weight:number};
// Short discharge paths on exposed cloud borders. No branch endpoints are used.
export function exteriorLightning(lobes:ProjectedLobe[],time:number,anger:number,memory:LightningMemory={},size=1){
 const rate=.65+anger*1.5,slot=Math.floor(time*rate),phase=time-slot/rate;
 const delay=hash('delay'+slot)*.16,duration=.055+anger*.035;
 const envelope=(t:number)=>t>=0&&t<duration?Math.pow(1-t/duration,.65):0;
 const power=(envelope(phase-delay)+envelope(phase-delay-duration-.045)*.32)*(.28+anger*.85);
 const segments:BoltSegment[]=[];if(power===0||!lobes.length)return {segments,power,slot};
 const candidates:{l:ProjectedLobe;angle:number}[]=[],span=(.38+anger*.68)*size;
 const exposed=(p:T.Vector2,own:ProjectedLobe)=>!lobes.some(l=>l!==own&&((p.x-l.x)/l.rx)**2+((p.y-l.y)/l.ry)**2<.99);
 const at=(l:ProjectedLobe,a:number)=>new T.Vector2(l.x+Math.cos(a)*l.rx,l.y+Math.sin(a)*l.ry);
 const key=slot+':'+anger+':'+size+':'+lobes.length;
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


export type ArcSettings=TimingSettings&{smallSize:number;mediumSize:number;largeSize:number;rockShare:number};
export const arcDefaults:ArcSettings={smallRate:1.2,mediumRate:.16,largeRate:.035,smallSize:1,mediumSize:1,largeSize:1,rockShare:.55,duration:1,burstiness:.75,stormScale:1,restrikes:.55,timingSeed:3};
export type MixedSegment=BoltSegment&{power:number;free:boolean};
export type ArcPreview=ArcClass|'rock'|'branch';
function forkedPath(a:T.Vector2,b:T.Vector2,key:string,weight:number):BoltSegment[]{
 const axis=b.clone().sub(a),normal=new T.Vector2(-axis.y,axis.x).normalize(),length=axis.length(),points:T.Vector2[]=[],segments:BoltSegment[]=[];
 for(let i=0;i<=12;i++){
 const t=i/12,p=a.clone().lerp(b,t);
 p.addScaledVector(normal,Math.sin(Math.PI*t)*(Math.sin(t*Math.PI*2+hash(key)*6)*.055+(hash(key+i+'bend')-.5)*.12)*length);
 points.push(p);if(i)segments.push({a:points[i-1],b:p,weight:weight*(1-i*.016)});
 }
 for(const j of [4,8]){const origin=points[j],end=origin.clone().addScaledVector(axis,.17).addScaledVector(normal,length*(j===4?.16:-.12));let last=origin;
 for(let i=1;i<=4;i++){const p=origin.clone().lerp(end,i/4).addScaledVector(normal,(hash(key+j+':'+i)-.5)*length*.035*Math.sin(Math.PI*i/4));segments.push({a:last,b:p,weight:weight*(.42-i*.065)});last=p;}}
 return segments;
}
export function largeContact(branches:T.Vector2[],rocks:T.Vector2[],slot:number,scale:number,rockShare:number,preview?:ArcPreview){
 if(!branches.length)return;
 const key='large'+slot,rock=preview==='rock'||(preview!=='branch'&&hash(key+'target')<rockShare),from=Math.floor(hash(key+'origin')*branches.length),a=branches[from];
 const choices=(rock?rocks:branches).map((p,index)=>({p,index})).filter(({p})=>p.distanceTo(a)>.025).sort((x,y)=>x.p.distanceTo(a)-y.p.distanceTo(a));if(!choices.length)return;
 const b=choices[Math.min(choices.length-1,Math.floor(T.MathUtils.clamp(.45+scale*.275,0,1)*(choices.length-1)))];return {from,to:b.index,rock,a,b:b.p};
}
export function mixedLightning(lobes:ProjectedLobe[],branches:T.Vector2[],rocks:T.Vector2[],time:number,anger:number,o:ArcSettings,preview?:ArcPreview,memory:LightningMemory={}){
 const segments:MixedSegment[]=[],events:{kind:ArcClass;target:string;power:number}[]=[];
 if(!lobes.length)return {segments,events};
 const at=(l:ProjectedLobe,a:number)=>new T.Vector2(l.x+Math.cos(a)*l.rx,l.y+Math.sin(a)*l.ry);
 const flashes=(['large','medium','small'] as ArcClass[]).flatMap(kind=>{
 const forced=preview&&(preview===kind||(kind==='large'&&(preview==='rock'||preview==='branch')));
 return (preview?(forced?[{slot:0,start:time,power:.85}]:[]):activeFlashes(kind,time,anger,o)).map(event=>({kind,event}));
 });
 for(const {kind,event} of flashes){
 if(segments.length+(kind==='small'?(anger>.72?32:16):20)>80)continue;
 const power=event.power;
 const key=kind+event.slot,source=lobes[Math.floor(hash(key+'source')*lobes.length)],scale=o[`${kind}Size`];let path:BoltSegment[]=[],target='cloud',free=kind!=='small';
 if(kind==='small'){
 // Reuse the exposed-border path finder, but vary its angular reach independently.
 const t=event.slot/(.65+anger*1.5)+hash('delay'+event.slot)*.16+.012;
 const cache=memory.events??(memory.events=new Map());if(!cache.has(key)){if(cache.size>=32)cache.delete(cache.keys().next().value!);cache.set(key,{});}
 const shaped=exteriorLightning(lobes,t,anger,cache.get(key)!,scale);path=shaped.segments;
 }else{
 let a=at(source,hash(key+'angle')*Math.PI*2),b:T.Vector2;
 if(kind==='large'){
 const contact=largeContact(branches.length?branches:[a],rocks,event.slot,scale,o.rockShare,preview);if(!contact)continue;
 a=contact.a.clone();b=contact.b.clone();target=contact.rock?'rock':'branch';
 }else{
 const choices=lobes.filter(l=>l!==source).sort((x,y)=>Math.hypot(x.x-a.x,x.y-a.y)-Math.hypot(y.x-a.x,y.y-a.y));
 const dest=choices[Math.min(choices.length-1,Math.floor(choices.length*.3*scale))]??source;
 b=at(dest,Math.atan2(a.y-dest.y,a.x-dest.x));
 if(b.distanceTo(a)<.02)b=at(source,Math.PI+hash(key+'angle')*Math.PI*2);
 }
 path=forkedPath(a,b,key,kind==='large'?1.1:.75);
 }
 if(segments.length+path.length>80)continue;
 for(const segment of path)segments.push({...segment,power:power*(kind==='small'?.65:kind==='medium'?.7:1)*(1+anger*.4),free});
 if(path.length)events.push({kind,target,power});
 }
 return {segments,events};
}
