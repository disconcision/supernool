import * as T from 'three';
import {dirtRoutes} from './dirt-routes';
import {mountRockStudy} from './rock-study';
export function makeClearing(scene:T.Scene){
 const pathRocks:{x:number;z:number;r:number}[]=[],touchPoints:T.Vector3[]=[],obstacles:{x:number;z:number;r:number}[]=[],rand=(n:number)=>{const x=Math.sin(n*127.1+41.7)*43758.5;return x-Math.floor(x);};
 const rock=new T.MeshStandardMaterial({color:'#657574',roughness:1,flatShading:true,vertexColors:true}),moss=new T.MeshStandardMaterial({color:'#738458',roughness:1,flatShading:true}),lichen=new T.MeshStandardMaterial({color:'#b4b183',roughness:1,flatShading:true});
 function add(g:T.BufferGeometry,m:T.Material,p:T.Vector3,scale=new T.Vector3(1,1,1)){const o=new T.Mesh(g,m);o.position.copy(p);o.scale.copy(scale);o.castShadow=true;o.receiveShadow=true;scene.add(o);return o;}
 // Low relief underfoot; height remains essentially zero in the playable centre.
 const ground=new T.CircleGeometry(17,80).toNonIndexed();ground.rotateX(-Math.PI/2);const gp=ground.getAttribute('position'),gc=[];
 for(let i=0;i<gp.count;i++){const x=gp.getX(i),z=gp.getZ(i),r=Math.hypot(x,z);if(r>15){const angle=Math.atan2(z,x),scale=1+.025*Math.sin(angle*7)+.02*Math.sin(angle*11);gp.setXYZ(i,x*scale,-.035,z*scale);}const c=new T.Color('#87937a').multiplyScalar(.94+.055*Math.sin(x*.6+z*.4));gc.push(c.r,c.g,c.b);}
 ground.setAttribute('color',new T.Float32BufferAttribute(gc,3));ground.computeVertexNormals();const studioGround=new T.MeshStandardMaterial({vertexColors:true,roughness:1});const floor=add(ground,studioGround,new T.Vector3());floor.castShadow=false;floor.visible=false;
 function stone(x:number,z:number,w:number,h:number,seed:number,collision=true){
  // Irregular eight-sided rock with broad strata and broken shoulders.
  const geo=new T.CylinderGeometry(.7,1,1,7,2).toNonIndexed(),p=geo.getAttribute('position'),colors=[];
  for(let i=0;i<p.count;i++){const y=p.getY(i),angle=Math.atan2(p.getZ(i),p.getX(i)),factor=(1+.18*Math.sin(angle*3+seed))*(1-.45*y);p.setXYZ(i,p.getX(i)*factor+.48*y*Math.sin(seed),p.getY(i)+.18*Math.cos(angle+seed)*(y+.5),p.getZ(i)*factor+.25*y*Math.cos(seed));const c=new T.Color().setHSL(.47,.08,.42+.09*(y+.5)+.035*Math.sin(angle+seed));colors.push(c.r,c.g,c.b);}
  geo.setAttribute('color',new T.Float32BufferAttribute(colors,3));geo.computeVertexNormals();const o=add(geo,rock,new T.Vector3(x,h*.45-.08,z),new T.Vector3(w,h,w*.72));o.rotation.y=seed*2.3;
  o.userData.rockSeed=seed;pathRocks.push({x,z,r:w*1.05});touchPoints.push(new T.Vector3(x,h*.95,z));
  if(collision)obstacles.push({x,z,r:w*.82});
  // Flat moss islands and small pale lichen plates follow the rock crown.
  o.updateMatrixWorld(true);const probe=new T.Raycaster();
  for(let j=0;j<5;j++){const px=x+(rand(seed+j)-.5)*w*.75,pz=z+(rand(seed+j+7)-.5)*w*.45;probe.set(new T.Vector3(px,h*3+1,pz),new T.Vector3(0,-1,0));const hit=probe.intersectObject(o,false)[0];if(!hit)continue;
   const normal=hit.face!.normal.clone().applyMatrix3(new T.Matrix3().getNormalMatrix(o.matrixWorld)).normalize();
   const patch=add(new T.SphereGeometry(1,7,3,0,Math.PI*2,0,Math.PI/2),j===4?lichen:moss,hit.point.clone().addScaledVector(normal,.008),new T.Vector3(w*(.24+rand(seed+j+4)*.16),.045,w*.19));patch.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),normal);o.attach(patch);
  }
  return o;
 }
 for(let i=0;i<23;i++){const a=i/23*Math.PI*2,r=11+rand(i)*2,x=Math.cos(a)*r,z=Math.sin(a)*r;if(z>5&&Math.abs(x)<3)continue;if(z<-6&&Math.abs(Math.abs(x)-7)<2)continue;stone(x,z,1.3+rand(i+9)*1.3,z<1?1.6+rand(i+20)*1.8:.6+rand(i)*.9,i);}
 for(let i=0;i<17;i++){const a=i*2.399,r=7+rand(i+42)*3;stone(Math.cos(a)*r,Math.sin(a)*r,.25+rand(i)*.45,.2+rand(i+4)*.5,i+100,false);}
 // Small clusters of warm shelf-like fungi at sheltered boulder feet.
 const stem=new T.MeshStandardMaterial({color:'#c3b691',roughness:1}),cap=new T.MeshStandardMaterial({color:'#ac7451',roughness:1,flatShading:true});
 for(let i=0;i<36;i++){const cluster=Math.floor(i/4),a=cluster*2.4,r=8.8+rand(cluster)*1.1,x=Math.cos(a)*r+(rand(i)-.5)*.7,z=Math.sin(a)*r+(rand(i+9)-.5)*.7,h=.12+rand(i+2)*.23;const mushroom=new T.Group();mushroom.name='Mushroom '+(i+1);mushroom.position.set(x,0,z);mushroom.userData.formation={id:'fungus-'+i,kind:'mushroom'};mushroom.userData.contact=new T.Vector3(0,h+.06,0);scene.add(mushroom);touchPoints.push(new T.Vector3(x,h+.06,z));mushroom.attach(add(new T.CylinderGeometry(.025,.04,h,5),stem,new T.Vector3(x,h/2,z)));mushroom.attach(add(new T.SphereGeometry(.15,7,4,0,Math.PI*2,0,Math.PI/2),cap,new T.Vector3(x,h,z),new T.Vector3(1+rand(i)*.8,.4,1)));}
 const gates=[stone(-6.5,-7.5,1.35,1.65,200),stone(6.5,-7.5,1.35,1.65,210)],baseY=gates.map(g=>g.position.y);let opened=0;
 mountRockStudy(scene,obstacles,touchPoints);
 return {obstacles,touchPoints,get paths(){return dirtRoutes(pathRocks);},setGroundShadows(on:boolean){floor.receiveShadow=on;},setGroundPainted(on:boolean){floor.visible=!on;},update(open:boolean,dt:number){opened+=(Number(open)-opened)*(1-Math.exp(-dt*2));gates.forEach((g,i)=>g.position.y=baseY[i]-opened*2.3);for(const o of obstacles)if(o.z===-7.5)o.r=1.35*.82*(1-opened);}};
}
