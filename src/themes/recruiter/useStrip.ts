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

  // Wheel anywhere on the page (not just over the strip) scrolls the strip sideways, while the
  // strip can still move that way. Boxes that scroll vertically themselves keep their wheel.
  useEffect(() => {
    const strip = ref.current;
    if (!strip) return;
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
      strip.scrollLeft += e.deltaY;
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
