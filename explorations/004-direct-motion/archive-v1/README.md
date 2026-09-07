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

## Regroup paths

Operand anchors stay fixed. For the branching sketch, q slides from the left grouping position to the right. A's attachment slides from q to p along their connecting member, C's slides from p to q, and B stays attached to q. Temporary attachment points are geometric locations, not additional semantic nodes. This is an attachment/sliding hypothesis, not a solved wood deformation.

For plateaus, q's support layer is absorbed into the common base and re-emerges beneath B and C. Opacity represents absorption in this schematic only. The persistent operator ID is not deleted. The A/B/C stacks remain intact. The illustration does not yet resolve continuous support heights or a volume-preserving surface.

## Identity path

The original operand stays in place while the addition context and zero appear. Opacity is a placeholder for emergence. Plateau mode retains a common display base even before the operation, so the common base itself should not be interpreted as an already-existing semantic operator.

## Files and validation

- `model.ts`: typed semantic edits and operand examples.
- `drawing.ts`: deterministic SVG projections and geometric paths.
- `view.ts`: playback, scrubbing and export.
- `model.test.ts`: subtree reference preservation, ID preservation, inverses, fresh identity IDs, invalid edit rejection, root separation and flat intersection.
- `diagrams/`: 18 retained source/midpoint/target SVGs for nested operands.

Tests: `./node_modules/.bin/jest explorations/004-direct-motion/model.test.ts --runInBand`.

Next 3D experiment: use the same swap path with solid members and operand bounds, make the camera orbitable, and visualize minimum clearance. The projected SVGs establish correspondence first; a full new Three.js scene has not been added in this round.
