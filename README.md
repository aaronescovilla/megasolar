# Megasolar brand

Brand identity for Megasolar: the logo, the design exploration that led to it, and the scripts that build it.

The logo is two leaning panels cut by a pulse that draws an M, with the wordmark MEGASOLAR set in Saira SemiBold Expanded, converted to outlines and spaced pair by pair. Colours are Ink `#0C1014` and Solar Yellow `#FFD12E`.

There are two versions. `brand/logo/` is the first approved logo ("42 Tuned"). `brand/logo-v2/` is the polished redraw proposed after it: a bolder pulse on a ten-module grid, clean joins, re-spaced letters, and the symbol aligned to the letter height.

## What is here

| Folder | Contents |
|---|---|
| `brand/logo/` | The first approved logo. SVG masters for the horizontal, stacked, reversed and one-colour logos, the symbol, the wordmark, the app icon and avatar, plus `favicon.ico`. PNG exports are in `brand/logo/png/`. |
| `brand/logo-v2/` | The polished logo, with the same set of files. |
| `design/project/` | Source of the design canvas: 39 boards (`*.dc.html`) and their layout (`canvas.json`). |
| `tools/` | Scripts that draw the symbol, outline the Saira wordmark, export the logo files and generate 16 of the boards. `tools/kit2/` builds the polished brand kit and the before-and-after boards. |

## The design canvas

The boards in `design/project/` are Claude Design canvas files. They load a runtime from the canvas, so they do not open on their own in a browser. View and edit them at
https://claude.ai/artifact/6Tt1jZVv3MZ5KYq4h1UqVa (private to the owner unless shared).

The canvas has two pages. "Before and after" holds the polish pass:

| Row | Boards |
|---|---|
| Logo · before and after | `BeforeAfterLogo`, `BeforeAfterChanges` |
| Logo suite | `BeforeLogoSuite` (before), `Kit2Logo`, `Kit2LogoUse` (after) |
| Color | `BeforeColor`, `Kit2Color` |
| Type | `BeforeType`, `Kit2Type` |
| Applications | `BeforeApplications`, `Kit2Digital`, `Kit2Physical` |
| New in the polished kit | `Kit2Overview`, `Kit2Language` |

The `Before…` boards are copies of the v1 boards, kept for comparison. "Exploration" holds everything that led here, newest first:

| Row | Boards |
|---|---|
| Brand kit · v1 | `KitColor`, `KitType`, `KitApplications` |
| Saira refinements and logo suite | `SairaRefinements` (41–52), `SairaSuite` (final suite, 42 Tuned) |
| Wordmark rounds 3 and 4 | `WordmarksTech` (21–32), `WordmarksTesla` (33–40) |
| Wordmark and logo suite | `WordmarkOptions` (1–6), `WordmarksExtended` (7–12), `WordmarkIdeas` (13–20), `LogoSuite` |
| Wave mark | `WaveMark`, `WaveConstruction`, `WaveM`, `WaveVariants` (A is the chosen symbol) |
| First logo directions | `Main`, `SplitSun`, `GridSun`, `Radiant`, `Module`, `Wordmark` |
| Accent and first brand kit (superseded) | `Accent`, `Palette`, `Type`, `Applications` |

## Rebuilding

Run everything from the repository root.

```sh
# 1. Wordmark outlines (needs Python 3 and the Saira fonts)
python3 -m pip install fonttools brotli skia-pathops uharfbuzz
bash tools/fetch-fonts.sh
python3 tools/saira_build.py        # writes tools/saira_data.json

# 2. Logo files, first version
node tools/export.js                # writes brand/logo/*.svg
node tools/raster.js                # writes brand/logo/png/*.png (needs the playwright package)

# 2b. Polished logo
python3 tools/symbol2.py            # writes tools/symbol2_data.json (needs skia-pathops)
python3 tools/wordmark2.py          # writes tools/wordmark2_data.json
node tools/export2.js               # writes brand/logo-v2/*.svg
node tools/raster2.js               # writes brand/logo-v2/png/*.png

# 3. Boards (these overwrite the files in design/project/)
node tools/saira_gen.js             # SairaRefinements, SairaSuite
node tools/kit_gen.js               # KitColor, KitType, KitApplications
node tools/tesla_gen.js             # WordmarksTesla
node tools/kit2/build.js            # the eight Kit2 boards and the two BeforeAfter boards
```

Each generator takes an optional output folder, for example `node tools/kit_gen.js /tmp/out/`, to build without overwriting. The `*_t.js` scripts and `tools/kit2/check.js` run a board's logic with different tweak settings and report missing values.

`tools/saira_data.json`, `tools/symbol2_data.json` and `tools/wordmark2_data.json` are committed, so steps 2 and 3 work without Python.

## Not included

- The test scripts used while drawing the wave symbol were not kept. The symbol's geometry is in the `WaveMark`, `WaveM` and `WaveVariants` boards.
- The Saira font files are downloaded by `tools/fetch-fonts.sh` instead of being committed. Saira is licensed under the SIL Open Font License.
