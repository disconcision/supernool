/** Primary touch input, rather than screen width: small desktop windows keep body pull. */
const coarse=matchMedia('(pointer: coarse)'),noHover=matchMedia('(hover: none)');
export const touchPrimary=()=>coarse.matches&&noHover.matches;
export function requestedInputMode(){
 const mode=new URLSearchParams(location.search).get('mode');
 return mode==='mouse'||mode==='body'?mode:undefined;
}
