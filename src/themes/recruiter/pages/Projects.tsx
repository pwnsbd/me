import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { GROUPS, PROJECTS } from '../../../content';
import { ProjectSketch } from '../../creative/components/ProjectSketches';
import homeStyles from '../home.module.css';
import { slugify } from '../slug';
import { useStrip } from '../useStrip';
import styles from '../projects.module.css';

type Project = (typeof PROJECTS)[number];

const readHash = () => {
  const h = decodeURIComponent(window.location.hash.slice(1));
  return PROJECTS.some((p) => slugify(p.title) === h) ? h : null;
};
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The creative sketches draw into the 12..308 x 38..210 window content area and use the
// creative palette via CSS variables, so the wrapper supplies a pencil-on-white palette.
function Sketch({ kind }: { kind: Project['sketch'] }) {
  return (
    <svg className={styles.sketch} viewBox="12 38 296 172" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <ProjectSketch kind={kind} />
    </svg>
  );
}

export function Projects() {
  const [sel, setSel] = useState<string | null>(readHash);
  const [animated, setAnimated] = useState(false); // false on direct load: no entrance animation
  const { ref: stripRef, current, update, goTo } = useStrip();
  const before = useRef<Map<string, DOMRect> | null>(null);
  const selRef = useRef(sel);

  const change = useCallback((slug: string | null, push: boolean) => {
    if (slug === selRef.current) return;
    const rects = new Map<string, DOMRect>();
    Array.from(stripRef.current?.children ?? []).forEach((c) => {
      const el = c as HTMLElement;
      if (el.dataset.slug) rects.set(el.dataset.slug, el.getBoundingClientRect());
    });
    before.current = rects;
    selRef.current = slug;
    setAnimated(true);
    setSel(slug);
    if (push) {
      const { pathname, search } = window.location;
      window.history.pushState(null, '', pathname + search + (slug ? `#${slug}` : ''));
    }
  }, [stripRef]);

  // Back/forward and manual hash edits.
  useEffect(() => {
    const onNav = () => change(readHash(), false);
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => {
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
    };
  }, [change]);

  useEffect(() => {
    if (!sel) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') change(null, true); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel, change]);

  // FLIP: cards keep their DOM nodes across the layout change; play from old rect to new.
  // Nothing waits on the animation, so state can never get stuck.
  useLayoutEffect(() => {
    const strip = stripRef.current;
    const old = before.current;
    before.current = null;
    if (!strip) return;
    const kids = Array.from(strip.children) as HTMLElement[];
    if (sel) kids.find((k) => k.dataset.slug === sel)?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
    else strip.scrollLeft = 0;
    if (!old || reducedMotion()) return;
    kids.forEach((el) => {
      const o = el.dataset.slug ? old.get(el.dataset.slug) : undefined;
      if (!o) return;
      const n = el.getBoundingClientRect();
      if (!n.width || !n.height) return;
      el.animate([
        { transformOrigin: 'top left', transform: `translate(${o.left - n.left}px, ${o.top - n.top}px) scale(${o.width / n.width}, ${o.height / n.height})` },
        { transformOrigin: 'top left', transform: 'none' },
      ], { duration: 450, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' });
    });
  }, [sel, stripRef]);

  const active = PROJECTS.find((p) => slugify(p.title) === sel);
  const mini = !!active;

  return (
    <div className={`${styles.stage} ${mini ? styles.stageDetail : ''}`}>
      {!mini && (
        <div className={homeStyles.ruler} role="tablist" aria-label="Projects">
          {PROJECTS.map((p, i) => (
            <button key={p.title} type="button" role="tab" aria-selected={i === current} aria-label={p.title}
              className={`${homeStyles.tick} ${i === current ? homeStyles.tickActive : ''}`} onClick={() => goTo(i)} />
          ))}
        </div>
      )}
      <div className={`${styles.strip} ${mini ? styles.mini : ''}`} ref={stripRef} onScroll={update}>
        {PROJECTS.map((p) => {
          const slug = slugify(p.title);
          const selected = slug === sel;
          return (
            <div key={p.title} data-slug={slug} className={`${styles.item} ${selected ? styles.itemSel : ''}`}>
              <div className={homeStyles.label}>{GROUPS.find((g) => g.id === p.group)?.label}</div>
              <button type="button" className={styles.card} aria-pressed={selected}
                onClick={() => change(selected ? null : slug, true)}>
                <span className={styles.sketchBox}><Sketch kind={p.sketch} /></span>
                <span className={styles.cardTitle}>{p.title}</span>
                <span className={styles.cardTag}>{p.tag}</span>
              </button>
            </div>
          );
        })}
      </div>
      {active && (
        <article className={`${styles.detail} ${animated ? styles.rise : ''}`} aria-label={active.title}>
          <button type="button" className={styles.close} onClick={() => change(null, true)}>× close</button>
          <div key={active.title} className={`${styles.detailBody} ${animated ? styles.swap : ''}`}>
            <div className={styles.text}>
              <h1 className={styles.title}>{active.title}</h1>
              <div className={styles.meta}>{active.tag} · {active.status}</div>
              {(active.github || active.link) && (
                <div className={styles.links}>
                  {active.link && <a href={active.link} target="_blank" rel="noreferrer">{active.linkLabel ?? 'Live site'} ↗</a>}
                  {active.github && <a href={active.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                </div>
              )}
              <p className={styles.desc}>{active.description}</p>
              {active.problem && <><h2 className={styles.h}>Problem</h2><p>{active.problem}</p></>}
              {active.vision && <><h2 className={styles.h}>Vision</h2><p>{active.vision}</p></>}
              {active.stack && <><h2 className={styles.h}>Stack</h2><p>{active.stack}</p></>}
            </div>
            <div className={styles.big}><Sketch kind={active.sketch} /></div>
          </div>
        </article>
      )}
    </div>
  );
}
