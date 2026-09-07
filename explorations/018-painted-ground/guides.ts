import * as T from 'three';
/** Screen-sized guide geometry in the same transparent draw order as the sigils.
 * Order 30: foreground guides, above sigils and hands for visibility. */
export class ScreenGuides {
 private positions=new Float32Array(24000*2);private colors=new Float32Array(24000*4);private count=0;
 private geometry=new T.BufferGeometry();private color=new T.Color();private mesh:T.Mesh;
 constructor(scene:T.Scene){
  this.geometry.setAttribute('position',new T.BufferAttribute(this.positions,2).setUsage(T.DynamicDrawUsage));
  // Clip-space XY positions have no Z component; supply a sorting bound
  // rather than letting Three interpret them as world-space XYZ vertices.
  this.geometry.boundingSphere=new T.Sphere(new T.Vector3(),1);
  this.geometry.setAttribute('shade',new T.BufferAttribute(this.colors,4).setUsage(T.DynamicDrawUsage));
  const material=new T.ShaderMaterial({side:T.DoubleSide,transparent:true,depthTest:false,depthWrite:false,toneMapped:false,uniforms:{viewport:{value:new T.Vector2()}},vertexShader:`uniform vec2 viewport; attribute vec4 shade; varying vec4 tint; void main(){tint=shade;gl_Position=vec4(position.x/viewport.x*2.-1.,1.-position.y/viewport.y*2.,0.,1.);}`,fragmentShader:`varying vec4 tint;void main(){gl_FragColor=tint;
   #include <colorspace_fragment>
  }`});
  this.mesh=new T.Mesh(this.geometry,material);this.mesh.renderOrder=30;this.mesh.frustumCulled=false;scene.add(this.mesh);
 }
 begin(){this.count=0;}
 private triangle(points:number[],color:string,alpha:number){if(this.count+3>this.positions.length/2)throw Error('Guide vertex capacity exceeded');this.color.set(color);
  for(let i=0;i<3;i++){this.positions.set(points.slice(i*2,i*2+2),this.count*2);this.colors.set([this.color.r,this.color.g,this.color.b,alpha],this.count*4);this.count++;}}
 private line(x:number,y:number,u:number,v:number,width:number,color:string,alpha:number){const length=Math.hypot(u-x,v-y);if(length<.01)return;const nx=-(v-y)/length*width/2,ny=(u-x)/length*width/2;
  this.triangle([x+nx,y+ny,x-nx,y-ny,u+nx,v+ny],color,alpha);this.triangle([x-nx,y-ny,u-nx,v-ny,u+nx,v+ny],color,alpha);}
 private disc(x:number,y:number,r:number,color:string,alpha:number){for(let i=0;i<24;i++){const a=i/24*Math.PI*2,b=(i+1)/24*Math.PI*2;this.triangle([x,y,x+Math.cos(a)*r,y+Math.sin(a)*r,x+Math.cos(b)*r,y+Math.sin(b)*r],color,alpha);}}
 add(name:string,a:Record<string,string|number>){const opacity=Number(a.opacity??1);
  if(name==='circle'){const x=+a.cx,y=+a.cy,r=+a.r,w=Number(a['stroke-width']??0);if(a['data-role']==='destination'){for(let j=3;j>0;j--)this.disc(x,y,r+j*2,String(a.fill),opacity*.035);}
   if(a.stroke)this.disc(x,y,r+w/2,String(a.stroke),opacity);this.disc(x,y,Math.max(0,r-w/2),String(a.fill),opacity);}
  else if(name==='path'){
   // Current guide vocabulary is exclusively M x y L x y. Keep this explicit;
   // curved guides should supply their own tessellation rather than silently parse.
   const nums=String(a.d).match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number);if(!nums||nums.length!==4)throw Error('Unsupported guide path');
   const [x,y,u,v]=nums,width=Number(a['stroke-width']??1),color=String(a.stroke),length=Math.hypot(u-x,v-y);
   if(a['stroke-dasharray']&&a['stroke-dasharray']!=='none'){for(let s=0;s<length;s+=9){const e=Math.min(length,s+4);this.line(x+(u-x)*s/length,y+(v-y)*s/length,x+(u-x)*e/length,y+(v-y)*e/length,width,color,opacity);}}
   else this.line(x,y,u,v,width,color,opacity);
  }
 }
 finish(visible:boolean){this.geometry.setDrawRange(0,this.count);this.geometry.attributes.position.needsUpdate=true;this.geometry.attributes.shade.needsUpdate=true;(this.mesh.material as T.ShaderMaterial).uniforms.viewport.value.set(innerWidth,innerHeight);this.mesh.visible=visible;}
}
