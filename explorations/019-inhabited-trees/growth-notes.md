# Growing canopies · 019 / round 04

Open `canopy-growth.html`. The older `canopy.html` remains a separate checkpoint. Both use the same controller, hewn wood worker and 018 expression layouts.

## References and the detour

The **original** round-02 F5 painting is still the primary reference. F2 supplies tiered organisation, F6 supplies continuous hanging masses, and F1 supplies an angular alternative. The extra round-04 living generation was meant to clarify lower offshoots, but it was unnecessary: the request was for 3D refinement against already good concepts. That image is archived and is not an approved replacement target.

The latest shadow sheet is `round-04/shadow-body.png`. It restores substantial, lobed storm-cloud crowns and slightly brighter perimeter colour, with separate violet and blue comparisons. It is still an unapproved candidate. Transparency is too weak in parts; the intended combination remains substantial dark cloud body, background transmission and a readable wooden skeleton. The preceding wispy sheet is superseded. Exact prompts and provenance accompany all three images.

## What is actually implemented

- **G1 angular sprays:** several woody fans support overlapping textured patches, with varying pitch and a small tapered solid backing. The distribution follows elongated lobes rather than a sphere.
- **G2 layered fans:** flatter and more orderly versions of the textured fans. This explores F2 organisation without reverting to bare solid plates.
- **G3 continuous drapes:** patches overlap along hanging woody strands, from the branch attachment through the entire curtain. There is no separate opaque cap.
- **F5 rounded comparison:** the earlier textured spherical distribution, retained to compare rather than discarded.

These are new construction identifiers, not endorsements of the archived G-labelled concept sheet. “Concept & method” displays the original F reference appropriate to each construction.

All constructions offer smaller offshoots on internal members. Their stable IDs and local attachment fractions are derived from the host; increasing the lower-offshoot control adds deterministic slots. The expression examples use the original expression as the attachment inventory even if appearance is changed halfway through a rewrite. Removed members hide their attachments; returning members recover them. A short retiring member scales its attached decoration down instead of leaving it suspended. Offshoot positions follow the member's bowed centreline. This is a first attachment model, not a general biological growth simulation or a host/expression mapping solved for every future rewrite.

Textures are code-native Canvas leaf aggregates. One instanced patch carries many leaf marks. Alpha testing avoids transparent-layer sorting; this is suitable for living foliage, not the planned translucent storm material. Shaped normals, colour variation and vertex wind supply volume. Solid backing is disabled for drapes and for the unchanged F5 comparison, where it would have no effect. Small static woody pieces and backing pieces are merged per material to reduce draw calls.

## Visual inspection and remaining differences

The first new spray pass was too scratchy and sparse. Enlarging the painted marks and overlapping broader patches made a substantially fuller canopy. Front, reverse, and intermediate swap/regroup/zero-removal screenshots were inspected. The drapes no longer have the old disconnected top/curtain construction. Redundant upward twigs from the old renderer were removed from the new constructions.

There is still a gap to the paintings: leaf motifs repeat, G1 and G2 are fairly close, the crown shading is simpler, and G3 reads as separate hanging bunches more than F6's broad curtain. Lower offshoots help the bare-trunk/top-heavy silhouette but do not yet create the large, continuous crown in F5. The sample geometry and palette remain adjustable rather than approved defaults. Dense foliage also obscures expression structure, especially at compact regroup poses; the eventual encounter needs its own translucency and legibility treatment.

The specimen selector covers a mature host, an uneven host and three actual expression motions. It does not add these canopies to the playable 018 scene or introduce a shadow shader, encounter music or release sequence.

## Validation and cost

`canopy-check.cjs` accepts `CANOPY_URL` and `CANOPY_CAPTURE_DIR`. On the growth page it checks all four constructions, 45 rewrite frames across the three new constructions, finite wood and offshoot values, surviving terminal attachments, zero removal, density and offshoot controls, light spill, reverse view and mobile overflow. On the old page it retains the five-style / 15-frame checkpoint checks.

The default new mature canopies add roughly 11–13k triangles including decorative wood, versus roughly 5k for the rounded comparison with lower offshoots. The whole scene includes a detailed character and many ground/rock draws; its draw count is not the canopy count. Local headless Chrome captures were around 50–60 fps, which is a spot check rather than a device-wide performance claim. Wood pose rebuilding still happens in a worker at a lower cadence than rendering; wind and camera motion update independently. This study does not solve that existing animation cadence limitation.

Saved review frames live in `round-04/screens/`. Project type checks, algebra/interaction tests and the production build are also run before delivery.

## Later refinement

Round 06 adds a Painterly volume treatment to this page; choose Previous rendering for the round-04 material and construction. See `painterly-notes.md` for the later research and visual review. The historical limitations and counts above describe the earlier pass unless explicitly revisited there.
