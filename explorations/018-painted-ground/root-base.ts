import * as T from 'three';
import {Edge,Options,prepare} from './surface';

/** Grounded adornment, deliberately outside the expression and its rewrite IDs. */
export function rootedEdges(edges:Edge[],o:Options):Edge[]{
 const stem=edges.find(e=>e.id==='stem');
 if(!stem||!(o.rootAmount!>0))return edges;
 const member=prepare(stem,o),t=Math.min(.22,.4/member.len);
 const anchor=stem.a.clone().lerp(stem.b,t).addScaledVector(member.curve,Math.sin(Math.PI*t));
 const roots:Edge[]=[];
 for(let i=0;i<5;i++){
  const angle=i*2.399+.37,reach=(o.rootReach??1.5)*( .78+.22*Math.sin(i*7+2));
  const a=anchor.clone();
  const b=stem.a.clone().add(new T.Vector3(Math.cos(angle)*reach,-.38,Math.sin(angle)*reach));
  roots.push({id:'root-adornment-'+i,a,b,r:.23*o.rootAmount!,tipRatio:.1,curve:new T.Vector3(0,.12,0)});
 }
 return [...edges,...roots];
}

export function rootOptions(){
 const read=(id:string,fallback:number)=>{const el=document.getElementById(id) as HTMLInputElement|null;return el?+el.value:fallback;};
 return {rootFlare:read('rootFlare',.55),rootAmount:read('rootAmount',.65),rootReach:read('rootReach',1.6)};
}
export function mountRootControls(host:HTMLElement){
 const root=document.createElement('details');root.id='rootBaseStudy';
 const slider=(id:string,label:string,min:number,max:number,step:number,value:number)=>`<label>${label}<input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
 root.innerHTML=`<summary>Roots & ground contact</summary><p>A flared foot and five short roots share the trunk surface. These are scenery, not expression nodes. Set roots to zero for a plain foot.</p>
 ${slider('rootFlare','Base flare',0,2,.05,.55)}
 ${slider('rootAmount','Exposed roots',0,1.5,.05,.65)}
 ${slider('rootReach','Root reach',.5,3,.1,1.6)}
 <label>Contact patch<select id="rootContact"><option value="on">On</option><option value="off">Off</option></select></label>
 ${slider('rootContactSize','Contact spread',.6,3,.05,1.5)}
 ${slider('rootContactStrength','Contact strength',0,1,.01,1)}
 <p>The small center is opaque at full strength, independently of scorch opacity. Its color follows burnt bark; original wood uses dark earth.</p>`;
 host.append(root);
}
