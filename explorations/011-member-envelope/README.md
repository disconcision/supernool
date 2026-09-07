# 011 — Continuous members

Motion repair after user review of 010. Run through the existing Vite server at `/explorations/011-member-envelope/`.

## What failed, what changed

010 shrank junction ports in proportion to the distance between nearby attachment sites. During associativity these sites approach one another; the radius therefore approached zero. Its closure audit could pass while the shape became absurd. Patch normals and changing port configurations also made obvious junction seams.

011 keeps each member's radius independent of attachment spacing. Each branch has a curved centreline, a seven-sided cross section with a gradually changing rotation and face widths, and length-dependent taper. A point is evaluated against the nearest part of the entire member, then whole members are smoothly unioned. Subsegments do not each add a soft bulge as in 007. One extracted envelope replaces separate junction patches. This is rendering geometry, not the transformation calculus.

Identity still emerges from the fixed attachment; existing operand descendants travel with their operand. The newborn zero starts at zero extent/radius, intentionally. Existing members never inherit that birth rule. Swap orbits in depth. Associativity retains both operator mappings and both level/depth height policies. Static generated binary trees exercise the same renderer. Distributivity is deferred until this baseline is stronger.

## Visual inspection log

Inspected in the actual browser, not inferred from audits:

- Associativity / exchange / nested: 50% oblique; 10% back. No collapsed ports; the middle junction still becomes a broad elbow.
- Associativity / keep / nested: 75% back. Attached members retain substantial thickness, without a separate hub patch.
- Identity / uneven operand: 10% and 50% oblique. Descendants remain intact while the operand moves out. Labels crowd together near birth.
- Swap / uneven operands: 50% side. Distinct orbital arms; subtrees appear edge-on from this camera and labels overlap.
- Associativity / keep / uneven: 25% front. Carried subtrees stay recognizable and the changed heights are visible.
- Generated tree / depth four / next seed: default oblique, then maximum bow and twist. Connected outline; high twist exposes grid-scale waviness. This extreme is an exploration limit, not a recommended style preset.

Default inspected frames rebuilt in approximately 25–60 ms after browser warm-up; the larger extreme took approximately 77 ms. Early cold frames were substantially slower. These are observations, not a cross-device benchmark.

## Verification

`check.ts` sweeps 3,636 skeleton states and extracts 40 meshes. It checks member-centreline inclusion, bounded length taper, preserved local positions of carried operands, finite extracted positions/normals and buffer capacity. Results are in `audit.json`. Minimum tip/base radius fraction in that sweep: about 0.597 (this compares each member to its own current base radius, including the intentionally growing zero).

Run:

```sh
./node_modules/.bin/esbuild explorations/011-member-envelope/check.ts --bundle --platform=node --outfile=/tmp/nool-011-check.cjs
node /tmp/nool-011-check.cjs
./node_modules/.bin/tsc --noEmit --skipLibCheck --target es2020 --module esnext --moduleResolution bundler explorations/011-member-envelope/view.ts
```

These checks do not prove absence of unintended fusion, self-contact, temporal surface flicker, or topology changes. Visual inspection remains necessary.

## Remaining limits / next experiment

- Softer than 009's seven-face concept. Do not replace that reference with this implementation's appearance.
- Grid extraction rounds ridges and can ripple under strong twist, especially on small twigs. More resolution alone costs time; preserving feature boundaries in extraction would be a separate experiment.
- Different members can fuse whenever they overlap. Skeleton identity does not imply surface separation. A future collision/clearance policy must distinguish intentional shared junctions from unrelated nearby branches.
- No persistent surface vertex IDs or UV correspondence yet. Decorations should use member ID and longitudinal/cross-section coordinates, not marching-cubes vertex indices.
- Generated trees are static; rewrite examples have larger fixed operand templates. This is not yet rewriting any selected node of any generated tree.
- Some default radii remain inherited from earlier studies; there is no globally enforced botanical area law during rewrites.
- Facet widths vary continuously along a member. This experiments with narrowing cuts; there is no explicit semantic event for a facet ending.

The classical generalized-cylinder approach separates axis, varying section, radius profile and twist. That remains a useful parameter model even when the final surface is extracted from a field. Primary reference: [Algorithmic Botany — Generalized Cylinders](https://algorithmicbotany.org/cpfg3.0-tutorial/cylinders.html).

No new concept generation this round: the known seven-face reference is sufficient to expose the remaining appearance gap. The work here prioritizes repairing the demonstrably broken motion before expanding the art brief.
