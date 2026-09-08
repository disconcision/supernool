# Rule tiles and problem cards · study 019 / interface 01

The scene now exposes Encounter → Browse tree problems, a modal card library retaining the original select as its settings/persistence control. Cards show the initial/target expressions, a verified reference route length, initial/final node counts, peak size in route details, and rule tiles derived from that route. All problems remain selectable. Compact identity-bar tiles appear beside the existing Noolbox checkboxes. Keyboard/pointer input inside the catalogue stays out of the game; Escape closes it and returns focus to the launcher.

`explorations/018-painted-ground/rule-workshop.html` is the standalone comparison page, linked from the library and the main study catalogue:

- A: Formula stamps, stacked source/target expressions and a small downward arrow. The earlier scene implementation, retained for comparison.
- A1: Compact identity bars, with equal expressions separated by a horizontal rule sized to their average measured width. Both the study and playable scene now use this treatment.
- B: Pocket seals, short mnemonic symbols inside a hexagonal outline. These need a learned legend and are not full equations.
- C: Branch marks, tiny SVG gesture mnemonics. These are not executable rewrite diagrams.
- D: Flat porcelain tray, a restrained white menu containing the tiles.
- E: Shallow relief tray, CSS perspective/depth and gently floating tokens. Hover/focus lifts a token. This is CSS, not WebGL or game-world geometry.

The page compares all eleven rules, includes 40/56/80-pixel specimens, and lets the user change token language, depth, motion and equipped selection. The two tray mockups share local page state. The known-route list responds to that selection; it never changes the game's inventory or settings. Reduced-motion preference disables animation. No new generated raster assets were needed for this pass.

## Meaning of the statistics

`problem-metadata.ts` stores replayable witnesses with a tree path, rewrite-rule group and structural result per move. The generation command is `npm run problems:metadata`; it runs offline. The browser only reads the resulting metadata. The core test suite independently replays the stored moves with the actual algebra engine, checking legality, node identity uniqueness, rule sets, sizes and target success.

Reference move counts are upper bounds on minimum move count. They are not lower bounds or globally proven minima. Rule sets are known sufficient sets, not necessary axioms or a complete list of alternatives. The schema permits multiple routes per problem, with different sets. The current generation records one route for each preset; a limited alternate search does not establish uniqueness.

`includesRules` and `canSolveWith` provide set-inclusion predicates for later progression. The study illustrates strict inclusion between three sufficient collections. This does not impose a total order on problems or assert that bigger collections imply more difficult puzzles. Ownership, equipment and proof assumptions remain separate future concepts. No locks, pickups, progression persistence or 3D inventory integration are implemented.

## Verification and preservation

Inspected the catalogue over the real scene, the formula/seal/motion comparisons and both trays. Checked card selection updates the existing problem control, Escape returns focus, all eleven Noolbox inputs retain their tiles, and removing factoring updates both tray selections and the known-route list. Type checks and the full core suite pass. Concurrent touch-input work and existing user app defaults were preserved.

## Compact bars and simultaneous equipment review

The inventory section now keeps the tray and supported-problem list beside one another. Pocket and hovering trays are switchable views of the same selection; the result list scrolls independently. Removing factoring was checked to change the supported count from 12 to 4 without leaving the tray. Branch marks now mask connecting strokes with opaque paper discs beneath their tinted node circles, keeping the glyphs readable.

All current algebraic laws are equalities, reversible mathematically. Available game moves are narrower: commutativity and associativity work both ways, expansion and factoring are separate equipped actions, and identity removal, zero absorption and numeral evaluation currently run toward simplification. The compact bar is a graphical identity separator, not a division symbol or a new directional inference rule. No inverse actions were added in this UI pass.

The scene integration uses tighter 49×32-pixel card badges and 53×34-pixel inventory badges, with reduced surrounding space. Existing text still states the available move directions; the equality tile does not promise both directions are implemented. For future rule-schema and progression discussion see [the rewriting systems roadmap](rewriting-systems-roadmap.md).
