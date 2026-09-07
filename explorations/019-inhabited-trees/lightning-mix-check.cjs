const assert=require('node:assert/strict'),esbuild=require('esbuild'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const out=path.join(os.tmpdir(),'supernool-lightning-'+process.pid+'.cjs');
esbuild.buildSync({entryPoints:[path.join(__dirname,'storm-lightning.ts')],bundle:true,platform:'node',format:'cjs',outfile:out});
const {arcDefaults:o,arcEvent,mixedLightning}=require(out);fs.unlinkSync(out);
const T=require('three');const lobes=[{x:.3,y:.6,rx:.06,ry:.1},{x:.5,y:.6,rx:.08,ry:.12},{x:.7,y:.6,rx:.1,ry:.14}];
const branches=[new T.Vector2(.3,.55),new T.Vector2(.6,.65)],rocks=[new T.Vector2(.1,.2),new T.Vector2(.9,.2)];
let counts={};for(const k of ['small','medium','large']){const slots=new Set();for(let i=0;i<60000;i++){const e=arcEvent(k,i/100,0,o);if(e.power>0)slots.add(e.slot);}counts[k]=slots.size;assert.equal(arcEvent(k,1,1,{...o,[k+'Rate']:0}).power,0);}
assert.ok(counts.small>counts.medium*5&&counts.medium>counts.large*3,JSON.stringify(counts));
for(const preview of ['small','medium','branch','rock']){const b=mixedLightning(lobes,branches,rocks,0,.2,o,preview);assert.ok(b.segments.length>=12,preview);assert.equal(b.events.length,1);for(const s of b.segments)assert.ok([...s.a.toArray(),...s.b.toArray(),s.power].every(Number.isFinite));if(preview==='rock'||preview==='branch'){assert.equal(b.events[0].target,preview);const endpoints=preview==='rock'?rocks:branches;assert.ok(endpoints.some(p=>p.distanceTo(b.segments[11].b)<1e-6),'main strike must reach actual target');}}
for(const kind of ['small','medium','large']){let lit=0;for(let i=0;i<10000;i++)if(arcEvent(kind,i/1000,0,{...o,[kind+'Rate']:1}).power>0)lit++;assert.ok(lit<2500,'flashes must leave most of the timeline dark');}
console.log('Independent frequencies, zero rates, all preview sizes, finite forks and actual contacts passed',counts);
