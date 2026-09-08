# Mist and the shadow canopy

The inhabited clearing now renders the world through mist first, then composites the shadow canopy and its discharge effects, then draws the existing legibility overlays (sigils, tool hands, ribbon and guides).

Previously, mist wrapped the entire canopy composite. Since the translucent canopy forwards the underlying opaque scene depth, mist treated canopy pixels as the landscape behind them. This could bleach the upper crown against distant hills. The user requested the canopy be above the fog.

`mist.render` supplies a fogged-base callback to `inhabitation.render`, which passes it to the canopy renderer. The canopy renders that base into its usual scene target before computing coverage and shading. Depth remains the opaque scene depth for real geometry occlusion. The canopy's dark coverage attenuates the already-fogged scenery; its fringe and lightning are added afterward. No invented opaque canopy depth or extra world draw is needed. Without inhabitation the existing world → mist → overlays path remains; with mist disabled the canopy receives an ordinary scene render. Legacy canopy comparisons also honor the caller's render target and forward scene depth.

This is an intentional readability/art-direction treatment, not physically correct volumetric fog/cloud interpenetration. The wood and scenery still receive mist; the canopy is exempt from the later wash.

Validation: compared the frozen prior composite with the live correction; inspected S7 painted coverage and S5 volume clouds, plus the tree opening into interaction range. Browser render logs were clear. TypeScript and core checks pass; production snapshot rebuilt for port 3101. No control defaults changed.
