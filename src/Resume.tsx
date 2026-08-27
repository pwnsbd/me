import { useEffect, useRef } from 'react';
import { SvgFilters } from './SvgFilters';
import { BindingNav } from './BindingNav';
import styles from './Resume.module.css';

interface Entry {
  title: string;
  org?: string;
  place?: string;
  period: string;
  bullets: string[];
}

interface Education {
  school: string;
  degree: string;
  place: string;
  period: string;
  note?: string;
}

/* ──────────────────────────────────────────────────────────────
   RÉSUMÉ CONTENT
   Everything the page shows lives here — the layout below just
   reads from this object. Update these values to update the page.
   ────────────────────────────────────────────────────────────── */
const RESUME = {
  name: 'Pawan Subedi',
  role: 'Software Engineer · MS Visualization @ Texas A&M',
  summary:
    'Software engineer with four years across systems, web, and internal tooling at HPE and early-stage startups. Now focused on real-time graphics, games, and AR as an MS Visualization student and teaching assistant at Texas A&M.',
  contact: [
    'github.com/pawansubedi',
    'linkedin.com/in/pawansubedi',
    'justpawan7@gmail.com',
    '605-728-1310',
  ],
  experience: [
    {
      title: 'Teaching Assistant',
      org: 'Texas A&M',
      place: 'College Station, TX',
      period: 'Aug 2025 — Present',
      bullets: [
        'Teach weekly lab sections for ~60 students, guiding them through Unreal Engine and building gameplay features with Blueprint scripting.',
        'Give hands-on technical support — debugging Blueprint graphs, actors/components, and gameplay events — to help teams reach milestone deliverables and playable prototypes.',
        'Grade assignments and projects against a rubric, with feedback on gameplay functionality, Blueprint logic quality, and completion.',
      ],
    },
    {
      title: 'System Software Engineer',
      org: 'Hewlett Packard Enterprise',
      place: 'San Jose, CA',
      period: 'Jul 2022 — Apr 2025',
      bullets: [
        'Built robust shared functions used by 15 teammates that cut typical script length by 40%, in Python and Pytest.',
        'Worked on a system-simulation project — defining and identifying defects and pushing the limits of the system through varied test cases and automation.',
      ],
    },
    {
      title: 'Software Engineer',
      org: 'Hewlett Packard Enterprise',
      place: 'San Jose, CA',
      period: 'May 2021 — May 2022',
      bullets: [
        'Created a user-friendly GUI that helped 300+ employees run specific CLI-based tasks efficiently.',
        'Enhanced the web app UI with Python, Django, MongoDB, Celery, and Elasticsearch to hit project objectives.',
      ],
    },
    {
      title: 'Software Engineer',
      org: 'Neighbor Marketing',
      place: 'Remote · New York',
      period: 'Apr 2020 — Jun 2020',
      bullets: [
        'Led a team of 4 to design and build a property-reviews website reaching 250,000+ people, using React and JavaScript.',
        'Integrated the Google Maps API for location and autocomplete, Firebase auth for profiles, and Mailchimp for automated emails and newsletters.',
      ],
    },
  ] as Entry[],
  projects: [
    {
      title: 'AR / Game Projects',
      org: 'Coursework',
      period: 'Aug 2025 — Present',
      bullets: [
        'Built 3 interactive prototypes — including ScavengAR Hunt (a staged AR scavenger hunt) and Animal vs. Human — each a complete gameplay loop from setup to interaction to completion.',
        'Implemented core game systems: state-based progression, spawning and triggers, UI prompts, and interaction logic, in Unity with an AR stack (Vuforia / AR Foundation).',
        'Iterated through playtests to fix tracking and interaction bugs, sharpen UX clarity, and improve reliability and performance across builds.',
      ],
    },
    {
      title: 'GAN — Generative Adversarial Networks',
      org: 'Self-study',
      period: 'Oct 2023 — Aug 2025',
      bullets: [
        'Studied and reproduced GAN papers — CycleGAN, StyleGAN, DCGAN, SRGAN.',
        'Attempted to match a Canny edge detector’s output using GAN models, with OpenCV and PyTorch.',
      ],
    },
    {
      title: 'Health Memo',
      org: 'Sanford Health Hack — Runner-up · Team Lead',
      period: 'Sep 2022 — Oct 2022',
      bullets: [
        'Pitched a business plan and prototyped an iOS app for logging users’ health.',
        'Took 2nd place and the People’s Choice award out of 20 teams — $9,000 in total prizes.',
        'Prototyped in Swift and Parse with Google’s Text-to-Speech and Speech-to-Text.',
      ],
    },
    {
      title: 'Twitter Clone',
      org: 'CodePath · iOS',
      period: 'Oct 2020',
      bullets: [
        'Built a Twitter clone in Swift and Storyboard where users stay logged in without losing credentials or tweets.',
        'Added retweeting, favoriting, and infinite scrolling.',
      ],
    },
    {
      title: 'Pill Buddy',
      org: 'Sanford Health Hack — Runner-up · Team Lead',
      period: 'Sep 2019 — Oct 2019',
      bullets: [
        'Built a mobile app and delivered the product pitch — 2nd place out of 12 teams, $7,000 prize pool.',
        'Designed an interface for 5,000+ elderly Sanford patients to check drug interactions and spot less-obvious ones before an overdose.',
      ],
    },
  ] as Entry[],
  leadership: [
    {
      title: 'Conference Volunteer',
      org: 'ACM SIGGRAPH 2024',
      place: 'Denver, CO',
      period: 'Jul — Aug 2024',
      bullets: [
        'Supported conference operations across high-traffic areas — registration, sessions, exhibits — keeping the day-to-day flow smooth.',
        'Communicated with attendees and organizers to resolve issues quickly and keep activities on schedule.',
        'Picked up current directions in graphics, games, and interactive tech through on-site programming and demos.',
      ],
    },
    {
      title: 'Communication Director',
      org: 'Augustana Student Association',
      place: 'Sioux Falls, SD',
      period: 'Aug 2019 — May 2020',
      bullets: [
        'Led a team of 6 responsible for transparency and visibility across 100+ student clubs.',
        'Improved the student experience and maintained the Association website.',
        'Organized the 2019 Senate election with 30+ student participants.',
      ],
    },
  ] as Entry[],
  skills: [
    { label: 'Computer', items: 'C++, Python, Java, React, HTML, JavaScript, Swift' },
    { label: 'Tools', items: 'Unreal, Unity, Houdini, PyTorch, Keras, Django, Git, Docker, OpenCV' },
    { label: 'Interests', items: 'Deep learning, reinforcement learning, drawing & painting, football, photography, videography' },
  ],
  education: [
    {
      school: 'Texas A&M University',
      degree: 'MS, Visualization',
      place: 'College Station, TX',
      period: 'Expected May 2027',
    },
    {
      school: 'Augustana University',
      degree: 'BA, Computer Science & Data Science · Minor in Math',
      place: 'Sioux Falls, SD',
      period: 'May 2022',
      note: 'GPA 3.52 / 4.00',
    },
  ] as Education[],
  certificates: [
    'DeepLearning.AI — Deep Learning Specialization: Neural Networks & Deep Learning, Improving Deep Neural Networks, Structuring ML Projects, Convolutional Neural Networks, Sequence Models (2022–2023).',
    'Broadway — HTML, CSS, JavaScript (2016).',
  ],
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

/* one experience / project / leadership entry — meta column + bullets */
function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <article className={styles.job}>
      <div className={styles.jobMeta}>
        <p className={styles.jobRole}>{entry.title}</p>
        {entry.org && <p className={styles.jobCompany}>{entry.org}</p>}
        {entry.place && <p className={styles.jobCompany}>{entry.place}</p>}
        <p className={styles.jobPeriod}>{entry.period}</p>
      </div>
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
      const step = el.querySelector('section')?.clientWidth ?? el.clientWidth * 0.62;
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
                {experience.slice(0, 2).map((e) => (
                  <EntryBlock key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            {/* ── 3. experience II ── */}
            <section className={styles.panel}>
              <Heading>before that</Heading>
              <div className={styles.fill}>
                {experience.slice(2).map((e) => (
                  <EntryBlock key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            {/* ── 4. projects I ── */}
            <section className={styles.panel}>
              <Heading>things i&rsquo;ve built</Heading>
              <div className={styles.fill}>
                {projects.slice(0, 2).map((e) => (
                  <EntryBlock key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            {/* ── 5. projects II ── */}
            <section className={styles.panel}>
              <Heading>&hellip; and more</Heading>
              <div className={styles.fill}>
                {projects.slice(2).map((e) => (
                  <EntryBlock key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            {/* ── 6. leadership ── */}
            <section className={styles.panel}>
              <Heading>leadership</Heading>
              <div className={styles.fill}>
                {leadership.map((e) => (
                  <EntryBlock key={e.title + e.period} entry={e} />
                ))}
              </div>
            </section>

            {/* ── 7. toolkit + schooling ── */}
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
                      <p className={styles.eduMeta}>
                        {ed.place} · {ed.period}{ed.note ? ` · ${ed.note}` : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── 8. certificates + closing ── */}
            <section className={styles.panel}>
              <Heading>certificates</Heading>
              <div className={styles.fill}>
                <div className={styles.list}>
                  {RESUME.certificates.map((c, i) => (
                    <p key={i} className={styles.listItem}>{c}</p>
                  ))}
                </div>
                <div>
                  <p className={styles.closeLine}>like what you see? the fastest way to reach me &mdash;</p>
                  <p className={styles.closeMail}>{RESUME.contact[2]}</p>
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
