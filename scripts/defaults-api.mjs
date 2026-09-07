import {readFile, writeFile, rename, mkdir} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {randomUUID} from 'node:crypto';
export const defaultsPath = root => resolve(root, 'public/settings/app-defaults.json');
export function validateValues(values) {
 if(!values || typeof values !== 'object' || Array.isArray(values) || Object.keys(values).length>300) throw Error('Invalid controls');
 for(const [id,value] of Object.entries(values)) {
  if(!/^[A-Za-z][\w:-]{0,79}$/.test(id) || !['string','boolean'].includes(typeof value) || (typeof value==='string'&&value.length>200)) throw Error('Invalid control value');
 }
 return values;
}
export async function readDefaults(root) {
 try{return JSON.parse(await readFile(defaultsPath(root),'utf8'));}
 catch(e){if(e.code==='ENOENT')return {version:1,scopes:{}};throw e;}
}
// A single allowlisted local endpoint, shared by Vite and the frozen preview.
export function defaultsAPI(root) {
 return async (req,res,next) => {
  if(req.url?.split('?')[0]!=='/__supernool/defaults')return next();
  const reply=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  try {
   if(req.method==='GET')return reply(200,await readDefaults(root));
   if(req.method!=='POST')return reply(405,{error:'Method not allowed'});
   const origin=req.headers.origin;
   if(!origin || new URL(origin).host!==req.headers.host || !['127.0.0.1','localhost','[::1]'].includes(new URL(origin).hostname))return reply(403,{error:'Local same-origin requests only'});
   if(!req.headers['content-type']?.startsWith('application/json'))return reply(415,{error:'JSON required'});
   let body='';for await(const part of req){body+=part;if(body.length>65536)return reply(413,{error:'Preset too large'});}
   const input=JSON.parse(body);
   if(!['clearing-018','clearing-019','shadow-019','canopy-019','growth-019'].includes(input.scope))throw Error('Unknown study');
   validateValues(input.values);
   // Exclusive lock across the live and preview servers; revisions reject stale writes.
   const file=defaultsPath(root),lock=file+'.lock';await mkdir(dirname(file),{recursive:true});
   let handle;
   try{handle=await import('node:fs/promises').then(fs=>fs.open(lock,'wx'));}
   catch(e){if(e.code==='EEXIST')return reply(409,{error:'Defaults are being saved by another tab. Try again.'});throw e;}
   try{
    const all=await readDefaults(root),current=all.scopes[input.scope]??{revision:0,values:{}};
    if(input.revision!==current.revision)return reply(409,{error:'App defaults changed in another tab. Reset to app defaults or review and save again.',current});
    const entry={revision:current.revision+1,updatedAt:new Date().toISOString(),values:{...current.values,...input.values}};
    all.scopes[input.scope]=entry;
    const tmp=file+'.'+randomUUID()+'.tmp';await writeFile(tmp,JSON.stringify(all,null,2)+'\n');await rename(tmp,file);
    return reply(200,entry);
   }finally{await handle.close();await import('node:fs/promises').then(fs=>fs.unlink(lock));}
  }catch(e){reply(400,{error:e.message});}
 };
}
