# supernool

A playable, tactile world of transforming trees and structures. Supernool grew out of [Nool](https://github.com/disconcision/nool), which continues as the 2D interaction and symbolic manipulation lab.

## Run

Use Node.js 20 or newer.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:3100/>. It leads to **018 · Painted ground**, the current playable scene. Its existing URL `/explorations/018-painted-ground/?mode=body` still works. The [study catalogue](explorations/index.html) retains experiments 001–018, generated concepts, diagrams, review notes and screenshots. Earlier names are historical; current and future game branding is **supernool**.

Walk toward the tree; press Space to enter hand control. Arrows choose contacts, hold Space and move to pull, then release to commit. Escape exits. Mouse interaction is also available. The three corner marks open controls; Inspect includes appearance, sound, performance and a [symbol library](explorations/018-painted-ground/symbols.html).

## Check and build

```sh
npm run check
npm test
npm run build
# With the development server running and Google Chrome installed:
npm run test:browser
npm run test:body
```

The production build includes the current playable scene, its review pages and catalogue. Historical interactive studies are available through the development server; the production build is not a complete export of the research archive. Browser checks use Playwright's Chrome channel and may refresh recorded screenshots.

## Where things live

- `explorations/018-painted-ground/`: current game, geometry, interactions, character integration and local assets.
- `explorations/`: preserved studies, concepts and visual evidence. Study numbers identify experiments, not Git versions.
- `design/`: direction, open questions and a saved discussion snapshot. Read `design/current-direction.md` before changing the visual or interaction approach.
- `assets/audio/`: shared recorded sound copied from Nool.
- `legacy/nool-world/`: original integrated Solid/Nool world prototype and its required 2D code, preserved independently. Run `npm ci` there, then `npm run dev -- --port 3101`, and visit `http://localhost:3101/?world`.
- `MIGRATION.md`: provenance and repository split details.

The separate art research workspace remains in the sibling `grow-reference-lab-2026-09-06` directory. Imported character and terrain handoffs used by the game are included here; their provenance accompanies the assets. That research task and its larger reference archive have not been relocated.

Keep meaningful changes in Git commits. Preserve useful studies, but do not duplicate the entire playable scene for every adjustment. The current study stays at 018 until a new study warrants another number.
