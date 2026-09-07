import {writeFileSync} from 'node:fs';import {specimen} from './spatial';
let s='<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="960" viewBox="0 0 1536 960"><rect width="1536" height="960" fill="#f7f1e4"/><style>text{font-family:Georgia;fill:#403a30}.small{font:18px sans-serif}</style><text x="48" y="45" font-size="28">012 · One specimen, two embeddings, three rewrite states</text>';
for(let row=0;row<2;row++)for(let col=0;col<3;col++){
 const t=col/2,spread=row===0?0:1,c=specimen('regroup','nested','exchange',t,1,'depth',0,spread),ox=256+col*510,oy=405+row*440;
 const xy=(p:{x:number;y:number;z:number})=>[ox+p.x*45-p.z*21,oy-p.y*42-p.z*9];
 s+=`<text x="${ox-205}" y="${oy-325}" font-size="23">${row?'Spatial':'Working plane'} · ${col===0?'Before':col===1?'Transfer':'After'}</text>`;
 for(const e of c.edges){const a=xy(e.a),b=xy(e.b);s+=`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${e.id==='member2'?'#6c8b68':'#ad8658'}" stroke-width="${e.r*40}" stroke-linecap="round"/>`;}
 for(const j of c.joints){const a=xy(j);s+=`<circle cx="${a[0]}" cy="${a[1]}" r="10" fill="#fff9e9" stroke="#6f6755"/><text x="${a[0]+13}" y="${a[1]-9}" font-size="19">${['p','q'].includes(j.id)?j.id+' +':j.id==='a'?'A +':j.label}</text>`;}
 s+=`<text x="${ox-205}" y="${oy+31}" class="small">${col===0?'p(q(A,B),C)':col===1?'B attaches along the p–q member':'q(A,p(B,C))'}</text>`;
}
s+='<text x="48" y="945" class="small">A = x + y stays intact. Spread changes geometry only. Midpoint is an animation state, not a new algebraic term.</text></svg>';
writeFileSync('explorations/012-hewn-correspondence/specimen.svg',s);
