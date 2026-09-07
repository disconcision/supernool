// Check actual rock meshes against the two traced paths in the existing v6 painting.
import * as T from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
await build({stdin:{contents:"export {enclosedPlacements} from './explorations/018-painted-ground/rock-enclosure'; export {addBackdrop} from './explorations/018-painted-ground/backdrop';",resolveDir:process.cwd()},bundle:true,platform:'node',format:'esm',external:['three'],outfile:'.cache/rock-path-scene.mjs'});
const {enclosedPlacements,addBackdrop}=await import('../../.cache/rock-path-scene.mjs?'+Date.now());
globalThis.location={search:'?matteCapture'};globalThis.document={getElementById:()=>({textContent:''})};
const terrainScene=new T.Scene();addBackdrop(terrainScene,{style:{}},{setClearColor(){}});terrainScene.updateMatrixWorld(true);
const terrain=terrainScene.children[0].children[0];
const loader=new GLTFLoader(),models={};
for(const name of ['basalt-group','bedrock']){
 const b=fs.readFileSync(new URL('./assets/rock-study-08/'+name+'.glb',import.meta.url));
 models[name]=(await loader.parseAsync(b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength),'' )).scene;
}
const rocks=enclosedPlacements.map(([kind,x,z,y,sx,sy,sz,yaw])=>{
 const g=models[kind].clone(true);g.position.set(x,y,z);g.scale.set(sx,sy,sz);g.rotation.y=yaw;g.updateMatrixWorld(true);return g;
});
const ref=new T.OrthographicCamera(-11*16/9,11*16/9,11,-11,.1,250);ref.zoom=.78;ref.position.set(13,12,21);ref.lookAt(0,2,0);ref.updateProjectionMatrix();ref.updateMatrixWorld();
const live=ref.clone();live.position.set(39,32,63);live.lookAt(0,2,0);live.updateMatrixWorld();
// Pixel-space traces are tied to the 1671 × 941 v6 image. Start beyond the central tree.
const traces=[[[887,418],[865,385],[875,355],[890,335],[870,300],[900,260],[930,220],[955,190]],[[890,335],[1000,343],[1150,352],[1300,357],[1440,344]]];
let samples=0;const failures=[];
for(const [route,trace] of traces.entries()){
 const curve=new T.CatmullRomCurve3(trace.map(([x,y])=>new T.Vector3(x,y,0)));
 for(const pixel of curve.getPoints(80))for(const offset of [-8,0,8]){
  const ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((pixel.x+offset)/1671*2-1,1-pixel.y/941*2),ref);
  const ground=ray.intersectObject(terrain,false)[0];assert(ground,'Traced path must land on the terrain');
  for(const camera of [ref,live]){
   const q=ground.point.clone().project(camera);ray.setFromCamera(new T.Vector2(q.x,q.y),camera);
   const hit=ray.intersectObjects(rocks,true)[0];
   if(hit&&hit.distance<ray.ray.origin.distanceTo(ground.point)-.08)failures.push({route,pixel:[pixel.x,pixel.y],view:camera===ref?'paint':'live'});
  }
  ray.set(ground.point.clone().add(new T.Vector3(0,15,0)),new T.Vector3(0,-1,0));
  const above=ray.intersectObjects(rocks,true)[0];
  if(above&&above.point.y>ground.point.y+.3)failures.push({route,pixel:[pixel.x,pixel.y],view:'walk'});
  samples++;
 }
}
assert.deepEqual(failures,[],`${failures.length} path samples covered by rock`);
console.log(`${samples} samples along both painted exits: clear sightlines in paint/live cameras and no rock across their walking corridor.`);
