import {scoreDrag} from './gestures';
export type Point2={x:number;y:number};
export type Track<T>={item:T;from:Point2;to:Point2};
/** Closest clamped segment, with an optional pixel advantage for the incumbent.
 * Progress and drop are recomputed from the fixed grab anchors, never the last pose.
 */
export function trackAt<T>(tracks:Track<T>[],at:Point2,previous?:T,stickiness=0,explicit?:T){
 const scored=tracks.map(track=>({...track,...scoreDrag(track.from,track.to,at)}));
 const chosen=explicit===undefined?scored.reduce<typeof scored[number]|undefined>((best,next)=>{
  const rank=next.distance-(next.item===previous?stickiness:0);
  return !best||rank<best.distance-(best.item===previous?stickiness:0)?next:best;
 },undefined):scored.find(t=>t.item===explicit);
 if(!chosen)return;
 const distance=(p:Point2)=>Math.hypot(at.x-p.x,at.y-p.y);
 return {...chosen,ready:distance(chosen.to)<distance(chosen.from)};
}
export const glideEase=(t:number)=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);
