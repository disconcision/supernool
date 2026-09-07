export function setupHUD(){
 for(const [id,icon,label]of [['objective','ƒ','Expression'],['guide','?','Help'],['selection','◇','Spells'],['bottom','⌘','Controls'],['settings','⚙','Appearance'],['toolbox','✦','Noolbox']]){
  const panel=document.getElementById(id)!;const b=document.createElement('button');b.className='minimize';
  const update=()=>{const collapsed=panel.classList.contains('minimized');b.textContent=collapsed?icon:'−';b.title=(collapsed?'Open ':'Minimize ')+label;b.setAttribute('aria-label',b.title);b.setAttribute('aria-expanded',String(!collapsed));};
  b.onclick=()=>{panel.classList.toggle('minimized');update();};panel.append(b);if(id==='guide')panel.classList.add('minimized');update();
 }
 const button=document.createElement('button');button.id='hudToggle';button.textContent='◌';button.title='Hide all UI · Escape or backslash to restore';button.setAttribute('aria-label',button.title);button.onclick=()=>document.body.classList.toggle('clean-view');document.body.append(button);
 addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('clean-view')){e.preventDefault();e.stopImmediatePropagation();document.body.classList.remove('clean-view');return;}if(e.key==='\\'&&!(e.target as HTMLElement).matches('input,textarea,select')){e.preventDefault();document.body.classList.toggle('clean-view');}},{capture:true});
}
