const assert=require('node:assert/strict'),T=require('three'),{buildSync}=require('esbuild');
buildSync({entryPoints:[__dirname+'/lehi.ts'],bundle:true,platform:'node',external:['three'],outfile:__dirname+'/.hand-check.cjs'});
const {createLehi}=require('./.hand-check.cjs');require('node:fs').unlinkSync(__dirname+'/.hand-check.cjs');
const scene=new T.Scene(),actor=createLehi(scene),camera=new T.PerspectiveCamera();camera.position.set(0,2,6);camera.lookAt(0,1,0);
const hands=scene.children.filter(o=>o.userData.hand);
for(const heading of [0,Math.PI]){
 actor.root.rotation.y=heading;
 for(let i=0;i<120;i++)actor.update(1000+i*16,1/60,false,camera,undefined,undefined,0,false);
 scene.updateMatrixWorld(true);
 hands.forEach((h,i)=>{
  const side=actor.root.worldToLocal(h.position.clone()).x;assert.equal(Math.sign(side),i?1:-1);
  const thumb=h.children.find(o=>o instanceof T.Group&&o.position.y===-.04);
  const delta=thumb.getWorldPosition(new T.Vector3()).sub(h.position).applyAxisAngle(new T.Vector3(0,1,0),-heading);
  assert.equal(Math.sign(delta.x),i?-1:1,'Thumb must point inward in body coordinates for front AND back views');
 });
}
for(let i=0;i<60;i++)actor.update(4000+i*16,1/60,true,camera,new T.Vector3(0,1.5,-1),undefined,0,true,{velocity:new T.Vector3(0,0,1),effort:.5});
assert(hands[0].userData.grasp>.98);assert(hands[1].userData.grasp<.02,'Reserve hand must stay open');
console.log('Anatomical right/left sides and inward thumbs pass from front/back; right hand closes, reserve left stays open.');
