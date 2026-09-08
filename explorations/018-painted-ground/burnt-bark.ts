import * as T from 'three';
import type {Pose} from './layout';

/** Material study: keeps the existing mesh and hewn normals. Procedural colour
 * is sampled in world space; branch-attached UVs remain future work. */
export function createBurntBark(materials:(T.MeshStandardMaterial|T.MeshToonMaterial)[]){
 const u={charAmount:{value:0},charTexture:{value:1},charBase:{value:.018},charTip:{value:.16},charStart:{value:.4},charTop:{value:16},charScale:{value:3},charCracks:{value:.35},charSheen:{value:.35}};
 const code=`
 varying vec3 charWorld;
 uniform float charAmount,charTexture,charBase,charTip,charStart,charTop,charScale,charCracks,charSheen;
 float charHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 vec2 charPlate(vec2 p){
  p.x+=.32*sin(p.y*1.8)+.17*sin(p.y*3.3);p.y+=.16*sin(p.x*2.1);
  vec2 cell=floor(p),f=fract(p);float gap=min(min(f.x,1.-f.x),min(f.y,1.-f.y));
  float aa=max(.005,fwidth(gap));float line=1.-smoothstep(.022,.022+aa,gap);
  return vec2(line,charHash(cell));
 }
 vec2 charSurface(vec3 p){
  vec3 w=pow(abs(normalize(cross(dFdx(p),dFdy(p)))),vec3(4.));w/=max(.001,w.x+w.y+w.z);
  return charPlate(p.zy*vec2(1.,.32))*w.x+charPlate(p.xz)*w.y+charPlate(p.xy*vec2(1.,.32))*w.z;
 }
 `;
 for(const mat of materials){
 const previous=mat.onBeforeCompile,oldKey=mat.customProgramCacheKey.bind(mat);
 mat.onBeforeCompile=(s,r)=>{previous(s,r);Object.assign(s.uniforms,u);
 s.vertexShader='varying vec3 charWorld;\n'+s.vertexShader;
 s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ncharWorld=(modelMatrix*vec4(transformed,1.)).xyz;');
 s.fragmentShader=code+s.fragmentShader;
 s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
 float ash=smoothstep(charStart,1.,clamp(charWorld.y/max(1.,charTop),0.,1.));
 vec2 flakes=charSurface((charWorld-vec3(-1.,0.,-3.))*charScale);
 float gray=mix(charBase,charTip,ash);
 float variation=mix(1.,.78+.38*flakes.y,charTexture);
 vec3 charColour=vec3(gray)*vec3(.98,1.,1.025)*variation;
 charColour*=1.-flakes.x*charCracks*charTexture*.85;
 diffuseColor.rgb=mix(diffuseColor.rgb,charColour,charAmount);`);
 // Standard materials have physical specular highlights. The toon alternative
 // remains band-shaded and deliberately omits this extra specular response.
 s.fragmentShader=s.fragmentShader.replace('#include <roughnessmap_fragment>',`#include <roughnessmap_fragment>
 roughnessFactor=mix(roughnessFactor,mix(.96,.22,charSheen)+flakes.x*.1*charTexture,charAmount);`);
 };mat.customProgramCacheKey=()=>oldKey()+'-charred-bark-v1';mat.needsUpdate=true;
 }
 let root:HTMLElement;
 const get=(id:string)=>(document.getElementById(id) as HTMLInputElement|HTMLSelectElement);
 function mount(host:HTMLElement){
 root=document.createElement('details');root.id='burntBarkStudy';
 const range=(id:string,label:string,min:number,max:number,step:number,value:number)=>`<label>${label}<input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
 root.innerHTML=`<summary>Burnt bark · material study</summary><p>Existing wood, solid charcoal, or a restrained char-plate texture. Shape and hewn edges stay the same.</p>
 <label>Bark treatment<select id="charMode"><option value="off">Original wood</option><option value="solid">Solid charcoal</option><option value="texture" selected>Textured charcoal</option></select></label>
 ${range('charStrength','Burn amount',0,1,.01,1)}${range('charBase','Base brightness',.002,.12,.002,.018)}${range('charTip','Upper ash brightness',.025,.4,.005,.16)}${range('charStart','Ash starts up tree',0,.9,.05,.4)}${range('charDetail','Texture amount',0,1,.05,.65)}${range('charScale','Char plate frequency',.5,8,.25,3)}${range('charCracks','Crack darkness',0,1,.05,.35)}${range('charSheen','Burnt sheen',0,1,.05,.35)}
 <p>Sheen uses the studio lighting material. The cel alternatives retain their banded shading. Texture affects colour and roughness, not silhouette.</p>
 <button type="button" id="charQuiet">Quiet burnt-tree preview</button> <button type="button" id="charSpirit">Show spirit again</button><p>These buttons switch the existing shadow spirit off/on; your other spirit settings stay intact.</p>`;
 host.append(root);
 get('charMode').value=new URLSearchParams(location.search).get('inhabited')==='1'?'texture':'off';
 for(const [id,value]of [['charQuiet','off'],['charSpirit','on']])document.getElementById(id)!.onclick=()=>{get('spiritMode').value=value;get('spiritMode').dispatchEvent(new Event('change',{bubbles:true}));};
 }
 function update(p:Pose|undefined,scale:number){if(!root)return;const v=(id:string)=>+get(id).value;
 u.charAmount.value=get('charMode').value==='off'?0:v('charStrength');u.charTexture.value=get('charMode').value==='texture'?v('charDetail'):0;
 for(const id of ['charBase','charTip','charStart','charScale','charCracks','charSheen'] as const)u[id].value=v(id);
 if(p)u.charTop.value=Math.max(1,...[...p.points.values()].map(q=>q.y*scale));
 }
 return {mount,update};
}
