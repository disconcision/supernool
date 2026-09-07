# 019 · Inhabited trees — concept phase

018 remains the current playable checkpoint. This study explores the user’s new encounter direction before implementing it.

A tree is a living host; an algebraic expression is a spirit inhabiting it. Fine, non-semantic branches enrich the host without adding algebraic operands. Simplification concentrates the spirit’s activity, followed by release, a quiet pause, first green leaves, and regrowth toward the original physical extent. Regrowth must not undo the algebraic solution.

Initial art assumption: the spirit departs. A spirit that settles peacefully inside the tree remains an alternative, not ruled out. Working title only.

Reference frames were captured from 018 by performing its six legal mouse rewrites. See references/states.json for actual expressions, node counts and camera zoom at every step. The production page and the user’s browser settings were not changed. Header/docks are hidden only in the capture browser; mist drift is frozen.

## Round 03 — latest selection and studies

User preference: F5 closest, with F2/F6/F3 retained and F1 a less tree-like geometric alternative. F4 is rejected. The new `canopy.html` workshop attempts F1/F2/F3/F5/F6 in 3D, emphasizing F5. See [canopy-notes.md](canopy-notes.md) for construction, validation and remaining gaps. 018 stays unchanged.

Spirit feedback: reject S4 (liquid crystal) and S6 (stink-line reading). S1's cloud and arcs have interest but are too bulbous; S2's tendrils should be dark, matte and secondary; S3's drape has some interest, but the overall prior treatment was too cheesy. New direction is semi-transparent dark shadow foliage with cumulonimbus-like texture and restrained single-hue rim energy. Purple and blue are alternatives, not a combined palette. Local corresponding light on ground and rocks is required.

`round-03/shadow-canopies.png` explores four new candidates: V1/V2 violet storm/layered crown, B1/B2 blue storm/wind-scoured crown. Still images do not prove transparency or real light transport; they guide those experiments. Review: the shadow foliage is markedly more restrained, distinct hue families and light spill achieved; V1/B1 still show fairly prominent arcs, V2 exposes the dark secondary tendrils, B2 is more windblown and sparse. No candidate selected by the user yet.

## Round 02 — collective forms (earlier feedback)

The user finds round 01 interesting but rejects the small diamond/shard-like spectral leaves as the direction for arrival/concentration. Wants substantial amorphous bodies between tendrils, storm and crystal, plus blue/violet shimmer attached to bark and stronger near the silhouette. The recovered tree needs a much denser, mature crown; explore collective geometry as well as texture-based density. Release remains promising. Do not carry forward the old individual-leaf prescription as approved direction.

`round-02/foliage.png` and `round-02/spirit.png` contain twelve independent labelled alternatives, not sequential frames. The gallery presents them first. The exact prompts and provenance are beside the sheets. Both use the actual full-tree screenshot as a reference; neither claims exact mathematical correspondence. Reframing allows whole crowns to fit.

F1 cut masses; F2 layered shelves; F3 rounded clusters; F4 folded membranes; F5 aggregate textured clusters; F6 hanging curtains. S1 storm mantle; S2 tendril body; S3 folded shroud; S4 liquid crystal; S5 current wreaths; S6 cloaked wood.

Review: the F alternatives show substantially different mature crown silhouettes. F1 can read as stone, F4 as folded cloth; these are useful extremes, not mistakes to silently homogenize. F5 is an illustration of a texture-oriented appearance, not evidence of rendering cost or a functioning card mesh. S3 is quite literal fabric, S2 quite tentacular, S6 busy with small ruffles; S1/S4 have more substantial continuous masses. Shimmer should remain separable from the outer mass, and all effects require actual sigil/hand readability tests before acceptance. Generated glyphs and topology vary; no mechanical claim is made. No alternative is user-selected yet.

Possible implementation axes, not commitments: large canopy meshes for silhouette plus optional textured edge breakup; branch-local attachment clusters for deformation; surface-bound emission/rim response distinct from world-space surrounding spirit volumes. A concept's apparent simplicity does not guarantee lower cost: transparent layered spirit effects may be expensive. Do not implement an exact mesh/material plan until the visual direction narrows.

The older brief below records round 01 and must be read in light of this correction. The playable 018 is untouched.

## Artwork and review

Open `index.html` for five selected paint-overs with a source-screenshot toggle. Files and exact prompts are under `concepts/`; `provenance.json` identifies every output and input. Generated with the built-in imagegen tool. The first concentration draft is rejected because it copied the arrival topology and reintroduced removed nodes; keep it for provenance, not implementation.

Arrival: promising small twig/leaf scale, but top crown needs more framing margin. Corrected concentration: preserves four operators and five atoms, but spectral foliage is finer and more electric than arrival, and should be harmonized. Release: promising sparse wave rim, but wood is too translucent; keep the actual mesh opaque. First leaves: intentionally almost bare and physically small. Recovery: restored height and richer branching, not an approved correspondence map or finished leaf style. Generated terrain changes are incidental; none replaces the live matte.

## Proposed state separation

- Expression: existing typed AST, stable node IDs, legal rewrites and structural goal predicate.
- Host: persistent identity/seed, structural limbs and attached smaller branch systems. Initial implementation follows expression limbs while adding non-semantic extremities.
- Attachment: host member ID, normalized distance along its curve, a local direction/frame, and deterministic twig seed. Move attached growth with the member; avoid temporal flicker from reseeding it each frame.
- Inhabitation: mappings from expression nodes to host junctions and expression edges to host paths. Initially nearly one-to-one, later allowing unused host branches and intermediate host joints. Arbitrary mappings cannot be assumed to preserve meaningful ancestry; that needs an explicit constraint.
- Encounter: unsettled → concentrating → release → quiet → sprouting → recovered. The solved expression remains solved through host regrowth.

The hard cases remain attachment transfer during associativity, decorative twigs on removed identity branches, and combining decorations when terms merge. Preserve unaffected branch systems intact. Try growth/retraction for disappearing decorative systems, and deterministic retention/combination for merges rather than uncontrolled overlap. Do not add semantic operations just to animate decorations.

## Motion and sound direction, not implemented

Spectral leaves: translucent leaf membranes on fine twigs, localized rim/vein light, phase-offset flutter. A shared low-frequency pulse drives slight main-tree sway, ring brightness and leaf motion. Intensity can rise with encounter progress, but simple node count is not a universal progress metric because valid rewrites can expand before simplifying. Keep foliage and wave effects out of the sigil/hand readability zones.

The ring's footprint can follow physical crown reach; pulse intensity follows the spirit state. These are separate controls. First test traveller bracing visually without changing captured grip origins or adding involuntary movement. Actual radial knockback might fight the current body-pull mechanic and needs a separate experiment. A wave front should refract a narrow moving band and keep the world legible, rather than applying a full-screen blur or persistent dome.

After release, hold the small host briefly, then unfold a few green leaves before extending the biological limbs over several seconds (initial timing study: a 1–2 second pause and 8–15 seconds of regrowth). These timings are proposals. Regrowth needs its own target shape/extent; scaling the solved tree alone would leave it biologically too simple. The living foliage can reuse attachment sites with a different material and opening motion. Keep both departure and peaceful resident-spirit endings conceptually available.

Sound brief only: roughly 80–90 BPM, sparse electronic pulse with wooden/plucked transients and a breathing low tone. Add harmonics/detail as energy concentrates rather than forcing a faster tempo. Immediate tactile catch sound remains independent of the beat. Release is an airy widening decay, then soft growth details. No audio assets or music have been generated in this pass.

## Scope and continuity

This is the beginning of 019 as a concept study. It does not duplicate or replace 018, alter its controls, implement knockback, change the math engine or add permanent new lore that spirits are malicious. Existing tactile mouse/body interaction, hewn geometry, both characters, fog, and the concurrent art work remain in 018. The gallery is included in the production build and linked from the study catalogue.

## Round 04 · direction correction and actual canopy refinement

The original F5 remains primary; F2/F6 and other accepted F alternatives stay in the mix. A new living concept sheet was unnecessary and is archived, not substituted for those references. The request was to iterate the actual 3D study and compare it to the existing paintings.

The first round-04 shadow sheet went too wispy. The correction, `round-04/shadow-body.png`, restores cumulonimbus-like body, defined irregular borders and somewhat brighter coloured edges. Purple and blue remain separate alternatives. This is not yet approved, and its background transmission is weaker than requested. Do not replace the target of dark translucent mass with either opaque foliage or thin tendrils. Preserve readable branches. Increasing anger can produce larger arcs reaching rocks or neighbouring scenery; fine webs and tendrils are secondary possibilities.

`canopy-growth.html` is the new 3D iteration; `canopy.html` preserves the previous comparison. See `growth-notes.md` for construction, visual review, performance limits and attachment checks. These studies share the controller and 018's rewrite/wood implementation. No new playable encounter or shadow rendering is implied.
