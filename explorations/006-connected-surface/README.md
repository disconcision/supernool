# 006 · Connected surfaces

A live Three.js study of identity, associativity and commutativity. Open `index.html` through the repository Vite server. Drag to orbit; scrub or play; compare connected skin, skeleton and plateaus. Orthographic/perspective, wireframe, junction softness, simple/nested/uneven operands and both associativity correspondences are available.

## What is new

Identity defaults to a fixed attachment: at the source, A occupies the future plus location. The plus stays there while A and zero move outward simultaneously. Every descendant of A inherits its translation. The alternative keeps A in place and pulls the context down. The stem below the operation represents an external attachment, not another arithmetic node.

For associativity, keep-root is `p(q(A,B),C) → p(A,q(B,C))`; exchange-roles is `p(q(A,B),C) → q(A,p(B,C))`. The same geometric attachment policies as 004 now drive a shared surface. A, B and C stay fixed. The operator runes distinguish the two correspondences. Rune badges are annotations, not embedded surface objects.

## Surface construction

`motion.ts` produces joints and radius-bearing segments. `fieldAt` smoothly unions capsule distance fields around those segments. Three.js MarchingCubes extracts one mesh at 64 cubed grid resolution in a fixed bounding volume. The renderer rebuilds its field when progress or settings change. The field is positive inside and the zero level is the surface.

This is a single reconstructed surface, not cylinders drawn through one another. It is **not** persistent-topology vertex deformation. Triangle connectivity changes over time. Bark UVs, persistent texture coordinates, furniture attachment frames, collision geometry and fine detail transport are not implemented. Grid resolution can cause small tips to pop during emergence. Root/member intersections away from intended junctions can fuse; the field does not know which contacts should remain separate. The distance field is a geometric skinning choice, not the transformation calculus.

## Plateaus

The desaturated ground plinth is explicitly outside the term. Identity begins with A alone. A new coloured parent shelf grows beneath it as A and zero separate; no existing ground circle is relabelled. This clarifies semantics but is still a schematic growth policy.

Associativity support sheets lift to expose their changing roles. Operands are held above them for inspection, so this mode deliberately does not claim continuous physical support. Support-sheet collisions, full containment and a convincing terrain deformation remain unresolved. The connected branching surface is the main experiment in this round. The uneven complexity option is disabled in plateau mode; selecting plateaus from that option switches to the nested A sample. Use branching modes for uneven structures.

## Validation

`motion.test.ts` checks fixed-root identity and rigid descendant offsets, the exchanged operator endpoints, and positive field coverage along every skeleton segment across the three operations. These checks do not prove manifoldness or collision clearance of the extracted mesh.

Run `./node_modules/.bin/jest explorations/006-connected-surface/motion.test.ts --runInBand` from the repository root. Build with Vite. No changes to the existing editor's transformation engine.
