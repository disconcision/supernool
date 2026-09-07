# Current matte: elevated uplands v2

`elevated-uplands-v2.png` replaces the sky/horizon composition in the live study. Generated with the built-in image tool, using reference-lab `01-ground.png` for materials only. Full prompt: `elevated-uplands-v2-prompt.txt`. Original retained at `/Users/andrewblinn/.codex/generated_images/01a07563-399b-7f62-8731-6ed1b6a17b48/exec-9a488ab5-0d79-4b92-8202-4d2cb7c601f3.png`.

User correction: an elevated/isometric view should see surrounding hills and cliffs, with no sky or horizon. This is now the default: a cropped, oblique aerial expanse of moss-covered upland, slate escarpments and shallow ravines. Land continues across the top edge. The screen-facing matte still has no parallax and works best at the default view. Original sky asset below is retained for provenance, not the current direction.

# Misty uplands matte — 017

`misty-uplands.png` is a newly generated 1672 × 941 background, approximately 1.6 MB. Built-in image generation, 2026-09-06. Original retained at `/Users/andrewblinn/.codex/generated_images/01a07563-399b-7f62-8731-6ed1b6a17b48/exec-50ad1f6d-dc7c-4305-b69b-c0883b1b812b.png`.

Reference images (viewed before generation):
- `/Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/generations/05-world.png`: luminous distance and large land shelves. Its dense floating-island/cloud composition was deliberately not copied wholesale.
- `/Users/andrewblinn/Dropbox/projects/grow-reference-lab-2026-09-06/generations/01-ground.png`: Icelandic moss, fractured slate, subdued light.

Prompt specification: new 16:9 gouache-style matte painting, overcast silver-sage sky, low-contrast distant blue-green slate uplands with restrained yellow-green moss, layered airy central valley, a quiet central 60% and pale mist across the lower centre. Large shelves at left/right, horizon around 40% down, upper-left diffuse illumination. No foreground platform, tree, characters, UI, symbols, buildings, panels or text. References were mood/material sources, not edit targets. The image is preserved as generated.

Integration: a CSS-composited image behind the transparent WebGL canvas, cover-fit to viewport. An inexpensive transparent ground-edge feather softens the outer clearing boundary. Appearance offers Painted, Soft (60% opacity over the original backdrop color) and Plain (also removes the feather). It is camera-facing, has no parallax, collisions or interactive land, and is not an equirectangular skybox. Best judged from the study's default isometric view.
