import * as T from 'three';
export const travelStyles=[
 {id:'glide-paddle',name:'Wide glide · gentle paddle',description:'Wide, palm-down hands with a small alternating sweep and a little shared lift. The default travelling pose.'},
 {id:'streamlined',name:'Tucked palms',description:'Palms down, fingers forward, held slightly behind the hips. A small shared bob follows the running stride.'},
 {id:'paddle',name:'Alternating paddle',description:'Palms down with opposite forward-and-back sweeps, as if gently helping the traveller along.'},
 {id:'glide',name:'Wide glide',description:'Open palms held wider and nearly level, with just a little shared lift. More like balancing than rowing.'},
 {id:'standing',name:'Original escort',description:'The previous upright hand pose, retained as a comparison.'}
] as const;
export type TravelStyle=typeof travelStyles[number]['id'];
export class TravelHands{
 style:TravelStyle='glide-paddle';weight=0;private duration=0;
 setStyle(value:string){if(travelStyles.some(s=>s.id===value))this.style=value as TravelStyle;}
 update(dt:number,speed:number,moving:boolean,free:boolean){
  this.duration=moving&&speed>.45&&free?this.duration+dt:0;
  const target=this.style==='standing'?0:T.MathUtils.smoothstep(this.duration,.18,.8)*T.MathUtils.smoothstep(speed,.25,2.5);
  this.weight=T.MathUtils.lerp(this.weight,target,1-Math.exp(-dt*(target>this.weight?5:9)));
 }
 sample(side:number,phase:number){
  const theta=phase*Math.PI*2+(side>0?Math.PI:0),bob=Math.sin(phase*Math.PI*4);
  let position:T.Vector3,rotation:T.Euler,grasp:number;
  if(this.style==='paddle'){
   position=new T.Vector3(side*.98,1.00+Math.sin(theta)*.09,.02+Math.cos(theta)*.24);
   rotation=new T.Euler(Math.PI/2+Math.sin(theta)*.18,side*.08,side*.06);
   grasp=.16+.06*Math.sin(theta);
  }else if(this.style==='glide'||this.style==='glide-paddle'){
   const paddle=this.style==='glide-paddle'?1:0;
   position=new T.Vector3(side*1.24,1.12+bob*.025+paddle*Math.sin(theta)*.025,-.10+paddle*Math.cos(theta)*.085);
   rotation=new T.Euler(Math.PI/2-.06+paddle*Math.sin(theta)*.065,side*.12,side*.08);
   grasp=.025+paddle*(.035+.025*Math.sin(theta));
  }else{
   position=new T.Vector3(side*.88,.94+bob*.045,-.40+Math.sin(theta)*.035);
   rotation=new T.Euler(Math.PI/2-.10+bob*.035,side*.10,side*.035);grasp=.20;
  }
  return {position,orientation:new T.Quaternion().setFromEuler(rotation),grasp};
 }
}
/** The same named choices are used in the scene and the close-up viewer. */
export function addTravelHandControl(parent:HTMLElement,change:(style:string)=>void){
 const label=document.createElement('label');label.textContent='Travelling hands';
 const select=document.createElement('select');select.id='travelHands';
 for(const style of travelStyles){const option=document.createElement('option');option.value=style.id;option.textContent=style.name;select.append(option);}
 const help=document.createElement('small');help.id='travelHandsHelp';select.setAttribute('aria-describedby',help.id);
 const update=()=>{change(select.value);help.textContent=travelStyles.find(s=>s.id===select.value)!.description;};select.onchange=update;update();
 label.append(select);parent.append(label,help);return select;
}
