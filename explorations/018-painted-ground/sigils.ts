import * as T from 'three';
import {sigil as legacy} from './legacy-sigils';
const cache=new Map<string,T.BufferGeometry>();
const poly=(points:number[][])=>new T.Shape(points.map(([x,y])=>new T.Vector2(x,y)));
function bar(ax:number,ay:number,bx:number,by:number,w=.09){const d=new T.Vector2(bx-ax,by-ay).normalize().multiplyScalar(w/2);return poly([[ax-d.y,ay+d.x],[bx-d.y,by+d.x],[bx+d.y,by-d.x],[ax+d.y,ay-d.x]]);}
function glyph(char:string){
 const found=cache.get(char);if(found)return found;
 let shapes:T.Shape[]=[];
 if(char==='0'){const s=new T.Shape();s.absellipse(0,0,.22,.35,0,Math.PI*2,false,0);const hole=new T.Path();hole.absellipse(0,0,.125,.25,0,Math.PI*2,true,0);s.holes.push(hole);shapes=[s];}
 else if(char==='+')shapes=[poly([[-.31,-.055],[-.055,-.055],[-.055,-.31],[.055,-.31],[.055,-.055],[.31,-.055],[.31,.055],[.055,.055],[.055,.31],[-.055,.31],[-.055,.055],[-.31,.055]])];
 else if(char==='×'||char==='x')shapes=[bar(-.23,-.29,.23,.29),bar(-.23,.29,.23,-.29)];
 else if(char==='y')shapes=[bar(-.22,.31,.015,-.015),bar(.23,.31,-.2,-.34)];
 else if(char==='2')shapes=[poly([[-.23,.23],[-.14,.34],[.14,.34],[.24,.24],[.24,.11],[.14,.005],[-.12,-.24],[.24,-.24],[.24,-.34],[-.24,-.34],[-.24,-.24],[.08,.055],[.14,.14],[.14,.2],[.09,.24],[-.09,.24],[-.15,.17]])];
 else if(char==='3')shapes=[poly([[-.22,.32],[.13,.32],[.24,.22],[.24,.09],[.16,0],[.24,-.1],[.24,-.24],[.13,-.34],[-.22,-.34],[-.22,-.24],[.09,-.24],[.14,-.2],[.14,-.13],[.09,-.055],[-.09,-.055],[-.09,.045],[.08,.045],[.14,.11],[.14,.18],[.09,.22],[-.22,.22]])];
 else if(char==='5')shapes=[poly([[.24,.33],[-.23,.33],[-.23,-.02],[.1,-.02],[.15,-.08],[.15,-.2],[.1,-.25],[-.22,-.25],[-.22,-.35],[.14,-.35],[.25,-.25],[.25,-.05],[.14,.08],[-.13,.08],[-.13,.23],[.24,.23]])];
 else {
 const segments=[bar(-.18,.3,.18,.3),bar(.2,.27,.2,.03),bar(.2,-.03,.2,-.27),bar(-.18,-.3,.18,-.3),bar(-.2,-.27,-.2,-.03),bar(-.2,.03,-.2,.27),bar(-.18,0,.18,0)];
 const codes:Record<string,number[]>={'1':[1,2],'4':[1,2,5,6],'6':[0,2,3,4,5,6],'7':[0,1,2],'8':[0,1,2,3,4,5,6],'9':[0,1,2,3,5,6],'-':[6]};shapes=(codes[char]??[6]).map(i=>segments[i]);
 }
 const g=new T.ExtrudeGeometry(shapes,{depth:.085,bevelEnabled:true,bevelSize:.014,bevelThickness:.012,bevelSegments:1,curveSegments:12,steps:1});cache.set(char,g);return g;
}
const auraGeometry=new T.PlaneGeometry(1.8,1.8);
const ring=new T.TorusGeometry(.43,.024,5,32),setting=new T.CylinderGeometry(.45,.45,.07,12),hit=new T.PlaneGeometry(.95,1.05);
setting.rotateX(Math.PI/2);
export function makeSigil(text:string,operator:boolean,selected:boolean,mode:string){
 const group=new T.Group();
 const aura=new T.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,blending:T.AdditiveBlending,toneMapped:false,uniforms:{tint:{value:new T.Color('#b6eff0')},strength:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 vUv;uniform vec3 tint;uniform float strength;void main(){float r=length(vUv-.5)*2.;float a=pow(max(0.,1.-r),2.)*strength;gl_FragColor=vec4(tint,a); #include <colorspace_fragment> }'.replace(' #include','\n #include').replace('> }','>\n }')});
 const halo=new T.Mesh(auraGeometry,aura);halo.visible=false;group.userData.halo=halo;halo.raycast=()=>{};halo.renderOrder=8;halo.position.z=-.03;group.add(halo);group.userData.aura=aura;

 if(mode==='legacy'){const s=new T.Sprite(legacy(text,operator,selected,false));s.renderOrder=10;group.add(s);return group;}
 function mat(color:string,metalness=.1){return new T.MeshStandardMaterial({color,metalness,roughness:.65,depthTest:false,depthWrite:false,transparent:true});}
 const front=mat(operator?'#f2cb82':selected?'#fff0ba':'#eee5c5',operator?.5:.12),edge=mat(operator?'#755035':'#536c5a',.25);
 function add(g:T.BufferGeometry,m:T.Material|T.Material[],z:number){const mesh=new T.Mesh(g,m);mesh.position.z=z;mesh.renderOrder=11;group.add(mesh);return mesh;}
 if(operator){add(setting,mat('#394e49',.55),-.10).renderOrder=9;add(ring,mat(selected?'#ffe4a0':'#ad8d58',.6),-.03).renderOrder=10;}
 else if(mode==='layered'){const disk=add(setting,mat('#54766c',.2),-.13);disk.scale.set(.86,.86,1);disk.renderOrder=9;}
 for(const [i,char] of [...text].entries()){const mesh=add(glyph(char),[front,edge],.025);mesh.position.x=(i-(text.length-1)/2)*.52;}
 const glyphScale=text.length>1?.85:1;group.children.forEach(c=>{if(c.renderOrder===11)c.scale.setScalar(glyphScale);});
 const target=add(hit,new T.MeshBasicMaterial({transparent:true,opacity:0,depthTest:false,depthWrite:false}),.13);target.userData.hitTarget=true;
 group.userData.front=front;return group;
}
export function disposeSigil(group:T.Object3D){const materials=new Set<T.Material>();group.traverse(o=>{if(o instanceof T.Mesh||o instanceof T.Sprite){for(const m of Array.isArray(o.material)?o.material:[o.material])materials.add(m);}});materials.forEach(m=>m.dispose());}
