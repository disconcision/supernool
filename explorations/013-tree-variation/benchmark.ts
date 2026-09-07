import * as T from 'three';import assert from 'node:assert/strict';import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';
import {fill as oldFill} from '../012-hewn-correspondence/surface';import {specimen as oldSpecimen} from '../012-hewn-correspondence/spatial';import {fill,Options} from './surface';
const o:Options={thickness:1.2,taper:.75,bow:0,random:.4,twist:.65,facets:.45,seed:1,blend:.075,hewn:true,spread:0};
const rows:any[]=[];
for(const rule of ['regroup','generated'])for(const resolution of [96,144]){
 const c=oldSpecimen(rule,rule==='regroup'?'nested':'uneven','exchange',.5,1,'depth',0,0);
 const a=new Float32Array(resolution**3),b=new Float32Array(resolution**3);oldFill(a,resolution,c.edges,o);fill(b,resolution,c.edges,o);let max=0;for(let i=0;i<a.length;i++)max=Math.max(max,Math.abs(a[i]-b[i]));assert.ok(max<1e-5,'Optimized field must agree with original on identical straight axes');
 for(const [name,fn] of [['012',oldFill],['013',fill]] as const){
  const skin=new MarchingCubes(resolution,new T.MeshBasicMaterial(),false,false,120000);skin.isolation=0;const times:number[]=[];
  for(let run=0;run<5;run++){const start=performance.now();skin.reset();fn(skin.field,resolution,c.edges,o);skin.update();if(run>0)times.push(performance.now()-start);}
  times.sort((a,b)=>a-b);rows.push({rule,resolution,implementation:name,medianMs:+((times[1]+times[2])/2).toFixed(1),triangles:skin.geometry.drawRange.count/3,maxFieldDifference:max});skin.geometry.dispose();
 }
}
console.log(JSON.stringify({environment:'Node CPU benchmark; same straight-axis inputs; excludes GPU shading and browser/UI work',rows},null,2));
