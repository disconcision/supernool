# Captured tuning

`019-shadow-user-capture-2026-09-07.json` preserves the user's exact live 019 controls before their requested lighting reset. It is a portable preset in the Settings & presets import format, not the active defaults file.

Active values are in `public/settings/app-defaults.json`, scope `clearing-019`. They match this capture except for the three requested resets: `spiritSun=2.5`, `spiritFill=2`, `spiritCloudFlash=1`. The user had already saved their shadow-only choices; the follow-up also captured all other displayed controls and enabled rules, then promoted the corrected set.

Expanded exploration ranges (retaining the chosen numerical defaults): coloured fringe 1.5→3, cloud extent 1.8→2.6, billowing 1.5→2.5, bark edge energy 1→2, lightning illumination 250→500. Blend/fraction controls retain their bounded meanings; zero seeds remain valid, not a reason to allow negative seeds. No shader-side cap limits these expanded intensity/size controls. Inspected the current tuning and a stronger fringe/bark comparison in the live scene; these are available extremes, not newly chosen defaults.
