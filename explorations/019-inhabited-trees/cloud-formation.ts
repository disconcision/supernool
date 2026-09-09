import * as T from 'three';
export type CloudFormation={progress:number;swirl:number};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export function formationPhase(progress:number,seed:number){
 const u=clamp((progress-seed*.23)/(1-seed*.23));return 1-(1-u)*(1-u);
}
/** Local counter-rotating eddies; never rotates the assembled crown. */
export function formationPoint(point:T.Vector3,seed:number,o:CloudFormation){
 const u=formationPhase(o.progress,seed),rest=1-u,phase=seed*Math.PI*2;
 const angle=(seed<.5?-1:1)*o.swirl*Math.PI*2*rest*(.55+seed*.6);
 const c=Math.cos(angle),s=Math.sin(angle),spread=1+.55*rest;
 return new T.Vector3((point.x*c-point.z*s)*spread+Math.sin(phase+angle*1.4)*rest*.65,
 point.y-.65*rest+Math.sin(phase+angle)*rest*.6,
 (point.x*s+point.z*c)*spread+Math.cos(phase+angle*.8)*rest*.65);
}
// Same centre motion on GPU, so lightning samples can follow the moving patches.
export const formationGLSL=`
 float formationPhase(float p,float seed){float u=clamp((p-seed*.23)/(1.-seed*.23),0.,1.);return 1.-(1.-u)*(1.-u);}
 vec3 formationPoint(vec3 p,float seed,float u,float swirl){
 float rest=1.-u,phase=seed*6.28318530718;
 float angle=(seed<.5?-1.:1.)*swirl*6.28318530718*rest*(.55+seed*.6);
 float c=cos(angle),s=sin(angle),spread=1.+.55*rest;
 return vec3((p.x*c-p.z*s)*spread+sin(phase+angle*1.4)*rest*.65,
 p.y-.65*rest+sin(phase+angle)*rest*.6,
 (p.x*s+p.z*c)*spread+cos(phase+angle*.8)*rest*.65);
 }`;
