/** Read-only witness for target scope; does not change gameplay policy.
 * Bundle with esbuild --platform=node, then run the emitted file. */
import assert from 'node:assert/strict';
import {initial,format,Term,walk} from '../../../explorations/018-painted-ground/algebra';
import {instantiate} from '../../../explorations/018-painted-ground/problems';
import {derivedGestures} from '../../../explorations/018-painted-ground/derived-gestures';
import {gestures} from '../../../explorations/018-painted-ground/gestures';
import {layout} from '../../../explorations/018-painted-ground/layout';
function paths(t:Term,p='',out=new Map<string,string>()){
 out.set(t.id,p);if(t.kind==='op'){paths(t.left,p+'L',out);paths(t.right,p+'R',out);}return out;
}
for(const tree of [initial(),instantiate(['+',['+',['+','a','b'],'c'],['+','d','e']])]){
 assert.equal(tree.kind,'op');if(tree.kind!=='op')continue;
 const held=tree.left,before=paths(tree),origin=layout(tree,{spread:0,height:'depth',irregularity:0,seed:1}).points.get(held.id)!;
 const modes=[['authored',gestures(tree,held.id)],['derived',derivedGestures(tree,held.id)]] as const;
 console.log(JSON.stringify({tree:format(tree),held:format(held)},null,2));
 for(const [mode,gs] of modes){
  assert.equal(gs.length,mode==='authored'?2:4);
  assert.equal(gs.filter(g=>g.action.key.startsWith('group')).length,mode==='authored'?1:3);
  for(const g of gs){
   assert.ok(walk(g.owner).some(n=>n.id===held.id),'held node belongs to rewrite site');
   const after=paths(g.after),point=layout(g.after,{spread:0,height:'depth',irregularity:0,seed:1}).points.get(held.id)!;
   console.log(JSON.stringify({mode,rule:g.action.key,site:before.get(g.owner.id)||'root',heldBefore:before.get(held.id),heldAfter:after.get(held.id)||'root',endpointDelta:point.clone().sub(origin).toArray(),result:format(g.after)}));
  }
 }
}
