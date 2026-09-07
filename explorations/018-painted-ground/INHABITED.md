# Inhabitation in the playable scene

The shadow study is now an optional extension of **018**, not a second playable scene. Open `?mode=body&inhabited=1`, or use **Inspect → Appearance → Inhabited tree · shadow & light**. Choose **Clear tree · checkpoint** to compare without losing the current expression. The ordinary route still opens the clear checkpoint. The 019 workshop remains a visual reference.

## Ownership and correspondence

`scene.ts` continues to own the term, layout, worker, sigils, hands, navigation and rewrites. `inhabited.ts` consumes `poseNow`, which is published only when the corresponding worker mesh is displayed. It transforms that same pose into world coordinates and attaches the shared 019 canopy renderer. It does not construct or mutate an expression. Thus a rewrite, undo, new shape or scenery change requires no separate port into this experiment.

The old workshop's spatial layout and oblique view can visually superimpose distinct contacts (notably y beside + and zero beside ×). The playable scene retains its existing approach-to-working-plane behavior. Its math/connectivity tests cover nested regroupings as well as root rewrites.

## Controls

- Six canopy constructions, violet/blue/amber palettes, host visibility, bark edge glow and flowing patterns.
- Steady point-light strength, reach, height and pulsation; sunlight and ambient fill.
- Lightning illumination, arc halo, illumination inside the cloud and a separately adjustable painted-ground response.
- The existing small/medium/large lightning rates, reach, storm clustering and re-flash controls. Preview buttons briefly show small, medium, branch or scenery strikes.
- Optional large-strike shadow maps, disabled by default. These are a rough comparison and can create very long, hard shadows from low contacts.
- All controls are included in the existing **Settings snapshot** capture/copy facility (captures are retained in browser storage). Agitation is a manual preview; reduction-driven escalation and release/recovery are not wired up yet.

## Rendering and lighting limits

The shared canopy compositor can now render into a caller's target and preserves world depth. The playable pipeline is world + canopy → atmospheric mist → clear interaction overlays. Sigils, guides, ribbon and hands retain the existing overlay ordering and depth behavior. Mist can soften the canopy against distant terrain; it currently uses underlying opaque-scene depth, not a separately integrated volume depth.

A pool of four point lights supplies one steady light and up to three simultaneous discharge lights. Natural flashes use the same event times and stroke envelopes as the bolts. Large-flash lights use the same endpoint selection as the visible strikes, reading the current scene's contact list, including imported rocks and nearby small scenery. Small/medium flashes use nearby branch positions as an approximation rather than tracing every screen-space filament.

Real meshes respond to Three.js lights. The matte remains painted/unlit, with a bounded, normal-weighted coloured response added by its shader. This is artistic relighting, not recovered physical material data or global illumination; the additive paint response does not evaluate shadow maps. Arc halos and cloud illumination are explicit effects, not general-purpose bloom or emissive light transport. No new lighting engine is introduced.

## Validation

- `npm run check`, `npm test`, production build and the lightning distribution/contact checks pass.
- In-app browser: body approach, Space entry, all six mouse-drag simplification moves (13 → 5 nodes), clear/shadow comparison, S7 and S5, environmental flashes and optional flash shadows inspected. No browser/shader errors in that run.
- Existing tests cover 30 root/nested regroupings over 1,200 frames, contact navigation, catching, cancellation and mouse/body gesture mappings. A complete held-key body playthrough was not repeated for this rendering-only integration. The separate Chrome automation surface was unavailable; visual checks used the available in-app browser.
