# Painted shadows · 019 / round 08

The user finds the volume clouds improving but still too blobby. Rising anvils evoke cumulonimbus better. This round explores their suggestion of deriving shadow forms from the existing painterly living-canopy constructions, with more open, wiry or cloud-like coverage. It does not replace S1–S6 or regenerate the living concept art.

## Three variations

- **S7 · Painted shadow canopy:** reuses G1's actual instanced patch geometry, placement and procedural brush atlas. Removes green colouring, ordinary twig meshes and solid backing. The resulting dark coverage preserves broad ragged marks. This is deliberately the most literal comparison.
- **S8 · Fibrous hanging shade:** uses G3's hanging patch layout, replacing leaf marks with curling dark fibres mixed with cloud haze. The first render was too finely striped and speckled; strands were broadened and given derivative-based filtering to reduce distant/foreshortened aliasing. This remains the most speculative variation and may still read as a curtain or tangled growth.
- **S9 · Turbulent patch banks:** starts with G2's layered positions, turns the patches more upright and lengthens them, then applies animated warped noise coverage instead of recognizable leaf marks. It is a bridge between the living construction and more cloud-like growth, without the ellipsoid bodies of the prior pass.

The Concept & method panel switches to the original living reference sheet for these forms. It uses the original storm-cloud reference for S1–S6. These source paintings remain references, not evidence that the live renderer matches them.

## Rendering and motion

Coverage is rendered into a separate floating-point buffer with **maximum blending**. The final compositor attenuates the scene once using that coverage. Overlapping translucent patches therefore do not multiply into an opaque black pile. Patch density affects shape and coverage, while Darkness remains the upper bound on absorption. The existing Depth / Lift skeleton / Clear host choices remain available; none of this changes the algebra.

The patches are real, fixed-orientation 3D surfaces, not camera-facing sprites. They retain the living construction's local placement and follow stable host IDs through the existing rewrite layouts. Patch vertex motion and continuously warped texture coordinates provide movement at different scales. Disappearing short branches shrink their groups; unchanged groups regenerate deterministically when the topology or settings require a rebuild. These are attached decorations, not additional expression nodes.

There is no opaque core. The procedural shadow material does not retain living foliage's physical lighting or green palette. Colour comes from near-black absorption, a controlled coloured edge contribution and the existing scene illumination behind it. Purple, blue and amber remain alternatives. The grazing-angle bark energy is unchanged.

Exterior lightning uses a sparse projection of the actual patch positions as its guide. Its contribution is additionally restricted to nonempty patch coverage and suppressed on the host. This avoids free-floating guides crossing empty gaps, but can clip or partially hide an otherwise valid short discharge. This is still stylized camera-adapted lightning, not an electrical simulation.

## Useful controls

**Patch density** and **Fraying / openings** apply only to S7–S9. The existing extent, billowing, evolution speed, opacity, palette, bark and visibility controls still work. Effect timing can freeze a frame or flash. Direct links accept `?form=S7`, `?form=S8` and `?form=S9`; the previous forms can be linked the same way.

The new construction adds one density pass (about 4,608 patch triangles in the default S7 example, plus the existing host/mask work). Local sampled frames were near 60 fps; this does not establish a forest-scale budget. Maximum blending avoids sort order and cumulative opacity problems but is not physical volumetric density. Layered silhouettes, repeating marks, thin edge-on patches and overly fine detail remain possible. Their differences from the older cloud masses are intentional comparisons, not a declaration that painterly foliage is the final cloud solution.

## Checks and artifacts

Inspected the three actual renders, then revised the overly fine S8 fibres and made S9's patches more upright. The browser check covers actual host-mask and animated-image differences, finite attachment data through 45 rewrite frames, previous forms, frozen effects, flashes, orbit and narrow layout. Screenshots are retained in `round-08/screens/`. The density buffer is cleared when the mantle is hidden. Type checking and production loading are also checked.

During shared-checkout validation, an unrelated concurrently edited idle-hand test briefly expected `depart` where its code returned `startle`. No idle-hand implementation was changed as part of this study; publication checks are run on the isolated canopy branch as well.
