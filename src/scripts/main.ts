const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Before/after sliders: the range input drives a CSS custom property.
const compares = [...document.querySelectorAll<HTMLElement>('.compare')];
const setPos = (el: HTMLElement, value: number) => {
  const range = el.querySelector<HTMLInputElement>('.compare-range');
  if (range) range.value = String(value);
  el.style.setProperty('--pos', `${value}%`);
};
compares.forEach((el) => {
  const range = el.querySelector<HTMLInputElement>('.compare-range');
  if (!range) return;
  range.addEventListener('input', () => setPos(el, Number(range.value)));
  // Any direct interaction cancels the intro sweep below.
  const claim = () => (el.dataset.touched = 'true');
  range.addEventListener('pointerdown', claim);
  range.addEventListener('keydown', claim);
});

// First time a slider scrolls into view, sweep the divider from "all before" to the middle,
// so people see it's draggable. Runs once per slider and never fights the user.
if (!reduceMotion && 'IntersectionObserver' in window) {
  const sweep = (el: HTMLElement) => {
    const from = 100, to = 50, dur = 1400;
    let start = 0;
    const tick = (t: number) => {
      if (el.dataset.touched) return;
      start ||= t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setPos(el, Math.round((from + (to - from) * eased) * 10) / 10);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const sweepIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        sweepIO.unobserve(en.target);
        setTimeout(() => sweep(en.target as HTMLElement), 250);
      });
    },
    { threshold: 0.45 },
  );
  compares.forEach((el) => {
    setPos(el, 100);
    sweepIO.observe(el);
  });
}

// Project tabs (WAI-ARIA tabs pattern, arrow-key navigation).
document.querySelectorAll<HTMLElement>('[data-ba-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (tab: HTMLButtonElement, focus = false) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      select(tabs[(i + step + tabs.length) % tabs.length], true);
    });
  });
});

// Services: hovering or focusing an item swaps the sticky photo (desktop only; the text is always visible).
const slides = [...document.querySelectorAll<HTMLElement>('.sv-slide')];
document.querySelectorAll<HTMLElement>('.sv-item').forEach((item) => {
  const show = () => {
    document.querySelectorAll('.sv-item').forEach((i) => i.classList.toggle('is-active', i === item));
    slides.forEach((s) => (s.dataset.active = String(s.dataset.key === item.dataset.key)));
  };
  item.addEventListener('mouseenter', show);
  item.addEventListener('focus', show);
});
document.querySelector('.sv-item')?.classList.add('is-active');

// Process strip: prev/next buttons scroll by one step.
const steps = document.querySelector<HTMLElement>('.steps');
document.querySelectorAll<HTMLButtonElement>('.process-nav .round').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!steps) return;
    const step = steps.querySelector<HTMLElement>('.step');
    const gap = parseFloat(getComputedStyle(steps).columnGap) || 0;
    const by = (step?.offsetWidth ?? 300) + gap;
    steps.scrollBy({ left: by * Number(btn.dataset.dir), behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

// WhatsApp form: compose a message and open wa.me — nothing is sent anywhere else.
document.querySelectorAll<HTMLFormElement>('[data-wa-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = form.dataset;
    const data = new FormData(form);
    const val = (k: string) => String(data.get(k) ?? '').trim();
    const lines = [d.greeting ?? ''];
    if (val('name')) lines.push(`${d.lName}: ${val('name')}`);
    if (val('area')) lines.push(`${d.lArea}: ${val('area')}`);
    if (val('job')) lines.push(`${d.lJob}: ${val('job')}`);
    if (val('msg')) lines.push(`${d.lMsg}: ${val('msg')}`);
    const url = `https://wa.me/${d.number}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });
});

// Scroll reveals: headings rise, photos wipe open, rules draw. Elements that arrive together
// are staggered in reading order. Without JS or with reduced motion, everything is simply visible.
const motionEls = document.querySelectorAll<HTMLElement>('.reveal, .wipe, .draw');
if (reduceMotion || !('IntersectionObserver' in window)) {
  motionEls.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries
        .filter((en) => en.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
        .forEach((en, i) => {
          const el = en.target as HTMLElement;
          if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', `${Math.min(i, 6) * 0.09}s`);
          el.classList.add('is-in');
          io.unobserve(el);
        });
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  motionEls.forEach((el) => io.observe(el));

  // A fast fling or an anchor jump can skip past elements without them ever intersecting.
  // When scrolling settles, show anything that is now on screen or already above it.
  const catchUp = () => {
    motionEls.forEach((el) => {
      if (el.classList.contains('is-in') || el.offsetParent === null) return;
      const r = el.getBoundingClientRect();
      // Steps sit in a horizontal strip: ones still off to the right wait to be swiped to.
      if (r.top < window.innerHeight * 0.9 && r.left < window.innerWidth) {
        el.classList.add('is-in');
        io.unobserve(el);
      }
    });
  };
  let settle = 0;
  const onScrollSettled = () => {
    clearTimeout(settle);
    settle = window.setTimeout(catchUp, 120);
  };
  window.addEventListener('scroll', onScrollSettled, { passive: true });
  steps?.addEventListener('scroll', onScrollSettled, { passive: true });
}
