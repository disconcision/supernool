# Grow avatar handoff 01

Stable source directory:
`/Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/avatar-handoff-01/`

## For the prototype task

Import `blue-wrap.glb` and `olive-cape.glb` from this directory into the prototype's served assets directory. Both are candidates for replacing the placeholder avatar; offer an appearance choice if practical. Keep the existing mechanics, collision controller, body pull/settle state, and interaction-driven hand targeting. Prototype integration has not been performed here; Andrew can point the task to this file.

Files:
- `blue-wrap.glb`: asymmetric three-fold blue tunic; lower panels have a motion-driven clearance bone.
- `olive-cape.glb`: olive outer cape plus inner cloak, gathered trousers and relaxed hover.
- `couriers-handoff-01.blend`: both editable scenes and basic rigs.
- `asset-manifest.json`: filenames, hashes, orientation, clip names and sizes.
- Preview: http://127.0.0.1:3148/avatar-handoff-01/

Earlier models remain available under `blender-study/`, `blender-variations/`, `blender-tailoring/`, and `blender-coherence/`; do not fetch those by accident.

## Coordinate and animation contract

GLTF: Y up, character faces +Z. Body height is approximately 2.4 units. Normalize by body height, not by the bounding box that includes hovering hands. Origin is at the feet in the rest pose. The Hover clip supplies vertical lift.

Clips: `Idle`, `Walk`, `Hover`, each about two seconds at authored cadence. Use Three.js GLTFLoader and an AnimationMixer. Crossfade between locomotion clips; do not run all three at full weight simultaneously. Use SkeletonUtils.clone for multiple independent instances.

Walk is forward relative to +Z: during stance each foot moves front-to-back in character-local coordinates; the bent-knee swing returns back-to-front. The ankle trajectory is baked from a two-link leg solve. It is an in-place clip: the game controls world translation. The authored stance covers 0.36 asset units in one second, so scale playback to movement speed (speed / (0.36 * avatarScale) for the authored full walk). If the prototype's present speed makes this unreasonably fast, adjust stride/cadence or create a run clip rather than reversing the walk. No runtime terrain adaptation or foot planting against a moving root is included.

Hover: thighs hang almost vertically; knees bend gently back; feet point down. This supersedes the more crouched hover in the previous round.

Blue's `Tunic.front` bone is animated with locomotion to move the front folds away from the leading thigh. Preserve its tracks when replacing or combining animation. This is a simple authored clearance response, not collision cloth; substantially different leg poses may need additional adjustments.

## Shading and hands

Preferred figure material: cel bands (`MeshToonMaterial`), applied after GLTF loading. Large hands retain their PBR materials for soft shading, or use a cloned material with `flatShading = true`. The GLBs do not bake the cel shader. `viewer.js` demonstrates separate figure and hand shading.

Locate each hovering-hand hierarchy by a node name containing `hovering_HAND` after Three.js sanitizes spaces. Descendant digit joints remain independently transformable. The current rest pose is a starting point; the prototype should keep its working/reserve hand poses and existing grasp controller. Reparent hand roots with world transforms preserved if the controller needs scene-space positioning. Read anatomical left/right from the character, not from the screen: the prototype's current +Z-facing convention has anatomical right on local -X. Do not infer handedness solely from older artist-assigned node labels; validate thumb direction and remap as needed.

## Checks and practical limits

Both GLBs load with one skin and Idle/Walk/Hover clips. Browser review covered the relaxed hover from the side, downward toes, Blue's folds during walking, and the cel figure/PBR hand mix. `gait-validation.json` records actual Blender foot-bone positions across the walk. Geometry remains a stylized prototype asset; gait, cloth clearance and contact poses should be checked under the prototype camera and actual controller speeds.

No prototype code was modified during this handoff. The latest inspected scene was `018-painted-ground`, with the other task idle and no 019 directory present at inspection time.
