import { useEffect } from 'react';
import styles from './ProjectModal.module.css';

export interface ProjectInfo {
  title: string;
  url: string;
  tag: string;
  description: string;
  problem: string;
  vision: string;
  stack: string;
  status: string;
  github?: string;
}

interface Props {
  project: ProjectInfo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function ProjectModal({ project, onClose, onPrev, onNext, hasPrev, hasNext }: Props) {
  /* close on ESC, navigate with arrow keys */
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft'  && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [project, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>

        {/* ── header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            {/* title — no pencil filter so large text stays sharp */}
            <h2 className={styles.title}>{project.title}</h2>
            <span className={styles.tag}>{project.tag}</span>
          </div>
          <div className={styles.headerRight}>
            <span className={styles.url}>{project.url}</span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
                title="View on GitHub"
              >
                {/* hand-drawn GitHub mark */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.10-.25-.45-1.27.10-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.20 2.39.10 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
                    stroke="var(--ink)" strokeWidth="0.4" fill="var(--ink)" opacity="0.8"
                  />
                </svg>
              </a>
            )}
            <button className={styles.close} onClick={onClose} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M 3 3 C 5 5 8 7 10 10 C 12 13 15 15 17 17"
                  stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M 17 3 C 15 5 12 7 10 10 C 8 13 5 15 3 17"
                  stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* hand-drawn divider */}
        <svg className={styles.divider} height="8" overflow="visible">
          <path d="M 0 4 C 100 2 250 6 420 4 C 560 2 660 5 780 4"
            stroke="var(--ink)" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.25" />
        </svg>

        {/* ── scrollable body ── */}
        <div className={styles.body}>

          <section className={styles.section}>
            <span className={styles.sectionLabel}>what is it</span>
            <p className={styles.text}>{project.description}</p>
          </section>

          <section className={styles.section}>
            <span className={styles.sectionLabel}>the problem</span>
            <p className={styles.text}>{project.problem}</p>
          </section>

          <section className={styles.section}>
            <span className={styles.sectionLabel}>the vision</span>
            <p className={styles.text}>{project.vision}</p>
          </section>

          {/* meta */}
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>stack</span>
              <span className={styles.metaValue}>{project.stack}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>status</span>
              <span className={styles.metaValue}>{project.status}</span>
            </div>
          </div>
        </div>

        {/* ── navigation ── */}
        <div className={styles.nav}>
          <button
            className={`${styles.navBtn} ${!hasPrev ? styles.navDisabled : ''}`}
            onClick={onPrev} disabled={!hasPrev}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M 16 7 C 12 6.5 6 6.8 2 7" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 6 3 C 4 4.5 2.5 6 2 7 C 2.5 8 4 9.5 6 11" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            prev
          </button>
          <button
            className={`${styles.navBtn} ${!hasNext ? styles.navDisabled : ''}`}
            onClick={onNext} disabled={!hasNext}
          >
            next
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M 2 7 C 6 6.5 12 6.8 16 7" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 12 3 C 14 4.5 15.5 6 16 7 C 15.5 8 14 9.5 12 11" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
