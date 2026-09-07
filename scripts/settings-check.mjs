import assert from 'node:assert/strict';
import {mkdtemp,rm,readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createServer} from 'node:http';
import {defaultsAPI,defaultsPath} from './defaults-api.mjs';
const root=await mkdtemp(join(tmpdir(),'supernool-settings-')),api=defaultsAPI(root);
const server=createServer((req,res)=>api(req,res,()=>{res.writeHead(404);res.end();}));
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`,url=origin+'/__supernool/defaults';
const save=(body,source=origin)=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',Origin:source},body:JSON.stringify(body)});
try{
 assert.deepEqual(await (await fetch(url)).json(),{version:1,scopes:{}});
 const a=await save({scope:'clearing-019',revision:0,values:{spiritOpacity:'0.42',spiritPalette:'blue'}});assert.equal(a.status,200);assert.equal((await a.json()).revision,1);
 const conflict=await save({scope:'clearing-019',revision:0,values:{spiritOpacity:'0.99'}});assert.equal(conflict.status,409);
 assert.equal((await save({scope:'clearing-019',revision:1,values:{spiritOpacity:'0.5'}},'https://example.com')).status,403);
 assert.equal((await save({scope:'../escape',revision:0,values:{a:'1'}})).status,400);
 assert.equal((await save({scope:'clearing-019',revision:1,values:{a:{bad:true}}})).status,400);
 assert.equal((await save({scope:'clearing-019',revision:1,values:{spiritOpacity:'0.55'}})).status,200);
 const data=JSON.parse(await readFile(defaultsPath(root),'utf8'));
 assert.deepEqual(data.scopes['clearing-019'].values,{spiritOpacity:'0.55',spiritPalette:'blue'});
 assert.equal(data.scopes['clearing-019'].revision,2);
 assert.equal((await save({scope:'shadow-019',revision:0,values:{opacity:'0.3'}})).status,200);
 console.log('Settings: project writes, partial merge, revision conflicts, scope isolation, origin checks and malformed payload rejection passed.');
}finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));await rm(root,{recursive:true});}
