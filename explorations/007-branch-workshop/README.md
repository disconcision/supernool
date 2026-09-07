# 007 · Branch workshop

Branching-only successor to 006. The earlier study is preserved. Plateaus move to notebook 008; they are not offered as a mode here. The camera is orthographic and remains freely orbitable.

## Controls

- Rounded connected skin, hewn member field, or the same curved skeleton.
- Both associativity plus mappings; exchange roles is the initial selection.
- Level operands or grouping-depth heights: A lowers and C rises through associativity; descendants travel with their operand. The nested subtree is not reconstructed.
- Base thickness multiplies all radii. Taper changes the falloff between levels and adds a modest taper along each member.
- Curvature bows the member between its fixed endpoints. Irregularity varies bow direction/amplitude, operand twig lengths and hewn face offsets deterministically.
- Hewn twist changes polygon orientation along a member. Junction softness blends adjacent fields. All numeric sliders update on input rather than release.

These are controlled geometric variations, not growth simulation. Different operand sizes do not introduce more semantic rewrites. Knots, grain textures, root effects and sound are deferred.

## Hewn construction

`surface.ts` constructs irregular octagonal cross-sections plus secondary bevel planes. Those planes determine the field, not the mesh triangle normals. A member is subdivided along its curve and its section rotates incrementally. Both rounded and hewn fields are then smoothly unioned and extracted with MarchingCubes.

The reference in `concept.png` was generated with the built-in imagegen tool; the exact prompt is in `prompt.md`. Long uninterrupted cut faces and small secondary bevels are the target. The live geometry is a first approximation: the voxel grid rounds edges, curved/twisted subdivisions can leave swollen transitions, and cut-face continuity is not as strong as the reference. This is not simply triangle flat shading, but also not an exact bevelled polygon mesh. A future swept polygon mesh with designed junction patches is a useful alternative if these artifacts dominate.

## Performance and continuity

The field is updated within bounded neighbourhoods of prepared members instead of evaluating every member at every voxel. Rebuild timing is displayed as an observation for the current device. This is CPU remeshing; no claim of stable vertex identity, persistent UVs or collision clearance. At extreme thickness/curvature, nearby branches can fuse. Very thin tips can vanish at finite resolution.

Prepared member irregularity uses stable operation-local indices and no frame-random noise. Its orientation follows the moving member frame; it is not a transported wood-grain frame through all possible rotations. The small test suite checks endpoint preservation, deterministic preparation, relative thickness effects, finite/distinct fields and operand height correspondence.

Run `./node_modules/.bin/jest explorations/007-branch-workshop/surface.test.ts --runInBand` from the repository root.
