import * as T from 'three';import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';import {fill} from './surface';
const mc=new MarchingCubes(80,new T.MeshBasicMaterial(),false,false,90000);mc.isolation=0;
self.onmessage=(event)=>{const {id,edges,options,resolution}=event.data;
 try{if(mc.resolution!==resolution){mc.geometry.dispose();mc.init(resolution);mc.isolation=0;}
 const restored=edges.map((e:any)=>({...e,a:new T.Vector3(e.a.x,e.a.y,e.a.z),b:new T.Vector3(e.b.x,e.b.y,e.b.z)}));const start=performance.now();mc.reset();const members=fill(mc.field,resolution,restored,options);mc.update();const count=mc.geometry.drawRange.count;
 const position=(mc.geometry.getAttribute('position').array as Float32Array).slice(0,count*3),normal=(mc.geometry.getAttribute('normal').array as Float32Array).slice(0,count*3);
 self.postMessage({id,position,normal,edges:members.map(m=>m.e),ms:performance.now()-start},{transfer:[position.buffer,normal.buffer]});
 }catch(e){self.postMessage({id,error:String(e)});}
};
