import * as T from 'three';
import {paintPatch} from './painterly-foliage';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {material,cardsGeometry,palette,rng,hash,makeCluster,Settings} from './canopy';
import {Pose} from '../018-painted-ground/layout';
import {Options,prepare} from '../018-painted-ground/surface';
export type GrowthSettings=Settings&{form:string;backing:number;offshoots:number;finish:string;normalSharing:number;shadeDepth:number;brushScale:number};
const textures=new Map<number,T.CanvasTexture>();
// A directed, tapering leafy spray rather than a circular stamp. Kept code-native.
function spray(seed:number){if(textures.has(seed))return textures.get(seed)!;const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const ctx=canvas.getContext('2d')!,r=rng(seed+131);
 for(let i=0;i<42;i++){const t=r(),side=(r()-.5)*2,x=34+t*181,y=128+side*(25+52*Math.sin(t*Math.PI)),size=29+r()*26;
 ctx.save();ctx.translate(x,y);ctx.rotate(side*.6+(r()-.5)*1.1);const g=.69+r()*.3;ctx.fillStyle=`rgb(${g*247},${g*255},${g*238})`;ctx.beginPath();ctx.moveTo(-size*.7,0);ctx.lineTo(-size*.22,-size*.47);ctx.lineTo(size*.45,-size*.32);ctx.lineTo(size*.7,.02);ctx.lineTo(size*.18,size*.4);ctx.lineTo(-size*.4,size*.32);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(255,255,233,.10)';ctx.beginPath();ctx.moveTo(-size*.6,0);ctx.lineTo(size*.6,0);ctx.lineTo(size*.12,-size*.3);ctx.closePath();ctx.fill();ctx.restore();}
 const tex=new T.CanvasTexture(canvas);tex.colorSpace=T.SRGBColorSpace;tex.anisotropy=4;textures.set(seed,tex);return tex;}
function branch(a:T.Vector3,b:T.Vector3,radius:number,mat:T.Material,down=false){const mid=a.clone().lerp(b,.5).add(new T.Vector3(0,down?.2:.12,0));const curve=new T.QuadraticBezierCurve3(a,mid,b);const mesh=new T.Mesh(new T.TubeGeometry(curve,7,radius,5,false),mat);return mesh;}
export function makeGrowthCluster(id:string,o:GrowthSettings){if(o.form==='F5'){const g=makeCluster(id,{...o,style:'F5'});if(o.finish==='painted')g.traverse(m=>{if(m instanceof T.InstancedMesh)paintPatch(m,o,'F5');});return g;}
 const group=new T.Group(),r=rng(Math.floor(hash(id+o.seed)*4294967295)),base=new T.Color(palette[o.palette][0]),light=new T.Color(palette[o.palette][1]),mat=material(o,spray(o.seed%4)),woodMat=new T.MeshStandardMaterial({color:'#7c714d',roughness:1,wireframe:o.wire});
 const count=Math.round((o.form==='G3'?56:64)*o.density),patch=new T.InstancedMesh(cardsGeometry(o.normals),mat,count),obj=new T.Object3D();patch.frustumCulled=false;
 const tips:T.Vector3[]=[],directions:number[]=[];const coreMaterial=material(o);coreMaterial.color.copy(base).multiplyScalar(.86);
 const lobes=o.form==='G2'?3:o.form==='G3'?7:4;
 for(let i=0;i<lobes;i++){const angle=i*2.399963+hash(id)*6.28,reach=.9+r()*.8;
 let tip=new T.Vector3(Math.cos(angle)*reach,o.finish==='painted'&&o.form==='G1'?.35+(i%3)*.38:.15+(i%3)*.23,Math.sin(angle)*reach*.8);
 if(o.form==='G3')tip=new T.Vector3(Math.cos(angle)*(.65+r()*.45),-1.35-r()*.65,Math.sin(angle)*(.65+r()*.45));
 directions.push(angle);tips.push(tip);group.add(branch(new T.Vector3(0,0,0),tip,.026,woodMat,o.form==='G3'));
 if(o.form!=='G3'&&o.backing>.01){
 // Thin tapered wedges, with overlapping textured faces hiding the inner edges.
 const shape=new T.Shape();shape.moveTo(0,0);shape.lineTo(reach*.35,-.45);shape.lineTo(reach,.0);shape.lineTo(reach*.65,.47);shape.closePath();
 const geo=new T.ExtrudeGeometry(shape,{depth:.24,bevelEnabled:false});geo.rotateX(-Math.PI/2);const body=new T.Mesh(geo,coreMaterial);body.rotation.y=-angle;body.position.y=tip.y*.45;body.scale.setScalar(o.backing*1.2);group.add(body);
 }
 }
 for(let i=0;i<count;i++){const k=i%lobes,tip=tips[k],angle=directions[k],t=.15+.85*r(),side=(r()-.5)*.75;
 if(o.form==='G3'){
  // Continuous overlapping patches along each hanging woody strand, no separate cap.
  const a=t*t,radial=new T.Vector3(Math.cos(angle),0,Math.sin(angle));obj.position.copy(tip).multiplyScalar(t);obj.position.y=tip.y*a+.28*Math.sin(t*Math.PI);obj.position.addScaledVector(new T.Vector3(-radial.z,0,radial.x),side*.65*(1-t*.5));
  obj.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),radial);obj.rotateZ((r()-.5)*.3);obj.scale.set((1+r()*.35)*(1-t*.3),1.3+r()*.4,1);
 }else{
  obj.position.copy(tip).multiplyScalar(t);obj.position.x-=Math.sin(angle)*side;obj.position.z+=Math.cos(angle)*side;obj.position.y+=(r()-.5)*(o.form==='G2'?.32:.7);
  const tilt=o.form==='G2'?.3:(i%3===0?.85:.45);const normal=new T.Vector3(Math.cos(angle)*tilt,.75,Math.sin(angle)*tilt).normalize();obj.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal);obj.rotateZ(-angle+(r()-.5)*.45);obj.scale.set(1.35+r()*.4,1.1+r()*.35,1);
 }
 if(o.finish==='painted'&&o.form!=='G3'){obj.position.y+=(i%3-1)*(o.form==='G1'?.28:.16);obj.rotateZ(Math.sin(i*3.87)*.65);}
 obj.updateMatrix();patch.setMatrixAt(i,obj.matrix);patch.setColorAt(i,base.clone().lerp(light,.15+r()*.5));
 }
 if(o.finish==='painted')paintPatch(patch,o,o.form);patch.instanceMatrix.needsUpdate=true;batchMembers(group);group.add(patch);group.scale.setScalar(o.size);return group;
}
export type Offshoot={id:string;member:string;t:number;root:T.Group;foliage:T.Group;tip:T.Vector3};
export function makeOffshoots(p:Pose,o:GrowthSettings){const out:Offshoot[]=[];
 // Slots derive only from stable member IDs. Never select/reseed during a tween.
 for(const e of p.edges){if(e.id==='stem')continue;const parent=p.nodes.get(e.id);if(parent?.kind!=='op')continue;
 for(let k=0;k<2;k++){const id=e.id+':shoot:'+k;if(hash(id+'presence')>o.offshoots)continue;const root=new T.Group(),angle=hash(id+o.seed)*Math.PI*2;
 const tip=new T.Vector3(Math.cos(angle)*(1.05+k*.25),.26+hash(id+'lift')*.35,Math.sin(angle)*(.8+k*.15));
 const wood=new T.MeshStandardMaterial({color:'#8c774e',roughness:1,wireframe:o.wire});root.add(branch(new T.Vector3(0,-.08,0),tip,.055,wood));
 for(let j=0;j<2;j++){const end=tip.clone().multiplyScalar(.85).add(new T.Vector3((j?1:-1)*.28,.2,.15));root.add(branch(tip.clone().multiplyScalar(.5),end,.023,wood));}
 const canopy=makeGrowthCluster(id,{...o,size:o.size*.48,density:o.density*.65});canopy.position.copy(tip);batchMembers(root);root.add(canopy);out.push({id,member:e.id,t:.3+k*.42,root,foliage:canopy,tip});}
 }
 return out;
}
export function placeOffshoots(items:Offshoot[],p:Pose,o:Options){for(const item of items){const e=p.edges.find(e=>e.id===item.member);if(!e){item.root.visible=false;continue;}const m=prepare(e,o),t=item.t;item.root.visible=true;item.root.position.copy(e.a).lerp(e.b,t).addScaledVector(m.curve,Math.sin(Math.PI*t));item.root.quaternion.identity().slerp(new T.Quaternion().setFromUnitVectors(new T.Vector3(0,1,0),m.axis),.35);item.root.scale.setScalar(Math.min(1,m.len/.8));}}

// Merge static twig and backing meshes per material; foliage remains instanced.
function batchMembers(group:T.Group){const sets=new Map<T.Material,T.Mesh[]>();for(const c of group.children){if(c instanceof T.Mesh&&!Array.isArray(c.material)){const set=sets.get(c.material)||[];set.push(c);sets.set(c.material,set);}}for(const [mat,list] of sets){if(list.length<2)continue;const parts=list.map(m=>{m.updateMatrix();const g=m.geometry.clone().applyMatrix4(m.matrix);m.geometry.dispose();group.remove(m);return g;});const merged=mergeGeometries(parts);parts.forEach(g=>g.dispose());if(merged)group.add(new T.Mesh(merged,mat));}}
