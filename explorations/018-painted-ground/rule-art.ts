import {rules} from './rule-definitions';
export type TileStyle='formula'|'seal'|'motion';
export const tileForms:Record<string,{top:string;bottom:string;seal:string}>={
 'swap-add':{top:'a + b',bottom:'b + a',seal:'+↔'},'swap-mul':{top:'a · b',bottom:'b · a',seal:'×↔'},
 'assoc-add':{top:'(a+b)+c',bottom:'a+(b+c)',seal:'+↷'},'assoc-mul':{top:'(ab)c',bottom:'a(bc)',seal:'×↷'},
 zero:{top:'a + 0',bottom:'a',seal:'+0'},one:{top:'a · 1',bottom:'a',seal:'×1'},absorb:{top:'a · 0',bottom:'0',seal:'×0'},
 distribute:{top:'a(b+c)',bottom:'ab + ac',seal:'↗×'},factor:{top:'ab + ac',bottom:'a(b+c)',seal:'×↙'},
 'eval-add':{top:'3 + 2',bottom:'5',seal:'Σ#'},'eval-mul':{top:'3 · 2',bottom:'6',seal:'Π#'},
};
const ns='http://www.w3.org/2000/svg';
export function ruleTile(id:string,style:TileStyle='formula'){
 const rule=rules.find(r=>r.id===id)!;const form=tileForms[id];const tile=document.createElement('span');tile.className='rule-tile '+style;tile.style.setProperty('--ink',rule.color);tile.title=rule.name+' · '+rule.equation;tile.setAttribute('role','img');tile.setAttribute('aria-label',tile.title);
 const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 84 66');svg.setAttribute('aria-hidden','true');
 const text=(s:string,x:number,y:number,size:number)=>{const el=document.createElementNS(ns,'text');el.setAttribute('x',String(x));el.setAttribute('y',String(y));el.setAttribute('font-size',String(size));el.setAttribute('text-anchor','middle');el.textContent=s;svg.append(el);};
 const path=(d:string)=>{const el=document.createElementNS(ns,'path');el.setAttribute('d',d);el.setAttribute('fill','none');el.setAttribute('stroke','currentColor');el.setAttribute('stroke-width','1.7');el.setAttribute('stroke-linecap','round');el.setAttribute('stroke-linejoin','round');svg.append(el);};
 if(style==='formula'){text(form.top,42,24,form.top.length>6?14:17);path('M 42 29 V 37 M 38 33 L 42 37 L 46 33');text(form.bottom,42,53,form.bottom.length>6?14:17);}
 else if(style==='seal'){path('M 24 9 H 60 L 74 33 L 60 57 H 24 L 10 33 Z');text(form.seal,42,41,23);}
 else{
  const node=(x:number,y:number,label:string)=>{const c=document.createElementNS(ns,'circle');c.setAttribute('cx',String(x));c.setAttribute('cy',String(y));c.setAttribute('r','9');c.setAttribute('fill','currentColor');c.setAttribute('opacity','.13');svg.append(c);text(label,x,y+4,12);};
  if(id.startsWith('swap')){path('M 22 40 Q 42 4 62 40 M 58 31 L 62 40 L 65 31 M 61 46 Q 42 64 23 46');node(22,42,'a');node(62,42,'b');text(id.endsWith('add')?'+':'×',42,45,15);}
  else if(id.startsWith('assoc')){path('M 13 17 L 28 36 L 44 17 M 28 36 L 43 54 L 69 17 M 30 35 Q 60 32 44 51');node(28,36,id.endsWith('add')?'+':'×');node(43,54,id.endsWith('add')?'+':'×');}
  else if(id==='distribute'||id==='factor'){path('M 42 39 L 19 16 M 42 39 L 65 16 M 42 39 V 56');node(42,42,'a');node(19,16,'b');node(65,16,'c');text(id==='factor'?'↘ ↙':'↖ ↗',42,29,19);}
  else{path('M 19 14 L 42 44 L 65 14 M 62 28 L 48 42 M 49 35 L 48 42 L 55 41');node(19,14,id.startsWith('eval')?'3':'a');node(65,14,id==='one'?'1':id.startsWith('eval')?'2':'0');node(42,48,form.bottom);}
 }
 tile.append(svg);return tile;
}
export function ruleStrip(ids:string[],style:TileStyle='formula'){const strip=document.createElement('div');strip.className='rule-strip';ids.forEach(id=>strip.append(ruleTile(id,style)));return strip;}
