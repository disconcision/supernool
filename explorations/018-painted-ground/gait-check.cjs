const T=require('three'),assert=require('node:assert/strict'),fs=require('node:fs');require('esbuild').buildSync({entryPoints:[__dirname+'/gait.ts'],bundle:true,platform:'node',external:['three'],outfile:__dirname+'/.gait-check.cjs'});const {createStride}=require('./.gait-check.cjs');fs.unlinkSync(__dirname+'/.gait-check.cjs');
const model=new T.Group(),root=new T.Bone(),body=new T.Bone();root.name='Root';body.name='Body';body.position.y=1.19;root.add(body);model.add(root);const legs=[];
for(const [i,x]of [-.175,.175].entries()){const hip=new T.Bone(),shin=new T.Bone(),foot=new T.Bone();hip.name='Thigh'+i;hip.position.set(x,1.19,0);hip.quaternion.setFromAxisAngle(new T.Vector3(1,0,0),Math.PI);shin.position.y=.53;foot.position.y=.48;foot.quaternion.setFromAxisAngle(new T.Vector3(1,0,0),-1.064);root.add(hip);hip.add(shin);shin.add(foot);legs.push({hip,shin,foot});}
const gait=createStride(model,.72);let last=0,cycles=0,steps=0,minKnee=180,maxSpan=0;
for(const direction of [new T.Vector3(0,0,1),new T.Vector3(0,0,-1),new T.Vector3(1,0,0)])for(let n=0;n<240;n++){
 gait.update(1/60,direction.clone().multiplyScalar(1.45/60),true,false);model.updateMatrixWorld(true);if(gait.phase<last)cycles++;last=gait.phase;steps++;
 const positions=legs.map((leg,i)=>{const h=leg.hip.getWorldPosition(new T.Vector3()),k=leg.shin.getWorldPosition(new T.Vector3()),f=leg.foot.getWorldPosition(new T.Vector3());assert(Math.abs(h.distanceTo(k)-.53)<1e-6);assert(Math.abs(k.distanceTo(f)-.48)<1e-6);assert([h,k,f].every(p=>p.toArray().every(Number.isFinite)));assert(f.y>=.18-1e-6);if((gait.phase+i*.5)%1<.6){assert(Math.abs(f.y-.18)<1e-6,'Stance ankle remains grounded');const knee=T.MathUtils.radToDeg(k.clone().sub(h).angleTo(f.clone().sub(k)));minKnee=Math.min(minKnee,knee);}return f;});maxSpan=Math.max(maxSpan,positions[0].distanceTo(positions[1]));
}
assert(cycles>=18&&cycles<=22,'Long stride cadence should be ~1.68 cycles/second at normal speed');assert(minKnee<18,'Supporting knee approaches extension');assert(maxSpan>.55,'Longer stance than the small authored shuffle');
for(let i=0;i<120;i++)gait.update(1/60,new T.Vector3(),false,false);model.updateMatrixWorld(true);assert(legs.every(l=>Math.abs(l.foot.getWorldPosition(new T.Vector3()).y-.18)<1e-6));console.log({cycles,seconds:steps/60,minSupportKneeDegrees:minKnee.toFixed(1),maxFootSeparation:maxSpan.toFixed(2),result:'Finite forward/back/side gait, leg lengths, ground contact, long stride and settled feet passed'});

for(let i=0;i<300;i++){gait.restore();gait.update(1/60,new T.Vector3(),false,true);gait.lean(-.16);}assert(Math.abs(body.quaternion.angleTo(new T.Quaternion())-.16)<1e-6,'Torso lean must not accumulate even when mixer tracks are constant');console.log('Repeated stationary lean remains bounded');

let lo=Infinity,hi=-Infinity,airborne=0;
for(let i=0;i<600;i++){
 gait.restore();gait.update(1/60,new T.Vector3(0,0,3.2/60),true,false,true);gait.lean(.09);model.updateMatrixWorld(true);
 if(i>120){lo=Math.min(lo,body.position.y);hi=Math.max(hi,body.position.y);const feet=legs.map(l=>l.foot.getWorldPosition(new T.Vector3()));if(feet.every(f=>f.y>.185))airborne++;for(const f of feet)assert(f.y>.16&&f.toArray().every(Number.isFinite));}
}
assert(hi-lo<.05,'Run torso bounce must stay restrained');assert(airborne>10,'Run has a real flight phase');console.log({runTorsoRange:hi-lo,airborneFrames:airborne});
