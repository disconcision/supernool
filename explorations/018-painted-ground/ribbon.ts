import * as T from 'three';
/** Optional visual elasticity on the existing rewrite spring. No force feedback
 * enters the gesture solver: toggling this cannot change reach or acceptance. */
export function createRibbon(scene:T.Scene){
 const segments=36,positions=new Float32Array((segments+1)*6),uvs:number[]=[],indices:number[]=[];
 for(let i=0;i<=segments;i++){uvs.push(i/segments,0,i/segments,1);if(i<segments){const n=i*2;indices.push(n,n+1,n+2,n+1,n+3,n+2);}}
 const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.BufferAttribute(positions,3).setUsage(T.DynamicDrawUsage));geometry.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));geometry.setIndex(indices);
 const material=new T.ShaderMaterial({transparent:true,depthTest:false,depthWrite:false,side:T.DoubleSide,toneMapped:false,uniforms:{tint:{value:new T.Color('#b6eff0')},strength:{value:0},time:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:`varying vec2 vUv;uniform vec3 tint;uniform float strength;uniform float time;void main(){float edge=smoothstep(0.,.3,vUv.y)*smoothstep(0.,.3,1.-vUv.y);float ends=smoothstep(0.,.04,vUv.x)*smoothstep(0.,.04,1.-vUv.x);float wave=.5+.5*sin(vUv.x*37.-time*4.1)*sin(vUv.x*19.+time*3.);
 float pulse=pow(.5+.5*sin(time*2.3),12.);
 float ghost=.6+.22*wave+.16*pulse;
 float distance=abs(vUv.y-.5)*2.;
 float halo=pow(max(0.,1.-distance),2.)*.35;
 float core=1.-smoothstep(.06,.20,distance);
 gl_FragColor=vec4(tint,ends*strength*ghost*(halo+core*.7));
 #include <colorspace_fragment>
 }`});
 const mesh=new T.Mesh(geometry,material);mesh.frustumCulled=false;mesh.renderOrder=15;mesh.visible=false;scene.add(mesh);let opacity=0,taut=0;
 return {update(now:number,dt:number,enabled:boolean,engaged:boolean,from:T.Vector3,to:T.Vector3,camera:T.Camera,lag:number){
  if(!enabled){opacity=0;mesh.visible=false;return;}
  opacity=T.MathUtils.lerp(opacity,engaged?.86:0,1-Math.exp(-dt*12));mesh.visible=opacity>.008;if(!mesh.visible)return;
  taut=T.MathUtils.lerp(taut,engaged?Math.min(1,.22+lag*3):0,1-Math.exp(-dt*14));material.uniforms.strength.value=opacity;material.uniforms.time.value=now*.001;
  const view=new T.Vector3(0,0,1).applyQuaternion(camera.quaternion),across=new T.Vector3(1,0,0).applyQuaternion(camera.quaternion),delta=to.clone().sub(from);
  const point=(u:number)=>from.clone().addScaledVector(delta,u).add(new T.Vector3(0,-Math.sin(Math.PI*u)*(.38*(1-taut)+.06),0)).addScaledVector(across,Math.sin(Math.PI*u)*Math.sin(u*5-now*.002)*.035*(1-taut));
  for(let i=0;i<=segments;i++){const u=i/segments,p=point(u),tangent=point(Math.min(1,u+.01)).sub(point(Math.max(0,u-.01))).normalize();let side=tangent.cross(view);if(side.lengthSq()<.001)side.copy(across);side.normalize();const width=(.15-.045*taut)*(.75+.25*Math.sin(Math.PI*u));
   const a=p.clone().addScaledVector(side,width),b=p.clone().addScaledVector(side,-width);positions.set([a.x,a.y,a.z,b.x,b.y,b.z],i*6);
  }geometry.attributes.position.needsUpdate=true;
 },get visible(){return mesh.visible;}};
}
