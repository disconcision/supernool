import * as T from 'three';
/** Authoring paths: enough clearance for a worn footpath around static stones. */
export function dirtRoutes(rocks:{x:number;z:number;r:number}[]){
 const cell=.5,N=105,half=26,key=(x:number,z:number)=>z*N+x,xy=(v:number)=>Math.round((v+half)/cell);
 const blocked=(x:number,z:number)=>rocks.some(r=>Math.hypot(x-r.x,z-r.z)<r.r+.75);
 function route(start:number[],end:number[]){
  const source=key(xy(start[0]),xy(start[1])),target=key(xy(end[0]),xy(end[1])),open=new Set([source]),cost=new Map([[source,0]]),prev=new Map<number,number>();
  const position=(k:number)=>new T.Vector3((k%N)*cell-half,.04,Math.floor(k/N)*cell-half);
  while(open.size){let best=-1,score=Infinity;for(const k of open){const p=position(k),f=cost.get(k)!+Math.hypot(p.x-end[0],p.z-end[1]);if(f<score){score=f;best=k;}}if(best===target)break;open.delete(best);
   const x=best%N,z=Math.floor(best/N);for(const dx of [-1,0,1])for(const dz of [-1,0,1]){if(!dx&&!dz)continue;const nx=x+dx,nz=z+dz;if(nx<0||nz<0||nx>=N||nz>=N)continue;const k=key(nx,nz),p=position(k);if(blocked(p.x,p.z))continue;const c=cost.get(best)!+Math.hypot(dx,dz)*cell;if(c<(cost.get(k)??Infinity)){cost.set(k,c);prev.set(k,best);open.add(k);}}
  }
  if(!prev.has(target))throw new Error('No dirt route');const result=[position(target)];let k=target;while(k!==source){k=prev.get(k)!;result.push(position(k));}return result.reverse();
 }
 return [route([0,24],[-1,-3]),route([-1,-3],[-15,-24]),route([-1,-3],[18,-24])];
}
