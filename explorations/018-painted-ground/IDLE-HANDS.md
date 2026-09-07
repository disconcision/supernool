# Finger walks and shared idle scheduling

The scenery-inspection hover is replaced by a short ground excursion. A free hand flies to a clear patch, plants its fingers, walks a varied route, lifts off and returns. Imported hands have four main fingers; their steps are staggered so at least two support the hand while others recover. Two-link finger solves use each imported finger's own joint lengths. The procedural checkpoint uses its three existing long fingers. No new art assets are added.

Routes start at different bearings 1.3–2.5 units from the body and wander within 3.9 units, typically walking about 3–5 units in total at 0.38–0.48 units/second. Each short path segment and its look-ahead are checked against the current bank/gate collision footprints, visible loose stones and fungi, with clearance for the hand. A blocked route stops the excursion and lifts the hand away. This is ground walking on the clearing's flat playable surface; climbing rocks, uneven-terrain contact, and full collision checking of the flying approach are not implemented.

A walk has a 24% chance of one stumble after at least 1.2 units of travel, provided the sideways footprint is clear. The hand tips onto either side, gives a small impact recoil, pauses, pushes upright, then wobbles and shuffles its toes for 1.6–2.3 seconds before continuing. Route progress is frozen throughout the mishap. Movement interrupts any stage with a lift that rights the hand and brings it home; tree interaction still takes priority immediately. The shared quiet interval begins after the excursion ends, not during the daze. This is procedural comic timing, not rigid-body fall physics.

## Shared quiet time and hand choice

`idle-schedule.ts` arbitrates all idle activities. The first choice follows 7–11 stationary seconds. Finishing or interrupting either activity starts one shared 12–22 second quiet period; catch cannot hand straight over to a walk after a voluntary miss. Only one activity runs at a time. Movement gets the existing gentle lift-off/set-down and return, while tree contact or explicit interaction takes priority immediately.

When both activities are available, the first choice is random and later successful activities alternate. Each activity maintains its own hand turn, so both hands take walks and both can initiate catch. A failed catch opportunity falls back to walking in the mixed mode. There are no assigned personalities yet. The old behavior chose a nearby target and used the hand on that side, which could repeatedly select the same hand and relative spot. Catch's scouting approach now arcs around the front of the body to let the farther hand take a turn.

Under **Inspect → Appearance → Traveller → Idle hands**, compare **Finger walks & catch**, **Finger walks only**, **Catch only**, or **Resting hands**. The rig review's former inspection mode is now **Finger walk around a stone**, using the same controller and finger solve with a visible floor.

## Checks

- `npm run check`, `npm test`, `npm run build`; `npm test` includes the new `finger-walk-check.cjs`.
- Thirty seeded route attempts check obstacle clearance along whole segments, varied starts, finite durations, continuous land/walk/exit motion, supporting fingers, and reachable finger IK. Scheduler/controller checks cover independent hand turns, mutually exclusive activities, the quiet interval after a completed catch, walking exits and urgent cancellation.
- One hundred additional seeded walks check occasional single stumbles, ordered fall/recovery/daze phases, frozen route progress, continuous rotation, resumed walking and movement/urgent interruption in every mishap phase.
- `finger-stumble-browser-check.cjs` uses Chrome on port 3100 and forces the occurrence in its browser fixture only. It captures intermediate fall, grounded pause, recovery and daze poses in the wrap figure's rig review and the cape figure's live clearing, then checks resumed walking and the return/cooldown. The ordinary gameplay probability is unchanged. Captures live in `.cache/finger-stumble-review/`.
- `finger-walk-browser-check.cjs` exercises both hands, differing routes, the quiet interval, actual imported supporting/swing fingertip heights, movement disengagement and both art figures. `idle-exploration-check.cjs` forwards to this replacement check.
- The existing catch, hand anatomy/travel and complete six-rewrite mouse/body and body-only checks remain applicable. `idle-catch-browser-check.cjs` selects Catch only to inspect that activity independently of the shared scheduler.
- Close-up and live-camera intermediate poses are captured in `.cache/finger-walk-review/`. Existing checkpoint screenshots remain unchanged.

DOM telemetry on `#world` includes `data-finger-walk`, `data-idle-cooldown` and `data-idle-catch`. These are for verification and add no visible gameplay decoration. Finger targets approximate a flat floor: turns can introduce a little lateral sliding; this is not a complete planted-foot constraint solver.
