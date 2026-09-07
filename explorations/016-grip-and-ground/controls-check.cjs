// Exercise the actual scene keyboard handlers without needing a GPU or browser
// automation capable of maintaining independent physical key-down states.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const {transformSync}=require('esbuild'),T=require('three');
const src=fs.readFileSync(__dirname+'/scene.ts','utf8');
const between=(a,b)=>src.slice(src.indexOf(a),src.indexOf(b,src.indexOf(a)));
const handlers={},elements={settings:{},toolbox:{},hint:{click(){}}};
const context={T,Set,Math,performance,console,handlers,handFocus:false,grip:undefined,animation:undefined,near:true,spread:0,loaded:true,selected:'a',hoverId:undefined,spotlight:undefined,lingerPoint:undefined,pin:undefined,keys:new Set(),heldDirections:new Set(),releasedBeforeReuse:new Set(),walkVelocity:new T.Vector3(),navTarget:undefined,avatar:{position:new T.Vector3()},camera:{matrixWorld:new T.Matrix4()},controls:{enabled:true},renderer:{domElement:{style:{}}},epoch:0,lastKey:'',tree:{id:'before'},steps:0,history:[],future:[],lastGesture:undefined,lastContactAt:0,
 bodyMode:()=>true,worldPoint:()=>new T.Vector3(),screen:()=>({x:0,y:0}),ui(){},status(){},find:(t)=>t,chooseContact(){throw Error('Legacy contact cycling used')},navigateHand(){context.navigated=(context.navigated||0)+1},togglePin(){},$:id=>elements[id],addEventListener:(name,fn)=>handlers[name]=fn,
 available:()=>[{id:'gesture',gripId:'a',action:{key:'swap',result:{id:'after'}},after:{id:'after'}}]};
vm.createContext(context);
const code=between('function beginGrip(', 'function updateGrip(')+between('function releaseGrip(', 'function chooseContact(')+between('function clearMovement(', 'function navigateHand(')+between("addEventListener('keydown'",'function updateHands(');
vm.runInContext(transformSync(code,{loader:'ts',format:'cjs'}).code,context);
function event(key,repeat=false){return {key,code:key===' '?'Space':key,repeat,target:{matches:()=>false},preventDefault(){}};}
const down=(key,repeat)=>handlers.keydown(event(key,repeat)),up=key=>handlers.keyup(event(key));
// Walk -> hand: the old held arrow cannot bleed across the boundary.
down('ArrowUp');assert(context.keys.has('arrowup'));down('e');assert(context.handFocus);assert.equal(context.keys.size,0);down('ArrowUp',true);assert.equal(context.navigated,undefined);up('ArrowUp');up('e');
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
down('e');assert.equal(context.handFocus,false);up('e');down(' ');assert.equal(context.grip,undefined);up(' ');
console.log('Actual scene handlers passed: walk/hand/pull handoffs, held-key guards, early release, ready commit, Escape, focus loss, and no walk-mode grip.');

// Use the scene's actual encounter condition: moving beyond its radius must
// neither cancel a held grip nor fold the tree during the release animation.
const encounter=src.split('\n').find(line=>line.trim().startsWith('near='));
context.treeOrigin=new T.Vector3();context.avatar.position.set(10,0,0);context.nearOld=true;
context.grip={body:true};context.animation=undefined;vm.runInContext(encounter,context);assert.equal(context.near,true);
context.grip=undefined;context.animation={};vm.runInContext(encounter,context);assert.equal(context.near,true);
context.animation=undefined;vm.runInContext(encounter,context);assert.equal(context.near,false);
context.avatar.position.set(6,0,0);context.nearOld=false;vm.runInContext(encounter,context);assert.equal(context.near,false);
context.nearOld=true;vm.runInContext(encounter,context);assert.equal(context.near,true);
console.log('Encounter remains active beyond the perimeter during grip/settling, then resumes normal proximity gating.');
