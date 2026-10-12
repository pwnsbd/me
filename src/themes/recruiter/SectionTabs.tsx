import { useEffect, useRef, useState } from 'react';
import styles from './recruiter.module.css';

type Section = { id: string; label: string };

/** Height of the sticky bars above a section: read from its `.anchor { scroll-margin-top }`, which changes on bare pages. */
const stickyOffset = (el: Element) => parseFloat(getComputedStyle(el).scrollMarginTop) || 0;

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function SectionTabs({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const key = sections.map((s) => s.id).join('|');
  const fallback = useRef(0);

  useEffect(() => {
    const ids = key ? key.split('|') : [];
    if (ids.length === 0) return;

    // Geometry, not IntersectionObserver: the last section whose heading has passed under the sticky bars.
    const pick = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && window.scrollY > 0) return setActive(ids[ids.length - 1]);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= stickyOffset(el) + 8) current = id;
      }
      setActive(current);
    };

    window.addEventListener('scroll', pick, { passive: true });

    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash && ids.includes(hash)) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      setActive(hash);
    }
    return () => {
      window.removeEventListener('scroll', pick);
      window.clearTimeout(fallback.current);
    };
  }, [key]);

  if (sections.length === 0) return null;

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
    setActive(id);
    // Smooth scroll can stall (throttled or non-painting tab): land instantly if it hasn't arrived.
    window.clearTimeout(fallback.current);
    fallback.current = window.setTimeout(() => {
      if (Math.abs(el.getBoundingClientRect().top - stickyOffset(el)) > 24) {
        el.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 900);
  };

  return (
    <nav aria-label="Sections" className={styles.tabs}>
      {sections.map((s) => (
        <button
          key={s.id}
          type="button"
          className={`${styles.tab} ${active === s.id ? styles.tabActive : ''}`}
          aria-current={active === s.id ? 'true' : undefined}
          onClick={() => go(s.id)}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}
