# Shadow mantle · 019 / round 05

Open `shadow.html`. This is a rendering study on the existing host/layout workshop, not a change to playable 018. The living canopy studies remain at `canopy-growth.html` and `canopy.html`.

## Latest direction

The user clarified that shadow foliage should be **nearly black, minimally textured, translucent cloud-like silhouettes**. Branches and sigils must remain visible through that darkness. Keep a coloured fringe, lightning above it, and subtle coloured energy in the wood. Previous generated foliage-like surface detail is not a target. No additional image generation was needed for this round: it tests the clarification directly in 3D.

## Construction

Each selected host member carries three overlapping ellipsoidal lobes. Their positions derive from stable member IDs and current endpoints; their extent contracts with a disappearing branch. Internal attachments and terminal attachments differ in size. Three presets change the proportions: lobed mantle, low banks, tall columns. The current shader supports 40 lobes; this is a bounded study, not a world-scale renderer.

A single composite pass reconstructs camera rays and the nearest opaque scene depth. It computes each lobe's visible depth interval, then uses the maximum optical thickness across overlaps. This deliberately avoids multiplying many translucent layers into opaque black. It is an approximation to a merged medium, not exact volumetric integration or physical cloud scattering. The darkness attenuates the rendered scene beneath it. Low-frequency boundary noise and mild drift vary the silhouette; interior texture starts nearly off.

The minimum projected lobe distance defines the union's fringe. There are no lit leaf textures and no separately shaded spherical balls. Because the interior has almost no lighting information, this can read flat in a still image even though the attachments, depth intervals and orbit response are spatial. The rather simple scalloped outline remains a design limitation, not an approved final cloud shape.

The scene is rendered to a linear half-float target with a depth texture and MSAA, followed by the mantle composite and final tone/colour conversion. Three.js documentation: [render targets and depth textures](https://threejs.org/docs/pages/RenderTarget.html). Rendering APIs were checked against the installed Three.js 0.185.1 source as well.

## Sigils, wood and arcs

The sigils are the existing extruded 3D glyphs, not new sprites. As in the previous workshop, their materials do not write depth and have depth testing disabled for readability. They enter the scene colour image before the mantle pass, so they are darkened through it. Their emissive fronts keep them legible; this is a readability accommodation rather than physically correct glyph scattering inside a medium. Opaque wood supplies the depth used to terminate cloud intervals in front of it. The wood has a separate adjustable emissive colour.

Arcs have world-space endpoints near the visible side of the crown, projected into the composite. Their changing jagged segments and additive halos are intentionally overlaid over the mantle. They do not currently receive full scene occlusion. At high agitation a third arc reaches a selected nearby 3D rock. These are graphical lines, not simulated electrical paths. Local point lights cast palette colour onto the actual ground and rocks independently; the arc itself is not an area light or bloom source. The fringe is an additive halo, not a bloom pipeline.

Cloud opacity, fringe, interior texture, agitation, extent, drift and wood glow are adjustable. Violet, blue and amber comparisons live in the palette panel. “Show shadow mantle” hides the clouds and arcs; local lights and wood glow remain available independently. “Violet · no local light” in the palette panel disables local light spill, while the mantle retains its violet comparison colour. The cloud does not have polygon faces, so wireframe applies to the host wood.

## Validation and limits

`shadow-check.cjs` exercises all three forms, 15 actual swap/regroup/zero-removal states, front/reverse views, palette changes, effects visibility, mobile layout, shader/browser errors, finite lobe data and maximum counts. It compares rendered pixels at low/high opacity: many pixels must darken, retain nonzero transmission, and leave most of the surrounding scene unchanged. Screenshots in `round-05/screens/` were inspected, including compact rewrite poses. The old living study checks are also run after shared-controller edits.

Default local headless Chrome captures at 1440×1000 were about 60 fps with 27 lobes. This is a spot check, not a hardware-independent performance guarantee. The mantle adds a scene render target and one full-screen pass rather than a dense polygon cloud. Cost scales with screen pixels and lobe count. The existing worker-based wood regeneration still has a slower cadence than camera/drift rendering.

This round does not implement the release wave, recovery growth, encounter sound, player buffeting, or integration into tactile gameplay. It also does not solve every future host/expression mapping or arbitrary-size forest rendering. The study is meant to decide whether this much plainer, darker/translucent treatment is the right visual direction before adding those systems.
