export type RockPlacement={id:string;kind:'basalt-group'|'bedrock'|'fragment'|'mushroom';position:[number,number,number];scale:[number,number,number];yaw:number};
export type SceneVersion={schema:1;sceneId:string;title:string;controls:Record<string,string|boolean>;rocks:RockPlacement[];createdAt?:string;versionId?:string};
export const sceneIdPattern=/^[a-z][a-z0-9-]{0,47}$/;
export function validateScene(value:any):asserts value is SceneVersion{
 if(!value||value.schema!==1||typeof value.sceneId!=='string'||!sceneIdPattern.test(value.sceneId)||typeof value.title!=='string'||!value.title.trim()||value.title.length>100)throw new Error('Invalid scene identity or title');
 if(!value.controls||typeof value.controls!=='object'||Array.isArray(value.controls)||Object.keys(value.controls).length>180)throw new Error('Invalid scene settings');
 for(const [key,v] of Object.entries(value.controls))if(!/^[a-zA-Z][\w-]{0,79}$/.test(key)||!(typeof v==='boolean'||typeof v==='string'&&v.length<=160))throw new Error('Invalid setting');
 if(!Array.isArray(value.rocks)||value.rocks.length>100)throw new Error('Invalid rock list');
 const ids=new Set<string>();
 for(const r of value.rocks){
  if(!r||typeof r.id!=='string'||!(/^(rock|stone|fungus)-\d+$/.test(r.id))||ids.has(r.id)||!['basalt-group','bedrock','fragment','mushroom'].includes(r.kind)||r.id.split('-')[0]!==({ 'basalt-group':'rock',bedrock:'rock',fragment:'stone',mushroom:'fungus'} as Record<string,string>)[r.kind])throw new Error('Invalid rock identity');ids.add(r.id);
  for(const [name,min,max] of [['position',-80,80],['scale',.1,8]] as const)if(!Array.isArray(r[name])||r[name].length!==3||r[name].some((n:any)=>!Number.isFinite(n)||n<min||n>max))throw new Error('Invalid rock transform');
  if(!Number.isFinite(r.yaw)||Math.abs(r.yaw)>Math.PI*100)throw new Error('Invalid rock rotation');
 }
 if(!['full','enclosed'].includes(value.controls.rockLayout as string))throw new Error('Choose the full or enclosing rock layout');
}
