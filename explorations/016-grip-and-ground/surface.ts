import * as T from 'three';
export type Edge={a:T.Vector3;b:T.Vector3;r:number;id:string;cutA?:boolean;cutB?:boolean};
export type Options={thickness:number;taper:number;bow:number;random:number;twist:number;facets:number;seed:number;blend:number;hewn?:boolean;spread?:number};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
function hash(s:string){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0)/4294967295;}
export function prepare(e:Edge,o:Options){
 const axis=e.b.clone().sub(e.a),len=axis.length();axis.divideScalar(len||1);
 const u=new T.Vector3(0,0,1).addScaledVector(axis,-axis.z).normalize(),v=new T.Vector3().crossVectors(axis,u);
 const n=hash(e.id+':'+o.seed)*2-1,points:T.Vector3[]=[];
 const natural=new T.Vector3(0,1,0).addScaledVector(axis,-axis.y);
 if(natural.lengthSq()<.001)natural.copy(v);
 natural.normalize().applyAxisAngle(axis,o.random*(hash(e.id+':direction:'+o.seed)*2-1)*Math.PI*(o.spread??1));
 const bend=natural.multiplyScalar(len*o.bow*.18*(1+o.random*n*.5));
 // One smooth centreline and one field per semantic member. Sampling does not add volume.
 for(let i=0;i<=16;i++){const t=i/16;points.push(e.a.clone().lerp(e.b,t).addScaledVector(bend,Math.sin(Math.PI*t)));}
 const r=e.r*o.thickness;const tip=r*(1-o.taper*Math.min(.7,.12+len*.08));
 return {e,points,u,v,axis,len,r,tip,n,d:e.b.clone().sub(e.a),planes:Array.from({length:7},(_,k)=>[Math.cos(k*Math.PI*2/7),Math.sin(k*Math.PI*2/7),Math.sin(k*2.7+n*2),Math.cos(k*2.7+n*2)]),curve:points[8].clone().sub(e.a.clone().lerp(e.b,.5))};
}
export type Member=ReturnType<typeof prepare>;
export function valueAt(x:number,y:number,z:number,m:Member,o:Options){
 const d=m.d,bow=m.curve;
 let along=clamp(((x-m.e.a.x)*d.x+(y-m.e.a.y)*d.y+(z-m.e.a.z)*d.z)/(m.len*m.len));
 for(let i=0;i<4;i++){
  const sin=Math.sin(Math.PI*along),cos=Math.cos(Math.PI*along),vx=d.x+bow.x*Math.PI*cos,vy=d.y+bow.y*Math.PI*cos,vz=d.z+bow.z*Math.PI*cos;
  const ex=m.e.a.x+d.x*along+bow.x*sin-x,ey=m.e.a.y+d.y*along+bow.y*sin-y,ez=m.e.a.z+d.z*along+bow.z*sin-z;
  along=clamp(along-(ex*vx+ey*vy+ez*vz)/Math.max(.00000001,vx*vx+vy*vy+vz*vz-Math.PI*Math.PI*sin*(ex*bow.x+ey*bow.y+ez*bow.z)));
 }
 const sin=Math.sin(Math.PI*along),cos=Math.cos(Math.PI*along),cx=m.e.a.x+d.x*along+bow.x*sin,cy=m.e.a.y+d.y*along+bow.y*sin,cz=m.e.a.z+d.z*along+bow.z*sin;
 let wx=d.x+bow.x*Math.PI*cos,wy=d.y+bow.y*Math.PI*cos,wz=d.z+bow.z*Math.PI*cos;const invW=1/Math.hypot(wx,wy,wz);wx*=invW;wy*=invW;wz*=invW;
 const dx=x-cx,dy=y-cy,dz=z-cz,dot=dx*wx+dy*wy+dz*wz;
 // Project reference into the local normal plane; no per-span rotation reset.
 const uw=m.u.x*wx+m.u.y*wy+m.u.z*wz,ux=m.u.x-uw*wx,uy=m.u.y-uw*wy,uz=m.u.z-uw*wz,inv=1/Math.hypot(ux,uy,uz);
 const ax=(dx*ux+dy*uy+dz*uz)*inv,ay=(dx*(wy*uz-wz*uy)+dy*(wz*ux-wx*uz)+dz*(wx*uy-wy*ux))*inv;
 const theta=o.twist*along+m.n*.15,ct=Math.cos(theta),st=Math.sin(theta),rx=ax*ct+ay*st,ry=-ax*st+ay*ct,cp=Math.cos(along*2.4),sp=Math.sin(along*2.4);let cross=0;
 for(const p of m.planes){const width=1+o.facets*.22*(p[2]*cp+p[3]*sp);cross=Math.max(cross,(rx*p[0]+ry*p[1])/width);}

 const r=m.r+(m.tip-m.r)*along;
 if(o.hewn&&((along<1e-6&&m.e.cutA)||(along>1-1e-6&&m.e.cutB)|| (along>=1e-6&&along<=1-1e-6))){
  // Flat end cuts; actual polygonal sections, not a light-only faceting effect.
  const cap=along<1e-6?dot:along>1-1e-6?-dot:100;
  return Math.min(r-cross,cap);
 }
 return r-Math.hypot(cross,dot);
}
export function fill(field:Float32Array,size:number,edges:Edge[],o:Options){
 field.fill(-100);
 const shared=(p:T.Vector3,own:Edge)=>edges.some(e=>{if(e===own||e.r<1e-6)return false;const d=e.b.clone().sub(e.a),t=d.lengthSq()?clamp(p.clone().sub(e.a).dot(d)/d.lengthSq()):0;return e.a.clone().addScaledVector(d,t).distanceToSquared(p)<1e-8;});
 const preparedEdges=edges.map(e=>({...e,cutA:!shared(e.a,e),cutB:!shared(e.b,e)}));
 const members=preparedEdges.filter(e=>e.r>1e-6&&e.a.distanceTo(e.b)>1e-6).map(e=>prepare(e,o));
 const bound=(x:number)=>Math.max(1,Math.min(size-2,Math.floor((x/6+1)*size/2))),world=(i:number)=>(i/size*2-1)*6;
 for(const m of members){const pad=m.r*1.6+o.blend+.15,box=new T.Box3().setFromPoints(m.points).expandByScalar(pad);
 const xmin=bound(box.min.x),xmax=Math.min(size-2,bound(box.max.x)+1),ymin=bound(box.min.y-5),ymax=Math.min(size-2,bound(box.max.y-5)+1),zmin=bound(box.min.z),zmax=Math.min(size-2,bound(box.max.z)+1);
 for(let z=zmin;z<=zmax;z++)for(let y=ymin;y<=ymax;y++)for(let x=xmin;x<=xmax;x++){
 const q=valueAt(world(x),world(y)+5,world(z),m,o),index=z*size*size+y*size+x,d=field[index],h=o.blend>0?Math.max(o.blend-Math.abs(d-q),0)/o.blend:0;
 field[index]=Math.max(d,q)+h*h*o.blend*.25;
 }}
 return members;
}
