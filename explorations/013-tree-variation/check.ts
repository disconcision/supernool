import assert from 'node:assert/strict';import * as T from 'three';import {specimen} from './spatial';import {prepare,fill,Options} from './surface';import {MarchingCubes} from 'three/addons/objects/MarchingCubes.js';
const o:Options={thickness:1.2,taper:.75,bow:.5,random:.4,twist:.65,facets:.45,seed:1,blend:.075,hewn:true,spread:0};let heightCases=0,states=0;
for(const rule of ['regroup','swap','identity','fork','generated'])for(const height of ['level','depth']){
 const a=specimen(rule,'nested','exchange',.5,1,height,0,0),b=specimen(rule,'nested','exchange',.5,1,height,1,0);assert.deepEqual(a.edges.map(e=>e.id),b.edges.map(e=>e.id));assert.ok(a.edges.some((e,i)=>Math.abs(e.b.y-b.edges[i].b.y)>.2),rule+' height slider ineffective');heightCases++;
}
for(const rule of ['regroup','swap','identity'])for(const mapping of ['keep','exchange'])for(const motion of ['slide','retract'])for(const spread of [0,.5,1])for(const t of [0,.1,.25,.5,.75,.9,1]){
 const c=specimen(rule,'uneven',mapping,t,2,'depth',.7,spread,motion);c.edges.forEach(e=>assert.ok([e.a.x,e.a.y,e.a.z,e.b.x,e.b.y,e.b.z,e.r].every(Number.isFinite)));
 for(const e of c.edges){if(e.a.distanceTo(e.b)<1e-5||e.r<1e-6)continue;const m=prepare(e,{...o,spread});assert.ok(m.points[0].distanceTo(e.a)<1e-9&&m.points[16].distanceTo(e.b)<1e-8);if(spread===0&&rule==='regroup')m.points.forEach(p=>assert.ok(Math.abs(p.z)<1e-8));}states++;
}
function covarianceDet(points:T.Vector3[]){const mean=points.reduce((s,p)=>s.add(p),new T.Vector3()).multiplyScalar(1/points.length),m=new Array(9).fill(0);points.forEach(p=>{const v=p.clone().sub(mean).toArray();for(let i=0;i<3;i++)for(let j=0;j<3;j++)m[i*3+j]+=v[i]*v[j]/points.length;});return new T.Matrix3().fromArray(m).determinant();}
let spatialSeeds=0;
for(let seed=1;seed<=12;seed++){
 const a=specimen('generated','uneven','exchange',0,seed,'depth',.4,0),b=specimen('generated','uneven','exchange',0,seed,'depth',.4,1);a.joints.forEach(j=>assert.equal(j.z,0));assert.deepEqual(a.edges.map(e=>e.id),b.edges.map(e=>e.id));if(b.joints.length>5){assert.ok(covarianceDet(b.joints.map(j=>new T.Vector3(j.x,j.y,j.z)))>.001);spatialSeeds++;}
}
const skin=new MarchingCubes(96,new T.MeshBasicMaterial(),false,false,120000);skin.isolation=0;let meshes=0;
for(const rule of ['regroup','swap','identity','generated'])for(const spread of [0,1])for(const t of [.01,.5,.99]){skin.reset();const c=specimen(rule,'uneven','exchange',t,3,'depth',1,spread,'retract'),members=fill(skin.field,96,c.edges,{...o,spread});skin.update();assert.ok(members.length<=40&&skin.geometry.drawRange.count>0&&skin.geometry.drawRange.count<360000);for(const name of ['position','normal']){const a=skin.geometry.getAttribute(name).array;for(let i=0;i<skin.geometry.drawRange.count*3;i++)assert.ok(Number.isFinite(a[i]));}meshes++;}
console.log(JSON.stringify({heightCases,states,spatialSeeds,meshes,checks:['main height response in every operation and both height policies','generated branching is non-coplanar across tested deep trees','working plane and local bow remain planar for steady regroup','endpoints stay attached','finite geometry and mesh capacity'],limitations:['no collision-free embedding guarantee','no GPU timing in these checks']},null,2));
