/// <reference types="vite/client" />
import type {SceneVersion} from '../../scene-tools/schema';
// Saved scenes become portable data in a static build. Writing stays a local-server feature.
const versions=import.meta.glob('../../scenes/*/versions/*.json',{eager:true,import:'default'}) as Record<string,SceneVersion>;
const defaults=import.meta.glob('../../scenes/*/default.json',{eager:true,import:'default'}) as Record<string,{versionId:string}>;
export function bakedScene(sceneId:string,path:string){
 const items=Object.values(versions).filter(v=>v.sceneId===sceneId);
 const pointer=defaults[`../../scenes/${sceneId}/default.json`]?.versionId??null;
 if(!path)return {versions:items.map(v=>({versionId:v.versionId,title:v.title,createdAt:v.createdAt})),defaultVersion:pointer};
 const id=path==='/default'?pointer:path.slice(1),version=items.find(v=>v.versionId===id);
 if(!version)throw new Error('Scene version not found in this build');return version;
}
