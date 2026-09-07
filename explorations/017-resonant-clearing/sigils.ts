import * as T from 'three';
const textures=new Map<string,T.CanvasTexture>();
export function sigil(text:string,operator:boolean,selected:boolean,simple:boolean){
 const key=[text,operator,selected,simple].join('|');let map=textures.get(key);
 if(!map){const c=document.createElement('canvas');c.width=c.height=192;const x=c.getContext('2d')!;x.translate(96,96);
 x.lineWidth=3;x.strokeStyle=selected?'#fff0b8':operator?'#bc9562':'#b8d0b9';
 x.beginPath();
 if(operator){x.arc(0,0,73,0,Math.PI*2);x.fillStyle=selected?'#82664b':'#594b3f';x.fill();x.stroke();
  x.beginPath();x.arc(0,0,62,0,Math.PI*2);x.strokeStyle='#c4a476';x.lineWidth=2;x.stroke();
  if(!simple)for(let i=0;i<8;i++){const a=i*Math.PI/4;x.beginPath();x.moveTo(Math.cos(a)*66,Math.sin(a)*66);x.lineTo(Math.cos(a)*70,Math.sin(a)*70);x.stroke();}
 }else{if(simple)x.ellipse(0,0,56,69,0,0,Math.PI*2);else{x.moveTo(0,-80);x.bezierCurveTo(72,-36,67,58,0,76);x.bezierCurveTo(-67,58,-72,-36,0,-80);}x.fillStyle=selected?'#fff0c5':'#e3e8cc';x.fill();x.stroke();
  if(!simple){x.strokeStyle='#a1b393';x.lineWidth=2;x.beginPath();x.moveTo(-34,34);x.quadraticCurveTo(-48,-14,-17,-50);x.stroke();x.beginPath();x.moveTo(28,42);x.lineTo(36,21);x.stroke();}
 }
 x.fillStyle=operator?'#ffe3a0':'#375a51';x.font=operator?'bold 103px Georgia':text.length>1?'italic 70px Georgia':'italic 90px Georgia';x.textAlign='center';x.textBaseline='middle';x.fillText(text,0,3);
 map=new T.CanvasTexture(c);textures.set(key,map);}
 return new T.SpriteMaterial({map,depthTest:false,depthWrite:false,fog:false,toneMapped:false});
}
