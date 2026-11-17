"""Polished MEGASOLAR wordmark: Saira SemiBold Expanded outlines, respaced by eye.

Starts from the optical spacing used for wordmark 42 and applies per-pair corrections
so the gaps read as even. Run from the repository root (after tools/fetch-fonts.sh):

    python3 tools/wordmark2.py          # writes tools/wordmark2_data.json
"""
import json, sys
import pathops

ns = {}
exec(open('tools/saira_build.py').read().split('R600 = instance')[0], ns)
instance, layout, glyph_path, to_svg, ROMAN = ns['instance'], ns['layout'], ns['glyph_path'], ns['to_svg'], ns['ROMAN']

# Corrections in font units (1000 per em), added to the gap before the second letter of each pair.
PAIRS = {'ME': -10, 'EG': 18, 'GA': 14, 'AS': 14, 'SO': 0, 'OL': -12, 'LA': 10, 'AR': 10}


def word(text='MEGASOLAR', wght=600, wdth=125, track=50, pairs=PAIRS):
    font = instance(ROMAN, wght, wdth)
    placed = layout([(font, text)], track, True)
    shift, acc = 0, None
    for i, (fi, g, x) in enumerate(placed):
        if i:
            shift += pairs.get(text[i - 1] + text[i], 0)
        p = glyph_path(fi, g, x + shift)
        acc = p if acc is None else pathops.op(acc, p, pathops.PathOp.UNION)
    return to_svg(acc)


if __name__ == '__main__':
    out = {'word': word()}
    json.dump(out, open('tools/wordmark2_data.json', 'w'))
    print({k: (v['w'], v['y0'], v['y1'], len(v['d'])) for k, v in out.items()})
