# Dragology: route selection, preview, and continuity

Research checked 2026-09-08. The user requested trying a derived/declarative dragging comparison, then improving late corrections without abrupt tree-pose jumps. The comparison is experimental; neither derived contacts nor continuous tracking is a final accepted replacement.

## Primary sources

- [Dragology upstream](https://github.com/joshuahhh/dragology), local `../../../draggable-diagrams/`, inspected commit `02937ec694f6fe301ff608b079ee22ec024caa4d`. The older `joshuahhh/draggable-diagrams` name redirects there. Local checkout may have work beyond that commit.
- [Algebra demo](../../../draggable-diagrams/src/demos/animate-algebra/tree.tsx), `dragTargets` around lines 321–334.
- [Behavior interpreter](../../../draggable-diagrams/src/DragBehavior.tsx), closest around 270–335; between/projection around 655–940.
- [Renderer](../../../draggable-diagrams/src/DraggableRenderer.tsx), `runSpring` and `advanceFrame` around 490–550; [transition defaults](../../../draggable-diagrams/src/transition.ts).
- Paper in that checkout: [d2-paper.pdf](../../../draggable-diagrams/d2-paper.pdf), with searchable [d2-main.tex](../../../draggable-diagrams/d2-main.tex). Another local manuscript: `../../../declarative-dragging/main.tex`. Read source text rather than guessing from the D2/Dragology naming.
- Nool's earlier port and investigation: [drag-legibility.md](../../../nool/design/drag-legibility.md), especially rounds 5–6, and [Drag.tsx](../../../nool/src/drag/Drag.tsx), Classic/Sticky manual_start around 1440–1475. Its [captured-geometry notes](../../../nool/design/captured-geometry.md) are earlier exploratory context, not necessarily the latest implementation.

## Separate five decisions

1. **Legal destinations and correspondence:** enumerate rewritten states and identify surviving occurrences; render/layout each state to obtain the held occurrence's destination. Algebraic equality alone does not choose identity correspondence when terms duplicate, merge or disappear.
2. **Selection:** choose a candidate based on pointer/virtual-cursor position. Nearest endpoint and nearest track are different partitions of input space.
3. **Preview:** compute an intermediate geometric view from a fixed drag-start state and the selected candidate (or a weighted collection).
4. **Display continuity:** ease from the actually displayed view when the selected candidate changes. This does not redefine the preview's starting state.
5. **Commit:** decide the discrete expression on release. Snap, catch, hysteresis and in-drag chaining are additional independent policies.

Calling all of these “declarative dragging” obscures important choices. Supernool's candidate geometry still includes authored motion for operations, even where contacts derive from occurrence survival.

## What the upstream algebra demo actually does

```ts
d.closest(newTrees.map(newTree => d.between([state, newTree])))
 .withSnapRadius(1, { chain: true })
```

Each two-state track projects the pointer onto its clamped start–target segment. `closest` continuously compares distances to those tracks. Its optional stickiness subtracts a pixel advantage from the incumbent's distance. Within the chosen track, the nearest endpoint supplies the discrete drop state. Thus the algebra demo is not one simultaneous average over every possible rewrite.

The renderer detects an `activePath` change, snapshots the **currently displayed** layered scene (including any unfinished previous glide), and eases toward the new, continuously recomputed preview. Default: 200 ms, cubic-out. Though the implementation calls this a spring, the default is a timed ease, not a physical oscillator. Some layers can opt out with `dragologyTransition={false}`.

The demo also uses a 1-pixel snap radius and chaining: reaching a snap can commit during the drag and restart candidate enumeration. These are separate from the cross-route display glide. Supernool's current trial deliberately omits snap/chaining and retains release-to-commit.

## Spatial mixing is another available mechanism

A single `between([...manyStates])` triangulates candidate held-element positions and interpolates rendered layers by Delaunay barycentric weights (normally up to three contributing states). Optional natural-neighbor interpolation changes smoothness and support. `sharpness` raises and renormalizes weights to alter attraction toward states. Stable layer IDs permit correspondence and appearance/disappearance effects.

The discrete drop still chooses a nearest anchor. Coincident anchors are explicitly diagnosed by the multiway implementation; it is not a solution to indistinguishable targets. The TwistedTrees demo explores this family. In Nool, its experimental Blend mode used inverse-square weights for projection/layout manipulation; rewrite Blend fell back to Classic. Do not claim that Nool already implemented the complete multi-candidate rewrite blend.

## Earlier porting mistake worth retaining

Nool's August investigation initially attributed teleporting to tree size or memory semantics. Round 6 identified a missing renderer behavior: whole-view easing on every closest-track switch. Round 5 separately fixed previews being re-anchored to the current display, which made retreat path-dependent and left old geometry behind.

Keep the mathematical preview anchored to grab start. Capture the current display only for temporal easing and release settling. Repeated changes during an unfinished glide must capture that unfinished display, not the previous route's ideal preview or endpoint.

## Supernool implementation / comparison

Live scene: `explorations/018-painted-ground/`. Encounter has independent **Drag contacts** and **Route tracking** controls.

- **Authored contacts / Derived surviving occurrences:** preserved as the first comparison axis.
- **Lock and catch:** earlier checkpoint: route retained beyond 12% target progress; catch at 82%, release of catch on retreat below 55%.
- **Continuous + pose glide:** nearest clamped segment every update, no incumbent bias, no early route lock, no catch. Release commits when the selected target endpoint is nearer than that track's start; otherwise it cancels. Endpoint ties cancel. Overshooting is allowed. This is not a global nearest-dot Voronoi classifier.
- **Continuous + slight stickiness:** same, but incumbent receives a 3-pixel distance advantage. It can still switch late; this deliberately alters the selection boundaries.

The continuous mode is the initial choice for this trial; saved controls can restore another choice. URL `?drag=derived&tracking=glide` forces the trial after saved-control restoration. `tracking=locked` and `tracking=sticky` select comparisons. Frozen port 3101 is not automatically rebuilt.

Candidate anchors stay fixed for the grip. Guides are displayed from those anchors under the current zoom, so scoring and guide positions share their coordinate contract. Mouse coordinates are corrected for automatic camera zoom. In body mode, character displacement projected onto camera-ground right/forward vectors moves a virtual screen cursor; it is still not a physical rope. Body movement retains its existing acceleration/constraints, but continuous tracking bypasses the old scalar progress spring. Two-dimensional track selection is separate from the curved three-dimensional motion of branches, including swap's depth orbit.

### Adapting the display glide to 3D

`drag-tracking.ts` implements selection/drop; `pose-glide.ts` interpolates semantic member endpoints, bow curves, radii and sigil positions before remeshing. Mesh vertex buffers cannot be interpolated safely because topology changes. Missing members emerge/retract at a surviving attachment at full thickness rather than becoming long sub-voxel needles. The source snapshot comes from the last **displayed worker pose**, and switching invalidates stale worker results. The target continues following the input during the 200 ms glide. Release/cancel also eases from the displayed pose to the selected discrete layout, including release during a glide.

This is not the upstream SVG renderer transplanted unchanged. Corresponding 3D members can cross or produce odd unions between structurally different routes. Tests for finite geometry are necessary, not proof that every mixture looks good. Remeshing latency and quantized sampling can limit the number of visible intermediate frames; do not promise 60 fps smoothness from a 200 ms envelope. Explicit held-route number shortcuts and rule disabling remain fallbacks, not the preferred everyday workflow.

## Concrete witnesses / next evaluation

- Original clearing: grab the left `2x` in `(((2x + 0) + y) + (3x + 0))`. Additive identity and regroup have close destinations. Try heading most of the way toward regroup, then moving toward identity **without returning to the start**. Try reverse correction, cancellation, and release during a switch.
- Hollow Crown: the right compound factor T in `(3T + (-3)T) + y`, `T=(x+y)(x+y)+x`, has factor/distribute targets only 0.15 tree units / approximately 2.726° apart in the controlled planar depth layout. Derivation alone does not remove this collision. Actual pixel distances depend on layout/camera.
- `A+0 → A` tracks A; `A×0 → 0` tracks zero. Pulling the disappearing object is an authored metaphor, not surviving-occurrence derivation.

First compare no stickiness against the old lock/catch and modest stickiness. Measure late corrections, cancellation, unintended commits, mesh continuity, and mouse/body differences. If this still feels wrong, consider a small diagnostic study of true multi-candidate mixing or gesture-path distance, using these same witnesses. Exact coincident endpoints still need additional information; two-hand context, alternate handles and named subtree chunks remain separate proposals in the mechanism notes.

## User correction: algebra correspondence is not physical-member correspondence

During this trial the user reported disconnected branches in the preceding version, and explicitly reaffirmed that operation-specific physical tree motions are desirable. The architecture should separate legal rewriting, occurrence/drag correspondence, and a physical motion plan. Do not interpret a preference for derived contacts as a prohibition on tailored motions for regroup, factor, distribute, emerge or retract.

A focused source/numerical investigation reproduced a mismatch already in `layout.transition`, independently of cross-route gliding: glyph-preserving factoring can promote an existing multiplication junction to the root. Its old incoming edge disappears from the final layout, so the generic transition retracts that member's tip; the surviving junction's point and another outgoing member remain at the unretracted position. This can separate attachments. The earlier fix preventing the retired edge from overwriting the root's sigil point did not repair physical-member correspondence. Regroup already has an explicit persistent connector/support treatment; generic factoring does not inherit it.

Reproducer: `design/experiments/drag-correspondence/factor-support-audit.ts` reports this tip/junction discrepancy for `2x+3x → (2+3)x` and Full Span. From the repository root:

```sh
npx esbuild design/experiments/drag-correspondence/factor-support-audit.ts --bundle --platform=node --outfile=.cache/factor-support-audit.cjs
node .cache/factor-support-audit.cjs
```

This is a diagnostic, not a claimed repair or a complete mesh-connectivity test: thick surfaces may overlap despite centerline discrepancies. The physical-motion bug remains open. Prioritize a connected factor/distribute motion plan and attachment tests, preserving the declared dragged-occurrence endpoints. Also validate connections during cross-route glides; finite vectors and legal endpoint expressions alone cannot certify either motion family. Do not hide the defect by removing valid rewrite contacts or reverting to dragging a disappearing term without discussing that separate interaction choice.
