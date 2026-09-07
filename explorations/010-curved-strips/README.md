# 010 · Curved strips with sharp borders

Successor to 009. The seven-face concept remains the appearance reference; no new artwork was substituted for testing geometry. Plateaus remain paused; see `../../design/current-direction.md`.

## Start here

Choose **Isolated fork**, then increase twist. Compare:

- Smooth within strips: a curved cut face reads continuously, with a sharp border against its neighbour.
- Every triangle flat: the same positions expose their triangulation.
- Smooth across everything: the same positions lose the carved border shading.

The twist range reaches 2 radians, approximately 115°. Seven cross-section corners trace seven persistent longitudinal strips. Each strip has 36 spans. Positions on a shared border coincide, but its two sides have separately accumulated vertex normals. Diagonals within the strip do not receive separate shading boundaries.

This is a standard split-normal principle applied by construction, rather than inferred from an angle threshold. Three.js describes averaging normals across shared indexed vertices in its [BufferGeometry documentation](https://threejs.org/docs/pages/BufferGeometry.html); its [custom geometry guide](https://threejs.org/manual/en/custom-buffergeometry.html) explains independent position/normal attributes. Blender likewise distinguishes smooth surfaces from marked sharp edges in its [modeling documentation](https://developer.blender.org/docs/release_notes/4.1/modeling/).

## Geometry and shading are distinct

Curves and twist determine the polygon-corner trajectories; triangle sampling approximates the resulting strips. Shading only controls how those sampled surfaces receive light. It cannot hide a genuinely sharp silhouette bend or fix intersecting geometry. Very strong twist can still look like a screw; the subtler changing face widths and irregular cuts in the concept are not all represented by one twist parameter.

The new junction is a local patch between exact member boundary rings. The unshaped hull comparison retains the block-like form. Rounded mode projects interior patch samples and inter-port edge samples onto a small, star-shaped capsule envelope, creating a concave saddle. This field is confined to shaping the junction; the longitudinal strips are explicit surfaces. Patch normals are shared within the patch, separate from the longitudinal strips. A visible collar can therefore remain at the join. It is not yet a perfect continuation of the carved strip boundaries through the fork.

## Generative construction

`construct` accepts a list of geometric member segments, not a hand-authored Y mesh. It splits host members at sliding attachment sites, finds incident directions, creates matching port rings, builds seven strips per member, and closes each multi-port junction with a local patch. Degree-two, binary-fork and temporary higher-degree junctions use the same procedure. A seeded binary-tree case varies shape and early termination; the operand complexity selector sets its depth bound. This demonstrates reuse, not unrestricted arbitrary-tree correctness.

Port trim distance depends on local incident lengths. Radius is capped by the separation angle to keep neighbouring port rings apart. This fixed the initial overlap/closure failures, but introduces artificial necking at closely spaced attachments. It is a diagnostic compromise, not an approved thickness rule. The shared-edge audit is displayed in the UI; open-port mode intentionally reports open boundaries.

## Transformation correspondence

The identity and associativity skeletons reuse 007's explicitly identified operands and plus mappings. Anchored identity leaves the parent position fixed while A and its descendants move outward and zero emerges. Both associativity correspondences can be inspected with nested and uneven operands. Rendering steps are not additional algebraic rewrites.

Each source member has an ID, and strips are labelled by source member, split interval and cross-section corner. Those labels organize normal sharing during an update. They are **not yet** a complete cross-frame mapping when a member gains/loses split intervals. Local patch triangulation is rebuilt, and the number of strips changes when attachments coincide or separate. We preserve the semantic skeleton correspondence but have not solved vertex/UV correspondence through these topology events.

The next architecture step is to cluster nearby junctions into one evolving patch with explicit entry/exit ports and carry strip-border paths through that patch. That could avoid independent ports collapsing into narrow waists. Passing the current closure audit does not mean this transition already looks natural.

## Findings

- Strong twist no longer forces each triangle diagonal to read as a carved edge. This part is materially better than 009.
- The local concave patch removes the blunt horizontal bridge, but collars and pinching remain visible.
- Connected geometry is possible across the sampled transformations, but purely local independent ports are insufficient for consistently natural moving forks.
- A generated-tree case exercises the same builder; larger/bowed trees can still self-intersect. No collision or support system is implemented.

## Verification

`check.ts` exercises 144 case/complexity/mapping/time combinations. It checks finite positions and normals, zero open or multiply shared edges in closed-patch mode, and that changing normal policy changes normals without changing geometry. Some combinations intentionally reuse a case independent of certain controls; this is a parameter sweep, not 144 distinct tree topologies.

Edge incidence is not a proof of manifold vertex neighbourhoods, orientation, no self-intersections, or deformation quality. Audit results are in `audit.json`. Browser checks compare fork twist, animation and generated-tree controls.

```
./node_modules/.bin/esbuild explorations/010-curved-strips/check.ts --bundle --platform=node --format=esm --outfile=/tmp/nool-010-check.mjs
node /tmp/nool-010-check.mjs
```
