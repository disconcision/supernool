import { choices, symbolSVG, symbolStorageKey, type Role } from './symbols';
/** Three persistent corner docks. Gameplay updates content, never opens a dock. */
export function setupHUD(){
 const $=(id:string)=>document.getElementById(id)!;
 function dock(id:string,title:Role,tabs:{name:string;panels:string[]}[]){
  const outer=document.createElement('aside');outer.id=id;outer.className='dock';
  const toggle=document.createElement('button');toggle.className='dockToggle';
  const refreshSymbol=()=>{toggle.innerHTML=symbolSVG(choices()[title]);};refreshSymbol();
  addEventListener('storage',e=>{if(e.key===symbolStorageKey||e.key===null)refreshSymbol();});
  const content=document.createElement('div');content.className='dockBody';content.hidden=true;
  const nav=document.createElement('nav');nav.className='dockTabs';content.append(nav);
  const pages=tabs.map(t=>{const page=document.createElement('div');page.className='dockPage';for(const p of t.panels){const el=$(p);el.classList.remove('minimized');page.append(el);}content.append(page);const tab=document.createElement('button');tab.textContent=t.name;tab.onclick=()=>show(t.name);nav.append(tab);return {page,tab,...t};});
  function show(name:string){for(const p of pages){p.page.hidden=p.name!==name;p.tab.setAttribute('aria-pressed',String(p.name===name));if(p.name===name)for(const id of p.panels)if(['settings','toolbox'].includes(id))$(id).hidden=false;}}
  function expanded(on:boolean){content.hidden=!on;if(on){const current=pages.find(p=>!p.page.hidden);if(current)show(current.name);}toggle.title=title;toggle.setAttribute('aria-label',(on?'Collapse ':'Open ')+title);toggle.setAttribute('aria-expanded',String(on));if(on&&innerWidth<760)for(const other of document.querySelectorAll<HTMLButtonElement>('.dockToggle[aria-expanded="true"]'))if(other!==toggle)other.click();}
  toggle.onclick=()=>expanded(content.hidden);outer.append(toggle,content);document.body.append(outer);show(tabs[0].name);expanded(false);
  return {open(name=tabs[0].name){show(name);expanded(true);},close(){expanded(false);}};
 }
 // Group the existing controls without changing their IDs or event handlers.
 const settings=$('settings');const library=document.createElement('a');library.href='symbols.html';library.target='_blank';library.rel='noopener';library.textContent='Choose corner symbols ↗';settings.prepend(library);const sections=[
  ['Traveller',['character','characterStatus','palette']],
  ['Interaction',['stanceAssist','bodyLink','pullGain','mass']],
  ['Tree & sigils',['sigils','lighting','surface','resolution','thickness','taper','bow','random','irregularity','twist','facets','blend','spread','height','seed','cost']],
  ['Surroundings',['backdrop','backdropStatus','groundShadows','resetView']],
  ['Sound',['soundMode','previewSound','volume']]
 ] as const;
 for(const [title,ids] of sections){const section=document.createElement('details');section.open=title==='Traveller';const summary=document.createElement('summary');summary.textContent=title;section.append(summary);for(const id of ids){const el=$(id);section.append(el.closest('label')??el);}settings.append(section);}
 dock('encounterDock','Encounter',[{name:'Play',panels:['bottom','objective','guide']}]);
 const rewrite=dock('rewriteDock','Rewrite',[{name:'Selection',panels:['selection']},{name:'Noolbox',panels:['toolbox']}]);
 const empty=document.createElement('p');empty.id='selectionEmpty';empty.textContent='Reach into the tree to inspect a branch and its available rewrites.';$('selection').parentElement!.append(empty);
 const inspect=dock('inspectDock','Inspect',[{name:'Appearance',panels:['settings']},{name:'Stats',panels:['performance']}]);
 $('settingsButton').onclick=()=>inspect.open('Appearance');$('closeSettings').onclick=()=>inspect.close();$('toolboxButton').onclick=()=>rewrite.open('Noolbox');$('closeToolbox').onclick=()=>rewrite.close();
 // Escape may hide the appearance panel in the input handler; reopening its tab
 // restores that panel. The dock itself stays under explicit user control.
 const button=document.createElement('button');button.id='hudToggle';button.textContent='◌';button.title='Hide all UI · Escape or backslash to restore';button.setAttribute('aria-label',button.title);button.onclick=()=>document.body.classList.toggle('clean-view');$('encounterDock').querySelector('.dockTabs')!.append(button);
 addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('clean-view')){e.preventDefault();e.stopImmediatePropagation();document.body.classList.remove('clean-view');return;}if(e.key==='\\'&&!(e.target as HTMLElement).matches('input,textarea,select')){e.preventDefault();document.body.classList.toggle('clean-view');}},{capture:true});
}
