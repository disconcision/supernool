/** Diagnostic for the existing physical factoring transition, not a CI success
 * assertion. Run via esbuild as described in design/knowledge/dragology.md. */
import {instantiate,problems} from '../../../explorations/018-painted-ground/problems';
import {derivedGestures} from '../../../explorations/018-painted-ground/derived-gestures';
import {layout,transition} from '../../../explorations/018-painted-ground/layout';
import {format} from '../../../explorations/018-painted-ground/algebra';
const config={spread:0,irregularity:0,height:'depth',seed:1};
const surface={thickness:.85,taper:.85,bow:.7,random:.3,twist:.3,facets:.4,seed:1,blend:.1,hewn:true,spread:0};
for(const tree of [instantiate(['+',['*',2,'x'],['*',3,'x']]),instantiate(problems.find(p=>p.id==='full-span')!.start)]){
 const gesture=derivedGestures(tree).find(g=>g.owner.id===tree.id&&g.action.key.startsWith('factor'))!;
 const before=layout(tree,config),promoted=gesture.after.id;
 const samples=[.25,.5,.75].map(t=>{
  const pose=transition(tree,gesture.after,t,config,gesture.action.key,gesture.action.merge,surface);
  const incoming=pose.edges.find(e=>e.id===promoted),junction=pose.points.get(promoted)!;
  return {t,promoted,incomingTip:incoming?.b.toArray(),junction:junction.toArray(),gap:incoming?.b.distanceTo(junction)};
 });
 console.log(JSON.stringify({before:format(tree),after:format(gesture.after),promotedWasChild:before.parents.has(promoted),samples},null,2));
}
