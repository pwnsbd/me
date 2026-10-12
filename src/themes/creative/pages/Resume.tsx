import { useEffect, useRef } from 'react';
import { SvgFilters } from '../SvgFilters';
import { BindingNav } from '../components/BindingNav';
import styles from './Resume.module.css';
import { PROFILE, RESUME } from '../../../content';
import type { ResumeEntry } from '../../../content';

/* rough hand-drawn underline */
function Squiggle({ width }: { width: number }) {
  return (
    <svg className={styles.underline} viewBox="0 0 300 12" style={{ width }}>
      <path
        d="M 3 7 Q 80 13 150 8 Q 230 3 297 9"
        stroke="var(--ink)" strokeWidth="2" fill="none"
        strokeLinecap="round" filter="url(#pencil)" opacity="0.5"
      />
    </svg>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.heading}>{children}</h2>;
}

/* hand-inked social marks */
function SocialLinks() {
  return (
    <div className={styles.social}>
      <a className={styles.iconLink} href={RESUME.contact.github}
        target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <svg viewBox="0 0 24 24" filter="url(#pencil)">
          <path fill="var(--ink)" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48
            0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61
            1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94
            0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004
            1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0
            3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01
            0 0 0 22 12c0-5.52-4.48-10-10-10z" />
        </svg>
      </a>
      <a className={styles.iconLink} href={RESUME.contact.linkedin}
        target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <svg viewBox="0 0 24 24" filter="url(#pencil)">
          <path fill="var(--ink)" d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14
            2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34
            7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22
            0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24
            .77 23.2 0 22.22 0z" />
        </svg>
      </a>
    </div>
  );
}

/* one experience / project / leadership entry, flowing top-to-bottom */
function EntryBlock({ entry }: { entry: ResumeEntry }) {
  return (
    <article className={styles.entry}>
      <div className={styles.entryHead}>
        <p className={styles.entryTitle}>
          {entry.title}
          {entry.org && <span className={styles.entryOrg}> — {entry.org}</span>}
        </p>
        <span className={styles.entryPeriod}>{entry.period}</span>
      </div>
      {entry.place && <p className={styles.entryPlace}>{entry.place}</p>}
      <ul className={styles.bullets}>
        {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </article>
  );
}

export function Resume() {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  /* mouse drag to scroll the sheet sideways */
  function onMouseDown(e: React.MouseEvent) {
    const el = railRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.pageX, startScroll: el.scrollLeft };
    const move = (ev: MouseEvent) => {
      if (!drag.current.down || !el) return;
      el.scrollLeft = drag.current.startScroll - (ev.pageX - drag.current.startX);
    };
    const up = () => {
      drag.current.down = false;
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  }

  /* vertical wheel → horizontal scroll */
  function onWheel(e: React.WheelEvent) {
    const el = railRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY;
  }

  /* arrow keys page through the folds */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const el = railRef.current;
      if (!el) return;
      const step = el.clientWidth * 0.5;
      if (e.key === 'ArrowRight') el.scrollBy({ left: step, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') el.scrollBy({ left: -step, behavior: 'smooth' });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const { experience, projects, leadership } = RESUME;

  return (
    <div className={styles.desk}>
      <SvgFilters />
      <BindingNav sidebar />
      <div className={styles.page}>

        {/* page title — right edge, vertical bottom → top */}
        <svg className={styles.pageTitle} overflow="visible">
          <text
            x="0" y="0"
            filter="url(#pencil)"
            fontFamily="'Caveat', cursive"
            fontWeight="700"
            fontSize="54"
            fill="var(--ink-faint)"
            textAnchor="middle"
            dominantBaseline="middle"
            transform="rotate(-90)"
          >
            i do have experiences
          </text>
        </svg>

        <div
          className={styles.scroll}
          ref={railRef}
          onMouseDown={onMouseDown}
          onWheel={onWheel}
        >
          <div className={styles.flow}>

            <header className={styles.identityBlock}>
              <h1 className={styles.name}>{RESUME.name}</h1>
              <Squiggle width={240} />
              <p className={styles.role}>{RESUME.role}</p>
              <p className={styles.summary}>{RESUME.summary}</p>
              <div className={styles.contact}>
                <SocialLinks />
                <a className={styles.contactLine} href={`mailto:${RESUME.contact.email}`}>
                  {RESUME.contact.email}
                </a>
                <span className={styles.contactLine}>{RESUME.contact.phone}</span>
              </div>
            </header>

            <Heading>where i&rsquo;ve worked</Heading>
            {experience.map((e) => <EntryBlock key={e.title + e.period} entry={e} />)}

            <Heading>things i&rsquo;ve built</Heading>
            {projects.map((e) => <EntryBlock key={e.title + e.period} entry={e} />)}

            <Heading>leadership</Heading>
            {leadership.map((e) => <EntryBlock key={e.title + e.period} entry={e} />)}

            <Heading>toolkit</Heading>
            <div className={styles.skills}>
              {RESUME.skills.map((s) => (
                <div key={s.label} className={styles.skillRow}>
                  <span className={styles.skillLabel}>{s.label}</span>
                  <span className={styles.skillItems}>{s.items}</span>
                </div>
              ))}
            </div>

            <Heading>schooling</Heading>
            {RESUME.education.map((ed) => (
              <div key={ed.school} className={styles.edu}>
                <p className={styles.eduSchool}>{ed.school}</p>
                <p className={styles.eduDegree}>{ed.degree}</p>
                <p className={styles.eduMeta}>
                  {ed.place} · {ed.period}{ed.note ? ` · ${ed.note}` : ''}
                </p>
              </div>
            ))}

            <Heading>certificates</Heading>
            <div className={styles.list}>
              {RESUME.certificates.map((c, i) => (
                <p key={i} className={styles.listItem}>{c}</p>
              ))}
            </div>

            <div className={styles.closing}>
              <p className={styles.closeLine}>like what you see? the fastest way to reach me &mdash;</p>
              <a className={styles.closeMail} href={`mailto:${RESUME.contact.email}`}>
                {RESUME.contact.email}
              </a>
              <Squiggle width={180} />
              <p className={styles.signoff}>&mdash; {PROFILE.firstName}</p>
            </div>

          </div>
        </div>

        <div className={styles.hint}>drag / scroll to read &rarr;</div>

      </div>
    </div>
  );
}
