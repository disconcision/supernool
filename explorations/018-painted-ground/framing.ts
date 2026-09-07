import * as T from 'three';
/** Fit the actual projected tree, not the empty corners of a world-axis box.
 * Computing at unit zoom avoids feeding the current easing back into the fit. */
export function fitZoom(camera:T.OrthographicCamera,points:T.Vector3[],width:number,height:number,padding:number,margin=32){
 const view=camera.clone();view.zoom=1;view.updateProjectionMatrix();view.updateMatrixWorld();
 const xLimit=Math.max(.2,1-2*margin/width),yLimit=Math.max(.2,1-2*margin/height);
 const padX=padding*2/(view.right-view.left),padY=padding*2/(view.top-view.bottom);
 let zoom=Infinity;
 for(const point of points){
  const p=point.clone().project(view);zoom=Math.min(zoom,xLimit/(Math.abs(p.x)+padX),yLimit/(Math.abs(p.y)+padY));
 }
 return zoom;
}
