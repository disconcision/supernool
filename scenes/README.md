# Saved scenes

The local Scene workshop writes here. Each scene has an immutable `versions/<UUID>.json` history and an optional `default.json` pointer. Use the workshop's **Save version** and **Use as scene default** actions, or ask an agent to inspect/promote a saved version. Save files are ordinary project data and can be committed alongside the scene code.

A version contains its scene ID, display title, supported configuration values, enabled rewrite rules, camera, tree seed and rock formation transforms. It is a scene definition, not a snapshot of a player's in-progress puzzle. The first renderer is study 018; separate scene IDs currently share that renderer and its existing asset kit.

Writes require the local Vite authoring server. Static builds include saved versions/defaults that exist at build time, with JSON export available in the browser. Account-based publishing and user-uploaded assets are future work.
