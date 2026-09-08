# Burnt bark · adjustable material study

Inspect → Appearance → Burnt bark · material study.

A direct 3D study, not a new generated concept image. Inhabited 019 starts with textured charcoal; ordinary 018 retains original wood. The user's saved ground settings were preserved in commit 4fdc1e0. This material is a provisional comparison, not a newly approved aesthetic.

- Bark treatment: original wood / solid charcoal / textured charcoal.
- Burn amount: blend back to the current wood colour.
- Base brightness: how black the lower trunk is.
- Upper ash brightness: grey level near the highest branches.
- Ash starts up tree: fraction of current tree height where the transition starts.
- Texture amount: broad plate-colour variation and fine dark seams.
- Char plate frequency: lower gives larger marks; higher gives smaller marks.
- Crack darkness: separate seam contrast, without changing geometry or normals.
- Burnt sheen: lowers roughness in the studio materials. Cel materials retain band shading and do not gain a new specular lobe.

Quiet burnt-tree preview switches the existing spiritMode off. Show spirit again switches it on. Both preserve all other spirit parameters. Bark mode does not automatically hide the spirit. The ground-only recovery controls do not yet regrow/recolour the tree; full lifecycle staging remains separate work.

Settings & presets → Burnt bark only saves these material controls. Use All controls to also retain the spirit on/off choice. Existing per-tab restore, project defaults and named presets apply. No char sliders were written into shared app defaults by the agent; their initial values are code defaults for exploration.

Implementation: burnt-bark.ts wraps the existing material hooks, preserving analytic hewn normals and bark-energy emission. A height-based charcoal-to-ash colour ramp and triplanar procedural plate field modify diffuse colour and standard-material roughness. No texture asset, new mesh, extra draw or remeshing is introduced. The field is world-space and the height gradient follows the displayed pose's extent. It can swim during deformation; this does not claim branch-attached UVs or persistent individual burn cracks. Triplanar seams and axis bias remain possible at strong settings. These are small surface marks, not displaced charred bark plates.

Verified in the in-app browser because Chrome automation is unavailable: quiet studio/textured view, solid cel view, spirit overlay, original wood switch, and displayed approach pose. Shader console had no errors in the tested modes. TypeScript, core tests and production/frozen build passed. Existing chunk-size build warning remains. No full new gameplay playthrough was needed for this material-only study.
