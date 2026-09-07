import assert from 'node:assert/strict';import {specimen} from './spatial';
let states=0;
for(const mapping of ['keep','exchange'])for(const spread of [0,.5,1])for(const complexity of ['simple','nested','uneven']){
 for(const t of [0,1]){const a=specimen('regroup',complexity,mapping,t,1,'depth',0,spread,'slide'),b=specimen('regroup',complexity,mapping,t,1,'depth',0,spread,'retract');a.edges.forEach((e,i)=>{assert.ok(e.a.distanceTo(b.edges[i].a)<1e-9);assert.ok(e.b.distanceTo(b.edges[i].b)<1e-9);assert.equal(e.r,b.edges[i].r);});}
 for(let i=0;i<=100;i++){const t=i/100,c=specimen('regroup',complexity,mapping,t,1,'depth',0,spread,'retract'),p=c.joints.find(j=>j.id==='p')!,q=c.joints.find(j=>j.id==='q')!;
  for(const e of c.edges.slice(0,3))assert.ok(Math.min(e.a.distanceTo(p),e.a.distanceTo(q))<1e-8);
  assert.equal(c.edges[4].b.x,0);assert.equal(c.edges[4].b.y,1.6);assert.equal(c.edges[4].b.z,0);
  if(i===50){assert.equal(c.edges[3].a.distanceTo(c.edges[3].b),0);assert.equal(c.edges[3].r,0);}
  c.edges.forEach(e=>assert.ok([e.a.x,e.a.y,e.a.z,e.b.x,e.b.y,e.b.z,e.r].every(Number.isFinite)));states++;
 }
 const a=specimen('regroup',complexity,mapping,.5-1e-5,1,'depth',0,spread,'retract'),b=specimen('regroup',complexity,mapping,.5+1e-5,1,'depth',0,spread,'retract');a.edges.forEach((e,i)=>{assert.ok(e.a.distanceTo(b.edges[i].a)<.001);assert.ok(e.b.distanceTo(b.edges[i].b)<.001);});
}
console.log(JSON.stringify({states,checks:['endpoints match slide variant','all operand attachments remain at named pluses','root remains anchored in both embeddings','connector alone reaches zero extent and radius','continuous positions across the transfer']},null,2));
