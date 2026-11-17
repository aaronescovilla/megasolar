Megasolar is a solar energy company that presents itself like a software company: dark, precise and calm, with one bright signal color. The identity is built from three things: the leaning panel, the pulse that draws an M, and Solar Yellow on Ink.

## Voice

- Write plainly and specifically. Say what happened, then what to do about it: "Inverter 4 needs attention."
- Use sentence case everywhere. Capitals are only for `eyebrow` labels of four words or fewer; never set a sentence in capitals.
- No emoji and no exclamation marks.
- The tagline is "Solar, run like software."
- This system holds no facts about the business (what it sells, prices, numbers, client names). Ask for them, or leave a marked placeholder such as [Client name]. Never invent them, and label product screens that use sample data.

## Logo

Use the files in the Logos group exactly as they are. Never redraw, recolor, stretch, rotate, outline or rearrange them.

| Use | File |
|---|---|
| White and `paper` grounds | `megasolar-logo.svg` |
| `ink`, `feature` and dark photos | `megasolar-logo-reversed.svg` |
| On `solar`, and one-color print | `megasolar-logo-black.svg` |
| Mid-tone color and busy photos | `megasolar-logo-white.svg` |
| Square or narrow spaces | `megasolar-logo-stacked.svg`, `megasolar-logo-stacked-reversed.svg` |
| Symbol alone | `megasolar-symbol.svg`, or `-black` and `-white` |
| Symbol at 24 px and below | `megasolar-symbol-small.svg`, `megasolar-symbol-small-black.svg` |
| App icon, favicon, avatar | `megasolar-app-icon.svg`, `megasolar-app-icon-small.svg`, `megasolar-avatar.svg` |

- The symbol is Solar Yellow, or one color. The pulse is cut out of it so the ground shows through; never fill the pulse with a color.
- Keep one symbol height clear on every side of the logo.
- Minimum size: letters 10 px tall in the logo; the symbol alone 16 px.
- In the logo the symbol is exactly as tall as the letters and sits on their baseline. Do not resize one against the other.
- Never put the white logo on `solar`.

## Color

- `ink`, `paper` and `solar` carry the brand, in about a 60 / 30 / 10 balance. Solar Yellow is a signal: keep it scarce.
- Build pages on `ground`, cards on `surface`, wells on `surface-raised`, with `line` borders. Set text in `text`, `text-secondary` and `text-muted`.
- Use `accent` for one primary action per view, with `on-accent` text. Secondary actions are `surface` with a `line` border.
- Never set text in `solar` on white or `paper`: the contrast is 1.5:1. On light grounds, yellow is a fill behind `ink`.
- For a dark hero or feature block on a light page, use `feature` with `on-feature` and `on-feature-muted`.
- Status always shows three things together: its color, its own shape and a text label. `status-online` is a filled circle, `status-degraded` a triangle, `status-fault` a diamond, `status-offline` a hollow ring.
- Charts use `series-generation`, `series-grid`, `series-battery` and `series-load`. On light grounds draw generation as a `solar` fill under an `ink` line, or in `solar-600`.
- Panel heat maps run from low to full output: `neutral-900`, `solar-900`, `solar-800`, `solar-600`, `solar-400`, `solar-200`.

## Type

- Headlines use the display family, Saira Expanded SemiBold: `display-xl`, `display`, `heading`. Track them tight (−2%, −1% for `heading`).
- `eyebrow` is Saira Expanded SemiBold in capitals, tracked +12%.
- Interface and body text use Geist: `title`, `body`, `caption`.
- Readings, units and IDs use Geist Mono so columns of figures line up: `data-xl`, `data`. Set a unit at half the size of its number, in `text-muted`.
- In HTML without this system's font files, load Saira from Google Fonts with its width axis (`family=Saira:wdth,wght@50..125,100..900`) and set `font-stretch: 125%`. Plain Saira at normal width is not the brand face.

## Shape and layout

- The lean. Every slant in the brand leans one across for every three up (`lean`, 18.4°), like the panels in the symbol. Chips, section markers, meters, tags and photo crops all use it; nothing leans the other way.
- The array. Repeat a leaning panel cell on a grid to make patterns, meters and charts. Lit cells are `solar`; unlit cells are `neutral-800` on dark grounds and `neutral-200` on light. Cells are about 0.75 as wide as tall with a `space-2` gap.
- The pulse. The line in the symbol is output over a day: up after sunrise, down by dusk. Two days draw an M. Chart shapes and hero graphics echo it.
- Supergraphic. Crop the symbol very large so only part of a panel and the pulse show: `ink` on `solar` for covers and signage, `solar` on `neutral-900` for hero areas, tone on tone behind text.
- Corners: `radius-xl` for panels and tiles, `radius-lg` for cards inside them, `radius-md` for buttons and inputs, `radius-sm` for chips. Buttons are not pills.
- Separate surfaces with `line` borders, not shadows. Shadows appear only under mock-ups of physical objects.
- Lay out with `space-4` between tiles, `space-6` inside cards and `space-8` between sections. Touch targets are at least 44 px tall.

## Icons

No icon set is part of the brand yet. Until one is chosen, draw simple inline stroke icons: 24 px grid, 1.8 px stroke, round caps and joins, in `text` or `text-muted`. Never use emoji as icons.
