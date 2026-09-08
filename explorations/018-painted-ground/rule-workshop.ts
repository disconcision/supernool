import {rules} from './rule-definitions';
import {ruleTile,ruleStrip,TileStyle} from './rule-art';
import {referenceSolutions} from './problem-metadata';
import {problems} from './problems';
const $=(id:string)=>document.getElementById(id)!;
const make=(tag:string,cls='',text='')=>{const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
let chosen='factor',language:TileStyle='bar';const equipped=new Set(rules.map(r=>r.id));
for(const id of ['zero','factor','swap-add'])$('heroArt').append(ruleTile(id));
const treatments=[{id:'formula',tag:'A / THE CLEARING DEFAULT',title:'Formula stamps',note:'Literal, directional, compact. Best for learning a rule and reading a problem’s recipe. The small arrow is part of the stamp.'},{id:'bar',tag:'A1 / COMPACT IDENTITY',title:'Identity bars',note:'Equal expressions, separated by a short bar. Less vertical space, without an arrow implying a chosen direction.'},{id:'seal',tag:'B / RECOGNITION AT A GLANCE',title:'Pocket seals',note:'A two- or three-sign shorthand. More room for silhouette and color, but it needs a learned legend. Not a literal equation.'},{id:'motion',tag:'C / A GESTURE MEMORY',title:'Branch marks',note:'A mnemonic for movement, not a complete rewrite specification. A possible companion to the formulas rather than their replacement.'}];
function selectRule(id:string){chosen=id;for(const b of $('rulePicker').querySelectorAll('button'))b.setAttribute('aria-pressed',String(b.dataset.rule===id));$('comparisons').replaceChildren();
 for(const t of treatments){const card=make('article','treatment');card.append(make('div','tag',t.tag),make('h3','',t.title));const art=make('div','specimen');const tile=ruleTile(id,t.id as TileStyle);tile.tabIndex=0;art.append(tile);card.append(art,make('p','',t.note));$('comparisons').append(card);}
 $('sizes').replaceChildren();for(const size of [40,56,80]){const figure=make('figure');for(const style of ['formula','bar'] as TileStyle[]){const tile=ruleTile(id,style);tile.style.width=size+'px';tile.style.height=size*(style==='bar'?54/84:66/84)+'px';tile.tabIndex=0;figure.append(tile);}figure.append(make('figcaption','',size+' px'));$('sizes').append(figure);}
 inspect(id);
}
for(const r of rules){const b=document.createElement('button');b.textContent=r.name;b.dataset.rule=r.id;b.onclick=()=>selectRule(r.id);$('rulePicker').append(b);const cell=make('article','alphabet-cell');cell.append(make('p','',r.name));const row=make('div','three-tiles');for(const style of ['formula','bar','seal','motion'] as TileStyle[]){const tile=ruleTile(r.id,style);tile.tabIndex=0;row.append(tile);}cell.append(row,make('p','',r.equation));$('allRules').append(cell);}
function inspect(id:string){const r=rules.find(r=>r.id===id)!;$('tileInspection').textContent=r.name+'  ·  '+r.equation+'  ·  '+(equipped.has(id)?'Equipped':'Resting in the collection');}
function updateSelection(){for(const b of document.querySelectorAll<HTMLButtonElement>('.tray-slots button'))b.setAttribute('aria-pressed',String(equipped.has(b.dataset.rule!)));for(const n of document.querySelectorAll('.equipped-status'))n.textContent=equipped.size+' / '+rules.length+' equipped';$('knownRoutes').replaceChildren();
 for(const p of problems){const available=referenceSolutions[p.id].some(ref=>ref.rules.every(id=>equipped.has(id)));const row=make('div','route-status',p.title);row.dataset.available=String(available);row.append(make('small','',available?'Known route available':'No recorded route in this collection'));$('knownRoutes').append(row);}$('routeCount').textContent=$('knownRoutes').querySelectorAll('[data-available=true]').length+' / '+problems.length+' known routes available';inspect(chosen);
}
function trays(){for(const tray of ['flatTray','depthTray']){$(tray).replaceChildren();rules.forEach((r,i)=>{const b=document.createElement('button');b.dataset.rule=r.id;b.style.setProperty('--i',String(i));b.setAttribute('aria-label',r.name+' · '+r.equation);b.append(ruleTile(r.id,language));b.onclick=()=>{equipped.has(r.id)?equipped.delete(r.id):equipped.add(r.id);selectRule(r.id);updateSelection();};b.onpointerenter=()=>inspect(r.id);b.onfocus=()=>inspect(r.id);$(tray).append(b);});}updateSelection();}
($('tileLanguage') as HTMLSelectElement).onchange=e=>{language=(e.target as HTMLSelectElement).value as TileStyle;trays();};
($('trayDepth') as HTMLInputElement).oninput=e=>document.documentElement.style.setProperty('--depth',(e.target as HTMLInputElement).value);
($('trayMotion') as HTMLInputElement).onchange=e=>document.body.classList.toggle('moving',(e.target as HTMLInputElement).checked);
$('equipAll').onclick=()=>{rules.forEach(r=>equipped.add(r.id));updateSelection();};document.body.classList.add('moving');
const families=[{name:'Gather & factor',ids:['eval-add','factor'],note:'Known routes for opposing coefficients, compound factors and two crowns.'},{name:'With zero laws',ids:['eval-add','factor','zero','absorb'],note:'Adds a recorded route for cancellation and the vanishing crown.'},{name:'With unit laws',ids:['eval-add','factor','zero','absorb','one'],note:'Also covers the two identity-cleanup problems. This is a sufficient kit, not a minimal one.'}];
for(const f of families){const card=make('article','family');card.append(make('h3','',f.name),ruleStrip(f.ids),make('p','',f.note));$('ruleFamilies').append(card);}
function showTray(depth:boolean){$('flatContainer').hidden=depth;$('depthContainer').hidden=!depth;$('showFlat').setAttribute('aria-pressed',String(!depth));$('showDepth').setAttribute('aria-pressed',String(depth));}
$('showFlat').onclick=()=>showTray(false);$('showDepth').onclick=()=>showTray(true);
selectRule(chosen);trays();
