# Grow rock boundary 08

Complete the current outcrop approach without redesigning the terrain. Full boundary replaces every old ring rock, all 17 small fragments, and both moving gate rocks. The grassy centre, background terrain/painting, path openings, and shadow setup are retained. Default shading: cel bands.

## Surface treatment

No image textures or normal maps. RockColor vertex colours carry broad, low-contrast mineral colour and five explicitly positioned irregular polygon masks: three moss patches and two muted ochre lichen colonies. No procedural coverage noise, grain or speckling. The existing mesh is simplified to about half the previous triangle count. The source shape family is retained; making the formations part of a more continuous landscape is intentionally left for the next iteration requested by the user.

Source: ../work/rock_08.py
Blender scene: basalt-group.blend
Assets: basalt-group.glb, bedrock.glb, fragment.glb

## Prototype

http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body&rockStudy=1

Full boundary, two-bank comparison, single group and original rocks are available. Cel, crisper and soft shading remain available. Formation and shading controls are disabled until assets are ready; fetch validation/retry remain in place. These smaller assets have no embedded image-decoding dependency.

The full-boundary collision approximation is generated from component bounds; the entrance and both route approaches/exits were checked for clearance. It uses conservative circle primitives consistent with the prototype's navigation. Small decorative stones retain their original nonblocking status. Gate meshes remain children of the original moving gate objects and retain the original gate collision objects. Idle hand targets are updated via grow-rock-touch-points. Earlier comparison layouts restore original obstacles and targets.

Checks: focused TypeScript compile; GLB COLOR_0 presence and no image references; visual check at gameplay scale; route-clearance samples for entrance and both exits. Further playtesting and aesthetic iteration remain appropriate; this does not claim to solve the deeper continuous-landscape concern.

Source directory: /Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/rock-reference-08
