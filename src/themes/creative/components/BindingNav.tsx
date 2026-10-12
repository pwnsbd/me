import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BindingNav.module.css';

interface Props { sidebar?: boolean; noIcons?: boolean; }

export function BindingNav({ sidebar, noIcons }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function go(path: string) {
    if (pathname !== path) navigate(path);
  }

  function openPhoto() {
    window.open('https://www.instagram.com/pawan_subedi/', '_blank', 'noopener,noreferrer');
  }

  return (
    <div className={`${styles.nav} ${sidebar ? styles.sidebar : ''}`}>

      {noIcons ? null : (<>

      {/* ── home ── */}
      <div
        className={`${styles.item} ${pathname === '/' ? styles.active : ''}`}
        onClick={() => go('/')}
        title="home"
      >
        <svg viewBox="0 0 28 28" className={styles.icon} overflow="visible">
          <g filter="url(#pencil)">
            {/* roof */}
            <path d="M 14 3 L 26 14 L 22 14 L 22 25 L 16 25 L 16 18 L 12 18 L 12 25 L 6 25 L 6 14 L 2 14 Z"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
            {/* chimney */}
            <rect x="18" y="5" width="4" height="6" rx="0.5"
              stroke="var(--ink)" strokeWidth="0.9" fill="none" />
          </g>
        </svg>
      </div>

      {/* ── mini rocket → projects ── */}
      <div
        className={`${styles.item} ${pathname === '/projects' ? styles.active : ''}`}
        onClick={() => go('/projects')}
        title="projects"
      >
        <svg viewBox="0 0 28 38" className={styles.icon} overflow="visible">
          <g filter="url(#pencil)">
            <path d="M 14 3 Q 20 6 21 16 L 21 26 L 14 29 L 7 26 L 7 16 Q 8 6 14 3 Z"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" />
            <circle cx="14" cy="16" r="3.5"
              stroke="var(--ink)" strokeWidth="1" fill="none" />
            <path d="M 7 22 L 2 28 L 7 26"
              stroke="var(--ink)" strokeWidth="1.1" fill="none" strokeLinejoin="round" />
            <path d="M 21 22 L 26 28 L 21 26"
              stroke="var(--ink)" strokeWidth="1.1" fill="none" strokeLinejoin="round" />
            <path d="M 10 29 Q 12 33 14 31 Q 16 33 18 29"
              stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* ── mini camera → instagram ── */}
      <div
        className={`${styles.item} ${styles.external}`}
        onClick={openPhoto}
        title="photography"
      >
        <svg viewBox="0 0 28 24" className={styles.icon} overflow="visible">
          <g filter="url(#pencil)">
            <rect x="2" y="7" width="24" height="16" rx="3"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" />
            <rect x="10" y="3" width="8" height="6" rx="2"
              stroke="var(--ink)" strokeWidth="1.1" fill="none" />
            <circle cx="14" cy="15" r="5.5"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" />
            <circle cx="14" cy="15" r="2.5"
              stroke="var(--ink)" strokeWidth="0.7" fill="none" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* ── mini tree → resume ── */}
      <div
        className={`${styles.item} ${pathname === '/resume' ? styles.active : ''}`}
        onClick={() => go('/resume')}
        title="experiences"
      >
        <svg viewBox="0 0 28 42" className={styles.icon} overflow="visible">
          <g filter="url(#pencil)">
            <path d="M 14 34 Q 13 26 13 20"
              stroke="var(--ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M 13 20 Q 7 13 3 9"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 13 20 Q 19 13 23 9"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <path d="M 13 24 Q 6 20 2 18"
              stroke="var(--ink)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M 13 24 Q 20 20 25 18"
              stroke="var(--ink)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M 3 9 Q 1 5 1 2" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 3 9 Q 5 5 7 2" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 23 9 Q 25 5 25 2" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 23 9 Q 21 5 20 2" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 14 34 Q 9 37 5 38" stroke="var(--ink)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5" />
            <path d="M 14 34 Q 19 37 23 38" stroke="var(--ink)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.5" />
          </g>
        </svg>
      </div>

      {/* ── mini journal → writing ── */}
      <div
        className={`${styles.item} ${pathname === '/writing' ? styles.active : ''}`}
        onClick={() => go('/writing')}
        title="writing"
      >
        <svg viewBox="0 0 28 30" className={styles.icon} overflow="visible">
          <g filter="url(#pencil)">
            <path d="M 2 4 Q 2 2 5 2 L 13 3 L 13 27 L 5 26 Q 2 26 2 24 Z"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" />
            <path d="M 13 3 L 21 2 Q 25 2 25 4 L 25 24 Q 25 26 21 26 L 13 27 Z"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" />
            <line x1="13" y1="3" x2="13" y2="27"
              stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <line x1="5" y1="9" x2="11" y2="9" stroke="var(--ink)" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
            <line x1="5" y1="13" x2="11" y2="13" stroke="var(--ink)" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
            <line x1="15" y1="9" x2="22" y2="9" stroke="var(--ink)" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
            <line x1="15" y1="13" x2="22" y2="13" stroke="var(--ink)" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
            <line x1="15" y1="17" x2="21" y2="17" stroke="var(--ink)" strokeWidth="0.7" opacity="0.4" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      </>)}
    </div>
  );
}
