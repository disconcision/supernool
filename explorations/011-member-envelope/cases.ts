import * as T from 'three';
import {pose} from '../007-branch-workshop/motion';
import type {Edge} from './surface';
export function sample(rule:string,complexity:string,mapping:string,t:number,seed=1,height='depth',irregularity=0){
 if(rule==='generated'){
  let randomState=seed;const random=()=>{randomState=(randomState*1664525+1013904223)>>>0;return randomState/4294967296;};const maxDepth=complexity==='simple'?2:complexity==='uneven'?4:3;
  const edges:Edge[]=[],joints:{id:string;label:string;x:number;y:number;z:number}[]=[];let next=0;
  function branch(p:T.Vector3,level:number,span:number,id:string){const leaf=level>=maxDepth||(level>0&&random()<.18);joints.push({id,label:leaf?id:'+',...p});if(leaf)return;for(let i=0;i<2;i++){const child=new T.Vector3(p.x+(i?1:-1)*span,p.y+1.65,p.z+.2*Math.sin(seed+next++));edges.push({a:p,b:child,r:.14*Math.sqrt(2**(2-level)),id:id+'.'+i});branch(child,level+1,span*.5,id+i);}}
  const root=new T.Vector3(0,1,0);edges.push({a:new T.Vector3(0,0,0),b:root,r:.4,id:'stem'});branch(root,0,2.5,'r');return {edges,joints};
 }
 if(rule==='fork'){const root=new T.Vector3(0,2.5,0);return {edges:[{a:new T.Vector3(0,0,0),b:root,r:.34,id:'stem'},{a:root,b:new T.Vector3(-2,5.7,0),r:.24,id:'left'},{a:root,b:new T.Vector3(2,5.2,0),r:.24,id:'right'}],joints:[]};}
 const p=pose({rule,complexity,mapping,t,anchor:'fixed',path:'orbit',height,irregularity});return {edges:p.segments.map(e=>({a:new T.Vector3(e.a.x,e.a.y,e.a.z),b:new T.Vector3(e.b.x,e.b.y,e.b.z),r:e.r,id:'member'+e.key})),joints:p.joints.map(j=>({...j,label:complexity==='uneven'&&j.id.endsWith('y')?'+':j.label}))};
}
