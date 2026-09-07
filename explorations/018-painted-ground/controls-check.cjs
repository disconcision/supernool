// Exercise the actual scene keyboard handlers without needing a GPU or browser
// automation capable of maintaining independent physical key-down states.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {transformSync}=require('esbuild'),T=require('three');
const src=fs.readFileSync(__dirname+'/scene.ts','utf8');
const between=(a,b)=>src.slice(src.indexOf(a),src.indexOf(b,src.indexOf(a)));
const handlers={},elements={settings:{},toolbox:{},hint:{click(){}}};
const context={value:()=>220,sound:{start(){},finish(){}},T,Set,Math,performance,console,handlers,solved:t=>t.id==='goal',exitAfterSettle:false,handFocus:false,grip:undefined,animation:undefined,near:true,spread:0,loaded:true,selected:'a',hoverId:undefined,spotlight:undefined,lingerPoint:undefined,pin:undefined,keys:new Set(),heldDirections:new Set(),releasedBeforeReuse:new Set(),walkVelocity:new T.Vector3(),navTarget:undefined,avatar:{position:new T.Vector3()},camera:{matrixWorld:new T.Matrix4()},controls:{enabled:true},renderer:{domElement:{style:{}}},epoch:0,lastKey:'',tree:{id:'before'},steps:0,history:[],future:[],lastGesture:undefined,lastContactAt:0,
 bodyMode:()=>true,worldPoint:()=>new T.Vector3(),screen:()=>({x:0,y:0}),ui(){},status(){},find:(t)=>t,chooseContact(){throw Error('Legacy contact cycling used')},navigateHand(){context.navigated=(context.navigated||0)+1},togglePin(){},$:id=>elements[id],addEventListener:(name,fn)=>handlers[name]=fn,
 available:()=>[{id:'gesture',gripId:'a',action:{key:'swap',result:{id:'after'}},after:{id:'after'}}]};
vm.createContext(context);
const code=between('function finishSettling(', 'function requestPose(')+between('function beginGrip(', 'function updateGrip(')+between('function releaseGrip(', 'function chooseContact(')+between('function clearMovement(', 'function navigateHand(')+between("addEventListener('keydown',e=>",'function updateHands(');
vm.runInContext(transformSync(code,{loader:'ts',format:'cjs'}).code,context);
function event(key,repeat=false){return {key,code:key===' '?'Space':key,repeat,target:{matches:()=>false},preventDefault(){}};}
const down=(key,repeat)=>handlers.keydown(event(key,repeat)),up=key=>handlers.keyup(event(key));
// Walk -> hand: the old held arrow cannot bleed across the boundary.
down('ArrowUp');assert(context.keys.has('arrowup'));down(' ');assert(context.handFocus);assert.equal(context.grip,undefined);down(' ',true);assert.equal(context.grip,undefined,'Entry autorepeat must not grip');assert.equal(context.keys.size,0);down('ArrowUp',true);assert.equal(context.navigated,undefined);up('ArrowUp');up(' ');assert(context.handFocus,'Entry release must stay in hand mode');
down('ArrowRight');assert.equal(context.navigated,1);assert.equal(context.keys.size,0);
// Hand -> pull: selection's held arrow must be released before walking.
down(' ');assert(context.grip?.body);down('ArrowRight',true);assert.equal(context.keys.size,0);up('ArrowRight');down('ArrowRight');assert(context.keys.has('arrowright'));
// Early release is a cancellation and returns control to the hand.
up(' ');assert.equal(context.grip,undefined);assert(context.handFocus);assert.equal(context.steps,0);assert.equal(context.keys.size,0);down('ArrowRight',true);assert.equal(context.navigated,1);up('ArrowRight');
// A ready pull commits its actual result on Space release.
down(' ');context.grip.chosen=context.grip.options[0];context.grip.progress=.95;context.grip.ready=true;up(' ');assert.equal(context.steps,1);assert.equal(context.tree.id,'after');assert.equal(context.animation.to,1);assert(context.handFocus);
context.animation=undefined;
// Escape cancels even a ready pull; focus loss cancels and clears held input.
down(' ');context.grip.chosen=context.grip.options[0];context.grip.progress=.95;context.grip.ready=true;down('Escape');assert.equal(context.steps,1);assert.equal(context.animation.to,0);up(' ');context.animation=undefined;
down(' ');down('ArrowLeft');handlers.blur();assert.equal(context.grip,undefined);assert.equal(context.keys.size,0);assert.equal(context.heldDirections.size,0);
// Exit is explicit, and Space while walking cannot attach a hand.
down('Escape');assert.equal(context.handFocus,false);down('e');assert.equal(context.handFocus,false,'E no longer enters body hand mode');up('e');context.near=false;down(' ');assert.equal(context.handFocus,false,'Space out of reach must not enter');up(' ');context.near=true;down(' ');assert(context.handFocus);assert.equal(context.grip,undefined);up(' ');
console.log('Actual scene handlers passed: walk/hand/pull handoffs, held-key guards, early release, ready commit, Escape, focus loss, Space entry without accidental grip, and Escape exit.');

// Use the scene's actual encounter condition: moving beyond its radius must
// neither cancel a held grip nor fold the tree during the release animation.
const encounter=src.split('\n').find(line=>line.trim().startsWith('near='));
context.treeOrigin=new T.Vector3();context.avatar.position.set(10,0,0);context.nearOld=true;
context.grip={body:true};context.animation=undefined;vm.runInContext(encounter,context);assert.equal(context.near,true);
context.grip=undefined;context.animation={};vm.runInContext(encounter,context);assert.equal(context.near,true);
context.animation=undefined;vm.runInContext(encounter,context);assert.equal(context.near,true,'Hand control must persist outside the ring after settling');
// A fresh pull can start out here without re-entering the ring.
down(' ');assert(context.grip?.body,'Next grip must remain available outside the ring');up(' ');
vm.runInContext(encounter,context);assert.equal(context.near,true,'Releasing without a rewrite must retain the session');
down('Escape');assert.equal(context.handFocus,false);vm.runInContext(encounter,context);assert.equal(context.near,false,'Explicit exit restores proximity gating');
context.avatar.position.set(6,0,0);context.nearOld=false;vm.runInContext(encounter,context);assert.equal(context.near,false);
context.nearOld=true;vm.runInContext(encounter,context);assert.equal(context.near,true);
console.log('Encounter remains active outside the ring during hand selection, pulls, release and settling; another pull works there, and explicit Escape exit restores proximity gating.');

// Winning releases only after the final surface lands, and permits re-entry.
context.near=true;context.handFocus=true;context.tree={id:'before-goal'};
down(' ');context.grip.chosen={...context.grip.options[0],after:{id:'goal'}};context.grip.ready=true;context.grip.progress=.8;up(' ');
assert.equal(context.exitAfterSettle,true);assert.equal(context.handFocus,true,'Keep hands through settling');
context.finishSettling();assert.equal(context.handFocus,false);assert.equal(context.animation,undefined);assert.equal(context.pin,undefined);assert.equal(context.keys.size,0);
down(' ');assert.equal(context.handFocus,true,'Space must re-enter a completed tree');assert.equal(context.grip,undefined);up(' ');
// Re-exploring a goal tree does not eject the player every frame.
context.animation={};context.finishSettling();assert.equal(context.handFocus,true);
console.log('Goal completion releases after settling, allows Space re-entry, and does not eject repeatedly.');
