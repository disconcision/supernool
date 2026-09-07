# Current queue (after study 018)

Implemented in 018: first-Space entry and outside-ring persistence carried forward; completion releases body control after settling; exact encounter goal accepts commuted factor/sum; near-finished pose acceptance without a lateral completion test; quiet guides in front of glyphs (behind placement rejected); raised/layered 3D glyph comparisons; screenshot-led terrain matte.

Still open, in suggested discussion order:
1. Body-pull mapping: screen-pixel scaling changes feel with zoom; compare normalized travel, ground-projected gesture directions, and an honest magical tether vs tension-only rope. Push/pull or aerial positioning are alternatives, not selected yet.
2. Two-hand mechanics: current strict pin filters available rewrites. Explore richer holds and multitouch; do not revive automatic second-hand jumping.
3. Noolbox in the world: acquired physical rule objects extending the current rule loadout UI. Gesture ambiguity and pre-grip layout adjustments remain related work.
4. Art: review 018 raised/layered sigils and matte before treating them as accepted. Broader 360° surroundings need more projections or conventional terrain materials. Plateau work remains separately paused, with landforms preferred over formal pillars.

5. Avatar integration: Blue wrap and Olive cape are in 018. Hover is now disabled: retimed walking, reversed backsteps and a small lateral leg sway are the provisional grounded solution. Ordinary arms still need a shoulder/elbow/wrist rig; more convincing directional steps can follow. See the retained integration report and portrait review.

## Historical discussion and implementation log

# Tactile interaction — threads to retain

Recorded from Andrew’s feedback after study 015. Study 016 implements a bounded pass across the immediate requests; the remaining threads below are not abandoned.

| Thread | Current experiment | Next question |
| --- | --- | --- |
| Less decoration over the tree | 016: colored paths and small destination points; spell names beside the tree or in a separate band above the canopy. Points-only and branch-emphasis variants. | Which cues survive at encounter scale without obscuring sigils or the hand pose? |
| Hand continuity between nodes | 016: the active hand floats through the gap in the tree’s space, returning home on leaving the encounter. Optional 1.2-second return comparison. | Should the hand stay near the last meaningful contact when the pointer enters UI, or continue following a looser attention point? |
| Noolbox rule loadout | 016: nine independent rule toggles, matching the 2D prototype’s distinction between a rule in the toolbox and a rule enabled for dragging. Both associativity directions share their operator’s toggle, as in the source prototype. | Physical rule objects/pickups should add to the owned collection; equipping should remain separate. World pickups are NOT implemented. |
| Second hand disambiguates | 016: pin a node with F, the side control, or Shift-click. Only gestures preserving its identity, incoming connection and position remain available. | Compare stricter geometric pins with a hinge, a protected subtree, or a semantic focus region. A pin must have an intelligible effect, not merely a cosmetic hand pose. |
| Two independently placed hands / multitouch | One hand can now be explicitly pinned while the other grips. Tab exchanges which hand leads. Pin selection is sequential. | Simultaneous two-pointer gestures, moving a pin during a pull, and independent release timing are NOT implemented. Decide how those map to one mouse plus keyboard. |
| Ambiguous drag directions | Enabled rules and the pin narrow candidates. All remaining paths stay visible; a route is held once chosen, and returning to the source unlocks it. Number keys 1–9 can explicitly choose a displayed route before pulling. | Quantify near-collinear candidate directions. Explicit intent is useful, but should not become a substitute for legible spatial gestures. |
| Dynamically improve tree placement | Recorded, not implemented. | Adjust the embedding before a grip to separate candidate screen directions, using 3D freedom while preserving term structure, anchored nodes and recognizable subtrees. Do not silently reassociate the mathematical tree as a layout optimization. Freeze targets during a held gesture. Compare camera-aware placement with stable world placement. |
| Body-driven, physics-like pulling | 016 has a distinct body mode. Camera-relative walking loads a damped spring on the rewrite coordinate. Hands stay on contacts. Tap impulses, inertia and load-dependent walking resistance provide a different feel from mouse progress. Full six-rewrite route tested by keyboard. | Ground clearance and walls can limit leverage. True bracing forces, branch mass, collisions and reaction forces are NOT simulated. The scalar spring is an input/pose model, not a rigid-body solver. |
| Sigils, Lehi and reference art | 015’s provisional hands, character and sigil options remain. 016 changes guidance, not the core art target. | Return to the reference lab for more expressive spell/sigil embodiment once the input comparison is understood. |

## A useful concrete pin example

On the initial tree, grip the left child of the root. With no pin and all rules equipped, swap and regroup are both available. Pin the root first: swapping retains that operator and its incoming relationship, while the regroup operation exchanges operator roles and changes the root’s parent relation. The strict pin excludes that regroup. Disabling addition-swap in the noolbox then removes the remaining path at this contact. Releasing the pin restores the alternatives allowed by the loadout.

A pin can prevent a complete solution. The hint search respects the enabled rules and pin, so it may report that it cannot find a route even though useful local moves remain. Release the pin as part of moving attention through the tree.

## Placement experiments worth doing later

Start by collecting the projected angle between candidate drags for a fixed set of terms, grips and camera views. Test an embedding that increases the smallest angle while penalizing large node movement, lost branch clearance and shifts of the root or pinned node. Compare before/after layouts as an approach-time settling transition. Avoid constantly moving targets in response to an ongoing pull: that would undermine the tactile correspondence we are trying to improve.

Alternative second-hand roles to compare: root brace (current concrete example), hinge that permits rotation around a fixed node, a protected operand carried intact, and framing a local rewrite region with two contacts. These are proposals, not chosen mechanics.

## Follow-up: simpler body controls and truthful hand cues

User feedback after 016: hand geometry should occlude sigils, idle second hand should not automatically rise; some intended swaps appear unavailable; body navigation should reuse arrows for both hand targeting and avatar pulling with one or two buttons.

- Implemented only the rendering-order correction in this follow-up: sigils no longer write depth, and opaque-looking hand materials render after the sigils while retaining world/self depth tests.
- Current automatic brace is a visual convention on every grip, not an actual constraint. Proposed direction: second hand rests unless explicitly pinned. Behavior left unchanged pending discussion.
- Swap legality is not goal-gated: every + and × junction offers child exchange. Current interaction may exclude a candidate due to equipped rules, strict pin filtering, or projected travel <=10 px; a chosen drag also locks after 12% travel and release requires endpoint tolerance. These implementation restrictions must not be confused with algebraic invalidity. Non-sibling exchange may require a sequence of legal rewrites; arbitrary cross-operator exchange can change meaning.
- Earlier `nol-world` study: arrows/WASD moved avatar; hold Space and move sideways drove one global associativity morph. No hand-navigation phase. The older `src/world/WorldView.tsx` did transfer arrow input into the HTML tree editor when focused.
- Proposed two-button body scheme, not implemented: tap interact near tree to enter hand targeting (arrows move hand), hold grip to anchor contact and return arrows to avatar movement/pulling, release grip to settle and return to targeting, tap interact to exit targeting. Keep explicit mode cues and guard against held movement keys carrying across modes. Optional pins can remain an advanced control. Single-button tap/hold is possible but introduces timing ambiguity.


## Implemented: two-button body follow-up

016 now has E for Walk ↔ Hand and held Space for Hand → Pull → Hand. Arrows/WASD are reused, with spatial directional contact selection in Hand and avatar locomotion in Walk/Pull. Held direction keys are cleared at handoffs and must be released before reuse. The second hand rests unless explicitly pinned in both mouse/body modes. No swap legality or drag thresholds changed in this follow-up. The earlier proposed controls and idle-hand change above are now implemented; physical pickups and layout optimization remain future work.


## Drop acceptance and rope discussion

User reports apparent full tree motion failing on release and perimeter cancelling holds. Fixed perimeter only: active grips and settling animations keep the encounter active regardless of approach radius. Normal proximity gating resumes afterwards; world bounds/obstacles are unchanged.

Current acceptance is a screen-space drag corridor, not rope physics: projected along-route amount 0.88–1.35 and distance to the clamped segment below clamp(0.3 × route length, 24, 48) pixels. Because distance is measured to the clamped segment, overshoot also uses this tolerance. Body displacement maps to a virtual cursor at 85 pixels per world unit along camera-relative ground axes. Body mode additionally requires spring progress >=0.88 and absolute spring velocity <0.5 on release. Rendered progress clamps at 1, so the tree can look finished while sideways drift/overshoot or spring velocity disqualifies release. Readiness is not latched. This is misleading feedback; changing it is pending discussion.

Discussion proposals retained, not implemented: latch completion with a deliberate retreat to undo readiness; ground paths obtained from the inverse body-to-cursor mapping; avatar-to-hand tether that honestly distinguishes a magical control link from physical rope tension; strict rope vs bidirectional magical push/pull; Space to enter Hand, subsequent holds to grip, Escape to exit (entry press must not immediately grip). User wants opinions before selecting these mechanics.

## 017 implemented follow-up

Catch hysteresis, release independent of body spring velocity, catch/reversal/commit sound cues, UI minimization, distinct leaf/operator sigils and a richer clearing are implemented in 017. The route remains a virtual cursor mapping, not a rope. Two outgoing terrain lines are world routes, not ground projections of available drag vectors. Ground gesture guides/tethers and Space-to-enter remain future comparisons.

## Space entry is now implemented in 017

User corrected the retained E entry. Body mode now uses Space to enter hand navigation, with that first press consumed; subsequent Space holds grip/pull, release settles back to hand mode, and Escape cancels or leaves. E is no longer the body-mode entry key. Tests cover entry autorepeat/release, reach gating, subsequent grip and Escape exit.

## Persistent interaction outside the ring

017 now keeps the whole hand-control session active outside the approach ring, not only held grips/settling. Space establishes the session; subsequent pulls can start outside the ring. Explicit exit from hand control restores proximity gating. Escape during a grip retains its existing cancel-to-hand behavior.

## 018 follow-up · visible progress governs acceptance

User rejected the diamond/correction-target chase as busy and finicky. Removed the independent lateral acceptance corridor: once a route is chosen, the same projected motion coordinate that drives geometry catches at 82%, retreats at 55%. Removed diamond, correction connector and progress fill. Ordinary guide paths and slightly enlarged points now render in WebGL below all sigils/hands. Tested both zero eliminations with a large lateral deviation at near-completion; full six-gesture UI route, final body completion and re-entry pass. Do not revive precision aiming as a separate completion requirement without discussion.


### Guide visibility correction

User rejected the behind-sigil guide placement as too hard to see. In 018 the colored paths and destination dots are now back in front (render order 30). Keep the simplified completion behavior and omit the diamond/correction line.

### Body-facing pull and hands

018: corrected anatomical right (local −X) and inward thumbs, with hand orientations attached to body rather than camera. Right hand works by default; left reserved for explicit pin, Tab swap removed. During body grips/settling the avatar faces the tree, including backward/sideways travel. Added restrained pull speed/acceleration, smaller steps, backward lean, two finger joints and thumb closure. These do not implement physical rope forces. Explanatory model: ground movement → screen-direction virtual cursor → chosen rewrite coordinate → spring → pose. Rope/slack/tension choices remain pending discussion.

### Discussion proposals: clearance, stance, relational guides, tether

Pending, not implemented in this discussion:
- Move working hand slightly camera-left and toward camera. Orthographic depth alone will not reduce projected glyph overlap; lateral clearance and a check at full finger curl are needed too.
- Optional gentle stance adjustment while selecting contacts, strongest near the tree and fading with distance. Use a dead zone, short delay and small capped steps; keep the chosen side of the tree and stop at obstacles rather than pathfind around them. Stop/capture the new body origin on grip so automatic positioning cannot drive a rewrite; explicit locomotion wins. Do not chase every changing sigil or turn the remote-hand benefit into mandatory walking.
- Guide destinations currently use after-layout coordinates, not necessarily current node locations. A read-only audit of the six-step route found exact coincidence for all sampled zero-removal endpoints and some regroup endpoints; swaps, factor and calculation also had displaced endpoints. Distinguish semantic partner nodes from physical final landing positions.
- Proposed quieter display: accent existing partner glyphs with rule color and thin centre-to-centre relationship lines during selection; after choosing a route dim alternatives and retain active partners. Show a faint unoccupied landing hint only where necessary. Moving visual partner anchors must not feed back into/redefine the frozen input mapping mid-grip.
- Clarify two elastic-link experiments before implementation: (a) elastic visual/effort cues over existing screen-direction control, preserving reachable rewrites but risking misleading physical expectations; (b) world-space tension dependent on body/contact separation, making stance meaningful but restricting ground-only directions and needing slack/rest-length policy. No tether implementation authorized by this discussion; user wants pros/cons first.


### Implemented after discussion: stance, clearance, optional ribbon

User authorized the hand clearance change, gentle stance adjustment with a hard cutoff on grip, and an optional elastic magical ribbon. These are now in 018, with independent Appearance comparisons for stance and ribbon. Stance applies to body-mode hand browsing, is delayed/capped/distance-weighted, and stops at obstacles. Grip uses the adjusted body origin, with no residual automatic movement. Ribbon is visual elasticity over the existing input/spring, not true rope tension.

User questioned semantic partner highlighting: guides primarily communicate available operations and arrow-key directions. Do not replace those directions with relationship-only highlights. Existing guides unchanged. Next discussion: a fan of ground strokes centered on the grip-start avatar position, obtained by inverse input mapping, vs less directly useful shadows beneath nodes. Keep physical landing position, semantic partner identity and walking direction distinct.

### Art handoff 01 integrated

Both Blue wrap and Olive cape plus their articulated hands are in 018, switchable without restarting the encounter. Previous procedural figure is retained. Current visual adaptation: slow Walk / fast Hover / Hover while pulling, plus lean and the actual ordinary-wrist ribbon attachment. This preserves current control mechanics but is not a finished grounded pulling gait. Outstanding model work: shoulder/elbow/wrist arm rig, faster and directional grounded locomotion, and cloth clearance for new poses. Integration report and close-up rig review are in 018; art files copied into the served project, source GLBs unchanged. No changes to the direction-guide experiment or adoption of true rope forces.

### Grounded movement, palettes and explicit docks

User rejected pervasive hovering and wants embodied walking. 018 now uses only Idle/Walk; source clip is sped up to match motion (bounded at 6×). Ordinary travel is 1.45 units/s, loaded motion at most .8, with the old 1.6-unit key kick reduced to .24 while gripping. Backsteps reverse clip playback; lateral shuffles add a restrained leg sway. These are provisional directional poses, not terrain-aware gait IK.

Body rewrite gain increased from 85 to 220 pixels/unit, captured per grip and adjustable in Inspect → Interaction. This reduces required body travel to ~39%. Stance adjustment waits 140ms, follows 60% of lateral contact travel (cap 1.4 units) at 1.05 units/s, and steps inward when farther than 3.5 units from the tree (up to 1.8 units per browsing session). It works in mouse and body contact browsing, stops at obstacles, and never runs while gripping/settling/pinning or with explicit movement. Full six-step body-only route ended 3.30 units from the tree; intermediate distances 2.50–3.13, safely inside the working area.

Ribbon remains an optional experiment, thinner with continuously varying translucent patches and soft pulses. It renders above sigils, below hands, and remains Off-able; no actual tension mechanic added. Clothing palettes: original, yellow raincoat (default), red/plum, cyan/slate, green/gold; both art figures share presets, skin/hair/boots/hands preserved.

Three explicit collapsed-by-default docks: Encounter bottom-left (controls/expression/help), Rewrite bottom-right (selection/Noolbox), Inspect top-right (Appearance/Stats). Selection changes never open them; smaller windows allow one open dock at a time. Spell labels stay in the dock. Inspect Stats reports rolling fps/frame average and p95, draw calls/triangles, geometry/texture counts and worker rebuild cost; not GPU timings or allocated bytes. Palette/dock/gesture screenshots and grounded-check.cjs retain validation.

### Longer stride and contact clarity follow-up

User requested confident longer steps / less knee bend, slower lateral movement, stronger hand clearance and hood palette coverage. Implemented in 018 with a foot-path/two-link leg solve, reduced lateral rates, hand shifted camera-left, and palette roles mapped from materials. Current figure labels: Wrap traveller / Cape traveller; yellow default for both.

Body cues now compare targets-only by default against optional paths; mouse mode still defaults to paths. The lines' remaining value is explicit source/destination pairing and route disambiguation. Held-sigil glow supplies a clear source cue, and borderless halo targets carry destinations. Test this before deciding paths can be discarded wholesale, particularly with close/ambiguous routes. Ribbon is brighter and softly luminous again, still optional; source glyph shares its cyan. Ground shadow reception is off by default with a toggle, not a full lighting overhaul. Authored painting shadows remain. A broader lighting discussion (painted lighting vs actual lights, self-shadowing, contact shadows, real light emission/bloom) is still open.

### 018 associativity repair

The exchanging P/Q connector and its incoming support now persist through regrouping. Previously a surviving root junction was treated as a disappearing child edge, displacing its sigil and causing a release snap; bowed attachment paths could also leave the wood. Fixed with explicit connected support/connector correspondence and curved attachment paths. Checked root and nested moves in both directions, 1,200 numerical states and seven actual browser drags. Review/screenshots/tests are indexed in 018/README.md and notes.html. Keep the current guide comparison unchanged until the corrected tree motion is evaluated. User clarified that the temporary torso spin had already resolved; no new torso edits in this repair.

### Contact glow and smaller tree

Latest size adjustment is 8% smaller: scale 1.35 × 1.15 × .92 = 1.4283 of the original 018 tree. Body-mode selected contact and mouse-mode hovered contact now receive the same cyan emissive/aura treatment as grabbing, at about one-sixth the strength (.14/.13 versus .85/.8). It clears off-contact and gives way to the full held glow during gripping/settling.

User proposed ghostly destination sigils as an alternative to dots. Discussion direction: optional faint, rule-colored glyph outlines without opaque backplates; keep dots available for comparison. Ghosts could clarify swaps/regroups, but crowded destinations and operations where a glyph disappears need care. This remains a proposed comparison, not an implemented/default replacement.

### Landscape embodiment update

Run by default when travelling (3.2 units/s); keep Space for tree interactions, and keep loaded pulls slow. Procedural run with steadier head, shoulder/elbow counter-swing and brief flight phase is implemented. Nearby idle hand inspection is implemented, subordinate to explicit movement, tree contact and pin/grip states. This should add personality without competing with the user; radius limited to 2.8 and one hand at a time. Exact prop/finger contact and collision-aware idle paths remain open.
