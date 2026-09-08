# supernool

Current playable: `explorations/018-painted-ground/`. Development server: port 3100. Keep the current route working. Nool's separate 2D lab lives in `../nool`; do not put new game work there.

Read `design/current-direction.md` and the current study README before changing mechanics or art. Preserve tactile interaction, both mouse/body modes, the hewn and smooth comparisons, arbitrary subtree correspondence, and the existing checkpoints. New visuals need inspection in the live camera and at intermediate transformation states.

Source art and research live in `../grow-reference-lab-2026-09-06`; import self-contained handoffs into this repo when needed. Do not treat generated concepts as approved by the user. Preserve prompts/provenance.

Use `npm run check`, `npm test`, and checks appropriate to the change. Browser playthroughs require the development server plus Chrome. Use regular commits as requested; do not advance the study number or clone the whole scene for every change.

## Local preview separation

Port 3100 is live gameplay, 3101 is its frozen preview. The full scenery editor (move/rotate/scale, clipboard, delete, scene versions) exists in `../supernool-scene-editor` on `codex/scene-editor`, served on **3102** with `npm run dev:editor`. It has not yet been integrated into this gameplay branch. Its previous use of 3101 caused confusion when that address became the frozen gameplay preview. Do not reuse these ports or assume the editor never existed because it is absent here. Editor URL: `http://127.0.0.1:3102/explorations/018-painted-ground/?mode=body&rockLayout=enclosed&editor=1`.
