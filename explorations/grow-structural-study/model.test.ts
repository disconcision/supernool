import {apply,study,ids,node,wrap,atom,bin,value,Tree,Primitive4} from './model';
const rules=['commute','associate','identity','distribute'] as const;
for(const rule of rules)for(const basis of ['two','four'] as const)for(const nested of [false,true])for(const reverse of [false,true]){
 test(`${rule}/${basis}/nested=${nested}/reverse=${reverse}: exact endpoint, inverse, numeric semantics`,()=>{
  const s=study(rule,basis,nested,reverse);
  expect(s.steps.at(-1)!.tree).toEqual(s.expected);
  for(let i=1;i<s.steps.length;i++){
   const step=s.steps[i];expect(apply(step.tree,step.event!.inverse).tree).toEqual(s.steps[i-1].tree);
   expect(step.tree).not.toEqual(s.steps[i-1].tree);
   expect(new Set(ids(step.tree)).size).toBe(ids(step.tree).length);
   if(basis==='two')expect(['extend','retract']).toContain(step.event!.operation.kind);
  }
  for(let a=-3;a<=3;a++)for(let b=-2;b<=2;b++){
   const env={a,b,c:4,x:a,y:b};expect(value(s.steps[0].tree,env)).toBe(value(s.expected,env));
  }
 });
}
test('retract promotes an ordered block, never silently erases its descendants',()=>{
 const t=wrap(bin('p','+',bin('q','+',atom('a'),atom('b')),atom('c')));
 const r=apply(t,{kind:'retract',id:'q'});expect(r.tree.children[0].children.map(x=>x.id)).toEqual(['a','b','c']);expect(r.event.removed).toEqual(['q']);expect(t.children[0].children[0].id).toBe('q');
});
test('branch covers all descendant IDs, merge roundtrips and rejects unequal trees',()=>{
 const t=wrap(bin('p','+',bin('a','+',atom('x'),atom('y')),atom('b')));
 const op:Primitive4={kind:'branch',source:'a',index:2,copies:{a:'a2',x:'x2',y:'y2'}};
 const r=apply(t,op);expect(r.event.born).toEqual(['a2','x2','y2']);expect(apply(r.tree,r.event.inverse).tree).toEqual(t);
 expect(()=>apply(t,{kind:'merge',keep:'a',remove:'b'})).toThrow();
 expect(()=>apply(t,{...op,copies:{a:'a2'}})).toThrow();
 expect(()=>apply(t,{...op,copies:{a:'a2',x:'x',y:'y2'}})).toThrow();
});
test('invalid edits cannot corrupt root or ordered slots',()=>{
 const t=wrap(atom('a'));for(const op of [{kind:'retract',id:'world'},{kind:'extend',parent:'world',index:3,count:0,id:'p',label:'+'},{kind:'extend',parent:'world',index:0,count:2,id:'p',label:'+'}] as Primitive4[])expect(()=>apply(t,op)).toThrow();
});
test('general ordered-tree basis can roundtrip a mixed-arity tree through sentinel alone',()=>{
 const t=node('world','Ω',[node('r','f',[node('a','a'),node('g','g',[node('x','x'),node('h','h',[node('y','y')])]),node('b','b')])]);
 let current:Tree=t;const undo:Primitive4[]=[];
 function remove(n:Tree){n.children.forEach(remove);if(n.id==='world')return;const r=apply(current,{kind:'retract',id:n.id});current=r.tree;undo.push(r.event.inverse);}
 remove(t);expect(current).toEqual(node('world','Ω'));
 for(const op of undo.reverse())current=apply(current,op).tree;expect(current).toEqual(t);
});

import {shelves,Shelf} from './geometry';
test('recursive plateau footprints fit parent bounds and sibling footprints stay separate',()=>{
 for(const rule of rules)for(const basis of ['two','four'] as const)for(const nested of [false,true])for(const step of study(rule,basis,nested).steps){
  function check(s:Shelf){for(const c of s.children){expect(Math.hypot(c.x,c.y)+c.r*1.03).toBeLessThan(s.r*.97);check(c);}
   for(let i=0;i<s.children.length;i++)for(let j=i+1;j<s.children.length;j++){const a=s.children[i],b=s.children[j];expect(Math.hypot(a.x-b.x,a.y-b.y)).toBeGreaterThan((a.r+b.r)*1.03);}}
  check(shelves(step.tree));
 }
});
