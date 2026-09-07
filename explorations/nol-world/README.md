# nool: inhabited expressions — first studies

A separate rendering and interaction sketch, September 5, 2026. This directory is additive; the HTML prototype and the unfinished `src/world` work were not edited. The repository was on `main` with existing uncommitted world changes when this exploration began.

## Open

From the repository root, run `npm run dev -- --port 3100`, then visit <http://localhost:3100/explorations/nol-world/>. The running review session uses <http://127.0.0.1:3100/explorations/nol-world/>.

Standalone build: `./node_modules/.bin/vite build explorations/nol-world --outDir /tmp/nol-world-study-build`. The ordinary project's build does not include this extra entry point. Serve the resulting directory with a static HTTP server. No new dependencies were installed; this uses the Three.js already present in the working tree. Fonts are optional Google Fonts requests with local fallbacks.

- `index.html`, `style.css`, `study.js`: interactive geometry study.
- `concepts.png`: generated art direction sheet. This is aspirational art, not a screenshot of implemented gameplay or an exact expression diagram.
- `image-prompt.txt`: exact prompt, generated using the built-in imagegen tool.

The interactive study shows five stable visible objects representing `(a + b) + c ↔ a + (b + c)`. Click Rebranch, or drag any plate/rune horizontally, to preview and commit the whole structure's morph. WASD/arrows move a hovering avatar; E/Q change elevation. Hold Space while moving sideways to drive the same morph through the avatar and an extended hand. Drag the background to orbit; scroll to zoom. Isometric, perspective, and follow cameras are available. Plate materials switch between translucent glass-like shading, resin, and stone colors. Scale and separation controls explore size and depth.

This is a deliberately restricted interaction mockup: no pattern matcher integration, general rewrite enumeration, physical force, proximity restriction, walkable collision surfaces, inventory, sound, persistence, undo stack, or two independently controlled hands. Rebranching is associativity, not reduction; it does not shorten the term. Intermediate animation geometry is a visual interpolation, not an intermediate valid AST. Stone and glass are simple material studies, not production textures or physically accurate refraction. Vertical/canyon branches use wood regardless of the plate material setting. The canyon is not yet a solvable gate.

## What the project history suggests

The existing world renderer bridges rasterized DOM trees and a live screen overlay. Its comments and Claude history document substantial effort around activation jumps, disappearing sprites, drag animation, and approach stutter. These problems arise from maintaining two presentations of one object. A game-native renderer can keep the same geometry present before, during, and after interaction.

The strongest reusable elements are the term representation, stable identity, pattern matching/substitution, rewrite rules, and lessons about whole-scene morphs. The HTML-specific snapshot measurement, singleton DOM ids, scaling rules, and drag overlays should not define the new game's architecture. Extraction should follow a dependency audit: the current Transform type carries sound callbacks and the wider application mixes effects with actions. Share a pure rewrite kernel, not the entire app.

Claude's project history records a larger progression: rules as inventory; macros and tactics as syntax; eventually rewriting aspects of the world and interface itself. This aligns with the current request. The Obsidian `Nool.md` note contains a related-work link but little additional design detail. No personal logs were copied into this deliverable.

## The representations

| Representation | What makes the tree readable | Physical interaction | Main uncertainty |
| --- | --- | --- | --- |
| Glass terraces | Child footprints inside parent boundaries; height marks nesting; operator on exposed landing | Hover between layers, pull a terrace, stand on an opaque landing | Transparency and overlap may hide parentage from low cameras |
| Resin terraces | Same topology, clearer solid silhouettes and friendly rounded edges | Tactile pushing, squeezing, sliding; small local puzzles | Can feel like a toy interface unless grounded in terrain |
| Moss/basalt terraces | Nested shelves become landscape and walkable strata | Run across a term; move a subtree as a terrain mass | Carrying the player during a rewrite; traversability when topology changes |
| Living algebra | Rooted stems, visible forks, rune at each operator; leaves carry atoms | Fly on a shallow interaction plane; graft or bend branches | Reparenting must read as a relationship changing, not a twig teleporting |
| Canyon graft | Same stems oriented out of a cliff; silhouette occupies a route | Fold branches out of the passage or grow a crossing | Algebraic equivalence alone does not guarantee an opened route |

The images explore a more radial terrace vocabulary and distant landscape scale. The live study begins with rounded rectangles to retain the current containment language. Next shape experiments should compare radial sectors, smooth lobes, and fractured shelves using the same expression and camera. Child order must remain explicit even in a radial layout; a full circle can misleadingly suggest commutativity.

The biological version should keep decorative twigs subordinate to semantic branches. A rune belongs to one branching joint; nonsemantic foliage must not look like additional operands. Color may reinforce depth, but should not be the only source of parentage or identity.

## My recommended direction

Start with **inhabitable terraces, with woody connectors where containment becomes ambiguous**. That offers a gradual path from the existing visual language into something spatial. Keep the living-tree and canyon styles as alternate projections or regional vocabularies until we know whether switching them helps understanding.

Use a comfortable three-quarter orthographic camera for editing. Offer perspective for exploration; retain a stable focus point and apparent object size when switching. In the study switching cameras is immediate and follow is a simple offset camera. A polished transition is still to do. Keep manipulation effectively two-dimensional at first: a picked surface tangent plane for plates, a shallow vertical plane for upright trees. A 3D environment does not require unconstrained 3D target selection.

Both input methods should produce the same intent: grabbed node identity, gesture direction, candidate rewrite, and progress. The mouse moves a manifested hand. Avatar motion supplies the same gesture while a modifier engages the hand. The current sketch lets either gesture drive the one candidate globally; a playable version should require a selected grip and sensible reach. A second hand can later pin context, which is easier to understand than two independent unconstrained cursors.

Treat force as a way to choose and preview legal rewrites, rather than allowing arbitrary physics to mutate the term. Keep semantic state discrete; interpolate render state. At release, commit one legal candidate or return to the original. Stable identities and copy/merge provenance should determine what bends, grows, or disappears. This preserves the whole-scene morph behavior emphasized in earlier work.

Size should create traversal and coordination challenges, not merely require a longer key hold. Large terms could require reaching a grip, anchoring a second hand, or acquiring a useful rule. A parent-relative attachment can carry an avatar on a moving plate. Deleting the plate beneath the avatar needs an explicit continuation: reattach to a surviving surface, hover briefly, or reject that move until the player is safe. Those are gameplay choices, not renderer details.

Keep spatial layout independent of expression size: a reduction should alter actual occupied geometry, not just an arbitrary radius computed from node count. Some rewrites grow a bridge; some open a route by rearrangement without reducing size. Avoid making 'smaller is always better' the reward system.

## Engine and repository choice

My recommendation is **Three.js + TypeScript for the next playable experiment**, with an independent frontend here and a pure shared term kernel extracted when the first real rewrite is integrated. Reconsider a separate repository after the boundary stabilizes. The current language and dependencies make comparison cheap, and procedural geometry is central to this game.

Three.js provides the camera/rendering primitives needed here, including orthographic and perspective cameras; game simulation and character systems remain our responsibility. Sources: [Three.js cameras](https://threejs.org/manual/en/cameras.html), [scene construction](https://threejs.org/manual/en/creating-a-scene.html).

**Babylon.js** is the strongest web alternative to evaluate if we want more integrated game facilities. Its official specification lists WebGL/WebGPU and Havok physics integration. I would compare it on an actual moving-platform/character scene before migrating. Source: [Babylon.js specifications](https://www.babylonjs.com/specifications/).

**Godot** becomes attractive if an editor-centric, native-game workflow matters more than browser-native integration. Its current web export uses WebGL 2 / Compatibility, and Godot 4 C# projects cannot currently export to web. GDScript plus a ported or bridged term kernel is viable, but that is extra work without resolving the main open design question. Source: [Godot stable web export documentation](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_web.html), checked September 5, 2026.

Blender is unnecessary for these procedural topology experiments. It can later help author the avatar, hands, bark details, and modular cliffs for glTF export. No Blender MCP installation is needed to review this pass.

## Next playable slice

One small terrace expression beside one gap. One avatar with walkable surfaces and temporary hover. Two legal moves: an associativity move that changes reach, and a reduction that removes an obstruction. Both mouse-hand and avatar-force input. A small rule inventory. Preserve node identity and carry the avatar during morphs. Judge the result by whether a player can predict what a gesture will do before releasing, and whether changing the expression feels like changing the world.

The most useful next art decision is whether the terraces feel primarily like **small objects in a landscape** or **the landscape itself**. Both are in the concept sheet; they imply different initial avatar scale and movement pacing.

## Verification

Built successfully with Vite as a standalone entry. Browser inspection covered all three scenes, rebranch button, pointer drag committing the opposite association, plate material switching, perspective and follow cameras. No runtime errors were reported during these checks. An initial shadow-mode deprecation warning was corrected to PCFShadowMap. Build reports the expected large Three.js bundle warning (about 594 kB minified / 153 kB gzip); no bundle optimization attempted in this sketch. Keyboard control is implemented; sustained movement, collision, touch, and gamepad acceptance testing remain outside this first pass.
