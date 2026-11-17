# Megasolar brand

Brand identity for Megasolar: the logo, the design exploration that led to it, and the scripts that build it.

The logo is two leaning panels cut by a pulse that draws an M, with the wordmark MEGASOLAR set in Saira SemiBold Expanded, converted to outlines and spaced pair by pair. Colours are Ink `#0C1014` and Solar Yellow `#FFD12E`.

**Chosen on 17 November 2026:** the polished logo in `brand/logo/` and the eight-page brand kit (the `Kit2…` boards). The polished logo has a bolder pulse on a ten-module grid, clean joins, re-spaced letters, and the symbol aligned to the letter height. The earlier logo ("42 Tuned") is kept in `brand/archive/logo-v1/` for reference only.

## What is here

| Folder | Contents |
|---|---|
| `brand/logo/` | The chosen logo. SVG masters for the horizontal, stacked, reversed and one-colour logos, the symbol, the wordmark, the app icon and avatar, plus `favicon.ico`. PNG exports are in `brand/logo/png/`. |
| `brand/archive/logo-v1/` | The earlier logo, with the same kind of files. Do not use it for new work. |
| `design-system/` | Source of the Megasolar design system saved on claude.ai: the usage rules (`project/README.md`), tokens, fonts and cover. The logo files it shows are uploads of `brand/logo/`. |
| `design/project/` | Source of the design canvas: 46 boards (`*.dc.html`) and their layout (`canvas.json`). |
| `documents/` | Document templates set in the draft standard as standalone pages, with their blanks unfilled. Built by `tools/docs/share.js`. The filled-in versions hold real names, so `documents/values/` and `documents/filled/` are kept out of git. |
| `CLAUDE.md` | A short record of the chosen brand that every Claude thread on this repository reads automatically. |
| `tools/` | Scripts that draw the symbol, outline the Saira wordmark, export the logo files and generate 23 of the boards. `tools/kit2/` builds the chosen brand kit and the before-and-after boards. `tools/docs/` builds the document standard boards. |

## The design system

The chosen kit is saved as a design system at https://claude.ai/artifact/VYddBFuycDP4GB9xHKKJr4 (private to the owner unless shared). Design threads on the same account can find it and build on it. Its source is in `design-system/`.

## The design canvas

The boards in `design/project/` are Claude Design canvas files. They load a runtime from the canvas, so they do not open on their own in a browser. View and edit them at
https://claude.ai/artifact/6Tt1jZVv3MZ5KYq4h1UqVa (private to the owner unless shared).

The canvas has three pages. "Documents · draft" holds the proposed document standard, drafted on 17 November 2026 and not yet approved: the rules sheet (`DocStandard`), the letterhead (`DocLetter1`, `DocLetter2`), the Installation Contractor Agreement set whole on three pages (`DocAgreement1` to `DocAgreement3`) and the form format, shown on the Project Order (`DocForm`). All pages are A4.

"Final kit · before and after" holds the chosen kit beside the boards it replaced:

| Row | Boards |
|---|---|
| Logo · before and after | `BeforeAfterLogo`, `BeforeAfterChanges` |
| Logo suite | `BeforeLogoSuite` (before), `Kit2Logo`, `Kit2LogoUse` (final) |
| Color | `BeforeColor`, `Kit2Color` |
| Type | `BeforeType`, `Kit2Type` |
| Applications | `BeforeApplications`, `Kit2Digital`, `Kit2Physical` |
| Also in the final kit | `Kit2Overview`, `Kit2Language` |

The `Before…` boards are copies of the v1 boards, kept for comparison. "Exploration" holds everything that led here, newest first:

| Row | Boards |
|---|---|
| Brand kit · v1 | `KitColor`, `KitType`, `KitApplications` |
| Saira refinements and logo suite | `SairaRefinements` (41–52), `SairaSuite` (suite for the earlier logo, 42 Tuned) |
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
python3 tools/symbol2.py            # writes tools/symbol2_data.json (needs skia-pathops)
python3 tools/wordmark2.py          # writes tools/wordmark2_data.json
node tools/export2.js               # writes brand/logo/*.svg
node tools/raster2.js               # writes brand/logo/png/*.png (needs the playwright package)

# 2b. Earlier logo, archive only
node tools/export.js                # writes brand/archive/logo-v1/*.svg
node tools/raster.js                # writes brand/archive/logo-v1/png/*.png

# 2c. Design system files (publish them to the design system by asking Claude)
python3 tools/ds_fonts.py           # writes design-system/project/fonts/
node tools/ds_build.js              # writes tokens.json, README.md, the logo notes and the cover

# 3. Boards (these overwrite the files in design/project/)
node tools/saira_gen.js             # SairaRefinements, SairaSuite
node tools/kit_gen.js               # KitColor, KitType, KitApplications
node tools/tesla_gen.js             # WordmarksTesla
node tools/kit2/build.js            # the eight Kit2 boards and the two BeforeAfter boards
node tools/docs/build.js            # the seven Doc boards (document standard, draft)
node tools/docs/share.js            # the agreement template as one standalone page in documents/
node tools/docs/share.js documents/values/MS-AGR-2026-001.json   # the same, filled in, into documents/filled/
```

Each generator takes an optional output folder, for example `node tools/kit_gen.js /tmp/out/`, to build without overwriting. The `*_t.js` scripts and `tools/kit2/check.js` run a board's logic with different tweak settings and report missing values.

`tools/saira_data.json`, `tools/symbol2_data.json` and `tools/wordmark2_data.json` are committed, so steps 2 and 3 work without Python.

## Not included

- The test scripts used while drawing the wave symbol were not kept. The symbol's geometry is in the `WaveMark`, `WaveM` and `WaveVariants` boards.
- The Saira font files are downloaded by `tools/fetch-fonts.sh` instead of being committed. Saira is licensed under the SIL Open Font License.
