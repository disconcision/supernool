# Grow / nool — motion and material atlas

September 6, 2026. Six generated concept sheets exploring structural motion and its geometric embodiments. No changes to the 3D prototype. Image-generation prompts and image review notes accompany the final sheets.

## How to read these studies

An **identity** specifies related algebraic expressions. A **structural operation** describes correspondence or change between tree occurrences. A **geometric treatment** makes that change visible. These are different categories. In particular, duplication is not an ordinary arithmetic axiom: it is an event used when depicting distributivity, substitution, and other authorized rewrites. The images propose motion; they do not prove equations or implement a universal tree-transform algorithm.

## Sheets

1. **Motion vocabularies** — sketch atlas of retract/emerge, joint slide, reattachment, exchange, and wrap/unwrap.
2. **Peeling and unweaving** — material interpretations of one-to-many correspondence: ribbons, budding wood, twisted strands.
3. **Containment as architecture** — regrouping boundaries, removing nested shells, and folding out a copy.
4. **Living junctions** — richly painted woody reassociation, with a persistent avatar, joint, and terminal accents.
5. **Inhabitable strata** — sea glass, basalt, and generalized treehouse architecture at landscape scale.
6. **Other kinds of growth** — crystalline and intertidal alternatives; exchange, coalescence, budding, enclosure.

These are deliberately varied. They are not six proposals to implement concurrently. Compare their gestures, silhouettes, seams, and correspondence cues before choosing a runtime experiment.

## More than two candidate primitive sets

These are alternative working vocabularies, not six proven minimal presentations of one algebra. Different preservation requirements give them different expressive scope.

| Vocabulary | Operations | What it emphasizes / limits |
| --- | --- | --- |
| Classical ordered tree edits | Insert, delete-with-child-promotion, relabel | A familiar general edit basis; destructive scripts can lose object continuity |
| Grouping | Retract / emerge | Parent-child nesting; allows transient unranked scaffolds, with the completeness assumptions in the formal note |
| Explicit copies | Grouping plus copy / coalesce | One-to-many and many-to-one provenance; merge requires a correspondence/equality policy |
| Persistent objects | Reattach, exchange, relabel, with creation/removal when required | Moving an existing subtree as an object; reattachment cannot target its own descendants |
| Binary reassociation | Left/right rotation; optional exchange | Rotations connect ordered full binary shapes with fixed leaf order; exchange is an additional change, legal only in suitable semantic domains |
| Construction by substitution | Create a constructor with holes, plug a subtree into a hole, unplug to a hole | Arity-aware construction and generalized building; holes or a workspace forest are intermediate scaffolds; binding-aware substitution is more than visual plugging |

A geometric layer may add slide, peel, unzip, twist, unfold, grow, or absorb as implementations of these operations. There is no requirement that every visible movement be a primitive tree edit. Ordinary movement of an unchanged embedding may not be a tree edit at all.

## Rewrite examples to keep in view

The current toolbox was inspected directly in `src/data/Tools.tsx`. It includes nine named transforms; each has a reversible representation in the app. The following uses conventional symbols instead of its emoji encoding.

| Example | Status | Structural questions to test |
| --- | --- | --- |
| a+(b+c) ↔ (a+b)+c | Current: associate_plus | Junction continuity, regrouping while preserving operand occurrences |
| a+b ↔ b+a | Current: commute_plus | Order exchange, crossing versus contact |
| a ↔ 0+a | Current: identity_plus | Emergence of an operator and neutral operand around retained content |
| ab ↔ ba | Current: commute_times | Same exchange event with a different operator/material language |
| ab+ac ↔ a(b+c) | Current: distribute_times_plus | Copy/coalesce provenance and changed operator scaffolding |
| 0 ↔ a+(-a) | Current: inverse_plus | Paired emergence / cancellation; reverse construction needs a choice or binding for a |
| a(bc) ↔ (ab)c | Current: associate_times | Reassociation across a second material or region |
| a ↔ 1a | Current: identity_times | Neutral scaffold with a distinct identity marker |
| a ↔ -(-a) | Current: double_neg | Two unary wrappers; suitable for shell peeling / unwrapping |
| a·0 → 0 | Future arithmetic example | Discard an entire subtree while retaining the zero occurrence |
| x^(m+n) = x^m x^n | Future exponent example; positive integer x,m,n | Repeated base occurrence and exponent decomposition |
| (xy)^n = x^n y^n | Future exponent example; positive integers | Repeated exponent occurrence; do not confuse base and exponent ports |
| (x^m)^n = x^(mn) | Future exponent example; positive integers | Nested exponent constructor becomes exponent product; operator changes, not ordinary rotation |
| (λx.t) u → t[u/x] | Future lambda example | Capture-avoiding substitution; u is copied, retained once, or discarded according to occurrences of x |
| fst(pair(a,b)) → a | Future data example | Select one branch and discard context; no blanket equality outside the chosen semantics |
| map(f, xs ++ ys) = map(f,xs) ++ map(f,ys) | Future functional example; pure total f, finite lists | A distributivity-like pattern outside arithmetic, with a copied function occurrence |

The current source also contains a separate, non-default maker collection: hole filling and wrappers. This is a useful connection to the construction-by-substitution vocabulary; it should not be described as already active world-building gameplay.

## Exponential algebra reference

The remembered result is Tarski's high-school algebra problem: whether the familiar eleven identities derive every identity in 1, addition, multiplication, and exponentiation that is true over positive integers. Wilkie showed they do not. This is a statement about completeness of an equational axiom system in that language/domain, not a limitation of a graphical edit vocabulary. We should avoid conflating the two notions of completeness.

Reference: [A SAT Attack on Tarski's High School Algebra Problem](https://arxiv.org/abs/2608.08421), which states the problem and Wilkie's counterexample. The art sheets intentionally do not try to render that large counterexample as if it were a small legible tree.

## Selection criteria for a next prototype

- Can you identify surviving operands before and after the move?
- Is a copy visibly related to its source?
- Does a crossing look different from a junction?
- Do thick forms meet through a convincing seam, collar, or shared surface?
- Can a local edit happen without the whole landscape rearranging?
- Can the motion be scrubbed backward, with no ambiguity about where objects came from?
- Are there readable places for symbols, attachments, and an avatar?

See [the formal working note](../../design/grow-tree-motion-calculi.md) for assumptions and the two-operation reachability argument. SDFs remain optional tools for selected surfaces, boundaries, and magical effects.
