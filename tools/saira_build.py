"""Outline and tune Saira wordmarks for Megasolar. Writes tools/saira_data.json. Run from the repository root.

Coordinates in the output are font units (UPM 1000), y down, cap top at 0,
baseline at CAP, ink starting at x = 0.
"""
import io, json, math, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.basePen import BasePen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.svgPathPen import SVGPathPen
import pathops
import uharfbuzz as hb

ROMAN = 'tools/fonts/saira.woff2'
ITALIC = 'tools/fonts/saira-italic.woff2'
CAP, XH = 688, 510

_cache = {}
def instance(src, wght, wdth):
    key = (src, wght, wdth)
    if key in _cache:
        return _cache[key]
    f = TTFont(src)
    inst = instancer.instantiateVariableFont(f, {'wght': wght, 'wdth': wdth})
    inst.flavor = None
    buf = io.BytesIO(); inst.save(buf)
    face = hb.Face(buf.getvalue()); font = hb.Font(face)
    res = {'tt': inst, 'gs': inst.getGlyphSet(), 'order': inst.getGlyphOrder(), 'hb': font, 'cmap': inst.getBestCmap()}
    _cache[key] = res
    return res


class FlatPen(BasePen):
    """Flattens outlines into polygons."""
    def __init__(self, gs):
        super().__init__(gs); self.polys = []; self.cur = None
    def _moveTo(self, p): self.cur = [p]; self.polys.append(self.cur)
    def _lineTo(self, p): self.cur.append(p)
    def _curveToOne(self, a, b, c):
        p0 = self.cur[-1]
        for i in range(1, 9):
            t = i / 8; u = 1 - t
            self.cur.append((u**3*p0[0] + 3*u*u*t*a[0] + 3*u*t*t*b[0] + t**3*c[0], u**3*p0[1] + 3*u*u*t*a[1] + 3*u*t*t*b[1] + t**3*c[1]))
    def _qCurveToOne(self, a, b):
        p0 = self.cur[-1]
        for i in range(1, 7):
            t = i / 6; u = 1 - t
            self.cur.append((u*u*p0[0] + 2*u*t*a[0] + t*t*b[0], u*u*p0[1] + 2*u*t*a[1] + t*t*b[1]))
    def _closePath(self): pass
    def _endPath(self): pass


def profile(fi, gname, ys):
    pen = FlatPen(fi['gs']); fi['gs'][gname].draw(pen)
    L, R = [], []
    for y in ys:
        xs = []
        for poly in pen.polys:
            n = len(poly)
            for i in range(n):
                (x1, y1), (x2, y2) = poly[i], poly[(i + 1) % n]
                if (y1 <= y < y2) or (y2 <= y < y1):
                    xs.append(x1 + (y - y1) * (x2 - x1) / (y2 - y1))
        L.append(min(xs) if xs else None); R.append(max(xs) if xs else None)
    return L, R


def shape(fi, text):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(fi['hb'], buf, {'kern': True})
    return [(fi['order'][info.codepoint], pos.x_advance) for info, pos in zip(buf.glyph_infos, buf.glyph_positions)]


def layout(runs, track, optical, lower=False):
    """runs: list of (fontinstance, text). Returns list of (fi, gname, x)."""
    glyphs = []
    for fi, text in runs:
        for g, adv in shape(fi, text):
            glyphs.append((fi, g, adv))
    xs = [0.0]
    if not optical:
        for i in range(1, len(glyphs)):
            xs.append(xs[-1] + glyphs[i - 1][2] + track)
    else:
        top = XH if lower else CAP
        ys = [top * (0.03 + 0.94 * k / 47) for k in range(48)]
        fi0 = glyphs[0][0]
        ref_g = fi0['cmap'][ord('n' if lower else 'H')]
        rl, rr = profile(fi0, ref_g, ys)
        ref_adv = fi0['tt']['hmtx'][ref_g][0]
        ref = (ref_adv - max(v for v in rr if v is not None)) + min(v for v in rl if v is not None) + track
        depth = 0.14 * CAP
        profs = [profile(fi, g, ys) for fi, g, _ in glyphs]
        for i in range(1, len(glyphs)):
            Ri = profs[i - 1][1]; Lj = profs[i][0]
            dflt = glyphs[i - 1][2] + track
            def gaps(dx):
                out = []
                for a, b in zip(Ri, Lj):
                    out.append(ref + depth if a is None or b is None else min(dx + b - a, ref + depth))
                return out
            lo, hi = dflt - 400, dflt + 400
            for _ in range(50):
                mid = (lo + hi) / 2
                if sum(gaps(mid)) / len(ys) < ref: lo = mid
                else: hi = mid
            dx = dflt + max(-60, min(20, 0.55 * ((lo + hi) / 2 - dflt)))
            # never closer than 40% of the reference gap anywhere
            mins = [b - a for a, b in zip(Ri, Lj) if a is not None and b is not None]
            if mins:
                dx = max(dx, 0.4 * ref - min(mins))
            xs.append(xs[-1] + dx)
    return [(fi, g, x) for (fi, g, _), x in zip(glyphs, xs)]


def glyph_path(fi, g, dx, open_a=False):
    p = pathops.Path()
    fi['gs'][g].draw(TransformPen(p.getPen(), (1, 0, 0, 1, dx, 0)))
    p = pathops.simplify(p)
    if open_a:
        rec = FlatPen(fi['gs']); fi['gs'][g].draw(rec)
        outer = max(rec.polys, key=lambda q: max(x for x, _ in q) - min(x for x, _ in q))
        counter = [q for q in rec.polys if q is not outer][0]
        # notch = outer points that are not on the outer hull (feet tips, apex)
        minx = min(x for x, _ in outer); maxx = max(x for x, _ in outer)
        hull = set()
        for x, y in outer:
            if y >= CAP - 1 or (y <= 1 and (x - minx < 60 or maxx - x < 60)):
                hull.add((x, y))
        inner = [pt for pt in outer if pt not in hull] + counter
        cx = (minx + maxx) / 2
        left = sorted([pt for pt in inner if pt[0] < cx], key=lambda q: q[1])
        right = sorted([pt for pt in inner if pt[0] >= cx], key=lambda q: -q[1])
        poly = [(x, -20 if y <= 1 else y) for x, y in left + right]
        cut = pathops.Path(); pen = cut.getPen()
        pen.moveTo((poly[0][0] + dx, poly[0][1]))
        for x, y in poly[1:]: pen.lineTo((x + dx, y))
        pen.closePath()
        p = pathops.op(p, cut, pathops.PathOp.DIFFERENCE)
    return p


def wave_band(x0, x1, thick):
    """Two-hump wave like the mark, y up, centred around mid cap height."""
    pts_top, pts_bot = [], []
    n = 240
    for k in range(n + 1):
        t = k / n
        x = x0 + (x1 - x0) * t
        y = CAP * 0.44 + CAP * 0.11 * (1 - math.cos(4 * math.pi * t)) / 2
        pts_top.append((x, y + thick / 2)); pts_bot.append((x, y - thick / 2))
    p = pathops.Path(); pen = p.getPen()
    pen.moveTo(pts_bot[0])
    for q in pts_bot[1:]: pen.lineTo(q)
    for q in reversed(pts_top): pen.lineTo(q)
    pen.closePath()
    return p


def to_svg(path):
    b = path.bounds  # xmin, ymin, xmax, ymax (y up)
    pen = SVGPathPen(None, ntos=lambda v: ('%d' % round(v)))
    path.draw(TransformPen(pen, (1, 0, 0, -1, -b[0], CAP)))
    return {'d': pen.getCommands(), 'w': round(b[2] - b[0]), 'y0': round(CAP - b[3]), 'y1': round(CAP - b[1])}


def word(runs, track, optical, open_a=False, wave=False, lower=False):
    placed = layout(runs, track, optical, lower)
    acc = None
    for fi, g, x in placed:
        p = glyph_path(fi, g, x, open_a=open_a and g == 'A')
        acc = p if acc is None else pathops.op(acc, p, pathops.PathOp.UNION)
    if wave:
        b = acc.bounds
        acc = pathops.op(acc, wave_band(b[0] - 50, b[2] + 50, CAP * 0.06), pathops.PathOp.DIFFERENCE)
    return to_svg(acc)


R600 = instance(ROMAN, 600, 125)
R700 = instance(ROMAN, 700, 125)
R500 = instance(ROMAN, 500, 125)
R400 = instance(ROMAN, 400, 125)
R600N = instance(ROMAN, 600, 112.5)
I600 = instance(ITALIC, 600, 125)
em = lambda v: v * 1000

tuned = word([(R600, 'MEGASOLAR')], em(0.05), True)
V = [
    dict(n=41, name='As set', spec='SemiBold 600 · width 125 · font spacing · tracking 20', **{'word': word([(R600, 'MEGASOLAR')], em(0.02), False)}),
    dict(n=42, name='Tuned', spec='SemiBold 600 · width 125 · optical kerning · tracking 50', word=tuned),
    dict(n=43, name='Bold', spec='Bold 700 · width 125 · optical kerning · tracking 40', word=word([(R700, 'MEGASOLAR')], em(0.04), True)),
    dict(n=44, name='Medium, airy', spec='Medium 500 · width 125 · optical kerning · tracking 140', word=word([(R500, 'MEGASOLAR')], em(0.14), True)),
    dict(n=45, name='Semi-expanded', spec='SemiBold 600 · width 112.5 · optical kerning · tracking 50', word=word([(R600N, 'MEGASOLAR')], em(0.05), True)),
    dict(n=46, name='Open A', spec='Tuned, with the crossbar removed from both As', word=word([(R600, 'MEGASOLAR')], em(0.05), True, open_a=True)),
    dict(n=47, name='Wave cut', spec='Tuned, with the mark’s wave cut through the letters', word=word([(R600, 'MEGASOLAR')], em(0.05), True, wave=True)),
    dict(n=48, name='Italic', spec='Saira Italic 600 · width 125 · 12° lean, like the panels', word=word([(I600, 'MEGASOLAR')], em(0.05), True)),
    dict(n=49, name='Symbol as the M', spec='The mark at cap height stands in for the M', word=word([(R600, 'EGASOLAR')], em(0.05), True), full=tuned, lead=True),
    dict(n=50, name='Two weights', spec='MEGA in Bold 700 · SOLAR in Regular 400 · width 125', word=word([(R700, 'MEGA'), (R400, 'SOLAR')], em(0.05), True)),
    dict(n=51, name='Title case', spec='SemiBold 600 · width 125 · tracking 20', word=word([(R600, 'Megasolar')], em(0.02), True, lower=True), lower='title'),
    dict(n=52, name='Lowercase', spec='SemiBold 600 · width 125 · tracking 20', word=word([(R600, 'megasolar')], em(0.02), True, lower=True), lower='lower'),
]
for v in V:
    v.setdefault('full', v['word'])
    print(v['n'], v['name'], 'w', v['word']['w'], 'y', v['word']['y0'], v['word']['y1'], 'len', len(v['word']['d']), file=sys.stderr)
json.dump(V, open('tools/saira_data.json', 'w'))
