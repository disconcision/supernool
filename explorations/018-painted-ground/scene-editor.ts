import {bakedScene} from './scene-library';
import * as T from 'three';
import {editorGizmo} from './editor-gizmo';
import {selectionOutline} from './selection-outline';
import type {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {rockAuthoring} from './rock-authoring';
import {validateScene,sceneIdPattern,type SceneVersion,type RockPlacement} from '../../scene-tools/schema';

type Hooks={canEdit:()=>boolean;setEditing:(on:boolean)=>void;capture:()=>Record<string,string>;apply:(values:Record<string,string|boolean>)=>void};
export function mountSceneEditor(scene:T.Scene,camera:T.Camera,renderer:T.WebGLRenderer,orbit:OrbitControls,hooks:Hooks){
 const dock=document.querySelector('#inspectDock .dockBody')!,nav=dock.querySelector('nav')!;
 const page=document.createElement('div');page.className='dockPage';page.id='sceneEditor';page.hidden=true;
 page.innerHTML=`<h2>Scene workshop</h2><p>Arrange formations, loose stones and mushrooms, then save their layout together with your scene settings.</p>
 <label>Scene<input id="sceneId" value="clearing" maxlength="48"></label>
 <div class="editorButtons"><button id="editScene">Edit scenery</button><button id="undoScene" disabled>Undo</button><button id="redoScene" disabled>Redo</button></div>
 <fieldset id="rockTools" disabled hidden><legend>Scenery layout</legend>
 <label>Object<select id="editorSelection"><option value="">Select scenery in the scene</option></select></label>
 <div class="editorButtons"><button id="copyScenery" disabled title="Copy selected scenery · Cmd/Ctrl+C">Copy</button><button id="pasteScenery" disabled title="Paste a copy nearby · Cmd/Ctrl+V">Paste</button><button id="duplicateScenery" disabled title="Copy and paste selected scenery · Cmd/Ctrl+D">Duplicate</button><button id="deleteScenery" disabled title="Delete selected scenery · Delete / Backspace">Delete</button></div>
 <small id="sceneryClipboard" role="status">Scenery clipboard empty · Cmd/Ctrl+C to copy, V to paste, D to duplicate.</small>
 <label>Tool<select id="editorTool"><option value="combined">All handles · Q</option><option value="translate">Move · W</option><option value="rotate">Rotate · E</option><option value="scale">Scale · R</option></select></label>
 <label><span>Snap to increments</span><input id="editorSnap" type="checkbox" checked></label>
 <div class="editorNumbers"><label>X<input id="editorX" type="number" step=".25" min="-80" max="80"></label><label>Height · Y<input id="editorY" type="number" step=".1" min="-10" max="20"></label><label>Z<input id="editorZ" type="number" step=".25" min="-80" max="80"></label><label>Yaw °<input id="editorYaw" type="number" step="5"></label><label>Size ×<input id="editorScale" type="number" step=".1" min=".1" max="8"></label></div>
 <p>Arrows move: red X and blue Z along the ground, green Y for height. The outer arc turns; the cream square changes size. Right-drag orbits; scroll zooms. Escape returns to play.</p><p>Large formations include their attached fragments and growth. Loose stones and individual mushrooms are separate objects. The two puzzle gates, tree, traveller and painted terrain are not editable here.</p></fieldset>
 <label>Version name<input id="sceneTitle" value="Clearing study" maxlength="100"></label>
 <div class="editorButtons"><button id="saveScene">Save version</button><button id="exportScene">Export JSON</button></div>
 <label>Saved versions<select id="sceneVersions"><option value="">No saved versions</option></select></label>
 <div class="editorButtons"><button id="loadScene">Load version</button><button id="defaultScene">Use as scene default</button></div>
 <small id="sceneStatus" role="status">Loading scene library…</small><p>Saving creates a new version. Setting a default keeps earlier versions available. Saves include appearance, interaction settings and the enabled rewrite rules.</p>`;
 dock.append(page);const tab=document.createElement('button');tab.textContent='Scene';nav.append(tab);
 const oldTabs=[...nav.querySelectorAll('button')].filter(t=>t!==tab);oldTabs.forEach(t=>t.addEventListener('click',()=>{page.hidden=true;tab.setAttribute('aria-pressed','false');}));
 tab.onclick=()=>{dock.querySelectorAll<HTMLElement>(':scope > .dockPage').forEach(p=>p.hidden=p!==page);nav.querySelectorAll('button').forEach(t=>t.setAttribute('aria-pressed',String(t===tab)));};
 const style=document.createElement('style');style.textContent='#sceneEditor fieldset{border:1px solid #c6cec2;border-radius:6px;margin:12px 0;padding:8px}#sceneEditor input:not([type=checkbox]){width:100%;padding:5px;border:1px solid #a5b5a0;border-radius:4px}.editorButtons{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.editorButtons button{font-size:12px;padding:6px 9px}.editorNumbers{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.editorNumbers label{margin:4px 0}#editorBanner{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#f9f5d9;color:#344a3a;border:1px solid #77866a;border-radius:8px;padding:9px 15px;z-index:20;font:13px system-ui}#sceneStatus{display:block;margin:10px 0;overflow-wrap:anywhere}';document.head.append(style);
 const banner=document.createElement('div');banner.id='editorBanner';banner.hidden=true;document.body.append(banner);
 const $=<E extends HTMLElement>(id:string)=>document.getElementById(id) as E;
 const input=(id:string)=>$<HTMLInputElement>(id),select=$<HTMLSelectElement>('editorSelection'),versions=$<HTMLSelectElement>('sceneVersions'),status=$('sceneStatus');
 const outline=selectionOutline(renderer);
 const gizmo=editorGizmo(camera,renderer.domElement,{
  start(){orbit.enabled=false;dragStart=rockAuthoring!.capture();},
  change(){if(selected){selected.scale.clampScalar(.1,8);selected.position.clampScalar(-80,80);showValues();}},
  end(){orbit.enabled=true;if(dragStart){record(dragStart);dragStart=undefined;rockAuthoring!.refresh();}},
  hover(text){renderer.domElement.style.cursor=text?'grab':'';if(editing&&selected)banner.textContent='EDITING · '+selected.name+(text?' · '+text:' · Q all handles · Esc play');}
 });
 let editing=false,selected:T.Object3D|undefined,dragStart:RockPlacement[]|undefined,loading=false,dirty=false;
 let lastSaved:SceneVersion|undefined;
 let past:RockPlacement[][]=[],future:RockPlacement[][]=[],savedId='',defaultId:string|null=null;
 let operation=false;
 const clipboardKey='supernool-scenery-clipboard-v1';
 let clipboard:RockPlacement|undefined,pasteCount=0,clipboardText='';
 const active=()=>rockAuthoring?.list()??[];
 function message(text:string){status.textContent=text;}
 function markDirty(){if(loading)return;dirty=true;page.dataset.dirty='true';message('Unsaved changes · save a new version to keep them.');}
 function history(){input('undoScene').disabled=!past.length;input('redoScene').disabled=!future.length;}
 function record(before:RockPlacement[]){if(JSON.stringify(before)===JSON.stringify(rockAuthoring!.capture()))return;past.push(before);if(past.length>60)past.shift();future=[];history();markDirty();}
 function refreshSelection(){
  const id=selected?.userData.formation.id??'';select.replaceChildren(new Option('Select scenery in the scene',''));
  for(const [label,kinds] of [['Rock formations',['basalt-group','bedrock']],['Loose stones',['fragment']],['Mushrooms',['mushroom']]] as const){const group=document.createElement('optgroup');group.label=label;active().filter(g=>(kinds as readonly string[]).includes(g.userData.formation.kind)).forEach(g=>group.append(new Option(g.name,g.userData.formation.id)));if(group.children.length)select.append(group);}select.value=id;
 }
 function showValues(){
  if(!selected)return;input('editorX').value=selected.position.x.toFixed(2);input('editorY').value=selected.position.y.toFixed(2);input('editorZ').value=selected.position.z.toFixed(2);input('editorYaw').value=T.MathUtils.radToDeg(selected.rotation.y).toFixed(1);input('editorScale').value=selected.scale.x.toFixed(2);
  banner.textContent='EDITING · '+selected.name+' · Q all handles · W/E/R single tool · Esc play';
 }
 function choose(g?:T.Object3D){selected=g;gizmo.attach(editing?g:undefined);select.value=g?.userData.formation.id??'';showValues();if(!g)banner.textContent='EDITING · select scenery · Esc play';clipboardButtons();}
 function mode(){gizmo.configure(input('editorTool').value as 'combined'|'translate'|'rotate'|'scale',input('editorSnap').checked);}
 function setEditing(on:boolean){
  if(on&&!hooks.canEdit()){message('Finish the current gesture before editing.');return;}
  if(on&&!['full','enclosed'].includes(input('rockLayout').value)){message('Choose Approved formations or More enclosing in Appearance first.');return;}
  editing=on;document.body.dataset.sceneEditing=String(on);hooks.setEditing(on);page.dataset.editing=String(on);banner.hidden=!on;banner.textContent='EDITING · select scenery · Esc returns to play';
  input('editScene').textContent=on?'Play scene':'Edit scenery';$<HTMLFieldSetElement>('rockTools').disabled=!on;$('rockTools').hidden=!on;orbit.enabled=true;
  if(on)refreshSelection();gizmo.attach(on?selected:undefined);mode();renderer.domElement.style.cursor='';clipboardButtons();
 }
 input('editScene').onclick=()=>setEditing(!editing);select.onchange=()=>choose(active().find(g=>g.userData.formation.id===select.value));
 input('editorTool').onchange=input('editorSnap').onchange=mode;
 let press:{x:number;y:number}|undefined;
 renderer.domElement.addEventListener('pointerdown',e=>{if(editing&&e.button===0&&!gizmo.dragging)press={x:e.clientX,y:e.clientY};else press=undefined;});
 renderer.domElement.addEventListener('pointerup',e=>{
  if(!editing||!press||Math.hypot(e.clientX-press.x,e.clientY-press.y)>5){press=undefined;return;}press=undefined;
  const box=renderer.domElement.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-box.left)/box.width*2-1,1-(e.clientY-box.top)/box.height*2),camera);
  const surfaces:T.Mesh[]=[];scene.traverseVisible(o=>{if(o instanceof T.Mesh)surfaces.push(o);});
  const hit=ray.intersectObjects(surfaces,false).find(h=>{const m=(h.object as T.Mesh).material,material=Array.isArray(m)?m[h.face?.materialIndex??0]:m;return material.visible&&(!material.transparent||material.alphaTest>0);});
  let o=hit?.object;while(o&&!o.userData.formation)o=o.parent??undefined;
  choose(o&&active().includes(o)?o:undefined);
  if(hit&&!o)banner.textContent='This belongs to gameplay or the backdrop · choose a formation, loose stone or mushroom';
 });
 for(const id of ['editorX','editorY','editorZ','editorYaw','editorScale'])input(id).onchange=()=>{
  if(!selected||!Number.isFinite(input(id).valueAsNumber))return;const before=rockAuthoring!.capture(),v=input(id).valueAsNumber;
  if(id==='editorYaw')selected.rotation.y=T.MathUtils.degToRad(T.MathUtils.clamp(v,-18000,18000));
  else if(id==='editorScale'){const factor=T.MathUtils.clamp(v,.1,8)/selected.scale.x;selected.scale.multiplyScalar(factor).clampScalar(.1,8);}
  else selected.position.setComponent(['editorX','editorY','editorZ'].indexOf(id),T.MathUtils.clamp(v,id==='editorY'?-10:-80,id==='editorY'?20:80));
  rockAuthoring!.refresh();showValues();record(before);
 };
 function readClipboard(){
  try{
   const text=localStorage.getItem(clipboardKey);if(text&&text!==clipboardText){
    const value=JSON.parse(text);validateScene({schema:1,sceneId:'clipboard',title:'Scenery',controls:{rockLayout:'full'},rocks:[value]});
    clipboard=value;clipboardText=text;pasteCount=0;
   }
  }catch{/* Keep a usable in-memory clipboard if browser storage is unavailable. */}
  return clipboard;
 }
 function clipboardButtons(){
  input('deleteScenery').disabled=input('copyScenery').disabled=input('duplicateScenery').disabled=!editing||!selected;
  input('pasteScenery').disabled=!editing||!readClipboard();
  $('sceneryClipboard').textContent=clipboard?'Copied '+(active().find(g=>g.userData.formation.id===(clipboard!.source??clipboard!.id))?.name??clipboard.kind)+' · Cmd/Ctrl+V pastes nearby.':'Scenery clipboard empty · Cmd/Ctrl+C to copy, V to paste, D to duplicate.';
 }
 function copySelection(){
  if(!editing||!selected||gizmo.dragging)return;
  const data=rockAuthoring!.capture().find(r=>r.id===selected!.userData.formation.id);if(!data)return;
  clipboard=JSON.parse(JSON.stringify(data));clipboardText=JSON.stringify(clipboard);pasteCount=0;
  try{localStorage.setItem(clipboardKey,clipboardText);}catch{}
  clipboardButtons();message('Copied '+selected.name+' to the scenery clipboard.');
 }
 function pasteSelection(){
  if(!editing||gizmo.dragging)return;const data=readClipboard();if(!data){message('Copy a scenery object first.');return;}
  if(active().length>=100){message('This study supports up to 100 scenery objects. Undo an addition before pasting more.');return;}
  const before=rockAuthoring!.capture(),step=pasteCount+1;
  const offset=(n:number)=>n+(n+step<=80?step:-step);
  const placement={...data,position:[offset(data.position[0]),data.position[1],offset(data.position[2])] as [number,number,number]};
  try{const g=rockAuthoring!.paste(placement);pasteCount=step;refreshSelection();choose(g);record(before);message('Pasted '+g.name+' · drag to place it. Save version to keep this addition.');}
  catch(e){message((e as Error).message);}
 }
 function deleteSelection(){
  if(!editing||!selected||gizmo.dragging)return;
  const before=rockAuthoring!.capture(),name=selected.name,id=selected.userData.formation.id;
  rockAuthoring!.remove(id);choose();refreshSelection();record(before);message('Deleted '+name+' · Undo restores it. Save version to keep this change.');
 }
 input('deleteScenery').onclick=deleteSelection;
 input('copyScenery').onclick=copySelection;input('pasteScenery').onclick=pasteSelection;
 input('duplicateScenery').onclick=()=>{if(!selected)return;copySelection();pasteSelection();};
 addEventListener('storage',e=>{if(e.key===clipboardKey)clipboardButtons();});
 function undo(redo=false){
  if(gizmo.dragging)return;const from=redo?future:past,to=redo?past:future,state=from.pop();if(!state)return;
  const before=rockAuthoring!.capture(),id=selected?.userData.formation.id,source=selected?.userData.formation.source;
  to.push(before);rockAuthoring!.apply(state);refreshSelection();
  const added=state.find(r=>!r.deleted&&!before.some(p=>p.id===r.id&&!p.deleted));choose(active().find(g=>g.userData.formation.id===(added?.id??id))??active().find(g=>g.userData.formation.id===source));history();markDirty();
 }
 input('undoScene').onclick=()=>undo();input('redoScene').onclick=()=>undo(true);
 addEventListener('keydown',e=>{
  const target=e.target as HTMLElement,key=e.key.toLowerCase();
  if(!editing||target.closest('input,textarea,[contenteditable="true"]'))return;
  if(e.metaKey||e.ctrlKey){
   if(['c','v','d','z'].includes(key)){e.preventDefault();if(e.repeat)return;
    if(key==='c')copySelection();else if(key==='v')pasteSelection();else if(key==='d'){if(selected){copySelection();pasteSelection();}}else undo(e.shiftKey);
   }return;
  }
  if((e.key==='Delete'||e.key==='Backspace')&&!e.altKey){e.preventDefault();if(!e.repeat)deleteSelection();return;}
  if(target.matches('select'))return;
  if(e.key==='Escape'){e.preventDefault();setEditing(false);}else if(['q','w','e','r'].includes(key)){input('editorTool').value=({q:'combined',w:'translate',e:'rotate',r:'scale'} as any)[key];mode();}
 });
 const controlElements=()=>Array.from(document.querySelectorAll<HTMLInputElement|HTMLSelectElement>('.dock input,.dock select')).filter(e=>!e.closest('#sceneEditor,#settingsPresets')&&e.dataset.transient!=='true'&&(!(e instanceof HTMLInputElement)||e.type!=='hidden'||e.dataset.presetJson==='true')&&(e.id||e.dataset.rule));
 function fingerprint(data:SceneVersion){return JSON.stringify({controls:data.controls,rocks:data.rocks},(_key,v)=>typeof v==='number'?Math.round(v*100000)/100000:typeof v==='string'&&v!==''&&Number.isFinite(+v)?Math.round(+v*100000)/100000:v);}
 function capture():SceneVersion{
  const controls:Record<string,string|boolean>={...hooks.capture()};
  for(const e of controlElements())controls[e.dataset.rule?'rule-'+e.dataset.rule:e.id]=e instanceof HTMLInputElement&&e.type==='checkbox'?e.checked:e.value;
  const data:SceneVersion={schema:1,sceneId:input('sceneId').value.trim(),title:input('sceneTitle').value.trim(),controls,rocks:rockAuthoring!.capture()};validateScene(data);return data;
 }
 for(const type of ['input','change'])document.addEventListener(type,e=>{const el=e.target as HTMLElement;if(!loading&&controlElements().includes(el as HTMLInputElement|HTMLSelectElement)){markDirty();if(el.id==='rockLayout'){choose();past=[];future=[];history();refreshSelection();}}});
 async function request(path='',method='GET',data?:any){const id=input('sceneId').value.trim();if(!sceneIdPattern.test(id))throw new Error('Scene ID: lowercase letters, numbers and hyphens.');const res=await fetch('/__scene-editor/'+id+path,{method,headers:{'Content-Type':'application/json'},...(data?{body:JSON.stringify(data)}:{})});let value;try{value=await res.json();}catch{if(method==='GET')return bakedScene(id,path);throw new Error('Project saving requires the local editor server. Export JSON is available.');}if(!res.ok)throw new Error(value.error??'Scene request failed');return value;}
 async function library(){const data=await request();defaultId=data.defaultVersion;versions.replaceChildren(new Option('Choose a saved version',''));for(const v of data.versions)versions.add(new Option(v.title+(v.versionId===defaultId?' · default':''),v.versionId));if(savedId)versions.value=savedId;}
 async function apply(data:SceneVersion){
  validateScene(data);loading=true;choose();
  try{
   // Layout first, then settings, then saved transforms: generated patches follow final geometry.
   const entries=Object.entries(data.controls).sort(([a],[b])=>a==='rockLayout'?-1:b==='rockLayout'?1:0);
   for(const [id,v] of entries){const e=controlElements().find(e=>(e.dataset.rule?'rule-'+e.dataset.rule:e.id)===id);if(!e)continue;
    if(e instanceof HTMLSelectElement){if(![...e.options].some(o=>o.value===v))continue;e.value=String(v);}
    else if(e.type==='checkbox')e.checked=Boolean(v);
    else{if(e.type==='range'||e.type==='number'){if(!Number.isFinite(+v))continue;if(e.min&&+v<+e.min||e.max&&+v>+e.max)continue;}e.value=String(v);}
    e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));
   }
   hooks.apply(data.controls);rockAuthoring!.apply(data.rocks);past=[];future=[];history();refreshSelection();savedId=data.versionId??'';input('sceneTitle').value=data.title;dirty=false;lastSaved=capture();page.dataset.dirty='false';message('Loaded '+data.title+(savedId===defaultId?' · scene default':''));
  }finally{loading=false;}
 }
 const action=(fn:()=>Promise<void>)=>async()=>{if(operation)return;operation=true;for(const id of ['saveScene','loadScene','defaultScene'])input(id).disabled=true;try{await fn();}catch(e){message((e as Error).message);}finally{operation=false;for(const id of ['saveScene','loadScene','defaultScene'])input(id).disabled=false;}};
 input('saveScene').onclick=action(async()=>{const data=capture(),saved=await request('','POST',data);savedId=saved.versionId;lastSaved=data;dirty=false;page.dataset.dirty='false';await library();message('Saved “'+saved.title+'” to scenes/'+saved.sceneId+'/versions/'+savedId+'.json');});
 input('loadScene').onclick=action(async()=>{if(!versions.value)throw new Error('Choose a saved version.');if(dirty&&!confirm('Load this version and discard unsaved scene edits?'))return;await apply(await request('/'+versions.value));});
 input('defaultScene').onclick=action(async()=>{if(dirty||lastSaved&&fingerprint(lastSaved)!==fingerprint(capture()))throw new Error('Save a version first, so the default includes your latest edits.');if(!savedId||versions.value!==savedId)throw new Error('Load the version you want to make default first.');await request('/default','PUT',{versionId:savedId});await library();message('“'+input('sceneTitle').value+'” is now the default for '+input('sceneId').value+'. Earlier versions are retained.');});
 input('exportScene').onclick=()=>{try{const data=capture(),url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=data.sceneId+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){message((e as Error).message);}};
 input('sceneId').onchange=action(async()=>{if(!sceneIdPattern.test(input('sceneId').value))throw new Error('Use a lowercase scene ID.');savedId='';const url=new URL(location.href);url.searchParams.set('scene',input('sceneId').value);window.history.replaceState(null,'',url);await library();markDirty();});
 document.addEventListener('click',e=>{if((e.target as HTMLElement).closest('#seed,#resetView,#rockGrowthControls button'))markDirty();});
 input('sceneTitle').oninput=markDirty;orbit.addEventListener('end',markDirty);
 const sceneParam=new URLSearchParams(location.search).get('scene');if(sceneParam&&sceneIdPattern.test(sceneParam))input('sceneId').value=sceneParam;
 const init=action(async()=>{await library();if(defaultId){await apply(await request('/default'));versions.value=defaultId;}else message('Built-in scene · edit or adjust settings, then save your first version.');refreshSelection();});
 const ready=rockAuthoring?init():new Promise<void>(resolve=>{if(/failed/i.test(document.getElementById('rockLoad')?.textContent??'')){message('Scenery assets unavailable; retry loading rocks to use the editor.');resolve();}document.addEventListener('scene-rocks-ready',()=>{void init().finally(resolve);},{once:true});});
 if(new URLSearchParams(location.search).has('editor')){document.querySelector<HTMLButtonElement>('#inspectDock .dockToggle')!.click();tab.click();}
 return {ready,render(){if(editing){outline.render(scene,camera,selected);gizmo.render(renderer);}}};
}
