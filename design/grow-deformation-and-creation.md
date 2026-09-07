# Grow: deformable structures and user creation

Discussion record, 2026-09-06. User intentions below are exploratory, not a finalized implementation commitment. See [conversation snapshot](conversations/2026-09-06-grow-exploration.md) for the original wording and preceding context.

## User direction

- Begin with a meaningful skeleton: branching, containment, or a combination. Generate a coherent deforming body around it; attach richer detail to that body and skeleton.
- Consider metaballs / signed distance fields / implicit surfaces, including for hybrid 2D/3D structures. They need not define every object or the entire renderer.
- The current Three.js study has awkward intersecting geometry. First make the core transformation read as a solid structure melting, folding, splitting, or fusing. Matter conservation is not a requirement, but visual coherence is.
- Details may deform, duplicate, combine, or travel with the structure. The hope is that a convincing core carries much of the visual result; this remains something to test.
- Dreams is an important reference for expressive creation and an aesthetic that accommodates amateur, playful, strange work. Minecraft is a useful contrasting example of a construction vocabulary.
- User content creation is a major long-term theme, not incidental customization. Players should eventually gain broad freedom, even if the initial experience is more constrained and art-directed.
- A home / generalized treehouse could be a structured place to attach rooms, objects, furniture, and further structures. Nesting and construction should evoke algebraic data types and Lego while permitting organic forms.
- Whether term rewriting governs home layout, decoration, and all building actions is open. Ordinary object placement and other formal systems, potentially cellular automata, may coexist. Do not force every decorative act into an algebra puzzle.
- The conversation itself is research material and should be preserved along with sketches and reference images.

## Assistant technical interpretation — proposed, not decided

Keep distinct representations for the symbolic term (meaning), spatial skeleton (layout and attachments), surface (visible body), and decoration. Stable identities and explicit correspondence across rewrites connect them. An AST is not a rigging skeleton, and neither is necessarily identical to the scene graph.

Metaballs combine influence fields and display an isosurface. An SDF encodes signed distance to a surface; its zero set is the boundary. Both support implicit modeling, but they are not identical. Blends and deformations may cease to be exact distance functions; ray-marching assumptions must account for that.

An implicit shape can be polygonized into a regular mesh, or rendered by ray marching. Choosing implicit modeling does not require abandoning Three.js or replacing the entire renderer. A hybrid with curve-generated branches and small implicit junction regions is another candidate.

The surface representation does not solve transition choreography. Plain field interpolation can shrink, dissolve, or accidentally bridge nearby limbs. Scope blending by intended semantic connection, not proximity alone. For reparenting, investigate moving a junction along an existing branch while preserving coherent connectivity, then settling the new branch arrangement. Surface topology may change at a pinch or fusion; this need not imply a smooth one-to-one material mapping.

Decoration needs persistence rules. Anchor moss patches and strokes in branch-local coordinates with stable seeds; avoid resampling all detail every frame. Keep authored objects associated with stable supports rather than transient mesh triangle indices. Copy/merge/deletion need explicit treatment. A chair should move rigidly with a support or be reattached; it should not melt just because the supporting wood does.

Evaluate a single untextured Y-junction reparenting before doing more art treatments. Compare curve meshes, a shared implicit skin, and (if useful) curve meshes with an implicit junction. Inspect silhouette, unintended fusion, stable runes, and reversible scrubbing. Add one moss patch and one rigid attached object to test whether the proposed detail strategy actually works.

## References

- [Alex Evans / Media Molecule, SIGGRAPH 2015](https://advances.realtimerendering.com/s2015/): the Dreams research presentation describes CSG scene descriptions evaluated into signed distance fields and dense multiresolution point clouds. This is a historical research presentation with abandoned approaches, not a complete specification of the shipped renderer.
- [Media Molecule's announcement of the talk](https://www.mediamolecule.com/blog/article/siggraph_2015).
- [Three.js marching-cubes example](https://threejs.org/examples/webgl_marchingcubes.html): an existing example of implicit surface meshing within Three.js.

## Transcript storage observation

This task's transcript was verified on disk at `/Users/andrewblinn/.codex/sessions/2026/09/05/rollout-2026-09-05T23-23-52-01a07563-399b-7f62-8731-6ed1b6a17b48.jsonl`. It contains the user and assistant messages inspected, including the latest user message at the time of writing. This observation is not a promise of permanent app retention. The separate `history.jsonl` has documented persistence/size settings; those should not be conflated with a guarantee about per-task rollout retention. The readable snapshot is a normal project file and should be backed up/versioned with the project when appropriate. No automatic export or backup job was configured.

## Follow-up clarification, 2026-09-06

Andrew clarified that SDF/metaball treatments are optional, potentially especially useful for 2D containment, plates, or surrounding magical effects. They are not proposed as the main transformation mechanism. The next proposed investigation is a comparison of structural motion primitives (retract/emerge, explicit split/merge, and useful further operations) and their line, thick-2D, and 3D geometric interpretations. See [tree motion calculi](grow-tree-motion-calculi.md). This supersedes the earlier suggestion to move directly to a 3D junction prototype: formal examples and drawn transition studies come first.
