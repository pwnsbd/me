import { useCallback, useEffect, useRef, useState } from 'react';

/** Horizontal strip: tracks the centred child, redirects vertical wheel sideways, scrolls to a child. */
export function useStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const update = useCallback(() => {
    const strip = ref.current;
    if (!strip) return;
    const mid = strip.scrollLeft + strip.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(strip.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    setCurrent(best);
  }, []);

  // Wheel anywhere on the page (not just over the strip) moves the strip one item per notch,
  // while it can still move that way. Small scrollLeft nudges don't work: scroll-snap pulls a
  // ~100px mouse-wheel step back to the same item. Boxes that scroll vertically keep their wheel.
  useEffect(() => {
    const strip = ref.current;
    if (!strip) return;
    let lockedUntil = 0;
    let acc = 0;
    let step = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (strip.scrollWidth <= strip.clientWidth + 1) return; // stacked layout
      for (let el = e.target as HTMLElement | null; el && el !== strip && el !== document.body; el = el.parentElement) {
        const oy = getComputedStyle(el).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
          const atEnd = e.deltaY > 0 ? el.scrollTop + el.clientHeight >= el.scrollHeight - 1 : el.scrollTop <= 0;
          if (!atEnd) return;
        }
      }
      const max = strip.scrollWidth - strip.clientWidth;
      if ((e.deltaY < 0 && strip.scrollLeft <= 0) || (e.deltaY > 0 && strip.scrollLeft >= max - 1)) return;
      e.preventDefault();
      // One step per gesture: trackpads send many small events, a mouse notch one big one.
      const now = performance.now();
      if (now < lockedUntil) return;
      acc += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
      if (Math.abs(acc) < 40) return;
      const box = strip.getBoundingClientRect();
      const offset = (el: Element) => {
        const r = el.getBoundingClientRect();
        return r.left + r.width / 2 - (box.left + box.width / 2); // item centre vs strip centre
      };
      const items = Array.from(strip.children);
      let here = 0;
      items.forEach((el, i) => { if (Math.abs(offset(el)) < Math.abs(offset(items[here]))) here = i; });
      const next = Math.max(0, Math.min(items.length - 1, here + Math.sign(acc)));
      acc = 0;
      lockedUntil = now + 450;
      const left = Math.max(0, Math.min(max, strip.scrollLeft + offset(items[next])));
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      strip.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
      // Smooth scroll can stall (throttled tab): land instantly if it hasn't arrived.
      const mine = ++step;
      window.setTimeout(() => { if (mine === step && Math.abs(strip.scrollLeft - left) > 4) strip.scrollLeft = left; }, 700);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  useEffect(() => { update(); }, [update]);

  const goTo = (i: number) => {
    const el = ref.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  return { ref, current, update, goTo };
}
