# Living canopy refinement · 019 / round 06

The current `canopy-growth.html` now offers **Painterly volume** and **Previous rendering**. The latter retains the round-04 treatment; `?finish=previous` opens it directly. The earlier `canopy.html` and shadow study are unchanged. The original F5, F2 and F6 generated paintings remain the targets. No new concept paintings were generated.

## Research translated into this pass

**Shared normals rather than individually shaded patches.** In [Obscura's first-hand foliage breakdown](https://polycount.com/discussion/209623/smooth-foliage-like-in-breath-of-the-wild-europa-by-helder-pinto-mini-tutorial), edited normals remove distracting variation between foliage cards; the author describes transferring normals from an elongated hemisphere and correcting back-face shading. The discussion also explores inexpensive interior darkening. Our renderer already corrected back-face normals, but only curved each card's normals independently. The new material blends those with a normal field describing the larger canopy cluster. It works in the cluster's local frame, so it follows the host through a rewrite. The slider exposes how strongly adjacent cards share the larger form.

**Colour grouped at canopy scale.** [Anastasia Kasyanik's first-hand painterly-forest breakdown](https://80.lv/articles/creating-animated-painterly-forest-using-speedtree-substance-3d-ue5) describes changing UV orientations, adjusted normals, broad colour variation and separate colour controls. She also discusses choosing fixed rather than camera-facing leaves. This pass uses broad cool interior / olive middle / warm upper colour fields and less random per-card tint. Fixed patches continue to work from multiple camera angles. New irregular brush-mark textures remove the old repeated split down each elongated leaf. They are code-generated textures, not hand-painted art imported from those projects.

**Layered movement remains relevant.** [Dragos Matkovski's account of The Illustrated Nature](https://80.lv/articles/stylized-nature-vegetation-animation-shaders/) separates larger vertex movement from subtler leaf motion. Our host pose and existing shader wind remain separate; no new UV animation was added in this pass. The main unresolved issues here were form and shading rather than lack of motion.

## What changed

- Shared canopy normals blend with the existing shaped patch normals. No new vertices are required.
- Approximate interior shading uses local height and radial exposure, with broad dapple variation. This is an authored shading rule, not baked AO or a physical occlusion solution.
- A small coloured ambient fill prevents the tinted interiors from being shaded a second time into black. This is a stylized material accommodation, not physical subsurface scattering.
- The painted treatment uses a 512-pixel irregular brush texture. Brush scale adjusts the size of its marks. G1 has taller woody fans and modestly varied patch orientations; G2 retains its flatter organisation. G3 and the rounded F5 comparison also support the new material.
- The previous treatment remains an exact construction/material branch. Changing treatments preserves member attachments, host geometry and triangle count. Original F5 in `canopy.html` remains untouched.

The new normal-sharing, shadow-depth and brush-scale controls disable in Previous rendering. The older shaped-patch-normal checkbox still controls the card normals blended beneath the new field; at full normal sharing its effect naturally becomes very small.

## Inspection loop

1. Compared the existing render and original six-concept sheet. The principal differences were individually conspicuous elongated leaf motifs, inconsistent patch lighting, thin fans, and weak grouping into light/shadow masses.
2. The first new render used finer irregular marks and shared shading. It was too gritty, and the undersides became nearly black.
3. Enlarged the marks, reduced the tiny texture strokes, added restrained coloured ambient fill, and increased G1's vertical volume. Rechecked G1/G2/G3/F5, reverse views and compact rewrite poses.

The final result has broader colour grouping and a fuller G1 crown. It still differs materially from F5: patches can look layered or scale-like, small gaps create bright silhouette specks, the concept has richer medium-scale branch/canopy composition, and G3 remains a set of hanging bunches rather than one sweeping curtain. This is another comparison to assess, not a claim that the painterly target is solved.

## Techniques considered but not added

- Full-screen painterly filtering: can obscure the sigils and hands, and introduces temporal/view dependence. It would be a separate comparison, not a substitute for improving the asset itself.
- Camera-facing leaf cards: useful in stylized foliage, but fixed cards preserve spatial structure when orbiting and manipulating branches. Our current approach retains them.
- Detailed shadow maps or SSAO: could improve contact/depth but can also reintroduce noisy small leaf shadows. Here the local shading field is cheaper and remains attached through transformations; it does not account for every neighbouring branch.
- Artist-authored leaf/brush atlases, stroke-normal maps and more varied silhouettes: still worthwhile. This pass establishes the shading/attachment mechanism without claiming procedural marks replace that art work.

## Checks and cost

`paint-check.cjs` compares both treatments across all four constructions: terminal/offshoot attachment data and triangle counts must match. It renders the new control extremes and catches shader/browser errors. `canopy-check.cjs` checks the new defaults through 45 rewrite frames, reverse view, light spill, visibility and mobile layout. Review screenshots are saved in `round-06/screens/`.

Default G1 still has 11,964 canopy/decorative triangles and the same draw count as before. The new costs are texture resolution, small instanced attributes, and shader arithmetic; unchanged geometry does not mean zero added GPU cost. Local headless Chrome samples stayed near 58–60 fps. Wood pose rebuilding retains its existing lower worker cadence. Type checks, core tests and production loading are checked separately.
