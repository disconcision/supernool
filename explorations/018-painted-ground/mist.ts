import * as T from 'three';

/** A depth-aware atmospheric wash. World-anchored noise drifts past the clearing;
 * it is not volumetric lighting or a particle/physics simulation. */
export function createMist(renderer:T.WebGLRenderer){
 const size=new T.Vector2();
 const target=new T.WebGLRenderTarget(1,1,{
  minFilter:T.LinearFilter,magFilter:T.LinearFilter,
  depthTexture:new T.DepthTexture(1,1,T.UnsignedIntType),
  samples:Math.min(4,renderer.capabilities.maxSamples)
 });
 const uniforms={
  sceneColor:{value:target.texture},sceneDepth:{value:target.depthTexture},
  inverseProjection:{value:new T.Matrix4()},cameraWorld:{value:new T.Matrix4()},
  mistTime:{value:0},strength:{value:.62},startRadius:{value:10.5},textureAmount:{value:.65},
  mistColor:{value:new T.Color('#c5cfc5')}
 };
 // Restore world depth along with its fogged color, so the later hands still
 // disappear behind real rocks/branches. A color-only composite loses that depth.
 const material=new T.ShaderMaterial({uniforms,depthTest:true,depthFunc:T.AlwaysDepth,depthWrite:true,toneMapped:false,
  vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
  fragmentShader:`
   varying vec2 vUv;
   uniform sampler2D sceneColor,sceneDepth;
   uniform mat4 inverseProjection,cameraWorld;
   uniform float mistTime,strength,startRadius,textureAmount;
   uniform vec3 mistColor;
   float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
   float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
   void main(){
    vec4 color=texture2D(sceneColor,vUv);
    float depth=texture2D(sceneDepth,vUv).x;
    vec4 view=inverseProjection*vec4(vUv*2.-1.,depth*2.-1.,1.);
    vec3 world=(cameraWorld*vec4(view.xyz/view.w,1.)).xyz;
    vec2 drift=vec2(mistTime*.35,mistTime*.13);
    vec2 p=world.xz-drift;
    // Broad moving banks with a finer, slower counter-drift. No screen-space grain.
    float broad=noise(p*.15+vec2(2.7,8.1));
    float detail=noise(p*.39+vec2(-mistTime*.065,3.4));
    float wisp=broad*.72+detail*.28;
    float radius=length(world.xz);
    float edge=(broad-.5)*3.2*min(textureAmount,2.);
    float envelope=smoothstep(startRadius-1.,startRadius+21.,radius+edge);
    float texture=clamp(1.+(wisp-.5)*1.7*textureAmount,.08,2.2);
    float amount=clamp(envelope*strength*texture,0.,.9);
    // Empty background pixels have no surface to anchor the mist to.
    if(depth>=.999999)amount=0.;
    gl_FragColor=vec4(mix(color.rgb,mistColor,amount),color.a);
    gl_FragDepth=depth;
    #include <colorspace_fragment>
   }`
 });
 const screen=new T.Scene(),camera=new T.Camera();
 const quad=new T.Mesh(new T.PlaneGeometry(2,2),material);quad.frustumCulled=false;screen.add(quad);
 let time=0;
 return {
  render(scene:T.Scene,view:T.Camera,dt:number,settings:{enabled:boolean;strength:number;radius:number;texture:number;speed:number},drawWorld?:()=>void){
   if((!settings.enabled||settings.strength===0)&&!drawWorld){renderer.render(scene,view);return;}
   time+=dt*settings.speed;uniforms.mistTime.value=time;
   uniforms.strength.value=settings.enabled?settings.strength:0;uniforms.startRadius.value=settings.radius;uniforms.textureAmount.value=settings.texture;
   renderer.getDrawingBufferSize(size);if(target.width!==size.x||target.height!==size.y)target.setSize(size.x,size.y);
   uniforms.inverseProjection.value.copy(view.projectionMatrixInverse);uniforms.cameraWorld.value.copy(view.matrixWorld);
   const previous=renderer.getRenderTarget(),autoReset=renderer.info.autoReset,autoClear=renderer.autoClear;
   const cameraMask=view.layers.mask,background=scene.background,shadowAutoUpdate=renderer.shadowMap.autoUpdate;
   // Explicit overlay roots include sigils, guides, ribbon and tool hands.
   // Keep layer 0 for ordinary rendering/picking and temporarily reserve 31
   // for this pass. Descendants added asynchronously (imported hands) work too.
   const roots:T.Object3D[]=[],layerMasks:[T.Object3D,number][]=[];
   scene.traverseVisible(o=>{if(o.userData.mistOverlay)roots.push(o);});
   const include=(o:T.Object3D)=>{layerMasks.push([o,o.layers.mask]);o.layers.enable(31);};
   roots.forEach(root=>root.traverseVisible(include));
   scene.traverseVisible(o=>{if((o as T.Light).isLight)include(o);});
   renderer.info.autoReset=false;renderer.info.reset();
   try{
    roots.forEach(o=>o.visible=false);
    renderer.setRenderTarget(target);if(drawWorld)drawWorld();else renderer.render(scene,view);
    roots.forEach(o=>o.visible=true);
    renderer.setRenderTarget(previous);renderer.render(screen,camera);
    // Preserve the established sigil → ribbon → hand → guide draw order.
    // These legibility aids intentionally remain clear, rather than inheriting
    // fog computed from whatever landscape happens to lie behind their pixels.
    renderer.autoClear=false;renderer.shadowMap.autoUpdate=false;scene.background=null;view.layers.set(31);
    renderer.render(scene,view);
   }finally{
    roots.forEach(o=>o.visible=true);
    layerMasks.forEach(([o,mask])=>o.layers.mask=mask);
    view.layers.mask=cameraMask;scene.background=background;
    renderer.setRenderTarget(previous);renderer.autoClear=autoClear;renderer.info.autoReset=autoReset;renderer.shadowMap.autoUpdate=shadowAutoUpdate;
   }
  }
 };
}
