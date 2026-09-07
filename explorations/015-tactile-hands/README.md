# 015 — A hand on the tree

A separate tactile version of the playable clearing. Study 014 is preserved unchanged as the menu/algebra checkpoint. The user completed that challenge and found the scene acceptable, but explicitly identified physical manipulation and manifested hands as missing core features. Treat tactile interaction as central to the project, not optional decorative animation.

## Interaction

Hold a visible rune with the mouse. Possible destinations appear in world-projected rings. Drag toward a destination to drive the rewrite's continuous pose. Pull back to reverse. Release near the destination to commit the immutable AST change; release elsewhere or Escape to return to the original expression. There is a short settle on release, not a full autoplay rewrite. The other hand braces a junction or receives a matching branch. Tab exchanges the leading hand while holding or focusing the scene.

`G` grabs/releases the selected rune; arrows then move the held hand. WASD walks Lehi, and during a keyboard grip projected body displacement contributes to the pull. Holding Space is an alternative to the latched G grip. Click a rune without dragging to select it; the whole-tree list provides another selection route. Click ground to walk, right-drag to orbit, wheel to zoom. The camera is held still during a grip so its projection cannot inadvertently change the gesture.

The default interaction needs no operation buttons. “Suggest a grip” indicates a source and a destination but does not apply anything. “Show a possible gesture” remains a collapsed aid for learning valid moves. Undo/redo, appearance, spatial settling on approach and the full challenge remain available.

## Contact vocabulary

- Swap: grip a child branch, carry it around its sibling; the other hand braces their parent.
- Regroup: pull the inner operator toward its new root location; the other hand supports the old root. Stable operator IDs exchange roles.
- Identity: press the zero (or multiplicative one when present) into its junction.
- Factoring: bring the duplicate factor toward the retained factor; both ends of the duplicated member converge with the retained member rather than becoming a thin disconnected needle.
- Arithmetic: gather literal operands into their junction; one hand pulls, the other follows the receiving numeric branch.

`gestures.ts` derives contacts from actual applicable rules. Nested factors are one grip, not one grip per descendant. The same six-move simplification as 014 is possible entirely by dragging: 13 nodes to 5, uncovering `5*x + y`.

This is constrained direct manipulation, not a physics simulation. Screen-space displacement controls progress along a rule-specific geometric path; the tree may travel in depth while the input guide is projected in 2D. Destinations are proposed by the algebra. Moving back near the source lets another direction be chosen. Nearby destinations are pruned, preferring reduction gestures; not every algebraic variant is necessarily available from every contact at every camera angle. The collapsed gesture aid and other grips provide alternatives. No collision-free motion is promised.

## Lehi and references

Read-only sources from the task **Develop Grow art-direction bible**:

- `/Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/concept-v02.md`, especially avatar/hands and symbolic embodiment sections.
- `feedback/hands-response.json`: oversized and expressive; tool-like plus magical, not necessarily dark armor. A brace/pull relationship is explicitly a promising open experiment.
- `avatar-scale/scene.js`: provisional short blue-green mantle silhouette, visible small arms and separate auxiliary hands.

`lehi.ts` adapts that short-mantle idea into this scene, with visible legs, ordinary arms, head/hair, and oversized articulated slate-like tools. Each tool has exactly three fingers plus one opposed thumb. The fingers curl on contact and hands return to open resting poses. This is a provisional blockout, not an approved final character design. The second hand is automatically placed, not independently controlled or simulated as a mechanical constraint.

Sigils now offer inscribed polygonal stones or the simple discs. The stone treatment is a small code-generated exploration prompted by the reference direction, not a claim to reproduce or settle the other task's concepts. Richer sigil embodiment and concept comparison remain open.

## Rendering and limits

Retains the worker surface pipeline, hewn/cel/smooth materials and variation controls. Held poses are quantized to 48 progress steps; unchanged holds reuse the mesh. Sampling 80 is the play default. Worker latency can cause the visual tree to trail fast input. Hands follow the returned mesh pose so they stay attached to what is drawn. Smooth settle completion explicitly requests its final frame, including on cancellation.

Remaining limitations: generic associativity junction motion rather than all the specialized 012/013 variants, no independent second grip, no surface collision solver, no terrain-following roots, no save, and no freeform deformation outside valid rule paths. Avatar walking uses simplified boulder collisions without pathfinding. The small algebra remains a standalone typed subset rather than an integration with nool's full rule engine.

## Validation

- Browser: six consecutive mouse drags completed swap, regroup, two identities, factoring and arithmetic; 13 → 5 nodes in 6 moves.
- Browser: WASD body displacement during a latched grip changed the held progress; Escape restored the term.
- Browser: a keyboard-held swap was inspected near 40% progress; reversal reduced progress, exchange-hands input was exercised, and early release restored the original term with 0 moves and unlocked controls.
- TypeScript scene/worker checks; algebra regression checks covering 738 offered moves, finite sampled poses, stable route occurrence IDs, physical contact mappings for all six route moves and release threshold checks.

Source of future work should be these findings and user feedback, not an assumption that the current hands, sigils, or motion are final.
