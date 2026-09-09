# Project knowledge

Start here for durable explanations, source references, and mistakes we should not repeat. These notes distinguish implemented behavior, user preferences, experiments, and open proposals. They are not a list of universally approved mechanics.

- [Dragology and continuous dragging](dragology.md): upstream algebra example, spatial versus temporal blending, Nool's earlier port, Supernool comparison controls, invariants, ambiguity witnesses, and the deferred exit-anchor proposal for retiring nodes.
- [Interaction mechanisms](../interaction-mechanisms.md): concrete collision examples and a bounded menu of possible remedies; second-hand constraints and named subtrees remain proposals.
- [Rewriting systems roadmap](../rewriting-systems-roadmap.md): rule schemas with extra variables, term construction, matching theories, conditions, goal policies, progression and casual play.
- [Current direction](../current-direction.md): current decisions and corrections across the game.
- [Playable scene README](../../explorations/018-painted-ground/README.md): implementation checkpoints and validation history.

## Maintaining this corpus

For a substantive discovery, update the relevant topic note with the source, the finding, what changed, how it was checked, and what remains uncertain. Mark superseded conclusions explicitly. Prefer a focused topic note over expanding AGENTS.md with historical detail. Link new topics here; add a short conditional pointer in AGENTS.md only when future work could otherwise repeat a consequential mistake.

Repo-relative links are durable project references. Sibling-checkout paths are research provenance, not runtime dependencies. Do not require those external repositories to run Supernool. Do not promote an experimental mechanic or generated concept to an accepted direction without user feedback.
