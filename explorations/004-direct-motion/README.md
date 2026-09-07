# 004 · Direct motion / intact operands

Open `/explorations/004-direct-motion/` through the existing Vite server. The running catalogue is `../index.html`, with a filesystem version at `../README.md`.

## Scope

Three semantic events: swap for commutativity, regroup for associativity, and introducing the additive identity. Choose atomic, nested, or uneven operands. Each is one semantic event at every complexity. The timeline is a continuous geometric sketch, not a sequence of additional algebraic assertions. Static SVG snapshots are retained in `diagrams/`; the interactive viewer also exports any chosen frame.

The earlier extend/retract study remains available as study 003. This study adds useful direct operations rather than pursuing a minimal universal basis.

## Data and invariants

`Tree = { id, label, children: Tree[] }` has ordered children. `DirectEdit` is a tagged union:

- `swap(parent, leftSlot, rightSlot)` exchanges two complete child subtrees.
- `regroup(parent, direction)` rotates a pair of nested binary additions.
- `add-zero(target, sumId, zeroId)` wraps the intact target in `+(0,target)`.

Swap is a structural operation; algebraic permission to use it depends on the operator. Regroup here explicitly requires two binary additions. This is a small study model, not a replacement for the editor's rewrite engine.

For regroup, `p(q(A,B),C) → p(A,q(B,C))`. Both operator IDs survive; A, B and C retain their exact subtree objects. Inverse regroup restores the source. Swap is its own inverse. Identity introduces exactly two fresh IDs.

Default design principle: substituting a more complex tree into a rule variable does not add semantic steps or dismantle that tree. Size and attachments can still change path radius, duration, clearance requirements and the necessary geometric phases. One semantic event is not a guarantee of one elementary physical motion.

## Swap paths

For side `s ∈ {-1,+1}`, radius R=150 and progress t:

```
flat:  (x,y,z) = (sR(1−2t), 130, 0)
orbit: (x,y,z) = (sR cos(πt), 130, sR sin(πt))
```

Every descendant receives its operand root's translation; internal geometry stays fixed. The orbit keeps the roots 2R apart. The flat path makes them coincide at t=1/2. A fixed oblique projection maps `(x,y,z)` to `(450+x+.38z, 425−y+.38z)`; the grid is a depth reference.

This tests one specific flat path, not a claim that every imaginable planar representation must collide. Ordered rooted branches with fixed planar attachments impose constraints that detached objects or rerouted connections need not share.

Root separation is not a collision proof for arbitrary thick subtrees. Parent members meet intentionally at the parent. Bounds for members, shelves, foliage, avatars and attachments remain to be added. The scalar radius should eventually depend on actual operand bounds.

## Revision 2: emergence and operator correspondence

The original fade-based drawing/view source and notes are retained in `archive-v1/`. This revision follows the source-driven, full-opacity emergence already implemented in `src/motion/Motion.tsx`.

## Regroup paths

Operand anchors stay fixed. Select **Plus correspondence**:

- Keep root: `p(q(A,B),C) → p(A,q(B,C))`. p stays outer. q moves across; A transfers q→p and C transfers p→q, while B stays with q.
- Exchange roles: `p(q(A,B),C) → q(A,p(B,C))`. q becomes outer and p becomes inner. A stays with q, C stays with p, and B transfers q→p. Both operator IDs persist, with an exactly invertible endpoint mapping.

Blue p and purple q are explicitly labelled. A dashed context stem identifies the outer attachment. Sliding attachment locations are geometric points, not additional semantic operators.

In plateau mode, the first mapping slides q's support shelf across the base. The second changes both shelves' positions and sizes, exchanging their inner/outer roles. Neither fades. These are support-morph hypotheses: intermediate overlap and support/contact continuity remain unresolved. Do not mistake them for collision-checked terrain.

## Identity path

In branch views the original A stays fixed. During the first 30% the new plus extends from A into the context position. During the remaining 70%, zero moves outward from the plus along an extending member, at full opacity. The plus is drawn over the emerging zero so it initially appears from behind its source. Scrubbing backward retracts the motion.

In plateau mode, zero's top rises from a fixed footprint on the base while its solid sides extend down to the surface. Its footprint initially grows from zero size. The common display support predates the semantic addition node; the plus mark grows onto that support. This is an emergence sketch, not a simulated rock deformation.

## Files and validation

- `model.ts`: typed semantic edits and operand examples.
- `drawing.ts`: deterministic SVG projections and geometric paths.
- `view.ts`: playback, scrubbing and export.
- `model.test.ts`: subtree reference preservation, ID preservation, inverses, fresh identity IDs, invalid edit rejection, root separation and flat intersection.
- `diagrams/`: 18 retained source/midpoint/target SVGs for nested operands.

Tests: `./node_modules/.bin/jest explorations/004-direct-motion/model.test.ts --runInBand`.

Next 3D experiment: use the same swap path with solid members and operand bounds, make the camera orbitable, and visualize minimum clearance. The projected SVGs establish correspondence first; a full new Three.js scene has not been added in this round.
