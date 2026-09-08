import * as T from 'three';import {Member,Options} from './surface';
export function makeShading(){
const MAX=40;
const uniforms={flares:{value:Array(MAX).fill(0)},cuts:{value:Array.from({length:MAX},()=>new T.Vector2())},memberCount:{value:0},starts:{value:Array.from({length:MAX},()=>new T.Vector4())},ends:{value:Array.from({length:MAX},()=>new T.Vector4())},bends:{value:Array.from({length:MAX},()=>new T.Vector4())},shape:{value:new T.Vector4()},hewn:{value:1}};
function feed(members:Member[],o:Options){
 uniforms.memberCount.value=Math.min(MAX,members.length);uniforms.shape.value.set(o.twist,o.facets,o.blend,0);uniforms.hewn.value=o.hewn?1:0;
 members.slice(0,MAX).forEach((m,i)=>{uniforms.flares.value[i]=m.flare;uniforms.cuts.value[i].set(m.e.cutA?1:0,m.e.cutB?1:0);uniforms.starts.value[i].set(m.e.a.x,m.e.a.y,m.e.a.z,m.r);uniforms.ends.value[i].set(m.e.b.x,m.e.b.y,m.e.b.z,m.tip);const mid=m.points[8].clone().sub(m.e.a.clone().lerp(m.e.b,.5));uniforms.bends.value[i].set(mid.x,mid.y,mid.z,m.n);});
}
const code=`
varying vec3 noolWorld;
uniform float flares[40];uniform vec2 cuts[40];uniform int memberCount;uniform vec4 starts[40];uniform vec4 ends[40];uniform vec4 bends[40];uniform vec4 shape;uniform float hewn;
// Continuous per-fragment face normal: no averaging over a grid triangle's corners.
vec4 memberField(vec3 p,int i){
 vec3 a=starts[i].xyz,b=ends[i].xyz,d=b-a,bow=bends[i].xyz;float len=length(d);vec3 axis=d/len;
 float t=clamp(dot(p-a,d)/dot(d,d),0.,1.);
 for(int n=0;n<4;n++){
  vec3 c=a+d*t+bow*sin(3.14159265*t),v=d+bow*(3.14159265*cos(3.14159265*t)),acc=-bow*(9.8696044*sin(3.14159265*t));
  t=clamp(t-dot(c-p,v)/max(.00000001,dot(v,v)+dot(c-p,acc)),0.,1.);
 }
 vec3 c=a+d*t+bow*sin(3.14159265*t),w=normalize(d+bow*(3.14159265*cos(3.14159265*t))),delta=p-c;
 vec3 ref=normalize(vec3(0,0,1)-axis*axis.z),u=normalize(ref-w*dot(ref,w)),v=cross(w,u);
 float theta=shape.x*t+bends[i].w*.15,crossD=-1e5,derivative=0.;vec3 face=u;
 for(int k=0;k<7;k++){
  float kf=float(k),phase=kf*2.7+bends[i].w*2.+t*2.4,width=1.+shape.y*.22*sin(phase);
  float angle=theta+kf*6.2831853/7.;vec3 n=u*cos(angle)+v*sin(angle);float value=dot(delta,n)/width;
  if(value>crossD){crossD=value;face=n/width;derivative=shape.x*dot(delta,-u*sin(angle)+v*cos(angle))/width-value*(shape.y*.22*2.4*cos(phase))/width;}
 }
 float foot=max(0.,1.-t/.65);
 float r=mix(starts[i].w,ends[i].w,t)+flares[i]*foot*foot,q=r-crossD;
 float radiusDerivative=ends[i].w-starts[i].w-2.*flares[i]*foot/.65;
 vec3 outward=normalize(face+w*(derivative-radiusDerivative)/max(.001,len));
 float cap=1e4;vec3 capNormal=w;
 if(t<.00001){cap=dot(delta,w);capNormal=-w;}
 if(t>.99999){cap=-dot(delta,w);capNormal=w;}
 bool cut=(t<.00001&&cuts[i].x>.5)||(t>.99999&&cuts[i].y>.5);
 if(hewn>.5&&cut&&cap<q){q=cap;outward=capNormal;}
 else if(cap<0.){float axial=dot(delta,w);q=r-length(vec2(crossD,axial));outward=normalize(outward*crossD+w*axial);}
 return vec4(outward,q);
}
vec3 carvedNormal(vec3 p){
 vec4 best=vec4(0,1,0,-1e5);
 for(int i=0;i<40;i++){if(i>=memberCount)break;
 // Conservative neighbourhood: a face pixel cannot be affected by distant members.
 vec3 chord=ends[i].xyz-starts[i].xyz;float along=clamp(dot(p-starts[i].xyz,chord)/dot(chord,chord),0.,1.);
 vec3 delta=p-(starts[i].xyz+along*chord);float reach=(max(starts[i].w,ends[i].w)+flares[i])*1.6+length(bends[i].xyz)+shape.z+.15;
 if(dot(delta,delta)>reach*reach)continue;
 vec4 q=memberField(p,i);float k=shape.z;
 float h=clamp(.5+.5*(best.w-q.w)/max(.001,k),0.,1.);
 best=vec4(mix(q.xyz,best.xyz,h),mix(q.w,best.w,h)+k*h*(1.-h));
 }
 return normalize(best.xyz);
}
`;
function carved<TM extends T.Material>(mat:TM):TM{
 mat.onBeforeCompile=shader=>{Object.assign(shader.uniforms,uniforms);shader.vertexShader='varying vec3 noolWorld;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nnoolWorld=(modelMatrix*vec4(transformed,1.)).xyz;');shader.fragmentShader=code+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_begin>','#include <normal_fragment_begin>\nnormal=normalize(mat3(viewMatrix)*carvedNormal(noolWorld));');};
 mat.customProgramCacheKey=()=> 'nool-carved-v3-root-flare';return mat;
}

return {feed,carved};
}
