# Art handoff 01 → playable clearing 018

**Current override:** Hover was rejected and is now disabled. 018 now uses a longer foot-path/two-link gait on the existing leg rig, smaller loaded steps and increased rewrite gain. Retiming the original short walk was an intermediate stage and is superseded. Yellow is the default clothing palette, with original/red/cyan/green alternatives. Open Inspect → Appearance → Traveller. See the current 018 README and notes for the grounded revision; the locomotion adaptation described below records the initial integration. Arm-rig and terrain-foot-placement limitations still apply.

Imported source (unchanged GLBs, manifest and source handoff retained alongside this report):
`/Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/avatar-handoff-01/`

## Available now

In 018, Appearance → Traveller selects **Blue wrap**, **Olive cape**, or the **previous figure checkpoint**. Blue starts selected. All gameplay uses one stable controller root, so appearance selection preserves position, selection, expression and undo history. Appearance controls remain disabled during grip/settling and while pinning. Both models are preloaded once; an unavailable model leaves the current figure visible and reports its load error.

The supplied floating hands replace the old hands for both figures. We preserve independent working and reserve controllers, finger/thumb closure, camera clearance, anatomical orientation, hand-over-sigil rendering, and left-hand pins. Their artist-assigned Left/Right names are opposite this game's +Z-facing anatomical convention: the hand at asset-local −X is the working right hand. Its thumb points inward (+X). No asset geometry was mirrored.

Body scale is .72, using the handoff's approximate 2.4-unit body height, yielding approximately 1.73 world units. Hands use .68 with a palm-center correction inside the existing contact controllers. The halo, collision radius and gameplay reach remain the same. Cel body shading follows the source recommendation; hands retain their soft material shading.

The magical ribbon now starts on the actual deformed ordinary right-hand mesh and ends at the imported working hand's wrist. Bone matrices are updated before querying the skinned wrist. Ribbon remains a visual indication of the existing scalar spring, not a tension simulation.

## Locomotion adaptation

The source Walk advances only .36 asset units per second, or .2592 world units/s at this scale. Matching 3.6-unit/s travel literally would require almost 14× playback. We instead crossfade between Idle, slow Walk for stance adjustments, and Hover for fast travel and loaded pulling. Walk playback follows measured displacement and is bounded at 2.5×; travel switches to Hover above .65 units/s and leaves it below .48, avoiding boundary chatter. Pulling keeps facing the tree with a small backward lean. Authored tunic-clearance tracks are retained.

This makes both figures usable with the present inputs, but it changes travel presentation to levitation at speed. It is a provisional adaptation, not a finished grounded gait solution. The old grounded procedural figure remains selectable.

## Asset work still needed

1. **Ordinary arms need shoulder, elbow and wrist bones/weights.** In these GLBs the small arms and hands are skinned to Body, with no independently controllable arm joints. Thus the floating hands grasp, and the body leans, but the ordinary arms do not reach or brace. Add anatomically named arm chains and a pulling/reaching pose (or IK targets). No claim of a full bodily pulling rig.
2. **Grounded travel needs a faster gait and directional motion.** A walk/run at gameplay speeds plus backpedal and strafe clips would restore proper ground-bound movement without frantic cadence or foot sliding. Runtime terrain foot placement is also absent. Hover currently accommodates arbitrary travel direction.
3. **Cloth clearance is authored, not simulated.** Preserve Blue's Tunic.front tracks. New arm poses, more extreme legs, or steep terrain will require new clearance work; no cloth/body collision solver has been added.
4. **Rendering budget:** Blue is 12,152 triangles across 150 mesh primitives; Olive is 13,504 across 156, including both hands. Only the chosen figure is visible. These are modest triangle counts but many draw submissions; consolidate static pieces/materials per animated part before populating a scene with many figures. No crowd or target-device performance benchmark yet.

## Review and validation

- `../../avatar-review.html` uses the same controller/materials/hands/ribbon at portrait scale, with both figures, front/side/back, slow steps, travel, grip and grip-plus-pin views.
- In-scene screenshots: `blue-wrap-{idle,pull,pin}.png` and `olive-cape-{idle,pull,pin}.png`.
- Close-up screenshots: `{blue-wrap,olive-cape}-portrait-{idle,pull,pin}.png`.
- `../../avatar-check.cjs`: actual browser inputs for both variants; stable switching, right-hand grip, tree-facing body pull, reserve pin, ribbon, disabled switching while busy, fallback checkpoint, asset/browser errors.
- `AVATAR=blue-wrap node explorations/018-painted-ground/browser-check.cjs` and equivalent `AVATAR=olive-cape`: full six-operation simplification by actual mouse/body inputs, forgiving identity catches, automatic goal exit and re-entry.
- Type checking, existing controls, hand anatomy and stance/embodiment checks accompany this integration.

A separate existing warning from 2D ScreenGuides was also corrected: explicit bounding sphere prevents Three.js from attempting a 3D bound on XY-only screen geometry. Guide placement/appearance remains in front as requested.

## Procedural run follow-up

Source GLBs remain unchanged. Runtime arm-swing.ts bakes rigid Body-bound arm pieces into shoulder/elbow groups and uses the resulting right wrist for the ribbon. Gait now offers faster running with steady pelvis, brief flight phase and lower head bob; Walk remains the cloth animation layer. Review via ../../avatar-review.html. This does not add full cloth collision or terrain-aware foot planting.
