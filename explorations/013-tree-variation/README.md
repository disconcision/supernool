# 013 — Tree variation and rendering cost

A bounded improvement pass after 012. Preserve 011 and 012 as checkpoints. Same hewn surface strategy; no new concept-art direction and no claim of a finished production renderer.

## Fixed controls and embeddings

- Height/length irregularity was applied before operation-specific layouts, which overwrote the main A/B/C positions. It is now applied after layout. Identity scales the new displacement with emergence, keeping its initial attachment fixed. Generated-tree and isolated-fork cases also respond. The resulting variation is deterministic; it changes branch lengths/endpoint heights, not topology.
- Generated spatial trees now recursively rotate the branch plane by depth, with seed-dependent orientation. They interpolate from the original flat layout into that geometry. This gives separate branching planes rather than depth offsets that nearly correlate with left/right position. It is not a botanical simulation or a collision-free unfolding solver.
- Simple rewrite examples use less symmetric depth offsets, so the spatial view is less like a single tilted plane. A shallow tree has inherently less opportunity to demonstrate branching-plane variety.
- Bow now arches relative to each member and uses seeded variation in its local bending plane. At zero spatial spread, the steady regroup tree and its bow stay planar. The earlier implementation biased every branch toward world +Z. The trunk has a deterministic fallback bend direction where an upward reference is degenerate.
- The display ground now slightly overlaps the trunk base. This fixes the visible air gap; there is no root geometry yet.

## Performance changes and evidence

The same sampled-field and face-normal approach is retained. Changes:

1. Precompute section constants and use angle-addition identities instead of evaluating separate trigonometric functions for all seven faces at each field sample. Hoist loop bounds out of inner grid loops.
2. Default to 96 samples; keep 144 for close inspection. Display actual triangle counts.
3. Reuse the mesh for shading, labels and wireframe changes. Stop drawing the scene while stationary; redraw on camera changes, parameter changes and animation. Hidden views pause animation work.
4. In the face-normal shader, reject members outside a conservative curve neighbourhood before doing the expensive closest-point and face evaluation.

`benchmark.json` is a warmed Node CPU benchmark with identical straight-axis inputs (bow=0); it excludes GPU work and browser UI. The sampled fields matched exactly in the benchmark cases. This isolates the scalar-field optimization from the new bow and layout choices.

| Case | Sampling | 012 CPU ms | 013 CPU ms | Triangles, same in both |
|---|---:|---:|---:|---:|
| Nested associativity | 96 | 67.8 | 43.8 | 4,844 |
| Nested associativity | 144 | 186.6 | 142.2 | 11,068 |
| Generated tree | 96 | 85.8 | 60.8 | 8,032 |
| Generated tree | 144 | 354.0 | 223.5 | 18,792 |

Thus approximately 24–37% less CPU rebuilding at equal sampling in these cases. Lower sampling also reduces triangle count, at the existing silhouette-quality tradeoff. This pass does not reduce triangle count at a fixed resolution or solve feature-preserving meshing. The shader culling has not been GPU-benchmarked. These values are not frame-rate guarantees.

Browser inspection: changing height variation from zero to maximum visibly moved A/B/C in the held associativity midpoint. A generated tree seen from the side changed from a narrow planar profile to separate branching planes. Both face-aware studio and cel were inspected. Shading changes showed `geometry reused` with the rebuild counter unchanged. No browser shader errors were reported in the inspected view. Geometry retains the existing hewn look; coarse silhouettes, junction swelling and crowded node labels remain limitations.

## Validation

`check.ts`: 10 height-response cases; 252 motion/embedding states; 12 non-coplanar generated-tree seeds; 24 extracted meshes. Checks include endpoint attachment, finiteness, mesh/shader capacity, response of the height control in all rule types and both height policies, and planarity of steady working-plane regroup geometry.

`retract-check.ts`: 1,818 states retain the previous endpoint equivalence, fixed anchor, connector collapse and continuous transfer checks. Typecheck passed.

```sh
./node_modules/.bin/esbuild explorations/013-tree-variation/check.ts --bundle --platform=node --outfile=/tmp/nool-013-check.cjs
node /tmp/nool-013-check.cjs
./node_modules/.bin/esbuild explorations/013-tree-variation/benchmark.ts --bundle --platform=node --outfile=/tmp/nool-013-benchmark.cjs
node /tmp/nool-013-benchmark.cjs
./node_modules/.bin/tsc --noEmit --skipLibCheck --target es2020 --module esnext --moduleResolution bundler explorations/013-tree-variation/view.ts
```

## Retained art direction and next step

The user sees this as a significant improvement and close to enough for now. Both face-aware studio and cel are useful primary treatments; smoother treatments can belong to other tree types. Keep them in the palette. Base thickness, strong taper, bow, restrained bow variation, height variation, moderate twist, facet-width variation and restrained junction blending are useful dimensions of tree types. Do not equate every slider extreme with a good encounter preset.

Provisional restrained ranges for later encounter presets, to be revisited in a scene: twist roughly 0.2–1 radian; junction blend roughly 0.05–0.15; taper roughly 0.6–0.9. These are implementation-unit suggestions, not user-approved universal rules. Extreme twist and blend remain accessible for study.

Roots are a recorded next-world feature: in rocky terrain they may follow cracks, wrap around stones and help ground the tree. Root structure should remain distinguishable from the term being rewritten; deciding exactly what moves with a rewrite is future design work. No terrain-aware roots are implemented here.

Recommendation: move on to a small playable rocky clearing with a few varied, mostly static trees and one actively manipulated tree. Test approach → flatten → perform a rewrite → relax back into space, with an avatar. This would answer scale, readability and interaction questions that more isolated slider tuning will not. Cache inactive tree meshes and avoid rebuilding an entire scene every frame. Keep final junction meshing, collision handling, roots and larger-world performance as explicit unresolved work; do not assume this 40-member shader is a world renderer.
