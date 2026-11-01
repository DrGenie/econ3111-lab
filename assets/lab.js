/* ECON3111 Lab: shared helpers (no external libraries). */
const Lab = (() => {
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || n;
  const C = { ink:'#121417', blue:'#1C4F9C', amber:'#E8A317', teal:'#0F766E', brick:'#B42318', leaf:'#2E7D32', plum:'#5B3E96', slate:'#5F6B7A' };

  function header(week, title) {
    const h = document.createElement('header');
    h.className = 'top';
    h.innerHTML = `<a href="index.html"><img src="assets/uon_h_white.svg" alt="University of Newcastle"></a>
      <div><div class="wk">ECON3111 LAB${week !== '' ? ' · WEEK ' + week : ''}</div><h1>${title}</h1></div>
      <nav><a href="index.html">All labs</a><a href="podcast.html">Podcast</a></nav>`;
    document.body.prepend(h);
    const f = document.createElement('footer');
    f.innerHTML = 'ECON3111 Behavioural Economics, Newcastle Business School, University of Newcastle. Teaching simulations; nothing you enter leaves your browser.';
    document.body.append(f);
  }

  function tabs(root = document) {
    root.querySelectorAll('.tabs').forEach(t => {
      const btns = [...t.querySelectorAll('button')];
      const show = id => {
        btns.forEach(b => b.classList.toggle('on', b.dataset.tab === id));
        document.querySelectorAll('.panel').forEach(p => p.classList.toggle('on', p.id === id));
      };
      btns.forEach(b => b.addEventListener('click', () => { show(b.dataset.tab); history.replaceState(null, '', '#' + b.dataset.tab); }));
      const h = location.hash.slice(1);
      show(btns.some(b => b.dataset.tab === h) ? h : btns[0].dataset.tab);
    });
  }

  const fmt = (x, d = 2) => (Math.round(x * 10 ** d) / 10 ** d).toLocaleString(undefined, { maximumFractionDigits: d });
  const money = (x, d = 2) => (x < 0 ? '-$' : '$') + Math.abs(x).toLocaleString(undefined, { minimumFractionDigits: d, maximumFractionDigits: d });
  const pct = (x, d = 1) => fmt(100 * x, d) + '%';
  const rand = () => Math.random();
  const store = {
    get(k, d) { try { const v = localStorage.getItem('econ3111:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('econ3111:' + k, JSON.stringify(v)); } catch (e) {} }
  };

  // ---------- SVG charts ----------
  const NS = 'http://www.w3.org/2000/svg';
  function svg(el, w = 640, h = 340) {
    el.innerHTML = '';
    const s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', `0 0 ${w} ${h}`); s.setAttribute('class', 'chart');
    el.appendChild(s); return s;
  }
  function add(s, tag, attrs, text) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (text !== undefined) e.textContent = text;
    s.appendChild(e); return e;
  }
  function niceTicks(lo, hi, n = 5) {
    const span = hi - lo || 1, step0 = span / n, mag = 10 ** Math.floor(Math.log10(step0));
    const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(st => st >= step0) || step0;
    const out = []; for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
    return out;
  }
  function axes(s, o) {
    const { W, H, m, xmin, xmax, ymin, ymax } = o;
    const X = x => m.l + (x - xmin) / (xmax - xmin) * (W - m.l - m.r);
    const Y = y => H - m.b - (y - ymin) / (ymax - ymin) * (H - m.t - m.b);
    const fg = 'currentColor';
    add(s, 'line', { x1: m.l, y1: H - m.b, x2: W - m.r, y2: H - m.b, stroke: fg, 'stroke-opacity': .5 });
    add(s, 'line', { x1: m.l, y1: m.t, x2: m.l, y2: H - m.b, stroke: fg, 'stroke-opacity': .5 });
    if (!o.noXTicks) niceTicks(xmin, xmax, o.xticks || 6).forEach(v => {
      add(s, 'text', { x: X(v), y: H - m.b + 16, 'text-anchor': 'middle', 'font-size': 11, fill: fg, 'fill-opacity': .7 }, o.xfmt ? o.xfmt(v) : fmt(v));
    });
    niceTicks(ymin, ymax, o.yticks || 5).forEach(v => {
      add(s, 'line', { x1: m.l, x2: W - m.r, y1: Y(v), y2: Y(v), stroke: fg, 'stroke-opacity': .08 });
      add(s, 'text', { x: m.l - 6, y: Y(v) + 4, 'text-anchor': 'end', 'font-size': 11, fill: fg, 'fill-opacity': .7 }, o.yfmt ? o.yfmt(v) : fmt(v));
    });
    if (o.xlabel) add(s, 'text', { x: (m.l + W - m.r) / 2, y: H - 4, 'text-anchor': 'middle', 'font-size': 12, fill: fg }, o.xlabel);
    if (o.ylabel) add(s, 'text', { x: 12, y: (m.t + H - m.b) / 2, 'text-anchor': 'middle', 'font-size': 12, fill: fg, transform: `rotate(-90 12 ${(m.t + H - m.b) / 2})` }, o.ylabel);
    return { X, Y };
  }
  // series: [{pts:[[x,y]...], color, label, dash, dots}]
  function line(el, o) {
    const W = o.W || 640, H = o.H || 340, m = { l: 52, r: 16, t: 14, b: 40 };
    const s = svg(el, W, H); s.style.color = 'var(--fg)';
    const all = o.series.flatMap(se => se.pts);
    const xmin = o.xmin ?? Math.min(...all.map(p => p[0])), xmax = o.xmax ?? Math.max(...all.map(p => p[0]));
    const ymin = o.ymin ?? Math.min(0, ...all.map(p => p[1])), ymax = o.ymax ?? Math.max(...all.map(p => p[1])) * 1.05;
    const { X, Y } = axes(s, { W, H, m, xmin, xmax, ymin, ymax, ...o });
    (o.refs || []).forEach(r => add(s, 'line', { x1: X(r.x1), y1: Y(r.y1), x2: X(r.x2), y2: Y(r.y2), stroke: r.color || C.slate, 'stroke-dasharray': '4 4' }));
    o.series.forEach((se, i) => {
      const d = se.pts.map((p, j) => (j ? 'L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(Math.max(ymin, Math.min(ymax, p[1]))).toFixed(1)).join(' ');
      add(s, 'path', { d, fill: 'none', stroke: se.color || C.blue, 'stroke-width': se.w || 2.5, 'stroke-dasharray': se.dash || '' });
      if (se.dots) se.pts.forEach(p => add(s, 'circle', { cx: X(p[0]), cy: Y(p[1]), r: 3.5, fill: se.color || C.blue }));
      if (se.label) add(s, 'text', { x: W - m.r - 4, y: m.t + 14 + i * 16, 'text-anchor': 'end', 'font-size': 12, fill: se.color || C.blue, 'font-weight': 600 }, se.label);
    });
    (o.points || []).forEach(p => {
      add(s, 'circle', { cx: X(p.x), cy: Y(p.y), r: 5, fill: p.color || C.brick });
      if (p.label) add(s, 'text', { x: X(p.x) + 8, y: Y(p.y) - 8, 'font-size': 12, fill: p.color || C.brick, 'font-weight': 600 }, p.label);
    });
    return { s, X, Y };
  }
  // bars: labels[], values[], colors[] optional
  function bars(el, o) {
    const W = o.W || 640, H = o.H || 320, m = { l: 52, r: 12, t: 14, b: 46 };
    const s = svg(el, W, H); s.style.color = 'var(--fg)';
    const n = o.values.length, ymax = o.ymax ?? Math.max(1e-9, ...o.values) * 1.12;
    const { Y } = axes(s, { W, H, m, xmin: 0, xmax: n, ymin: 0, ymax, noXTicks: true, ...o });
    const bw = (W - m.l - m.r) / n;
    o.values.forEach((v, i) => {
      const x = m.l + i * bw + bw * 0.15, w = bw * 0.7;
      add(s, 'rect', { x, y: Y(v), width: w, height: Math.max(0, Y(0) - Y(v)), fill: (o.colors && o.colors[i]) || o.color || C.amber });
      if (o.showValues !== false) add(s, 'text', { x: x + w / 2, y: Y(v) - 4, 'text-anchor': 'middle', 'font-size': 11, fill: 'currentColor' }, o.vfmt ? o.vfmt(v) : fmt(v, 1));
      add(s, 'text', { x: x + w / 2, y: H - m.b + 16, 'text-anchor': 'middle', 'font-size': 11, fill: 'currentColor', 'fill-opacity': .8 }, o.labels[i]);
    });
    return s;
  }
  function hist(el, data, o = {}) {
    const lo = o.lo ?? Math.min(...data), hi = o.hi ?? Math.max(...data), k = o.bins || 10;
    const w = (hi - lo) / k || 1, counts = Array(k).fill(0);
    data.forEach(v => { let i = Math.floor((v - lo) / w); if (i >= k) i = k - 1; if (i < 0) i = 0; counts[i]++; });
    const labels = counts.map((_, i) => fmt(lo + i * w, 0));
    return bars(el, { labels, values: counts, vfmt: v => v || '', ...o });
  }
  return { C, header, tabs, fmt, money, pct, rand, store, line, bars, hist, svg, add };
})();
