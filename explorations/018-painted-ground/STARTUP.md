# Quiet startup · 018 and experimental 019

The old standalone objective, help and performance panels used to paint before `setupHUD()` moved them into collapsed docks. Startup now hides all unfinished scene/UI children with critical CSS in the HTML head, before the application module or external stylesheet arrives.

An off-white full-window curtain shows a small stone-grey infinity seed. The inline path is copied from Classic Nool's `src/assets/nool-seed-infinity-only.svg`; the rotation uses the spring-like cubic easing of `#seed .icon2` in Nool's `src/index.css`. It adapts the original held turn into a repeating loading motion, without importing Nool's runtime or replacing the mark with a font glyph. Reduced-motion preferences disable the spin and fade.

The curtain lifts after the initial tree/decorative worker queue is complete, the selected traveller and painting have settled, and rock loading has either completed or fallen back. Two rendered ready frames precede a short fade; there is no artificial minimum loading time or invented progress percentage. Input is blocked while loading. Fatal startup/worker errors show a retry action, while failed optional assets retain their existing fallback handling. The original and newer rock controls both expose completion by enabling their layout selector, so this does not depend on the separate art task's newer UI IDs.

Validation: critical-HTML preview renders only the original seed; a fresh 019 scene reaches ready with tree and rocks ready, no open docks and no browser errors. TypeScript, core tests and production build checked. The temporary preview is derived from the actual HTML with its app module omitted, solely to inspect the loading state independently of cache/network speed; it is not a second maintained loader.
