import assert from 'node:assert/strict';
import * as T from 'three';
import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';
import {sample} from './cases';import {prepare,valueAt,fill,Options} from './surface';
const o:Options={thickness:1.2,taper:.75,bow:.5,random:.4,twist:.8,facets:.45,seed:1,blend:.15};
let states=0,meshes=0,minFraction=1;
for(const rule of ['identity','swap','regroup'])for(const complexity of ['simple','nested','uneven'])for(const mapping of ['keep','exchange'])for(const height of ['level','depth']){
 let carried:any;
 for(let step=0;step<=100;step++){
 const c=sample(rule,complexity,mapping,step/100,1,height,.4);
 for(const e of c.edges){if(e.a.distanceTo(e.b)<1e-6||e.r<1e-6)continue;const m=prepare(e,o);assert.ok(m.tip>=m.r*.3);minFraction=Math.min(minFraction,m.tip/m.r);
 for(const p of m.points)assert.ok(valueAt(p.x,p.y,p.z,m,o)>0,'Member lost its centreline');
 }
 // Operand x remains at the same local offset while the operand moves.
 if(complexity!=='simple'){const a=c.joints.find(j=>j.id==='a')!,x=c.joints.find(j=>j.id==='ax')!;const offset=[x.x-a.x,x.y-a.y,x.z-a.z];if(carried)offset.forEach((v,i)=>assert.ok(Math.abs(v-carried[i])<1e-9));carried=offset;}
 states++;
 }
}
const skin=new MarchingCubes(96,new T.MeshBasicMaterial(),false,false,120000);skin.isolation=0;
for(const rule of ['identity','swap','regroup','generated'])for(const mapping of ['keep','exchange'])for(const t of [.01,.25,.5,.75,.99]){
 const c=sample(rule,'uneven',mapping,t,2,'depth',.4);skin.reset();fill(skin.field,96,c.edges,o);skin.update();const n=skin.geometry.drawRange.count;assert.ok(n>0&&n<360000);
 for(const name of ['position','normal']){const arr=skin.geometry.getAttribute(name).array;for(let i=0;i<n*3;i++)assert.ok(Number.isFinite(arr[i]));}meshes++;
}
console.log(JSON.stringify({states,meshes,minRetainedRadiusFraction:minFraction,checks:['centreline remains inside each member','length taper bounded','carried operand local positions preserved','extracted positions and normals finite','mesh capacity not exceeded'],limitations:['No collision-free guarantee','No proof of identical mesh topology between frames','Visual reviews recorded separately']},null,2));
