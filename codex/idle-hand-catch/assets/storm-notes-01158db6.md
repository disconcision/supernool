# Roiling shadows · 019 / round 07

This pass responds to the request for more cumulonimbus-like body and movement, brief forked exterior lightning, a little interior texture, preserved branch readability, and flowing view-dependent bark energy. It updates the existing shadow workshop; 018 and the living studies remain separate.

## Comparisons in the workshop

- **S4 · Cauliflower billows:** larger bodies with smaller shoulder lobes at several heights. The lobes circulate and breathe, while moving noise perturbs their outlines.
- **S5 · Rising anvils:** upright turrets spreading into broad upper shelves. Deliberately more architectural and top-heavy than S4.
- **S6 · Rolling banks:** lower overlapping fronts, with scalloped shoulders and undersides.
- **S1–S3:** the original analytic renderer and long anchor-to-anchor arcs remain available as checkpoints. Their original algorithms are unchanged; the shared sliders retain your current values, rather than silently restoring old defaults. The new visibility/billowing controls disable for these forms. These study codes do not promote the similarly numbered, earlier generated concepts that were rejected.

The same host/motion options, shape seed, orbit camera, purple/blue/amber palettes and actual local illumination remain available. Agitation is still an independent art-preview parameter, **not** a completed encounter-progress model. A later playable integration can raise it as simplification concentrates the spirit. No changes to legal rewrites, player movement or goal recognition are made here.

## Clouds and tree readability

The new renderer uses up to 64 animated ellipsoid lobes. It analytically estimates their view-ray intervals, perturbs their membership with two scales of moving noise and blends their projected borders. It composites darkness once, avoiding opacity accumulation from many overlapping transparent meshes. A weak front-surface noise modulation gives the near-black interior some cloud texture without adopting leaf motifs.

This remains a stylized approximation, not a volumetric fluid simulation or physically accurate cloud scattering. Broad shape comes from the lobes; their centres and radii evolve continuously. The shape can still look like a layered silhouette, especially with deliberately sparse interior detail. Front-surface texture is blended between overlapping lobes to reduce patch boundaries; the anvil variant exaggerates a recognizable cloud profile rather than modelling atmospheric formation.

Three visibility modes make the tradeoff explicit:

1. **Depth / transmission only:** cloud attenuation uses the ordinary scene depth.
2. **Lift the skeleton** (default): a separate host mask reduces attenuation and fringe over actual wood and glyph geometry. Some darkness remains there.
3. **Clear host cutout:** suppress cloud contribution over the host entirely. It gives the visual impression of cloud behind the tree, although the cloud remains spatially attached around the host.

The mask is intentional art direction, not a claim about physical transparency. It excludes invisible hit targets and aura planes; the first inspection caught and corrected rectangular holes from those targets. The existing sigils still use their normal 3D geometry with overlay-style depth settings. The mask also keeps lightning strokes off the glyphs and wood in all three new modes.

## Lightning and bark

Lightning now selects exposed projected cloud borders rather than branch anchors. Short curved discharge paths have irregular deviations and two thinner forks. A discharge keeps its selected lobe/angle during its lifetime, preventing candidate selection from hopping as the cloud moves. Each primary flash lasts roughly 55–90 ms, with a weaker brief repeat and a fully dark interval. Quiet settings mostly show one small discharge; high agitation increases rate, length, strength and track count. The old permanent residual glow is gone.

These are camera-adapted strokes, not a 3D electrical simulation. Their projected ellipsoid guide approximates the noisy contour, so a stroke can sit slightly off the visible cloud edge. They do not currently create physical ground strikes or cast their own flash lighting; the coloured point lights remain the separate ground/rock illumination treatment. Old S1–S3 retain their earlier strike comparison.

Bark energy extends the existing carved-face shader. A view-relative grazing-angle term emphasizes edges, while slow warped bands and thin streaks modulate emission over the surface. It uses the hewn shading normals, not raw extraction triangle normals. It is emission on the actual wooden mesh, not a floating outline; no bloom post-process was added. The pattern is evaluated in world coordinates, so persistent bark UVs/material advection through topology changes remain future work.

**Effect timing** can freeze the cloud/bark/lightning clock and scrub it. “Freeze a flash” makes a brief event inspectable without increasing its duration during ordinary animation. Cloud evolution speed zero freezes the cloud geometry/noise while leaving bark/lightning timing independent.

## Inspection and validation

Inspected all three new silhouettes, depth/lift/cutout comparisons, frozen time samples, and quiet/agitated flashes. The first pass revealed a host-mask rectangle artifact, almost invisible interior texture, and correlated lobe phases. Excluded hit geometry, added restrained attenuation variation, and decorrelated the lobe seeds. Stabilized lightning selection per flash after considering its behaviour under moving contours. A final render pass softened the nearest-lobe texture changes that had left faint circular patches. The ten-second real-time capture starts quiet and raises agitation halfway through.

`storm-check.cjs` checks real rendered host-mask differences, continuous finite lobe data, frozen cloud speed, flash onset/end, the three new forms through 45 swap/regroup/zero frames, old forms, orbit, visibility and narrow layout. Captures are retained under `round-07/screens/`. Type checks/core tests and production route checks accompany the browser inspection.

The extra host-mask render pass adds render-target memory and repeats host drawing. Clouds add shader work rather than tessellated geometry. The bounded default example uses 63 lobes; local Chrome samples were about 49–60 fps. This is not a forest-scale or low-end-device performance guarantee. Original surface extraction still runs asynchronously at its existing limited cadence during pose animation.
