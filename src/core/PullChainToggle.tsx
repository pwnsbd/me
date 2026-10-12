import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react';
import { useThemeToggle } from './useThemeToggle';
import styles from './PullChainToggle.module.css';

interface Props {
  fixture: ReactNode;
  hint: ReactNode;
  chainColor: string;
  flashOpacity: number;
  label: string;
  placement?: 'viewport' | 'inline';
}

const PULLED_KEY = 'site.pulled';

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Lives on document.body so it survives the theme unmount.
function flash(opacity: number) {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;inset:0;z-index:9999;pointer-events:none;background:#FAEEDA;opacity:${opacity};`;
  document.body.appendChild(el);
  window.setTimeout(() => {
    el.style.transition = 'opacity 250ms linear';
    el.style.opacity = '0';
  }, 180);
  window.setTimeout(() => el.remove(), 180 + 250 + 30);
}

export function PullChainToggle({ fixture, hint, chainColor, flashOpacity, label, placement = 'viewport' }: Props) {
  const { toggle } = useThemeToggle();
  const [pull, setPull] = useState(0);
  const [swing, setSwing] = useState(0);
  const raf = useRef(0);
  const drag = useRef<{ y: number; moved: boolean } | null>(null);
  const pullRef = useRef(0);
  const busy = useRef(false);

  const setP = (v: number) => { pullRef.current = v; setPull(v); };

  const spring = useCallback((from: number) => {
    cancelAnimationFrame(raf.current);
    if (reducedMotion()) { setP(0); setSwing(0); return; }
    let x = from;
    let v = 0;
    const t0 = performance.now();
    const step = () => {
      v += -0.18 * x - 0.16 * v;
      x += v;
      if (x < -8) x = -8;
      const t = performance.now() - t0;
      setP(x);
      setSwing(Math.sin(t / 90) * Math.exp(-t / 350) * 4);
      if (Math.abs(x) < 0.2 && Math.abs(v) < 0.2) {
        setP(0);
        setSwing(0);
        return;
      }
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  }, []);

  const doSwitch = useCallback(() => {
    try {
      sessionStorage.setItem(PULLED_KEY, '1');
    } catch { /* storage unavailable */ }
    flash(flashOpacity);
    toggle();
  }, [flashOpacity, toggle]);

  const tug = useCallback(() => {
    if (busy.current) return;
    if (reducedMotion()) { doSwitch(); return; }
    busy.current = true;
    cancelAnimationFrame(raf.current);
    const t0 = performance.now();
    const from = pullRef.current;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      busy.current = false;
      doSwitch();
      spring(30);
    };
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / 140);
      const e = 1 - Math.pow(1 - k, 3);
      setP(from + (30 - from) * e);
      if (k < 1) { raf.current = requestAnimationFrame(step); return; }
      finish();
    };
    raf.current = requestAnimationFrame(step);
    // rAF can stall (throttled or non-painting tab); never let the switch depend on it.
    window.setTimeout(finish, 300);
  }, [doSwitch, spring]);

  // Continuity: after a pull in the old theme, the new chain visibly settles.
  useEffect(() => {
    let pulled = false;
    try {
      pulled = sessionStorage.getItem(PULLED_KEY) === '1';
      if (pulled) sessionStorage.removeItem(PULLED_KEY);
    } catch { /* storage unavailable */ }
    if (pulled) spring(30);
    return () => { cancelAnimationFrame(raf.current); busy.current = false; };
  }, [spring]);

  function onDown(e: PointerEvent<SVGRectElement>) {
    if (busy.current) return;
    cancelAnimationFrame(raf.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { y: e.clientY, moved: false };
  }

  function onMove(e: PointerEvent<SVGRectElement>) {
    const d = drag.current;
    if (!d) return;
    const dy = e.clientY - d.y;
    if (Math.abs(dy) >= 3) d.moved = true;
    if (d.moved) setP(Math.min(44, Math.max(0, dy * 0.7)));
  }

  function onUp() {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved) { tug(); return; }
    const p = pullRef.current;
    if (p > 18) doSwitch();
    spring(p);
  }

  function onKey(e: KeyboardEvent<SVGGElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      tug();
    }
  }

  return (
    <svg className={placement === 'inline' ? `${styles.root} ${styles.inline}` : styles.root} viewBox="0 0 80 170" width="80" height="170" overflow="visible">
      <g transform="translate(40 0)">
        <g className={styles.bob}>{hint}</g>
        <g transform={`rotate(${swing})`}>{fixture}</g>
        <line x1="16" y1="22" x2="16" y2={96 + pull} stroke={chainColor} strokeWidth="3"
          strokeDasharray="1 4" strokeLinecap="round" />
        <path d="M12 96 h8 l-1 12 h-6z" fill={chainColor} stroke={chainColor}
          transform={`translate(0 ${pull})`} />
        <g className={styles.hit} role="button" tabIndex={0} aria-label={label} onKeyDown={onKey}>
          <rect x="4" y="20" width="30" height="130" fill="transparent"
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}
            onPointerCancel={() => { drag.current = null; spring(pullRef.current); }} />
        </g>
      </g>
    </svg>
  );
}
