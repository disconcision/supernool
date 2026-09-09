import assert from 'node:assert/strict';
import {trackAt,glideEase,ambiguityGain,fineCursor,advanceFineCursor,precisionStickiness} from './drag-tracking';
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

// Accumulated precision: no gain-induced teleport, no idle drift, no dead zone.
assert.equal(ambiguityGain(tracks,{x:0,y:0}),1,'full response at shared launch point');
assert.equal(ambiguityGain(tracks.slice(0,1),{x:90,y:2}),1,'single route stays direct');
assert.ok(ambiguityGain(tracks,{x:90,y:2})<.4,'close competing routes get more control space');
assert.equal(ambiguityGain(tracks,{x:90,y:100}),1,'away from tracks stays direct');
let steady=fineCursor({x:90,y:2});
for(let i=0;i<120;i++)steady=advanceFineCursor(steady,steady.raw,tracks);
assert.deepEqual(steady.point,{x:90,y:2},'stationary character cannot drift or get pulled into a route');
const short=advanceFineCursor(fineCursor({x:90,y:2}),{x:92,y:2},tracks);
assert.ok(short.point.x>90&&short.point.x<90.8,'small key movement stays responsive but finer');
const whole=advanceFineCursor(fineCursor({x:0,y:0}),{x:110,y:5},tracks);
let pieces=fineCursor({x:0,y:0});
for(let i=1;i<=55;i++)pieces=advanceFineCursor(pieces,{x:2*i,y:5*i/55},tracks);
assert.ok(Math.hypot(whole.point.x-pieces.point.x,whole.point.y-pieces.point.y)<.03,'frame partition should not change control materially');
const unambiguous=advanceFineCursor(short,{x:94,y:2},[]);
assert.ok(Math.abs(unambiguous.point.x-short.point.x-2)<1e-9,'gain change applies only to new displacement');
let correction=fineCursor({x:90,y:0}),chosen='identity';
for(let i=1;i<=100;i++){correction=advanceFineCursor(correction,{x:90,y:i},tracks);chosen=trackAt(tracks,correction.point,chosen,3)!.item;}
assert.equal(chosen,'regroup','precision and stickiness still allow late correction');
console.log('Ambiguity precision: local gain, idle stability, continuous gain changes, frame partition, and late correction pass.');

assert.equal(precisionStickiness(tracks,tracks[0].to,'identity'),1.25,'bias stays below closely spaced endpoint separation');
const tiny=[tracks[0],{...tracks[1],to:{x:100,y:.5}}];
assert.equal(trackAt(tiny,tiny[1].to,'identity',precisionStickiness(tiny,tiny[1].to,'identity'))!.item,'regroup','subpixel-separated target is not made unreachable by hysteresis');

// A route picked at the shared source must not swallow the first directional tap.
const launch=[{item:'side',from:{x:0,y:0},to:{x:100,y:0}},{item:'down',from:{x:0,y:0},to:{x:0,y:100}}];
const incumbent=trackAt(launch,{x:0,y:0})!.item;
assert.equal(trackAt(launch,{x:0,y:1},incumbent,3)!.progress,0,'reproduce the previous launch resistance');
for(const raw of [{x:0,y:.1},{x:0,y:1},{x:0,y:5}]){
 const cursor=advanceFineCursor(fineCursor({x:0,y:0}),raw,launch);
 assert.deepEqual(cursor.point,raw,'first small input is unscaled');
 const result=trackAt(launch,cursor.point,incumbent,precisionStickiness(launch,cursor.point,incumbent))!;
 assert.equal(result.item,'down','first directional input can leave arbitrary initial route');
 assert.ok(result.progress>0,'first tap immediately advances the desired route');
}
assert.equal(precisionStickiness(launch,{x:-20,y:30},'side'),0,'retreat cannot retain a route clamped at zero progress');
console.log('Precision launch: first directional input advances without incumbent resistance.');
