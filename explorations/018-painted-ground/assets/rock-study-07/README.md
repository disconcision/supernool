# Grow rock formations 07

Material revision of the accepted study: less green moss, more exposed grey rock, muted yellow lichen. Geometry is retained for the material/shading comparison. Added an extracted low-bedrock asset with the same material/UV space for connected formations.

Review: http://127.0.0.1:3100/explorations/018-painted-ground/?mode=body&rockStudy=1
Close-up and sources: http://127.0.0.1:3148/rock-reference-07/

The Formation control compares the old circle, a single replacement group, and two connected banks. The bank composition is deliberately a local review rather than an adopted collision layout. Current collisions and avatar idle touch targets still belong to the original ring. Fit these before adopting the arrangement. Preserve the grassy centre and route openings.

Shading options use the same meshes and textures. Soft retains export normals; crisper planes recalculates normals at a 22.5-degree crease and reduces normal-map strength; cel uses a four-band toon gradient with textures retained. Shading can clarify edges but does not change the silhouette. Author a few new crest shapes for the remaining boundary rather than repeating this crest everywhere.

Ground shadows are restored by default. Painted terrain is unlit, so it has a separate matching shadow receiver. The overlapping clearing shadow disk is removed in terrain modes, and the plain-studio floor never casts a shadow. The sunlight uses a 2048 map, bounded depth range, and reduced depth bias. The ground-shadow control remains available. Checked visually in the scene with shadows on and off.

Blender source and the two GLBs are in this directory. Texture maps are embedded. The retry_rock_07.py script in ../work contains the material/bedrock export. Blender's MCP socket timed out while saving/rendering, but both GLBs, the saved Blender source, and the rendered image completed and were independently checked. Opening a blend and baking should use separate MCP calls to allow Blender to restore context.

Next production pass: a small family of distinctive crest profiles, shared lower beds, composition around the remaining boundary, then collision and performance review. The original long pass established the modeling and texture-export method; its elapsed time should not be multiplied by the count of old ring rocks.

Full source directory: /Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/rock-reference-07
