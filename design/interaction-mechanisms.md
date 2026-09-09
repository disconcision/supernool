# Interaction mechanisms: concrete problems before extra controls

Working discussion, 2026-09-08. This supersedes the broad HTML interaction notebook as the place to retain the current list. Most mechanisms below are proposals, not implemented or approved interfaces. Audio/undo and unrelated UI work do not belong in this list.

## Current experiment: derived surviving contacts

Encounter → Drag contacts offers **Authored contacts · checkpoint** and **Derived surviving occurrences · experiment**. `?drag=derived` explicitly opens the experiment; `?drag=authored` opens the comparison. Neither changes the mathematical rule inventory. Both pointer and body input consume the same candidate list; their existing straight-segment input scoring and catches remain unchanged. Curved-path recognition is not implemented by this experiment.

The new layer still uses the current algebra's legal actions. It is not a port of Nool's complete pattern engine. It derives contacts from local before/after syntactic paths and an occurrence correspondence, with no action-name-to-grip/target dispatch:

1. Prefer stable same-glyph IDs. If constructors reused an operator's ID for a different symbol, match remaining operators of the same symbol in traversal order. This is a provisional correspondence policy, not a theorem about identities. It preserves a held sum's `+` through distribution and factoring.
2. If a matching branch would merge into another copy, retain the held copy and its entire subtree instead. Reverse its merge provenance consistently. Interiors of unchanged carried branches are not extra handles.
3. Offer surviving occurrences whose local syntactic slot changes. Movement caused only by recentering/depth layout does not create a handle. Computed numeric results may be carried by either numeric contributor; ordinary zero absorption retains the actual zero instead.
4. The endpoint is the held occurrence's position in the candidate layout. That same candidate, including its correspondence, drives preview, commit, undo and recovery. The existing geometric motion policies remain specialized.
5. Reject screen-space paths shorter than the existing ten-pixel threshold. Cache candidate construction until the tree or contact variant changes. Freeze projected endpoints during each grip.

Changes a player should notice:

- `A × 0 → 0`: pull **0**, not the disappearing A.
- `A + 0 → A`, `A × 1 → A`: pull **A**, not the disappearing identity.
- `3T + (−3)T → (3 + (−3))T`: either entire T occurrence can be the surviving held copy. Its leaves move as passengers.
- `(x+y) × 0 → x×0 + y×0`: a held `+` remains the sum operator, becoming the result's root, rather than changing to a multiplication sign midway through the gesture.
- More than one handle can express an operation. A junction itself may also be movable. We have not optimized how many choices should be shown.

A retired incoming edge was found to overwrite the position of an occurrence promoted to root. The shared geometry fix now keeps that surviving point; it does not introduce a new drag metaphor.

### What the controlled witnesses say

`T = x+y`; the smaller expression is `(3T + (−3)T) + z` (13 nodes). Hollow Crown uses `T = (x+y)(x+y)+x` (25 nodes). Hold the **right T root**. With planar, depth-based layout and zero irregularity:

| Witness | Authored factor/distribute angle | Derived angle | Endpoint separation |
|---|---:|---:|---:|
| Smaller expression | 2.246° | 2.246° | 0.075 tree units |
| Hollow Crown | 2.726° | 2.726° | 0.150 tree units |

This is a crucial negative result. With glyph-preserving correspondence, the near-coincidence survives derivation: it is already present in 3D, not merely introduced by camera projection. The old placement happened to match this particular correspondence. These are close endpoints, not a proof that the mathematical operations inherently require coincident positions in every possible layout.

`design/experiments/drag-correspondence/derived-audit.ts` reproduces those numbers. The previous audit that followed constructor IDs without glyph correction gave a different distribution endpoint, but that held `+` became a product: it is a different identity policy, not an automatic repair.

The five-node `0 × (x+x)` witness previously offered absorption and distribution from the same disappearing sum. Derived absorption instead belongs to the zero, so that specific sum-handle collision goes away. The zero can itself participate in distribution; endpoint discrimination still needs testing.

## Mechanisms to investigate, point by point

1. **Occurrence correspondence and handle eligibility** — this experiment.
   - Problem: disappearing A was offered as the handle for `A×0→0`; a held sum could silently change operator identity.
   - Variations: literal stable IDs; same-symbol correspondence; held-copy preference; offer only maximal carried operands versus also moving constructors; numeric contributors versus an explicit result handle. For duplication, choose which outgoing copy inherits the held occurrence, or explicitly represent both.
   - Cost: invisible identity choices can make behavior unpredictable. Compare the actual animation and endpoint, not just the final equation.
   - Test: absorption, identity, factoring T with nontrivial descendants, distribution, root and nested associativity. Keep the existing authored variant available.

2. **Layout and projection adjustment** — future.
   - Problem: factor/distribute routes in Hollow Crown nearly coincide; unrelated branches can overlap only in projection.
   - Variations: global static layout objective; local rearrangement upon selecting a contact; camera adjustment; temporary depth spreading; local spacing with the distant tree fixed. Apply globally computed constraints locally, or optimize local choices before the tree is shown.
   - Cost: moving targets and a tree that wriggles whenever selected. Freeze the layout once gripping starts; use bounded, gradual changes before gripping.
   - Test: the 13-node witness and Hollow Crown, plus several camera angles. Measure minimum angular separation, target size and disturbance to unaffected branches. A shared endpoint cannot be separated without changing the correspondence/layout contract.

3. **Trajectory rather than endpoint evidence** — future.
   - Problem: different rewrites have similar endpoints but can follow distinct physical motion.
   - Variations: show and follow actual projected operand paths; use initial tangent only; use the full traced curve; progressive commitment after a distinctive section; widen a path corridor with hysteresis. Swap's existing depth arc is the first candidate, but it can project to a nearly straight line from some viewpoints.
   - Cost: mouse curves may be natural while arrow-key curves are tedious. A beautiful curve that is hard to follow is not an improvement. Do not draw a decorative arc while still scoring a straight chord.
   - Test: swap versus regroup; then factor versus distribution on the same T. Compare both mouse and body modes without changing two mechanisms at once.

4. **Different physical handles on one symbol/branch** — future.
   - Problem: one contact has too many plausible operations.
   - Variations: symbol center versus branch shaft versus a fork seam; explicit two sides of a duplicated branch; directional sectors shown only on focus; an unfolding two-contact handle for duplication.
   - Cost: precision and discoverability, especially at the current camera scale. Avoid turning every node into a miniature menu.
   - Test: `a(b+c)` and `ab+ac`. “Gather” means moving existing matching copies toward one another; “spread” needs a way to represent one source becoming two. A different name or dot color alone is insufficient.

5. **Second hand as a spatial constraint** — existing strict pin; alternatives future.
   - Problem: several candidate rewrites move the first hand similarly but differ elsewhere.
   - Variations: fixed world position; fixed position relative to another branch; fixed incoming connection; bounded movement radius. These are different constraints. The current F/Shift-click pin preserves identity, label, incoming connection and sampled position, so it is stricter than merely keeping a subtree internally unchanged.
   - Cost: accidentally forbidding useful global relayout or blocking every move. Explain the constraint and show why candidates disappear.
   - Test: pin root to distinguish swap/regroup; pin coefficient versus matching T when factoring/distributing. Do not assume every pin discriminates the desired pair.

6. **Second hand as another moving observation** — future.
   - Problem: an endpoint for one occurrence does not uniquely determine the rewrite.
   - Variations: two simultaneous destinations (multitouch/two sticks); hold first hand then steer the second; stationary second contact as the zero-motion special case; relative distance/orientation between hands rather than absolute positions.
   - Cost: coordination and control switching. The two observations must describe the same candidate at the same progress; independently choosing two incompatible rewrites is not enough.
   - Test: grab both existing T copies to gather; follow an operator and a coefficient through distribution. Enumerate pairs of candidate traces and ask which extra contact separates them. Two hands are useful evidence, not a completeness guarantee for arbitrary rewrites.

7. **Structural protection / chunking** — future.
   - Problem: in Hollow Crown, T is cognitively one operand, but its internal rewrites add noise.
   - Variations: protect internal structure while allowing translation; collapse visually to an atom; apply protection only while the other hand holds it; persistent painted region; toggle all exact copies together or one occurrence at a time.
   - Cost: hidden structure and confusion between “do not rewrite inside” and “must not move.” These must remain distinct. This can remove internal alternatives but does not inherently distinguish factor from distribution around T.
   - Test: the nine-node T in Hollow Crown; permit carrying and merging T while preventing rewrites inside it.

8. **Named subtrees / local definitions** — future, retained separately from immediate disambiguation.
   - Problem: repeated complicated structure needs recognition, reuse and eventual extra-variable sampling.
   - Variations: define α := T for this encounter; fold one/all exact matches; temporary fold/unfold tile in the Noolbox; visual alias only versus a transparent definitional node. Sample an existing T with the spare hand; later construct T using typed holes.
   - Cost: scope, naming, structural equality, definition editing and goal checking. Keep the expanded meaning accessible, make definitions acyclic, and do not conflate this with lambda abstraction or an unbound mathematical variable.
   - Test: replace both T copies in `3T−3T+y` by α, factor, and expand again. Goals should inspect the definition's meaning without silently granting unrelated algebraic identities.

9. **Explicit fallback selection** — current rule toggles retained, added route buttons rejected.
   - Problem: genuinely indistinguishable observations or inaccessible tiny targets.
   - Variations: rule inventory filtering; temporary rule family focus; explicit choice only after an ambiguous drag; cycling an unresolved choice. Existing held-grip numeric shortcuts remain a debugging fallback.
   - Cost: interrupts tactile play. This is the last resort, not the primary interaction to optimize around. Do not restore the rejected pre-grip route menu without agreement.

10. **Coalesce indistinguishable outcomes** — future.
    - Problem: `0+0→0` can be justified by arithmetic or either additive-identity direction. Multiple colored targets may describe the same useful outcome.
    - Variations: group only identical resulting terms and correspondence; retain all rule justifications under one gesture; expand the distinction when rules have different inventory/energy consequences or when a proof requires a particular justification.
    - Cost: silently treating different rules as interchangeable could invalidate progression or proofs. Do not merge merely because endpoints coincide: factoring and distribution have different outcomes.
    - Test: `0+0`, `1×1`, and a counterexample with the same target but different resulting trees.

## Scope and evaluation order

First compare derived and authored behavior on the current algebra. Then investigate the smallest remaining ambiguity with one additional mechanism at a time. Prioritize layout/trajectory evidence and the spare hand over menus; retain named subtrees as a separate complexity-management experiment.

The formal object we need for these investigations is a candidate rewrite with an occurrence relation, geometric traces, and observations of one or more contacts. Two candidates are ambiguous only relative to what the player can observe/control and the tolerance we accept. This framework is useful without promising support for every possible rewrite system.

Favor families with tangible game behavior: move/carry, gather/split, cancel/emerge, local state changes, and clearly specified parameters. Arbitrary rules whose only distinction is invisible metadata or relabeling at identical positions need not dictate the main game's control scheme. Zero-motion symbolic changes may eventually deserve a tap or explicit tool; this experiment does not invent one automatically.

Judge: accidental selections, repeated attempts, rule disabling, direction separability, endpoint honesty, carried-subtree stability, number of visible options, extra button/context load, and responsiveness. A mathematically reachable solution is not evidence that its controls are comfortable.

### Validation of this pass

Typecheck and the full core suite pass. New checks cover 440 initial derived candidates across the 15 presets and replay a solving route for every preset, plus retained descendant identities, carried-interior suppression and endpoint agreement. Live in-app-browser play completed Hollow Crown in four mouse drags and Carry a whole subtree in two moves (factor via the existing sticky G/arrow cursor, arithmetic via mouse); partial factor states were inspected. Chrome was not available through the browser tool. A full body-pull playthrough was not repeated, so its feel remains specifically unvalidated even though it shares the candidate/scoring layer. No new mechanism beyond derived contacts was enabled.

## Dragology research and first continuity comparison

See [the durable Dragology topic note](knowledge/dragology.md) for primary sources and the distinction between multi-candidate spatial interpolation and nearest-track selection with temporal display glide. The user approved the latter as the first experiment. Encounter → Route tracking now offers continuous selection, slight stickiness, and the prior lock/catch. Contacts remain independently selectable as authored or derived. Late switching no longer requires returning below 12% in continuous modes; release uses the selected track's nearest endpoint. This does not resolve identical destinations, introduce curve-shape recognition, or implement all the other mechanisms above.
