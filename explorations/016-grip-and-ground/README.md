# 016 — Grip & ground

Two entries into one separate study:

- `index.html` — mouse grip with revised guidance.
- `index.html?mode=body` — body-driven spring pulling.

015 remains unchanged. The full list of the user’s requests and future threads is retained in `../../design/tactile-interaction-roadmap.md`.

## Guidance

All currently available routes are visible while holding, with consistent colors by rule family. Endpoints are 4–6 px points, not large target rings. There are no text elements in the tree’s SVG guide layer. Spell names are in the side panel or a separate viewport band above the canopy; the above mode falls back to the side if there is insufficient clearance. That band is moved outside the panel’s containing block so it cannot be clipped or repositioned by the card’s backdrop filter.

Variations: colored paths + points, points only, branch emphasis. Secondary paths remain visible while the chosen route is emphasized. Existing sigil labels, hewn/smooth/cel appearance controls and tree complexity remain.

## Continuous hand attention

The hand tracks contacts and floats between them on a camera-facing plane through its last contact. It stays in the tree’s space by default and returns home when Lehi leaves the encounter. The optional grace mode returns it 1.2 seconds after the last node contact. Hovering does not curl the fingers into a grip; actual holding does. UI travel preserves the previous attention point.

## Noolbox

Read `src/ToolBox.tsx` (`dragActive`) and `src/view/ToolsView.tsx` (row toggles in drag mode). 016 retains that loadout idea in a standalone study: nine independent toggles, with + and × separated for swap, regroup and numeric evaluation. Identity elimination and common-factor extraction are also available. Both regroup directions share one operator-specific toggle. Rule filtering affects visible gestures, offered moves and the hint search. Changes are locked during a held gesture.

All nine rules are already in the study’s collection. No world pickup or persistent inventory is implemented, and reloading resets the loadout. The predefined standalone algebra still supports a subset of the repository’s generalized rule system. Forward distribution and identity insertion are not added by this pass.

## A real second-hand pin

F, Shift-click or the side control pins a node. `allowsPin` checks preservation of the node and its symbol, incoming parent ID, and point throughout sampled motion states. It rejects gestures that move or delete it. The selected secondary hand stays there while the primary hand pulls. This is a strict candidate filter, not a solver that forces otherwise incompatible motions to satisfy a pin.

Pinning the initial root narrows its left child from swap + regroup to swap only. Toggling addition-swap off then leaves no candidates. A root pin can block the complete simplification until released. Appearance geometry controls are disabled while pinned, since changing the embedding would invalidate the held point. Leaving the encounter, reset or undo/redo clears the pin.

Multi-touch and changing a pin during an active pull are not implemented. Tab exchanges which hand leads; it does not create a second mouse pointer.

## Body mode · two-button revision

The first world study used Space plus avatar displacement to adjust one rewrite. Body mode now reuses arrows for three explicit control phases:

1. **Walk:** arrows/WASD move Lehi. Near a settled tree, tap **E** (or Reach in).
2. **Hand:** arrows/WASD choose nearby sigils in screen-space directions; Lehi stays still. The manifested hand eases between contacts. This is spatial node navigation, not a free-floating cursor.
3. **Pull:** hold **Space** on a movable contact, then press arrows/WASD to move Lehi and load the spring. Release Space to commit near a valid destination or return the tree to its prior expression. Control returns to Hand after settling.
4. Tap **E** in Hand to return to Walk. **Escape** cancels a pull, or exits hand control when idle.

An arrow held across a control handoff must be released and pressed again. This prevents selection input unexpectedly starting a pull or continuing a walk. Escape and lost window focus cancel rather than commit. G latching and E/Q contact cycling are no longer body controls; mouse mode retains its existing keyboard aids.

Optional controls: **F** pins the selected node; **H** suggests a grip; **1–9** chooses a shown route before pulling; Tab exchanges leading hands. None is required for basic targeting/gripping/pulling. The second hand now rests unless explicitly pinned, in both modes. The prior automatic brace was only a visual convention, not a real constraint.

Walking has acceleration, a small impulse for short key taps, and resistance proportional to spring lag. `advanceSpring` integrates a mass-adjustable damped spring on the rewrite coordinate in small substeps. This is not simulation of branch mass, tree collisions, ground reaction forces or a physically solved brace. Mesh extraction still occurs in a worker, so fast input can lead the visible surface. A larger exit radius than entry radius leaves room to maneuver after approaching.

No automatic reassociation or dynamic layout optimization was added. The proposed direction-separation experiment is recorded in the roadmap, with frozen targets during a grip and unchanged mathematical semantics as important constraints.

## Checks

- Completed the entire six-rewrite route by mouse with the new guides: 13 → 5 nodes.
- Completed the entire six-rewrite route by keyboard body movement, choosing displayed routes and releasing after spring readiness: 13 → 5 nodes.
- Browser pin test narrowed a contact from 2 moves to 1; disabling its remaining rule reduced it to 0; clearing the pin restored 2 after re-equipping.
- Above-canopy spell bounds verified outside the tree, and SVG text count was zero.
- TypeScript checks; 738 algebra move checks and physical gesture mappings retained. Added root-pin swap/regroup discrimination, displaced-leaf pin rejection, disabled-loadout hint behavior and spring convergence at three masses.

Known limits: generic junction motion, conservative pin filtering, near-collinear candidate directions, worker latency, simplified walking collisions, no saved game or acquired-rule objects. The two input modes should be judged for feel as well as successful completion.

### Two-button checks

Browser checked: walk → hand via E; directional contacts change with the avatar stationary; Space tap releases without rewriting; E restores walking and returns hands home. Actual scene keyboard handlers are exercised by `node explorations/016-grip-and-ground/controls-check.cjs`: held-key isolation across all handoffs, early release, ready commit, Escape, window blur, and no gripping from Walk. Directional navigation reaches every node from every other node in all seven states of the six-move simplification at the default camera. Earlier full-route browser checks above refer to the original 016 controls; the browser automation API cannot sustain independent key holds for a complete two-button playthrough.

### Perimeter follow-up

Active grips and settling animations now keep the encounter active outside its approach radius. Leaving the circle no longer cancels a held pull. Once released and settled, normal proximity gating resumes. Global terrain bounds and obstacle collisions still apply. The input-handler checks cover this boundary behavior. Drop tolerance, spring readiness and button bindings are unchanged by this fix.
