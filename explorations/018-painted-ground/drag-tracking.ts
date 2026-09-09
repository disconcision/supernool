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

export type FineCursor={raw:Point2;point:Point2;gain:number};
export const fineCursor=(at:Point2):FineCursor=>({raw:{...at},point:{...at},gain:1});
const smooth=(x:number)=>{const t=Math.max(0,Math.min(1,x));return t*t*(3-2*t);};
/** Precision increases only near two competitive tracks, outside their shared
 * launch point. This scales input; it never attracts the cursor to a route. */
export function ambiguityGain<T>(tracks:Track<T>[],at:Point2){
 const scores=tracks.map(t=>({...scoreDrag(t.from,t.to,at),from:t.from})).sort((a,b)=>a.distance-b.distance);
 if(scores.length<2||!Number.isFinite(scores[1].distance))return 1;
 const [a,b]=scores;
 const competitive=1-smooth((b.distance-a.distance)/12);
 const nearby=1-smooth(a.distance/40);
 const launched=smooth((Math.hypot(at.x-a.from.x,at.y-a.from.y)-10)/20);
 return 1-.7*competitive*nearby*launched;
}
/** Accumulate scaled deltas rather than rescaling total displacement. Midpoint
 * integration in <=1px input steps keeps low/high frame rates comparable. */
export function advanceFineCursor<T>(state:FineCursor,raw:Point2,tracks:Track<T>[]):FineCursor{
 const dx=raw.x-state.raw.x,dy=raw.y-state.raw.y,length=Math.hypot(dx,dy);
 const count=Math.max(1,Math.ceil(length)),sx=dx/count,sy=dy/count;
 const point={...state.point};let gain=state.gain;
 for(let i=0;i<count;i++){
  const start=ambiguityGain(tracks,point);
  gain=ambiguityGain(tracks,{x:point.x+sx*start*.5,y:point.y+sy*start*.5});
  point.x+=sx*gain;point.y+=sy*gain;
 }
 return {raw:{...raw},point,gain};
}
/** No incumbent advantage at launch or when retreating behind its start.
 * Once underway, cap hysteresis below the separation of close destinations. */
export function precisionStickiness<T>(tracks:Track<T>[],at:Point2,previous?:T){
 const current=tracks.find(t=>t.item===previous);if(!current)return 0;
 if(scoreDrag(current.from,current.to,at).progress<=0)return 0;
 const launched=smooth((Math.hypot(at.x-current.from.x,at.y-current.from.y)-10)/20);
 const separations=tracks.filter(t=>t!==current).map(t=>Math.hypot(t.to.x-current.to.x,t.to.y-current.to.y));
 return launched*Math.min(3,...separations.map(d=>d*.25));
}
