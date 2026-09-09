import * as T from 'three';
import {Pose} from './layout';
import {Edge,Options,prepare} from './surface';
/** Snapshot member geometry, including implicit bow. Mesh buffers have unrelated
 * topology after rewrites, so interpolate semantic members before remeshing. */
export function capturePose(pose:Pose,options:Options):Pose{
 return {...pose,points:new Map([...pose.points].map(([id,p])=>[id,p.clone()])),
  edges:pose.edges.map(e=>({...e,a:e.a.clone(),b:e.b.clone(),curve:prepare(e,options).curve}))};
}
function survivingAnchor(id:string,source:Pose,target:Pose,fallback:T.Vector3){
 const seen=new Set<string>();let at:string|undefined=id;
 while(at&&!seen.has(at)){seen.add(at);const p=target.points.get(at);if(p)return p;at=source.parents.get(at);}
 return target.edges.find(e=>e.id==='stem')?.b??fallback;
}
export function glidePose(from:Pose,to:Pose,t:number,options:Options):Pose{
 if(t<=0)return from;if(t>=1)return to;
 const points=new Map<string,T.Vector3>();
 for(const id of new Set([...from.points.keys(),...to.points.keys()])){
  const a=from.points.get(id),b=to.points.get(id);
  points.set(id,(a??survivingAnchor(id,to,from,b!)).clone().lerp(b??survivingAnchor(id,from,to,a!),t));
 }
 const old=new Map(from.edges.map(e=>[e.id,e])),fresh=new Map(to.edges.map(e=>[e.id,e]));
 const edges:Edge[]=[];
 for(const id of new Set([...old.keys(),...fresh.keys()])){
  const a=old.get(id),b=fresh.get(id),e=(b??a)!;
  // Retiring/appearing members retract/emerge at full thickness, not as needles.
  const collapseA=!a?survivingAnchor(id,to,from,b!.a):undefined;
  const collapseB=!b?survivingAnchor(id,from,to,a!.a):undefined;
  const start=(a?.a??collapseA!).clone().lerp(b?.a??collapseB!,t);
  const end=(a?.b??collapseA!).clone().lerp(b?.b??collapseB!,t);
  if(start.distanceToSquared(end)<1e-10)continue;
  const curve=(a?prepare(a,options).curve:new T.Vector3()).lerp(b?prepare(b,options).curve:new T.Vector3(),t);
  edges.push({...e,a:start,b:end,curve,r:a&&b?T.MathUtils.lerp(a.r,b.r,t):e.r,
   tipRatio:a&&b?T.MathUtils.lerp(a.tipRatio??prepare(a,options).tip/prepare(a,options).r,b.tipRatio??prepare(b,options).tip/prepare(b,options).r,t):e.tipRatio});
 }
 return {points,edges,nodes:new Map([...from.nodes,...to.nodes]),parents:new Map([...from.parents,...to.parents])};
}
