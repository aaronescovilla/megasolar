"""Polished Megasolar symbol: two leaning panels cut by a pulse that draws an M.

Everything is built from straight lines and true circular arcs, then the pulse is
subtracted from the panels. Run from the repository root:

    python3 tools/symbol2.py            # writes tools/symbol2_data.json

Units: the panel is H tall. y points down. The lean is a 1-in-3 slope.
"""
import json, math, sys
import pathops
from fontTools.pens.svgPathPen import SVGPathPen

K = 1 / 3  # horizontal shift per unit of height (about 18.4 degrees)


def sub(a, b): return (a[0] - b[0], a[1] - b[1])
def add(a, b): return (a[0] + b[0], a[1] + b[1])
def mul(a, s): return (a[0] * s, a[1] * s)
def norm(a):
    l = math.hypot(*a)
    return (a[0] / l, a[1] / l)


def fillet(pts, radii, closed):
    """Turn a polyline into lines and arcs. Returns a list of ('L', p, q) and ('A', c, r, a0, a1, ccw)."""
    n = len(pts)
    idx = range(n) if closed else range(1, n - 1)
    corner = {}
    for i in idx:
        v, p, q = pts[i], pts[(i - 1) % n], pts[(i + 1) % n]
        r = radii[i] if isinstance(radii, (list, tuple)) else radii
        u1, u2 = norm(sub(p, v)), norm(sub(q, v))
        phi = math.acos(max(-1, min(1, u1[0] * u2[0] + u1[1] * u2[1])))
        if r <= 0 or phi > math.pi - 1e-6:
            continue
        d = r / math.tan(phi / 2)
        a, b = add(v, mul(u1, d)), add(v, mul(u2, d))
        bis = norm(add(u1, u2))
        c = add(v, mul(bis, r / math.sin(phi / 2)))
        a0, a1 = math.atan2(a[1] - c[1], a[0] - c[0]), math.atan2(b[1] - c[1], b[0] - c[0])
        cross = (v[0] - p[0]) * (q[1] - v[1]) - (v[1] - p[1]) * (q[0] - v[0])
        corner[i] = (a, b, c, r, a0, a1, cross > 0)  # cross > 0: clockwise on screen
    out = []
    order = list(range(n)) + ([0] if closed else [])
    for j in range(len(order) - 1):
        i, k = order[j], order[j + 1]
        start = corner[i][1] if i in corner else pts[i]
        end = corner[k][0] if k in corner else pts[k]
        out.append(('L', start, end))
        if k in corner:
            a, b, c, r, a0, a1, cw = corner[k]
            out.append(('A', c, r, a0, a1, cw))
    return out


def arc_points(c, r, a0, a1, cw):
    """Cubic Bezier pieces for an arc, each at most 90 degrees."""
    da = a1 - a0
    if cw:
        while da <= 0: da += 2 * math.pi
    else:
        while da >= 0: da -= 2 * math.pi
    steps = max(1, math.ceil(abs(da) / (math.pi / 2) - 1e-9))
    seg = da / steps
    k = 4 / 3 * math.tan(seg / 4)
    out = []
    for s in range(steps):
        t0, t1 = a0 + seg * s, a0 + seg * (s + 1)
        p0 = (c[0] + r * math.cos(t0), c[1] + r * math.sin(t0))
        p3 = (c[0] + r * math.cos(t1), c[1] + r * math.sin(t1))
        p1 = (p0[0] - k * r * math.sin(t0), p0[1] + k * r * math.cos(t0))
        p2 = (p3[0] + k * r * math.sin(t1), p3[1] - k * r * math.cos(t1))
        out.append((p1, p2, p3))
    return out


def draw(elems, pen, move=True):
    first = True
    for e in elems:
        if e[0] == 'L':
            if first and move: pen.moveTo(e[1])
            elif first: pen.lineTo(e[1])
            pen.lineTo(e[2])
        else:
            _, c, r, a0, a1, cw = e
            start = (c[0] + r * math.cos(a0), c[1] + r * math.sin(a0))
            if first and move: pen.moveTo(start)
            elif first: pen.lineTo(start)
            for p1, p2, p3 in arc_points(c, r, a0, a1, cw): pen.curveTo(p1, p2, p3)
        first = False


def offset(elems, d):
    """Parallel curve at signed distance d (positive = to the right of travel on screen)."""
    out = []
    for e in elems:
        if e[0] == 'L':
            u = norm(sub(e[2], e[1]))
            nrm = (-u[1], u[0])
            out.append(('L', add(e[1], mul(nrm, d)), add(e[2], mul(nrm, d))))
        else:
            _, c, r, a0, a1, cw = e
            rr = r - d if cw else r + d
            out.append(('A', c, max(rr, 0.01), a0, a1, cw))
    return out


def reverse(elems):
    out = []
    for e in reversed(elems):
        if e[0] == 'L': out.append(('L', e[2], e[1]))
        else: out.append(('A', e[1], e[2], e[4], e[3], not e[5]))
    return out


def panel_path(x0, W, H, R):
    pts = [(x0, H), (x0 + W, H), (x0 + W + K * H, 0), (x0 + K * H, 0)]
    p = pathops.Path(); pen = p.getPen()
    draw(fillet(pts, R, True), pen); pen.closePath()
    return p


def band_path(center, t):
    p = pathops.Path(); pen = p.getPen()
    draw(offset(center, t / 2), pen)
    draw(reverse(offset(center, -t / 2)), pen, move=False)
    pen.closePath()
    return p


def build(H=240, W=144, G=24, T=24, R=24, peak=0.20, base=0.75, valley=0.75, rise=0.12, run=True, rp=20, rv=24, rb=20, lean=0.5):
    """Returns the symbol outline and its size.

    The module is H / 10: the gap, the pulse and the corner radius are each one module, the panel is six wide.
    W panel width, G gap between panels (measured across the gap), T pulse thickness, R corner radius.
    peak, base, valley: heights from the top as a share of H. rise: where the pulse leaves the base line,
    as a share of W from each outer edge. rp, rv, rb: centre-line radii at the peaks, valley and base corners.
    """
    gh = G * math.hypot(1, K)  # horizontal width of the leaning gap
    P = W + gh
    X = lambda u, y: (u + K * lean * (H - y) + K * (1 - lean) * (H - base * H), y)  # lean the pulse with the panels
    yP, yB, yV = peak * H, base * H, valley * H
    pts, rad = [], []
    if run:
        pts += [X(-W * 0.5, yB), X(rise * W, yB)]; rad += [0, rb]
    else:
        pts += [X(-rise * W, yB + (yB - yP) * 0.0)]; rad += [0]
    pts += [X(W / 2, yP), X(W + gh / 2, yV), X(P + W / 2, yP)]; rad += [rp, rv, rp]
    if run:
        pts += [X(P + W - rise * W, yB), X(P + W * 1.5, yB)]; rad += [rb, 0]
    else:
        pts += [X(P + W + rise * W, yB)]; rad += [0]
    center = fillet(pts, rad, False)
    panels = pathops.op(panel_path(0, W, H, R), panel_path(P, W, H, R), pathops.PathOp.UNION, fix_winding=True)
    band = band_path(center, T)
    sym = pathops.op(panels, band, pathops.PathOp.DIFFERENCE, fix_winding=True)
    pulse = pathops.op(panels, band, pathops.PathOp.INTERSECTION, fix_winding=True)

    def svg(path):
        pen = SVGPathPen(None, ntos=lambda v: ('%.2f' % v).rstrip('0').rstrip('.'))
        path.draw(pen)
        return pen.getCommands()
    return {'d': svg(sym), 'pulse': svg(pulse), 'panels': svg(panels), 'w': round(P + W + K * H, 2), 'h': H}


if __name__ == '__main__':
    out = {'master': build(), 'small': build(G=30, T=30, R=22, rp=24, rv=30, rb=24)}
    json.dump(out, open('tools/symbol2_data.json', 'w'))
    print({k: (v['w'], v['h'], len(v['d'])) for k, v in out.items()})
