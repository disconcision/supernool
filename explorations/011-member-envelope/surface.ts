import * as T from 'three';
export type Edge={a:T.Vector3;b:T.Vector3;r:number;id:string};
export type Options={thickness:number;taper:number;bow:number;random:number;twist:number;facets:number;seed:number;blend:number};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
function hash(s:string){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0)/4294967295;}
export function prepare(e:Edge,o:Options){
 const axis=e.b.clone().sub(e.a),len=axis.length();axis.divideScalar(len||1);
 const u=new T.Vector3(0,0,1).addScaledVector(axis,-axis.z).normalize(),v=new T.Vector3().crossVectors(axis,u);
 const n=hash(e.id+':'+o.seed)*2-1,points:T.Vector3[]=[];
 // One smooth centreline and one field per semantic member. Sampling does not add volume.
 for(let i=0;i<=16;i++){const t=i/16;points.push(e.a.clone().lerp(e.b,t).addScaledVector(u,Math.sin(Math.PI*t)*len*o.bow*.18*(1+o.random*n)).addScaledVector(v,Math.sin(Math.PI*t)*len*o.bow*.13*o.random*n));}
 const r=e.r*o.thickness;const tip=r*(1-o.taper*Math.min(.7,.12+len*.08));
 return {e,points,u,v,axis,len,r,tip,n};
}
export type Member=ReturnType<typeof prepare>;
export function valueAt(x:number,y:number,z:number,m:Member,o:Options){
 let best=Infinity,along=0,cx=0,cy=0,cz=0,wx=0,wy=1,wz=0;
 for(let i=0;i<16;i++){const a=m.points[i],b=m.points[i+1],dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z,den=dx*dx+dy*dy+dz*dz;if(den<1e-12)continue;
 const t=clamp(((x-a.x)*dx+(y-a.y)*dy+(z-a.z)*dz)/den),px=a.x+t*dx,py=a.y+t*dy,pz=a.z+t*dz,dist=(x-px)**2+(y-py)**2+(z-pz)**2;
 if(dist<best){best=dist;along=(i+t)/16;cx=px;cy=py;cz=pz;const inv=1/Math.sqrt(den);wx=dx*inv;wy=dy*inv;wz=dz*inv;}}
 if(best===Infinity)return -100;
 const dx=x-cx,dy=y-cy,dz=z-cz,dot=dx*wx+dy*wy+dz*wz;
 // Project reference into the local normal plane; no per-span rotation reset.
 const uw=m.u.x*wx+m.u.y*wy+m.u.z*wz,ux=m.u.x-uw*wx,uy=m.u.y-uw*wy,uz=m.u.z-uw*wz,inv=1/Math.hypot(ux,uy,uz);
 const ax=(dx*ux+dy*uy+dz*uz)*inv,ay=(dx*(wy*uz-wz*uy)+dy*(wz*ux-wx*uz)+dz*(wx*uy-wy*ux))*inv;
 const angle=Math.atan2(ay,ax)-o.twist*along-m.n*.15,rad=Math.hypot(ax,ay);let cross=0;
 for(let k=0;k<7;k++){
 // A secondary cut can recede along the length: a facet may become inactive.
 const width=1+o.facets*.22*Math.sin(k*2.7+m.n*2+along*2.4);
 cross=Math.max(cross,Math.cos(angle-k*Math.PI*2/7)*rad/width);
 }
 const r=m.r+(m.tip-m.r)*along;
 return r-Math.hypot(cross,dot);
}
export function fill(field:Float32Array,size:number,edges:Edge[],o:Options){
 field.fill(-100);const members=edges.filter(e=>e.r>1e-6&&e.a.distanceTo(e.b)>1e-6).map(e=>prepare(e,o));
 const bound=(x:number)=>Math.max(1,Math.min(size-2,Math.floor((x/6+1)*size/2))),world=(i:number)=>(i/size*2-1)*6;
 for(const m of members){const pad=m.r*1.6+o.blend+.15,box=new T.Box3().setFromPoints(m.points).expandByScalar(pad);
 for(let z=bound(box.min.z);z<=bound(box.max.z)+1&&z<size-1;z++)for(let y=bound(box.min.y-5);y<=bound(box.max.y-5)+1&&y<size-1;y++)for(let x=bound(box.min.x);x<=bound(box.max.x)+1&&x<size-1;x++){
 const q=valueAt(world(x),world(y)+5,world(z),m,o),index=z*size*size+y*size+x,d=field[index],h=o.blend>0?Math.max(o.blend-Math.abs(d-q),0)/o.blend:0;
 field[index]=Math.max(d,q)+h*h*o.blend*.25;
 }}
 return members;
}
