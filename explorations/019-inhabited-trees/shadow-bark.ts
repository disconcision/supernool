import * as T from 'three';
// Extends the existing carved normals; the energy does not replace their shading.
export function addBarkEnergy(mat:T.MeshStandardMaterial|T.MeshToonMaterial){
 const previous=mat.onBeforeCompile,oldKey=mat.customProgramCacheKey.bind(mat);
 const u={barkClock:{value:0},barkPower:{value:0},barkTint:{value:new T.Color()},barkFlow:{value:.5}};
 mat.onBeforeCompile=(s,r)=>{previous(s,r);Object.assign(s.uniforms,u);s.vertexShader='varying vec3 stormWorld;\n'+s.vertexShader;s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n stormWorld=(modelMatrix*vec4(transformed,1.)).xyz;');
 s.fragmentShader='varying vec3 stormWorld;uniform float barkClock,barkPower,barkFlow;uniform vec3 barkTint;\n'+s.fragmentShader;
 s.fragmentShader=s.fragmentShader.replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
 // Orthographic view direction is constant; normal is already the hewn face normal.
 float edgeEnergy=pow(1.-abs(dot(normal,(isOrthographic?vec3(0.,0.,1.):normalize(vViewPosition)))),2.4);
 float stream=sin(stormWorld.y*2.8-barkClock*.55+sin(stormWorld.x*3.1+stormWorld.z*2.7)*1.3);
 float thread=pow(.5+.5*sin(stormWorld.x*13.+stormWorld.z*10.+stream*1.6),7.);
 float flow=mix(1.,.62+.3*stream+.35*thread,barkFlow);
 totalEmissiveRadiance+=barkTint*barkPower*(edgeEnergy*1.65+.06*thread*barkFlow)*flow;
 `);
 };mat.customProgramCacheKey=()=>oldKey()+'-storm-bark-v1';return u;
}
