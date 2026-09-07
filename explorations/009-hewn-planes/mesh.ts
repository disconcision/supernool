import * as T from 'three';
import {ConvexGeometry} from 'three/addons/geometries/ConvexGeometry.js';
export type Config={sides:number;bevel:number;twist:number;curve:number;radius:number;share:number};
export type MeshData={positions:number[];hubTriangles:number;boundaryEdges:number;nonmanifoldEdges:number};
const key=(v:T.Vector3)=>[v.x,v.y,v.z].map(x=>x.toFixed(5)).join(',');
export function build(c:Config):MeshData{
 const positions:number[]=[],rings:T.Vector3[][]=[],outputs:{dir:T.Vector3;end:T.Vector3;r:number;ring:T.Vector3[]}[]=[];
 const endpoints=[new T.Vector3(0,-3.8,0),new T.Vector3(-2.5,3.4,0),new T.Vector3(2.2,2.9,0)];
 const radii=[c.radius,c.radius*Math.sqrt(c.share),c.radius*Math.sqrt(1-c.share)];
 const tri=(a:T.Vector3,b:T.Vector3,d:T.Vector3,expected?:T.Vector3)=>{if(expected&&b.clone().sub(a).cross(d.clone().sub(a)).dot(expected)<0)[b,d]=[d,b];positions.push(...a.toArray(),...b.toArray(),...d.toArray());};
 function ring(dir:T.Vector3,center:T.Vector3,r:number,twist:number){const u=new T.Vector3(0,0,1),v=dir.clone().cross(u).normalize();const base=Array.from({length:c.sides},(_,i)=>{const angle=i*2*Math.PI/c.sides+twist,rr=r*(1+.025*Math.sin(i*4.3));return center.clone().addScaledVector(u,Math.cos(angle)*rr).addScaledVector(v,Math.sin(angle)*rr);});
 return base.flatMap((p,i)=>[p.clone().lerp(base[(i+c.sides-1)%c.sides],c.bevel),p.clone().lerp(base[(i+1)%c.sides],c.bevel)]);}
 for(let i=0;i<3;i++){const dir=endpoints[i].clone().normalize(),r=radii[i],center=dir.clone().multiplyScalar(1.25),r0=ring(dir,center,r,0);rings.push(r0);outputs.push({dir,end:endpoints[i],r,ring:r0});}
 // Cut three openings in a convex junction patch at the exact member rings.
 const original=rings.flat();
 const lookup=new Map<string,number>();rings.forEach((r,i)=>r.forEach(p=>lookup.set(key(p),i)));
 const hull=new ConvexGeometry(rings.flat()),hp=hull.getAttribute('position');let hubTriangles=0;
 for(let i=0;i<hp.count;i+=3){const vs=[0,1,2].map(j=>new T.Vector3().fromBufferAttribute(hp,i+j)).map(v=>original.find(p=>p.distanceToSquared(v)<1e-10)??v),tags=vs.map(v=>lookup.get(key(v)));if(tags[0]!==undefined&&tags.every(x=>x===tags[0]))continue;tri(vs[0],vs[1],vs[2]);hubTriangles++;}hull.dispose();
 outputs.forEach(({dir,end,r,ring:initial},branch)=>{let last=initial;const start=dir.clone().multiplyScalar(1.25),steps=c.curve===0&&c.twist===0?1:3;
 for(let j=1;j<=steps;j++){const t=j/steps,center=start.clone().lerp(end,t);center.z+=Math.sin(Math.PI*t)*c.curve*(branch===1?1:-.55);const radius=r*(1-.24*t),next=ring(dir,center,radius,c.twist*t*(branch===2?-1:1));
 for(let k=0;k<last.length;k++){const l=(k+1)%last.length,radial=last[k].clone().add(last[l]).multiplyScalar(.5).sub(start.clone().lerp(end,(j-1)/steps));tri(last[k],next[k],next[l],radial);tri(last[k],next[l],last[l],radial);}last=next;
 }const center=last.reduce((s,p)=>s.add(p),new T.Vector3()).multiplyScalar(1/last.length);for(let k=0;k<last.length;k++)tri(center,last[k],last[(k+1)%last.length],dir);});
 const edges=new Map<string,number>();for(let i=0;i<positions.length;i+=9){const v=[0,3,6].map(j=>key(new T.Vector3(...positions.slice(i+j,i+j+3) as [number,number,number])));for(let j=0;j<3;j++){const edge=[v[j],v[(j+1)%3]].sort().join('|');edges.set(edge,(edges.get(edge)??0)+1);}}
 return {positions,hubTriangles,boundaryEdges:[...edges.values()].filter(n=>n===1).length,nonmanifoldEdges:[...edges.values()].filter(n=>n>2).length};
}
