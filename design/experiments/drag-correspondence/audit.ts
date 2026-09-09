import * as T from 'three';
import {instantiate,problemById} from '../../../explorations/018-painted-ground/problems';
import {gestures} from '../../../explorations/018-painted-ground/gestures';
import {layout,transition} from '../../../explorations/018-painted-ground/layout';
import {walk,count,key,find} from '../../../explorations/018-painted-ground/algebra';
const camera=new T.OrthographicCamera(-18,18,11,-11,.1,250);camera.position.set(39,32,63);camera.lookAt(0,2,0);camera.updateMatrixWorld();camera.updateProjectionMatrix();
const world=(p:T.Vector3)=>p.clone().multiplyScalar(1.35*1.15*.92).add(new T.Vector3(-1,0,-3));
const project=(p:T.Vector3)=>{const v=world(p).project(camera);return new T.Vector2(v.x*630,-v.y*385);};
const cases:any[]=[['minimal', ['+', ['*',3,['+','x','y']], ['*',-3,['+','x','y']]]],['hollow',problemById('hollow-crown').start],['absorb',['*',['+','x','y'],0]],['same-destination',['+',['+','x','y'],'z']]];
const report=[];
for(const [name,e] of cases){const tree=instantiate(e),opts={spread:0,irregularity:0,height:'depth',seed:1},before=layout(tree,opts),gs=gestures(tree);const pairs=[];
for(let i=0;i<gs.length;i++)for(let j=i+1;j<gs.length;j++){const a=gs[i],b=gs[j];if(a.gripId!==b.gripId)continue;
 const dest=(g:any)=>{const after=layout(g.after,opts);return (g.action.key==='swap'||g.action.key.startsWith('group')?after.points.get(g.gripId):after.points.get(g.targetId)??before.points.get(g.targetId))!;};
 const x=dest(a),y=dest(b),p=before.points.get(a.gripId)!,v=x.clone().sub(p),w=y.clone().sub(p),sx=project(x).sub(project(p)),sy=project(y).sub(project(p));
 const theta=(u:any,v:any)=>u.length()*v.length()<1e-8?null:Math.acos(Math.max(-1,Math.min(1,u.dot(v)/(u.length()*v.length()))))*180/Math.PI;
 pairs.push({grip:key(find(tree,a.gripId)!),rules:[a.action.key,b.action.key],dest:[x.toArray(),y.toArray()],distance3D:x.distanceTo(y),angle3D:theta(v,w),angleScreen:theta(sx,sy),gripSurvives:[!!find(a.after,a.gripId),!!find(b.after,b.gripId)],targetIsGrab:[a.targetId===a.gripId,b.targetId===b.gripId]});}
 report.push({name,nodes:count(tree),pairs});}
console.log(JSON.stringify(report,null,2));
