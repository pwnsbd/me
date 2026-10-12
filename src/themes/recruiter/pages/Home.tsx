import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE, PROJECTS, RESUME } from '../../../content';
import { ROUTES } from '../../../core/routes';
import cvMd from '../../../content/cv-detailed.md?raw';
import styles from '../home.module.css';
import { Blocks } from '../Markdown';
import { parseMarkdown, sectionOf } from '../mdParse';
import { slugify } from '../slug';
import { useStrip } from '../useStrip';

// Strongest work only; experimental projects join once they're released.
const FEATURED = ['RayForge', 'Rasa', 'Dead’s Rights', 'Words'];
const AR_GAMES = ['FroggerAR', 'Tower War'];
const LABELS = ['About me', 'Experience', 'Projects', 'Contact'];
const ABOUT = sectionOf(parseMarkdown(cvMd), 'about-me');

export function Home() {
  const { ref: stripRef, current, update, goTo } = useStrip();
  const [aboutOpen, setAboutOpen] = useState(false);

  const rows = FEATURED.map((t) => PROJECTS.find((p) => p.title === t))
    .filter((p) => p !== undefined)
    .map((p) => ({ title: p.title, tag: p.tag, slug: slugify(p.title) }));
  const ar = AR_GAMES.filter((t) => PROJECTS.some((p) => p.title === t));
  if (ar.length) rows.push({ title: 'AR games', tag: ar.join(' · '), slug: slugify(ar[0]) });

  const cell = (i: number, children: React.ReactNode, panelClass = styles.panel) => (
    <section className={styles.cell} aria-label={LABELS[i]}>
      <div className={styles.label}>{LABELS[i]}</div>
      <div className={panelClass}>{children}</div>
    </section>
  );

  return (
    <div className={styles.stage}>
      <div className={styles.ruler} role="tablist" aria-label="Panels">
        {LABELS.map((l, i) => (
          <button key={l} type="button" role="tab" aria-selected={i === current} aria-label={l}
            className={`${styles.tick} ${i === current ? styles.tickActive : ''}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <div className={styles.strip} ref={stripRef} onScroll={update}>
        {cell(0, (
          // Card flip: both faces share one grid cell; the hidden face is inert.
          <div className={`${styles.flipInner} ${aboutOpen ? styles.flipped : ''}`}>
          <div className={`${styles.panel} ${styles.face}`} inert={aboutOpen}>
            <div className={styles.circle} />
            <h1 className={styles.headline}>
              <span>{PROFILE.name}</span>
              <span className={styles.sub}>creates products</span>
              <span className={styles.sub}>and engineers them:</span>
              <span className={styles.sub}>games, AR/VR, AI tools</span>
            </h1>
            <div className={styles.spacer} />
            <div className={styles.small}>{PROFILE.role}</div>
            {ABOUT.length > 0 && (
              <div className={styles.foot}>
                <button type="button" className={styles.textBtn} onClick={() => setAboutOpen(true)}>More about me →</button>
              </div>
            )}
          </div>
          <div className={`${styles.panel} ${styles.face} ${styles.back}`} inert={!aboutOpen}>
            <div className={styles.about}><Blocks blocks={ABOUT} /></div>
            <div className={styles.foot}>
              <button type="button" className={styles.textBtn} onClick={() => setAboutOpen(false)}>← Back</button>
            </div>
          </div>
          </div>
        ), styles.flipPanel)}
        {cell(1, (
          <>
            <div className={styles.rows}>
              {RESUME.experience.map((e) => (
                <div key={e.title + e.period} className={styles.row}>
                  <div className={styles.rowHead}>
                    <span>{e.title}</span>
                    <span className={styles.rowMeta}>{e.period}</span>
                  </div>
                  {e.org && <div className={styles.rowSub}>{e.org}</div>}
                </div>
              ))}
            </div>
            <div className={styles.foot}><Link to={ROUTES.resume}>Full résumé →</Link>{' · '}<Link to={`${ROUTES.resume}?cv=detailed`}>Detailed CV →</Link></div>
          </>
        ))}
        {cell(2, (
          <>
            <div className={styles.rows}>
              {rows.map((p) => (
                <Link key={p.title} className={styles.row} to={`${ROUTES.projects}#${p.slug}`}>
                  <div className={styles.rowHead}>
                    <span className={styles.rowTitle}>{p.title}</span>
                    <span className={styles.rowMeta}>{p.tag}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className={styles.foot}><Link to={ROUTES.projects}>All projects →</Link></div>
          </>
        ))}
        {cell(3, (
          <>
            <h2 className={styles.headline}>Say hi.</h2>
            <div className={styles.contact}>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <a href={`tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`}>{PROFILE.phone}</a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </>
        ))}
      </div>
      <p className={styles.credit}>Inspired by <a href="https://rauno.me/" target="_blank" rel="noreferrer">rauno.me</a></p>
    </div>
  );
}
