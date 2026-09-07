import {shelves,flattenShelves} from '../grow-structural-study/geometry';
import {Tree,Rule,Complexity,Path,V,example,swapPosition,Mapping} from './model';
export type View='skeleton'|'members'|'plateaus';
export type Options={rule:Rule;complexity:Complexity;path:Path;view:View;t:number;mapping?:Mapping};
const color:Record<string,string>={a:'#b76d38',b:'#427e96',c:'#886798'};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const pt=(v:V)=>({x:450+v.x+v.z*.38,y:425-v.y+v.z*.38});
const add=(a:V,b:V):V=>({x:a.x+b.x,y:a.y+b.y,z:a.z+b.z});
const p=(x:number,y:number,z=0):V=>({x,y,z});
const label=(v:V,text:string,size=16,fill='#2f443d')=>{const q=pt(v);return `<text x="${q.x}" y="${q.y+5}" text-anchor="middle" font-size="${size}" fill="${fill}">${text}</text>`;};
function line(a:V,b:V,c:string,width=3,dash=false){const x=pt(a),y=pt(b);return `<path d="M${x.x},${x.y} L${y.x},${y.y}" fill="none" stroke="${c}" stroke-width="${width}" stroke-linecap="round" ${dash?'stroke-dasharray="5 5"':''}/>`;}
function disc(v:V,r:number,c:string){const q=pt(v);return `<circle cx="${q.x}" cy="${q.y}" r="${r}" fill="#fcfaf2" stroke="${c}" stroke-width="2.5"/>`;}
function shelf(v:V,r:number,c:string,opacity=1,height=9){const q=pt(v);const shape=(dy:number)=>{let d='';for(let i=0;i<=72;i++){const a=i*Math.PI/36,k=1+.025*Math.sin(3*a+.5);d+=`${i?'L':'M'}${q.x+r*k*Math.cos(a)},${q.y+dy+r*.38*k*Math.sin(a)}`;}return d+'Z';};return `<g opacity="${opacity}"><path d="${shape(height)}" fill="#788b75" stroke="${c}"/><path d="M${q.x-r},${q.y} L${q.x-r},${q.y+height} L${q.x+r},${q.y+height} L${q.x+r},${q.y} Z" fill="#788b75"/><path d="${shape(0)}" fill="#d3dcc1" stroke="${c}" stroke-width="2.5"/></g>`;}
export function drawing(o:Options):string {
 const e=example(o.rule,o.complexity,o.mapping),t=o.t;let out='';const thick=o.view==='members',plates=o.view==='plateaus';
 const exchange=o.mapping==='exchange-roles';let root=p(0,0);let A:V,B:V,C=p(150,160),Q=p(mix(-75,75,t),75);
 if(o.rule==='swap'){A=swapPosition(-1,t,o.path);B=swapPosition(1,t,o.path);}
 else if(o.rule==='regroup'){A=p(-150,160);B=p(0,160);}
 else{A=p(100,130);const intro=Math.min(1,t/.3),emerge=Math.max(0,(t-.3)/.7);root=p(mix(A.x,0,intro),mix(A.y,0,intro));B=p(mix(root.x,-100,emerge),mix(root.y,130,emerge));}
 if(o.rule==='regroup'&&exchange){root=p(75*t,75*t);Q=p(-75*(1-t),75*(1-t));}
 const edge=(a:V,b:V,c='#7c9182')=>line(a,b,c,thick?12:2.5);
 function subtree(node:Tree,base:V,c:string,span=90):string {
  let s='';
  if(plates){
   const layout=shelves(node),scale=Math.min(1,80/layout.r);
   for(const part of flattenShelves(layout)){
    const pos=add(base,p(part.x*scale,-part.y*scale*.38+part.depth*9));
    s+=shelf(pos,part.r*scale,c);
    s+=label(add(pos,p(0,-part.r*scale*.22)),part.node.label,Math.max(9,Math.min(14,part.r*scale*.65)));
   }
  }else{
   node.children.forEach((child,i)=>{const pos=add(base,p((i-(node.children.length-1)/2)*span,66));s+=edge(base,pos,c)+subtree(child,pos,c,span*.53);});
   s+=disc(base,thick?16:12,c)+label(base,node.label,14);
  }
  return s;
 }
 // Ground grid gives the depth orbit a visible reference; identical camera for every frame.
 if(o.path==='orbit')for(let i=-2;i<=2;i++){out+=line(p(-280,0,i*70),p(280,0,i*70),'#e3e5da',1)+line(p(i*110,0,-190),p(i*110,0,190),'#e3e5da',1);}
 if(plates&&!(o.rule==='regroup'&&exchange))out+=shelf(p(0,100),350,'#9aab90');
 if(o.rule==='swap'){
  // Ghost tracks contain position information only, not extra semantic nodes.
  for(const side of [-1,1] as const){let d='';for(let i=0;i<=40;i++){const v=pt(swapPosition(side,i/40,o.path));d+=`${i?'L':'M'}${v.x},${v.y}`;}out+=`<path d="${d}" fill="none" stroke="${color[side===-1?'a':'b']}" opacity=".35" stroke-dasharray="5 5"/>`;}
  if(!plates)out+=edge(root,A,color.a)+edge(root,B,color.b);
 }else if(o.rule==='regroup'){
  if(plates){
   // Persistent support sheets: slide the inner one, or exchange outer/inner roles.
   if(exchange){
    const layers=[{id:'p',v:p(75*t,mix(100,148,t)),r:mix(350,170,t),c:'#506b9a'},
     {id:'q',v:p(-75*(1-t),mix(148,100,t)),r:mix(170,350,t),c:'#a36796'}];
    // Base is drawn separately only for the keep-root mapping.
    layers.sort((a,b)=>b.r-a.r).forEach(l=>{out+=shelf(l.v,l.r,l.c)+label(add(l.v,p(0,-l.r*.27)),l.id+' : +',14,l.c);});
   }else{const center=p(mix(-75,75,t),148);out+=shelf(center,170,'#a36796')+label(p(0,42),'p : +',14,'#506b9a')+label(add(center,p(0,-38)),'q : +',14,'#a36796');}
  }else{
   out+=edge(root,Q);
   if(exchange){out+=edge(Q,A,color.a)+edge(root,C,color.c)+edge(p(mix(Q.x,root.x,t),mix(Q.y,root.y,t)),B,color.b);}
   else{out+=edge(p(Q.x*(1-t),Q.y*(1-t)),A,color.a)+edge(Q,B,color.b)+edge(p(Q.x*t,Q.y*t),C,color.c);}
   // Context attachment follows whichever plus occupies the outer role.
   const outer=exchange?p(mix(root.x,Q.x,t),mix(root.y,Q.y,t)):root;
   out+=line(p(0,-45),outer,'#859684',2,true);
   out+=disc(Q,thick?16:12,'#a36796')+label(Q,'+',14)+label(add(Q,p(-30,0)),'q',14,'#a36796');
  }
 }else{
  if(!plates)out+=edge(root,A,color.a);
  const emerge=Math.max(0,(t-.3)/.7);
  if(emerge>0){
   if(plates){const h=28*emerge;out+=shelf(p(-100,100+h),32*Math.min(1,emerge*4),'#889680',1,h);if(emerge>.15)out+=label(p(-100,100+h),'0',14);}
   else{out+=edge(root,B,'#889680')+disc(B,(thick?16:12)*Math.min(1,emerge*5),'#889680');if(emerge>.08)out+=label(B,'0',14);}
  }
 }
 if(plates&&o.rule!=='regroup'&&(o.rule!=='identity'||t>0)){
  const g=o.rule==='identity'?Math.min(1,t/.3):1;out+=label(p(0,10),'p : +',16*g);
 }
 if(!plates&&(o.rule!=='identity'||t>0)){
  const g=o.rule==='identity'?Math.min(1,t/.3):1;
  out+=disc(root,(thick?18:14)*g,o.rule==='regroup'?'#506b9a':'#526e59')+label(root,'+',16*g);
  if(o.rule==='regroup')out+=label(add(root,p(30,0)),'p',14,'#506b9a');
 }

 const operands:[Tree,V,string][]=[[e.a,A,color.a]];if(o.rule!=='identity')operands.push([e.b,B,color.b]);if(o.rule==='regroup')operands.push([e.c,C,color.c]);
 // Far objects first. Internal subtree geometry is constant throughout a swap.
 operands.sort((a,b)=>a[1].z-b[1].z).forEach(([n,v,c])=>{out+=subtree(n,v,c);out+=label(add(v,p(0,-(plates?50:30))),n.id.toUpperCase(),13,c);});
 if(o.rule==='swap'&&o.path==='flat'&&Math.abs(t-.5)<.02)out+=`<text x="450" y="475" text-anchor="middle" fill="#a34f38" font-size="14">Coincident roots: the flat path intersects here</text>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" role="img" aria-label="${o.rule}, ${o.view}, progress ${Math.round(t*100)} percent" style="font-family:system-ui,sans-serif"><rect width="900" height="520" fill="#f8f7ef"/>${out}</svg>`;
}
