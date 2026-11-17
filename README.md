# Megasolar brand

Brand identity for Megasolar: the logo, the design exploration that led to it, and the scripts that build it.

The final logo is the wave symbol (two slanted panels cut by an M-shaped wave) with the wordmark "42 Tuned": MEGASOLAR set in Saira SemiBold Expanded, converted to outlines and spaced pair by pair. Colours are Ink `#0C1014` and Solar Yellow `#FFD12E`.

## What is here

| Folder | Contents |
|---|---|
| `brand/logo/` | Final logo files. SVG masters for the horizontal, stacked, reversed and one-colour logos, the symbol, the wordmark, the app icon and avatar, plus `favicon.ico`. PNG exports are in `brand/logo/png/`. |
| `design/project/` | Source of the design canvas: 25 boards (`*.dc.html`) and their layout (`canvas.json`). |
| `tools/` | Scripts that generate the Saira wordmark outlines, the logo files and six of the boards. |

## The design canvas

The boards in `design/project/` are Claude Design canvas files. They load a runtime from the canvas, so they do not open on their own in a browser. View and edit them at
https://claude.ai/artifact/6Tt1jZVv3MZ5KYq4h1UqVa (private to the owner unless shared).

Rows on the canvas, newest first:

| Row | Boards |
|---|---|
| Brand kit · final | `KitColor`, `KitType`, `KitApplications` |
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

# 2. Logo files
node tools/export.js                # writes brand/logo/*.svg
node tools/raster.js                # writes brand/logo/png/*.png (needs the playwright package)

# 3. Boards (these overwrite the files in design/project/)
node tools/saira_gen.js             # SairaRefinements, SairaSuite
node tools/kit_gen.js               # KitColor, KitType, KitApplications
node tools/tesla_gen.js             # WordmarksTesla
```

Each generator takes an optional output folder, for example `node tools/kit_gen.js /tmp/out/`, to build without overwriting. The `*_t.js` scripts run a board's logic with every tweak setting and report missing values.

`tools/saira_data.json` is committed, so steps 2 and 3 work without Python.

## Not included

- The test scripts used while drawing the wave symbol were not kept. The symbol's geometry is in the `WaveMark`, `WaveM` and `WaveVariants` boards.
- The Saira font files are downloaded by `tools/fetch-fonts.sh` instead of being committed. Saira is licensed under the SIL Open Font License.
