import * as T from 'three';import {Term,walk,children} from './algebra';import {prepare,Edge,Options} from './surface';
export type Pose={points:Map<string,T.Vector3>;parents:Map<string,string>;nodes:Map<string,Term>;edges:Edge[]};
export type LayoutOptions={spread:number;irregularity:number;height:string;seed:number};
const noise=(id:string,seed:number)=>Math.sin([...id].reduce((n,c)=>n+c.charCodeAt(0)*7,seed*29)*1.71);
export function layout(tree:Term,o:LayoutOptions):Pose{
 const points=new Map<string,T.Vector3>(),parents=new Map<string,string>(),nodes=new Map(walk(tree).map(t=>[t.id,t]));let leaf=0;const maxDepth=(n:Term):number=>n.kind==='op'?1+Math.max(maxDepth(n.left),maxDepth(n.right)):0,deep=maxDepth(tree);
 function place(n:Term,depth:number):number{let x;if(n.kind==='op'){parents.set(n.left.id,n.id);parents.set(n.right.id,n.id);x=(place(n.left,depth+1)+place(n.right,depth+1))/2;}else x=leaf++*1.2;
  const y=1.3+(o.height==='level'&&n.kind!=='op'?deep:depth)*1.5+(depth?o.irregularity*.4*noise(n.id,o.seed):0);points.set(n.id,new T.Vector3(x,y,0));return x;}
 place(tree,0);const rootX=points.get(tree.id)!.x;points.forEach(p=>p.x-=rootX);
 const spatial=new Map<string,T.Vector3>();spatial.set(tree.id,points.get(tree.id)!.clone());
 function grow(n:Term,d:number){for(const child of children(n)){const a=points.get(n.id)!,b=points.get(child.id)!,delta=b.x-a.x,angle=d*2.399963+o.seed*.3;spatial.set(child.id,spatial.get(n.id)!.clone().add(new T.Vector3(delta*Math.cos(angle),b.y-a.y,delta*Math.sin(angle))));grow(child,d+1);}}grow(tree,0);
 points.forEach((p,id)=>p.lerp(spatial.get(id)!,o.spread));
 const weight=(n:Term):number=>n.kind==='op'?weight(n.left)+weight(n.right):1;
 const edges:Edge[]=[{id:'stem',a:new T.Vector3(0,-.12,0),b:points.get(tree.id)!,r:.43}];
 for(const n of walk(tree)){const parent=parents.get(n.id);if(parent)edges.push({id:n.id,a:points.get(parent)!,b:points.get(n.id)!,r:.15*Math.sqrt(weight(n))});}
 return {points,parents,nodes,edges};
}
export const motionEase=(t:number,flow=0)=>flow*t+(1-flow)*t*t*(3-2*t);
export function transition(before:Term,after:Term,t:number,o:LayoutOptions,kind:string,merge:Record<string,string>={},surface?:Options,flow=0):Pose{
 if(kind.startsWith('group'))return regroup(before,after,t,o,surface,flow);
 const a=layout(before,o),b=layout(after,o),points=new Map<string,T.Vector3>(),ease=motionEase(t,flow);
 const ancestor=(id:string,source:Pose,target:Pose):string=>{let p:string|undefined=id;while(p&&!target.points.has(p))p=source.parents.get(p);return p??(target===b?after.id:before.id);};
 const all=new Set([...a.points.keys(),...b.points.keys()]);
 for(const id of all){const start=a.points.get(id)??a.points.get(merge[id]??ancestor(id,b,a))!,end=b.points.get(id)??b.points.get(merge[id]??ancestor(id,a,b))!;const p=start.clone().lerp(end,ease);
  if(kind==='swap'&&a.points.has(id)&&b.points.has(id))p.z+=Math.sin(Math.PI*t)*(end.x-start.x)*.5;
  points.set(id,p);
 }
 const route=(from:string,to:string)=>{const adj=new Map<string,Set<string>>();for(const pose of [a,b])for(const [child,parent] of pose.parents){if(!adj.has(child))adj.set(child,new Set());if(!adj.has(parent))adj.set(parent,new Set());adj.get(child)!.add(parent);adj.get(parent)!.add(child);}
  const queue=[[from]],seen=new Set([from]);for(const path of queue){const last=path[path.length-1];if(last===to)return path;for(const n of adj.get(last)??[])if(!seen.has(n)){seen.add(n);queue.push([...path,n]);}}return [from,to];};
 const attachment=(from:string,to:string)=>{const path=route(from,to);if(path.length===1)return points.get(from)!.clone();const f=ease*(path.length-1),i=Math.min(path.length-2,Math.floor(f));return points.get(path[i])!.clone().lerp(points.get(path[i+1])!,f-i);};
 const edges:Edge[]=[],retracted=new Map<string,T.Vector3>();const old=new Map(a.edges.map(e=>[e.id,e])),fresh=new Map(b.edges.map(e=>[e.id,e]));
 for(const id of new Set([...old.keys(),...fresh.keys()])){
  if(id==='stem'){edges.push({id,a:new T.Vector3(0,-.12,0),b:points.get(before.id)!.clone().lerp(points.get(after.id)!,ease),r:.43});continue;}
  const e0=old.get(id),e1=fresh.get(id),p0=a.parents.get(id),p1=b.parents.get(id);let end=points.get(id)!.clone();
  let start:T.Vector3;if(p0&&p1)start=attachment(p0,p1);else start=points.get((p0??p1)!)!.clone();
  // Retire material along the member, rather than making a full-length needle.
  // Sub-voxel needles otherwise break into disconnected specks at play resolution.
  const r=e0&&e1?e0.r+(e1.r-e0.r)*ease:(e0??e1)!.r;
  if(!e1){
   const kept=merge[id],targetParent=kept?b.parents.get(kept):undefined;
   if(kept&&targetParent){
    // Shared factors coalesce with the retained member at full thickness.
    // Both ends converge; there is no free needle thinning across empty space.
    start.lerp(points.get(targetParent)!,ease);
    end=a.points.get(id)!.clone().lerp(points.get(kept)!,ease);
   }else end=start.clone().lerp(end,1-ease);
   retracted.set(id,end);
  }
  if(!e0){
   const source=merge[id],sourceParent=source?a.parents.get(source):undefined;
   if(source&&a.points.has(source)){
    // A new distributive copy peels from its source member, not from the root.
    start=p1&&merge[p1]===sourceParent?points.get(p1)!.clone():attachment(sourceParent??source,p1!);
   }else end=start.clone().lerp(end,ease);
  }
  if(r>1e-5&&start.distanceTo(end)>1e-5)edges.push({id,a:start,b:end,r});
 }
 // A host-regrowth root may have been a child in the reduced expression.
 // Its retiring incoming member must not overwrite the surviving root point.
 for(const [id,p] of retracted)if(kind!=='regrow'||!b.points.has(id))points.set(id,p);
 const nodes=t<.5?a.nodes:b.nodes;return {points,parents:b.parents,nodes,edges};
}

/** Exchange the two junctions as one connected structure. Edge identity here is
 * physical: the P–Q connector and incoming support survive a parent reversal. */
function regroup(before:Term,after:Term,t:number,o:LayoutOptions,surface?:Options,flow=0):Pose{
 const a=layout(before,o),b=layout(after,o);
 if(t<=0)return a;if(t>=1)return b;
 const pair=[...a.parents].find(([q,p])=>b.parents.get(p)===q);
 if(!pair)throw new Error('Regroup requires a reversed junction pair');
 const [q,p]=pair,u=motionEase(t,flow),points=new Map<string,T.Vector3>();
 for(const [id,start] of a.points)points.set(id,start.clone().lerp(b.points.get(id)!,u));
 const old=new Map(a.edges.map(e=>[e.id,e])),fresh=new Map(b.edges.map(e=>[e.id,e]));
 const curve=(e:Edge)=>surface?prepare(e,surface).curve:new T.Vector3();
 const connector:Edge={id:q,a:points.get(p)!,b:points.get(q)!,r:T.MathUtils.lerp(old.get(q)!.r,fresh.get(p)!.r,u),curve:curve(old.get(q)!).lerp(curve(fresh.get(p)!),u)};
 // As P and Q trade depth the connector can contract completely. Its midpoint
 // then remains their shared junction, rather than a floating third attachment.
 connector.curve!.clampLength(0,connector.a.distanceTo(connector.b)*.3);
 const along=(f:number)=>connector.a.clone().lerp(connector.b,f).addScaledVector(connector.curve!,Math.sin(Math.PI*f));
 const attachment=(from:string,to:string)=>from===to?points.get(from)!.clone():along(from===p?u:1-u);
 const edges:Edge[]=[];
 // Incoming support changes its child identity (or root) but is never retired.
 const incoming0=old.get(p)??old.get('stem')!,incoming1=fresh.get(q)??fresh.get('stem')!;
 const parent=a.parents.get(p);
 edges.push({id:parent?p:'stem',a:parent?points.get(parent)!:incoming0.a.clone(),b:along(u),r:T.MathUtils.lerp(incoming0.r,incoming1.r,u),curve:curve(incoming0).lerp(curve(incoming1),u)});
 if(connector.a.distanceToSquared(connector.b)>1e-10)edges.push(connector);
 for(const e of a.edges){if(e.id===p||e.id===q||(!parent&&e.id==='stem'))continue;
  if(e.id==='stem'){edges.push({...e,a:e.a.clone(),b:points.get(before.id)!});continue;}
  const next=fresh.get(e.id)!;
  edges.push({id:e.id,a:attachment(a.parents.get(e.id)!,b.parents.get(e.id)!),b:points.get(e.id)!,r:T.MathUtils.lerp(e.r,next.r,u)});
 }
 return {points,parents:b.parents,nodes:a.nodes,edges};
}
