# Live controls, app defaults and frozen previews

The lower-right Inspect dock → Appearance → **Settings & presets** manages controls. The separate shadow/canopy workshops have the same section in their existing controls panel. The older snapshot-only section is replaced in the playable scene.

## Exact semantics

- **Automatic restoration:** each tab saves the displayed input/select controls in sessionStorage as they change, and once more on page exit. Reload restores them after the scene's control handlers are ready. Tabs evolve independently. Browser “duplicate tab” can start with a copy of the source tab's sessionStorage; they then diverge. Browser session recovery may also preserve this data. Normal tab closure is not a durable preset.
- **Scope:** 018 clearing, 019 inhabited clearing, standalone shadow workshop, living canopy workshop and growth workshop have separate preference/default namespaces. Live and frozen ports have separate browser storage. Both local servers read and write the same project defaults file.
- **Selected set:** reset, project save, named preset, export and import operate on All controls or Shadow & lighting only. The latter is the initial selection in the inhabited clearing. Automatic tab restoration always includes all registered controls.
- **Reset to app defaults:** fetch the latest project defaults and apply them to the selected set, replacing that portion of the tab's persisted choices. Does not reset the expression, position, camera or other tabs. There is no separate immutable “factory defaults” button; shared app defaults are intentionally editable.
- **Set as app defaults:** merge the selected controls into this study's entry in `public/settings/app-defaults.json`. The write is real project source, not localStorage. Fresh tabs use it; existing tabs retain their own saved choices until Reset. No reload or Git operation occurs. Commit/push that JSON to share it through Git; subsequent builds include it. This button works on both local servers. A deployed static-only build can read bundled defaults but cannot write project files; it reports that limitation and supports preset export.
- **Named presets:** stored in this browser/origin for the study. Saving the same name replaces that preset. Loading applies values to this tab without changing app defaults. Delete only deletes the named preset. Export a JSON file for a durable portable copy; import validates the study and known values before applying. Unknown removed controls are ignored.
- **Precedence:** code baseline → project defaults → this tab's saved values. On a tab with no saved values, an explicit `?mode=body`/`?mode=mouse` wins for input mode. All current form controls with IDs and Noolbox rule checkboxes participate. Actions (e.g. reshuffle buttons), the actual generated-tree seed held outside controls, expression/rewrite history, grip, traveller position, camera pose and dock expansion do not.
- **Migration:** the project JSON supplies explicit initial rock-growth defaults because the older rock controls independently read localStorage. The general controller overrides that legacy store; per-tab choices subsequently win. Other controls retain their code baseline until explicitly promoted. The old per-layer rock Reset buttons still mean their own factory reset; the new general Reset means project defaults.
- **Collisions:** revisions plus a filesystem lock protect saves from two local servers. A stale tab's first save fails with an explanatory message and the current revision. Review your choices before saving again; the second explicit save can replace that selected set. Saving never silently reloads another tab.

The defaults endpoint is local, same-origin JSON only, fixed-path and study-allowlisted. Vite ignores the defaults directory so writes there do not trigger reload. API tests use a temporary project, not the actual defaults file.

## Frozen preview

- `npm run freeze` builds the current working tree (including uncommitted work) into a new timestamped `.cache/frozen/<id>/` directory. Its manifest records the base commit, whether the working tree was dirty, and build time.
- `npm run frozen:serve` starts port **3101**, selecting the latest successful snapshot once at startup. It serves only that directory, with no Vite client, source fallback or hot reload. Future `npm run freeze` commands do not alter that running server's selection. Stop and restart the preview server to explicitly advance it.
- Port **3100** remains the live development server. Normal edits still update it.
- Current frozen scene: `http://127.0.0.1:3101/explorations/018-painted-ground/?mode=body&inhabited=1`.
- The code and assets are frozen. App defaults are the deliberate exception: new sessions and Reset can read today's project defaults, and Set as app defaults can write them back. Existing frozen-tab controls remain unchanged until explicitly acted on. For an exact reusable visual state, export a named preset alongside the snapshot.
- Snapshots stay local and are not committed. The preview is a development convenience, not a hosted deployment or a process supervisor; restart its server if the process stops.

## Verification

Checked in the available in-app browser: control change → reload restoration; frozen-preview project save → a fresh live tab inherits it; selected-set Reset; named preset save/change/load; frozen scene and its assets render without browser errors. The test project defaults were restored afterward. Chrome automation was unavailable in this session. TypeScript, core checks, settings API tests and the production snapshot build passed.
