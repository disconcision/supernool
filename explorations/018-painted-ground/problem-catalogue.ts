import {problems,instantiate} from './problems';
import {readable} from './algebra';
import {referenceSolutions} from './problem-metadata';
import {rules} from './rule-definitions';
import {ruleTile,ruleStrip} from './rule-art';
import './rule-ui.css';
const el=<K extends keyof HTMLElementTagNameMap>(tag:K,cls='',text='')=>{const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
function mount(){
 const select=document.getElementById('problemPreset') as HTMLSelectElement;if(!select)return;
 select.hidden=true;document.querySelector('label[for=problemPreset]')?.setAttribute('hidden','');
 const launch=el('button','problem-launcher');launch.type='button';launch.setAttribute('aria-haspopup','dialog');launch.setAttribute('aria-label','Browse tree problems');select.after(launch);
 const current=el('div','problem-current-meta');launch.after(current);
 const dialog=el('dialog','problem-dialog');dialog.id='problemCatalogue';dialog.setAttribute('aria-labelledby','catalogueTitle');
 const header=el('header'),intro=el('div');intro.append(el('div','ordinal','SUPERNOOL / PROBLEM LIBRARY'));const title=el('h2','','Trees of the clearing');title.id='catalogueTitle';intro.append(title,el('p','','Every problem is available. Badges show a known solving route, not the only possible rule set. Counts are verified reference solutions, not claims of minimum difficulty.'));
 const link=el('a','study-link','Explore rule tiles & Noolbox designs ↗');link.href='rule-workshop.html';link.target='_blank';link.rel='noopener';intro.append(link);const close=el('button','catalogue-close','×');close.type='button';close.setAttribute('aria-label','Close problem library');header.append(intro,close);dialog.append(header);
 const grid=el('div','problem-grid');dialog.append(grid);document.body.append(dialog);
 const cards=new Map<string,HTMLElement>();
 for(const p of problems){const ref=referenceSolutions[p.id][0],card=el('article','problem-card');cards.set(p.id,card);card.dataset.problem=p.id;
  const [number,...name]=p.title.split(' · ');card.append(el('div','ordinal',number.padStart(2,'0')+' / TREE PROBLEM'),el('h3','',name.join(' · ')));
  const eq=el('div','equation');eq.append(el('div','',readable(instantiate(p.start))),el('div','target','→ '+readable(instantiate(p.target))));card.append(eq);
  const metrics=el('div','metrics');metrics.append(el('span','',ref.steps.length+' moves · reference'),el('span','',ref.startNodes+' → '+ref.targetNodes+' nodes'));card.append(metrics);
  const badges=el('div');badges.append(el('div','caption','Rules in this route'),ruleStrip(ref.rules,'bar'));card.append(badges,el('p','',p.note));
  const details=el('details'),summary=el('summary','','Route & other known rule sets');details.append(summary);details.append(el('p','',`Largest tree on this route: ${ref.peakNodes} nodes. Expansions are capped at 31 in the scene.`));
  const list=el('ol');ref.steps.forEach(s=>list.append(el('li','',rules.find(r=>r.id===s.rule)!.name)));details.append(list);
  for(const alt of referenceSolutions[p.id].slice(1)){const a=el('div','alternative');a.append(el('p','',alt.steps.length+' moves · alternative route'),ruleStrip(alt.rules,'bar'));details.append(a);}
  if(referenceSolutions[p.id].length===1)details.append(el('p','','Only one sufficient rule set recorded so far. Others may exist.'));
  card.append(details);const choose=el('button','choose-problem','Choose problem');choose.type='button';choose.setAttribute('aria-label','Choose '+name.join(' · '));choose.onclick=()=>{if(select.disabled)return;if(select.value!==p.id){select.value=p.id;select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));}sync();dialog.close();};card.append(choose);grid.append(card);
 }
 function sync(){const p=problems.find(p=>p.id===select.value)??problems[0],ref=referenceSolutions[p.id][0];launch.replaceChildren();const label=el('span','','TREE PROBLEM');label.append(el('strong','',p.title),el('span','',ref.steps.length+' reference moves · browse all '+problems.length));launch.append(label,el('span','browse','↗'));launch.disabled=select.disabled;current.replaceChildren(el('span','','Reference route'),ruleStrip(ref.rules,'bar'));for(const [id,c]of cards){c.setAttribute('aria-current',String(id===p.id));const b=c.querySelector('button')!;b.disabled=select.disabled;b.textContent=id===p.id?'Current problem':'Choose problem';}}
 launch.onclick=()=>{sync();dialog.showModal();};close.onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});dialog.addEventListener('close',()=>launch.focus());
 // Modal keyboard and pointer input belongs to the catalogue, not the tree behind it.
 window.addEventListener('keydown',e=>{if(dialog.open)e.stopImmediatePropagation();},true);
 for(const type of ['pointerdown','pointerup','pointermove'])dialog.addEventListener(type,e=>e.stopPropagation());
 select.addEventListener('change',sync);new MutationObserver(sync).observe(select,{attributes:true,attributeFilter:['disabled']});sync();
 for(const input of document.querySelectorAll<HTMLInputElement>('#ruleList input[data-rule]'))input.after(ruleTile(input.dataset.rule!,'bar'));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
