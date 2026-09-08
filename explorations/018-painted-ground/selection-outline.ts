import * as T from 'three';

/** A one-CSS-pixel edge of the visible selection mask, composited after atmosphere. */
export function selectionOutline(renderer:T.WebGLRenderer){
 const target=new T.WebGLRenderTarget(1,1,{minFilter:T.NearestFilter,magFilter:T.NearestFilter,samples:4});
 const size=new T.Vector2(),clear=new T.Color();
 const materials=new Map<T.Material,[T.MeshBasicMaterial,T.MeshBasicMaterial]>();
 const quadScene=new T.Scene(),camera=new T.Camera();
 const edge=new T.ShaderMaterial({depthTest:false,depthWrite:false,transparent:true,toneMapped:false,
  uniforms:{mask:{value:target.texture},pixel:{value:new T.Vector2()},ink:{value:new T.Color('#fff0b9')}},
  vertexShader:'varying vec2 uvScreen;void main(){uvScreen=uv;gl_Position=vec4(position.xy,0.,1.);}',
  fragmentShader:`uniform sampler2D mask;uniform vec2 pixel;uniform vec3 ink;varying vec2 uvScreen;
   void main(){float c=texture2D(mask,uvScreen).r;float n=0.;
    for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++)n=max(n,texture2D(mask,uvScreen+vec2(float(x),float(y))*pixel).r);
    gl_FragColor=vec4(ink,max(0.,n-c));#include <colorspace_fragment>}`.replace(';#include',';\n#include')});
 const quad=new T.Mesh(new T.PlaneGeometry(2,2),edge);quad.frustumCulled=false;quadScene.add(quad);
 function maskMaterial(m:T.Material,selected:boolean){
  let pair=materials.get(m);if(!pair){
   const source=m as T.MeshStandardMaterial;
   pair=[0,0xffffff].map(color=>new T.MeshBasicMaterial({color,side:m.side,visible:m.visible,toneMapped:false,
    alphaTest:m.alphaTest,map:m.alphaTest>0?source.map:null,alphaMap:m.alphaTest>0?source.alphaMap:null})) as [T.MeshBasicMaterial,T.MeshBasicMaterial];materials.set(m,pair);
  }return pair[Number(selected)];
 }
 return {render(scene:T.Scene,view:T.Camera,selection?:T.Object3D){
  if(!selection)return;
  renderer.getDrawingBufferSize(size);if(target.width!==size.x||target.height!==size.y)target.setSize(size.x,size.y);
  edge.uniforms.pixel.value.set(renderer.getPixelRatio()/size.x,renderer.getPixelRatio()/size.y);
  const originals:[T.Mesh,T.Material|T.Material[]][]=[],hidden:T.Object3D[]=[];
  const members=new Set<T.Object3D>();selection.traverse(o=>members.add(o));
  scene.traverseVisible(o=>{
   if(o instanceof T.Mesh){
    const source=Array.isArray(o.material)?o.material:[o.material];
    // Transparent overlays/decals do not define the solid selection silhouette.
    if(source.every(m=>!m.visible||m.transparent&&m.alphaTest===0)){hidden.push(o);return;}
    originals.push([o,o.material]);const masked=source.map(m=>maskMaterial(m,members.has(o)));
    o.material=Array.isArray(o.material)?masked:masked[0];
   }else if(o instanceof T.Line||o instanceof T.Points||o instanceof T.Sprite)hidden.push(o);
  });
  const bg=scene.background,fog=scene.fog,rt=renderer.getRenderTarget(),auto=renderer.autoClear,alpha=renderer.getClearAlpha(),shadows=renderer.shadowMap.autoUpdate;
  renderer.getClearColor(clear);scene.background=null;scene.fog=null;hidden.forEach(o=>o.visible=false);
  try{
   renderer.shadowMap.autoUpdate=false;renderer.autoClear=true;renderer.setClearColor(0,0);renderer.setRenderTarget(target);renderer.render(scene,view);
  }finally{
   originals.forEach(([o,m])=>o.material=m);hidden.forEach(o=>o.visible=true);scene.background=bg;scene.fog=fog;
   renderer.setRenderTarget(rt);renderer.setClearColor(clear,alpha);renderer.shadowMap.autoUpdate=shadows;renderer.autoClear=auto;
  }
  renderer.autoClear=false;renderer.render(quadScene,camera);renderer.autoClear=auto;
 }};
}
