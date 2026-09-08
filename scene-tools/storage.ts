import type {Plugin} from 'vite';
import type {IncomingMessage,ServerResponse} from 'node:http';
import {mkdir,readFile,writeFile,rename,readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {validateScene,sceneIdPattern} from './schema';
/** Local development authoring API. Immutable versions; atomic default-pointer updates. */
export function sceneAPI(projectRoot:string){
 const root=join(projectRoot,'scenes');
 return async(req:IncomingMessage,res:ServerResponse,next:()=>void)=>{
 if(!(req.url??'').startsWith('/__scene-editor/'))return next();
  res.setHeader('Content-Type','application/json');res.setHeader('Cache-Control','no-store');
  const reply=(status:number,body:any)=>{res.statusCode=status;res.end(JSON.stringify(body));};
  try{
   const parts=(req.url??'').slice('/__scene-editor'.length).split('?')[0].split('/').filter(Boolean),sceneId=parts[0];
   if(!sceneIdPattern.test(sceneId??''))return reply(400,{error:'Invalid scene ID'});
   const dir=join(root,sceneId),versions=join(dir,'versions');
   if(req.method==='GET'&&parts.length===1){
    const files=await readdir(versions).catch(()=>[]);const items=[];
    for(const file of files.filter(f=>/^[\w-]+\.json$/.test(f))){const v=JSON.parse(await readFile(join(versions,file),'utf8'));items.push({versionId:v.versionId,title:v.title,createdAt:v.createdAt});}
    const pointer=JSON.parse(await readFile(join(dir,'default.json'),'utf8').catch(()=>'null'));
    return reply(200,{versions:items.sort((a,b)=>b.createdAt.localeCompare(a.createdAt)),defaultVersion:pointer?.versionId??null});
   }
   if(req.method==='GET'&&parts.length===2&&/^[\w-]+$/.test(parts[1])){
    let id=parts[1];if(id==='default'){const p=JSON.parse(await readFile(join(dir,'default.json'),'utf8'));id=p.versionId;}
    return reply(200,JSON.parse(await readFile(join(versions,id+'.json'),'utf8')));
   }
   // Reject cross-origin writes; filenames come only from validated IDs / server UUIDs.
   if(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`)return reply(403,{error:'Cross-origin save rejected'});
   if(!req.headers['content-type']?.startsWith('application/json'))return reply(415,{error:'JSON required'});
   let body='';for await(const chunk of req){body+=chunk;if(Buffer.byteLength(body)>262144)return reply(413,{error:'Scene too large'});}
   const data=JSON.parse(body);
   if(req.method==='POST'&&parts.length===1){
    validateScene(data);if(data.sceneId!==sceneId)throw new Error('Scene ID mismatch');
    const versionId=randomUUID(),saved={...data,versionId,createdAt:new Date().toISOString()};
    await mkdir(versions,{recursive:true});await writeFile(join(versions,versionId+'.json'),JSON.stringify(saved,null,2)+'\n',{flag:'wx'});
    return reply(201,saved);
   }
   if(req.method==='PUT'&&parts[1]==='default'&&parts.length===2){
    if(!/^[\w-]{1,80}$/.test(data.versionId))throw new Error('Invalid version ID');
    const saved=JSON.parse(await readFile(join(versions,data.versionId+'.json'),'utf8'));validateScene(saved);
    const temp=join(dir,'.default-'+randomUUID()+'.json');await writeFile(temp,JSON.stringify({versionId:data.versionId},null,2)+'\n');await rename(temp,join(dir,'default.json'));
    return reply(200,{versionId:data.versionId});
   }
   reply(404,{error:'Unknown scene operation'});
  }catch(error:any){reply(error.code==='ENOENT'?404:400,{error:error.code==='ENOENT'?'Scene version not found':error.message});}
 };
}
export function sceneStorage():Plugin{return {name:'scene-storage',configureServer(server){server.middlewares.use(sceneAPI(server.config.root));}};}
