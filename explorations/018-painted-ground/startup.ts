/** Keep the first paint quiet while the HTML panels are docked and assets settle. */
export function createStartup(){
 const root=document.documentElement,loader=document.getElementById('loading')!;
 let frames=0,done=false;
 // The overlay catches pointer input; also avoid walking/gripping behind it.
 const blockKeys=(event:KeyboardEvent)=>{if(event.target instanceof Node&&loader.contains(event.target))return;event.preventDefault();event.stopImmediatePropagation();};
 addEventListener('keydown',blockKeys,true);
 return {
  get pending(){return !done;},
  frameReady(ready:boolean){
   if(done)return;
   frames=ready?frames+1:0;
   // Called after rendering, twice: assets have been attached and their first
   // frame has had a presentation opportunity before the curtain lifts.
   if(frames<2)return;
   done=true;root.dataset.boot='ready';loader.setAttribute('aria-hidden','true');
   removeEventListener('keydown',blockKeys,true);
  },
  fail(message:string){
   if(done)return;
   loader.dataset.failed='true';document.getElementById('startupMessage')!.textContent=message;
   document.getElementById('startupRetry')!.hidden=false;
  }
 };
}
