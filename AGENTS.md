# supernool

Stable public release: **019** on `main`. Experimental work is **020** on `codex/iteration-020`; see `RELEASES.md`.

Current playable: `explorations/018-painted-ground/`. Development server: port 3100. Keep the current route working. Nool's separate 2D lab lives in `../nool`; do not put new game work there.

Read `design/current-direction.md` and the current study README before changing mechanics or art. Preserve tactile interaction, both mouse/body modes, the hewn and smooth comparisons, arbitrary subtree correspondence, and the existing checkpoints. New visuals need inspection in the live camera and at intermediate transformation states.

Source art and research live in `../grow-reference-lab-2026-09-06`; import self-contained handoffs into this repo when needed. Do not treat generated concepts as approved by the user. Preserve prompts/provenance.

Use `npm run check`, `npm test`, and checks appropriate to the change. Browser playthroughs require the development server plus Chrome. Use regular commits as requested; do not advance the study number or clone the whole scene for every change.

## Local preview separation

Port 3100 is live gameplay; 3101 is its frozen preview. Both now include the full scenery editor at **Inspect → Scene → Edit scenery**. Both save immutable scene versions and default pointers to this checkout’s `scenes/` directory. Frozen rendering stays fixed until explicitly rebuilt/restarted; saved scene documents are shared live. Use `?scene=<key>` to open another scene definition.

The separate `../supernool-scene-editor` worktree on `codex/scene-editor`, port 3102, is an older editor checkpoint. Its editor was merged here; do not treat it as the only place rock controls exist or reuse its port for another service.
