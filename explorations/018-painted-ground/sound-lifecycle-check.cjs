const assert=require('node:assert/strict');
const {build}=require('esbuild');
(async()=>{
 const result=await build({entryPoints:['explorations/018-painted-ground/sound.ts'],bundle:true,platform:'node',format:'cjs',write:false,define:{'import.meta.url':JSON.stringify('file:///sound-lifecycle-check')},plugins:[{name:'instrument-observer',setup(b){b.onResolve({filter:/^\.\/encounter-audio$/},()=>({path:'bank',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:`
 export function createEncounterAudio(ctx){
 const events={};const event=k=>events[k]=(events[k]||0)+1;
 const bank={ctx,master:{gain:{cancelScheduledValues(){event('cancel-gain')},setTargetAtTime(v){bank.output=v}}},buses:{effects:{}},
 mix(v){bank.output=v},environment(){event('wind');return 8},beat(){event('beat')},melody(){event('melody')},cue(){event('cue')},thunder(){event('thunder')},footstep(){},gesture(){},tone(){},inspect(){return{voices:0,peakVoices:0,events}}};
 globalThis.testBanks.push(bank);return bank;
 }`,loader:'js'}));}}]});
 const intervals=new Map(),timeouts=[];let timerId=0;global.setInterval=fn=>{intervals.set(++timerId,fn);return timerId};global.clearInterval=id=>intervals.delete(id);global.setTimeout=fn=>timeouts.push(fn);
 const doc=new EventTarget(),status={textContent:'',dataset:{}};doc.hidden=false;doc.getElementById=id=>id==='audioStatus'?status:null;global.document=doc;
 global.addEventListener=()=>{};global.BroadcastChannel=class {postMessage(){} close(){}};
 const contexts=[];global.AudioContext=class {state='running';currentTime=0;constructor(){contexts.push(this)}resume(){this.state='running';return Promise.resolve()}suspend(){this.state='suspended';return Promise.resolve()}close(){this.state='closed';return Promise.resolve()}};
 global.testBanks=[];const m={exports:{}};new Function('require','module','exports',result.outputFiles[0].text)(require,m,m.exports);
 const sound=m.exports.createSound();sound.setMode('off');sound.unlock();assert.equal(contexts.length,0,'Muted clicks must not create audio contexts');
 sound.setMode('thematic');assert.equal(contexts.length,1);assert.equal(intervals.size,1);
 sound.update({phase:'active',age:20,reduction:.5,x:0,z:0,dt:.016,paused:false});
 for(const fn of intervals.values())fn();assert.equal(testBanks[0].inspect().events.cue,1);
 for(let i=0;i<6;i++){
  const old=contexts.at(-1),oldBank=testBanks.at(-1);sound.setMode('off');assert.equal(intervals.size,0);assert.equal(oldBank.output,0);
  sound.unlock();assert.equal(contexts.at(-1),old,'Other clicks while muted stay silent');
  sound.setMode('thematic');const fresh=contexts.at(-1);assert.notEqual(fresh,old);assert.equal(intervals.size,1);
  for(const fn of timeouts.splice(0))fn();assert.equal(old.state,'closed');assert.equal(fresh.state,'running','Retiring the old graph must not close a quick-unmute replacement');
  for(const fn of intervals.values())fn();assert.equal(testBanks.at(-1).inspect().events.cue,undefined,'Unmute must not replay the encounter transition');
 }
 assert.equal(contexts.filter(c=>c.state!=='closed').length,1);
 sound.setMode('off');for(const fn of timeouts.splice(0))fn();doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));
 assert(contexts.every(c=>c.state==='closed'),'Visibility changes must not resurrect muted audio');assert.equal(intervals.size,0);
 console.log('Audio lifecycle: repeated mute/unmute, rapid replacement, no stale contexts, no replayed cues, muted input and visibility passed.');
})().catch(e=>{console.error(e);process.exitCode=1});
