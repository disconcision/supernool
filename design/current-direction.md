# Current repository: supernool

As of 2026-09-06 the game is named **supernool** and lives in the sibling `supernool` repository. Stable release: 019. Experimental expression and movement work: 020. See `../RELEASES.md` for the boundary. Earlier Nool/Grow names and absolute paths below are historical. The separate art research workspace has not moved.

# Current direction — nool / Grow

Latest user feedback in this conversation takes precedence over earlier concept art.

## Branches (active)

- Hewn means long, thin planar cut faces, bevelled edges and controlled polygonal sections; it is the opposite of lumpy or bumpy.
- Study 007's distance-field hewn implementation does NOT achieve that appearance. Retain it as an experiment, not an accepted visual target. Rounded and hewn modes looking similarly lumpy is a failure to resolve.
- The generated hewn wood concept in 007 is in the right direction, but the user wants a stronger range, including more emphatically polygonal flat faces.
- Work in a concept → explicit mesh → visual comparison loop. Shading alone cannot repair the wrong surface shape.
- Stronger taper between levels is generally preferred. Base thickness should be a tree-type choice. Explore radii derived from the amount of branching rather than unrelated per-member sizes.
- Curvature plus restrained irregularity is promising. Keep semantic structure readable. Both associativity plus correspondences remain candidates; exchange p/q is currently preferred by the user, not a universal rule.

## Plateaus (paused)

- The pillar/stone and exposed clockwork construction in study 008 is NOT the current art direction. It over-indexes on literal mechanical pillars and looks too formal/manufactured.
- Prefer a direction closer to pure landforms. Supports can inform the conceptual account of movement without appearing as bronze pistons or pillars.
- Keep 008 as an optional mechanical variation only. Do not let future sessions or concept prompts treat it as an approved aesthetic bible.
- Leave plateau work aside for now. Any later version must account for vertical displacement, carried descendants, contacts and support transfers.

## Latest technical experiment: 010

Curved strips now smooth internal triangle shading while retaining sharp longitudinal borders. Local shaped junctions and generative/rewrite cases are implemented, but collars, adaptive port pinching and persistent cross-frame strip/UV correspondence are unresolved. Do not treat edge-closure tests as an accepted final deformation or appearance.


## Motion repair experiment: 011

User found 010 animations unacceptable: near-zero branch radii, knotted surfaces, obvious junction segmentation. Prior edge-closure tests missed the problem. The adaptive port radius depended on distances between attachments and collapsed during rewrites. Treat this as a correctness failure, not an artistic variation.

011 replaces port patches with one continuous implicit field per semantic member, then blends members. Subdivision samples do not independently accumulate volume, unlike 007. This removes port-induced collapse and patch seams, but gives up some sharpness. The seven-face concept remains the appearance target; 011 is NOT a newly approved aesthetic. Strong twist can still reveal grid ripples; nearby unrelated branches can fuse. No guarantee of collision-free motion or stable UV/topology.

Retain commutativity, anchored identity, both associativity mappings, level/depth heights, complex carried operands and independent shape controls in future studies. Distributivity remains deferred. Every handoff should include intermediate-frame visual inspection and explicit remaining failures, not just static screenshots or mesh closure tests.


## User checkpoint clarification and study 012

User clarified that 011 has value and is good enough to move forward tentatively. Preserve it unchanged as a usable checkpoint, not a rejected design. Explore sharper hewn alternatives separately. New axis: spatial trees at rest that settle into a working plane on approach. This is an embedding deformation, not a rewrite. Compare both embeddings against the same topology and hewn concept.

Study 012 implements this separate exploration: exact SVG specimen → constrained generated six-frame hewn concept → matched live comparison. Broad faces become much more legible with per-fragment section normals; exposed tips are cut, internal ends blend. Continuous curve evaluation removes the prior piecewise centreline mismatch. Includes studio/cel comparison and additive depth-spread slider. Remaining gaps: ridge continuity across junctions, silhouette waviness, remeshing cost, collisions. The concept is provisional, not user-approved. The shader supports the current examples (up to 40 members), not arbitrary world-scale trees.

Latest motion preference: exchange p/q plus follow-tree-depth is the user's current favorite combination for associativity. Study 012 now also offers retract connector → meet → expand: the pluses coincide before the attachment transfers, avoiding interior sliding attachments. Keep both variants. The user's concern about bulbous protrusions at the sliding connector ends remains open; the optional contraction path is not a fix for those ends. Operand subtrees should not be recursively folded up just to transfer them.


## User feedback and bounded pass 013

The user finds 012 a significant improvement and close to ready to move on. Primary palette includes both face-aware studio and cel; smoother studio/cel trees can also have a place. Preserve all of them. Useful variation axes: thickness, taper, bow and bow irregularity, height/length, moderate twist, varying facet widths and moderate junction blend. Extreme twist and blend are not generally desirable.

013 fixes main height variation being overwritten by layout, gives generated trees different branch planes at successive depths, and makes bow local rather than uniformly world +Z. It preserves 011/012. Same surface approach with optimized field evaluation, 96 default/144 optional, triangle counts, mesh reuse for material/label changes and drawing only when something changes. Equal-input CPU benchmarks show about 24–37% reduction in rebuilding; not a claim of final GPU or forest-scale performance.

Future roots: terrain-following roots through rock cracks, around stones, grounding trees. Ground contact is patched in 013 by overlapping the display ground and trunk; actual roots are NOT implemented. Decide later how roots relate to the rewritten term.

Recommendation after 013: move to a small avatar-driven rocky clearing with a few static/cached trees and one active rewrite. Test approach → working plane → manipulation → spatial relaxation. This is a recommendation, not an implemented scene or authorization to replace current work. Keep junction/ridge quality, collision handling, persistent surface attachments and performance at world scale open.


## Playable clearing: 014

The user authorized a small playable scene with a nontrivial tree, significant simplification, and an openable appearance panel. Study 014 implements this separately and preserves the earlier checkpoints. A 13-node expression `((2*x + 0) + y) + (3*x + 0)` can become `5*x + y` in six local rewrites: swap, regroup, two identities, common-factor extraction (reverse distributivity), arithmetic. These are real typed AST moves with selectable subtrees, not a canned playlist. Undo/redo and a bounded hint search support exploration.

An avatar walks on the clearing, triggers spatial-to-working-plane settling, and selects runes; currently actions are explicit buttons. Two decorative trees are static. Main-tree field sampling/extraction runs in a worker, with coalesced pending requests and transferred trimmed geometry. This improves main-thread responsiveness without eliminating remesh cost. Appearance controls retain hewn/rounded, face-aware studio/cel and smooth alternatives, bow/height/facet variation, taper and spatial spread.

The generic motion policy follows stable node IDs and parent paths. It does NOT yet preserve the full specialized p/q and retract-connector variants from 012/013. Intermediate junctions during regrouping/factoring remain provisional, and there is no collision-free guarantee or persistent surface attachment system. The scene tests selection and progression through a real term. It does not supersede the motion studies or settle those open questions. No save, inventory, terrain roots, player-authored trees or drag-hand controls yet. Future feedback should distinguish algebra/interaction readability from geometry finish.


## Tactile correction and 015

User completed 014's simplification and finds it functionally/aesthetically acceptable, but explicitly objected that the tactile interface and hands were lost. Do not interpret acceptance of 014 as acceptance of menu-driven rewriting. Physical manipulation is central. Lehi needs expressive enlarged hands that move with the interaction; sigils should eventually be compared again against concept art and the separate research task.

015 preserves 014 and implements a mouse/keyboard grip, continuous reversible deformation toward valid destinations, release-to-commit and early-release cancellation. One hand grips, the other automatically braces/receives, with Tab exchanging roles. Swaps, regrouping, identity removal, factoring and arithmetic all have physical contacts. Six mouse drags can complete the challenge. It is constrained path-based direct manipulation, not freeform physics. Independent second-hand placement and the brace's potential role as an actual constraint remain future experiments.

Read the neighboring grow-reference-lab-2026-09-06 concept-v02.md and feedback/hands-response.json. Important direction: expressive oversized tool-hands tempered by magic, slate-like constructed forms, three fingers plus opposed thumb; the gauntlet/weapon reading was overemphasized. 015 uses a provisional short-mantle body informed by the reference lab's avatar blockouts, ordinary arms plus separate enlarged articulated hands. Neither the body nor the small stone-sigil option is a selected final design. The second hand is automatic in this version; do not claim two independently controlled grips.


## 016 — clearer guidance and body pulling

User approves 015’s general direction but asks for less superimposed decoration, continuous hand travel between nodes, rule enable/disable controls matching the original noolbox, a second-hand constraint to reduce ambiguity, and a distinct version of the earlier avatar-driven pulling. Dynamic placement to separate gesture directions, physical rule pickups and multitouch are additional threads to retain. Read `tactile-interaction-roadmap.md` for the full list and status.

016 preserves 015. It implements colored path/point/branch-emphasis variants with spell names beside or strictly above the tree, persistent hand attention with an optional grace-period return, nine rule toggles, and a strict pin preserving a node’s identity, incoming connection and position. Pinning the initial root demonstrably narrows a competing swap/regroup contact to swap. Pins can block a solution until released; they are not a full physical solver.

A separate entry `016-grip-and-ground/?mode=body` starts camera-relative avatar locomotion with a damped spring controlling rewrite progress. Hands remain on the contacts while Lehi pulls. Both mouse and keyboard-only body modes completed the full six-rewrite challenge in browser tests. Spring mass, lag and movement resistance are an experiment in feel, not branch/terrain rigid-body physics. Dynamic layout optimization, physical rule pickups, independently moving pins and simultaneous multitouch remain unimplemented and explicitly recorded.

## 017 — Dependable catch and quieter clearing

Completion now latches at 90% along a plausible gesture; overshoot/lateral drift cannot disqualify a caught move, and retreat below 55% releases the catch. Body spring speed no longer gates commit. Sound cues, individually minimizable white panels and a full clean-view toggle support play and screenshots. Distinct carved operator medallions vs pale seed leaves are a provisional sigil vocabulary. The unnamed avatar replaces the accidental “Lehi” label. A rock/moss/fungi clearing with luminous forked routes replaces hexagonal stepping stones; opening exits is a local cue, not a new level. Keep 016 as checkpoint. Strict rope physics, push/pull tools and the Space-entry control variant remain unimplemented discussion items.

## Isometric backdrop correction

The eye-level sky/horizon matte in 017 was rejected: the elevated view should remain on nearby hills and cliffs and never reach visible sky. The replacement `elevated-uplands-v2.png` fills the frame with terrain. Preserve this camera constraint for future environment art; do not restore a sky merely because the original request called it a sky asset.

## Matte integration review — v2 is also rejected

The terrain-only matte is not accepted merely because it excludes sky. User stopped the revision because it still fails to continue the foreground's perspective. Screenshots inspected from live tabs 36 (narrower, closer interaction view) and 35 (wide default view). Findings: foreground is a shallow orthographic view (default camera elevation ~22°); the generated terrain reads as a steeper oblique aerial view. The painted ground's slope, cliff placement and detail scale do not establish a shared ground surface with the flat clearing. The luminous feather creates a cutout/halo, not continuity. CSS object-fit:cover independently crops the image on viewport changes and it does not follow camera zoom/orbit.

Stop generating independent scenery based only on verbal camera-angle prompts. Next environment work must establish simple surrounding geometry in the actual scene/camera, then use that render plus the foreground as the perspective/composition constraint for painting. If a static matte is used, lock a reference camera and project/register the painting consistently; interactive orbit requires supporting world-space geometry/projection. Judge the joined frame, including ground-plane continuity, scale, lighting and occlusion, before making it the default. Neither backdrop v1 nor v2 is an approved integrated environment. No additional image or rendering edits were made during this review.


## 018 · Camera-guided paint, dimensional signs, goal release

New candidate study, awaiting user reaction. 017 is preserved. Two real-camera blockouts led two built-in imagegen paint-overs, with actual screenshot review after each composite and at zoom/narrow/orbit views. The floor is now continuous projected paint on terrain plus a transparent shadow receiver. One-camera paint still has orbit/coverage limitations; painted-mode zoom-out/pan bounds are intentional and Reset framing is available. Do not describe this as finished 360-degree terrain.

Current default glyphs are real beveled extrusions: ivory freestanding atoms, metal operators in shallow settings. Separate atom backing is an alternate; seed badges remain only a comparison. Goal recognition explicitly matches 5*x+y with both operator orders; successful entry schedules release after mesh settling, permitting Space re-entry. Catch thresholds preserved, with additional actual-input feedback. See 018 notes and the current queue at the top of tactile-interaction-roadmap.md.

### 018 interaction revision

The input diamond and corrective aim line were rejected as busy; completion should follow the visible tree state. Chosen-route progress now catches at 82% without a separate lateral test, with explicit retreat below 55% retained. Ordinary colored guides moved to WebGL beneath sigil geometry/hands. The initial 018 raw-input feedback is historical, not the current desired direction.


### Guide visibility correction

User rejected the behind-sigil guide placement as too hard to see. In 018 the colored paths and destination dots are now back in front (render order 30). Keep the simplified completion behavior and omit the diamond/correction line.

### Pull stance / handedness follow-up

The character should face the tree while pulling, even while moving toward the camera. 018 adds backpedaling/side-step presentation and restrained effort. Anatomical right is the default working hand; the left rests unless explicitly pinned. Correct inward thumbs from front/back, body-oriented hands, two-joint finger curl and thumb closure. Avoid restoring camera-facing hand orientation independent of body, which caused swapped apparent handedness. Existing virtual-cursor/spring mechanics remain; no strict rope model yet.


### Optional ribbon and selection stance in 018

Working hand offset increased camera-left/forward for clearance. Gentle body-mode stance adjustment and elastic ribbon are available in Appearance, with independent Off comparisons. Both are experiments awaiting reaction. Grip immediately disables automatic adjustment and captures its resulting avatar origin. Ribbon conveys existing spring lag, without changing control direction or legal gestures. Existing front-layer direction guides remain: partner highlighting was not adopted as their replacement. Ground movement-vector cues remain a discussion item.

### Art handoff 01 characters in 018

Blue wrap and Olive cape from the reference lab's `avatar-handoff-01` now replace the placeholder via Appearance → Traveller; the placeholder remains a checkpoint comparison. Imported articulated hands use the existing right-working/left-reserve scheme, mapped from local X rather than misleading asset names. Cel bodies and soft hand shading follow the handoff. Both bodies share the same movement/root/interaction state.

Fast travel and pulling provisionally use the authored Hover because Walk is too slow for gameplay speeds; slow stance steps use Walk. This is an integration workaround awaiting reaction, not a decision that all characters must levitate. Ordinary arms lack joints for reach/brace poses. Faster/directional grounded gaits and arm rigging are explicit art followups. Full details: `explorations/018-painted-ground/assets/avatars/INTEGRATION.md`. Do not silently treat these limitations as solved.

### Grounded workshop revision supersedes hover adaptation

User wants walking throughout; Hover is no longer used in 018. Retimed Idle/Walk with restrained pull speed, smaller key-press impulses and more sensitive tree response keep the figure grounded and reduce backward drift. Quicker side shuffles and bounded inward recovery occur only between grips. Yellow raincoat is the new default palette; original/red/cyan/green are selectable. Three developer docks start collapsed. Ghost ribbon stays optional, above sigils and below hands. See the current roadmap and 018 notes for parameters and validation; earlier hover implementation descriptions are historical.

### Longer stride / quieter targets (latest 018)

Retimed short steps were still unnatural. Use the new two-link, long-foot-path gait on the existing rig: straighter support knee, slower cadence, flat-ground stance contact, separate torso lean. Forward/back/side travel remains supported; terrain adaptation and arm rigging are unfinished. Back-of-hood palette exclusion fixed via authored material roles, not mesh-name substrings. UI names are now Wrap traveller and Cape traveller; yellow is default on both.

Body mode defaults to soft colored targets without connecting lines or white rims. Mouse mode keeps paths. Held sigil and brighter ribbon share a cyan glow; hand shifts significantly camera-left. These are current comparisons, not a final decision that body paths have no value. Ground dynamic cast shadows start off, with a comparison toggle; baked paint shadows and self-shadowing remain. Sideways loaded travel is slower; between-contact lateral following was reduced again. Keep mouse interaction maintained alongside body mode.

### Hand clearance correction

The .9-unit camera-left offset was rejected as too detached, especially before grabbing. Reduced to .52 left and .30 down (plus the small anatomical-side adjustment), preserving forward clearance. The hand should slightly overlap the selected sigil and identify it before the grab glow appears. Do not restore the large offset as the preferred direction.

### 018 associativity repair

The exchanging P/Q connector and its incoming support now persist through regrouping. Previously a surviving root junction was treated as a disappearing child edge, displacing its sigil and causing a release snap; bowed attachment paths could also leave the wood. Fixed with explicit connected support/connector correspondence and curved attachment paths. Checked root and nested moves in both directions, 1,200 numerical states and seven actual browser drags. Review/screenshots/tests are indexed in 018/README.md and notes.html. Keep the current guide comparison unchanged until the corrected tree motion is evaluated. User clarified that the temporary torso spin had already resolved; no new torso edits in this repair.

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

### Matte scale correction

User rejected the 55% peripheral enlargement as excessive. Current enlargement is 10% (1.10×), using the same gradual transition around the unchanged central clearing. The earlier 1.55× setting and its screenshots are historical, not the accepted direction.

### Current 018 landscape / movement update

Dirt paths in a new camera-projected matte replace glowing path tubes. Fresh overscan at zoom .58 replaces the temporary peripheral stretch. Native generated output is 1672×941, despite requesting 4K; true high-resolution source remains an art handoff need. Paths/rocks/camera capture, prompt and visual checks are in 018/README.md. Landscape travel now defaults to 3.2 units/s with a procedural running cycle and runtime shoulder/elbow swing; pulls and selection adjustments remain slower. One hand occasionally explores nearby props while idle, returning promptly on movement or tree interaction. Keep both mouse/body modes. Do not describe this as authored production run/cloth animation or exact finger contact IK.

## Matte scale correction after v5 feedback

User rejected v5's blurry, oversized-looking landscape. A same-camera comparison (`assets/matte-scale-compare-v4.png` / `...-v5.png`) confirmed the new generation was coarser/heavier in its landform scale. Its 1672-pixel image had also been spread across a 34% wider world footprint (.58 versus .78 authoring zoom), reducing detail density. Do not treat v5 as the accepted central painting.

Built-in imagegen made a constrained paths-only edit from v4 and a newly rendered rock/path placement guide at the original .78 camera projection. `assets/clearing-dirt-v6.png` (1671×941) and `assets/clearing-dirt-v6-prompt.txt` retain the result and exact prompt. This is the original fine, muted terrain scale with narrow worn paths. No physical tree scale or gameplay camera change was made in this correction.

The central terrain now projects v6 at .78. V5 is confined to an independent outer-margin projection (.58) beyond the central plate, with saturation/tone adjusted toward v6 and a feathered join. The margin does not stretch central details. This is a provisional surround, not a claim that v5 now matches every hill at the seam; a registered high-resolution overscan remains desirable from the art work. Neither image is native 4K.

Inspected corrected normal and wider regrouped views (`assets/matte-scale-corrected-normal.png`, `...-wide.png`). TypeScript and real mouse regroup + undo/slow return framing pass. The framing test now waits for measured convergence instead of assuming a fixed delay always completes a slow zoom.


## Supernool · perimeter mist experiment

User requested a little textured, temporally varying fog beginning around the rock circle. Study 018 now offers a world-anchored, depth-based atmospheric wash with drifting noise and a clear-view toggle, plus density/onset/texture/speed controls. The inner clearing stays clear by default. This is an experiment awaiting feedback, not an approved replacement for the terrain art or a full volumetric atmosphere.


## Supernool · approved simple rocks and surface-art trial

The user approved study 08's simplified rock forms and cel-band shading, while finding the existing moss/lichen colors and texture off. Keep the rock geometry at this simplicity; finer detail may be confined to scattered growth patches. The ordinary 018 route now uses these formations, with integrated Appearance → Surroundings comparisons. A generated transparent moss/lichen atlas is the current surface-art trial, with the original simple patches and bare stone retained. Its provenance is in 018/assets/growth-decals/PROVENANCE.md. Subsequent user feedback found the generated patches too small and color-intense, with motifs that may be too dense; their benefit over the earlier treatment remains unresolved. Distribution, size/count, opacity, saturation and blending controls now support direct comparison, including the earlier settings. Do not treat these decals as accepted final art.

A separate “More enclosing” arrangement raises/steps the same formations inward and adds larger outer bedrock. It is optional and provisional. The approved arrangement remains the default. This is not permission to revive the rejected wholesale landscape replacement; preserve the grass clearing and existing visual scale, and develop any future matte changes in tandem with foreground geometry.


Latest rock feedback: favor scattered placement, with independently adjustable broad moss and smaller lichen colonies. The enclosing arrangement may be preferable, but it must leave both painted rear exits visible and avoid crowding the clearing. Its revised placement keeps the same rock groups/scales while moving the obstructing rear mass to the northwest shoulder and slightly spreading the sides. Separate moss/lichen controls are now the default surface workflow; neither the atlas nor the optional enclosing arrangement should be described as finalized art.
