# Temporary encounter soundtrack · study 019

Native Web Audio synthesis, no external audio service, new sound library, or pre-rendered music dependency. This is a first playable sound sketch, awaiting artistic feedback.

- **Dormant:** two continuous filtered-noise air layers with slow, irregular level/colour changes and occasional quiet rustling. There is no periodically retriggered gust envelope.
- **Awakening:** a rising rush, low resonance and thunder tied to the visible storm/light events.
- **Active:** 96 BPM pulse, low D-centered bass and a neighboring dissonant pitch. Reduction from 13 toward 5 nodes introduces more percussion and upper pulses; undo can reduce that intensity. Tempo stays steady.
- **Release:** short broad whoosh with a falling low tone; the musical bed drops beneath it.
- **Recovery / healthy:** sparse D-minor/pentatonic-like melody and open sustained tones, settling to a slower note spacing when healthy.
- **Physical actions:** soil/crunch footsteps from actual displacement, a woody grab/strain sound, a distinct resonant catch and a low settling impact. These are synthetic placeholders, not recorded foley or animation-marker footfalls.

## Controls

**Inspect → Appearance → Sound** retains master Volume and Off. **Wood, earth & resonance** selects the new gesture bank; the previous plucks and recorded catch remain available. **Encounter soundtrack** can be turned off separately. Music, Wind & rustling, and Effects & footsteps have separate faders; thunder belongs to Effects. **Settings & presets → Sound & music only** saves/restores these together.

The linked **34-second soundtrack sketch** renders the same instruments with `OfflineAudioContext`, provides playback/download, and reports output peak/RMS and invalid samples. It is a fixed demonstration, not the actual interactive score or a replacement for listening in the scene.

## Timing and lifecycle

A 25 ms look-ahead scheduler schedules music 120 ms ahead on the audio clock. It drops missed beats after stalls rather than emitting a catch-up burst. Sound starts only following a trusted interaction. Background pages suspend their context; interacting with another scene tab on the same origin claims sound via BroadcastChannel. The live/frozen servers are different origins, so that ownership channel does not span ports; browser visibility suspension still applies. Closing/leaving a page closes its context and timer. Source/filter/gain nodes disconnect when finished.

Paused encounter inspection retains the state's musical bed but suppresses thunder while scrubbing. Jumping to a different state auditions its entry cue. Release/recovery previews don't change puzzle progress. Very small flashes use short crackles; larger flashes add a brief delay and a longer low rumble. Flash/reflash IDs prevent frame-by-frame retriggering. This is approximate spatial sound (stereo pan), not full propagation, occlusion or acoustic simulation.

Architecture reference: [MDN's Web Audio sequencing techniques](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques) and [OfflineAudioContext rendering](https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext/startRendering). `encounter-audio.ts` owns instruments/mixing, `sound.ts` owns scheduling and the existing gesture API, and the live inhabitation layer reports discharges from its existing lighting event schedule.

Validation includes native offline rendering (34 seconds, finite samples, peak approximately −15 dBFS at the starting mix), TypeScript, existing algebra/interaction/lifecycle tests, settings API checks and a live six-gesture mouse solution with audio event diagnostics. This does not establish final musical balance or subjective sound quality; listening feedback should drive the next pass.

Wind revision: long independent noise loops (19.1 and 27.7 seconds), seam correction, and independently paced gain/pan ramps across differently coloured layers replace the original 2.6-second repeating swell. Changes arrive 5–13 seconds apart without stopping the bed; rustling is sparse and varies in duration. The sketch page now also renders 60 seconds of wind alone.
