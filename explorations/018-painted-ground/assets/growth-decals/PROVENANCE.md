# Moss and lichen atlas v1

Generated with the built-in OpenAI image generation tool on 2026-09-06 for Grow / Supernool. This is a new material exploration, not a user-approved reference. The user approved the underlying study 08 rock geometry and requested generated raster growth patches.

Original output: `exec-b6293a3b-3613-4dde-bd3e-9e883729d147.png`. The project copy `growth-atlas-v1.png` is unchanged: 1536 × 1024, RGBA, six 512 × 512 cells, three moss patches above three lichen patches. No background removal, painting, or raster postprocessing was applied. The runtime uses its alpha channel, atlas UVs, and surface-projected decals. Transparent RGB bleed is discarded by the material's alpha threshold.

The original simple vertex-color growth remains available in Appearance → Surroundings. This texture is deliberately confined to sparse patches; the rock geometry and broad mineral colors stay simple.

## Exact prompt

Use case: stylized-concept.
Asset type: transparent albedo decal atlas for moss and lichen on simple cel-shaded basalt rocks in a game.
Generate ONE landscape texture sheet, 1536 by 1024, with SIX separate patches in a precise 3-column by 2-row grid of equal square cells. Each patch is centered inside its cell, leaves generous transparent margins, and does not touch any other cell. The upper row contains three very different moss patch shapes: an irregular narrow branching trail, a ragged crescent, and a broken asymmetrical low cushion with little satellite tufts. The lower row contains three flat lichen colonies: a delicate branched ochre-grey island, an irregular pale cream and muted golden crust, and a fragmented dusty yellow-green rosette colony. Shapes must differ in size, silhouette, density, and empty gaps. Avoid six round blobs.
Camera exactly top-down orthographic. The growth is thin and hugs a stone surface, but DO NOT include the stone or any ground. Render only growth cutouts on REAL transparent alpha, including holes and gaps between the small tufts. No painted checkerboard, no white background.
Natural small leaf/frond detail in the moss; intricate scaly and lobed crust in the lichen. Detailed botanical texture with a restrained softly painted game-art finish. Muted forest green, olive, warm straw, dusty ochre, pale warm grey. Avoid lime/neon green. Texture must have quiet large color masses and interesting local detail rather than uniform procedural noise or all-over speckling.
Diffuse unlit base-color texture: no directional shadows, no cast shadows, no dramatic highlights, no perspective depth, no thick grassy sod, no soil, no stones, no scenery, no labels, no grid lines, no watermark. Keep all alpha edges clean and delicate.
