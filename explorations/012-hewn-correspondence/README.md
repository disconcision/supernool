# 012 — Hewn correspondence and spatial unfolding

011 remains unchanged as a useful checkpoint. This sibling explores sharper faces and a spatial-to-working-plane presentation deformation. It does not replace 011 or declare a final style.

## The specimen and process

The primary specimen is `p(q(A,B),C) → q(A,p(B,C))`, with `A = x + y`, exchange p/q, and depth-dependent operand heights. At the middle frame B is attached along the p–q member; it is an animation state, not another legal algebraic term. `diagram.ts` derives all six SVG frames from the same `spatial.ts` specimen used in 3D. Rows select flat/spatial embedding; columns select t=0, .5, 1.

1. Generated `specimen.svg` and rasterized it to `specimen.png` for image input.
2. Viewed the original 009 seven-face reference.
3. Generated `concept.png` using both images, explicitly constraining all connections and four terminal tips.
4. Compared the actual 3D model at held states with that sheet. `comparison.html` lets the user repeat this directly, with a front view and straight axes matching the structural diagram; the main interactive retains bow controls.
5. Iterated the implementation after inspection: independent face normals; continuous curve projection instead of segmented nearest-point projection; then flat cuts only at exposed ends, restoring blended internal connections.

The generated sheet preserves the major connections and A fork. Its spatial row is less convincingly three-dimensional than intended; do not use it as proof of spatial coherence. The live slider and side camera show actual depth.

## Implementation

`spatial.ts` changes embedding, not graph structure. It adds deterministic depth to named nodes, interpolates that depth at sliding attachments, and moves descendant subtrees consistently. At zero spread, rewriting examples recover their earlier skeleton positions exactly. Generated trees flatten their original small z offsets as well. This is an initial depth-spread model, not radial botanical growth or collision-aware unfolding.

Geometry remains a whole-member implicit envelope. Each member follows a sine-bowed centreline; a bounded Newton iteration estimates the nearest curve parameter. Seven section half-planes vary in rotation and width. Exposed ends use flat cuts; internal ends retain rounded blending. Radii never depend on nearby attachment spacing. The 144 grid improves silhouettes; 96 is faster.

`shading.ts` evaluates section-face normals per fragment. It follows the face that is active at that point instead of averaging normals across the marching-cubes triangle. This recovers crisp longitudinal lighting boundaries without flat-shading every triangle. Taper, twist and varying-width terms contribute to the normals; some curved-frame derivative terms are approximated. This is not a complete exact symbolic derivative of the field. Junction normal blending follows the member field blending. Studio and discrete-band cel materials are independent options.

The shader supports up to 40 members; current supplied trees fit within that bound. Surface topology and UVs are not persistent. This is an appearance experiment, not a production implementation for arbitrary large worlds.

## Visual review / iteration evidence

- Initial hewn pass: broad faces visibly distinct from 011, but small notches and angular capped seams remained.
- Replaced segmented curve evaluation with continuous curve projection in geometry and shading. Increased optional sampling to 144.
- Flat caps at every endpoint made artificial seams at joints. Changed this to exposed endpoints only.
- Final inspected states: associativity before; middle spatial/oblique; middle and 10% spatial/back; 90% flat/front; identity 10% spatial; swap 50% spatial/side. Studio and cel both inspected at the spatial midpoint.
- Broad faces remain visible in those intermediate states, and branches do not suffer 010's port-induced collapse.
- Residual failures: silhouette waviness, broad middle elbow, imperfect face continuity at junctions, possible unintended fusion, labels overlapping near emergence, and costly remeshing. The concept's deliberate long-face layout is not fully reproduced.
- Observed CPU rebuild times at 144 were roughly 80–180 ms in inspected examples, with some slower cold frames. This excludes GPU shader cost. Use 96 for faster exploration; this is not a game-performance claim.

## Checks

`check.ts` passed 2,214 embedding/rewrite states and 24 extracted meshes at 144. It checks graph IDs/radii/x-y preservation under spread, exact zero-spread recovery for rewrite cases, intact A-subtree offsets, positive interior centreline samples, finite output and mesh/shader capacity. Shader correctness also required the browser inspections above; these tests do not prove collision-free geometry or stable surface topology.

```sh
./node_modules/.bin/esbuild explorations/012-hewn-correspondence/check.ts --bundle --platform=node --outfile=/tmp/nool-012-check.cjs
node /tmp/nool-012-check.cjs
./node_modules/.bin/tsc --noEmit --skipLibCheck --target es2020 --module esnext --moduleResolution bundler explorations/012-hewn-correspondence/view.ts
```

## Next questions

- Can ridge curves remain coherent through junction transfers rather than switching dominant member?
- Should spatial relaxation use local branch frames and rotations, instead of only additive depth offsets?
- Which part of flattening should carry an entire subtree rigidly, and which should bend within it?
- How should clearance constrain spreading and orbital movement for larger operands?

Retain the current checkpoint while answering these. Do not treat stronger faceting alone as a complete solution.

## Added motion alternative: retract connector → meet → expand

User prefers exchange p/q with depth-following heights at present and requested a contraction alternative to sliding attachments along a member. The new Associativity motion selector keeps the existing slide path and adds a connector retraction path (also available with keep-root correspondence).

For exchange: q retracts to anchored p; at t=.5 the pluses coincide and B changes attachment there; p then extends away from anchored q. The root stays at (0,1.6,0), including spatial embedding. The operator connector alone shrinks to zero extent and radius. Operand branches and their nested subtrees remain substantial; this is not a recursive fold-up of A. End states match the sliding variant exactly. The original concept/comparison sheet remains explicitly the sliding path, so its frames are not silently reinterpreted.

Inspected the joined midpoint in the working plane and 75% re-expansion with spatial spread. `retract-check.ts` passes 1,818 states, checking endpoint equivalence, named-node attachments, fixed root, zero connector at midpoint and continuity across transfer. Typecheck passed. Retraction is an optional motion interpretation, not an algebraic rule replacing associativity.

Open feedback retained: the protruding/bulbous ends of the connector in the sliding path remain an issue. Adding retraction does not claim to fix that path.
