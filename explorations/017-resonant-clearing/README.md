# 017 — Resonant clearing

Open `./?mode=body` for body pulling, or `./` for mouse grips. 016 is preserved as the preceding checkpoint. Real algebra, hewn mesh, variation controls and two-button navigation are retained.

## Catch instead of a precision drop

The route still converts mouse/body motion into a scalar rewrite preview; this is not a rope simulation. `catchPull` captures at 90% travel within a generous lateral corridor (40% of route length, clamped to 30–60 pixels). There is no overshoot ceiling. Once captured, sideways drift and further pull cannot lose readiness. Retreating below 55% uncatches; Escape cancels. Before capture, off-axis gestures cannot display the fully completed tree.

Body progress still has a spring, but release acceptance no longer depends on spring speed or mesh catching up. A captured release commits immediately and animates the remaining distance. Active grips and release settling preserve the encounter beyond its approach radius. Space now enters hand navigation; release it and then hold Space again to grip. The initial entry press and its autorepeat never grip. Escape cancels an active grip or leaves idle hand navigation. E is no longer an entry key in body mode; 016 retains its earlier controls.

## Sound

Quiet quarter-point plucks take inspiration from `src/Sound.tsx` (C for addition, G for multiplication; quieter lower reversal). These are a simpler implementation, not its full operator-multiset harmonic model. Catch uses a short three-note chime, or the user's existing `src/assets/sfx/tiup-comm-out.wav` in Recorded mode. If sample loading fails the chime remains a fallback. Uncatch and release have quieter cues. Appearance has sound mode, Off, and volume controls. Audio starts only after a user gesture. No new audio dependency or external asset service.

## Panels and symbols

All six panels minimize to white icon buttons. Help starts collapsed; it retains approach and optional hint assistance. The expression is a reading view with precedence parentheses and compact coefficients; the tree preserves exact association. The side panel identifies selection and available spells. The bottom panel retains live control phase and undo/reset. Appearance and Noolbox remain optional panels. A small top button or backslash hides all interface overlays for screenshots; Escape or backslash restores them. Minimized choices survive this hide/show cycle, not a reload.

Operator nodes are warm concentric engraved medallions; atoms are pale seed/leaf shapes with contrasting ink. The simpler variant retains distinct ring/oval silhouettes. These remain camera-facing sprites, not final embodied 3D joints. References reviewed: `../nol-world/concepts.png`, `../015-tactile-hands/README.md`, and the reference lab's `concept-v02.md` symbolic-embodiment notes. The broader carved-wood rendering remains unchanged.

“Lehi” was carried forward from an earlier voice transcript saying “Lehi the character,” not established by the reference notes. It is removed from product text; the internal legacy module name remains to avoid unrelated churn. The character is unnamed.

## Clearing

Broad irregular slate boulders surround a level playable clearing. Moss/lichen patches are placed by raycasting onto rock faces and attached to the rock, including moving gates. Small rust-colored fungi sit at sheltered edges. Glowing ground paths replace the hexagonal stepping stones: one entrance and two outward branches. Completing the simplification brightens the exits and lowers two blocking rocks; undo restores them. These are local scene cues with simple collisions, not new playable levels or an unbypassable puzzle boundary. Foliage and rocks are deterministic, static outside the gate animation. No plateau/pillar-world direction is implied.

## Validation

- TypeScript compile passes for scene/worker.
- Existing 738 legal rewrite checks, gesture mappings and navigation reachability retained.
- Catch tests cover threshold, fast overshoot, lateral retention, deliberate retreat and incomplete off-axis preview.
- Actual scene input-handler harness checks cancellation, commit, mode handoffs and perimeter behavior.
- Browser completed all six mouse rewrites (13 → 5 nodes), starting with a roughly 190% overshoot swap that now commits.
- Browser verified individual panel minimization and all-UI hiding; visual checks of distinct sigils, rocks, routes, moss and fungi.
- Body input logic is covered by the handler/spring tests. Browser automation cannot maintain independent held keys for a full body-pull playthrough. Audio initialization/sample loading and console checked; no subjective listening comparison is claimed.

## Painted backdrop follow-up

Appearance → Beyond the clearing now compares Painted uplands, Soft painted uplands and the original Plain studio background. A new generated matte uses the other research task's world/ground concepts as references, with a quiet centre behind the playable tree. The local asset and provenance are in `assets/`. The image is a screen-facing 2D painting, not a 360° environment; camera rotation changes the clearing against a fixed distant composition. No gameplay or rewrite geometry changed. TypeScript and browser shader/loading checks passed; painting and plain-mode comparison inspected in browser.


### Backdrop v2: no visible sky

User rejected the eye-level horizon/sky for this isometric camera. The live asset is now `assets/elevated-uplands-v2.png`: an elevated oblique view of surrounding mossy hills and slate cliffs, cropped to terrain on every edge. Painting and softened variants both use v2. The old sky image is retained in assets but is not an active menu option. This remains a camera-facing matte, not world-space terrain.

### Space-entry correction

Updated the actual keyboard handler, visible control hints and notes. Checked that entry and autorepeat cannot grab, entry release stays in hand mode, subsequent holds grip, and Escape exits. Mouse controls are unchanged.

### Persistent tree interaction

After Space enters hand control, the encounter remains active regardless of distance from the approach ring, including between successive pulls and after settling. Leaving idle hand control with Escape (or Leave tree) restores proximity-based behavior. Escape during a pull still cancels that pull and returns to hand control. Updated handler tests cover starting another grip outside the ring and explicit exit.
