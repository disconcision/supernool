# Release boundaries

## 019 — Inhabited clearing (main)

Stable public release: the original single encounter, authored drag contacts and catch behavior, inhabited lifecycle, regrowth, scenery editor and current scene art. Gameplay checkpoint: `ca3ca65`, immediately before the expanded problem list.

The release combines that checkpoint with touch interaction (default pointer mode on touch devices, ground taps, pointer ownership and cancellation), static-hosted settings loading, and audio muted on every load. Those are compatibility/reliability backports, not the experimental dragging system.

## 020 — Rewrite interactions (codex/iteration-020)

Starts historically at `6b324b5` (selectable expressions, distribution and zero absorption), including larger trees, rule tiles, sigil studies and all subsequent declarative dragging, continuous tracking and handle-scope experiments. Those commits remain intact. They have not been merged into the stable release.

Both lines retain the implementation route `explorations/018-painted-ground/`; the directory is a historical identifier, not the displayed iteration. Existing `019-inhabited-trees/` art studies keep their original number. Control storage keys remain compatible with saved settings.

Develop on the 020 branch. Update main deliberately with reviewed fixes; do not merge all of 020 merely to publish a small improvement. The existing GitHub Pages workflow publishes main to the site root and other participating branches to their own previews.
