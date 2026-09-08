# Ground decals and AI-assisted asset workflow

8 September 2026. First usable decal trial in the shared 018 route / 019 inhabited scene. No sigil decorations; those are shelved. The burnt-tree material and full encounter-state sequence remain future work.

## Try the comparison

Inspect → Appearance → Ground decals · comparison. Both layers start OFF so existing tabs retain their baseline appearance. Click Both layers to compare, or toggle separately.

1. Scorch alone: strength, ground X/Z, footprint width and rotation. Starts at the actual tree base (-1,-3). The generated coverage mask colours the terrain material, not a floating transparent quad. Charred areas have lower response to the added purple lighting.
2. Rock footing alone: switch among Soft earth, Long bank, Broken edge or Mixed. Strength controls darkening; spread controls footprint extent. Broad shapes intentionally avoid the fine botanical detail in the existing rock-surface atlas.
3. Place individual footings: select a numbered footprint with ground coordinates, then edit offset, scale or rotation. Scale zero hides that footprint. Reset footing placements clears those edits across layouts. Nearby collision circles are sparsified into a manageable set of stamp sites; these are approximations, not silhouettes of the actual rock/ground intersection. Existing small scenery stones without collision footprints are not automatically covered. New layouts rebuild the stamp map; per-layout edits are retained.
4. Ground-state preview: Dormant / active retains scorch; Recovering exposes a fade slider; Healthy removes it. This previews only the ground layer, not canopy disappearance, bark charring or regrowth.
5. Before disables both layers. The pre-existing cast-shadow options and moss/lichen surface decals are independent.

General settings/presets include placements and ground controls when Settings set = Ground decals only or All controls. Shadow & lighting only intentionally excludes them. Controls restore after reload, and Set as app defaults writes the actual project defaults through the existing endpoint. No new app defaults were promoted by this task.

## How the first version works

Generated grayscale masks are stored unchanged in assets/ground-decals/. White is zero coverage and black full coverage. The shader inverts that mask at render time and suppresses faint background noise. This avoids relying on the image generator's unreliable alpha output without an offline background-removal step. It is not an RGBA image deliverable. Exact prompts and dimensions: [provenance](assets/ground-decals/PROVENANCE.md).

The footprint masks are stamped into one 1024² terrain coverage texture over a 64×64 world area. That texture rebuilds only when rock layout or placement settings change. Scorch and footing use two additional texture samples in the existing painted-terrain draw; they add no geometry or draw calls. The stamps follow the actual ground surface through world X/Z lookup. They do not extend onto rock walls. This pass does not add ambient occlusion, ground normals, physical light transport or height displacement. The existing painting's baked shading remains a constraint.

Visual limitation: the scorch mask is a fresh top-down interpretation of the approved-enough concept, not an exact extraction. It has three long streaks and some splatter-like small details. Rock footings are understated contact artwork, not a claim that disconnected objects have become physically seamless.

## Research findings and practical choices

### Generate against geometry and verify in multiple views

[NVIDIA TexFusion](https://research.nvidia.com/labs/toronto-ai/texfusion/) takes a mesh and text prompt, generates across multiple rendered views, and combines the results into a UV texture. Its paper specifically addresses seams and conflicting views. This is research prior art, not a plug-in I have installed or a capability of our current imagegen call. For our workflow, the actionable principle is to preserve our actual mesh and supply controlled depth/normal/reference views, then evaluate textures on that same mesh. Arbitrary single-view concept edits cannot guarantee UV correspondence or usable deformation topology.

### Separate colour from lighting and material response

[Adobe Substance 3D Sampler: Image to Material](https://experienceleague.adobe.com/en/docs/substance-3d-sampler/using/filters/tools/image-to-material) documents AI-derived normal, height and roughness maps plus removal of shadows/highlights from base colour. Its [generative workflows](https://experienceleague.adobe.com/en/docs/substance-3d-sampler/using/features-and-workflows/generative-workflows) include image/text-driven texture generation. This is a plausible future route for charred wood or rock materials. It is not needed to place today's scorch mask, and this task did not install or purchase it. Inferred maps still need inspection; painted dark shading must not automatically become a deep geometric crack.

### Bake what is fixed; keep encounter effects separate

[Blender's render-baking documentation](https://docs.blender.org/manual/en/4.4/render/cycles/baking.html) covers baking ambient occlusion and normals to image textures. For fixed rocks, a small ground receiver with known UVs can receive a reproducible AO bake from the actual rock placement; keep it separate from scorch so recovery can remove the scorch without removing contact. A moved rock requires a rebake or dynamic approximation. This would be a more geometrically grounded replacement for our current footprint artwork, without running screen-space AO every frame.

### Terrain/object blending is a material workflow

[Epic's runtime virtual texturing documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine/runtime-virtual-texturing-in-unreal-engine) describes caching material data over surfaces, including terrain workflows. We do not need to copy Unreal's entire virtual-texture infrastructure for one clearing. The useful principle is shared world-space material data: rock bases and ground can sample compatible colour/normal layers with controlled transition masks. Today's ground-only stamps cover only the ground half of that problem. For local projection directly onto mesh faces, [Three.js DecalGeometry](https://threejs.org/docs/pages/DecalGeometry.html) already supports clipping projected decal geometry to a target mesh.

### An agent bridge helps iteration, not artistic judgement

[Blender MCP's project](https://github.com/ahujasid/blender-mcp) exposes scene inspection, Python execution, viewport screenshots and asset integrations. It can help an agent build geometry, inspect it and export it; it does not itself ensure topology, UVs, good silhouettes or visual matching. A useful future agent loop here is: deterministic scene/export script → render several controlled views → generate or author masks/materials → apply to the same geometry → inspect actual gameplay camera plus orbit views → retain parameters and source files. I did not install third-party extensions in this task.

## Verification

TypeScript, core transformation/interaction tests, defaults API tests and production build passed. The build retains its existing large-chunk warning. Chrome automation was unavailable; visual checks used the in-app browser. Inspected combined layers under spirit lighting, approach pose, footing variants, ground recovery visibility and reload persistence of individual footprint offsets. No browser errors were observed during those checks. No full new mouse/body playthrough was run for this material-only change.

