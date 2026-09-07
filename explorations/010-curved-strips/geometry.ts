import * as T from 'three';
import {ConvexGeometry} from 'three/addons/geometries/ConvexGeometry.js';
export type Edge={a:T.Vector3;b:T.Vector3;r:number;id:string};
export type Options={sides:number;twist:number;bow:number;normals:string;junction:string};
export type Result={geometry:T.BufferGeometry;strips:number;patches:number;boundary:number;nonmanifold:number};
const key=(v:T.Vector3)=>v.toArray().map(n=>n.toFixed(5)).join(',');
export function construct(input:Edge[],o:Options):Result{
 const points:T.Vector3[]=[];for(const e of input)for(const p of [e.a,e.b])if(!points.some(q=>q.distanceTo(p)<1e-5))points.push(p);
 const edges:Edge[]=[];
 // Explicit geometric attachment sites split their host member, without altering the term.
 for(const e of input){const delta=e.b.clone().sub(e.a),len2=delta.lengthSq();if(len2<1e-8||e.r<1e-5)continue;const sites=points.map(p=>({p,t:p.clone().sub(e.a).dot(delta)/len2})).filter(v=>v.t>=-1e-6&&v.t<=1+1e-6&&e.a.clone().addScaledVector(delta,v.t).distanceTo(v.p)<1e-5).sort((a,b)=>a.t-b.t);for(let i=1;i<sites.length;i++)if(sites[i].p.distanceTo(sites[i-1].p)>1e-5)edges.push({...e,a:sites[i-1].p,b:sites[i].p,id:e.id+':'+i});}
 const nodes=new Map<string,{p:T.Vector3;ends:{ring:T.Vector3[];r:number;dir:T.Vector3}[]}>();
 const tri:{v:T.Vector3[];group:string;normal?:T.Vector3[]}[]=[];let strips=0,patches=0;
 const push=(a:T.Vector3,b:T.Vector3,c:T.Vector3,group:string,expect?:T.Vector3)=>{let v=[a,b,c];if(expect&&b.clone().sub(a).cross(c.clone().sub(a)).dot(expect)<0)v=[a,c,b];tri.push({v,group});};
 for(const e of edges){const akey=key(e.a),bkey=key(e.b);for(const [k,p] of [[akey,e.a],[bkey,e.b]] as [string,T.Vector3][]){if(!nodes.has(k))nodes.set(k,{p,ends:[]});}}
 const port=(p:T.Vector3,r:number)=>{const incident=edges.filter(e=>e.a.distanceTo(p)<1e-5||e.b.distanceTo(p)<1e-5);if(incident.length===1)return {trim:0,r};
 const trim=Math.min(...incident.map(e=>e.a.distanceTo(e.b)))*.28;
 const dirs=incident.map(e=>(e.a.distanceTo(p)<1e-5?e.b:e.a).clone().sub(p).normalize());let angle=Math.PI;
 for(let i=0;i<dirs.length;i++)for(let j=i+1;j<dirs.length;j++)angle=Math.min(angle,Math.acos(T.MathUtils.clamp(dirs[i].dot(dirs[j]),-1,1)));
 return {trim,r:Math.min(r,trim*Math.tan(angle*.5)*.55)};
 };
 for(const e of edges){const d=e.b.clone().sub(e.a),length=d.length(),axis=d.normalize(),ref=Math.abs(axis.z)<.98?new T.Vector3(0,0,1):new T.Vector3(1,0,0),u=ref.clone().addScaledVector(axis,-ref.dot(axis)).normalize(),v=axis.clone().cross(u);
 const pa=port(e.a,e.r),pb=port(e.b,e.r*.88),trimA=pa.trim,trimB=pb.trim;
 const a=e.a.clone().addScaledVector(axis,trimA),b=e.b.clone().addScaledVector(axis,-trimB),rings:T.Vector3[][]=[];const steps=36;
 for(let j=0;j<=steps;j++){const t=j/steps,center=a.clone().lerp(b,t).addScaledVector(u,Math.sin(Math.PI*t)*o.bow*Math.min(1,length*.2));const angle=o.twist*(t*t*(3-2*t));const r=pa.r*(1-t)+pb.r*t;
 rings.push(Array.from({length:o.sides},(_,k)=>{const theta=k*2*Math.PI/o.sides+angle;return center.clone().addScaledVector(u,Math.cos(theta)*r).addScaledVector(v,Math.sin(theta)*r);}));}
 for(let k=0;k<o.sides;k++){const q=(k+1)%o.sides;for(let j=0;j<steps;j++){const normal=rings[j][k].clone().add(rings[j][q]).multiplyScalar(.5).sub(a.clone().lerp(b,j/steps));push(rings[j][k],rings[j+1][k],rings[j+1][q],e.id+':strip'+k,normal);push(rings[j][k],rings[j+1][q],rings[j][q],e.id+':strip'+k,normal);}strips++;}
 nodes.get(key(e.a))!.ends.push({ring:rings[0],r:pa.r,dir:axis.clone()});nodes.get(key(e.b))!.ends.push({ring:rings[steps],r:pb.r,dir:axis.clone().negate()});
 }
 for(const [id,node] of nodes){const ends=node.ends;if(!ends.length)continue;
 if(ends.length===1){const ring=ends[0].ring,center=ring.reduce((p,v)=>p.add(v),new T.Vector3()).multiplyScalar(1/ring.length);for(let i=0;i<ring.length;i++)push(center,ring[i],ring[(i+1)%ring.length],'cap'+id,ends[0].dir.clone().negate());continue;}
 if(o.junction==='open')continue;
 const all=ends.flatMap(e=>e.ring),hull=new ConvexGeometry(all),pos=hull.getAttribute('position');
 const tag=(p:T.Vector3)=>ends.findIndex(e=>e.ring.some(q=>q.distanceTo(p)<1e-5));
 // A local star-shaped envelope is used only to round the patch interior. Boundary rings stay exact.
 const field=(p:T.Vector3)=>{let f=-100;for(const end of ends){const L=Math.max(...end.ring.map(q=>q.clone().sub(node.p).dot(end.dir))),x=p.clone().sub(node.p),t=Math.max(0,Math.min(L,x.dot(end.dir))),q=end.r-x.addScaledVector(end.dir,-t).length(),h=Math.max(.15-Math.abs(f-q),0)/.15;f=Math.max(f,q)+h*h*.15*.25;}return f;};
 const project=(p:T.Vector3)=>{const dir=p.clone().sub(node.p).normalize();let lo=0,hi=p.distanceTo(node.p)*2+1;for(let i=0;i<16;i++){const mid=(lo+hi)/2;if(field(node.p.clone().addScaledVector(dir,mid))>0)lo=mid;else hi=mid;}return node.p.clone().addScaledVector(dir,(lo+hi)/2);};
 const patch=(a:T.Vector3,b:T.Vector3,c:T.Vector3,depth:number)=>{if(o.junction==='rounded'&&depth>0){const center=project(a.clone().add(b).add(c).multiplyScalar(1/3));patch(a,b,center,depth-1);patch(b,c,center,depth-1);patch(c,a,center,depth-1);}else push(a,b,c,'patch'+id);};
 for(let i=0;i<pos.count;i+=3){const t=[0,1,2].map(j=>new T.Vector3().fromBufferAttribute(pos,i+j)).map(p=>all.find(q=>q.distanceTo(p)<1e-5)??p),tags=t.map(tag);if(tags[0]>=0&&tags.every(x=>x===tags[0]))continue;if(o.junction==='rounded'){
 const poly:T.Vector3[]=[];for(let k=0;k<3;k++){poly.push(t[k]);if(tags[k]!==tags[(k+1)%3])poly.push(project(t[k].clone().add(t[(k+1)%3]).multiplyScalar(.5)));}
 const center=project(t[0].clone().add(t[1]).add(t[2]).multiplyScalar(1/3));for(let k=0;k<poly.length;k++)patch(center,poly[k],poly[(k+1)%poly.length],1);
 }else patch(t[0],t[1],t[2],0);}hull.dispose();patches++;
 }
 // Position sharing controls continuity; normal sharing is explicitly restricted to each strip.
 const sums=new Map<string,T.Vector3>(),edgeCounts=new Map<string,number>();
 const normalKey=(v:T.Vector3,g:string)=>key(v)+(o.normals==='all'?'':g);
 for(const face of tri){const n=face.v[1].clone().sub(face.v[0]).cross(face.v[2].clone().sub(face.v[0]));face.v.forEach(p=>{const k=normalKey(p,face.group);if(!sums.has(k))sums.set(k,new T.Vector3());sums.get(k)!.add(n);});for(let i=0;i<3;i++){const k=[key(face.v[i]),key(face.v[(i+1)%3])].sort().join('|');edgeCounts.set(k,(edgeCounts.get(k)??0)+1);}}
 const positions:number[]=[],normals:number[]=[];
 for(const f of tri){const flat=f.v[1].clone().sub(f.v[0]).cross(f.v[2].clone().sub(f.v[0])).normalize();for(const p of f.v){positions.push(...p.toArray());normals.push(...(o.normals==='flat'?flat:sums.get(normalKey(p,f.group))!.clone().normalize()).toArray());}}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new T.Float32BufferAttribute(normals,3));
 return {geometry,strips,patches,boundary:[...edgeCounts.values()].filter(n=>n===1).length,nonmanifold:[...edgeCounts.values()].filter(n=>n>2).length};
}
