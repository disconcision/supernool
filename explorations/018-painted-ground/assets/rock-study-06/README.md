# Grow: local rock comparison asset

11,166 triangles. One mesh, two embedded 2048px maps (base color, tangent normal). Y-up GLB. PBR roughness .94. A local visual trial; not yet adopted as the default scene.

Review: http://127.0.0.1:3148/rock-reference-06/
In-scene comparison: http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body&rockStudy=1

The opt-in loader is ../../rock-study.ts. It hides ring rocks with rockSeed 11 and 12, places this group at (-11.65, -.03, -.05), and rotates it about Y by pi/2. Existing collision circles are retained for comparison; fit new collision shapes before adoption. All other prototype scenery is retained.

Blender source, render, references, construction scripts and detailed notes:
/Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/rock-reference-06/

Construction: ../work/preview_rock_reference_06.py relative to that source folder.
Final export correction: ../work/fix_rock_export_06.py relative to that source folder.
