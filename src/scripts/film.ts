// FILM — scroll scrubs a 0–12 clock. Each photo frame fades in over its window, the whole picture pushes in
// slowly, pins sit on fixed points of the photo and captions come and go with a blur.
const film = document.getElementById('film');

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const span = (t: number, a: number, b: number) => (b <= a ? (t >= a ? 1 : 0) : clamp((t - a) / (b - a)));
const smooth = (x: number) => x * x * (3 - 2 * x);
const FRAME_W = 2000, FRAME_H = 1116;

if (film) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = film.querySelector<HTMLElement>('.film__stage')!;
  const box = film.querySelector<HTMLElement>('.film__box')!;
  const push = film.querySelector<HTMLElement>('.film__push')!;
  const hint = film.querySelector<HTMLElement>('.film__hint');
  const photo = film.querySelector<HTMLElement>('.film__photo')!;
  const frames = [...film.querySelectorAll<HTMLElement>('.film__frame')];
  const scenes = [...film.querySelectorAll<HTMLElement>('.film__scene')];
  const pins = [...film.querySelectorAll<HTMLElement>('.film__pin')];
  const map = film.dataset.map!.split(',').map((pair) => pair.split(':').map(Number));
  const interp = (p: number) => {
    for (let i = 1; i < map.length; i++) {
      if (p <= map[i][0]) return map[i - 1][1] + (map[i][1] - map[i - 1][1]) * span(p, map[i - 1][0], map[i][0]);
    }
    return map[map.length - 1][1];
  };

  // Pins are placed in frame pixels; work out where the cover-fitted photo lands inside its <img> box
  // (full stage on wide screens, the lower part of it on tall ones).
  const firstImg = frames[0].querySelector('img')!;
  const placePins = () => {
    const bw = firstImg.clientWidth, bh = firstImg.clientHeight;
    if (!bw || !bh) return;
    const cs = getComputedStyle(box);
    const px = parseFloat(cs.getPropertyValue('--fx')) / 100, py = parseFloat(cs.getPropertyValue('--fy')) / 100;
    const s = Math.max(bw / FRAME_W, bh / FRAME_H);
    const ox = (bw - FRAME_W * s) * px, oy = firstImg.offsetTop + (bh - FRAME_H * s) * py;
    pins.forEach((pin) => {
      pin.style.left = `${(ox + Number(pin.dataset.x) * s).toFixed(1)}px`;
      pin.style.top = `${(oy + Number(pin.dataset.y) * s).toFixed(1)}px`;
    });
  };

  function drawFilm(t: number) {
    frames.forEach((el, k) => {
      if (k === 0) return;
      el.style.opacity = smooth(span(t, Number(el.dataset.in), Number(el.dataset.inTo))).toFixed(3);
    });
    // a slow push-in over the whole film
    push.style.transform = `scale(${(1 + 0.07 * smooth(t / 12)).toFixed(4)})`;
    // blueprint first: light copy on navy; every photo after it takes dark copy
    film!.classList.toggle('is-light', t > 1.3);
    for (const pin of pins) {
      const o = Math.min(clamp((t - Number(pin.dataset.from)) / 0.25), clamp((Number(pin.dataset.to) - t) / 0.25));
      pin.style.opacity = o.toFixed(3);
      pin.style.visibility = o < 0.01 ? 'hidden' : 'visible';
    }
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

  placePins();
  window.addEventListener('resize', placePins);

  if (reduce) {
    // A still: the finished house with the opening copy. No scroll-scrubbing.
    film.classList.add('film--static');
    frames.forEach((el, k) => (el.style.opacity = k === 5 ? '1' : k === 0 ? '1' : '0'));
    film.classList.add('is-light');
    scenes.forEach((el, i) => {
      const on = i === 0;
      el.style.opacity = on ? '1' : '0';
      el.style.visibility = on ? 'visible' : 'hidden';
      el.setAttribute('aria-hidden', String(!on));
    });
  } else {
    let current = 0, target = 0, animating = false;

    // The header sits on the dark blueprint while that is what's under it.
    const headerTone = () => {
      const dark = film.getBoundingClientRect().bottom > 80 && !film.classList.contains('is-light');
      const tone = dark ? 'dark' : '';
      if (document.documentElement.dataset.header !== tone) document.documentElement.dataset.header = tone;
    };
    const draw = () => { drawFilm(current); captions(current); headerTone(); };

    const update = () => {
      const r = film.getBoundingClientRect();
      const p = clamp(-r.top / (film.offsetHeight - stage.offsetHeight));
      target = interp(p);
      headerTone();
      if (!animating) { animating = true; requestAnimationFrame(tick); }
    };
    // Ease the playhead toward the scroll position so coarse wheel steps still read as motion.
    function tick() {
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.002) current = target;
      draw();
      if (current !== target) requestAnimationFrame(tick);
      else animating = false;
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    film.classList.add('is-ready');
    update();
    draw();
  }
}
