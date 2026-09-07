import type {WebGLRenderer} from 'three';
export function createPerformanceStats(renderer:WebGLRenderer){
 const frames:number[]=[];let last=0;
 const write=(id:string,text:string)=>{const el=document.getElementById(id);if(el)el.textContent=text;};
 return {update(now:number,interval:number){
  if(interval>0&&interval<1000)frames.push(interval);if(frames.length>120)frames.shift();if(now-last<500||!frames.length)return;last=now;
  const mean=frames.reduce((s,n)=>s+n,0)/frames.length,sorted=[...frames].sort((a,b)=>a-b),info=renderer.info;
  write('fps',`${(1000/mean).toFixed(0)} fps`);write('frameTime',`${mean.toFixed(1)} / ${sorted[Math.floor((sorted.length-1)*.95)].toFixed(1)} ms`);
  write('drawStats',`${info.render.calls} / ${info.render.triangles.toLocaleString()}`);write('memoryStats',`${info.memory.geometries} / ${info.memory.textures}`);
  write('meshStats',document.getElementById('cost')?.textContent??'');
 }};
}
