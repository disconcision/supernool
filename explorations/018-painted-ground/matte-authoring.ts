import * as T from 'three';import {makeClearing} from './terrain';import {addBackdrop} from './backdrop';
const renderer=new T.WebGLRenderer({antialias:true});renderer.setSize(innerWidth,innerHeight);document.body.append(renderer.domElement);
const scene=new T.Scene();scene.add(new T.HemisphereLight('#fff5d9','#506451',2));const light=new T.DirectionalLight('#fff0d0',2.5);light.position.set(-8,16,10);scene.add(light);
const camera=new T.OrthographicCamera(-11*16/9,11*16/9,11,-11,.1,250);camera.zoom=.58;camera.position.set(39,32,63);camera.lookAt(0,2,0);camera.updateProjectionMatrix();
const backdrop=addBackdrop(scene,document.querySelector('#world')!,renderer);backdrop.set('painted');
const before=new Set(scene.children),clearing=makeClearing(scene);clearing.setGroundShadows(false);
const foreground=scene.children.filter(o=>!before.has(o));const mode=new URLSearchParams(location.search).get('mode');if(mode==='terrain')foreground.forEach(o=>o.visible=false);
if(mode!=='terrain')for(const route of clearing.paths){const curve=new T.CatmullRomCurve3(route.filter((_,i)=>i%2===0));const m=new T.Mesh(new T.TubeGeometry(curve,200,.35,8,false),new T.MeshBasicMaterial({color:'#ff40d0',depthTest:true}));scene.add(m);}
function frame(){requestAnimationFrame(frame);renderer.render(scene,camera);document.body.dataset.ready='true';}frame();
