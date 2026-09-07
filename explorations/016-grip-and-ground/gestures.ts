import {Term,Action,walk,actions,replace} from './algebra';
export type Gesture={owner:Term;action:Action;gripId:string;braceId:string;targetId:string;instruction:string;after:Term};
/** Map valid term rewrites to the two physical contacts that express them. */
export function gestures(tree:Term,gripId?:string):Gesture[]{
 const result:Gesture[]=[];
 for(const owner of walk(tree)){
  if(owner.kind!=='op')continue;
  const {left:a,right:b}=owner;
  for(const action of actions(owner)){
   const add=(grip:Term|string,brace:Term|string,target:Term|string,instruction:string)=>{
    const id=(n:Term|string)=>typeof n==='string'?n:n.id;
    if(!gripId||id(grip)===gripId)result.push({owner,action,gripId:id(grip),braceId:id(brace),targetId:id(target),instruction,after:replace(tree,owner.id,action.result)});
   };
   if(action.key==='swap'){add(a,owner,b,'Carry this branch around its sibling');add(b,owner,a,'Carry this branch around its sibling');}
   if(action.key==='group-right')add(a,owner,owner,'Lower this junction to regroup');
   if(action.key==='group-left')add(b,owner,owner,'Lower this junction to regroup');
   if(action.key.endsWith('-left')&&(action.key.startsWith('zero')||action.key.startsWith('one')))add(a,owner,owner,'Press the identity into its junction');
   if(action.key.endsWith('-right')&&(action.key.startsWith('zero')||action.key.startsWith('one')))add(b,owner,owner,'Press the identity into its junction');
   if(action.key==='calculate')add(b,a,owner,'Gather the numbers into their junction');
   if(action.merge)for(const [removed,kept] of Object.entries(action.merge)){
    // Nested common factors travel as one whole branch, not one gesture per leaf.
    if(!walk(owner).some(n=>n.kind==='op'&&action.merge[n.id]&&walk(n).slice(1).some(c=>c.id===removed)))add(removed,kept,kept,'Bring the matching branches together');
   }
  }
 }
 return result;
}
export function scoreDrag(from:{x:number;y:number},to:{x:number;y:number},cursor:{x:number;y:number}){
 const dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy);
 if(length<1)return {progress:0,distance:Infinity,ready:false};
 const raw=((cursor.x-from.x)*dx+(cursor.y-from.y)*dy)/(length*length);
 const progress=Math.min(1,Math.max(0,raw));
 const distance=Math.hypot(cursor.x-from.x-progress*dx,cursor.y-from.y-progress*dy);
 return {progress,distance,ready:raw>=.88&&raw<=1.35&&distance<Math.max(24,Math.min(48,length*.3))};
}
