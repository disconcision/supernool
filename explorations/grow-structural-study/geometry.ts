import {Tree,Id} from './model';
export type Point={x:number;y:number;depth:number;node:Tree};
export type Layout=Map<Id,Point>;
export function branchLayout(tree:Tree):Layout {
 const result:Layout=new Map();let leaf=0;
 function go(n:Tree,d:number):number{const xx=n.children.length?n.children.map(c=>go(c,d+1)):[leaf++*74];const x=xx.reduce((a,b)=>a+b,0)/xx.length;result.set(n.id,{x,y:-d*76,depth:d,node:n});return x;}
 const origin=go(tree,0);for(const point of result.values())point.x-=origin;return result;
}
export type Shelf={node:Tree;x:number;y:number;r:number;depth:number;children:Shelf[]};
/** Circle bounds guarantee nesting independently of the rounded island contour. */
export function shelves(tree:Tree,depth=0):Shelf {
 const children=tree.children.map(c=>shelves(c,depth+1));
 if(!children.length)return {node:tree,x:0,y:0,r:24,depth,children};
 const width=children.reduce((s,c)=>s+2*c.r*1.03,0)+22*(children.length-1);let cursor=-width/2;
 for(const c of children){c.x=cursor+c.r*1.03;c.y=-18;cursor+=2*c.r*1.03+22;}
 const r=(Math.max(...children.map(c=>Math.hypot(c.x,c.y)+c.r*1.03))+24)/.97;
 return {node:tree,x:0,y:0,r,depth,children};
}
export function flattenShelves(s:Shelf,x=0,y=0):Shelf[]{const here={...s,x:x+s.x,y:y+s.y};return [here,...s.children.flatMap(c=>flattenShelves(c,here.x,here.y))];}
