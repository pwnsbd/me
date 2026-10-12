import type { CSSProperties, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PROFILE } from '../../content';
import { ROUTES } from '../../core/routes';
import { PullChainToggle } from '../../core/PullChainToggle';
import styles from './recruiter.module.css';

const fixture = (
  <g stroke="#1a1a1a" strokeWidth="1.5" fill="none">
    <rect x="-26" y="0" width="52" height="7" rx="3.5" fill="#fff" />
    <path d="M-11 7 h22 v15 h-22z" fill="#fff" />
    <circle cx="0" cy="42" r="30" fill="#FAEEDA" opacity="0.6" stroke="none" pointerEvents="none" />
    <circle cx="0" cy="42" r="20" fill="#FFF6E0" stroke="#1a1a1a" />
    <path d="M-4 44 q4 -9 8 0" stroke="#888780" strokeWidth="1" />
  </g>
);

// On Home there is no bar, so the lamp hangs from the top edge on a cord.
const CORD = 36;
const hangingFixture = (
  <>
    <line x1="0" y1={-CORD} x2="0" y2="0" stroke="#1a1a1a" strokeWidth="1.5" />
    {fixture}
  </>
);

const hint = (
  <g stroke="#888780" strokeWidth="1.2" fill="none" strokeLinecap="round">
    <path d="M-40 124 q20 2 42 -14" />
    <path d="M-4 106 l7 4 l-6 6" />
    <text x="-118" y="128" stroke="none" fill="#5F5E5A" fontSize="12"
      style={{ fontFamily: 'system-ui, sans-serif' }}>creative view</text>
  </g>
);

export function Layout({ children }: { children: ReactNode }) {
  const path = useLocation().pathname;
  const isHome = path === ROUTES.home;
  const isResume = path === ROUTES.resume;
  const bare = isHome || isResume || path === ROUTES.projects; // no bar: panels / back link are the navigation
  const toggle = (placement: 'inline' | 'viewport') => (
    <PullChainToggle label="Switch to creative view" chainColor="#888780"
      flashOpacity={0.35} fixture={placement === 'viewport' ? hangingFixture : fixture}
      hint={isResume ? null : hint} placement={placement} />
  );
  if (bare) {
    return (
      <div className={`${styles.shell} ${styles.bareShell}`} style={{ '--lamp-top': `${CORD}px` } as CSSProperties}>
        {toggle('viewport')}
        {!isHome && <Link to={ROUTES.home} className={styles.back}>← {PROFILE.name}</Link>}
        <main className={isResume ? `${styles.main} ${styles.mainResume}` : `${styles.main} ${styles.mainHome}`}>{children}</main>
      </div>
    );
  }
  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <span className={styles.name}>{PROFILE.name}</span>
        <Link to={ROUTES.home}>Home</Link>
        <Link to={ROUTES.projects}>Projects</Link>
        <Link to={ROUTES.resume}>Resume</Link>
        <Link to={ROUTES.writing}>Writing</Link>
        {toggle('inline')}
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
