import {build} from './mesh';
import assert from 'node:assert/strict';
let count=0;
for(const sides of [4,5,7])for(const bevel of [.05,.12,.28])for(const twist of [0,.3])for(const curve of [0,.45])for(const radius of [.4,.8])for(const share of [.3,.7]){
 const mesh=build({sides,bevel,twist,curve,radius,share});
 assert.equal(mesh.boundaryEdges,0,JSON.stringify({sides,bevel,twist,curve,radius,share}));assert.equal(mesh.nonmanifoldEdges,0);assert.ok(mesh.positions.every(Number.isFinite));assert.ok(mesh.hubTriangles>0);count++;
}
console.log(`${count} mesh configurations: finite coordinates, closed edges, no multiply shared edges.`);
