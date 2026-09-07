const {buildSync}=require('esbuild');const assert=require('node:assert/strict');const {mkdirSync}=require('node:fs');
mkdirSync('.cache',{recursive:true});buildSync({entryPoints:['explorations/018-painted-ground/hand-travel.ts'],bundle:true,platform:'node',format:'cjs',outfile:'.cache/hand-travel.cjs'});
const {TravelHands}=require('../../.cache/hand-travel.cjs');const T=require('three');
const motion=new TravelHands();for(let i=0;i<6;i++)motion.update(1/60,3.2,true,true);assert.equal(motion.weight,0,'A short step must not trigger the travel pose');
for(let i=0;i<100;i++)motion.update(1/60,3.2,true,true);assert.ok(motion.weight>.98);
for(const style of ['streamlined','paddle','glide']){motion.setStyle(style);for(const side of [-1,1]){
 for(let k=0;k<=100;k++){const pose=motion.sample(side,k/100);assert.ok(pose.position.x*side>.8,'Hands stay on their anatomical side');assert.ok(pose.position.y>.8&&pose.position.y<1.3);const palm=new T.Vector3(0,0,1).applyQuaternion(pose.orientation);assert.ok(palm.y<-.9,'Travel palm faces down');assert.ok(Number.isFinite(pose.grasp)&&pose.grasp>=0&&pose.grasp<.3);}
 assert.ok(motion.sample(side,0).position.distanceTo(motion.sample(side,1).position)<1e-10,'No seam at the stride-loop boundary');
}}
for(let i=0;i<90;i++)motion.update(1/60,0,false,true);assert.ok(motion.weight<.0001,'Standing returns to its original pose');
for(let i=0;i<100;i++)motion.update(1/60,3.2,true,true);for(let i=0;i<90;i++)motion.update(1/60,3.2,true,false);assert.ok(motion.weight<.0001,'Tree work suppresses travel poses');
console.log('Travel pose gating, anatomical sides, downward palms, phase continuity, stop and work transitions passed.');
