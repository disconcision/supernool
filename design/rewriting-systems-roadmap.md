# Beyond the arithmetic clearing

Retained from the design conversation of 2026-09-08. This is a roadmap and a record of possibilities, **not a claim that these systems are implemented**. Current priority: integrate identity-bar tiles and larger tree presets. The next candidate mechanics experiment is a rule schema with **one extra variable**, supplied initially by the spare hand. Do not silently turn these notes into a mandate to build a universal editor.

## Direction and separations

Supernool supplies a tactile language for manipulating structures. Each encounter can supply a symbolic system, its assumptions, available actions, and a goal. Do not restrict the architecture to numbers, commutative rings, reversible identities, binary operators, or simplification. Groups, sets, functions, logic, arbitrary directional term rewriting and invented systems with good game properties are all in scope conceptually.

The current implementation is narrower: literals (including negative numbers), variables, binary + and ×. It assumes commutative arithmetic, evaluates safe-integer results, and has no general unary negation, division, binding or typed vocabulary. Disabling the commutativity token does not remove all implicit commutativity: factoring matches multiple factor orientations and goal comparison ignores association/order. Those assumptions must become explicit before using this engine to prove commutativity or model noncommutative systems.

Separate:
- Signature: symbols, arities, optional sorts/types, and binding structure.
- Rules: patterns, orientations, conditions and player-supplied parameters.
- Challenge: initial state, goal acceptance, inventory, budgets and limits.
- Presentation: host tree, embedding, sigils, gestures and correspondence of old/new geometry.

No separate “proof mode” is inherently necessary. Goal acceptance is parameterized by both system and challenge. Even if an identity is valid, a challenge may require explicitly demonstrating it. Background equality for matching, implicit execution equivalence, equipped actions, and goal equivalence must not be conflated.

## Problem descriptions and route evidence

A recorded solution provides a **sufficient** rule set and an upper bound on minimum move count. It does not prove necessity, minimality, or completeness. Store alternative routes; some may use incomparable rule collections. If known collections are {A,B} and {A,C}, display those alternatives. A occurring in all known routes is not proof that A is universally necessary.

For inventory availability, remove supersets dominated by smaller sufficient sets to form an antichain of known kits. Keep dominated routes separately when they offer fewer moves or different play. Fewest moves, fewest rule types, maximum intermediate size and easiest physical gesture sequence are different objectives. Global minimality may become undecidable or computationally impractical as the system grows; bounded exhaustive results need their bounds stated.

There is no established finite preset set that “fully captures” the dynamics of the present axioms. Useful coverage axes include each rule/direction, root vs nested application, constants vs compound operands, repeated subtrees, depth/width/asymmetry, competing gestures, independent reductions, cancellations, expansion before collection, and detours made by rearrangement. Repetition for learning is separate from structural coverage. Larger trees need not have longer solutions. The 31-node cap is a provisional guard on expansion, not a measured universal performance maximum.

## One-extra-variable schema: immediate candidate

A+0 → A obtains A by matching. In 0 → A+(−A), A appears only on the right: an **extra variable**, specifically a metavariable ranging over whole expressions. This is not necessarily a free variable of the represented expression, and does not itself require higher-order rewriting. The identity licenses each instance; application requires the player to supply the missing term.

Suggested interaction:
1. Working hand selects zero and inverse-pair introduction.
2. Spare hand samples an existing subtree as the value of A.
3. Preview shows two linked copies, one beneath negation.
4. Completing the gesture commits one rewrite; cancellation leaves zero unchanged.

Sampling copies structure without removing the source. New occurrences get fresh identities and explicit provenance for animation; they are not shared mutable nodes. Both occurrences of A use one parameter value, not two independently filled holes. A may itself contain variables and whole compound trees. The source may be absent from the current expression, so sampling alone is deliberately incomplete.

Later sources for the same parameter slot: construct a term, choose a constant/variable, recall a saved expression. Do not implement these as unrelated mechanics. Preview geometry must carry compound operands coherently rather than recursively collapsing them just because they are complex.

## Construction via holes

A small construction space in the spare hand or Noolbox can expose grammar actions:

    □ → 0 | 1 | x | +(□,□) | −(□)

Construction actions need not preserve mathematical equality. Keep them in a draft parameter until complete, then instantiate the justified identity. In a world that explicitly permits destructive replacement, replacement may itself be a rule. Holes can carry expected types and permitted variable contexts. Two syntactically similar holes may be independent; repeated occurrences of one parameter should instead show linked previews.

Prior art: Hazelnut formalizes typed structure editing with holes and a cursor; contextual modal type theory offers a semantics for holes and their contexts. These are references, not a decision to adopt a full dependent type theory.

## Further machinery to retain

### Matching, unification, conditions
Matching determines a rule's metavariables from a selected subtree. Unification can solve unknowns on both sides and guide incomplete constructions. Choosing an arbitrary term, choosing a typed term, and establishing a side condition are different tasks. For A/A → 1, nonzeroness needs computation, an assumption or evidence; it cannot be inferred solely from shape. Conditional rules may generate obligations rather than apply immediately.

### Binding and higher-order rewriting
Functions, quantifiers, sums and comprehensions bind names. Substitution must avoid capture: replacing free x with y in λy.x needs renaming, not λy.y. Scope and alpha-equivalence require explicit representation; displayed names are insufficient. Genuine higher-order rewriting concerns functions/binders and higher-order substitution, unlike an ordinary metavariable that ranges over expression trees.

### Contexts and inference
Ordinary rewriting closes a local step under an allowed context C[□]. The permitted contexts may be restricted: sealed regions, root-only actions, evaluation order, or typed positions. Assumption contexts Γ in judgments Γ ⊢ goal are different from tree contexts. Inference steps can create several subgoals or temporary assumptions. That offers proof-oriented encounters within the same broader framework.

### Copying, consuming, sharing
Independent copying, shared references, and consumption are distinct. Term graphs permit sharing/cycles; multiset rewriting models collections of interacting entities. Linear logic provides resource-sensitive assumptions. Copying the description of a flame need not duplicate an actual flame. Do not assume tree-only storage covers every future world system.

### Background equations and goal policy
Rewriting modulo equations can treat some structure (e.g. order in an unordered collection) implicitly. Keep that separate from explicit transformations the player must enact. A goal can be an exact term, equivalence under selected equations, or a world-state predicate. A valid theorem should not be silently granted when the goal is to demonstrate it.

### Strategies, derived rules and reflection
Strategies control where/when/in what order to rewrite. Derived rules package verified sequences with parameters and assumptions. A player could record/generalize a successful sequence into a token retaining its derivation. Reflection represents rules and systems themselves as data. These are potential routes toward user-authored spells, not prerequisites for the extra-variable prototype.

### System properties and evidence
Termination, confluence (branches can reconverge), conservation, reversibility, and reachability are design dimensions, not universal requirements. Some puzzles intentionally have irreversible choices; growing worlds need not terminate. Preserve a trace of rule, location, substitution, supplied parameters and conditions. Geometric correspondence is additional evidence for animation, not the mathematical justification itself.

Suggested application record:

    location + rule + matched bindings + supplied parameters
    + satisfied conditions + resulting structure + geometric correspondence

## Ring example as a future test

With additive group laws, multiplicative unity and both distributive laws, additive commutativity follows without assuming it. Expanding (1+1)(a+b) in two orders yields a+b+a+b = a+a+b+b; cancel the leading a and trailing b using additive inverses/associativity. Without the additional unity/product hypothesis, this is not generally true. Existing-subtree sampling plus constants and unary negation should provide the expressions needed for a tactile demonstration; no unlimited supply of novel variables is inherently needed. This is a candidate test, not an implemented route.

## Invented systems and casual wandering

The user wants space for a casual layer alongside staged encounters: wander, make one or a few quick transformations, discover new rules, and combine them on modestly more complex objects. This should not require sitting down to solve a full puzzle every time. Single clicks or short combinations may suit these small world objects; preserve tactile staged-tree controls.

Ideas proposed, not selected:
- Buds that branch, change color, then flower irreversibly: arrangement before commitment.
- Weather vessels: nested shells holding rain, wind and embers, with explicit interaction rules.
- Musical creatures: branch phrases that repeat, reverse, interleave or resolve.
- Courier trees: route/copy/consume messages through changing structures.
- Red/blue nodes: color changes and ordered swaps yield or cost energy.

Energy has no agreed purpose yet. Avoid building a grind prerequisite before deciding what it enables (construction, discretionary growth, tools, etc.). There is an immediate exploit risk if every reversible swap awards energy. A clean candidate is a state potential Φ: energy gained for s→t equals Φ(s)−Φ(t), so closed cycles yield zero. For color/ordering systems, Φ could include red count and a chosen ordering-disorder measure. All moves must use the same potential, including color changes that alter disorder; pricing rules independently can accidentally create profitable loops. Reversals must pay the corresponding cost or be disallowed. External recharge/growth may intentionally replenish the world, but that is a separate explicit input. Costs for intermediate states can be real even when the net cycle is zero.

An alternative is finite per-object stored charge, spent on rewarding interactions and visibly depleted; repeated rewrites then do not mint infinite energy. Open questions: why collect energy, whether regeneration exists, whether payout depends on order, whether this feels like restoration or harvesting, and how light-touch play connects to substantial encounters. Do not implement an economy based solely on this brainstorm.

## References retained from the discussion

- Extra variables / narrowing and rewriting logic: https://personales.upv.es/sanesro/papers/wflp06.pdf
- Maude logical foundations: https://maude.cs.illinois.edu/maude1/manual/maude-manual-html/maude-manual_3.html
- Rewriting modulo equations: https://maude.cs.illinois.edu/maude1/manual/maude-manual-html/maude-manual_62.html
- Reflection: https://maude.cs.uiuc.edu/maude1/manual/maude-manual-html/maude-manual_20.html
- Hazelnut: https://www.cs.cmu.edu/~comar/hazelnut-popl17/
- Higher-order rewriting course: https://www.cs.ru.nl/~cynthiakop/2024_isr/
- Linear logic/resources: https://www.cs.cmu.edu/~fp/courses/linear/lectures/lecture01.html
- Stephen Buckley, A note on the ring axioms: https://archive.maths.nuim.ie/staff/sbuckley/Papers/ring_axioms.pdf

## Local named subtrees and gesture ambiguity · 2026-09-08

See the rendered [interaction notebook](../explorations/018-painted-ground/interaction-notebook.html). The user proposes painting/encapsulating a subtree T, defining a temporary name α ≔ T, folding matching occurrences through a definition tile, and treating them atomically in the UI. Preserve the expansion and its meaning; this is neither lambda abstraction nor a globally free algebraic variable. Start with exact-match occurrences, immutable expansions, local scope and an acyclic definition environment. Goal checks must see through aliases. Decisions still open: lifetime, nested definitions, equality modulo chosen laws, inside editing, costs, undo and recovery representation. No runtime implementation yet.

Hollow crown also exposed almost coincident factor/distribute and absorb/swap targets. Explicit per-grip route selection is now an interim accessibility fallback. Proposed layout optimization should consider angular and pixel separation, stable targets during a grip, branch crossings, movement of unrelated operands and a fallback when too many routes compete. A strict second-hand pin constrains topology and position; it does not protect a subtree as an atomic operand and can prohibit zero absorption.
