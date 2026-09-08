type Values=Record<string,string|boolean>;
type Entry={revision:number;values:Values};
type Control=HTMLInputElement|HTMLSelectElement;
const prefix='supernool-settings-v1:';
const valueOf=(el:Control)=>el instanceof HTMLInputElement&&el.type==='checkbox'?el.checked:el.value;

/** Control preferences only: never a saved tree, grip, avatar position or camera pose. */
export async function setupSettings(scope:string,parent:HTMLElement,selector:string,waitForRocks=false){
 const controls=new Map<string,Control>();
 for(const el of document.querySelectorAll<Control>(selector)){
  if(el.dataset.transient==='true')continue;
  if(el instanceof HTMLInputElement&&['hidden','file','button','submit'].includes(el.type)&&el.dataset.presetJson!=='true')continue;
  const id=el.id||(el.dataset.rule?'rule:'+el.dataset.rule:'');if(id)controls.set(id,el);
 }
 const baseline:Values=Object.fromEntries([...controls].map(([id,el])=>[id,valueOf(el)]));
 if(controls.has('inputMode'))baseline.inputMode='mouse';
 const key=prefix+scope;let applying=false,entry:Entry={revision:0,values:{}},canWrite=false;
 const capture=():Values=>Object.fromEntries([...controls].map(([id,el])=>[id,valueOf(el)]));
 function persist(){if(applying)return;try{sessionStorage.setItem(key,JSON.stringify(capture()));}catch{status.textContent='Browser storage unavailable. Export a preset to keep these settings.';}}
 function valid(el:Control,value:unknown):value is string|boolean{
  if(el instanceof HTMLSelectElement)return typeof value==='string'&&Array.from(el.options).some(o=>o.value===value&&!o.disabled);
  if(el.type==='checkbox')return typeof value==='boolean';
  if(typeof value!=='string')return false;
  if(['range','number'].includes(el.type))return value.trim()!==''&&Number.isFinite(+value)&&(!el.min||+value>=+el.min)&&(!el.max||+value<=+el.max);
  if(el.dataset.presetJson==='true'){if(value.length>32000)return false;try{const data=JSON.parse(value);return data!==null&&typeof data==='object'&&!Array.isArray(data);}catch{return false;}}
  return value.length<=200;
 }
 function apply(values:Values){
  applying=true;const changed:Control[]=[];
  for(const [id,value] of Object.entries(values)){const el=controls.get(id);if(!el||!valid(el,value)||valueOf(el)===value)continue;
   if(el instanceof HTMLInputElement&&el.type==='checkbox')el.checked=value as boolean;else el.value=String(value);changed.push(el);
  }
  // Assign the complete set first, then invoke existing update paths.
  for(const el of changed){el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));}
  // Some controls adjust siblings (scrubbing effect time pauses animation).
  // Reconcile those side effects so the preset's explicit choices win.
  for(const [id,value] of Object.entries(values)){const el=controls.get(id);if(!el||!valid(el,value)||valueOf(el)===value)continue;
   if(el instanceof HTMLInputElement&&el.type==='checkbox')el.checked=value as boolean;else el.value=String(value);
   el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));
  }
  applying=false;
 }
 async function readShared(){
  try{const r=await fetch('/__supernool/defaults',{cache:'no-store',signal:AbortSignal.timeout(4000)});if(!r.ok)throw Error();const all=await r.json();if(all.version!==1)throw Error();canWrite=true;return all.scopes[scope]??{revision:0,values:{}};}
  catch{canWrite=false;const r=await fetch('/settings/app-defaults.json',{cache:'no-store',signal:AbortSignal.timeout(4000)});if(!r.ok)throw Error('App defaults could not be loaded.');const all=await r.json();return all.scopes[scope]??{revision:0,values:{}};}
 }
 document.getElementById('settingsSnapshot')?.remove();
 const panel=document.createElement('details');panel.id='settingsPresets';
 const title=document.createElement('summary');title.textContent='Settings & presets';panel.append(title);
 const help=document.createElement('p');help.textContent='Controls survive reloads in this tab. Reset and save actions apply to the selected set below. Gameplay and camera position are not saved.';panel.append(help);
 const group=document.createElement('select');group.id='presetGroup';group.setAttribute('aria-label','Settings set');group.add(new Option('All controls','all'));
 const shadowIds=[...controls.keys()].filter(id=>id.startsWith('spirit'));
 if(shadowIds.length){group.add(new Option('Shadow & lighting only','shadow'));group.value='shadow';}
 const groundIds=[...controls.keys()].filter(id=>document.getElementById(id)?.closest('#groundDecalStudy'));
 if(groundIds.length)group.add(new Option('Ground decals only','ground'));
 panel.append(group);
 const subset=(values:Values)=>Object.fromEntries(Object.entries(values).filter(([id])=>group.value==='shadow'?shadowIds.includes(id):group.value==='ground'?groundIds.includes(id):true));
 const status=document.createElement('p');status.id='settingsPresetStatus';status.setAttribute('role','status');
 const actions=document.createElement('div');actions.style.cssText='display:flex;flex-wrap:wrap;gap:6px;margin:10px 0';panel.append(actions);
 function button(label:string,fn:()=>void|Promise<void>){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){status.textContent=(e as Error).message;}finally{b.disabled=false;}};actions.append(b);return b;}
 button('Reset to app defaults',async()=>{entry=await readShared();apply(subset({...baseline,...entry.values}));persist();status.textContent=`Reset ${group.selectedOptions[0].text.toLowerCase()} to app defaults (revision ${entry.revision}).`;});
 button('Set as app defaults',async()=>{
  if(!canWrite)throw Error('Saving project defaults needs the local live or frozen server. Export a preset instead.');
  const selected=subset(capture());
  const r=await fetch('/__supernool/defaults',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scope,revision:entry.revision,values:selected})});const result=await r.json();
  if(!r.ok){if(result.current)entry=result.current;throw Error(result.error??'Could not save app defaults.');}
  entry=result;persist();status.textContent=`Saved ${Object.keys(selected).length} controls as project defaults (revision ${entry.revision}). Existing tabs keep their adjustments until reset. This writes public/settings/app-defaults.json; Git commit/push is separate.`;
 });
 const name=document.createElement('input');name.id='presetName';name.placeholder='Preset name';name.setAttribute('aria-label','Preset name');panel.insertBefore(name,actions);
 const saved=document.createElement('select');saved.id='savedPreset';saved.setAttribute('aria-label','Saved preset');panel.insertBefore(saved,actions);
 const libraryKey=key+':presets';
 function library():Record<string,Values>{try{const data=JSON.parse(localStorage.getItem(libraryKey)??'{}');return data&&typeof data==='object'&&!Array.isArray(data)?data:{};}catch{return {};}}
 function refreshLibrary(){saved.replaceChildren();saved.add(new Option('Choose a saved preset',''));for(const n of Object.keys(library()).sort())saved.add(new Option(n,n));}
 refreshLibrary();
 button('Save named preset',()=>{const n=name.value.trim();if(!n||n.length>80)throw Error('Enter a preset name (up to 80 characters).');const all=library();all[n]=subset(capture());localStorage.setItem(libraryKey,JSON.stringify(all));refreshLibrary();saved.value=n;status.textContent='Preset saved in this browser. Export it for a portable copy.';});
 button('Load preset',()=>{const values=library()[saved.value];if(!values)throw Error('Choose a preset first.');apply(subset(values));persist();status.textContent='Preset applied to this tab; project defaults unchanged.';});
 button('Delete preset',()=>{const n=saved.value;if(!n)throw Error('Choose a preset first.');const all=library();delete all[n];localStorage.setItem(libraryKey,JSON.stringify(all));refreshLibrary();status.textContent='Named preset deleted. Current controls and project defaults unchanged.';});
 button('Export preset',()=>{const data={version:1,scope,name:name.value.trim()||'Untitled',capturedAt:new Date().toISOString(),values:subset(capture())};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`supernool-${scope}-preset.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Exported a portable preset. Project defaults unchanged.';});
 const upload=document.createElement('input');upload.type='file';upload.accept='.json,application/json';upload.id='importPresetFile';upload.setAttribute('aria-label','Import preset JSON');
 upload.onchange=async()=>{try{const file=upload.files?.[0];if(!file)return;if(file.size>65536)throw Error('Preset is too large.');const data=JSON.parse(await file.text());if(data.version!==1||data.scope!==scope||!data.values||typeof data.values!=='object'||Array.isArray(data.values))throw Error('Preset is for a different study or has an unsupported format.');
  const values=subset(data.values);for(const [id,v] of Object.entries(values)){const el=controls.get(id);if(el&&!valid(el,v))throw Error(`Invalid value for ${id}. No settings were applied.`);}
  apply(values);persist();status.textContent='Imported into this tab; project defaults unchanged.';
 }catch(e){status.textContent=(e as Error).message;}finally{upload.value='';}};
 const fileLabel=document.createElement('label');fileLabel.textContent='Import preset';fileLabel.append(upload);panel.append(fileLabel,status);parent.append(panel);
 // Existing rock controls attach their callbacks only when their assets settle.
 if(waitForRocks){const start=performance.now();while((document.getElementById('rockLayout') as HTMLSelectElement|null)?.disabled&&!/failed/i.test(document.getElementById('rockLoad')?.textContent??'')&&performance.now()-start<20000)await new Promise(r=>setTimeout(r,100));}
 try{entry=await readShared();apply({...baseline,...entry.values});status.textContent=`App defaults revision ${entry.revision}. Adjustments are saved for this tab.`;}
 catch(e){status.textContent=(e as Error).message;}
 let restored=false;
 try{const raw=sessionStorage.getItem(key);if(raw){const values=JSON.parse(raw);if(values&&typeof values==='object'&&!Array.isArray(values)){apply(values);restored=true;status.textContent='Restored this tab’s controls. Reset loads the latest app defaults.';}}}catch{}
 if(!restored){const mode=new URLSearchParams(location.search).get('mode');if(mode&&controls.has('inputMode'))apply({inputMode:mode});}
 for(const el of controls.values()){el.addEventListener('input',persist);el.addEventListener('change',persist);}
 addEventListener('pagehide',persist);
 // Buttons such as a per-layer rock reset also change controls programmatically.
 parent.addEventListener('click',()=>queueMicrotask(persist));
 persist();
 // A frozen build announces its snapshot without adding another floating panel.
 try{const r=await fetch('/preview-manifest.json',{signal:AbortSignal.timeout(1500)});if(r.ok){const m=await r.json();const info=document.createElement('small');info.textContent=`Frozen preview · ${m.builtAt} · code ${m.revision}${m.dirty?' + working changes':''}. Code/art stay fixed; Reset reads current project defaults.`;panel.prepend(info);document.title+=' · frozen';}}catch{}
 return {capture};
}
