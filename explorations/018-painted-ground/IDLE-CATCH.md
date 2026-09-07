# Idle hands playing catch · branch experiment

On `codex/idle-hand-catch`, the ordinary 018 route can play catch after roughly 5–9 idle seconds. The starting position is close enough to a small stone: open the scene and leave the traveller still. Under **Inspect → Appearance → Traveller → Idle hands**, choose **Explore only** to retain the earlier inspection behavior without catch. This is a reversible behavior experiment awaiting feedback.

One hand roves toward a real loose stone, turns palm down, wraps its fingers, and lifts it. The other perks up, opens its fingers and moves to a station forward of the traveller. The throwing hand draws back, turns up and flicks forward, unwrapping its fingers at release. A spinning ballistic stone travels to an offset receiving point. The receiving hand reacts and chases that point with bounded speed; a spatial proximity test determines whether it catches. A late reaction can miss. The stone bounces once, settles, and the hand retrieves it if still safely within reach.

The sequence randomizes hand separation, flight time (0.8–1.4 seconds, also varying arc height), aim, reaction delay, reach speed and a 3–7 throw budget. Sessions wind down after about 24 seconds of activity, finishing their current catch/return or retrieval before resting. A normal finish sets the stone back where the session began and waits 9–18 seconds before considering another game. On movement, movement intent, contact selection, pinning or rewriting, the hands stop immediately; a held stone drops and an airborne one retains its current trajectory. Dropped stones remain where they settle for the rest of the page session. Reload restores the authored scene.

## Object boundary and implementation

`terrain.ts` explicitly registers six small, non-colliding loose stones (`100`, `102`, `103`, `110`, `111`, `115`). Larger stones, mushrooms, banks and the moving gates are excluded. A `CatchProp` carries an existing object, size, ground-support height and inspection contact. The approved fragment replacements remain children of those same objects, so the whole visible stone moves in both approved and original rock comparisons. No substitute prop, new asset or art generation is involved.

`idle-catch.ts` owns the sequence and stone motion; `lehi.ts` applies its palm poses and finger closure through the existing controller. Both imported articulated figures and the procedural checkpoint use this same behavior. `traveller.ts` continues to map finger closure onto the imported joints. Mouse/body manipulation, hand travel comparisons and algebra are unchanged. Inspection contacts track relocated stones.

This is procedural choreography with a fixed palm socket, not exact fingertip IK or rigid-body grasping. Start/receive positions use the existing obstacle footprints, but there is no full swept hand/stone collision solver. Ground support uses the loose stone's authored flat-clearing height. General terrain, arbitrary inventory objects and persistent object placement are outside this experiment.

## Verification

- `npm run check` and `npm test`; the latter now includes `idle-catch-check.cjs`.
- Seeded simulations: 63 catches and 9 misses across 16 sessions; every phase, pickup attachment, position continuity, above-ground motion, bounded endings and interruption in every phase. Shared-controller checks cover movement, contact, pin, rewrite and input-intent cancellation.
- `idle-catch-browser-check.cjs`: real Chrome on the running development server, both imported figures, pickup/notice/flight/catch, held and airborne movement cancellation, settling and the Explore-only control.
- Existing hand anatomy/travel checks and the full six-rewrite mouse/body and body-only routes, with regression screenshots redirected to `.cache/idle-catch-regression/` to preserve the checkpoint captures.
- Live-camera grip, lift/notice, flight and catch screenshots are in `.cache/idle-catch-review/`. Reviewed the finger/stone contact at intermediate poses and the arc in the ordinary full camera.

The scene exposes `data-idle-catch` on `#world` for these checks (phase, stone, holding/falling state and session throw/catch/miss counts). It does not add gameplay HUD decoration.
