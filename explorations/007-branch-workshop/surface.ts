import {Segment,V} from './motion';
export type Shape={thickness:number;taper:number;curve:number;irregularity:number;twist:number;hewn:boolean};
export type Prepared={a:V;b:V;r0:number;r1:number;u:V;v:V;w:V;len:number;planes:number[][]};
const add=(a:V,b:V):V=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z});
const mul=(a:V,s:number):V=>({x:a.x*s,y:a.y*s,z:a.z*s});
const sub=(a:V,b:V):V=>add(a,mul(b,-1));
const dot=(a:V,b:V)=>a.x*b.x+a.y*b.y+a.z*b.z;
const norm=(a:V):V=>mul(a,1/(Math.hypot(a.x,a.y,a.z)||1));
const cross=(a:V,b:V):V=>({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
const noise=(k:number)=>Math.sin(k*12.9898+4.14);
export function prepare(segments:Segment[],s:Shape):Prepared[]{const result:Prepared[]=[];
 for(const seg of segments){const d=sub(seg.b,seg.a),length=Math.hypot(d.x,d.y,d.z);if(length<.0001)continue;
 const w=norm(d),ref=Math.abs(w.z)<.99?{x:0,y:0,z:1}:{x:1,y:0,z:0},u=norm(cross(w,ref)),v=cross(w,u);
 const count=s.curve>0||s.hewn?5:1;
 const base=seg.r*s.thickness*Math.pow(seg.r/.36,s.taper-1);
 const point=(t:number)=>add(add(seg.a,mul(d,t)),add(mul(u,Math.sin(Math.PI*t)*s.curve*length*.13*(1+s.irregularity*noise(seg.key))),mul(v,Math.sin(Math.PI*t)*s.curve*length*.1*noise(seg.key+5))));
 for(let i=0;i<count;i++){const t=i/count,a=point(t),b=point((i+1)/count),dir=sub(b,a),len=Math.hypot(dir.x,dir.y,dir.z),ww=norm(dir);const uu=norm(sub(u,mul(ww,dot(u,ww)))),vv=cross(ww,uu);const planes:number[][]=[];
 if(s.hewn){for(let k=0;k<8;k++){const angle=k*Math.PI/4+s.twist*((i+.5)/count-.5)+noise(seg.key)*.3;const offset=1+s.irregularity*.07*noise(k+seg.key*9);planes.push([Math.cos(angle)/offset,Math.sin(angle)/offset]);const bevel=angle+Math.PI/8;planes.push([Math.cos(bevel)/1.045,Math.sin(bevel)/1.045]);}}
 result.push({a,b,u:uu,v:vv,w:ww,len,r0:base*(1-.18*s.taper*t),r1:base*(1-.18*s.taper*(i+1)/count),planes});
 }}return result;}
/** Fill only the bounded neighbourhood of each member, so live controls stay responsive. */
export function fill(field:Float32Array,size:number,segments:Prepared[],blend:number){field.fill(-100);
 const world=(i:number)=>(i/size*2-1)*6;
 const bound=(x:number)=>Math.max(1,Math.min(size-2,Math.floor((x/6+1)*size/2)));
 for(const s of segments){const pad=Math.max(s.r0,s.r1)*1.3+blend+.25;
 const xmin=bound(Math.min(s.a.x,s.b.x)-pad),xmax=bound(Math.max(s.a.x,s.b.x)+pad)+1;
 const ymin=bound(Math.min(s.a.y,s.b.y)-5-pad),ymax=bound(Math.max(s.a.y,s.b.y)-5+pad)+1;
 const zmin=bound(Math.min(s.a.z,s.b.z)-pad),zmax=bound(Math.max(s.a.z,s.b.z)+pad)+1;
 for(let z=zmin;z<=zmax;z++)for(let y=ymin;y<=ymax;y++)for(let x=xmin;x<=xmax;x++){
 const dx=world(x)-s.a.x,dy=world(y)+5-s.a.y,dz=world(z)-s.a.z;
 const along=dx*s.w.x+dy*s.w.y+dz*s.w.z,t=Math.max(0,Math.min(1,along/s.len));
 const ax=dx*s.u.x+dy*s.u.y+dz*s.u.z,ay=dx*s.v.x+dy*s.v.y+dz*s.v.z;
 let radial=s.planes.length?0:Math.hypot(ax,ay);for(const plane of s.planes)radial=Math.max(radial,ax*plane[0]+ay*plane[1]);
 const end=along<0?-along:along>s.len?along-s.len:0;
 const q=s.r0+(s.r1-s.r0)*t-Math.hypot(radial,end),index=z*size*size+y*size+x,d=field[index],h=Math.max(blend-Math.abs(d-q),0)/blend;
 field[index]=Math.max(d,q)+h*h*blend*.25;
 }
 }}
