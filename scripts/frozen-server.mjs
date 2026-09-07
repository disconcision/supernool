import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {defaultsAPI} from './defaults-api.mjs';
const root=process.cwd(),manifest=JSON.parse(await readFile(resolve(root,'.cache/frozen/latest.json'),'utf8'));
const directory=manifest.directory,api=defaultsAPI(root);
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.glb':'model/gltf-binary','.woff2':'font/woff2','.wav':'audio/wav','.m4a':'audio/mp4','.mp3':'audio/mpeg'};
createServer((req,res)=>api(req,res,async()=>{
 try{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
  let path=resolve(directory,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if(path!==directory&&!path.startsWith(directory+sep)){res.writeHead(403);return res.end();}
  if((await stat(path)).isDirectory())path=resolve(path,'index.html');
  const info=await stat(path);res.writeHead(200,{'Content-Type':mime[extname(path)]??'application/octet-stream','Content-Length':info.size,'Cache-Control':'no-cache'});
  if(req.method==='HEAD')return res.end();createReadStream(path).pipe(res);
 }catch{res.writeHead(404);res.end('Not in this frozen snapshot.');}
})).listen(3101,'127.0.0.1',()=>console.log(`Frozen preview ${manifest.id} · http://127.0.0.1:3101/explorations/018-painted-ground/?mode=body&inhabited=1`));
