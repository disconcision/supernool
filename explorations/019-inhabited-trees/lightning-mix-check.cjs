const assert=require('node:assert/strict'),esbuild=require('esbuild'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const out=path.join(os.tmpdir(),'supernool-lightning-'+process.pid+'.cjs');
esbuild.buildSync({entryPoints:[path.join(__dirname,'storm-lightning.ts')],bundle:true,platform:'node',format:'cjs',outfile:out});
const {arcDefaults:o,arcEvent,mixedLightning,flashTimeline,strokePattern}=require(out);fs.unlinkSync(out);
const T=require('three');const lobes=[{x:.3,y:.6,rx:.06,ry:.1},{x:.5,y:.6,rx:.08,ry:.12},{x:.7,y:.6,rx:.1,ry:.14}];
const branches=[new T.Vector2(.3,.55),new T.Vector2(.6,.65)],rocks=[new T.Vector2(.1,.2),new T.Vector2(.9,.2)];
let counts={};for(const k of ['small','medium','large']){const slots=new Set();for(let i=0;i<60000;i++){const e=arcEvent(k,i/100,0,o);if(e.power>0)slots.add(e.slot);}counts[k]=slots.size;assert.equal(arcEvent(k,1,1,{...o,[k+'Rate']:0}).power,0);}
assert.ok(counts.small>counts.medium*5&&counts.medium>counts.large*3,JSON.stringify(counts));
for(const preview of ['small','medium','branch','rock']){const b=mixedLightning(lobes,branches,rocks,0,.2,o,preview);assert.ok(b.segments.length>=12,preview);assert.equal(b.events.length,1);for(const s of b.segments)assert.ok([...s.a.toArray(),...s.b.toArray(),s.power].every(Number.isFinite));if(preview==='rock'||preview==='branch'){assert.equal(b.events[0].target,preview);const endpoints=preview==='rock'?rocks:branches;assert.ok(endpoints.some(p=>p.distanceTo(b.segments[11].b)<1e-6),'main strike must reach actual target');}}
for(const kind of ['small','medium','large']){let lit=0;for(let i=0;i<10000;i++)if(arcEvent(kind,i/1000,0,{...o,[kind+'Rate']:1}).power>0)lit++;assert.ok(lit<2500,'flashes must leave most of the timeline dark');}
console.log('Independent frequencies, zero rates, all preview sizes, finite forks and actual contacts passed',counts);

// Distribution checks use long deterministic samples, not flaky wall-clock waits.
function metrics(events,seconds){const gaps=events.slice(1).map((e,i)=>e.start-events[i].start),mean=gaps.reduce((a,b)=>a+b,0)/gaps.length,variance=gaps.reduce((a,b)=>a+(b-mean)**2,0)/gaps.length;
 const bins=Array.from({length:Math.floor(seconds/10)},()=>0);for(const e of events)if(e.start<seconds)bins[Math.floor(e.start/10)]++;
 const bm=bins.reduce((a,b)=>a+b,0)/bins.length;return {cv:Math.sqrt(variance)/mean,fano:bins.reduce((a,b)=>a+(b-bm)**2,0)/bins.length/bm,rate:events.length/seconds,maxGap:Math.max(...gaps)};}
const poisson=flashTimeline('small',12000,0,{...o,burstiness:0}),storm=flashTimeline('small',12000,0,o),pm=metrics(poisson,12000),sm=metrics(storm,12000);
assert.ok(pm.cv>.9&&pm.cv<1.1&&pm.fano>.8&&pm.fano<1.2,JSON.stringify(pm));
assert.ok(sm.fano>pm.fano*2&&sm.cv>1.2,'storm needs genuine overdispersion and lulls');
assert.ok(Math.abs(sm.rate-o.smallRate)<o.smallRate*.1,'burstiness must preserve average frequency');
assert.ok(sm.maxGap>4/o.smallRate,'waits must not retain old bounded slot spacing');
const seek=arcEvent('small',113.23,.2,o);arcEvent('small',500,.2,o);assert.deepEqual(arcEvent('small',113.23,.2,o),seek,'backward scrubbing must be repeatable');
assert.notDeepEqual(flashTimeline('medium',100,0,o),flashTimeline('medium',100,0,{...o,timingSeed:4}));
let repeated=0;for(let slot=0;slot<100;slot++){const strokes=strokePattern('large',slot,o);if(strokes.length>1)repeated++;for(let i=1;i<strokes.length;i++)assert.ok(strokes[i].at-strokes[i-1].at>=.0249&&strokes[i].at-strokes[i-1].at<=.1801);assert.equal(strokePattern('large',slot,{...o,restrikes:0}).length,1);}
assert.ok(repeated>30&&repeated<90,'re-flashes must be optional, not fixed double flashes');
console.log('Poisson baseline, clustered storms, mean rate, long lulls, seeking, seeds and variable intraflash strokes passed',{poisson:pm,storm:sm,repeated});
