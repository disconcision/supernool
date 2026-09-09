# First encounter sequence · study 019

The current scene remains `018-painted-ground/?mode=body&inhabited=1`. The on-screen study is 019. The sequence is enabled by default there and disabled by default in ordinary 018.

## Play

1. Dormant: burnt wood, no shadow canopy, bark energy or local spirit lights. A raised, gently shimmering violet ring marks the encounter boundary; it follows the spirit palette.
2. First crossing of the 5.5-unit ring starts a three-second awakening. The tree takes its working pose with a small upward surge. The canopy expands locally from the branches, the ring breathes, and brief small/medium/large discharges and a local light pulse arrive. Leaving the ring cannot cancel or retrigger this transition.
3. Active: the existing mouse and body gestures work normally. No progressive anger ramp yet.
4. When a committed rewrite reaches the existing structural goal predicate and finishes settling, release begins. Controls disengage, the spirit flashes and fades, and the ring expands outward and disappears over 1.8 seconds.
5. Eight-second recovery: the small tree replays the player’s committed rewrites backward without sigils, in the working plane, then returns to the original spatial host arrangement. Charcoal fades to ordinary wood, painted living canopy clusters unfold, and the scorch fades to 18% of its authored strength.
6. Healthy: no spirit, no encounter ring or sigils, and no tree manipulation in this first pass. The equation remains solved; rebuilding the host geometry does not reinstate the old expression. Restart is available for another encounter.

The living canopy reuses the first directed painted-cluster growth style (G1) from the existing living-tree studies, with canopy size/density controls. No new concept images or replacement foliage technique were introduced.

## Inspect → Encounter · states & transitions

- State buttons jump directly and pause for inspection. They switch to manual preview, so crossing the boundary cannot unexpectedly restart a preview.
- **Play next transition** advances from the selected state and runs timed states to their next steady state. Active → Release also works without solving, for art inspection.
- **Pause / resume** pauses the sequence clock. Cloud drift and normal world animation continue.
- **Transition position** scrubs the current timed state and pauses it. This is transient and excluded from saved presets.
- **Restart encounter** resets the puzzle, puts the traveller outside the ring, and re-arms automatic approach.
- **Off · free material study** restores independent spirit/material controls and the existing study interaction behavior.
- Timing, canopy size/density and flash strength can be saved using **Settings & presets → Encounter timing & canopy only**. Your underlying bark, light and scorch values are multiplied by sequence envelopes, not overwritten.

Previewing release/recovery/healthy derives a solved expression for the displayed geometry without changing puzzle progress. Thus a preview can show open scenery gates while the debug equation is still unsolved. This distinction is intentional; ordinary play opens them upon actual completion.

## Implementation and limits

`EncounterSequence` is a renderer-independent finite-state machine. The presentation layer consumes its channels; the algebra still owns the equation and legal moves. This uses the standard [State pattern and entry-action separation](https://gameprogrammingpatterns.com/state.html), without introducing a framework or serialized cinematic editor.

Regrowth records each committed rewrite’s before/after trees, rule and merge correspondence. Undo and redo update this trace too. The first 78% of recovery samples those exact forward animations backward, with equal time per move and the working plane held flat. The last 22% restores the original spatial spread using a smooth curve. This replaces the previous direct solved-to-original generic morph, which skipped the intermediate attachment changes. Newly emerging branches grow their foliage with their length. Preview mode completes a copy of the current trace using legal hints; it does not change the equation. The host is restored visually while the equation stays solved. This inherits the existing rewrite animations’ geometric limits; it is not a biological growth simulation or a collision-free surface guarantee.

Lightning uses a short, mixed-size authored cue added to the existing stochastic storm schedule; the same event generator drives arcs and point-light flashes. The elevated ring has a faint ground-ring contact shadow, not a light-casting volumetric object. Framing makes room during transition sequences and briefly at the new endpoint; ordinary wandering then retains manual zoom behavior. The mature canopy's extra extent is included in the framing allowance.

Validation: TypeScript, full existing automated checks, settings API tests; state-machine tests cover approach, retrigger prevention, pause/manual mode, solve/release/recovery, bounded visual channels, short mixed-size cues and reverse replay of all six suggested moves, intermediate member fields, continuity at operation boundaries, exact planar/spatial endpoints and extension of a partial preview route. In-app browser inspection covered dormant, awakening, early/mid recovery and healthy frames. A real six-drag mouse solution triggered release and reached healthy with `5*x+y` still solved and no browser errors. Body input implementation is retained; this pass did not repeat a full body-only playthrough. Chrome was unavailable through the configured browser surface.

## Expanding shadow release

Release now spins the canopy about its own center, expanding to 3.8× its starting size while rising slightly. Rotation is fastest initially and eases off. Opacity and fringe decrease with expansion; noise erodes the painted patches before the last part of the fade. The wood, sigils and collision geometry do not receive this transform, and the existing skeleton-readability mask is retained. This is a geometric/painterly effect, not a fluid simulation.

**Canopy release** in the encounter panel selects the new effect or the earlier fade-in-place comparison. **Release turns**, **Release expansion**, and **Release seconds** adjust it; they use the existing sequence settings persistence. Release can be paused and scrubbed without accumulating rotation. Both painted patch clouds and procedural billow forms support the motion. The old S1–S3 legacy studies are untouched.


## Continuous unfurling and storm arrival · 8 September

Recovery still reverses the recorded operations in the working plane, followed by the spatial return. **Regrowth flow** now blends linear movement with the earlier per-operation smoothstep: default .8, zero restores the full eased stops. Swap keeps its curved depth excursion. Each move still reaches its exact recorded endpoint; this does not claim continuous velocity through every direction change. The saved eight-second total is retained; **Rewind + spatial return seconds** can shorten it.

Living clusters are built ahead of recovery, with stable host IDs. Their scale and attachment positions ease toward new worker poses, so a newly returned branch does not produce a full-size tuft in one frame. Paused scrubbing lets these followers settle briefly to the selected pose.

Awakening gathers the cloud around the crown with a rising, turning, slightly tumbling transform and temporarily stronger roiling. Erosion clears as it forms. **Awakening turns** controls the rotation; zero removes the broad turn but retains the swell/tumble. The transform reaches identity at the end, leaving the steady shadow settings intact.

Performance: hidden sigils and their associated interaction UI are no longer recreated on every cinematic mesh result. Surface generation rejects samples outside a conservative curved-member capsule before expensive field evaluation. A 40-pose local comparison measured about 13% less field-generation time (67.1 to 58.4 ms average in that Node benchmark); that is not a claim of 13% higher game FPS. Full-box reference tests preserve the surface and adjacent normal samples, including stronger curvature, width, blending and roots. Resolution is unchanged. Browser worker samples during the actual solution/recovery were roughly 18–35 ms; discrete worker updates remain a source of motion stepping even when the rest of the scene renders quickly.

Verified intermediate awakening and regrowth frames, healthy endpoint, the six-drag mouse solution through automatic recovery, audio events, TypeScript and all automated checks. Chrome remained unavailable through the browser integration; the visual/play check used the in-app browser. No new body-only playthrough in this pass.
