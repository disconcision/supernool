# Grow: tree edits as a vocabulary of motion

2026-09-06. Formal and geometric working proposal, not an implementation decision. This responds to Andrew's clarification that SDFs/metaballs are optional surface or effect techniques, not the core transformation calculus. The next work should be formal examples and drawn transition studies before another 3D prototype.

## Three different questions

1. Semantic rules: which before/after terms are validly related? Equality-preserving algebra is one domain; world-building operations may have other semantics.
2. Structural realization: which nodes/occurrences persist, move, split, merge, emerge, or retract between those endpoints?
3. Geometric realization: how do edges, surfaces, symbols, and attachments move continuously through that structural event?

The user is proposing a vocabulary at levels 2 and 3. It should be allowed to have several geometric interpretations. No implicit-surface representation is presumed.

## A precise two-operation basis

For this section only, let trees be finite, rooted, ordered, labeled, and **unranked** (any node may have any number of children). Write `f(T1,...,Tn)` for a node and its ordered children. Place the whole tree under a permanent sentinel `Ω`, allowing an intermediate forest beneath it. Every node except Ω may be edited.

Let L, K, R denote ordered lists of subtrees, possibly empty.

**Retract / ungroup C**

```
f(L, g(K), R)  ->  f(L, K, R)
```

Remove the g node and its edge to f, promoting its children into the same consecutive position. If K is empty, this removes a leaf. It does NOT delete all descendants when K is nonempty. Its geometric interpretation might contract the f–g edge to zero length while retaining the child branches.

**Emerge / group E**

```
f(L, K, R)  ->  f(L, g(K), R)
```

Choose a consecutive block K, possibly empty, and a label g. Insert a new child g that adopts that block. Empty K creates a new leaf. An exact inverse on identities additionally requires remembering the removed node's label, ID, and position; otherwise the inverse recovers only an isomorphic labeled tree.

These are standard node deletion/insertion shapes from ordered tree editing, with proposed motion-oriented names. Classical tree edit distance also makes relabeling a separate operation.

**Completeness claim and constructive proof:** allowing all of those choices and temporary unranked states, C and E connect any two finite labeled trees. Delete source leaves until only Ω remains; construct the target using empty-block insertions, choosing each required label and child position. This proves reachability; it does not preserve identity, operand occurrences, shape, types, or semantic meaning. It is a poor default animation.

If labels cannot be chosen freely, leaf insertion/deletion is forbidden, fixed arity must hold at all times, or surviving identities must remain in order, the claim changes. The assumptions are part of the claim, not small implementation details. C/E alone cannot reorder protected surviving leaves in an ordered tree. A relabel or exchange operation is useful under stronger preservation constraints.

## Four operations with explicit provenance

Add these operations on a child list:

```
SPLIT: f(L, S, R)       -> f(L, S1, S2, R)
MERGE: f(L, S1, S2, R)  -> f(L, S, R)
```

S1 and S2 are structurally identical copies of S, with distinct occurrence IDs and an explicit source-to-copy map for each corresponding descendant. The inverse merge requires structural equality under the chosen equality relation and a correspondence policy. Equality of contents alone does not tell us which of two independently authored objects should survive.

This is **copy/coalesce**, not arbitrary fusion of unequal trees. Unequal geometric pieces may touch without semantically merging. It is also not DAG sharing: sharing has two references to one object, whereas copying gives independent occurrences. A future live-linked copy is a separate operation with different semantics.

Split/merge are redundant for unrestricted reachability, but they add useful meaning to the animation script: one thing becomes two related things, or two occurrences become one. A destructive edit script would hide that information.

Differentiate edge contraction C from the logical structural rule called contraction (which concerns repeated resources/assumptions). The overloaded word should not drive the API design.

## Additional useful operations / macros

- **Slide / rotate a junction:** reassociate without rebuilding the participating operand subtrees.
- **Reattach:** move an identified subtree to a new parent/slot outside its own descendants. It may be treated as one motion macro even if encoded by smaller operations. A temporary attachment or coincident junction can avoid a visibly detached twig.
- **Exchange:** change operand order, when authorized by the semantic rule. Fixed planar ports may require crossing, a moving port, or an out-of-plane excursion.
- **Relabel:** change a symbol without implying destruction of the entire supporting body.

These need not all be fundamental mathematical generators. A small proof basis and a richer motion vocabulary can coexist.

For ordered full binary trees with a fixed leaf sequence, left/right rotations connect the binary tree shapes. That is the narrower reassociation problem studied by rotation distance and associahedra. It does not imply arbitrary labeled algebraic operators are associative, nor does rotation create, remove, or permute operands.

## Worked examples

### Associativity: contraction then expansion

```
+(+(a,b),c)  --C-->  +(a,b,c)  --E-->  +(a,+(b,c))
```

The middle state is an unranked motion scaffold. If + is binary in the term language, it is not a valid intermediate term. The application should commit the authorized endpoint rewrite; it should not feed this scaffold to the term evaluator. A specialized n-ary sum representation could assign it meaning, but that is an additional choice.

Keep a,b,c and the outer context identifiable. To preserve both operator identities visually, keep the retracting joint as a latent/coincident ID at the degenerate moment, then let it emerge on the other side. C/E on plain trees alone does not remember that ID. A junction-slide macro packages that continuity more directly.

Branch picture: the inner fork approaches the parent; their positions coincide; the new fork departs supporting b,c. Containment picture: the inner boundary around a,b retracts; then a boundary around b,c grows. Markers a,b,c remain identifiable throughout. Whether they remain spatially fixed is a separate layout choice.

### Distributivity: split plus rearrangement

```
×(a, +(b,c))  ->  +(×(a,b), ×(a,c))
```

Provenance: a has two output occurrences; b,c each survive once; the sum operator may retain identity as it becomes outermost; the multiplication structure becomes two occurrences. The precise operator-ID assignment is a design choice to record, not infer from visual nearness.

Two-operation script: remove and create the affected scaffolding, potentially rebuilding copied content. Four-operation script: visibly split the a subtree (and multiplication structure), then arrange the two resulting products around b,c. Same legal endpoints, different explanatory motion. Reverse factoring coalesces matched copies. This is a composite motion proposal, not a claim that the unranked microsteps individually preserve value.

### Identity elimination / emergence

```
+(a,0)  <->  a
```

A retracting operand branch and collapsing operator scaffold can show elimination; the reverse grows both. It is not the same event as ungrouping a nonleaf, because there is genuinely disappearing content. Retraction needs to state which descendants survive and which disappear.

### Commutativity: a missing case for a naive two-operation story

```
+(a,b)  ->  +(b,a)
```

Rebuilding can achieve this with C/E, but cannot express an identity-preserving order exchange of protected leaves. A visible exchange macro is useful. In containment, children orbit or trade slots; on branches, ports rotate or one branch passes in depth. This is not an associativity move.

## Geometric variants

A continuous path of embedded geometry is a further choice beyond an edit script. Merging/splitting connectivity necessarily has a contact/degenerate event; do not require every instant to be an ordinary nonsingular solid with a one-to-one material mapping.

| Event | Lines / skeleton | Thick 2D form | 3D form |
| --- | --- | --- | --- |
| Retract | Edge length approaches zero; children remain attached | Neck shortens into a junction; exposed boundary is removed or absorbed | Branch folds or telescopes into trunk; joint settles into shared surface |
| Emerge | New edge grows from a joint | Bud or neck extends, then widens | A branch extrudes or unfolds from a collar/socket |
| Split copies | Coincident corresponding edges separate | Ribbon cleaves into strips, or a bud grows off a stable trunk | Paired half-volumes peel apart, or twisted strands unwind |
| Merge copies | Corresponding edges converge | Strips zip together in a traveling seam | Strands weave together or collars fuse with deliberate correspondence |
| Slide junction | Parent attachment migrates | Fork opens on one side while closing on another | A collar or branch saddle moves along the trunk |

**Thickness policies must state what is conserved, if anything.** For equal-length 2D ribbons splitting into equal copies, area-preserving width is w/2 per ribbon. For equal-length round 3D tubes, cross-sectional-area-preserving radius is r/sqrt(2), not r/2. If lengths change, those local formulas do not conserve total area/volume. The magical style can restore full width/radius after separation or conserve nothing; coherence of the timing matters more than conservation.

**Peeling and unweaving are not necessarily different term edits.** They can be different realizations of the same source-to-two-copies relation. But retain extra state if handedness, winding, or crossings matter to gameplay. Otherwise these can be renderer choices. Unwinding a closed or constrained tangle can require intersections; our freely ending branch strands should not silently imply universal knot undoing.

**Nodes need not be visible balls.** Try (1) uninterrupted woody forks with floating runes, (2) spheres engraved with runes and branches forming collars around them, (3) hidden joints under plates. Semantic nodes, geometric control points, and visible ornaments are distinct.

## Containment and alternatives

For containment drawings with nonoverlapping siblings, the rooted parent relation is the same combinatorial tree. Ordered terms additionally need a readable child order: named ports, angular ordering with a distinguished start, or another explicit convention. Containment alone does not encode it.

C unwraps one boundary while keeping its children. E wraps a chosen group. SPLIT buds off a copied region and its contents. MERGE coalesces matching copied regions. Wrapping a nonconsecutive subset may require reordering first in an ordered presentation. Boundaries can touch or vanish at designated transition moments; accidental overlaps are not a valid final containment relation.

Other useful projections include nested intervals/brackets, stacked strata, radial sectors, and an unfolded tree traversal. They share structural operations but expose different geometric constraints. Avoid adding projections before establishing the motion comparisons that matter.

## What this approach does not settle

- Which rewrites are legal, or which candidate a gesture means.
- How to choose correspondence when equal subtrees are independently authored or repeated many times.
- Which valid animation is easiest to follow: shortest edit count is not necessarily best.
- Collision avoidance, readable spacing, camera movement, and port routing.
- Reversibility during interrupted/scrubbed motion and stable state at coincident junctions.
- Attachment policies for chairs, runes, decorations, and avatars during deletion/copy/merge.
- Global layouts and performance for large structures.

The benefit is a place to attach these decisions explicitly: semantic rule + correspondence + local event script + geometric realization. The skeleton coordinates alone do not contain all that information.

## Proposed drawn studies, before another 3D scene

1. Exact line diagrams: associativity as C/E versus junction slide; distributivity as rebuilding versus explicit splitting; commutativity as exchange. Track operand colors and IDs.
2. Repeat associativity in containment, making every boundary's parent relation explicit.
3. Four-frame geometry sketches for the same duplication: thinning ribbons, budding wood, split prisms, and untwisting strands. Show the source, contact event, separation, and settled copies.
4. Compare visible rune spheres/collars with seamless woody joints. Keep camera, endpoint tree, and timing fixed for fair comparison.
5. Only then prototype the most readable candidate, with reversible scrubbing before scenery or decorative detail.

Use deterministic diagrams for combinatorial truth. Generated concept art can explore surface and gesture, but verify branch/operand counts and endpoints rather than treating it as a faithful mathematical diagram.

## Sources and attribution

The proposed vocabulary, completeness proof as presented, correspondence policies, and geometry comparisons are our working synthesis. Related formal background:

- [NIST: tree edit operations](https://xlinux.nist.gov/dads/HTML/editoperation.html), defining node removal with child promotion, insertion, and relabeling.
- [Demaine, Mozes, Rossman, Weimann: An O(n^3)-Time Algorithm for Tree Edit Distance](https://arxiv.org/abs/cs/0604037), ordered labeled tree edit framework.
- [Sleator, Tarjan, Thurston: Rotation Distance, Triangulations, and Hyperbolic Geometry](https://www.cs.cmu.edu/~sleator/papers/Rotation-Distance.htm), binary tree rotations.

## Expanded atlas, 2026-09-06

The [motion and material atlas](../explorations/grow-motion-atlas/README.md) compares further vocabularies: classical insert/delete/relabel edits, persistent-object reattachment and exchange, binary rotations, and constructor/hole substitution, alongside grouping and explicit-copy operations. Its example matrix covers all nine current toolbox transforms, exponent identities, capture-avoiding beta substitution, projection from a pair, and a list-map law. These are test examples across different semantic domains, not a claim that duplication is an arithmetic axiom or that the motion vocabulary constitutes a complete equational theory.
