import * as T from 'three';

type Foot={x:number;z:number;r:number};
type Placement={x:number;z:number;scale:number;angle:number};
export const groundDecalGLSL=`
uniform sampler2D scorchMask, footingMask;
uniform vec4 scorchPose;
uniform vec4 groundDecalAmounts;
float groundChar = 0.;
vec3 groundDecals(vec3 base, vec3 world){
 vec2 d=(world.xz-scorchPose.xy)/scorchPose.z;
 float a=scorchPose.w;
 vec2 uv=mat2(cos(a),-sin(a),sin(a),cos(a))*d+vec2(.5);
 // Generated masks are white outside. Reject faint background noise and keep
 // an explicit zero border: no checkerboard removal or inferred PNG alpha.
 float inside=step(0.,uv.x)*step(uv.x,1.)*step(0.,uv.y)*step(uv.y,1.);
 float burn=smoothstep(.06,.95,1.-texture2D(scorchMask,clamp(uv,0.,1.)).r)*inside;
 vec2 fuv=(world.xz+vec2(32.))/64.;
 float fi=step(0.,fuv.x)*step(fuv.x,1.)*step(0.,fuv.y)*step(fuv.y,1.);
 float foot=smoothstep(.06,.9,1.-texture2D(footingMask,clamp(fuv,0.,1.)).r)*fi;
 base=mix(base,base*vec3(.46,.40,.32),foot*groundDecalAmounts.y);
 groundChar=burn*groundDecalAmounts.x*(1.-groundDecalAmounts.z);
 base=mix(base,vec3(.023,.022,.021),groundChar);
 return base;
}`;

/** Two texture reads in the existing terrain pass. Rock stamps are composed
 * once per layout/edit, not every frame. This is footprint artwork, not AO. */
export function createGroundDecals(){
 const white=new T.DataTexture(new Uint8Array([255,255,255,255]),1,1);white.needsUpdate=true;
 const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;
 const ctx=canvas.getContext('2d')!;ctx.fillStyle='white';ctx.fillRect(0,0,1024,1024);
 const composed=new T.CanvasTexture(canvas);composed.flipY=false;
 const uniforms={scorchMask:{value:white as T.Texture},footingMask:{value:composed},scorchPose:{value:new T.Vector4(-1,-3,34,0)},groundDecalAmounts:{value:new T.Vector4(0,0,0,0)}};
 let atlas:HTMLImageElement|undefined,loaded=0,failed=false,root:HTMLElement|undefined,lastKey='',lastFootKey='',rawKey='';let feet:Foot[]=[];
 const loader=new T.TextureLoader();
 loader.load(new URL('./assets/ground-decals/scorch-mask.png',import.meta.url).href,t=>{t.colorSpace=T.NoColorSpace;t.flipY=false;uniforms.scorchMask.value=t;loaded++;report();},undefined,()=>{failed=true;report();});
 loader.load(new URL('./assets/ground-decals/footing-masks.png',import.meta.url).href,t=>{atlas=t.image;loaded++;t.dispose();report();},undefined,()=>{failed=true;report();});
 const input=(id:string)=>root!.querySelector<HTMLInputElement|HTMLSelectElement>('#'+id)!;
 const val=(id:string)=>input(id).value;
 function report(){if(root){const s=root.querySelector<HTMLElement>('#groundDecalStatus')!;s.textContent=failed?'A decal texture failed to load; reload to retry.':loaded===2?'Generated masks ready · ground material layers':'Loading decal masks…';s.dataset.ready=String(loaded===2);}}
 function placements():Record<string,Placement>{try{return JSON.parse(val('groundFootPlacements'))||{};}catch{return {};}}
 function selected(){const p=placements()[val('groundFootSelect')];return p||{x:0,z:0,scale:1,angle:0};}
 function syncEdit(){const p=selected();for(const [key,id] of [['x','groundFootX'],['z','groundFootZ'],['scale','groundFootSize'],['angle','groundFootAngle']] as const){input(id).value=String(p[key]);input(id).dispatchEvent(new Event('input',{bubbles:true}));}}
 let syncing=false;
 function edit(){if(syncing)return;const all=placements();all[val('groundFootSelect')]={x:+val('groundFootX'),z:+val('groundFootZ'),scale:+val('groundFootSize'),angle:+val('groundFootAngle')};input('groundFootPlacements').value=JSON.stringify(all);input('groundFootPlacements').dispatchEvent(new Event('change',{bubbles:true}));}
 function mount(host:HTMLElement){
 root=document.createElement('details');root.id='groundDecalStudy';
 const range=(id:string,name:string,min:number,max:number,step:number,value:number)=>`<label>${name}<input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}"></label>`;
 root.innerHTML=`<summary>Ground decals · comparison</summary><p>Generated scorch and broad earth beneath the rocks. Each layer is independent; the painting stays intact.</p>
 <div><button type="button" id="groundDecalsOff">Before</button> <button type="button" id="groundDecalsBoth">Both layers</button></div>
 <label>Scorch<select id="groundScorch"><option value="off">Off</option><option value="on">On</option></select></label>
 ${range('groundScorchOpacity','Scorch strength',0,1,.01,.88)}
 <details><summary>Place scorch</summary>${range('groundScorchX','Ground X',-20,20,.1,-1)}${range('groundScorchZ','Ground Z',-20,20,.1,-3)}${range('groundScorchSize','Footprint width',12,60,.5,34)}${range('groundScorchAngle','Rotation',-180,180,1,0)}</details>
 <label>Rock footing<select id="groundFooting"><option value="off">Off</option><option value="on">On</option></select></label>
 <label>Footing shapes<select id="groundFootShape"><option value="mixed">Mixed</option><option value="0">Soft earth</option><option value="1">Long bank</option><option value="2">Broken edge</option></select></label>
 ${range('groundFootOpacity','Footing strength',0,1,.01,.45)}${range('groundFootSpread','Footing spread',.7,3,.05,1.4)}
 <details><summary>Place individual footings</summary><p>Choose a footprint, then offset or resize its ground mark. Coordinates stay attached to that rock layout.</p><label>Footprint<select id="groundFootSelect"></select></label>${range('groundFootX','Offset X',-5,5,.1,0)}${range('groundFootZ','Offset Z',-5,5,.1,0)}${range('groundFootSize','Local scale',0,3,.05,1)}${range('groundFootAngle','Local rotation',-180,180,1,0)}<button type="button" id="groundFeetReset">Reset footing placements</button><input id="groundFootPlacements" type="hidden" data-preset-json="true" value="{}"></details>
 <details><summary>Ground-state preview</summary><p>Only the scorch changes here. Dormant/active retain it; recovery fades it. Tree, canopy and puzzle are unchanged.</p><label>Ground state<select id="groundDecalState"><option value="burnt">Dormant / active</option><option value="recovery">Recovering</option><option value="healthy">Healthy</option></select></label>${range('groundRecovery','Recovery fade',0,1,.01,.5)}</details><small id="groundDecalStatus" role="status"></small>`;
 host.append(root);report();
 for(const id of ['groundFootSelect','groundFootX','groundFootZ','groundFootSize','groundFootAngle'])input(id).dataset.transient='true';
 input('groundFootPlacements').addEventListener('change',()=>{syncing=true;syncEdit();syncing=false;});
 root.querySelector('#groundFeetReset')!.addEventListener('click',()=>{input('groundFootPlacements').value='{}';input('groundFootPlacements').dispatchEvent(new Event('change',{bubbles:true}));});
 input('groundFootSelect').addEventListener('change',()=>{syncing=true;syncEdit();syncing=false;});
 for(const id of ['groundFootX','groundFootZ','groundFootSize','groundFootAngle'])input(id).addEventListener('input',edit);
 root.querySelector('#groundDecalsOff')!.addEventListener('click',()=>{for(const id of ['groundScorch','groundFooting']){input(id).value='off';input(id).dispatchEvent(new Event('change',{bubbles:true}));}});
 root.querySelector('#groundDecalsBoth')!.addEventListener('click',()=>{for(const id of ['groundScorch','groundFooting']){input(id).value='on';input(id).dispatchEvent(new Event('change',{bubbles:true}));}});
 }
 function update(rawFeet:Foot[]){
 if(!root)return;
 const state=val('groundDecalState');uniforms.groundDecalAmounts.value.set(val('groundScorch')==='on'?+val('groundScorchOpacity'):0,val('groundFooting')==='on'?+val('groundFootOpacity'):0,state==='healthy'?1:state==='recovery'?+val('groundRecovery'):0,0);
 uniforms.scorchPose.value.set(+val('groundScorchX'),+val('groundScorchZ'),+val('groundScorchSize'),+val('groundScorchAngle')*Math.PI/180);
 const layout=(document.getElementById('rockLayout') as HTMLSelectElement)?.value||'original';
 const footKey=layout+':'+rawFeet.map(f=>[f.x.toFixed(2),f.z.toFixed(2),f.r.toFixed(2)].join(',')).join(';');
 if(rawKey!==footKey){rawKey=footKey;feet=[];for(const f of [...rawFeet].sort((a,b)=>b.r-a.r))if(!feet.some(g=>Math.hypot(f.x-g.x,f.z-g.z)<.85*(f.r+g.r)))feet.push({...f});}
 if(footKey!==lastFootKey){lastFootKey=footKey;const old=val('groundFootSelect');input('groundFootSelect').innerHTML=feet.map((f,i)=>`<option value="${layout}:${i}">${i+1} · x ${f.x.toFixed(1)}, z ${f.z.toFixed(1)}</option>`).join('');if([... (input('groundFootSelect') as HTMLSelectElement).options].some(o=>o.value===old))input('groundFootSelect').value=old;syncing=true;syncEdit();syncing=false;}
 if(!atlas)return;
 const key=[footKey,val('groundFootSpread'),val('groundFootShape'),val('groundFootPlacements')].join('|');if(key===lastKey)return;lastKey=key;
 ctx.globalCompositeOperation='source-over';ctx.fillStyle='white';ctx.fillRect(0,0,1024,1024);ctx.globalCompositeOperation='multiply';
 const all=placements(),px=1024/64;
 feet.forEach((f,i)=>{const p=all[layout+':'+i]||{x:0,z:0,scale:1,angle:0};if(![p.x,p.z,p.scale,p.angle].every(Number.isFinite))return;
 const shape=val('groundFootShape')==='mixed'?i%3:+val('groundFootShape');const w=f.r*2.9*(+val('groundFootSpread'))*Math.max(0,p.scale)*px;
 ctx.save();ctx.translate((f.x+p.x+32)*px,(f.z+p.z+32)*px);ctx.rotate((i*2.399)+(p.angle*Math.PI/180));
 // Source cells are rectangular in the generated atlas; retain their aspect.
 const sw=atlas!.width/3,sh=atlas!.height;ctx.drawImage(atlas!,shape*sw,0,sw,sh,-w/2,-w*sh/sw/2,w,w*sh/sw);ctx.restore();});
 composed.needsUpdate=true;
 }
 return {uniforms,mount,update};
}
