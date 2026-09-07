# 018 · Painted ground

Open `http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body`.
017 is preserved as the previous playable checkpoint. This study contains a camera-guided matte-painting loop, goal release, dimensional sigils and clearer catch feedback. The terrain is scenery; no new traversal level or rope simulation is implemented.


## Associativity attachment repair

The user reported detached branches and a plus sweeping to the wrong place before snapping back on release. Reproduced a 2.23 / 2.15 world-unit endpoint error on the two root regroupings. The generic transition keyed members by child node ID: when P and Q reversed parenthood, it treated the surviving Q as a retiring branch and overwrote Q's sigil position. For nested regrouping, the incoming support and connector were also interpolated as unrelated members. Straight-chord attachment paths did not match bowed wood.

Regrouping now explicitly retains one P–Q connector and one incoming support. Both junction sigils follow their persistent node positions; transferring attachments follow the connector's actual curved centreline. Incoming support remains attached to the ancestor (or ground for a root rewrite). Curvature blends between endpoint profiles and is bounded by connector length. Internal end-cap detection tests the curved wood volume. The existing exchange-P/Q correspondence is retained; this is not a new rewrite axiom or a change to catch thresholds / guide design.

Validation: `associativity-check.ts` exercises 30 reachable root/nested regroupings, 1,200 sampled frames including endpoint-near states, spatial/planar and zero/high bow. It checks sigils on wood, centreline connectivity, exact endpoint layouts and no final geometry jump. `associativity-browser-check.cjs` performs seven real mouse drags in both directions, with retained quarter/half/three-quarter/final screenshots (`assets/assoc-*.png`). Root and nested midpoint screenshots inspected. The complete six-move mouse/body simplification browser check and existing 738-legal-move/interaction checks pass; TypeScript check passes. This does not promise collision-free intermediate motion or resolve every aesthetic junction shape.

## Painting loop

1. Inspected 017's actual 1280×720 scene. Its independently cropped CSS painting, separate disc floor and feather produced a mismatched projection and circular seam.
2. Built a continuous low-relief terrain mesh around the clearing. Rendered `assets/camera-blockout.png` and `foreground-blockout.png` from the actual orthographic camera, elevated 22.04°.
3. Built-in imagegen painted over that mesh render, using foreground only as style/camera reference. Saved `clearing-paint-v3.png`; inspected `paint-pass-1.png`. Ground join improved, but camera clipping and the finite painting boundary appeared.
4. Moved the orthographic camera backwards along the SAME viewing axis (same image scale/elevation), extended its clipping range, lowered near-side hills, and captured an overscan view at zoom .78. Generated `clearing-paint-v4.png` from `camera-wide-blockout.png`, with v3 as style reference.
5. Projected v4 onto terrain using UVs derived from the fixed authoring camera. Replaced the opaque circular floor with a shadow receiver. Painting and foreground now share one world projection. The matte does not independently cover-crop on resize.
6. Inspected normal, zoomed, narrow, zoom-out and moderate orbit screenshots. Zoom-out exposed the finite painted patch; painted mode now limits zoom-out to .9 at 16:9 (adjusting for wider viewports), disables panning and offers Reset framing. Blockout/studio modes retain wider camera freedom. Orbit remains available for inspection.

This is one-camera projected paint on coarse terrain, not fully textured 360° scenery. Large orbits can expose painted details that do not match the coarse mesh, or uncovered regions; these need additional projections or ordinary terrain materials later. Light in the painting is baked. Surrounding terrain adds one static 32,768-triangle mesh, independent of tree remeshing. We did not claim an FPS benchmark.

Both full prompts are retained beside the images. Generated using the built-in imagegen tool, not CLI/API fallback. The previous sky and elevated v2 remain in 017; neither is an accepted perspective reference.

## Goal / interaction

The encounter's goal predicate now explicitly matches `5*x + y`, allowing either order at both + and ×. It does not infer correctness from a few numeric evaluations. Other levels can supply other predicates.

A committed rewrite entering that goal schedules a release: hands finish the settling motion, then body control returns to walking, held movement clears, and pins/hover/route attention clear. Space can immediately re-enter if in reach; the solved tree does not eject you every frame. The existing approach-ring session lock stays intact for unfinished trees.

After the user's follow-up, completion now uses the same one-dimensional motion coordinate as the chosen rewrite. At 82% it settles toward the finished pose; lateral offset cannot independently reject it. Retreat below 55% reverses the catch. Pure sideways movement does not advance a route; route selection/ranking and return-to-source behavior are retained. This is a guided rewrite gesture, not a collision-based comparison of arbitrary meshes.

The diamond, corrective connector, raw-progress fill and hot/cold text were removed. Ordinary colored paths and slightly larger destination points now render as a single batched WebGL mesh (order 30), in front of the sigils and hands. The behind-sigil variation was rejected as too hard to see. Hidden SVG retains coordinates for inspection and browser tests, without drawing over the scene. Only a short readiness cue remains off-tree. This also honors screenshot clean view.

Zoom still affects required body travel because it maps to 85 screen pixels per world unit while projected route lengths grow with zoom. There is no longer a separate 30–60 px completion corridor to align with. Zoom normalization remains a future mechanics comparison.

## Sigils

Default atoms are freestanding beveled/extruded ivory glyphs with dark sides; operators have warm metal glyphs on shallow twelve-sided bronze/green settings with raised rims. Glyphs are hand-authored vector shapes extruded in Three.js, not textured sprites. Slight yaw exposes depth while preserving camera-facing readability. Layered mode gives atoms their own separate backing. Previous badges remain a comparison option. Hands still render over sigils. Ray targets are separate transparent planes, so holes in glyphs do not make selection fiddly.

This glyph set covers the current arithmetic symbols, x/y and digits; it is not a complete math font. Cached geometry is reused across pose updates, and per-instance materials are disposed.

## Verification

- `controls-check.cjs`: actual keyboard/release/final-settle handlers, persistent outside-ring session, goal release after settling, re-entry and no repeated ejection.
- `check.ts` / `check-results.txt`: six-step route, 738 legal rewrites, finite poses, gesture mappings, rule pins, directional navigation, spring/catch tests, four commuted goal forms.
- `browser-check.cjs`: real browser input completes five mouse gestures and the final body pull; verifies automatic walking state, Space re-entry and no page errors. Both identity eliminations are explicitly tested at 84% progress with 100px lateral offset. Captures raised/layered glyphs, quiet catch UI, goal, zoom and narrow viewport.
- `view-check.cjs`: normal zoom-out boundary and moderate orbit inspection.
- Focused TypeScript check for scene and worker passed.

Open `notes.html` for the visual review. The project-wide pending list is `design/tactile-interaction-roadmap.md`.

## Pull stance and anatomical hands

The character faces local +Z, so anatomical right is local −X (hand index0). Thumbs point inward in body coordinates. Both idle and working hand orientation now follow the body rather than always billboarding to the camera. Working contact offset follows the body's projected side. Right hand is the fixed default; the left remains available for an explicit pin. The old Tab hand-swap shortcut was removed for this comparison.

While a body grip or its settle animation is active, heading faces the tree independent of walking direction. Pulling uses a shorter gait, a small backward torso lean, a raised working arm, a two-joint finger curl and thumb closure. Pull speed is 2.5 world units/s vs ordinary 3.6, reduced further by rewrite lag; acceleration eases at rate6 vs walking9. These are restrained movement/pose cues, not a new rope physics model. Cancellation and ordinary walking restore the regular gait and facing behavior.

Current control chain: ground displacement since grip → camera-relative right/forward components → hidden cursor (85px/unit) → scalar progress on chosen rewrite path → damped spring → generated tree pose. The latch at82% / retreat55% and legal rewrite rules remain unchanged. No rope length, slack, tension, collision, or angle-dependent mechanical advantage is computed. A real tension-only model would make character-to-hand placement constrain which motions are possible. An elastic magical tether could preserve current reach while making exertion visible; neither is selected yet.

`hand-check.cjs` verifies anatomical sides/thumb direction from front and back and the working vs reserve grasp. `pull-pose-check.cjs` uses real Space/arrow input to check tree-facing backpedaling, right-hand default and cancellation, saving `hands-front.png` and `hands-backpedal.png`.


## Selection stance and elastic-ribbon experiment

Appearance now has two independent comparisons: Selection stance → Gentle adjustment / Stay put; Body link → Elastic ribbon / Off. Both experiments start enabled. Existing directional guides remain in front; semantic-partner highlighting was not introduced.

The working hand moved .18 world units camera-left, .02 down and .20 toward the camera for clearance. Anatomical right/left orientation remains body-relative.

Idle body-mode hand navigation can trigger a slow lateral adjustment after 300ms on a contact. It follows 24% of the contact's lateral shift, capped at .8 units from the current browsing-session stance, with a .12-unit dead zone and speed ceiling .42 units/s. Strength fades between 3 and 8 units from the tree. Obstacles stop adjustment; it does not plan paths. Pins, explicit movement, leaving hand mode, gripping and settling disable it. Grip captures the adjusted avatar position and clears movement before any pull: auto positioning never contributes to rewrite progress. After a pull, the next browsing session starts from the new position. This first stance comparison is for body-mode contact navigation.

The optional ribbon connects the ordinary right hand to the floating working hand's wrist. It bows slightly at rest, narrows/straightens with rewrite-spring lag, and fades after release. One dynamic 72-triangle strip, with no geometry rebuilding, collisions or input to the gesture solver. It is a magical visual link over the existing mechanics, not world-space rope forces; Off changes only the visualization. `stance.ts` and `ribbon.ts` keep the behavior separate from rewrite rules.

Verification: `stance-check.cjs` covers delay, cap/speed, distance fade, obstacle stop and immediate disable. `embodiment-check.cjs` uses actual keyboard selection/grip input: observed .27-unit step, adjusted grip origin, no continued automatic motion or rewrite advancement while gripping, ribbon fade and both Off comparisons. `pull-pose-check.cjs` verifies tree-facing body pulling. `elastic-ribbon.png` is the live screenshot.

Future directional-ground-guide proposal: show action vectors around the character's grip-start location, using the inverse of the existing 85px/unit mapping. For a screen vector (dx,dy), ground displacement is right*(dx/85) − forward*(dy/85). Keep this origin and mapping fixed during a grip. These would be movement guides, not physical node shadows. No ground guides or partner glow implemented yet.

## Art figures · initial handoff integration (superseded by grounded revision below)

Appearance → Traveller now offers Blue wrap, Olive cape, and the previous procedural figure checkpoint. Both imported bodies and both articulated floating hands participate in the existing interaction. See [integration report](assets/avatars/INTEGRATION.md) for provenance, locomotion adaptation and rig limitations. [Close-up rig review](avatar-review.html) uses the same implementation.

Slow positioning uses Walk; faster travel and pulling use Hover because the authored walk is far slower than the controller. The ordinary arms lack shoulder/elbow bones, so a full reaching/bracing pose still needs asset work. Body facing, lean, floating grips/pins and ribbon attachment are operational. Both appearance choices preserve the same gameplay state.

## Current: grounded workshop, palettes and corner docks

All movement now uses Idle/Walk, retimed up to 6× rather than Hover. Travel speed 1.45 units/s, loaded speed at most .8; the initial arrow impulse is also reduced. Reverse walk playback handles backsteps; lateral leg sway approximates side shuffling. Proper terrain foot planting, arm reach joints and authored directional clips remain future work.

Pull gain is now 220px/unit (Inspect → Appearance → Interaction), captured when the grip starts. Same rewrite requires ~39% of the former travel. Stronger stance adjustment also recovers inward beyond a 3.5-unit working distance, only between grips, with collision checks. The full body-only six-rewrite test remained 2.50–3.30 units from the tree.

Inspect → Appearance → Traveller selects original/yellow/red/cyan/green palettes on either art body. Yellow raincoat is default. Skin, hair, boots and magical hands retain their colors. Ribbon is thinner and ghostly, with spatial/temporal opacity variation and gentle pulses; it renders above glyphs and below hands and can be switched off.

Three collapsed corner docks replace independently appearing cards. Encounter: controls, expression, help. Rewrite: selection and Noolbox tabs. Inspect: grouped appearance controls and Stats. Stats shows 120-frame rolling frame rate/times, p95, renderer draw counts and resources plus mesh-worker rebuild time. No GPU timing or memory-byte claims. Backslash hides/restores everything; the Encounter dock also has the screenshot button. On narrow windows, opening a dock closes the others.

Validation for this revision: TypeScript check; controls-check.cjs; stance-check.cjs; grounded-check.cjs (real input and dock geometry at 1440×1000 and 640×800); browser-check.cjs (mixed mouse/body complete route); `BODY_ALL=1 AVATAR=olive-cape node explorations/018-painted-ground/browser-check.cjs` (six body-only operations and bounded working distance). Older HUD-specific browser scripts document prior rounds and need the new dock-opening steps before reuse.

## Current: longer stride and clearer contacts

The previous accelerated short walk is superseded by `gait.ts`: a two-link foot-path solver on the supplied leg skeleton. Normal travel uses a .44-asset-unit half-stride and 60% stance, approximately 1.37 cycles/s at 1.45 world units/s (about half the previous cadence). The stance ankle stays at its original .18 asset-unit height; pelvis height follows leg reach with a small knee bend. Swing clearance is .09 asset units. Loaded steps use shorter .28 half-strides and .065 clearance. Body lean affects the torso, not the feet. Previous additive torso/tunic corrections are restored before mixer evaluation so constant animation tracks cannot accumulate offsets. Authored cloth motion remains, with added front-panel clearance; this is not terrain-aware gait or collision cloth.

Body pull movement is 40% slower along camera-right/left, while forward/back travel retains its previous ceiling. Idle contact shuffling also settles down to .65 units/s, 42% lateral following and a 1.1-unit cap. The 220px/unit rewrite gain and inward recovery remain.

Working-hand screen-space offset is now approximately .52 units left, .30 down and .8 toward the camera (reduced after the .9-left version proved too detached), retaining anatomical wrist orientation. Body mode defaults to borderless colored targets with a soft tinted halo; mouse mode defaults to connecting paths and targets. Rewrite → Guide variations retains explicit comparisons. The held sigil gets a cyan emissive face/halo matching a brighter, soft-edged ribbon. The halo does not intercept mouse picking and is drawn only for the active contact. This is a visual glow, not terrain illumination or full-screen bloom.

Ground cast shadows now start Off, with an On comparison in Inspect → Surroundings. This disables shadow reception on the clearing floor and terrain blockout; it does not remove baked painting shadows or object self-shadowing. The painting shader already has its own lighting baked in, so a general lighting redesign remains separate work.

Palette roles now follow authored main-fabric/lining/seam materials. This fixes the hood's garment connection, which the previous mesh-name exclusion accidentally matched as “arm.” UI names are Wrap traveller and Cape traveller; underlying asset filenames stay unchanged. Both start yellow.

Validation additions: gait-check.cjs (lengths, finite poses, stance contact, forward/back/lateral directions, lower cadence and non-accumulating lean); clarity-check.cjs (body targets, no white outlines, mouse paths, stationary grip, ground shadow comparison, browser/shader errors). Side-view stride frames are saved as assets/stride-side-{0,1,2}.png. Full mouse/body and body-only rewrite routes are retained checks.

### Larger encounter tree

The main playable tree is now uniformly scaled to 1.35× (35% wider, taller and deeper, including branch thickness and sigils). World-space shading, hand contacts, navigation and gesture guides use the same scale. This scales the existing mesh without increasing its triangle count. Terrain, character and background trees retain their scale.

### Additional tree scale and automatic framing

Tree scale is now 1.35 × 1.15 = 1.5525 relative to the original 018 tree. A continuous outward camera fit tracks projected members and sigils, with a screen margin, and anticipates a chosen rewrite's endpoint. It uses actual projected points rather than empty world-box corners. It retains the wider framing after simplification instead of automatically zooming back in; Reset framing remains available. The automatic fit can relax the painting's old minimum zoom to keep taller/deeper trees visible. Very wide views may expose the existing finite matte paint boundary; extending that artwork is still separate work.

Grip routes are captured when grabbing. Body pull uses those fixed coordinates, so camera zoom does not manufacture gesture progress or change the body movement needed to complete a grip. Mouse cursor coordinates are mapped back to that captured zoom while displayed guides follow the live camera. No extra tree triangles are created by scaling.

Verification: framing-check.cjs checks smooth outward motion on a narrow viewport, final fit and zero passive progress for a stationary body grip; associativity-browser-check.cjs follows live projected mouse targets through seven root/nested rewrites. TypeScript passes. Screenshots: assets/tree-auto-frame.png and assets/tree-auto-frame-narrow.png.

### Slow returning frame and temporary matte enlargement

Latest preference supersedes the outward-only camera: framing now eases both out and back in, capped at the initial/user-selected zoom. Outward response is 0.7/s and inward 0.45/s (roughly 4.3 and 6.7 seconds for 95% of a fixed adjustment), with a small deadband. Wheel zoom updates the preferred zoom; orbiting alone does not. Reset framing restores preference 1. The fixed body-grip coordinate mapping remains intact.

The existing matte is enlarged to 1.55× around its periphery via shader UV scaling, gradually applied between world radii 8 and 32. Its central clearing stays registered with foreground objects. This is a temporary stretch with visible texture distortion in the transition, not new painted content or a replacement for the art task's work. No extra triangles or texture files.

TypeScript and framing-return-check.cjs pass. A real mouse regroup expanded the tree and eased zoom from 0.844 to 0.697; undo returned it gradually to 0.841. Inspected assets/matte-expanded-wide.png and assets/matte-expanded-return.png: painting covers both tested framings, including the previously exposed border. Extreme orbit/zoom still exceeds a single projected painting's remit.

### Contact glow and smaller tree

Latest size adjustment is 8% smaller: scale 1.35 × 1.15 × .92 = 1.4283 of the original 018 tree. Body-mode selected contact and mouse-mode hovered contact now receive the same cyan emissive/aura treatment as grabbing, at about one-sixth the strength (.14/.13 versus .85/.8). It clears off-contact and gives way to the full held glow during gripping/settling.

User proposed ghostly destination sigils as an alternative to dots. Discussion direction: optional faint, rule-colored glyph outlines without opaque backplates; keep dots available for comparison. Ghosts could clarify swaps/regroups, but crowded destinations and operations where a glyph disappears need care. This remains a proposed comparison, not an implemented/default replacement.

### Matte scale correction

User rejected the 55% peripheral enlargement as excessive. Current enlargement is 10% (1.10×), using the same gradual transition around the unchanged central clearing. The earlier 1.55× setting and its screenshots are historical, not the accepted direction.

## Dirt paths, running and curious hands

### Painting / route authoring

The light-path tubes are removed. Dirt routes were plotted against actual stone footprints (including small stones and gates) with a clearance margin, then rendered with placement colors from the same fixed orthographic camera as a terrain-only reference. `matte-authoring.html` / `.ts` retain the capture setup. `dirt-routes.ts` computes paths only when the authoring getter is requested, not during normal gameplay startup.

Built-in imagegen edited the terrain-only plate using the rock/path render as a placement guide. The result is `assets/clearing-dirt-v5.png`; exact prompt in `assets/clearing-dirt-v5-prompt.txt`. Both 3840×2160 reference renders are retained. The output requested 4K, but the tool returned **1672×941**; it is not a native 4K asset and has not been upscaled to imply otherwise. The new plate has more freshly painted detail and full surrounding terrain, but a higher-resolution art source is still desirable for close zooms. The projection uses authoring zoom .58, covering about 34% more width/height than the old .78 plate. The temporary peripheral UV stretch is removed. Existing v4 remains on disk.

Inspected the result in the actual scene, including the paths against foreground rocks. The approach passes through the front gap; the exits wind through the back gaps before branching farther into the hills. Paths are baked scenery, not a navigation mesh or new traversable level. Screenshots: `assets/dirt-paths-live.png`, `assets/idle-hand-landscape.png`.

### Movement

Unloaded landscape travel is now 3.2 world units/s (previously 1.45). Running is the default; Space retains its existing tree-control role. Loaded pulls stay at the existing lower speed, and automatic positioning remains a small walk.

The existing figure rigs now use a procedural run above speed 2: longer alternating foot paths, a 42% support fraction with a brief flight phase, more swing-foot clearance, a slight forward lean, and restrained torso bounce. Pelvis height no longer rides up/down to force nearly straight support knees every half-cycle. Steady running torso excursion is .036 asset units (~.026 world units). A real run cycle can be implemented on these rigs without a Blender edit; it remains a procedural prototype, not a polished authored animation.

The handoff's ordinary arms were rigidly bound to Body. Their rigid mesh pieces are now baked into runtime shoulder/elbow groups, providing counter-swing and bent elbows. Torso/leg skin and source GLBs remain intact. The ribbon anchors to the resulting moving right wrist. Authored cloth motion remains; full cloth collision, terrain foot IK, polished directional starts/stops and advanced arm posing remain future work. `avatar-review.html` exposes the same run for both figures; `assets/run-*.png` retain sampled side poses and working-grip checks.

### Idle hands

After ~3.5 idle seconds, one hand occasionally inspects a nearby rock/mushroom target within 2.8 world units, for up to 4.5 seconds. It approaches slowly, tilts downward and lightly curls its fingers. Targets come from the scene's real prop placements; only one hand explores at once. Moving, selecting a tree contact, gripping or pinning cancels this behavior immediately; moving hands return to escort position with a quicker response. This is a simple proximity/contact animation, not collision-aware hand pathfinding or exact fingertip IK.

Validation: TypeScript, gait/leg-length checks, bounded torso lean, a measured low-bounce run with flight phase, hand anatomy checks, both figures' actual run/pull screenshots, a real landscape run + idle inspection + movement cancellation, and the full six-rewrite mouse/body simplification pass. `run-review-check.cjs`, `idle-exploration-check.cjs`, `gait-check.cjs`, and `browser-check.cjs` retain the checks.

## Matte scale correction after v5 feedback

User rejected v5's blurry, oversized-looking landscape. A same-camera comparison (`assets/matte-scale-compare-v4.png` / `...-v5.png`) confirmed the new generation was coarser/heavier in its landform scale. Its 1672-pixel image had also been spread across a 34% wider world footprint (.58 versus .78 authoring zoom), reducing detail density. Do not treat v5 as the accepted central painting.

Built-in imagegen made a constrained paths-only edit from v4 and a newly rendered rock/path placement guide at the original .78 camera projection. `assets/clearing-dirt-v6.png` (1671×941) and `assets/clearing-dirt-v6-prompt.txt` retain the result and exact prompt. This is the original fine, muted terrain scale with narrow worn paths. No physical tree scale or gameplay camera change was made in this correction.

The central terrain now projects v6 at .78. V5 is confined to an independent outer-margin projection (.58) beyond the central plate, with saturation/tone adjusted toward v6 and a feathered join. The margin does not stretch central details. This is a provisional surround, not a claim that v5 now matches every hill at the seam; a registered high-resolution overscan remains desirable from the art work. Neither image is native 4K.

Inspected corrected normal and wider regrouped views (`assets/matte-scale-corrected-normal.png`, `...-wide.png`). TypeScript and real mouse regroup + undo/slow return framing pass. The framing test now waits for measured convergence instead of assuming a fixed delay always completes a slow zoom.

## Corner symbol library

`symbols.html` previews twelve original SVG marks and assigns them to the three docks. Defaults: Encounter → `parting`, Rewrite → `root`, Inspect → `strata`; nine other marks remain available. `symbols.ts` is the shared source. Choices persist under `grow-018-dock-symbols` in localStorage; the storage event updates open scene tabs. Restore defaults is available on the sheet. The library is linked from Appearance and the study notes.

Checked opening/closing all docks by their accessible names, live cross-tab reassignment/reset, twelve gallery entries, and desktop/mobile screenshots. TypeScript check passed; no browser runtime errors. Header now has larger ivory lettering and a shadow for terrain contrast; subtitle removed. No iteration promotion.

Title refinement: lighter Avenir/system sans lettering in muted lichen gray; NOOL / GROW remains brighter. Rootwork replaces Graft as the lower-right default (previous saved Graft default migrated once; all library options remain selectable).

## Perimeter mist experiment

Inspect → Appearance → Surroundings includes a clear/mist comparison plus amount, onset radius, texture and drift controls. Default onset is 10.5 world units from the clearing's center, close to the boulder perimeter. A broad feathered envelope leaves the inner working area clear. Two scales of world-anchored procedural noise drift slowly through the outer landscape; zero drift freezes the pattern and zero texture yields an even fade. Plain studio and matte authoring captures bypass the effect.

`mist.ts` reconstructs surface positions from the scene's depth texture and applies an atmospheric color wash. This preserves the foreground silhouette while misting the terrain behind it. It is a surface-depth approximation, not integrated volumetric scattering: no light shafts, self-shadowed clouds or visible fog volumes. One full-resolution multisampled render target and one compositing draw are added; clear mode bypasses the pass. Target allocation follows drawing-buffer size and is reused. The GPU memory cost scales with viewport resolution. Render statistics count both passes.

Inspected normal, later-time, orbit and active-grip screenshots (`assets/mist-*.png`). At 1440×900 on this machine the static comparison measured 60 fps with and without mist (16.7 ms average; p95 16.8 vs 16.7 ms), and 1,016 vs 1,015 draws. These are browser frame timings, not GPU timings or a guarantee for other devices. TypeScript/build and the full six-rewrite mouse/body playthrough passed without browser errors. This is a provisional visual option, not an accepted permanent atmosphere direction.


## Approved rock formations and generated growth · 7 September 2026

The user's approved study 08 rock geometry now loads on the ordinary playable route, without `rockStudy=1`. The old study URL still works. Controls live under **Inspect → Appearance → Surroundings**: Rocks, Rock shading, and Moss & lichen. Default: approved formations, cel bands, generated patches. The original rocks, two-bank/single-group comparisons, soft/crisper shading, simple painted growth, and bare stone remain available.

The three unchanged GLBs in `assets/rock-study-08/` remain the source geometry. Broad mineral vertex colors are retained; the generated-patch mode removes the old growth tint and projects sparse alpha decals onto selected ledges and crowns. Most stone stays bare. Patches have varied size, rotation, silhouette and local placement; there is no all-over noise or added rock bump map. Small loose stones stay bare in this mode. The six-cell atlas is a new, unapproved surface-art exploration: `assets/growth-decals/growth-atlas-v1.png`, generated with built-in OpenAI imagegen. The unchanged original, dimensions, method and exact prompt are documented in `assets/growth-decals/PROVENANCE.md`.

**More enclosing · comparison** is an optional composition, also directly selectable with `?mode=body&rockLayout=enclosed`. It uses the same rock family, brings the side banks inward, raises their crests and extends broader low beds outside the clearing. It does not replace the approved default, remodel the central ground, or repaint the backdrop. The original three route throats and moving gate rocks are retained; formation collision footprints and idle-hand contacts switch with the arrangement. This is a first composition comparison, not a completed impassable level boundary or a newly registered matte painting. Further enclosing terrain and a corresponding matte edit should follow visual feedback.

Atlas failure falls back to simple painted growth while keeping the improved rocks. Model failure retains the original scene, reports the error and offers Retry; a retry replaces the scene's rock/collision/touch state after successful loading. All assets use Vite-discoverable project-local URLs; the art lab server is no longer a runtime dependency.

Validation: `npm run check`, `npm test`, `npm run build`, `npm run test:browser`, and `node explorations/018-painted-ground/rock-check.cjs` pass. The latter exercises the ordinary route, dock controls, all shading/growth options, texture failure and model retry in Chrome. The existing six-rewrite body-only browser check also passed against `rockLayout=enclosed` (a temporary copy of the same check with that URL and screenshot output redirected to `.cache/rock-review/`). Inspected default, enclosing, closer-camera and intermediate rewrite screenshots in `assets/rock-integration/`. These captures include the separate task's current mist experiment; this change does not alter it.


### Adjustable moss / lichen placement

User feedback: generated patches are too small and color-intense, and their dense botanical motifs may not improve on the prior treatment. The atlas remains a comparison asset, not accepted final art. Under **Surroundings → Adjust generated patches**, distribution now offers chosen sites, surface scatter, or clusters near the chosen sites. Size, count, spread/spacing, small-patch bias and seed control placement. Normal/multiply blending, opacity, saturation and brightness control the shared material. Reshuffle changes the seed; presets provide Larger & softer, Speckled mix, and Earlier decals. Settings persist locally under `supernool-rock-growth-v1`.

The starting preset uses 1.65× size, 70% opacity and 55% saturation. Scatter and cluster modes sample diameters between .16 and 1.6 world units before size scaling. At bias 1 the diameter distribution is log-uniform (density proportional to 1/diameter); larger bias favors small flecks. Surface candidates are downward raycasts, filtered to upward/sloping faces; scatter uses minimum spacing, while cluster spread offsets chosen anchors. This is a simple top-surface placement tool, not ecological growth simulation or unrestricted manual painting. The six atlas motifs themselves are unchanged; smaller/sparser source motifs could still be worthwhile after trying these controls.

Material adjustments retain patch positions. Geometry adjustments are briefly debounced, rebuild deterministic placements, and dispose replaced decal geometry. The alpha cutout is independent of opacity so fading does not erode silhouettes. Multiply fades toward neutral white before destination multiplication; it darkens the stone and is unsuitable for bright lichen. Highly oblique decal triangles are excluded to avoid stretched stripes around sharp corners. TypeScript, core tests, Chrome controls/persistence/failure checks, and the full six-step mouse/body browser playthrough passed. Screenshots in `.cache/growth-controls/` include control layout, normal/multiply/scatter views and intermediate rewrites.


### Separate moss / lichen and clear rear trails

Latest preference favors scattered growth, broader moss areas and smaller lichen colonies. **Adjust moss & lichen** now contains separate Moss and Lichen groups, each with its own distribution, size, count, spacing, bias, seed, opacity, saturation, brightness and blending. Each layer uses only its corresponding three atlas cells and has independent materials, deterministic placement and geometry rebuilds. Both default to scatter; moss starts at 2.3× size with a broader size distribution (bias .6), and lichen at .85× with more small colonies (bias 1.2). Reset and reshuffle act on one layer. The new `supernool-rock-growth-v2` record stores the two groups; old shared color/blending preferences migrate, while the new scattered distribution and separate sizes take precedence over old placement defaults.

The enclosing comparison retains all 14 groups and their scales. Its obstructing rear crest moves to the northwest shoulder; lower beds move away from the painted junction, and the side/front banks ease outward slightly. Positions are in `rock-enclosure.ts`; the open arrangement remains available. Both rear painted trails now have clear sightlines. The matte painting is unchanged. These are scenery clearance changes; the existing puzzle-controlled gate behavior remains.

`rock-path-check.mjs` traces both routes from the existing v6 image, intersects the actual backdrop ground, and checks all enclosing GLB meshes against 486 route/corridor samples. It verifies paint-camera and live-camera sightlines plus vertical ground clearance. `rock-check.cjs` verifies independent layer counts/settings, one-layer removal, persistence and loading recovery. TypeScript, core tests and the enclosing scene's full mouse/body playthrough pass. The source atlas is still provisional; controls separate its moss and lichen rows, without repainting motifs inside those cells.


### Scene editor selection and transforms · isolated editor branch

On port 3101, Inspect → Scene → Edit scenery now uses a one-pixel visible-silhouette outline and a combined move / yaw / proportional-size widget. Green Y is height; red X and blue Z are ground directions. The outer arc turns, and the cream square scales. Q restores all handles; W/E/R isolate a tool. Handles render above atmosphere, and picking respects opaque occlusion.

The object list separates formations, 17 loose stones, and 36 individual mushrooms (cap + stem). Attached formation fragments remain grouped. Puzzle gates, tree, avatar and painted terrain stay gameplay-owned. Prop transforms participate in undo/redo and scene saves; old formation-only saves load with props at their authored defaults. Formation collisions, projected growth and prop hand-contact points refresh after edits. This remains work on `codex/scene-editor`, not a change to the other task’s main checkout.


### Scenery copy / paste

The isolated scene editor now exposes Copy, Paste and Duplicate below the object selector, with Cmd/Ctrl+C, V and D shortcuts while editing scenery. Pasted objects are selected and offset one unit on each ground axis per successive paste, ready for placement. Copy captures the current transform; later edits to the original do not change the clipboard. Text inputs keep their normal clipboard behavior.

The scenery clipboard persists in browser storage across reload and works between scenes on the same editor origin. It is separate from the OS text clipboard. Copied formations, loose stones and mushrooms participate in undo/redo, saved versions and defaults. Formation copies share geometry/shading assets, retain the source growth pattern seed, and have independent projected growth, collision footprints and hand contacts. Copies of copies store the original asset reference, and earlier saves remain readable. `npm run test:clipboard` exercises these paths in Chrome.
