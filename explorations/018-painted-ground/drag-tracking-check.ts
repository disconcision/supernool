import assert from 'node:assert/strict';
import {trackAt,glideEase} from './drag-tracking';
import {capturePose,glidePose} from './pose-glide';
import {derivedGestures} from './derived-gestures';
import {layout,transition,Pose} from './layout';
import {instantiate,problems} from './problems';
import {prepare} from './surface';
const tracks=[{item:'identity',from:{x:0,y:0},to:{x:100,y:0}},{item:'regroup',from:{x:0,y:0},to:{x:100,y:5}}];
assert.equal(trackAt(tracks,{x:90,y:0})!.item,'identity');
assert.equal(trackAt(tracks,{x:90,y:5},'identity')!.item,'regroup','late correction does not require retreat');
assert.equal(trackAt(tracks,{x:90,y:2.4},'identity',3)!.item,'identity','small incumbent advantage');
assert.equal(trackAt(tracks,{x:90,y:7},'identity',3)!.item,'regroup','stickiness is not a lock');
assert.equal(trackAt(tracks,{x:150,y:5})!.ready,true,'overshoot stays eligible');
assert.equal(trackAt(tracks,{x:40,y:0},'identity')!.ready,false,'no latched catch after retreat');
assert.equal(trackAt(tracks,{x:50,y:0})!.ready,false,'ties at halfway cancel');
assert.equal(trackAt(tracks,{x:90,y:0},undefined,0,'regroup')!.item,'regroup','explicit held-route fallback');
const config={spread:0,irregularity:.35,height:'depth',seed:1};
const options={thickness:.85,taper:.85,bow:.7,random:.3,twist:.3,facets:.4,seed:1,blend:.1,hewn:true};
function finite(p:Pose){
 for(const v of p.points.values())assert.ok(v.toArray().every(Number.isFinite));
 for(const e of p.edges){assert.ok(e.r>0);assert.ok(e.a.distanceToSquared(e.b)>1e-10);const m=prepare(e,options);for(const v of m.points)assert.ok(v.toArray().every(Number.isFinite));}
}
let switches=0;
for(const problem of problems){
 const tree=instantiate(problem.start),gestures=derivedGestures(tree);
 for(const g of gestures){
  const other=gestures.find(h=>h.gripId===g.gripId&&h!==g);if(!other)continue;
  const a=capturePose(transition(tree,g.after,.85,config,g.action.key,g.action.merge,options),options);
  const b=transition(tree,other.after,.9,config,other.action.key,other.action.merge,options);
  assert.equal(glidePose(a,b,0,options),a,'switch starts at exact displayed pose');
  assert.equal(glidePose(a,b,1,options),b,'expired glide equals pure target');
  for(const t of [.001,.1,.5,.9,.999])finite(glidePose(a,b,glideEase(t),options));
  const displayed=capturePose(glidePose(a,b,glideEase(.3),options),options);
  const c=transition(tree,g.after,.65,config,g.action.key,g.action.merge,options);
  assert.equal(glidePose(displayed,c,0,options),displayed,'rapid retarget starts from actual intermediate display');
  for(const end of [layout(tree,config),layout(other.after,config)]){
   assert.equal(glidePose(displayed,end,0,options),displayed,'release/cancel during glide is continuous');
   finite(glidePose(displayed,end,.5,options));assert.equal(glidePose(displayed,end,1,options),end);
  }
  switches++;
 }
}
assert.ok(switches>100);
console.log(`Continuous drag: late correction/drop/stickiness and ${switches} preset route-switch/release pose pairs pass.`);
