import {instantiate,problems,Expression} from '../../../explorations/018-painted-ground/problems';
import {derivedGestures} from '../../../explorations/018-painted-ground/derived-gestures';
import {gestures} from '../../../explorations/018-painted-ground/gestures';
import {layout} from '../../../explorations/018-painted-ground/layout';
import {Term,walk} from '../../../explorations/018-painted-ground/algebra';
const options={spread:0,irregularity:0,height:'depth',seed:1};
const witness:Expression=['+',['+',['*',3,['+','x','y']],['*',-3,['+','x','y']]],'y'];
for(const [name,expression] of [['13-node witness',witness],['Hollow Crown',problems.find(p=>p.id==='hollow-crown')!.start]] as const){
 const tree=instantiate(expression);if(tree.kind!=='op'||tree.left.kind!=='op'||tree.left.right.kind!=='op')throw Error('shape');const held=tree.left.right.right.id;
 const before=layout(tree,options).points.get(held)!;
 const rows=[];
 for(const [variant,gs] of [['authored',gestures(tree,held)],['derived',derivedGestures(tree,held)]] as const){
  const endpoints=gs.filter(g=>g.action.key.startsWith('factor')||g.action.key.startsWith('distribute')).map(g=>{const after=layout(g.after,options);const end=after.points.get(g.derived?g.gripId:g.targetId)!;return {rule:g.action.key.split('-')[0],end,delta:end.clone().sub(before)};});
  const a=endpoints.find(e=>e.rule==='factor')!,b=endpoints.find(e=>e.rule==='distribute')!;
  rows.push({variant,angle3D:a.delta.angleTo(b.delta)*180/Math.PI,separation:a.end.distanceTo(b.end),factor:a.end.toArray(),distribute:b.end.toArray()});
 }
 console.log(JSON.stringify({name,source:before.toArray(),rows}));
}
