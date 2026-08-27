import { useEffect, useRef } from 'react';
import { SvgFilters } from './SvgFilters';
import { BindingNav } from './BindingNav';
import styles from './Resume.module.css';

interface Job {
  role: string;
  company: string;
  period: string;
  place: string;
  bullets: string[];
}

interface Education {
  school: string;
  degree: string;
  period: string;
  note?: string;
}

/* ──────────────────────────────────────────────────────────────
   DUMMY RÉSUMÉ CONTENT
   Swap these values for the real thing later — the layout below
   just reads from this object, so nothing else needs to change.
   ────────────────────────────────────────────────────────────── */
const RESUME = {
  name: 'Pawan Subedi',
  role: 'Product-minded Frontend Engineer',
  summary:
    'Frontend engineer who likes turning fuzzy product ideas into interfaces that feel effortless. Five-ish years across startups and freelance work, mostly React and TypeScript, with a soft spot for animation, design systems, and shipping small things often.',
  contact: [
    'justpawan7@gmail.com',
    'Kathmandu, Nepal',
    'pawansubedi.com',
    'github.com/pwnsbd',
  ],
  experience: [
    {
      role: 'Senior Frontend Engineer',
      company: 'Loremify',
      period: '2023 — now',
      place: 'Remote',
      bullets: [
        'Led the rebuild of the editor surface in React + TypeScript, cutting time-to-interactive by ~40%.',
        'Built the shared component library and visual-regression suite now used by three product teams.',
        'Mentored two junior engineers through their first production features.',
      ],
    },
    {
      role: 'Frontend Engineer',
      company: 'Ipsum Labs',
      period: '2021 — 2023',
      place: 'Kathmandu',
      bullets: [
        'Built the customer dashboard from scratch — charts, filters, saved views.',
        'Migrated a legacy jQuery app to React one route at a time, with no downtime.',
        'Owned the design-to-code handoff alongside the product design team.',
      ],
    },
    {
      role: 'Freelance Web Developer',
      company: 'Self-employed',
      period: '2019 — 2021',
      place: 'Remote',
      bullets: [
        'Delivered 15+ marketing sites and small web apps for clients across four countries.',
        'Handled the whole pipeline: scoping, design, build, deploy, and the invoice emails.',
      ],
    },
  ] as Job[],
  projects: [
    { name: 'Scribbly', blurb: 'a minimal markdown notes app that gets out of your way', tech: 'React · IndexedDB' },
    { name: 'Bloom', blurb: 'a gentle habit tracker built around quiet celebration', tech: 'React · PWA' },
    { name: 'Peek', blurb: 'rich link previews on hover, anywhere on the web', tech: 'Chrome API · Node' },
  ],
  skills: [
    { label: 'Languages', items: 'TypeScript, JavaScript, HTML, CSS, a little Rust' },
    { label: 'Frameworks', items: 'React, Next.js, Vite, Node, Express' },
    { label: 'Craft', items: 'Design systems, SVG & motion, accessibility, testing' },
    { label: 'Tools', items: 'Git, Figma, Playwright, Docker, Vercel' },
  ],
  education: [
    {
      school: 'Tribhuvan University',
      degree: 'BSc Computer Science & IT',
      period: '2015 — 2019',
      note: 'graduated with distinction',
    },
  ] as Education[],
  awards: [
    'Hack Kathmandu 2022 — 1st place, developer-tools track',
    'Open source — 400+ stars across small React utilities',
    'Speaker, "SVG is a design tool" — Frontend Kathmandu meetup, 2023',
  ],
  languages: 'Nepali (native) · English (fluent) · Hindi (conversational)',
};

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

function JobBlock({ job }: { job: Job }) {
  return (
    <article className={styles.job}>
      <div className={styles.jobMeta}>
        <p className={styles.jobRole}>{job.role}</p>
        <p className={styles.jobCompany}>{job.company}</p>
        <p className={styles.jobCompany}>{job.place}</p>
        <p className={styles.jobPeriod}>{job.period}</p>
      </div>
      <ul className={styles.bullets}>
        {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
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
      const step = el.querySelector('section')?.clientWidth ?? el.clientWidth * 0.62;
      if (e.key === 'ArrowRight') el.scrollBy({ left: step, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') el.scrollBy({ left: -step, behavior: 'smooth' });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const exp = RESUME.experience;

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
          <div className={styles.strip}>

            {/* ── 1. identity ── */}
            <section className={`${styles.panel} ${styles.identity}`}>
              <div className={styles.intro}>
                <h1 className={styles.name}>{RESUME.name}</h1>
                <Squiggle width={320} />
                <p className={styles.role}>{RESUME.role}</p>
                <p className={styles.summary}>{RESUME.summary}</p>
              </div>
              <ul className={styles.contact}>
                {RESUME.contact.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </section>

            {/* ── 2. experience I ── */}
            <section className={styles.panel}>
              <Heading>where i&rsquo;ve worked</Heading>
              <div className={styles.fill}>
                {exp.slice(0, 2).map((j) => <JobBlock key={j.company} job={j} />)}
              </div>
            </section>

            {/* ── 3. experience II + projects ── */}
            <section className={styles.panel}>
              <Heading>before that</Heading>
              <div className={styles.fill}>
                {exp.slice(2).map((j) => <JobBlock key={j.company} job={j} />)}
                <div className={styles.group}>
                  <h3 className={styles.subheading}>selected projects</h3>
                  <div className={styles.list}>
                    {RESUME.projects.map((p) => (
                      <p key={p.name} className={styles.listItem}>
                        <strong>{p.name}</strong>{p.blurb} — <span className={styles.tech}>{p.tech}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── 4. toolkit + schooling ── */}
            <section className={styles.panel}>
              <Heading>toolkit</Heading>
              <div className={styles.fill}>
                <div className={styles.skills}>
                  {RESUME.skills.map((s) => (
                    <div key={s.label} className={styles.skillRow}>
                      <span className={styles.skillLabel}>{s.label}</span>
                      <span className={styles.skillItems}>{s.items}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.group}>
                  <h3 className={styles.subheading}>schooling</h3>
                  {RESUME.education.map((ed) => (
                    <div key={ed.school} className={styles.edu}>
                      <p className={styles.eduSchool}>{ed.school}</p>
                      <p className={styles.eduDegree}>{ed.degree}</p>
                      <p className={styles.eduMeta}>{ed.period}{ed.note ? ` · ${ed.note}` : ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 5. also / closing ── */}
            <section className={styles.panel}>
              <Heading>also</Heading>
              <div className={styles.fill}>
                <div className={styles.list}>
                  {RESUME.awards.map((a, i) => (
                    <p key={i} className={styles.listItem}>{a}</p>
                  ))}
                </div>
                <div className={styles.group}>
                  <h3 className={styles.subheading}>languages</h3>
                  <span className={styles.skillItems}>{RESUME.languages}</span>
                </div>
                <div>
                  <p className={styles.closeLine}>like what you see? the fastest way to reach me —</p>
                  <p className={styles.closeMail}>{RESUME.contact[0]}</p>
                </div>
              </div>
            </section>

          </div>
        </div>

        <div className={styles.hint}>drag / scroll to read &rarr;</div>

      </div>
    </div>
  );
}
