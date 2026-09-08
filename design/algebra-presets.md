# Algebra presets · September 8, 2026

Encounter → Tree problem selects one of twelve problems. Switching restarts the encounter, undo history and recovery trace using that problem's original host tree. Reset tree resets the selected problem. The selection is a control preference: it survives reload in the same tab and can be included in Settings & presets → All controls → Set as app defaults. It does not save a partially solved expression. Existing saved defaults remain unchanged unless explicitly saved.

The library covers identity removal, arithmetic, factors on either side, matching compound subtrees, multiplication regrouping, zero absorption, signed integer coefficients, cancellation through a zero coefficient, expansion before collection, and two independent sets of like terms. The original clearing remains the first/default problem.

The two new Noolbox groups are **Zero absorbs a product** and **Distribute into a sum**. Distribution and common factoring provide both directions of distributivity, though each has its own physical gesture and toggle. Draw a sum junction toward its multiplying parent to unfold two products; bring matching factors together to refactor. Draw a whole branch toward a zero factor to absorb it. New subtree copies get distinct occurrence IDs and explicit source correspondence; recovery replays the same geometry backward.

Targets allow associativity and commutativity at both binary operators. They do not silently calculate numbers, discard identities, or accept every expression with the same numerical value. This is a simplification game over commutative arithmetic, not yet an axiom-selectable proof checker. In particular, disabling swap in the Noolbox does not change the target equivalence relation or the assumptions of common-factor matching.

## Next operations and boundaries

- Inverse identity insertion (`A → A + 0`, `A → A × 1`) has no unspecified operand. It fits binary geometry; the open design issue is an insertion gesture that remains discoverable without overwhelming existing contacts.
- Negative integer coefficients already use ordinary numeric atoms. General negation and `A + (−A) → 0` deserve a unary term type, a distinctive sigil and an understandable one-child branch. Encoding negation as `(−1) × A` could precede that, but is a different visual vocabulary.
- Natural-number powers are the next useful binary operator: `A¹ → A`, `A² → A × A`, and combining powers of the same base. A fork can represent the topology, but the exponent must be visually distinct from an equal-weight operand. Operator dispatch, formatting, evaluation and goals currently explicitly support only + and ×. General real/complex exponent identities need domain restrictions; zero powers require a convention about 0⁰.
- `0 → A + (−A)` has a metavariable that does not occur on the left. The rewrite engine can apply it after a choice, but the UI needs an explicit binding step. One possibility is borrowing an existing subtree with the other hand; another is a small term construction slot. Don't enumerate every possible A as drag directions.
- Equations, assumptions and proof goals need a representation beyond a single expression. Rewriting either side, applying a function to both sides, cancellation and conditional laws should produce inspectable justification records.
- The present scene caps resulting expressions at 31 nodes. This is a practical layout/rendering limit, not an algebraic restriction. Hints search at most 8,000 states to depth 12 and may fail to find an existing route, especially with disabled rules or a pin. Numeric calculation currently stays within safe integer results; exact fractions and arbitrary precision need a numeric-domain change.

## The additive commutativity example

With a multiplicative identity, additive-group laws and both distributive laws suffice to derive additive commutativity. Expand `(1 + 1)(a + b)` in the two directions to obtain `(a + b) + (a + b) = (a + a) + (b + b)`. Associativity and cancellation of the leading a and trailing b leave `b + a = a + b`. This does not assume commutativity of multiplication. Without the unit assumption, the general claim fails.

See [Y. Vorobets, Modern Algebra I, Lecture 19, Problem 3](https://people.tamu.edu/~yvorobets/MATH415-2021A/Lect3-07web.pdf). A proof mode for this example must disable implicit commutative goal comparison as well as the explicit swap rule. The current game is intentionally not presenting that stronger guarantee.

## Paused work

Audio buzzing remains unresolved. The user reports both a return after unmuting and a different buzz after sustained playback. The context-recreation mitigation was insufficient. Audio investigation is parked; retain the current work and resume with layer isolation and actual listening when requested.
