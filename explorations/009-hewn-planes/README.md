# 009 · Hewn planes: concept / explicit mesh comparison

Read `../../design/current-direction.md` before continuing the broader project. Plateau pillar/clockwork imagery is parked, and 007's lumpy hewn field is not an accepted finish.

## This round

A three-object concept range explores stronger long planar cuts. The live study isolates one Y fork with explicit polygon cross-sections, bevel strips, and selectable lighting/normals. It intentionally does not add rewriting animation until the geometric finish is assessed. Previous animation studies remain intact.

The initial settings show straight, untwisted broad facets. Select seven, five or four primary section sides, each with a narrow bevel on every corner. Compare cut-face normals with averaged normals on the same geometry: the latter rounds the lighting without changing the silhouette. Raking and soft light provide another independent comparison.

## Construction

`mesh.ts` builds matching polygon rings, joins successive rings with long side faces, and caps the tips. A convex junction patch connects the three open member ends; its coplanar opening caps are removed. Patch vertices are snapped back to the exact ring coordinates after the hull's Float32 conversion to avoid seam cracks.

With twist and bow at zero, the member faces are planar. Nonzero values introduce three longitudinal spans and can make quads nonplanar, revealing their triangulation. This is an explicit low-complexity surface, not a distance-field remesh and not an existing rounded surface with flat shading applied.

The junction is the main remaining weakness. It closes the surface, but the broad central patch reads more like a geometric block than a carved saddle. A trial of pulling internal edges into a notch produced folded-looking facets and was not retained. A designed junction patch, rather than arbitrary vertex displacement, is the next useful step.

## Radius policy

All three sections use the same normalized polygon, so area is proportional to squared radius. Given parent radius R and share s:

- left radius = R sqrt(s)
- right radius = R sqrt(1-s)

Thus the child areas sum to the parent area at their junction sections. Tips taper to 76% of the initial member radius. This is a chosen visual constraint, not a universal botanical law or a general sap-flow model. Extending it to recursively weighted trees remains future work.

## Concept comparison

The generated sheet gives the requested stronger range of cuts, but its named face counts are not exact measurements. The live mesh has verified section counts, no grain texture, and a simple solid wood colour to expose geometry. Limbs now have actual long planes; the junction, asymmetric cuts, wood grain and an organic silhouette still do not match the reference finish. Use this study to decide whether explicit surfaces deserve further development before attempting moving junction topology.

## Verification

`check.ts` exercises 144 combinations across side count, bevel, bow, twist, radius and branch-area share. Checks: finite coordinates, nonempty junction, zero open edges and no edges shared by more than two triangles after coordinate welding. These are edge-incidence checks, not a full proof against self-intersections or inverted volumes.

Run from the repo root:

```
./node_modules/.bin/esbuild explorations/009-hewn-planes/check.ts --bundle --platform=node --format=esm --outfile=/tmp/nool-hewn-check.mjs
node /tmp/nool-hewn-check.mjs
```

The concept was generated with built-in imagegen; exact prompt and review are in `prompt.md`. No existing study is removed.
