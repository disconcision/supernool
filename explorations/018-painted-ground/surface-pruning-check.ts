import assert from 'node:assert/strict';
import * as T from 'three';
import {initial} from './algebra';
import {recoveryRoute,replayRecovery} from './recovery-replay';
import {fill,Options,valueAt} from './surface';
import {memberBox} from './mesh-domain';
import {rootedEdges} from './root-base';
// Reference union visits the original complete member boxes, without the new
// capsule rejection. Check the surface and its neighbouring normal samples.
const host=initial(),route=recoveryRoute(host,[]),size=64,world=(i:number)=>(i/size*2-1)*6;
const bound=(x:number)=>Math.max(1,Math.min(size-2,Math.floor((x/6+1)*size/2)));
for(const extreme of [false,true])for(const progress of [0,.12,.3,.5,.73,.84,1]){
 const o:Options={thickness:extreme?1.4:1,taper:.8,bow:extreme?1:.6,random:.7,twist:1,facets:extreme?1:.4,seed:2,blend:extreme?.3:.1,hewn:true,spread:0,rootFlare:.7,rootAmount:.45};
 const p=replayRecovery(route.records,host,progress,{spread:0,irregularity:.4,height:'depth',seed:2},o,1);
 const actual=new Float32Array(size**3),expected=new Float32Array(size**3);expected.fill(-100);
 const members=fill(actual,size,rootedEdges(p.pose.edges,o),o);
 for(const m of members){
  const box=memberBox(m,o).expandByScalar(24/size);
  for(let z=bound(box.min.z);z<=Math.min(size-2,bound(box.max.z)+1);z++)
   for(let y=bound(box.min.y-5);y<=Math.min(size-2,bound(box.max.y-5)+1);y++)
    for(let x=bound(box.min.x);x<=Math.min(size-2,bound(box.max.x)+1);x++){
     const q=valueAt(world(x),world(y)+5,world(z),m,o),i=z*size*size+y*size+x,d=expected[i],h=Math.max(o.blend-Math.abs(d-q),0)/o.blend;
     expected[i]=Math.max(d,q)+h*h*o.blend*.25;
    }
 }
 for(let i=0;i<actual.length;i++)if(expected[i]>-24/size||actual[i]>-24/size)assert.equal(actual[i],expected[i],`Surface/normal sample changed at ${progress}, extreme=${extreme}`);
}
console.log('Capsule pruning: full-box reference surface and adjacent normal samples match across planar/spatial recovery and broad curved roots.');
