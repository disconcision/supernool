import * as T from 'three';
/** A camera-facing matte painting, not a 360-degree skybox. Kept outside the
 * WebGL mesh path: one composited image and a low-cost edge feather. */
export function addBackdrop(scene:T.Scene,world:HTMLElement,renderer:T.WebGLRenderer){
 const painting=new Image();painting.className='world-matte';painting.alt='';painting.setAttribute('aria-hidden','true');painting.src=new URL('./assets/elevated-uplands-v2.png',import.meta.url).href;world.prepend(painting);
 world.style.backgroundColor='#bac7c1';renderer.setClearColor('#bac7c1',0);
 const geometry=new T.RingGeometry(15.5,18.5,96,8);geometry.rotateX(-Math.PI/2);const p=geometry.getAttribute('position'),alpha=[];
 for(let i=0;i<p.count;i++){const r=Math.hypot(p.getX(i),p.getZ(i)),a=T.MathUtils.clamp((18.5-r)/(18.5-16.8),0,1);alpha.push(a*a*(3-2*a));}
 geometry.setAttribute('edgeAlpha',new T.Float32BufferAttribute(alpha,1));
 const material=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,uniforms:{tint:{value:new T.Color('#9ca07e')}},vertexShader:'attribute float edgeAlpha; varying float opacity; void main(){opacity=edgeAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'uniform vec3 tint; varying float opacity; void main(){gl_FragColor=vec4(tint,opacity);\n #include <tonemapping_fragment>\n #include <colorspace_fragment>\n}'});
 // The feather sits beneath the playable ground; no collisions or pick targets.
 const feather=new T.Mesh(geometry,material);feather.position.y=-.08;scene.add(feather);
 const status=document.getElementById('backdropStatus')!;
 painting.onload=()=>status.textContent='Elevated hills & cliffs · background only';painting.onerror=()=>{status.textContent='Painting unavailable; using the plain background.';painting.style.display='none';feather.visible=false;};
 return {set(mode:string){const show=mode!=='plain';painting.style.display=show?'block':'none';feather.visible=show;painting.style.opacity=mode==='soft'?'.6':'1';}};
}
