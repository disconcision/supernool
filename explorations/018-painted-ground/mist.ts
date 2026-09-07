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
 const material=new T.ShaderMaterial({uniforms,depthTest:false,depthWrite:false,toneMapped:false,
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
    vec2 drift=vec2(mistTime*.12,mistTime*.045);
    vec2 p=world.xz-drift;
    // Broad moving banks with a finer, slower counter-drift. No screen-space grain.
    float broad=noise(p*.15+vec2(2.7,8.1));
    float detail=noise(p*.39+vec2(-mistTime*.022,3.4));
    float wisp=broad*.72+detail*.28;
    float radius=length(world.xz);
    float edge=(broad-.5)*3.2*textureAmount;
    float envelope=smoothstep(startRadius-1.,startRadius+21.,radius+edge);
    float texture=mix(1.,.45+1.05*wisp,textureAmount);
    float amount=clamp(envelope*strength*texture,0.,.9);
    // Empty background pixels have no surface to anchor the mist to.
    if(depth>=.999999)amount=0.;
    gl_FragColor=vec4(mix(color.rgb,mistColor,amount),color.a);
    #include <colorspace_fragment>
   }`
 });
 const screen=new T.Scene(),camera=new T.Camera();
 const quad=new T.Mesh(new T.PlaneGeometry(2,2),material);quad.frustumCulled=false;screen.add(quad);
 let time=0;
 return {
  render(scene:T.Scene,view:T.Camera,dt:number,settings:{enabled:boolean;strength:number;radius:number;texture:number;speed:number}){
   if(!settings.enabled||settings.strength===0){renderer.render(scene,view);return;}
   time+=dt*settings.speed;uniforms.mistTime.value=time;
   uniforms.strength.value=settings.strength;uniforms.startRadius.value=settings.radius;uniforms.textureAmount.value=settings.texture;
   renderer.getDrawingBufferSize(size);if(target.width!==size.x||target.height!==size.y)target.setSize(size.x,size.y);
   uniforms.inverseProjection.value.copy(view.projectionMatrixInverse);uniforms.cameraWorld.value.copy(view.matrixWorld);
   const previous=renderer.getRenderTarget(),autoReset=renderer.info.autoReset;
   renderer.info.autoReset=false;renderer.info.reset();
   renderer.setRenderTarget(target);renderer.render(scene,view);
   renderer.setRenderTarget(previous);renderer.render(screen,camera);
   renderer.info.autoReset=autoReset;
  }
 };
}
