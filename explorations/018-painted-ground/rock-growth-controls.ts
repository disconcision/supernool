import {growthDefaults,type GrowthSettings,type GrowthLayers,type GrowthKind} from './rock-growth';

const storageKey='supernool-rock-growth-v2';
const ranges={scale:[.4,3,.05],amount:[0,2.5,.1],spread:[0,1.5,.05],smallBias:[.35,3,.05],seed:[0,9999,1],opacity:[0,1,.05],saturation:[0,1.5,.05],brightness:[.5,1.6,.05]} as const;
type Numeric=keyof typeof ranges;
export function rockGrowthControls(parent:HTMLElement){
 const layers:GrowthLayers={moss:{...growthDefaults.moss},lichen:{...growthDefaults.lichen}};
 try{
  const saved=JSON.parse(localStorage.getItem(storageKey)??'null');
  const legacy=JSON.parse(localStorage.getItem('supernool-rock-growth-v1')??'null');
  for(const kind of ['moss','lichen'] as const){
   const settings=layers[kind],source=saved?.[kind];
   if(source){
    for(const key of Object.keys(ranges) as Numeric[])if(Number.isFinite(source[key]))settings[key]=Math.max(ranges[key][0],Math.min(ranges[key][1],source[key]));
    settings.seed=Math.round(settings.seed);
    if(['authored','scatter','clusters'].includes(source.placement))settings.placement=source.placement;
    if(['normal','multiply'].includes(source.blend))settings.blend=source.blend;
   }else if(legacy){
    // Preserve prior color adjustments, but adopt the requested new size/distribution split.
    for(const key of ['opacity','saturation','brightness'] as const)if(Number.isFinite(legacy[key]))settings[key]=Math.max(ranges[key][0],Math.min(ranges[key][1],legacy[key]));
    if(['normal','multiply'].includes(legacy.blend))settings.blend=legacy.blend;
   }
  }
 }catch{/* Storage is optional. */}
 const details=document.createElement('details');details.id='rockGrowthControls';
 const summary=document.createElement('summary');summary.textContent='Adjust moss & lichen';details.append(summary);
 let changed=()=>{},timer:ReturnType<typeof setTimeout>|undefined;
 const fieldsets:HTMLFieldSetElement[]=[];
 for(const kind of ['moss','lichen'] as GrowthKind[]){
 let settings=layers[kind];
 const section=document.createElement('details');section.id=kind+'Controls';section.open=false;
 const title=document.createElement('summary');title.textContent=kind==='moss'?'Moss · broader growth':'Lichen · small colonies';section.append(title);details.append(section);
 const fieldset=document.createElement('fieldset');fieldset.style.cssText='border:0;padding:0;margin:0;min-width:0';fieldset.disabled=true;section.append(fieldset);fieldsets.push(fieldset);
 const note=document.createElement('p');note.textContent=kind==='moss'?'Moss has its own placement, size and color settings.':'Lichen is adjusted independently of the moss.';fieldset.append(note);
 const controls=new Map<keyof GrowthSettings,HTMLInputElement|HTMLSelectElement>();
 const outputs=new Map<Numeric,HTMLOutputElement>();
 function emit(immediate=true){
  try{localStorage.setItem(storageKey,JSON.stringify(layers));}catch{}
  clearTimeout(timer);if(immediate)changed();else timer=setTimeout(changed,180);
 }
 function select(key:'placement'|'blend',title:string,options:[string,string][]){
  const label=document.createElement('label');label.textContent=title;
  const input=document.createElement('select');input.id=kind+key[0].toUpperCase()+key.slice(1);
  options.forEach(([v,t])=>input.add(new Option(t,v)));input.value=settings[key];
  input.onchange=()=>{Object.assign(settings,{[key]:input.value});refresh();emit();};
  label.append(input);fieldset.append(label);controls.set(key,input);
 }
 select('placement','Distribution',[['authored','Chosen sites'],['scatter','Scattered over surfaces'],['clusters','Clusters around chosen sites']]);
 for(const [key,title] of [['scale','Patch size'],['amount','Patch count'],['spread','Spread / spacing'],['smallBias','Small-patch bias'],['seed','Placement seed'],['opacity','Opacity'],['saturation','Color saturation'],['brightness','Brightness']] as [Numeric,string][]){
  const label=document.createElement('label'),text=document.createElement('span'),output=document.createElement('output');text.textContent=title;
  label.style.cssText='display:grid;grid-template-columns:1fr auto;gap:4px;margin:10px 0';
  const input=document.createElement('input');input.id=kind+key[0].toUpperCase()+key.slice(1);input.type=key==='seed'?'number':'range';input.style.cssText='grid-column:1 / -1;width:100%;box-sizing:border-box';
  const [min,max,step]=ranges[key];input.min=String(min);input.max=String(max);input.step=String(step);
  output.htmlFor=input.id;label.append(text,output,input);fieldset.append(label);controls.set(key,input);outputs.set(key,output);
  input.oninput=()=>{
   if(!Number.isFinite(input.valueAsNumber))return;
   settings[key]=Math.max(min,Math.min(max,input.valueAsNumber));if(key==='seed')settings.seed=Math.round(settings.seed);
   refresh();emit(['opacity','saturation','brightness'].includes(key));
  };
  input.onchange=()=>emit();
 }
 select('blend','Blending',[['normal','Normal · color over stone'],['multiply','Multiply · stain the stone']]);
 const explanation=document.createElement('p');explanation.textContent='Scatter/cluster modes mix sizes: bias 1 gives more small patches in inverse proportion to diameter. Higher bias adds more tiny flecks. Size changes the whole range. Multiply darkens; Normal is better for pale lichen.';fieldset.append(explanation);
 const buttons=document.createElement('div');buttons.style.cssText='display:flex;flex-wrap:wrap;gap:6px';
 function button(title:string,fn:()=>void){const b=document.createElement('button');b.type='button';b.textContent=title;b.onclick=()=>{if(controls.get('opacity')!.disabled)return;fn();refresh();emit();};buttons.append(b);}
 button('Reshuffle '+kind,()=>settings.seed=(settings.seed+1)%10000);
 button('Reset '+kind,()=>Object.assign(settings,growthDefaults[kind]));
 fieldset.append(buttons);
 function refresh(){
  controls.forEach((el,key)=>el.value=String(settings[key]));
  outputs.forEach((el,key)=>el.value=key==='seed'?String(settings.seed):key==='opacity'||key==='saturation'?`${Math.round(settings[key]*100)}%`:`${settings[key].toFixed(2)}${key==='scale'||key==='amount'||key==='brightness'?'×':''}`);
  outputs.get('smallBias')!.closest('label')!.hidden=settings.placement==='authored';
 }
 refresh();
 }
 parent.append(details);
 return {get settings(){return {moss:{...layers.moss},lichen:{...layers.lichen}};},set onChange(fn:()=>void){changed=fn;},setEnabled(on:boolean){fieldsets.forEach(f=>f.disabled=!on);},setVisible(on:boolean){details.hidden=!on;}};
}
