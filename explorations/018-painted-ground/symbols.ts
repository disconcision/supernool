/** Original Grow marks: landscape and growth motifs, not an alphabet. */
export const symbols = [
 {id:'parting',name:'Parting',note:'A path opens around a small clearing.',path:'M9 27 15 21 15 16 9 10 M15 16 22 10 M21 25 25 21',dot:[15,7]},
 {id:'graft',name:'Graft',note:'Two cut members find a new connection.',path:'M8 25 8 17 17 8 M13 26 24 15 24 8 M8 17 16 17 M18 15 24 15'},
 {id:'strata',name:'Strata',note:'An exposed section through three layers.',path:'M7 11 17 7 25 11 15 15 Z M7 17 15 21 25 17 M7 23 15 27 25 23'},
 {id:'bud',name:'Unfold',note:'A folded tip opening around a seed.',path:'M16 27 16 18 M16 18 8 14 7 7 14 10 16 18 M18 17 25 12 25 7',dot:[21,22]},
 {id:'cleft',name:'Cleft',note:'A split stone with an offset seam.',path:'M13 6 7 11 7 23 13 27 M20 6 25 10 25 22 20 27 M17 8 14 15 19 19 16 25'},
 {id:'shelter',name:'Shelter',note:'A ledge and a protected inner space.',path:'M6 16 12 8 23 8 27 14 M10 18 10 25 22 25 22 18',dot:[16,17]},
 {id:'weave',name:'Weave',note:'Two strands crossing without losing themselves.',path:'M9 6 9 11 23 21 23 26 M23 6 23 11 18 15 M14 18 9 21 9 26'},
 {id:'cairn',name:'Cairn',note:'Three balanced, uneven stones.',path:'M7 25 10 20 22 20 26 25 Z M10 16 12 11 21 12 23 16 Z M14 7 16 4 20 7'},
 {id:'orbit',name:'Companion',note:'A small presence beside a larger one.',path:'M13 7 7 12 7 22 14 26 20 23 M18 8 24 12 24 18',dot:[16,16]},
 {id:'root',name:'Rootwork',note:'A stem anchoring into branching cracks.',path:'M15 6 15 17 9 23 5 23 M15 17 21 21 26 21 M15 22 15 27 M19 11 24 8'},
 {id:'tide',name:'Terraces',note:'A descending run of low shelves.',path:'M6 10 14 7 25 7 M7 17 15 14 23 14 M10 24 17 21 26 21',dot:[6,27]},
 {id:'kernel',name:'Kernel',note:'A small joint held inside a cut shell.',path:'M12 6 6 13 9 24 18 27 26 19 24 9 19 6 M13 12 20 14 18 21 12 19 Z'}
];
export const roles = ['Encounter','Rewrite','Inspect'] as const;
export type Role = typeof roles[number];
export const defaults:Record<Role,string>={Encounter:'parting',Rewrite:'root',Inspect:'strata'};
export const symbolStorageKey='grow-018-dock-symbols';
export function choices():Record<Role,string>{
 let saved:Partial<Record<Role,string>>={};try{saved=JSON.parse(localStorage.getItem(symbolStorageKey)||'{}')||{};}catch{}
 // Move the previous default to the requested Rootwork mark once; later choices remain editable.
 try{if(!localStorage.getItem(symbolStorageKey+'-rootwork')){if(saved.Rewrite==='graft'){saved.Rewrite='root';localStorage.setItem(symbolStorageKey,JSON.stringify(saved));}localStorage.setItem(symbolStorageKey+'-rootwork','1');}}catch{}
 return Object.fromEntries(roles.map(role=>[role,symbols.some(s=>s.id===saved[role])?saved[role]:defaults[role]])) as Record<Role,string>;
}
export function symbolSVG(id:string){const s=symbols.find(s=>s.id===id)||symbols[0];return `<svg viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false"><path d="${s.path}" stroke="currentColor" stroke-width="1.85" stroke-linejoin="bevel" stroke-linecap="round"/>${s.dot?`<circle cx="${s.dot[0]}" cy="${s.dot[1]}" r="1.65" fill="currentColor"/>`:''}</svg>`;}
