import {Term,num,variable,op} from './algebra';
export type Expression=number|string|['+'|'*',Expression,Expression];
export type Problem={id:string;title:string;start:Expression;target:Expression;note:string};
const add=(a:Expression,b:Expression):Expression=>['+',a,b],mul=(a:Expression,b:Expression):Expression=>['*',a,b];
export const problems:Problem[]=[
 {id:'clearing',title:'01 · The original clearing',start:add(add(add(mul(2,'x'),0),'y'),add(mul(3,'x'),0)),target:add(mul(5,'x'),'y'),note:'Swap and regroup to collect matching branches.'},
 {id:'identities',title:'02 · Shed the extra branches',start:add(mul(add('x',0),1),add(0,mul('y',1))),target:add('x','y'),note:'Remove additive and multiplicative identities.'},
 {id:'arithmetic',title:'03 · A canopy of numbers',start:mul(add(2,3),add(4,2)),target:30,note:'Gather each pair, then multiply.'},
 {id:'left-factors',title:'04 · Factors facing the other way',start:add(mul('x',2),mul('x',3)),target:mul(5,'x'),note:'The common factor can appear on either side.'},
 {id:'nested-factor',title:'05 · Carry a whole subtree',start:add(mul(2,add('x','y')),mul(3,add('x','y'))),target:mul(5,add('x','y')),note:'Merge the whole matching x + y branches.'},
 {id:'product-ladder',title:'06 · Product ladder',start:mul(mul(2,'x'),mul(3,1)),target:mul(6,'x'),note:'Regroup multiplication to gather separated numbers.'},
 {id:'zero-storm',title:'07 · The vanishing crown',start:add(mul(add('x','y'),0),add(mul(2,'x'),mul(3,'x'))),target:mul(5,'x'),note:'A zero factor absorbs a whole branch.'},
 {id:'signed-coefficients',title:'08 · Opposing coefficients',start:add(mul(7,'x'),mul(-2,'x')),target:mul(5,'x'),note:'Negative numbers are atoms; collect their coefficients.'},
 {id:'cancellation',title:'09 · Cancel a pair',start:add(add(mul(3,'x'),mul(-3,'x')),'y'),target:'y',note:'Factor, calculate 3 + (−3), then absorb the zero.'},
 {id:'expand-collect',title:'10 · Grow before shrinking',start:add(mul(2,add('x',3)),mul(3,'x')),target:add(mul(5,'x'),6),note:'Distribute into the sum before collecting the x terms.'},
 {id:'two-crowns',title:'11 · Two crowns',start:add(add(mul(2,'x'),mul(3,'x')),add(mul(4,'y'),mul(2,'y'))),target:add(mul(5,'x'),mul(6,'y')),note:'Simplify two independent sets of matching branches.'},
 {id:'nested-units',title:'12 · Units within units',start:mul(add('x',0),mul(1,add('y',0))),target:mul('x','y'),note:'Keep the product while clearing its nested identities.'},
];
export function instantiate(e:Expression):Term{return typeof e==='number'?num(e):typeof e==='string'?variable(e):op(e[0],instantiate(e[1]),instantiate(e[2]));}
export function problemById(id:string){return problems.find(p=>p.id===id)??problems[0];}
