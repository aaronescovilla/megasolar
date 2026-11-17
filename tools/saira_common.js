    const CAP = 688, XH = 510, R = 663.34 / 400;
    const r1 = (n) => Math.round(n * 10) / 10;
    const fit = (vw, vh, maxW, maxH) => {
      let s = maxW / vw;
      if (vh * s > maxH) s = maxH / vh;
      return s;
    };
    // Horizontal lockup geometry in font units (y down, cap top 0, baseline CAP).
    const hz = (v, k) => {
      let mh, top, gap;
      if (v.lead) { mh = CAP; top = 0; gap = 60; }
      else if (v.lower === 'lower') { mh = 0.9 * k * CAP; top = CAP - XH / 2 - mh / 2; gap = 0.42 * CAP; }
      else { mh = k * CAP; top = CAP / 2 - mh / 2; gap = 0.42 * CAP; }
      const mw = mh * R;
      return { mh, mw, top, gap, W: mw + gap + v.word.w, y0: Math.min(top, v.word.y0), y1: Math.max(top + mh, v.word.y1) };
    };
    const lockAt = (v, k, s) => {
      const g = hz(v, k);
      return {
        w: r1(g.W * s), h: r1((g.y1 - g.y0) * s), vb: '0 ' + r1(g.y0) + ' ' + r1(g.W) + ' ' + r1(g.y1 - g.y0),
        mt: 'translate(0 ' + r1(g.top) + ') scale(' + (g.mh / 400).toFixed(4) + ')',
        wt: 'translate(' + r1(g.mw + g.gap) + ' 0)', mhPx: r1(g.mh * s), clear: r1(g.mh * s / 2)
      };
    };
    const lockup = (v, k, maxW, maxH) => {
      const g = hz(v, k);
      return lockAt(v, k, fit(g.W, g.y1 - g.y0, maxW, maxH));
    };
    const lockupMark = (v, k, mhPx) => lockAt(v, k, mhPx / hz(v, k).mh);
    const stacked = (v, maxW, maxH) => {
      const f = v.full, mh = 2.4 * CAP, mw = mh * R, gap = 0.62 * CAP, W = Math.max(f.w, mw), y1 = mh + gap + f.y1;
      const s = fit(W, y1, maxW, maxH);
      return {
        w: r1(W * s), h: r1(y1 * s), vb: '0 0 ' + r1(W) + ' ' + r1(y1),
        mt: 'translate(' + r1((W - mw) / 2) + ' 0) scale(' + (mh / 400).toFixed(4) + ')',
        wt: 'translate(' + r1((W - f.w) / 2) + ' ' + r1(mh + gap) + ')'
      };
    };
    const wordOnly = (v, maxW, maxH) => {
      const f = v.full, vh = f.y1 - f.y0, s = fit(f.w, vh, maxW, maxH);
      return { w: r1(f.w * s), h: r1(vh * s), vb: '0 ' + f.y0 + ' ' + f.w + ' ' + vh };
    };
