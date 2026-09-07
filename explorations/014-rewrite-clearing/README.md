# 014 — The listening grove

A small playable scene built separately from the prior appearance studies. The player walks into an interaction circle, the main tree settles into its working plane, and local rune selections expose legal algebraic rewrites. Walking away restores spatial spread. Appearance controls are tucked into a panel.

## Challenge

Start: `((2×x + 0) + y) + (3×x + 0)` (13 term nodes).
Target: `5×x + y` or an equally short equivalent (5 nodes).

Available moves: commutativity of addition/multiplication, associativity in both directions, additive/multiplicative identity elimination when present, common-factor extraction in all operand orientations, and arithmetic on literal pairs. They are actual AST transformations, not a fixed animation playlist. The original repository's toolbox contains these algebraic families (factoring is reverse distributivity); this prototype implements a small standalone typed subset, not an integration with its generalized pattern engine. Forward distribution and identity insertion are not exposed in this bounded challenge.

`algebra.ts` owns immutable terms, stable occurrence IDs, applicable moves and replacement. Factor extraction preserves one common-factor occurrence and records the other as merging into it. Undo/redo keeps full term snapshots. Reset creates a fresh challenge. The hint button searches legal moves from the current state; it highlights a next move but does not apply it.

`audit.json` records a six-move solution using swap, regroup, two zero removals, factoring, then arithmetic. Tests checked 738 offered moves over reachable states using integer evaluations, unique IDs on the solution route and finite geometric transitions. The rule definitions themselves encode the algebraic identities; numeric checks are regression evidence rather than a general algebra theorem prover.

## Controls

- WASD / arrows: walk on world X/Z axes.
- Click ground: walk toward that point. Boulders and the clearing boundary block walking; there is no pathfinding around them.
- Walk to the tree: accessible shortcut that moves the avatar along the entry path.
- Click a rune: select that subtree. The whole-tree list is an alternate selection affordance.
- Choose a legal rewrite in the side panel; Hint suggests one when needed.
- Undo, Redo, Reset tree; Escape closes appearance and returns selection to the root.
- Right-drag: orbit; wheel: zoom.
- Appearance: sampling, surface, studio/cel/smooth shading, thickness, taper, bow, irregularity, twist, facet variation, blend, resting depth spread and height policy.

## Rendering and motion

The two background trees are generated once and retain trimmed static meshes. Only the main tree remeshes. A dedicated module worker performs field sampling and extraction; geometry buffers are transferred back to the main thread. One request runs at a time and pending hero updates are coalesced. The avatar and camera continue on the main thread. Worker latency still limits the visible tree update rate; the worker is not a claim that rendering computation became free. 80 is the play default, with 96 and 144 retained for inspection.

Stable term IDs carry surviving nodes between layouts. Removed members retract in length into their current attachment rather than thinning into sub-voxel needles. Factoring records the retained occurrence and uses it to guide the initial correspondence. Changed attachments travel along parent paths. Swap uses a depth arc. These generic animations are an initial continuity policy, not the carefully specialized p/q contraction study from 012/013. They can still produce swollen or awkward intermediate junctions, especially during factoring. No collision-free surface or stable UV topology is promised.

A term's root is anchored at the tree base. Depth-based layout makes the reduced expression visibly smaller. Flattening and growth change presentation only. Node labels follow the actual worker-returned mesh pose.

## Scope and next work

The clearing is deliberately small: one active term, two static trees, an avatar, simplified boulder collisions and a local algebra challenge. No inventory, saving, user-authored terms, terrain-aware roots, freeform drag-hand interaction, or general world streaming yet. Reset/reload starts over; there is no persistent save. Hint search is bounded and may not find a route after unusual exploration, though the initial and tested routes work.

The important next observations are whether selecting a subtree feels natural, whether the algebra remains readable in world space, and whether simplification feels like reshaping a place. Preserve earlier checkpoints and judge this as an interaction experiment, not a replacement for the visual reference library.


Browser verification: completed the six-move route, selected a multiplication rune directly, verified undo/redo expressions, changed to cel shading and adjusted bow, and walked out of the interaction circle. Inspected live swap, regroup and factor frames. Factoring exposed a sub-voxel needle artifact; retiring members now retract in length at retained radius. The remaining junction motion is provisional. TypeScript checks passed for the scene and worker.
