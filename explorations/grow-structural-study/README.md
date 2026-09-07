# nool: structural studies

This study separates **an algebraic identity**, **a structural edit script**, and **a geometric depiction**. It replaces ambiguous generated storyboards with SVG drawings derived from executable data. Earlier concept art remains in `../grow-motion-atlas/` as material and mood exploration.

Open through the repository's Vite server at `/explorations/grow-structural-study/`. Choose a rule, a primitive set, a nested operand, direction, and projection. Each card is one actual edit; selecting it exposes the operation and its inverse. Individual diagrams export as SVG.

## Semantic endpoints

The ranked term datatype is `Atom(id, symbol) | Binary(id, operator, left, right)`, with operators `+` and `*`. IDs identify occurrences, not values: two occurrences of `a` may have different IDs.

- Commutativity: `a + b ↔ b + a`.
- Associativity: `(a + b) + c ↔ a + (b + c)`.
- Additive identity: `a ↔ 0 + a`.
- Distributivity: `a × (b + c) ↔ (a × b) + (a × c)`.

The last identity is multiplication distributing over addition. Branching/duplication is a structural mechanism used to depict it, not an arithmetic axiom. All examples also accept the composite operand `a := x + y`.

## Motion scaffold

`Tree = { id, label, children: Tree[] }` is an **ordered, unranked** tree. A permanent context node Ω holds the current root or temporary forest. Intermediate scaffolds may contain unary or ternary operator-labelled nodes, or multiple roots. They are not claimed to be valid arithmetic expressions or additional algebraic rewrite steps. Commit only the semantic endpoint.

Let `L`, `C`, and `R` denote ordered lists of children:

```
extend: p[L, C, R] ↦ p[L, n[C], R]
retract: p[L, n[C], R] ↦ p[L, C, R]
```

`extend(parent, index, count, freshId, label)` wraps a consecutive block. An empty block creates a leaf. `retract(id)` removes only that node and promotes its children in order. It cannot remove Ω. Retraction records enough information for exact inversion.

The four-operation vocabulary adds:

```
branch(source, siblingSlot, sourceToFreshIdMap)
merge(keep, remove)
```

Branch copies a whole subtree into a sibling slot, with explicit fresh IDs for every descendant. Merge coalesces structurally equal sibling subtrees, retaining one occurrence. Equality includes labels and child order, but ignores occurrence IDs. Its inverse records the removed IDs and position. Neither operation licenses the algebraically invalid rewrite `a + a → a` by itself.

## How the identities decompose

Associativity retracts the inner addition node, temporarily exposing `[a,b,c]`, then extends that node around `[b,c]`. Three checkpoints suffice. The removed joint ID is restored; continuous persistence of a physical joint is a separate animation decision.

Identity first wraps `a` in an addition node, then inserts zero as its first child. Reverse removes zero and unwraps the addition. The original operand remains intact throughout.

Commutativity in these vocabularies removes the first operand, bottom-up, then rebuilds it in the second slot. Its endpoint IDs are restored, but its continuous existence is lost. This deliberately exposes a limitation: deletion/reconstruction is sufficient for unrestricted finite tree editing, but gives a poor physical account of exchange. Branch/merge does not automatically solve that problem. A future transport/exchange operation should carry the moving subtree, destination slot, and path rather than pretend the reconstruction is a smooth swap.

Distribution exposes `[a,b,c]` under a new sum scaffold, copies `a` after `b`, and wraps `[a,b]` and `[a2,c]` in multiplication nodes. The two-operation vocabulary builds the copy node by node. The four-operation vocabulary copies it as a single provenance-bearing event; reverse uses a checked merge. A nested operand makes the distinction visible. These are illustrative scripts, not a shortest-script search or a general algebra engine.

Unrestricted extend/retract can transform any finite labelled ordered tree into another by retracting to Ω and rebuilding. That observation does **not** imply preservation of meaning, identity, attachments, or geometry along the route. Label changes likewise require replacement in this vocabulary.

## Geometric projections

1. Dots and edges show exact adjacency, with the root anchored and a common frame extent across each sequence.
2. Joints and members thicken precisely that skeleton. They demonstrate structure, not a watertight skin or collision-safe interpolation.
3. Layered plateaus use recursively sized, softly lobed solid shelves. Child footprints fit within the parent in plan, siblings have clearance, and depth adds a slight vertical lift. This is a deliberately homogeneous starting family that can later receive rock, moss, or translucent materials.

A discrete edit need not take the same duration as another edit. No extra near-identical panels are added to imply timing. Automatic layout can move unchanged objects between checkpoints; a future trajectory layer must address that explicitly.

## Next motion experiment

Start with associativity, since its three checkpoints isolate one changing junction while retaining the operands. Define a continuous junction contraction/expansion with persistent operand anchors, then compare that same event on thick branches and layered plateaus. Specify where support, thickness, and attached objects go during the temporary junction. Only after that should peeling or untwisting be introduced as alternative surface trajectories for a precisely identified copy/merge event.

For commutativity, test an explicit transport path separately. For additive identity, test emergence/retraction of a small zero shelf without moving the original operand. Distribution is the stress test for descendant correspondence and attachments, not the first deformation to solve.

## Verification

`model.test.ts` checks all four identities, both vocabularies, both directions, and simple/nested operands: exact target structure, exact operation inversion, nonredundant checkpoints, unique IDs, allowed primitive membership, and sampled endpoint arithmetic. Additional cases cover invalid operations, promotion order, full-subtree copy maps, reconstruction, and plateau containment/clearance.

Run from the repository root:

```
./node_modules/.bin/jest explorations/grow-structural-study/model.test.ts --runInBand
./node_modules/.bin/vite build explorations/grow-structural-study --outDir /tmp/grow-structural-study-build
```

The model is self-contained and does not modify or invoke the existing editor's rule engine. It is a specification and storyboard for a subsequent geometry study, not a new 3D demo.
