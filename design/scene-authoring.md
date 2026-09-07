# Scene workshop: first usable slice

## Working arrangement

Develop this feature on `codex/scene-editor` in the separate `supernool-scene-editor` worktree, served with `npm run dev:editor` on port 3101. The main `supernool` checkout and its port 3100 server remain available to the other task. A branch name alone does not isolate a shared checkout; the separate directory does. Bring back small verified changes, preserving the other task's work. Saved versions use unique filenames, so independently created versions can merge; competing changes to a scene's default pointer need an explicit choice.

The branch starts with a checkpoint of the art task's previously uncommitted rock work. It does not include the other task's untracked study 019. The main checkout's original files were left in place.

## Interaction contract

Inspect now offers a **Scene** tab. Play and Edit are distinct modes: the game keeps rendering, but game movement and mouse grips do not consume editor input. Click a formation or select it by name; translate in the ground plane, rotate around the vertical axis, scale, or enter numeric transforms. Snapping is optional. A bounding outline and status strip identify the selected formation and active editing mode. Undo/redo applies to layout edits; leaving Edit keeps the draft in the live scene.

The first version edits existing rock formations. Adding/deleting assets, arbitrary mesh deformation, terrain sculpting, and editing the algebra tree's authored starting expression are not implemented. These should be separate tools with explicit permissions and validation, not arbitrary code execution attached to a save file.

Appearance and interaction panels continue to own their settings. **Save version** captures those settings, the active rock layout/transforms, enabled rules, tree seed and camera. **Load version** restores that definition; it is not a save-game checkpoint. Loading over an unsaved draft asks before discarding it. **Use as scene default** only promotes a saved, loaded version, preserving history. A new Scene key gives another scene definition using this same renderer; `?scene=<key>` identifies it in a URL.

Geometry edits refresh the formation collision footprints, idle-hand contact locations, and projected growth. Ground snapping is currently a fixed step grid, not terrain-surface conformance. The numeric height control permits deliberate burial/raising. Existing gate logic stays with the puzzle. The snapshot schema currently references stable IDs from the existing asset layout; changing that asset kit will require schema migration. Layout comparisons share the live objects within a session; reload/load a saved version to return to a known arrangement.

## Durable data and future creator tools

`scene-tools/schema.ts` defines a versioned, validated scene document independent of the panel. `scenes/<scene-id>/versions/<UUID>.json` files are immutable. `default.json` is an atomically replaced pointer to one version. Agents can read the same files the browser saves; no clipboard transcription is needed. User actions decide when a draft becomes a saved version and when a version becomes the default.

The Vite endpoint accepts bounded JSON, validates identifiers/assets/transforms, chooses version filenames itself, and rejects cross-origin writes. It only writes beneath `scenes/`. The endpoint is for local development, not a hosted multi-user service. Static builds bundle the saved data; exporting JSON remains available without the writer.

For user-facing creation, retain the Play/Edit distinction, explicit save/default actions, reversible history, schema validation and data-only documents. Expand the asset registry with stable IDs, per-object capabilities and migrations. Add a scene library with thumbnails/display names, draft recovery, import validation, explicit publishing, and later a storage adapter with account ownership. Keep personal accessibility/input preferences separate from authored scene defaults when that distinction becomes useful; the current dev panel deliberately captures its supported input settings as requested.

## Validation

`npm run test:editor` launches Chrome against port 3101. It exercises a real gizmo drag, numeric edits, undo/redo, input isolation, disk saves, configuration plus layout reload, retained versions, explicit default promotion, malformed input and cross-origin rejection. Test scene directories are uniquely named and removed afterwards. Core checks, TypeScript, production build, and the existing six-step mouse/body playthrough are also run. Review screenshots are in `.cache/editor/`.
