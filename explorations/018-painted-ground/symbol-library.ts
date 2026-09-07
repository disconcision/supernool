import { symbols, roles, choices, defaults, symbolSVG, symbolStorageKey } from './symbols';
let selected=choices();
function render(){
 const assignments=document.getElementById('assignments')!;assignments.replaceChildren();
 for(const role of roles){
  const box=document.createElement('div');box.className='assignment';
  const mark=document.createElement('div');mark.className='mark';mark.innerHTML=symbolSVG(selected[role]);
  const label=document.createElement('label');label.textContent=role;
  const select=document.createElement('select');select.setAttribute('aria-label',`${role} symbol`);
  for(const s of symbols){const option=document.createElement('option');option.value=s.id;option.textContent=s.name;select.append(option);}
  select.value=selected[role];select.onchange=()=>{selected[role]=select.value;save();};
  label.append(select);box.append(mark,label);assignments.append(box);
 }
 const library=document.getElementById('library')!;library.replaceChildren();
 symbols.forEach((s,i)=>{const card=document.createElement('article');card.className='symbol';card.innerHTML=`<span class="number">${String(i+1).padStart(2,'0')} / ${s.id}</span><div class="large">${symbolSVG(s.id)}</div><h3>${s.name}</h3><p>${s.note}</p><span class="usage">${roles.filter(r=>selected[r]===s.id).join(' · ')||'Reserve'}</span>`;library.append(card);});
}
function save(){try{localStorage.setItem(symbolStorageKey,JSON.stringify(selected));render();document.getElementById('status')!.textContent='Saved. Your open clearing updates automatically.';}catch{document.getElementById('status')!.textContent='Browser storage is unavailable; these choices could not be saved.';}}
document.getElementById('reset')!.onclick=()=>{selected={...defaults};save();};
render();
