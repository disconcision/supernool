# Correspondence audit — discussion evidence, not an implemented mechanic

2026-09-08. The user requested concrete minimization and analysis before more interaction mechanisms. The previous notebook and explicit selector were not accepted. These files are reproducible supporting evidence for a discussion in the task; no game mechanics changed in this pass. The alpha/local-definition proposal remains in `design/rewriting-systems-roadmap.md`.

## Main finding

Supernool has not retained Nool's full declarative candidate pipeline. `gestures.ts` manually chooses a grip and target for each operation family. `scene.ts::anchors` uses the target's final position for most families, not necessarily the held object's final position. `algebra.ts` is an imperative rule enumerator, not Nool's pattern-rule implementation. Algebraic legality and the validity of a drag handle must be audited separately.

Nool's `src/drag/Drag.tsx::candidates` first calls `prefer_grab`, then requires a surviving grabbed-node anchor and pattern-level moverhood. The prefer-grab policy preserves the actual grabbed copy in a merge with an equal twin. Nool's `design/drag-target-decomposition.md` separately discusses slot change, layout reaction and correspondence. These are relevant existing design decisions, not new inventions.

Current absorption grips disappearing A in A×0→0. Current factoring also grips a losing copy, although it could instead preserve that copy. Distribution retains the grabbed sum's ID on a product, but its guide targets a different node. Thus some displayed conflicts are artifacts of the manual table, not established limitations of the intended declarative interaction model. Relabeling/correspondence policy itself requires review; merely using an existing ID isn't proof of correct correspondence.

## Measurements

`audit.ts`: exact current guide calculation in a controlled planar depth layout with no irregularity. Hollow crown's factor/distribute guide endpoints differ by 0.15 layout units; their vectors differ by 2.73 degrees in 3D, about 3.44 degrees under the specified scene-like camera. This is near-coincidence before projection, not an exact symbolic necessity. These are not readings of the user's current custom settings.

`factor-family.ts`: enumerated 274 cases of 3T+(−3)T with optional outer +y, where T is a binary +-rooted tree built from x leaves with up to nine nodes. The eleven-node case has about 28.30° separation. Adding an outer sum creates a thirteen-node case with 2.25° separation and 0.075 unit endpoint distance. A seventeen-node case has exactly coincident guide endpoints. These minima apply to this family/configuration only, not all possible expressions or layouts. Actual distinct leaf names can replace the repeated x labels without changing this controlled geometry.

`enumerate.ts`: exhaustively enumerated 712 ordered binary +/* expressions of 3/5/7 nodes over leaves x and 0. Examined 2,854 same-grip candidate pairs with structurally distinct outputs. Exact current-guide collisions were found for absorb/distribute (5 nodes), absorb/regroup (5), factor/absorb (7), factor/calculate (7). Every reported witness consumes at least one grabbed handle. This does not establish that a corrected declarative implementation has no other ambiguities.

`endpoints.ts`: for the 13-node witness, factor counterpart ends at (−.3,4.3,0); distribution guide at (−.375,4.3,0), but the held ID ends at (−1.575,5.8,0). The source is (.45,5.8,0). `endpoints.svg` illustrates these measured positions at one common scale. In Hollow crown the distribution guide is (.075,4.3,0), while the held ID ends at (−2.475,5.8,0).

## Paths and two hands

Current input ranking follows straight endpoint chords. Surviving node motion generally interpolates linearly; swap adds sinusoidal depth displacement. Regrouping junction centers interpolate linearly but moving branch attachments follow a connector, including its bow. Creation/retirement introduces additional peeling/retraction. Curved visual motion is not currently curved-path input recognition.

For candidate r with correspondence C_r and pose P_r(t), use the observable path gamma(r,h,t)=projection(P_r(t)[C_r(h)]) for a supported handle h. Correspondence can be relational (merge/copy); eligibility and the chosen representative must be explicit. Two-hand input supplies joint observations at the same progress t. A structural hold filters candidates whose rewrite acts inside the held subtree; an endpoint-position constraint and a full-trajectory spatial pin impose different conditions. The existing pin is stronger still: it fixes identity, incoming edge and sampled world positions.

Given candidate pairs, define D(r,s) as the handles whose predicted observations differ. A handle set distinguishes candidates only if it intersects D(r,s) for every pair. If all positional observations are identical but a symbol changes (e.g. two toy rules fork(x,y)→add(x,y) and fork(x,y)→multiply(x,y) with identical layouts), no number of positional hands can distinguish them. Extra symbolic context or a distinct interaction channel is needed. Candidates with the same relevant result need not always be treated as separate choices; that depends on whether rule identity matters to proof/progression.

Proposed order: restore/audit candidate correspondence and mover eligibility; rerun bounded witness search with corrected targets; then compare static layout, approach-time/local settling and curved-path observation on remaining witnesses. Freeze choices during a pull. Merely moving dots independently would violate the correspondence goal. Local aliases/folding should preserve underlying meaning and prevent internal actions while allowing whole-subtree motion; defer implementation until discussed.

## Running the scripts

From repository root, bundle an entry with esbuild (platform node, format cjs) into `.cache`, then run it with node. The scripts import the current core modules; saved JSON captures this audit's version (e761409). They deliberately do not mutate application files, defaults or browser settings. The committed game was left untouched.
