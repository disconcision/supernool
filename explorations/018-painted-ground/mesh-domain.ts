import * as T from 'three';
import {Edge,Options,prepare} from './surface';
export type GridDomain={center:T.Vector3;half:T.Vector3};
export const legacyDomain=():GridDomain=>({center:new T.Vector3(0,5,0),half:new T.Vector3(6,6,6)});
/** Bound the entire sinusoidal centreline and polygonal envelope, not only its endpoints. */
export function memberBox(m:ReturnType<typeof prepare>,o:Options){
 const box=new T.Box3().setFromPoints([m.e.a,m.e.b]);
 for(const axis of ['x','y','z'] as const){box.min[axis]+=Math.min(0,m.curve[axis]);box.max[axis]+=Math.max(0,m.curve[axis]);}
 const radius=(Math.max(m.r,m.tip)+m.flare)*(1+Math.abs(o.facets)*.22*Math.SQRT2)/Math.cos(Math.PI/7);
 return box.expandByScalar(radius+o.blend+.15);
}
export function fittedDomain(edges:Edge[],o:Options,size:number):GridDomain{
 const base=legacyDomain(),box=new T.Box3(base.center.clone().sub(base.half),base.center.clone().add(base.half));
 const content=new T.Box3();
 for(const e of edges)if(e.r>1e-6&&e.a.distanceToSquared(e.b)>1e-12)content.union(memberBox(prepare(e,o),o));
 if(!content.isEmpty()){
  // Conservative allowance for accumulated smooth union plus four outside samples.
  content.expandByScalar(Math.max(0,edges.length-1)*o.blend*.25);
  const span=content.getSize(new T.Vector3()).max(new T.Vector3(12,12,12));
  const padding=span.multiplyScalar(4/Math.max(8,size-8));
  content.min.sub(padding);content.max.add(padding);box.union(content);
 }
 // Half-unit bounds avoid tiny envelope changes continually moving the sampling grid.
 for(const axis of ['x','y','z'] as const){box.min[axis]=Math.floor(box.min[axis]*2)/2;box.max[axis]=Math.ceil(box.max[axis]*2)/2;}
 return {center:box.getCenter(new T.Vector3()),half:box.getSize(new T.Vector3()).multiplyScalar(.5)};
}
/** Keep the scene's historical mesh transform (scale 6, translate y by 5). */
export function restoreMeshCoordinates(position:Float32Array,normal:Float32Array,d:GridDomain){
 for(let i=0;i<position.length;i+=3){
  position[i]=(position[i]*d.half.x+d.center.x)/6;
  position[i+1]=(position[i+1]*d.half.y+d.center.y-5)/6;
  position[i+2]=(position[i+2]*d.half.z+d.center.z)/6;
  const x=normal[i]/d.half.x,y=normal[i+1]/d.half.y,z=normal[i+2]/d.half.z,l=Math.hypot(x,y,z)||1;
  normal[i]=x/l;normal[i+1]=y/l;normal[i+2]=z/l;
 }
}
