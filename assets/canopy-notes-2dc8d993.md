# 019 · Canopy workshop

Open `canopy.html`. This is a separate 3D material/attachment study; 018 remains the playable checkpoint. The gallery's round 03 shows the new shadow-canopy concept sheet. F5 is the user's leading direction; F2/F6/F3 and the more geometric F1 remain useful comparisons. F4 is excluded.

## What F5 uses

The density comes from **clusters of alpha-tested leaf textures**, not a mesh per leaf. A deterministic 256×256 Canvas texture draws aggregate sprays of irregular leaf marks. Each terminal member carries a seeded group of curved, oriented surfaces, drawn with InstancedMesh, surrounding a subdued opaque core. One card contains many leaf marks; the individual marks are not separately animated or modelled. This is code-native procedural texture art, not a generated raster asset. The gallery concepts use imagegen separately, with prompts and provenance retained.

The surfaces lie through a 3D crown volume, not in a single camera-facing plane. Their normals and orientations follow the cluster's broad shape. The comparison checkbox changes the card normal field while keeping instance positions/orientations and random seeds fixed. Double-sided card lighting keeps the intended outward normal rather than turning the back of a patch black. A small vertex displacement supplies wind without regenerating textures/geometry. Alpha testing writes depth and avoids transparent-card sorting; alpha-to-coverage smooths the cutoff with the antialiased WebGL context. It is a conventional surface approximation, not volumetric foliage.

First render was much too speckled: 115 tiny marks per texture and 85 small cards per cluster. Revised to fewer larger marks and 30 larger cards per cluster at default density, with an opaque core. This produces a more continuous crown with a broken outline. The current result is still coarser and more graphic than the F5 painting, with repeated cluster-shaped clumps. It demonstrates a feasible route, not a faithful match. Better authored texture clusters, a less uniform crown distribution and a more deliberate lighting palette are the next appearance improvements. More cards alone are not the answer.

## Other constructions

- F1: broad dodecahedral volumes, irregularly scaled and arranged; subdued procedural shade patches. Still more rock-like than leafy.
- F2: overlapping flattened canopy volumes; coherent shelves, but more regular and disk-like than the painting.
- F3: rounded irregular volumes, welded normals and procedural shade patches. Broad solid-body comparison.
- F6: tapered curved hanging volumes, with textured leaf skirts. The first version was cactus-like; revised to rounder curtains. Still more separated into lobes and less richly draped than the painting.

The disabled density/normal controls apply only to F5. Crown extent, palette, seed, spatial spread and wind remain shared. The concept panel shows a CSS crop of the exact relevant thumbnail; clicking it opens the unmodified sheet.

## Host and transformations

Mature and uneven hosts are seeded branching structures. Crown clusters and fine woody twigs are attached to terminal members with stable IDs. The expression examples reuse 018's actual typed terms, legal swap/regroup/zero actions and `transition` layout function. The trunk uses 018's worker-generated connected hewn surface and face-aware shading; this is not a replacement trunk renderer.

A cluster and its fine twigs move together with their member endpoint and a restrained orientation change. They are not reseeded every frame. An identity's retiring branch carries its foliage inward and scales it down near collapse. Unaffected clusters retain their IDs/seeds. These examples test attachment continuity, not a general host/expression embedding, collision-free crowns, or the completed encounter sequence. Dense living canopies hide much of the algebra; a working-mode opening/transparency policy remains unresolved. The shadow concepts are intended to preserve branch visibility through dark translucent foliage.

Tree geometry and attachment poses update together when a worker result arrives. Pose play requests roughly eight remesh steps per second; wind and camera rendering are independent. The play control is a structural inspection loop, not a finished smooth 60 Hz growth/rewrite animation. Caching/deforming a fixed mesh or precomputed poses remains preferable before integrating this into gameplay.

## Light spill

The optional violet and blue settings are two actual PointLights, with falloff over the surrounding 3D floor, rocks, wood and foliage. Ambient/sun light is reduced for this lighting comparison. The small brightness modulation is temporal. There is no shadow-canopy shader, bloom, lightning or release effect in this page yet. The concept sheet suggests them; the control demonstrates that coloured illumination is possible.

The live 018 matte is partly baked imagery. A point light cannot relight painted hills as though they were actual geometry with corresponding normals. Bringing this into 018 would require lighting its 3D surfaces and a registered tint/light-overlay treatment for the painted ground, or additional geometry/material information. The workshop intentionally uses ordinary 3D ground to make this distinction clear. Its simplified scenery is a test stage, not a replacement landscape proposal.

## Performance and sources

The HUD distinguishes canopy triangles from total scene draw calls. At default density F5 uses 240 instanced cluster cards plus eight opaque cores on the mature host. The scene also includes the existing detailed traveller/hands, hewn tree and unbatched test scenery; its draw count is not the foliage draw count. Default canopy counts measured in the browser: F1 864 triangles; F2/F3 4,320 each; F5 2,560; F6 10,304. The textures still cause overdraw, so these counts alone do not rank GPU cost. Frame rate is a local browser observation, not a hardware-independent performance claim. Dynamic remeshing is reported separately. Transparent shadow effects may be more expensive than these opaque/alpha-tested living forms.

Primary documentation used:

- [Three.js Material](https://threejs.org/docs/pages/Material.html): alpha testing, alpha-to-coverage, and the noise/sorting tradeoff of alpha hashing. Alpha hash is not used in this study.
- [Three.js InstancedMesh](https://threejs.org/docs/pages/InstancedMesh.html): shared geometry/material with per-instance matrices and colours.
- [Three.js PointLight](https://threejs.org/docs/pages/PointLight.html): positional light, intensity, range and decay.

## Validation

Browser inspection covers all five constructions, default and reverse view, and quarter/mid/three-quarter/end frames of real swap, regroup and zero elimination. The read-only `window.__canopyStudy.inspect()` surface reports finite geometry and per-member canopy attachment/visibility/scale. Saved final review images are under `round-03/screens/`. TypeScript, core algebra/interaction tests and production build are checked. See `canopy-check.cjs` for the reproducible browser checks (server on port 3100).
