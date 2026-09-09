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
- `A+0 → A` tracks A; `A×0 → 0` tracks zero. Pulling a disappearing object cannot derive from surviving occurrences alone. An explicit visual exit anchor could support it declaratively; see the exit-anchor proposal below.

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


## Exit anchors for disappearing occurrences — proposal, not implemented

User discussion, 2026-09-08: an occurrence absent from the final expression can still have a meaningful terminal **visual** position. For `0+A → A`, zero could contract into the local plus junction. This could make both pulling A and pulling zero intelligible handles for the same rewrite, without pretending zero survives algebraically. The user relates this to factoring: two equal copies can physically converge even though only one occurrence remains in the resulting tree.

A possible motion contract distinguishes:

- `survive(resultOccurrence)` — an occurrence continues in the result.
- `mergeInto(resultOccurrence)` — material/occurrence provenance converges onto a retained copy.
- `exitAt(visualAnchor)` — the occurrence retires at a declared location, possibly a junction that itself disappears symbolically.

The anchor belongs to the physical transition, not to the final term. It may follow the scene's relayout, remain fixed for that movement, or attach to a surviving ancestor. A retired local junction can remain a temporary visual anchor without remaining an algebra node. Once the motion plan supplies traces, candidate input endpoints can be derived from those traces. Algebra alone does not determine the trace or which retiring occurrences are ergonomic handles.

### Two identity interpretations to retain

The user's initial expectation was that the **local junction stays in place**, and the multiplication root of `3x` plus the zero move into it. This means preserving a physical joint/location while retiring its `+` sigil and letting the incoming `×` sigil occupy it; it need not preserve a literal addition node in the result.

The user then observed that, in problem 01, the local `+` and zero instead slide toward the **outer/root plus**, with `3x` taking the local subtree's resulting position. After reconsidering, the user said this could be fine too. Do not record the local-anchor option as decided, or the upward-retirement option as rejected. No runtime changes were made during this discussion. The assistant initially called the destination a problem too categorically; this is a motion-design choice to compare. Actual detached wood remains a separate connectivity defect.

### What the implementation check established

Source and numerical checks compared the current ordinary identity transition against the layout implementation at `e51cea9`, before derived contacts. For root `0+x`, nested `(0+x)*y`, and deeper `((0+x)+2)*y`, sampled zero positions at progress 0, .25, .49, .5, .75 and 1 were identical. Thus deriving contacts did not remove zero retraction in these cases. This checks the ordinary rewrite preview, not equality of all release animations or all historical prototypes.

- Root `0+x`: zero converges to the old plus position `(0,1.3,0)`, also x's final position in the test layout.
- Nested `(0+x)*y`: zero retires to the surviving outer root at height 1.3; x replaces the local subtree at height 2.8. The local plus also retires upward. This matches the kind of motion the user reports for the right `3x+0` in problem 01.
- Deeper `((0+x)+2)*y`: ordinary zero retraction ends at the surviving enclosing plus, height 2.8, while x occupies height 4.3.
- The ordinary transition changes its visible node set halfway through: zero's glyph is absent at progress .5 even while its tracked position/member continues retracting. This behavior also predates derived contacts. Do not claim the complete zero sigil visibly reaches its endpoint.
- The newer release glide is distinct: a sampled release from .55 in the deeper example sends the missing occurrence toward the whole-tree base (height 1.3), because the captured pose's parent map contains only result-tree relations. This is an unplanned fallback, not an explicit policy for rootward retirement. Preserve the finding for the motion-contract repair; do not confuse it with the user's openness to deliberately chosen upward retirement.

### Benefits, limits, and counterexamples

Exit anchors broaden derivation from final-state positions to transition endpoints. They let a tangible contraction provide an input handle and keep the input target accountable to the visible motion. The user requested recording this for later, not implementing it ahead of fundamental connectivity/selection work.

A universal “deleted node goes to nearest surviving ancestor” rule is insufficient: the immediate local joint may itself be retired, yet still be the intended exit anchor. Conversely, an ancestor farther up may be an intentional destination. Choose and record the policy rather than getting it accidentally from missing IDs.

`A*0 → 0` can erase an arbitrarily large A. Making every erased descendant a handle would produce a flood of equivalent gestures and make disappearance motion depend awkwardly on the chosen leaf. Prefer the maximal retiring subtree or explicitly selected contacts if exploring this family. The existing zero-survivor handle remains meaningful.

`0+0 → 0` and `1*1 → 1` expose coincident routes and multiple rule justifications. An exit position cannot by itself decide which occurrence survives or which rule earns credit; grouping indistinguishable outcomes and recording justifications are separate policies. More handles can worsen spatial ambiguity even when each is physically sensible.

Factoring provides a useful visual analogy but not identical semantic provenance: an equal copy merges into a retained equal copy; an additive zero is simply removed. Keep those fates distinct for reverse animation, definitions, and later proof/progression rules. Neither a universal exit policy nor every conceivable rewrite needs to be supported by the main interaction.

## Ambiguity precision trial

The user found continuous correction useful but reported single arrow presses switching too abruptly among the left identity/swap/regroup candidates. They approved trying lower input gain near competing tracks plus modest stickiness, while retaining the existing 200 ms glide and physical tree motions.

Encounter → Route tracking now has **Continuous + fine control near overlaps**, selected explicitly with `tracking=precision`. Previous glide, sticky and lock/catch modes remain. The new option is the initial HTML choice, but saved controls may restore another; the query override reliably opens the trial.

For body pulls and the G-held keyboard cursor, input is accumulated from new displacement deltas. A smooth ambiguity field reduces gain from 1 to as low as .3 when the two closest tracks have similar distances. The field fades with track-distance difference over 12 captured pixels and distance away from tracks over 40 pixels; it fades in 10–30 pixels from the shared starting point. Single-route pulls and regions away from competing tracks retain full sensitivity. This is input scaling, not attraction toward a candidate. Midpoint integration with at most one captured input pixel per substep reduces frame-rate dependence. No movement means no virtual-cursor movement even if gain changes.

Stickiness is at most 3 captured pixels and at most a quarter of the nearest destination separation. The cap avoids making tightly packed alternatives unreachable through incumbent bias. Direct pointer dragging remains one-to-one and receives only this modest stickiness in precision mode. Discrete release and whole-pose glide policies are unchanged. Explicit held-route selection bypasses ambiguity slowing.

Tradeoffs: more character movement is needed in the ambiguity region; world obstacles still limit movement. Integrated variable gain introduces input-history dependence, so retracing a different path need not return the virtual cursor exactly to its starting coordinate. Escape remains an unconditional cancel. No claim is made that exact coincident destinations are resolved, or that the known physical connectivity defects are repaired.

Validation: typecheck and full core suite pass, including new gain-field, idle stability, per-delta gain-change, frame-partition, tightly spaced destination and late-correction checks. In-app-browser original-clearing test used G-held keyboard cursor: advanced regroup to 100%, crossed toward zero removal while sensitivity reduced, then committed identity without retreating to start. No page errors reported. Intermediate visuals were inspected; physical animation code was unchanged. The body path uses the same mapping, but a complete sustained body-mode playthrough was not performed. Chrome remains unavailable through the browser-control surface.

## Precision feedback: launch resistance and default rollback

The user found the precision trial not clearly better, possibly worse: correction is possible partway along the left `2x+0` routes, but single taps still switch markedly near their close endpoints, and initiating some pulls requires repeated Down presses. Treat this as negative/unresolved feel feedback, not acceptance of precision as the new default.

A reproducible selection defect: every track ties at the shared source, so enumeration establishes an arbitrary incumbent at zero progress. Immediate incumbent bias can then keep a sideways track selected at zero progress during the first several pixels of downward input. The gain field already preserved full input sensitivity for the first 10 pixels; that alone did not remove selection resistance. The precision comparison now gives no bias inside those first 10 pixels, ramps it in over the next 20, and gives no bias to a route clamped at zero progress. Regression checks reproduce the old swallowed-input case and require positive progress on the first .1/1/5-pixel directional inputs. This is one confirmed mechanism, not proof that acceleration, pose easing, quantization or worker latency never contribute to perceived hesitation.

**Continuous + pose glide is restored as the HTML default.** Precision remains explicitly labeled an experiment. Saved settings may still select another mode; `tracking=glide` reliably overrides that on load without editing app-default settings. No changes were made to physical branch trajectories, body acceleration, the 200 ms display glide, or close-endpoint classification. Reduced gain does not remove the categorical pose difference between two nearby destinations; that remains unresolved.

Validation: typecheck and full Node suite pass. A separate muted in-app-browser test on the original tree, using precision with the G-held keyboard cursor, advanced left multiplication from progress 0 to .0591 on one Down tap at full gain, then cancelled. No browser errors. This is not a sustained body-mode feel evaluation; the browser tool's short keypresses do not reproduce holding Space while walking continuously. The test tab was restored to body/glide afterward; the frozen preview was left untouched.

## Target scope audit · 2026-09-09

User feedback after the launch correction: current dragging feels better and may be fine; keep it provisionally. Neither the mechanism nor its absence is firmly preferred. Revisit this uncertainty when discussing target scope, selection or tree motion, rather than treating it as settled. The user's tentative reminder request became a request to retain this design uncertainty; no timed reminder was scheduled.

The next concern is upstream of selection: derived contacts expose more destinations. The concrete held node is the plus at the root of `((2x+0)+y)`, the left child of the original tree's root. A diagnostic confirms **four** syntactic candidates (swap plus three regroupings), versus **two** in the authored contact table (swap plus one regrouping). With `L=(2x+0)` and `R=(3x+0)`, the start is `(L+y)+R`:

| Candidate | Result | Rewrite site and held role | Earlier authored handle? |
| --- | --- | --- | --- |
| Swap | `R+(L+y)` | Whole-tree root; carry its left operand | Yes |
| Regroup at root through left junction | `L+(y+R)` | Whole-tree root; held inner plus becomes root | Yes |
| Regroup inside held subtree | `(2x+(0+y))+R` | Held plus itself; it becomes the inner `0+y` junction | No |
| Regroup at root through right junction | `((L+y)+3x)+0` | Whole-tree root; held subtree is unchanged internally and moves intact | No |

These are distinct one-step results, not duplicated display dots, a multi-step search, or alternative paths to one result. The three regroupings occur at **two rewrite sites**, not three. Endpoint visibility still depends on equipped rules, pins, the node budget and a 10-pixel minimum displacement filter.

Supernool scans all owners, but only a held occurrence inside that owner's rewrite can qualify. Thus for a fixed grab it effectively considers the held node and its ancestors, not arbitrary unrelated tree locations. It requires surviving occurrence correspondence and changed local L/R path. If an unchanged subtree moves as a whole, its root can be a handle but its interior descendants are excluded. Global relayout alone cannot make a node outside the rewrite a handle. This scope did not expand during the latest continuous/precision scoring work; it expanded when the earlier action-specific contact table was replaced by derived occurrence contacts.

### Comparison with local source implementations

- **Classic Nool**, local HEAD `f011022`: `src/drag/Drag.tsx:260` explicitly enumerates the grab's site and all ancestors, tries enabled transforms in both directions and deduplicates expressions. `grab_is_mover` around line 419 classifies roles using rule patterns: structure, binding root, or inside a binding. Binding interiors are excluded; source/result pattern occurrence paths determine moverhood; a measured surviving anchor is also required. It therefore has no universal “only self/parent” cutoff. A comment at the top of the file describes only the grabbed site and is less precise than the actual enumeration.
- Nool's standard `associate_plus` in `src/data/Tools.tsx:40` preserves the **outer** plus (`plus_y`) and moves the inner plus (`plus_x`) sideways. Supernool's `algebra.ts` exchanges those junction identities. In this witness, Nool's source-level mover filter excludes the “regroup inside held subtree” handle because its outer junction stays fixed, while the two ancestor regroupings qualify. This is a source analysis of the current local implementation, not a recreated browser session or a claim about every historical Nool version; other enabled rules such as reverse identity can add their own targets.
- **Dragology algebra**, local HEAD `02937ec`: `allPossibleRewrites` in `src/demos/animate-algebra/asts.ts:270` searches at every depth but requires the grabbed ID to match a `#` trigger in the source pattern (`matchHelper`, around line 135). A wildcard trigger matches the root of its binding, not arbitrary descendants. `tree.tsx:100–139` separately authors “pull up op,” “pull down op,” “pull up operand,” and “pull down operand” associativity trigger sets. These sets are disabled by default in this checkout. Enabling the relevant op/operand variants yields the same three regroupings plus swap in our minimal witness. Its sideways-op variant separately warns about conflict with commutativity. Declarative endpoint derivation and deliberately restricted handles coexist in that implementation.

The upstream AST matcher was executed on the minimal witness with the exact checked-in plus trigger patterns. It returned swap, up-op-right, down-op-right and down-operand-left. The self-contained Supernool diagnostic is `design/experiments/drag-correspondence/target-scope-audit.ts`; it asserts authored 2 / derived 4 and prints owner paths, held-node paths, endpoint deltas and results for the original tree and the smaller `(((a+b)+c)+(d+e))` witness. Bundle with esbuild (`--bundle --platform=node`) and run with Node. No gameplay behavior changed in this audit.

### Design implications, not yet implemented

Keep three axes separate: (1) where a rule matches, (2) which roles in that match may initiate it, and (3) how node identities and physical joints correspond. A blanket ancestor-depth limit would conflate them and may lose useful deep compound-factor handles. In this exact witness a self-or-parent cutoff would remove none of the four candidates: all rewrite sites already satisfy it.

A useful next comparison could distinguish the two actively rearranged junctions from a whole unchanged outer operand being carried. Offer both junction handles, with carrying that outer operand as an optional broader scope; derive the positions from the same results. This would remove the fourth row here while retaining the other regroupings. Alternatively, comparing fixed-outer versus exchanged-junction associativity changes the second new handle for a different reason. Neither restriction is decided: the user finds broader movement potentially interesting. Rule-schema trigger/role annotations would permit these distinctions without reinstating hand-authored destination coordinates or changing algebraic legality. Target density, geometry/projection overlap, and route-switch dynamics should be evaluated independently on this same witness.
