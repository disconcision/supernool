import {study,expression,Step,Rule,Basis,Tree} from './model';
import {branchLayout,shelves,flattenShelves} from './geometry';
const $=(id:string)=>document.getElementById(id)!;
const choice=(id:string)=>$(id) as HTMLSelectElement;
const checked=(id:string)=>($(id) as HTMLInputElement).checked;
let projection:'lines'|'thick'|'plates'='lines',selected=0;
let current=study('associate','two');
const esc=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const colors:Record<string,string>={a:'#bd783f',a2:'#bd783f',x:'#bd783f',x2:'#bd783f',y:'#bc9a55',y2:'#bc9a55',b:'#538794',c:'#8f6999',z:'#879281',p:'#52745c',q:'#87a076',m:'#54645e',m2:'#54645e',world:'#c3cbb8'};
const color=(id:string)=>colors[id]??'#677d6b';
function role(step:Step,id:string):string{if(step.event?.born.includes(id))return '#c45f2f';return color(id);}
function contour(x:number,y:number,r:number,depth:number,side=0){const points=[];for(let i=0;i<=72;i++){const t=i/72*Math.PI*2;const k=1+.025*Math.sin(3*t+.5);points.push(`${(x+r*k*Math.cos(t)).toFixed(2)},${(y*.52+r*k*Math.sin(t)*.52-depth*7+side).toFixed(2)}`);}return 'M'+points.join(' L')+' Z';}
function draw(step:Step):string{
 let content='',vb='';
 if(projection==='plates'){
  const all=current.steps.map(s=>shelves(s.tree)),r=Math.max(...all.map(s=>s.r));vb=`${-r*1.1} ${-r*.68-45} ${r*2.2} ${r*1.36+90}`;
  const flat=flattenShelves(shelves(step.tree));
  for(const s of flat){const c=s.node.id==='world'?'#e1e5d5':s.node.children.length?'#b5c4a2':s.node.label==='0'?'#d8d8ca':'#d6d9b7';const cy=s.y*.52-s.depth*7;
   content+=`<path d="${contour(s.x,s.y,s.r,s.depth,7)}" fill="#7c8c78" stroke="#72826e" stroke-width="1.2"/><path d="${contour(s.x,s.y,s.r,s.depth)}" fill="${c}" stroke="${role(step,s.node.id)}" stroke-width="${step.event?.born.includes(s.node.id)?3:1.5}"/>`;
   const labelY=cy+(s.children.length?s.r*.40:4);const font=Math.max(12,Math.min(18,r/15));
   content+=`<text x="${s.x}" y="${labelY}" text-anchor="middle" font-size="${font}" fill="#2e4235">${esc(s.node.label==='*'?'×':s.node.label)}</text><text x="${s.x}" y="${labelY+font*.8}" text-anchor="middle" font-family="monospace" font-size="${font*.6}" fill="#536a54">${esc(s.node.id)}</text>`;
  }
 }else{
  const layouts=current.steps.map(s=>branchLayout(s.tree)),points=layouts.flatMap(l=>[...l.values()]);const minX=Math.min(...points.map(p=>p.x))-35,maxX=Math.max(...points.map(p=>p.x))+35,minY=Math.min(...points.map(p=>p.y))-40;
  vb=`${minX} ${minY} ${Math.max(200,maxX-minX)} ${-minY+35}`;
  const layout=branchLayout(step.tree);
  for(const p of layout.values())for(const child of p.node.children){const c=layout.get(child.id)!;const d=`M ${p.x} ${p.y} L ${c.x} ${c.y}`;
   content+=projection==='thick'?`<path d="${d}" fill="none" stroke="#87977e" stroke-width="18" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#b9c6a5" stroke-width="12" stroke-linecap="round"/>`:`<path d="${d}" fill="none" stroke="#8b9b8c" stroke-width="2"/>`;
  }
  for(const p of layout.values()){const rad=projection==='thick'?18:11;content+=`<circle cx="${p.x}" cy="${p.y}" r="${rad}" fill="#fffdf5" stroke="${role(step,p.node.id)}" stroke-width="${step.event?.born.includes(p.node.id)?3:2}"/><text x="${p.x}" y="${p.y+4}" text-anchor="middle" font-size="13" fill="#294334">${esc(p.node.label==='*'?'×':p.node.label)}</text><text x="${p.x+rad+4}" y="${p.y+3}" font-family="monospace" font-size="9" fill="#718170">${esc(p.node.id)}</text>`;}
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${esc(step.caption+'; '+expression(step.tree))}" style="font-family:system-ui,sans-serif"><title>${esc(step.caption)}</title>${content}</svg>`;
}
function describe(step:Step){const op=step.event?.operation;if(!op)return 'The source term. Ω is a fixed world/context sentinel, not an arithmetic operator.';
 switch(op.kind){case 'extend':return `Insert ${op.label} [${op.id}] under ${op.parent}, at zero-based slot ${op.index}. It adopts ${op.count} consecutive existing children. A zero count creates a leaf. Orange marks the inserted node.`;case 'retract':return `Remove node ${op.id}, promoting its children without changing their relative order. Removed ID: ${step.event!.removed.join(', ')}. Descendants are not implicitly deleted.`;case 'branch':return `Copy the entire subtree ${op.source} to sibling slot ${op.index}. Each descendant receives a distinct ID; the explicit source→copy map below is part of this event.`;case 'merge':return `Coalesce equal sibling subtrees: retain ${op.keep}, remove ${op.remove}. All corresponding descendants are checked before the merge.`;}
}
function detail(){const step=current.steps[selected];$('event-title').textContent=`${selected===0?'Source':`Event ${selected}`} · ${step.event?.operation.kind??'term'}`;$('event-description').textContent=describe(step);$('event-code').textContent=JSON.stringify(step.event?{operation:step.event.operation,inverse:step.event.inverse}:step.tree,null,2);$('large').innerHTML=draw(step);
 ($('previous') as HTMLButtonElement).disabled=selected===0;($('next') as HTMLButtonElement).disabled=selected===current.steps.length-1;
 document.querySelectorAll('.frame').forEach((f,i)=>f.classList.toggle('selected',i===selected));
}
function render(){
 $('equation').textContent=`${expression(current.steps[0].tree)} → ${expression(current.expected)}`;$('explanation').textContent=current.explanation;
 $('projection-note').textContent=projection==='lines'?'Exact adjacency and child order. Read bottom-up from Ω. Each small ID names one occurrence. Intermediate captions explicitly identify the structural edit.':projection==='thick'?'The same skeleton, with discs and thick members. These are static planar joints—not a solved solid-surface transition. Labels and IDs are unchanged.':'Uniform softly lobed solid plateaus, generated recursively from the same tree. Each child footprint fits inside its parent in plan; the oblique view lifts each layer slightly. Ω is the common base.';
 $('frames').innerHTML=current.steps.map((s,i)=>`<button class="frame ${selected===i?'selected':''}" data-step="${i}"><span class="stepno">${i===0?'SOURCE':`EVENT ${i} / ${s.event!.operation.kind.toUpperCase()}`}</span><h3>${esc(s.caption)}</h3>${draw(s)}<p class="formula">${esc(expression(s.tree))}</p></button>`).join('');detail();
}
function reset(){current=study(choice('rule').value as Rule,choice('basis').value as Basis,checked('nested'),checked('reverse'));selected=0;render();}
for(const id of ['rule','basis','nested','reverse'])$(id).addEventListener('change',reset);
$('views').onclick=e=>{const b=(e.target as HTMLElement).closest<HTMLButtonElement>('[data-view]');if(!b)return;projection=b.dataset.view as typeof projection;document.querySelectorAll('[data-view]').forEach(x=>x.setAttribute('aria-pressed',String((x as HTMLElement).dataset.view===projection)));render();};
$('frames').onclick=e=>{const b=(e.target as HTMLElement).closest<HTMLButtonElement>('[data-step]');if(!b)return;selected=Number(b.dataset.step);detail();};
$('previous').onclick=()=>{selected=Math.max(0,selected-1);detail();};$('next').onclick=()=>{selected=Math.min(current.steps.length-1,selected+1);detail();};
$('export').onclick=()=>{const blob=new Blob([draw(current.steps[selected])],{type:'image/svg+xml'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`${current.rule}-${current.basis}-${projection}-event-${selected}.svg`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
reset();
