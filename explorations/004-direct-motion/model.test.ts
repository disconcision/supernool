import {apply,example,ids,locate,swapPosition,Complexity} from './model';
for(const complexity of ['simple','nested','uneven'] as Complexity[]){
 test('swap preserves whole operands and is involutive: '+complexity,()=>{const e=example('swap',complexity);expect(apply(e.after,e.edit)).toEqual(e.before);for(const id of ['a','b'])expect(locate(e.after,id)).toBe(locate(e.before,id));expect(ids(e.after).sort()).toEqual(ids(e.before).sort());});
 test('regroup keeps operands and both operators: '+complexity,()=>{const e=example('regroup',complexity);expect(apply(e.after,{kind:'regroup',parent:'p',direction:'left'})).toEqual(e.before);for(const id of ['a','b','c'])expect(locate(e.after,id)).toBe(locate(e.before,id));expect(ids(e.after).sort()).toEqual(ids(e.before).sort());});
 test('identity keeps operand and creates exactly two IDs: '+complexity,()=>{const e=example('identity',complexity);expect(locate(e.after,'a')).toBe(e.before);expect(ids(e.after).filter(id=>!ids(e.before).includes(id))).toEqual(['p','zero']);});
}
test('orbit maintains root separation and reaches swapped endpoints',()=>{for(let i=0;i<=100;i++){const a=swapPosition(-1,i/100,'orbit'),b=swapPosition(1,i/100,'orbit');expect(Math.hypot(a.x-b.x,a.z-b.z)).toBeCloseTo(300);};expect(swapPosition(-1,1,'orbit').x).toBeCloseTo(150);expect(swapPosition(1,1,'orbit').x).toBeCloseTo(-150);expect(Math.abs(swapPosition(-1,.5,'flat').x-swapPosition(1,.5,'flat').x)).toBeCloseTo(0);});
test('invalid slots and ID collisions rejected',()=>{const e=example('swap','nested');expect(()=>apply(e.before,{kind:'swap',parent:'p',left:0,right:8})).toThrow();expect(()=>apply(e.before,{kind:'add-zero',target:'a',sum:'p',zero:'z'})).toThrow();});
for(const complexity of ['simple','nested','uneven'] as Complexity[]){
 test('alternate associativity exchanges operator roles and preserves operands: '+complexity,()=>{
  const e=example('regroup',complexity,'exchange-roles');
  expect(e.after.id).toBe('q');expect(e.after.children[1].id).toBe('p');
  for(const id of ['a','b','c'])expect(locate(e.after,id)).toBe(locate(e.before,id));
  expect(ids(e.after).sort()).toEqual(ids(e.before).sort());
  expect(apply(e.after,{kind:'regroup',parent:'q',direction:'left',mapping:'exchange-roles'})).toEqual(e.before);
 });
}
