# Nool → supernool

Migration: 2026-09-06. Owner requested a separate Supernool folder and GitHub repository, all current work committed and pushed.

Source: `disconcision/nool`, branch `main`. Earlier tracked base: `dc17cbe`. Preservation commit: `e8b38bc` (integrated world, dependency changes, and existing local lab changes). The original Nool repository retains that history and its 2D app.

Moved out of Nool:
- All of `explorations/`, including studies 001–018, generated concepts, archived iterations, imported assets and review screenshots.
- Game-specific design notes: `current-direction.md`, `grow-deformation-and-creation.md`, `grow-tree-motion-calculi.md`, `tactile-interaction-roadmap.md`, and `design/conversations/`.
- The `src/world/` prototype, now in `legacy/nool-world/src/world/`. Its dependent Nool code and original configuration were copied into the legacy snapshot so it remains runnable without a sibling checkout.

Shared recording `src/assets/sfx/tiup-comm-out.wav` was copied to `assets/audio/`; studies 017 and 018 now use that local path. No symlink or runtime dependency points back to Nool. Historical prose can still mention its original locations. The separate art/reference workspace has not moved.

Current game and catalogue branding is supernool. Earlier study titles, original prompts, transcripts and authored asset names remain historical evidence. The current scene stays at 018 and retains its route; port 3100 now serves this repository.

The initial GitHub repository is private because this working archive includes design conversations and reference material. This is not an assertion that every archived asset is suitable for public redistribution. Source metadata and authoring prompts are retained.

Verification: the original Nool app and the frozen integrated prototype both build. Supernool passes TypeScript checking, 738 legal-rewrite checks, 30 regroupings over 1,200 sampled frames, and full mouse/body and body-only six-rewrite browser playthroughs. The production preview loads the painting, both character assets and the renamed HUD without failed requests or runtime errors. Asset URL construction was made statically discoverable so Vite includes the models and paintings in its output.
