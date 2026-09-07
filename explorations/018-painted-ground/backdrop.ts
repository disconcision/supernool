import * as T from 'three';
/** Low relief beyond the playable clearing. Paint is projected onto this actual
 * geometry from a fixed authoring camera, so it moves with the ground. */
export function addBackdrop(scene:T.Scene,world:HTMLElement,renderer:T.WebGLRenderer){
 world.style.backgroundColor='#9ba68f';renderer.setClearColor('#9ba68f',1);
 const localLight={positions:{value:Array.from({length:4},()=>new T.Vector4())},tint:{value:new T.Color()},reach:{value:16},gain:{value:1}};
 const group=new T.Group();scene.add(group);
 const geometry=new T.PlaneGeometry(220,220,128,128);geometry.rotateX(-Math.PI/2);
 const p=geometry.getAttribute('position'),colors:number[]=[];
 const hills=[[-23,-21,8,13,10],[3,-31,13,16,9],[24,-25,11,12,14],[-31,6,7,10,17],[29,8,6,11,17],[-12,-58,16,27,16],[45,-46,15,23,20]];
 for(let i=0;i<p.count;i++){
  const x=p.getX(i),z=p.getZ(i),r=Math.hypot(x,z),ramp=T.MathUtils.smoothstep(r,15.7,24);
  let height=0;for(const [hx,hz,h,sx,sz] of hills)height+=h*Math.exp(-(((x-hx)/sx)**2+((z-hz)/sz)**2));
  // Broad moss shelves with exposed faces, not a ring of separate pillars.
  height=(height*.65+Math.floor(height/2.3)*2.3*.35)*ramp*(1-T.MathUtils.smoothstep((x*13+z*21)/24.7,8,21));
  p.setY(i,height-.075);
  const c=new T.Color('#849070').lerp(new T.Color('#697873'),Math.min(1,height/13)*.55);
  c.multiplyScalar(.97+.025*Math.sin(x*.7+z*.4));colors.push(c.r,c.g,c.b);
 }
 geometry.setAttribute('color',new T.Float32BufferAttribute(colors,3));geometry.computeVertexNormals();
 const reference=new T.OrthographicCamera(-11*16/9,11*16/9,11,-11,.1,250);reference.zoom=.78;reference.updateProjectionMatrix();reference.position.set(13,12,21);reference.lookAt(0,2,0);reference.updateMatrixWorld();
 const uv=[];for(let i=0;i<p.count;i++){const q=new T.Vector3(p.getX(i),p.getY(i),p.getZ(i)).project(reference);uv.push((q.x+1)/2,(q.y+1)/2);}
 geometry.setAttribute('uv',new T.Float32BufferAttribute(uv,2));
 const block=new T.MeshStandardMaterial({vertexColors:true,roughness:1,flatShading:true});
 const terrain=new T.Mesh<T.BufferGeometry,T.Material>(geometry,block);terrain.receiveShadow=true;group.add(terrain);
 // A single shadow receiver follows the painted terrain. The unlit paint shader
 // itself does not evaluate lights or shadow maps.
 const contact=new T.Mesh(geometry,new T.ShadowMaterial({opacity:.30,depthWrite:false}));
 contact.position.y=.012;contact.receiveShadow=true;contact.castShadow=false;contact.renderOrder=1;group.add(contact);
 let shadows=true;
 const status=document.getElementById('backdropStatus')!;status.textContent='Camera-matched terrain blockout';
 let painted:T.Material|undefined,mode='block';
 const capture=new URLSearchParams(location.search).has('matteCapture');
 if(!capture){const loader=new T.TextureLoader();Promise.all([new URL('./assets/clearing-dirt-v6.png',import.meta.url).href,new URL('./assets/clearing-dirt-v5.png',import.meta.url).href].map(url=>loader.loadAsync(url))).then(([map,margin])=>{
  for(const texture of [map,margin]){texture.colorSpace=T.SRGBColorSpace;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());}
  painted=new T.ShaderMaterial({uniforms:{paint:{value:map},marginPaint:{value:margin},localPositions:localLight.positions,localTint:localLight.tint,localReach:localLight.reach,localGain:localLight.gain},vertexShader:`varying vec2 vUv; varying vec3 vColor; varying vec3 vWorld;varying vec3 vGroundNormal; attribute vec3 color;
   void main(){vUv=uv;vColor=color;vWorld=(modelMatrix*vec4(position,1.)).xyz;vGroundNormal=mat3(modelMatrix)*normal;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
   fragmentShader:`uniform sampler2D paint;uniform sampler2D marginPaint;varying vec2 vUv;varying vec3 vColor;varying vec3 vWorld;varying vec3 vGroundNormal;uniform vec4 localPositions[4];uniform vec3 localTint;uniform float localReach,localGain;
   void main(){
    vec2 paintUv=vUv;
    float border=min(min(paintUv.x,1.-paintUv.x),min(paintUv.y,1.-paintUv.y));float a=smoothstep(0.,.025,border);
    // Extra margin has its own projection. Never stretch the detailed central plate.
    vec2 outerUv=vec2(.5)+(vUv-vec2(.5))*(.58/.78);
    float outerBorder=min(min(outerUv.x,1.-outerUv.x),min(outerUv.y,1.-outerUv.y));
    vec3 outer=texture2D(marginPaint,outerUv).rgb;
    float luma=dot(outer,vec3(.2126,.7152,.0722));
    outer=mix(vec3(luma),outer,.55)*vec3(1.5,1.57,1.08);
    outer=mix(vColor,outer,smoothstep(0.,.025,outerBorder));
    vec3 c=mix(outer,texture2D(paint,paintUv).rgb,a);for(int i=0;i<4;i++){vec3 delta=localPositions[i].xyz-vWorld;float d=length(delta),falloff=pow(max(0.,1.-d/localReach),2.)/(1.+d*d*.2);float facing=max(.1,dot(normalize(vGroundNormal),normalize(delta)));c+=c*localTint*localPositions[i].w*falloff*facing*.035*localGain;}
    gl_FragColor=vec4(c,1.);
    #include <colorspace_fragment>
   }`,toneMapped:false});
  if(mode!=='block')terrain.material=painted;status.textContent='Original-scale dirt painting · separate outer margin';
 }).catch(()=>{status.textContent='Terrain blockout · painting unavailable';});}
 return {setLocalLight(lights:{position:T.Vector3;intensity:number}[],tint:T.Color,reach:number,gain:number){localLight.positions.value.forEach((p,i)=>{const l=lights[i];if(l)p.set(l.position.x,l.position.y,l.position.z,l.intensity);else p.w=0;});localLight.tint.value.copy(tint);localLight.reach.value=reach;localLight.gain.value=gain;},setGroundShadows(on:boolean){shadows=on;terrain.receiveShadow=on;contact.visible=on&&mode==='painted';},set(next:string){mode=next;group.visible=next!=='plain';terrain.material=next==='block'||!painted?block:painted;contact.visible=shadows&&next==='painted';}};
}
