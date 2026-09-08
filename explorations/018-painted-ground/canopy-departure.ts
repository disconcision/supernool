import * as T from 'three';
import {CloudDeparture} from '../019-inhabited-trees/shadow-patches';
/** A deterministic presentation transform: the host wood and equation never rotate. */
export function canopyDeparture(progress:number,pivot:T.Vector3,turns=1.35,expansion=2.8):CloudDeparture{
 const u=Math.max(0,Math.min(1,progress));
 // Rapid initial rotation, progressively slower as the cloud spreads.
 const angle=turns*Math.PI*2*(1-Math.exp(-4*u))/(1-Math.exp(-4));
 const scale=1+expansion*u,rotation=new T.Quaternion().setFromAxisAngle(new T.Vector3(0,1,0),angle);
 const matrix=new T.Matrix4().compose(pivot.clone().add(new T.Vector3(0,2.4*u,0)),rotation,new T.Vector3(scale,scale,scale)).multiply(new T.Matrix4().makeTranslation(-pivot.x,-pivot.y,-pivot.z));
 return {matrix,rotation,scale,dissolve:Math.min(1,Math.max(0,(u-.06)/.72))};
}
