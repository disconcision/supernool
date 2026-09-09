import {instantiate} from '../../../explorations/018-painted-ground/problems';
import {gestures} from '../../../explorations/018-painted-ground/gestures';
import {layout} from '../../../explorations/018-painted-ground/layout';
import {key,find} from '../../../explorations/018-painted-ground/algebra';
const memo=new Map<number,any[]>([[1,['x',0]]]);function terms(n:number):any[]{if(memo.has(n))return memo.get(n)!;const out=[];for(let l=1;l<n-1;l+=2)for(const a of terms(l))for(const b of terms(n-1-l))for(const op of ['+','*'])out.push([op,a,b]);memo.set(n,out);return out;}
const opt={spread:0,irregularity:0,height:'depth',seed:1};let tested=0,pairs=0;const witnesses=new Map();
for(const n of [3,5,7])for(const e of terms(n)){tested++;const tree=instantiate(e),before=layout(tree,opt),gs=gestures(tree),after=new Map(gs.map(g=>[g,layout(g.after,opt)]));
 const endpoint=(g:any)=>{const b=after.get(g)!;return (g.action.key==='swap'||g.action.key.startsWith('group')?b.points.get(g.gripId):b.points.get(g.targetId)??before.points.get(g.targetId))!;};
 for(let i=0;i<gs.length;i++)for(let j=i+1;j<gs.length;j++){const a=gs[i],b=gs[j];if(a.gripId!==b.gripId||key(a.after)===key(b.after))continue;pairs++;const d=endpoint(a).distanceTo(endpoint(b));if(d>1e-8)continue;const family=(s:string)=>s.split('-')[0],pair=[family(a.action.key),family(b.action.key)].sort().join('/');if(!witnesses.has(pair))witnesses.set(pair,{n,expression:key(tree),grip:key(find(tree,a.gripId)!),rules:[a.action.key,b.action.key],results:[key(a.after),key(b.after)],survives:[!!find(a.after,a.gripId),!!find(b.after,b.gripId)]});}}
console.log(JSON.stringify({grammar:'binary +/*, leaves x or 0, ordered trees, 3/5/7 nodes, fixed depth layout, no irregularity, current gesture table; no semantic quotient',tested,pairs,witnesses:[...witnesses.values()]},null,2));
