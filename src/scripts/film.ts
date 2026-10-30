// FILM — scroll scrubs a 0–12 clock; every layer of the house drawing reads its state off that clock.
// Stages: plot (on load) · Keşif dims 1.5–3.7 · Hazırlık damage/scrape 3.6–7.2 · Yalıtım boards/render 6.1–8.2
// · Boya whitewash/daylight 8.4–10 · final flowers + real photo 10.3–11.6.
const film = document.getElementById('film');

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const smooth = (x: number) => x * x * (3 - 2 * x);
const CHALK = [233, 238, 247];
const INK = [27, 42, 68];
const mix = (a: number[], b: number[], k: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`;

if (film) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = film.querySelector<HTMLElement>('.film__stage')!;
  const svg = film.querySelector<SVGSVGElement>('.film__svg')!;
  const sky = film.querySelector<HTMLElement>('.film__sky')!;
  const hint = film.querySelector<HTMLElement>('.film__hint');
  const photo = film.querySelector<HTMLElement>('.film__photo')!;
  const notes = film.querySelector<SVGGElement>('.film__notes')!;
  const scenes = [...film.querySelectorAll<HTMLElement>('.film__scene')];
  const layer = (k: string) => film.querySelector<SVGElement>(`[data-f="${k}"]`)!;
  const L = {
    day: layer('day'), raw: layer('raw'), damage: layer('damage'), primer: layer('primer'),
    boards: layer('boards'), plaster: layer('plaster'), rise: layer('rise'), sweep: layer('sweep'),
    roller: layer('roller'), cracks: layer('cracks'), openings: layer('openings'), lines: layer('lines'),
    cypress: layer('cypress'), flowers: layer('flowers'), dims: layer('dims'), holes: layer('holes'),
    damageNotes: layer('damageNotes'), mantoNotes: layer('mantoNotes'), paintNote: layer('paintNote'),
  };
  const linePaths = [...L.lines.querySelectorAll('path')];
  const crackPaths = [...L.cracks.querySelectorAll('path')];
  const map = film.dataset.map!.split(',').map((pair) => pair.split(':').map(Number));
  const interp = (p: number) => {
    for (let i = 1; i < map.length; i++) {
      if (p <= map[i][0]) return map[i - 1][1] + (map[i][1] - map[i - 1][1]) * span(p, map[i - 1][0], map[i][0]);
    }
    return map[map.length - 1][1];
  };
  const op = (el: Element, v: number) => el.setAttribute('opacity', v.toFixed(3));

  linePaths.forEach((p) => p.setAttribute('stroke-dasharray', '1'));
  let intro = reduce ? 1 : 0;

  function drawHouse(t: number) {
    const plot = smooth(intro);
    linePaths.forEach((p) => p.setAttribute('stroke-dashoffset', (1 - plot).toFixed(3)));

    const day = smooth(span(t, 8.6, 10));
    const ink = mix(CHALK, INK, day);
    L.lines.setAttribute('stroke', ink);
    notes.style.color = ink;
    op(L.day, day);
    op(L.cypress, day);
    sky.style.opacity = day.toFixed(3);
    film!.classList.toggle('is-light', day > 0.55);

    // Keşif: measurements
    op(L.dims, span(t, 1.5, 2.1) * (1 - span(t, 3.3, 3.7)));

    // Hazırlık: the house shows its age, then gets scraped back to primer
    op(L.raw, span(t, 3.6, 4.2) * (1 - span(t, 7.1, 7.8)));
    op(L.damage, span(t, 3.8, 4.4) * (1 - span(t, 4.9, 5.6)));
    const crack = span(t, 3.9, 4.6);
    crackPaths.forEach((p) => p.setAttribute('stroke-dashoffset', (1 - crack).toFixed(3)));
    op(L.cracks, (crack > 0 ? 1 : 0) * (1 - span(t, 4.9, 5.6)));
    op(L.primer, span(t, 4.9, 5.6) * (1 - span(t, 6.6, 7.2)));
    op(L.damageNotes, span(t, 4.1, 4.6) * (1 - span(t, 5.4, 5.8)));

    // Yalıtım: boards rise course by course, then render covers them
    const rise = smooth(span(t, 6.1, 7.1));
    L.rise.setAttribute('y', (820 - 520 * rise).toFixed(1));
    L.rise.setAttribute('height', (520 * rise + 20).toFixed(1));
    op(L.boards, (rise > 0 ? 1 : 0) * (1 - span(t, 7.3, 8)));
    op(L.plaster, span(t, 7.1, 7.8));
    op(L.mantoNotes, span(t, 6.3, 6.8) * (1 - span(t, 7.8, 8.2)));

    // Boya: a roller sweeps the whitewash across, windows get their blue, daylight comes up
    const sweep = smooth(span(t, 8.4, 9.4));
    L.sweep.setAttribute('width', (720 * sweep).toFixed(1));
    L.roller.setAttribute('x', (834 + 720 * sweep).toFixed(1));
    op(L.roller, Math.sin(sweep * Math.PI) * 0.9);
    op(L.openings, span(t, 9, 9.6));
    op(L.holes, 1 - span(t, 9, 9.6));
    op(L.paintNote, span(t, 9.2, 9.6) * (1 - span(t, 10.2, 10.5)));

    // Final: bougainvillea, and a real job to show it isn't just a drawing
    const bloom = smooth(span(t, 10.3, 11.1));
    L.flowers.style.transform = `scale(${bloom.toFixed(3)})`;
    op(L.flowers, bloom);
    const shown = span(t, 10.9, 11.6);
    photo.style.opacity = shown.toFixed(3);
    photo.style.transform = `translateY(${((1 - shown) * 24).toFixed(1)}px)`;
    if (hint) hint.style.opacity = (1 - span(t, 0.15, 0.7)).toFixed(3);
  }

  function captions(t: number) {
    const fade = 0.3;
    for (const el of scenes) {
      const from = Number(el.dataset.from), to = Number(el.dataset.to);
      const o = Math.min(from <= 0 ? 1 : clamp((t - from) / fade), clamp((to - t) / fade));
      el.style.opacity = o.toFixed(3);
      el.style.visibility = o < 0.01 ? 'hidden' : 'visible';
      el.style.filter = o < 1 ? `blur(${((1 - o) * 6).toFixed(1)}px)` : '';
      el.style.transform = o < 1 ? `translateY(${((1 - o) * 16).toFixed(1)}px)` : '';
      const live = o > 0.5;
      if (el.dataset.live !== String(live)) {
        el.dataset.live = String(live);
        el.setAttribute('aria-hidden', String(!live));
        el.querySelectorAll('a').forEach((a) => (a.tabIndex = live ? 0 : -1));
      }
    }
  }

  // Frame the scene for the stage: on wide screens the house (≈700 units) gets at most 46% of the width,
  // pinned right so the copy has its own side; on tall screens it's centred and kept to the bottom 46%.
  const frameView = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    if (w / h < 1) {
      const W = Math.max(860, (w * 820) / (0.46 * h)), H = (W * h) / w;
      svg.setAttribute('viewBox', `${1180 - W / 2} ${1110 - H} ${W} ${H}`);
    } else {
      const s = Math.min(h / 1000, (w * 0.46) / 700), W = w / s, H = h / s;
      svg.setAttribute('viewBox', `${1560 - W} ${1000 - H} ${W} ${H}`);
    }
  };
  frameView();
  window.addEventListener('resize', frameView);

  if (reduce) {
    // A still: the finished house with the opening copy. No scroll-scrubbing.
    film.classList.add('film--static');
    drawHouse(12);
    scenes.forEach((el, i) => {
      const on = i === 0;
      el.style.opacity = on ? '1' : '0';
      el.style.visibility = on ? 'visible' : 'hidden';
      el.setAttribute('aria-hidden', String(!on));
    });
    photo.style.opacity = '0';
  } else {
    let current = 0, target = 0, animating = false;
    // The header sits on the dark blueprint while that is what's under it.
    const headerTone = () => {
      const dark = film.getBoundingClientRect().bottom > 80 && !film.classList.contains('is-light');
      const tone = dark ? 'dark' : '';
      if (document.documentElement.dataset.header !== tone) document.documentElement.dataset.header = tone;
    };
    const draw = () => { drawHouse(current); captions(current); headerTone(); };

    const update = () => {
      const r = film.getBoundingClientRect();
      const p = clamp(-r.top / (film.offsetHeight - stage.offsetHeight));
      target = interp(p);
      headerTone();
      if (!animating) { animating = true; requestAnimationFrame(tick); }
    };
    // Ease the playhead toward the scroll position so coarse wheel steps still read as motion.
    function tick() {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.002) current = target;
      draw();
      if (current !== target) requestAnimationFrame(tick);
      else animating = false;
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    film.classList.add('is-ready');
    update();

    // Intro: the blueprint plots itself once, on load.
    const start = performance.now();
    (function plotIn(now: number) {
      intro = clamp((now - start) / 1800);
      if (!animating) draw();
      if (intro < 1) requestAnimationFrame(plotIn);
    })(start);
  }
}
