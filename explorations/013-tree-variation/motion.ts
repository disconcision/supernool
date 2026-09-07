export type V={x:number;y:number;z:number};
export type Joint=V&{id:string;label:string};
export type Segment={a:V;b:V;r:number;key:number};
export type Settings={rule:string;mapping:string;complexity:string;anchor:string;path:string;t:number;height?:string;irregularity?:number};
const v=(x:number,y:number,z=0):V=>({x,y,z});
const lerp=(a:V,b:V,t:number):V=>v(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,a.z+(b.z-a.z)*t);
export function pose(s:Settings){
 const t=s.t,joints:Joint[]=[],segments:Segment[]=[];const joint=(id:string,label:string,p:V)=>{const n={id,label,...p};joints.push(n);return n;};
 const edge=(a:V,b:V,r=.23)=>{segments.push({a,b,r,key:segments.length});};
 let P=v(0,1.6),Q=v(-1.4,3.5),A=v(-2.8,5.8),B=v(0,5.8),C=v(2.8,5.8);
 const irregular=s.irregularity??0;
 if(s.rule==='swap'){A=v(-2.5*Math.cos(Math.PI*t),4.5,s.path==='orbit'?-2.5*Math.sin(Math.PI*t):0);B=v(-A.x,4.5,-A.z);if(s.path==='flat'){A.x=-2.5*(1-2*t);B.x=-A.x;}edge(P,A);edge(P,B);}
 if(s.rule==='regroup'){
  if(s.height==='depth'){A.y=5.8-1.9*t;B.y=5.8;C.y=3.9+1.9*t;}
  if(s.mapping==='exchange'){P=lerp(v(0,1.6),v(1.4,3.5),t);Q=lerp(v(-1.4,3.5),v(0,1.6),t);edge(Q,A);edge(P,C);edge(lerp(Q,P,t),B);}
  else{Q=lerp(v(-1.4,3.5),v(1.4,3.5),t);edge(lerp(Q,P,t),A);edge(Q,B);edge(lerp(P,Q,t),C);}
  edge(P,Q,.32);joint('q','+',Q);
 }
 if(s.rule==='identity'){
  if(s.anchor==='fixed'){P=v(0,3.2);A=lerp(P,v(2.5,5),t);B=lerp(P,v(-2.5,5),t);}
  else{A=v(2.5,5);P=lerp(A,v(0,3.2),t);B=lerp(P,v(-2.5,5),t);}
  edge(P,A);edge(P,B,.23*Math.min(1,t*5));if(t>0)joint('zero','0',B);
 }
 // Apply after operation layout; the former placement was overwritten by each rule.
 A.y+=irregular*.75*(s.rule==='identity'?t:1);B.y-=irregular*.55*(s.rule==='identity'?t:1);C.y+=irregular*.9;
 if(s.rule==='identity'&&t>0)Object.assign(joints.find(j=>j.id==='zero')!,B);
 const outer=s.rule==='regroup'&&s.mapping==='exchange'?lerp(P,Q,t):P;
 edge(v(0,0),outer,.36);if(s.rule!=='identity'||t>0)joint('p','+',P);
 function operand(id:string,pos:V,nested:boolean){joint(id,nested?'+':id.toUpperCase(),pos);if(nested){const X=v(pos.x-.7,pos.y+1.3*(1+irregular*.2),pos.z),Y=v(pos.x+.7,pos.y+1.3*(1-irregular*.18),pos.z);edge(pos,X,.17);edge(pos,Y,.17);joint(id+'x','x',X);joint(id+'y','y',Y);if(s.complexity==='uneven'){const Z=v(Y.x+.4,Y.y+1.1,Y.z),W=v(Y.x-.4,Y.y+1.1,Y.z);edge(Y,Z,.13);edge(Y,W,.13);joint(id+'z','z',Z);joint(id+'w','w',W);}}}
 operand('a',A,s.complexity!=='simple');if(s.rule!=='identity')operand('b',B,s.complexity==='uneven');if(s.rule==='regroup')operand('c',C,false);
 return {joints,segments,P,Q,A,B,C};
}
/** Smooth union of capsule distances: rendering policy only, independent of algebra. */
export function fieldAt(p:V,segments:Segment[],blend:number){let d=-100;
 for(const s of segments){const x=s.b.x-s.a.x,y=s.b.y-s.a.y,z=s.b.z-s.a.z,den=x*x+y*y+z*z;const t=den?Math.max(0,Math.min(1,((p.x-s.a.x)*x+(p.y-s.a.y)*y+(p.z-s.a.z)*z)/den)):0;const q=s.r-Math.hypot(p.x-s.a.x-t*x,p.y-s.a.y-t*y,p.z-s.a.z-t*z);const h=Math.max(blend-Math.abs(d-q),0)/blend;d=Math.max(d,q)+h*h*blend*.25;}return d;}
