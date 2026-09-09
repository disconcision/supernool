import assert from 'node:assert/strict';
import * as T from 'three';
import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';
import {problems,instantiate} from './problems';
import {actions} from './algebra';
import {layout,transition} from './layout';
import {rootedEdges} from './root-base';
import {fill,Options} from './surface';
import {fittedDomain,restoreMeshCoordinates} from './mesh-domain';
const o:Options={thickness:1,taper:.8,bow:.7,random:.6,twist:.8,facets:.55,seed:2,blend:.12,hewn:true,rootFlare:.8,rootAmount:.5};
const size=80,mc=new MarchingCubes(size,new T.MeshBasicMaterial(),false,false,90000);mc.isolation=0;
let outside=0;
for(const p of problems.slice(-3))for(const spread of [0,1]){
 const t=instantiate(p.start),before=layout(t,{spread,irregularity:.4,height:'depth',seed:2});
 const a=actions(t).find(a=>a.key.startsWith('factor'));
 for(const u of a?[0,.5,1]:[0]){
  const pose=a?transition(t,a.result,u,{spread,irregularity:.4,height:'depth',seed:2},a.key,a.merge,o):before;
  const edges=rootedEdges(pose.edges,{...o,spread}),domain=fittedDomain(edges,{...o,spread},size);
  mc.reset();fill(mc.field,size,edges,{...o,spread},domain);
  // The MC boundary and its normal stencil must be outside the wood on all six faces.
  for(let j=1;j<size-1;j++)for(let k=1;k<size-1;k++)for(const i of [1,2,size-3,size-2]){
   assert(mc.field[k*size*size+j*size+i]<0,'wood reaches X boundary');
   assert(mc.field[k*size*size+i*size+j]<0,'wood reaches Y boundary');
   assert(mc.field[i*size*size+k*size+j]<0,'wood reaches Z boundary');
  }
  mc.update();assert(mc.count>0&&mc.count<=mc.geometry.attributes.position.count);
  const positions=(mc.geometry.attributes.position.array as Float32Array).slice(0,mc.count*3),normals=(mc.geometry.attributes.normal.array as Float32Array).slice(0,mc.count*3);
  restoreMeshCoordinates(positions,normals,domain);
  const vertices: T.Vector3[]=[];
  for(let i=0;i<positions.length;i+=3){const v=new T.Vector3(positions[i]*6,positions[i+1]*6+5,positions[i+2]*6);vertices.push(v);assert(Number.isFinite(v.length()));if(Math.abs(v.x)>6.05||Math.abs(v.z)>6.05||v.y>11.05)outside++;assert(Math.abs(Math.hypot(normals[i],normals[i+1],normals[i+2])-1)<1e-5);}
  // Surfaces must reach distal branch tips, not just occupy the central region.
  const tolerance=4*Math.max(domain.half.x,domain.half.y,domain.half.z)/size+.45;
  for(const e of edges.filter(e=>e.r>.04&&e.a.distanceTo(e.b)>.5))assert(vertices.some(v=>v.distanceTo(e.b)<tolerance),'No surface at branch tip '+e.id+' in '+p.id);
 }
}
assert(outside>100,'Regression specimens must actually cross the old sampling bounds');
// Explicitly probe high Y and deep Z, beyond the extents of today's presets.
const far=[{id:'far',a:new T.Vector3(0,10,0),b:new T.Vector3(2,17,10),r:.4,curve:new T.Vector3(-2,1,3)}];
const d=fittedDomain(far,o,size);assert(d.center.y+d.half.y>17&&d.center.z+d.half.z>13);
const n=new Float32Array([1,1,1]),pos=new Float32Array([0,0,0]);restoreMeshCoordinates(pos,n,{center:new T.Vector3(0,5,0),half:new T.Vector3(6,12,6)});assert(Math.abs(n[1]/n[0]-.5)<1e-6,'Normals require inverse-transpose scaling');
console.log('Adaptive mesh domain: large planar/spatial trees, factor midpoints, distal tips, six empty boundary faces, and anisotropic normals passed.');
