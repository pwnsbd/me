import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RESUME } from '../../../content';
import type { ResumeEntry } from '../../../content';
import cvMd from '../../../content/cv-detailed.md?raw';
import { ROUTES } from '../../../core/routes';
import { Blocks } from '../Markdown';
import { headingsOf, parseMarkdown, withoutSections } from '../mdParse';
import btn from '../markdown.module.css';
import styles from '../recruiter.module.css';
import { SectionTabs } from '../SectionTabs';

function Entries({ id, title, entries }: { id: string; title: string; entries: ResumeEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <section id={id} className={styles.anchor}>
      <h2 className={styles.section}>{title}</h2>
      {entries.map((e) => (
        <div key={e.title + e.period} className={styles.item}>
          <h3>{e.title}{e.org ? `, ${e.org}` : ''}</h3>
          <div className={styles.meta}>{[e.place, e.period].filter(Boolean).join(' · ')}</div>
          <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
        </div>
      ))}
    </section>
  );
}

// Name, contact and About Me live on Home, so the CV starts at Professional Experience.
const CV_BLOCKS = withoutSections(parseMarkdown(cvMd), ['about-me']);
const CV_SECTIONS = headingsOf(CV_BLOCKS);

function DetailedCv() {
  return (
    <>
      <p className={btn.btnRow}><Link className={btn.cvBtn} to={ROUTES.resume}>Short CV</Link></p>
      <SectionTabs sections={CV_SECTIONS} />
      <Blocks blocks={CV_BLOCKS} />
    </>
  );
}

export function Resume() {
  const detailed = useSearchParams()[0].get('cv') === 'detailed';
  const shown = useRef(detailed);
  useEffect(() => {
    // Only a real short/detailed switch scrolls to top, so a #hash deep link still lands on its
    // section (a first-mount flag breaks under StrictMode's double effect run).
    if (shown.current === detailed) return;
    shown.current = detailed;
    window.scrollTo(0, 0);
  }, [detailed]);
  if (detailed) return <DetailedCv />;
  const sections = [
    RESUME.summary && { id: 'summary', label: 'Summary' },
    RESUME.experience.length > 0 && { id: 'experience', label: 'Experience' },
    RESUME.projects.length > 0 && { id: 'projects', label: 'Projects' },
    RESUME.skills.length > 0 && { id: 'skills', label: 'Skills' },
    RESUME.education.length > 0 && { id: 'education', label: 'Education' },
    RESUME.leadership.length > 0 && { id: 'leadership', label: 'Leadership' },
    RESUME.certificates.length > 0 && { id: 'certificates', label: 'Certificates' },
  ].filter((x): x is { id: string; label: string } => Boolean(x));
  return (
    <>
      <p className={btn.btnRow}><Link className={btn.cvBtn} to={`${ROUTES.resume}?cv=detailed`}>Detailed CV</Link></p>
      <SectionTabs sections={sections} />
      {RESUME.summary && (
        <section id="summary" className={styles.anchor}>
          <h2 className={styles.section}>Summary</h2>
          <p>{RESUME.summary}</p>
        </section>
      )}
      <Entries id="experience" title="Experience" entries={RESUME.experience} />
      <Entries id="projects" title="Projects" entries={RESUME.projects} />
      {RESUME.skills.length > 0 && (
        <section id="skills" className={styles.anchor}>
          <h2 className={styles.section}>Skills</h2>
          <ul>{RESUME.skills.map((s) => <li key={s.label}><strong>{s.label}:</strong> {s.items}</li>)}</ul>
        </section>
      )}
      {RESUME.education.length > 0 && (
        <section id="education" className={styles.anchor}>
          <h2 className={styles.section}>Education</h2>
          {RESUME.education.map((ed) => (
            <div key={ed.school + ed.degree} className={styles.item}>
              <h3>{ed.degree}, {ed.school}</h3>
              <div className={styles.meta}>{ed.place} · {ed.period}</div>
              {ed.note && <p>{ed.note}</p>}
            </div>
          ))}
        </section>
      )}
      <Entries id="leadership" title="Leadership" entries={RESUME.leadership} />
      {RESUME.certificates.length > 0 && (
        <section id="certificates" className={styles.anchor}>
          <h2 className={styles.section}>Certificates</h2>
          <ul>{RESUME.certificates.map((x) => <li key={x}>{x}</li>)}</ul>
        </section>
      )}
    </>
  );
}
