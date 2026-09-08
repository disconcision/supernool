import assert from 'node:assert/strict';
import {problems} from './problems';
import {referenceSolutions} from './problem-metadata';
import {verifyReference,includesRules,canSolveWith} from './problem-reference';
import {tileForms} from './rule-art';
import {rules} from './rule-definitions';
for(const p of problems){assert(referenceSolutions[p.id]?.length);for(const ref of referenceSolutions[p.id]){verifyReference(p,ref);assert(canSolveWith(ref.rules,referenceSolutions[p.id]));assert(ref.rules.every(id=>rules.some(r=>r.id===id)));}}
for(const r of rules)assert(tileForms[r.id]?.top&&tileForms[r.id]?.bottom);
assert(includesRules(['factor','eval-add','zero'],['factor','eval-add']));assert(!includesRules(['factor'],['factor','eval-add']));
assert(!canSolveWith([],referenceSolutions.cancellation));
const original=referenceSolutions.arithmetic[0],corrupt=structuredClone(original);corrupt.steps[0].result='not a legal result';assert.throws(()=>verifyReference(problems.find(p=>p.id==='arithmetic')!,corrupt));
console.log('All problem metadata replays legally; rule kits, copied IDs, goals and tile coverage verified.');
