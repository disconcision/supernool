from pathlib import Path
# Side elevation; coordinates are explicit support heights, not layout guesses.
frames=[('1 · Existing A',0,0,0),('2 · Lift the whole stack',110,0,0),('3 · Extend parent deck',110,90,1),('4 · Raise zero',110,90,1)]
out=['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 560"><rect width="1440" height="560" fill="#f8f5e9"/><style>text{font-family:system-ui,sans-serif;fill:#34473b} .small{font-size:12px}</style><text x="28" y="36" font-size="24">008 · Identity: support before surface</text>']
for i,(name,lift,shift,parent) in enumerate(frames):
 x=i*360+180;ay=310-lift;ax=x+shift*.6;ground=420
 out.append(f'<text x="{i*360+22}" y="80" font-size="16">{name}</text><path d="M{i*360+15},420 H{(i+1)*360-15}" stroke="#8c9984" stroke-width="8"/>')
 # External telescoping mast and horizontal carriage support the whole A stack.
 out.append(f'<path d="M{x},420 V{ay+26} H{ax} V{ay}" stroke="#8c9990" fill="none" stroke-width="9"/><path d="M{x-7},400 V350 M{x+7},400 V350" stroke="#52665b" fill="none" stroke-width="2"/>')
 if parent:
  out.append(f'<rect x="{x-145}" y="315" width="290" height="25" rx="7" fill="#9eb39b" stroke="#567d66" stroke-width="2"/><text x="{x-130}" y="332">p : +</text>')
 out.append(f'<rect x="{ax-52}" y="{ay-22}" width="104" height="22" rx="5" fill="#c49b60" stroke="#916c36" stroke-width="2"/><text x="{ax-7}" y="{ay-6}">A</text>')
 for off,name2 in [(-28,'x'),(28,'y')]:
  out.append(f'<path d="M{ax+off},{ay-22} V{ay-42}" stroke="#8c9990" stroke-width="5"/><rect x="{ax+off-17}" y="{ay-58}" width="34" height="16" rx="3" fill="#dac39a" stroke="#916c36"/><text x="{ax+off-4}" y="{ay-45}" class="small">{name2}</text>')
 if i==3:
  zx=x-87;out.append(f'<path d="M{zx},315 V270" stroke="#8c9990" stroke-width="8"/><rect x="{zx-24}" y="248" width="48" height="22" rx="5" fill="#9cbbc3" stroke="#557e8c"/><text x="{zx-4}" y="264">0</text>')
 if i==1:out.append(f'<path d="M{x+88},300 V210 l-7,12 m7,-12 l7,12" stroke="#b2713c" fill="none" stroke-width="2"/>')
 texts=[['External mast supports A.','x and y are carried by A.'],['A, x and y rise by the same Δh.','No child is left hanging behind.'],['Carriage moves A sideways.','New p deck extends below it.'],['Zero rises on its own support.','Mast / carriage stays connected.']][i]
 for j,line in enumerate(texts):out.append(f'<text x="{i*360+22}" y="{466+j*23}" class="small">{line}</text>')
out.append('<text x="28" y="544" class="small">Mechanical hypothesis, side elevation. Grey = external supports; coloured decks = term nodes. Temporary states are not extra algebraic identities.</text></svg>')
Path(__file__).with_name('identity-support.svg').write_text(''.join(out))
