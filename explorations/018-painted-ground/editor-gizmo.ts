import * as T from 'three';
import {TransformControls} from 'three/addons/controls/TransformControls.js';

type Tool='combined'|'translate'|'rotate'|'scale';
/** One pointer router arbitrates the simultaneous handles; only one transform can drag. */
export function editorGizmo(camera:T.Camera,canvas:HTMLCanvasElement,hooks:{start:()=>void;change:()=>void;end:()=>void;hover:(text:string)=>void}){
 const overlay=new T.Scene(),move=new TransformControls(camera),rotate=new TransformControls(camera);
 move.setMode('translate');move.setSize(.85);move.showXY=false;move.showYZ=false;move.showXZ=true;
 rotate.setMode('rotate');rotate.setSize(1.35);rotate.showX=false;rotate.showZ=false;rotate.showE=false;rotate.showXYZE=false;
 overlay.add(move.getHelper(),rotate.getHelper());
 const scaleMat=new T.MeshBasicMaterial({color:'#ebd5a2',depthTest:false,depthWrite:false});
 const scaleHandle=new T.Mesh(new T.BoxGeometry(1,1,1),scaleMat);overlay.add(scaleHandle);scaleHandle.visible=false;
 const line=new T.Line(new T.BufferGeometry(),new T.LineBasicMaterial({color:'#ebd5a2',transparent:true,opacity:.55,depthTest:false}));overlay.add(line);line.visible=false;
 let object:T.Object3D|undefined,tool:Tool='combined',snap=true,drag:TransformControls|'scale'|undefined;
 let startX=0,startY=0,startScale=new T.Vector3(),activePointer:number|undefined;
 const ray=new T.Raycaster(),origin=new T.Vector3();
 // TransformControls expects normalized coordinates despite the upstream PointerEvent annotation.
 const pointer=(e:PointerEvent,button=e.button)=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*2-1,y:1-(e.clientY-r.top)/r.height*2,button} as unknown as PointerEvent;};
 const attached=()=>{move.detach();rotate.detach();if(object){if(tool==='combined'||tool==='translate')move.attach(object);if(tool==='combined'||tool==='rotate')rotate.attach(object);}scaleHandle.visible=line.visible=!!object&&(tool==='combined'||tool==='scale');};
 function update(){
  if(!object)return;camera.updateMatrixWorld();object.updateWorldMatrix(true,false);object.getWorldPosition(origin);
  const ndc=origin.clone().project(camera),rect=canvas.getBoundingClientRect();
  const at=ndc.clone();at.x+=150/rect.width;at.y+=100/rect.height;scaleHandle.position.copy(at.unproject(camera));scaleHandle.quaternion.copy(camera.quaternion);
  const next=ndc.clone();next.x+=20/rect.width;scaleHandle.scale.setScalar(next.unproject(camera).distanceTo(origin));
  line.geometry.setFromPoints([origin,scaleHandle.position]);overlay.updateMatrixWorld(true);
 }
 function hover(e:PointerEvent){
  if(!object)return undefined;update();const p=pointer(e);ray.setFromCamera(p as unknown as T.Vector2,camera);
  if(scaleHandle.visible&&ray.intersectObject(scaleHandle).length){move.axis=rotate.axis=null;scaleMat.color.set('#fff4c2');hooks.hover('Size · drag diagonally up/right to enlarge');return 'scale' as const;}
  scaleMat.color.set('#ebd5a2');move.axis=rotate.axis=null;
  // Translation arrows have priority at crossings with the outer yaw ring.
  if(move.object){move.pointerHover(p);if(move.axis){hooks.hover(move.axis==='Y'?'Height · Y':move.axis==='XZ'?'Move on ground · X/Z':'Move · '+move.axis);return move;}}
  if(rotate.object){rotate.pointerHover(p);if(rotate.axis){hooks.hover('Turn · drag the outer arc');return rotate;}}
  hooks.hover('');return undefined;
 }
 function finish(e:PointerEvent){if(!drag||e.pointerId!==activePointer)return;
  if(drag!=='scale')drag.pointerUp(pointer(e,0));drag=undefined;activePointer=undefined;
  if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);hooks.end();e.stopImmediatePropagation();
 }
 canvas.addEventListener('pointerdown',e=>{
  if(e.button!==0||drag)return;const hit=hover(e);if(!hit)return;drag=hit;activePointer=e.pointerId;startX=e.clientX;startY=e.clientY;startScale.copy(object!.scale);
  hooks.start();canvas.setPointerCapture(e.pointerId);if(hit!=='scale')hit.pointerDown(pointer(e));e.preventDefault();e.stopImmediatePropagation();
 },true);
 canvas.addEventListener('pointermove',e=>{
  if(!drag){hover(e);return;}if(e.pointerId!==activePointer)return;
  if(drag==='scale'){
   let x=startScale.x*Math.exp(((e.clientX-startX)-(e.clientY-startY))*.008);if(snap)x=Math.round(x*10)/10;
   // Uniform relative scaling preserves each object's authored proportions.
   const min=.1/Math.min(...startScale.toArray()),max=8/Math.max(...startScale.toArray());object!.scale.copy(startScale).multiplyScalar(T.MathUtils.clamp(x/startScale.x,min,max));hooks.change();
  }else drag.pointerMove(pointer(e,-1));e.stopImmediatePropagation();
 },true);
 canvas.addEventListener('pointerup',finish,true);canvas.addEventListener('pointercancel',finish,true);
 canvas.addEventListener('lostpointercapture',e=>{if(drag)finish(e);},true);
 for(const control of [move,rotate])control.addEventListener('objectChange',hooks.change);
 return {
  attach(o?:T.Object3D){if(drag&&o!==object)finish(new PointerEvent('pointerup',{pointerId:activePointer,button:0}));object=o;attached();},
  configure(t:Tool,s:boolean){if(drag)finish(new PointerEvent('pointerup',{pointerId:activePointer,button:0}));tool=t;snap=s;move.setTranslationSnap(s?.25:null);rotate.setRotationSnap(s?Math.PI/36:null);attached();},
  get dragging(){return !!drag;},
  render(renderer:T.WebGLRenderer){if(!object)return;update();const auto=renderer.autoClear;renderer.autoClear=false;renderer.clearDepth();renderer.render(overlay,camera);renderer.autoClear=auto;}
 };
}
