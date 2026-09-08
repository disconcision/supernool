/** Primary touch input, rather than screen width: small desktop windows keep body pull. */
const coarse=matchMedia('(pointer: coarse)'),noHover=matchMedia('(hover: none)');
export const touchPrimary=()=>coarse.matches&&noHover.matches;
export function requestedInputMode(){
 const mode=new URLSearchParams(location.search).get('mode');
 return mode==='mouse'||mode==='body'?mode:undefined;
}

const preferenceKey='supernool-input-mode-v1';
export function initialInputMode(){
 try{const saved=sessionStorage.getItem(preferenceKey);if(saved==='mouse'||saved==='body')return saved;}catch{}
 return requestedInputMode()??(touchPrimary()?'mouse':'body');
}
export function rememberInputMode(mode:string){
 if(mode!=='mouse'&&mode!=='body')return;
 try{sessionStorage.setItem(preferenceKey,mode);}catch{}
}
