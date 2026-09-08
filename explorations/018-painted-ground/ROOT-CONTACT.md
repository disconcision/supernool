# Root foot and contact study

Current playable route, both ordinary 018 and inhabited 019. Inspect → **Roots & ground contact** exposes base flare, exposed-root amount, root reach, and independent contact-patch toggle, spread and strength. Settings & presets has a **Roots & ground contact only** save/reset set.

The opaque center belongs to the small contact patch. It is independent of the large scorch opacity and follows charcoal base brightness / treatment strength. Original wood uses dark earth instead. This is a small procedural material mask with an irregular feathered perimeter, not a baked AO calculation. It remains when the large scorch is disabled or faded.

The stem has a quadratic radius flare over its lower portion. Both the mesh field and analytic face normals use that profile. Five optional short, tapered roots share the implicit surface with the trunk and terminate below the clearing ground. Their anchors follow the curved stem. They are added only to worker geometry, never to the term, layout points, sigils, or cloud anchor structure. Existing rewriting and material variants remain available. Flare and roots can each be set to zero for comparison.

The two scenery trees retain their locations and approximate heights, but now use slimmer tapered members, moderate twist, hewn cross sections, their own face-aware shading uniforms, and finer static surface sampling. They do not inherit the central tree's burnt material.

Validation: TypeScript, existing tests, settings API checks and frozen build. New root checks exercise 55 legal-rewrite frames, testing roots attached inside the curved stem, buried tips, taper, unchanged expression geometry, and flare confined to the lower trunk. Visually inspected burnt and ordinary wood, spatial and working poses, and a stronger exposed-root setting in the in-app browser, with no browser errors. Chrome was unavailable through the browser tool; a full Chrome gesture playthrough and visual midpoint capture were not performed in this pass.

Limits: these roots assume the clearing's flat central ground. They do not yet follow rocks, cracks or sloping terrain. Very broad flare can look skirt-like, so its initial setting is restrained. The current 40-member face-shading limit still applies; the five added roots consume five slots. No claim of forest-scale performance or terrain-aware root generation.

User's preceding save was verified in tracked app defaults: clearing-019 revision 6, charcoal base .028, tip .16, ash start .3, texture 1, scale 3.25, fissures .35, sheen .6; scorch .87. New root controls start from code defaults and can be saved separately without replacing those choices.
