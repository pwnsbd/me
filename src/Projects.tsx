import { useRef, useState } from 'react';
import { SvgFilters } from './SvgFilters';
import { BindingNav } from './BindingNav';
import { ProjectWindow } from './ProjectWindow';
import { ProjectModal, type ProjectInfo } from './ProjectModal';
import styles from './Projects.module.css';

/* ── project data ── */
const PROJECTS: ProjectInfo[] = [
  {
    title: 'Scribbly',
    url: 'scribbly.app',
    tag: 'notes · web app',
    description:
      'A minimal markdown notes app that gets out of your way. Write, organise, and find your thoughts without fighting the tool — just text, structure, and speed. Scribbly lives in the browser, syncs across devices, and opens in under a second.',
    problem:
      'Most note-taking apps are either too bloated with features nobody uses, or so minimal they lose context the moment a project grows. You end up choosing between power you don\'t need and simplicity that breaks under real work. There\'s a gap between "just a text file" and a "full productivity suite" — and nothing good lives there yet.',
    vision:
      'A digital sketchbook for ideas — fast to open, frictionless to write in, smart enough to link thoughts without demanding you learn a new system. Writing should feel like thinking out loud. The long-term goal is a lightweight knowledge graph that surfaces connections you forgot you made, without ever asking you to tag or categorise anything.',
    stack: 'React · markdown-it · IndexedDB',
    status: 'In progress',
    github: 'https://github.com/pwnsbd/scribbly',
  },
  {
    title: 'Wavr',
    url: 'wavr.fm',
    tag: 'audio · web app',
    description:
      'A browser-based audio waveform visualiser and player. Drop in any audio file and watch it come alive — scrub, loop, zoom into sections, and annotate moments directly on the waveform. No installs, no accounts, just drag and drop.',
    problem:
      'Audio editing tools are overkill for quick review and sharing. Podcasters, musicians, and researchers just want to mark a timestamp and say "listen to this bit" without learning a DAW or exporting a clip. Sharing audio context today means timestamps in a Slack message and hoping everyone scrubs to the right second.',
    vision:
      'Turn audio into a shared, annotatable canvas — like leaving sticky notes inside a song. Imagine a team reviewing a podcast episode together, each person marking moments inline, with threaded discussion at every timestamp. Eventually: lightweight version history, compare-before-after edits, and embeddable waveform players you can drop into any doc or website.',
    stack: 'Web Audio API · Canvas · TypeScript',
    status: 'Prototype',
    github: 'https://github.com/pwnsbd/wavr',
  },
  {
    title: 'Bloom',
    url: 'bloom.day',
    tag: 'habits · mobile web',
    description:
      'A gentle habit tracker built around streaks and quiet celebration. Mark your day, watch your garden grow over time. No dashboards, no productivity scores — just a calm daily ritual that reminds you who you\'re trying to be. Works offline as a PWA, feels at home on your phone\'s home screen.',
    problem:
      'Habit apps optimise for engagement over wellbeing. Missing a single day triggers shame mechanics — broken streak banners, guilt-tripping notifications — that make you abandon the app entirely. The tool meant to help you grow ends up being another source of anxiety. The cure becomes the disease.',
    vision:
      'A tracker that genuinely roots for you. Miss a day and the garden just waits — it doesn\'t wilt. The goal is building a warm relationship with your habits, not a fear of breaking them. Long-term: seasonal themes, journaling moments attached to habit completions, and a year-in-review that feels like flipping through a photo album rather than reading a performance review.',
    stack: 'React · PWA · localStorage',
    status: 'Launched',
    github: 'https://github.com/pwnsbd/bloom',
  },
  {
    title: 'Peek',
    url: 'peek.link',
    tag: 'utility · chrome ext',
    description:
      'A Chrome extension that generates rich link previews on hover — title, description, live screenshot, reading time estimate, and domain info — without ever opening a new tab. It works on any link on any page, instantly.',
    problem:
      'Every day people open dozens of tabs just to check if a link is worth reading, then close them immediately. It fragments focus, clutters the browser, and wastes minutes that add up to hours. The rich preview tooltip that Twitter and Slack show you exists only inside those walled gardens — the open web has nothing.',
    vision:
      'A universal peek layer for the entire web — hover any link and instantly know what\'s inside. Future versions: a save-for-later shelf that lives in the extension, topic tagging powered by the page content, and a "you\'ve peeked this 4 times but never read it" nudge for links you keep returning to. Eventually a companion web app where your peeked links become a personal reading map.',
    stack: 'Chrome Extensions API · Puppeteer · Node',
    status: 'Beta',
    github: 'https://github.com/pwnsbd/peek',
  },
  {
    title: 'Drift',
    url: 'drift.focus',
    tag: 'focus · desktop app',
    description:
      'A Pomodoro-style focus timer for the desktop with hand-picked ambient soundscapes, gentle session summaries after each block, and a week-view heat map of your deep-work time. Built with Tauri so it runs natively on Mac and Windows — lightweight, no Electron bloat.',
    problem:
      'Timers feel mechanical. You set 25 minutes, it screams at you, you dismiss it, repeat until burnout. There\'s no sense of ritual entering a session, no ambient support while you\'re in it, and no meaningful way to look back at a week and understand where your energy actually went. Most productivity apps measure activity, not depth.',
    vision:
      'Focus time as something you genuinely look forward to — a warm, quiet room you step into. Drift should feel like lighting a candle, not setting an alarm clock. The ambient layer adapts to the time of day: rain in the morning, café hum in the afternoon, silence in the evening. Long-term: correlate focus session length and time-of-day with self-reported output quality, so you learn when your best work actually happens.',
    stack: 'Tauri · React · Rust · Web Audio API',
    status: 'In progress',
    github: 'https://github.com/pwnsbd/drift',
  },
];

/* ── helper: sketchy horizontal text lines ── */
function TextLines({ x, y, count, widths, gap = 11 }: {
  x: number; y: number; count: number; widths: number[]; gap?: number;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <path key={i}
          d={`M ${x} ${y + i * gap} C ${x + widths[i] * 0.4} ${y + i * gap - 0.5} ${x + widths[i] * 0.8} ${y + i * gap + 0.5} ${x + widths[i]} ${y + i * gap}`}
          stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.35"
          strokeLinecap="round" />
      ))}
    </>
  );
}

export function Projects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  /* mouse drag to scroll */
  const dragRef = useRef({ dragging: false, startX: 0, startScroll: 0, moved: false });

  function onMouseDown(e: React.MouseEvent) {
    const el = railRef.current;
    if (!el) return;
    dragRef.current = { dragging: true, startX: e.pageX - el.offsetLeft, startScroll: el.scrollLeft, moved: false };
    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current.dragging) return;
      const dx = Math.abs(ev.pageX - el.offsetLeft - dragRef.current.startX);
      if (dx > 4) dragRef.current.moved = true;
      el.scrollLeft = dragRef.current.startScroll - (ev.pageX - el.offsetLeft - dragRef.current.startX);
    };
    const onUp = () => {
      dragRef.current.dragging = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handleCardClick(index: number) {
    if (dragRef.current.moved) return; // ignore if it was a drag
    setSelectedIndex(index);
  }

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
            i do create
          </text>
        </svg>

        {/* horizontal window rail */}
        <div className={styles.rail} ref={railRef} onMouseDown={onMouseDown}>
          <div className={styles.track}>

            {/* ── 1. Scribbly ── */}
            <div onClick={() => handleCardClick(0)} style={{ cursor: 'pointer' }}>
              <ProjectWindow title="Scribbly" url="scribbly.app" tag="notes · web app" rotate={-3}>
                <text x="22" y="58" fontFamily="'Caveat', cursive" fontSize="15" fontWeight="700"
                  fill="var(--ink)" opacity="0.7">My Notes</text>
                <TextLines x={22} y={74} count={7} gap={13}
                  widths={[230, 180, 210, 150, 200, 170, 120]} />
                <g transform="translate(268, 50) rotate(40)" opacity="0.3">
                  <rect x="-4" y="-18" width="8" height="24" rx="1"
                    fill="var(--ink-faint)" stroke="var(--ink)" strokeWidth="0.8" />
                  <polygon points="-4,6 4,6 0,13" fill="var(--ink)" />
                  <rect x="-4" y="-18" width="8" height="5" rx="1" fill="#B0A090"
                    stroke="var(--ink)" strokeWidth="0.5" />
                </g>
                {[74, 87, 100, 113, 126, 139, 152].map((cy, i) => (
                  <circle key={i} cx="16" cy={cy} r="1.5" fill="var(--ink)" opacity="0.25" />
                ))}
              </ProjectWindow>
            </div>

            {/* ── 2. Wavr ── */}
            <div onClick={() => handleCardClick(1)} style={{ cursor: 'pointer' }}>
              <ProjectWindow title="Wavr" url="wavr.fm" tag="audio · web app" rotate={2}>
                <text x="22" y="58" fontFamily="'Architects Daughter', cursive" fontSize="9"
                  fill="var(--ink-mid)" opacity="0.6">now playing — lo-fi study mix</text>
                {(() => {
                  const heights = [18,28,14,34,22,40,16,30,36,12,26,38,20,32,10,44,24,36,18,28,14,32,22,40,16];
                  return heights.map((h, i) => (
                    <path key={i}
                      d={`M ${22 + i * 11} ${128 + h / 2} C ${22 + i * 11 + 3} ${128 + h / 2 - 1} ${22 + i * 11 + 7} ${128 - h / 2 + 1} ${22 + i * 11 + 9} ${128 - h / 2}`}
                      stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" fill="none"
                      opacity={i < 14 ? 0.7 : 0.2} />
                  ));
                })()}
                <circle cx="160" cy="175" r="12" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.5" />
                <polygon points="156,170 156,180 168,175" fill="var(--ink)" opacity="0.4" />
                <path d="M 22 160 L 298 160" stroke="var(--ink)" strokeWidth="1" opacity="0.2" strokeLinecap="round" />
                <path d="M 22 160 L 145 160" stroke="var(--ink)" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
                <circle cx="145" cy="160" r="4" fill="var(--ink)" opacity="0.5" />
              </ProjectWindow>
            </div>

            {/* ── 3. Bloom ── */}
            <div onClick={() => handleCardClick(2)} style={{ cursor: 'pointer' }}>
              <ProjectWindow title="Bloom" url="bloom.day" tag="habits · mobile web" rotate={-2}>
                <text x="22" y="56" fontFamily="'Caveat', cursive" fontSize="14" fontWeight="700"
                  fill="var(--ink)" opacity="0.7">August</text>
                {(() => {
                  const filled = new Set([1,2,3,5,6,8,9,10,12,15,16,17,19,22]);
                  const cells = [];
                  for (let r = 0; r < 4; r++) {
                    for (let c = 0; c < 7; c++) {
                      const n = r * 7 + c + 1;
                      const cx = 28 + c * 38;
                      const cy = 74 + r * 34;
                      cells.push(
                        <g key={n}>
                          <circle cx={cx} cy={cy} r="13"
                            fill={filled.has(n) ? 'var(--ink)' : 'none'}
                            stroke="var(--ink)" strokeWidth="0.8"
                            opacity={filled.has(n) ? 0.15 : 0.12} />
                          {filled.has(n) && (
                            <path d={`M ${cx - 5} ${cy} L ${cx - 1} ${cy + 4} L ${cx + 5} ${cy - 5}`}
                              stroke="var(--ink)" strokeWidth="1.4" fill="none" strokeLinecap="round"
                              opacity="0.5" />
                          )}
                          <text x={cx} y={cy + 3.5} fontFamily="'Architects Daughter', cursive"
                            fontSize="7" fill="var(--ink)" textAnchor="middle" opacity="0.35">{n}</text>
                        </g>
                      );
                    }
                  }
                  return cells;
                })()}
              </ProjectWindow>
            </div>

            {/* ── 4. Peek ── */}
            <div onClick={() => handleCardClick(3)} style={{ cursor: 'pointer' }}>
              <ProjectWindow title="Peek" url="peek.link" tag="utility · chrome ext" rotate={3}>
                <text x="22" y="56" fontFamily="'Architects Daughter', cursive" fontSize="8"
                  fill="var(--ink-mid)" opacity="0.6">paste a url, get a preview</text>
                <path d="M 20 63 L 280 64 L 280 76 L 20 75 Z"
                  fill="var(--paper-dark)" stroke="var(--ink)" strokeWidth="0.8" opacity="0.6" />
                <text x="26" y="73" fontFamily="'Architects Daughter', cursive" fontSize="7"
                  fill="var(--ink-faint)">https://</text>
                <path d="M 20 84 L 300 85 L 299 210 L 21 209 Z"
                  fill="var(--paper-dark)" stroke="var(--ink)" strokeWidth="0.9" opacity="0.45" />
                <path d="M 26 90 L 130 91 L 130 140 L 26 139 Z"
                  fill="var(--ink)" opacity="0.06" stroke="var(--ink)" strokeWidth="0.7" />
                <path d="M 55 115 L 75 100 L 95 118 L 108 108 L 130 130 L 26 130 Z"
                  fill="var(--ink)" opacity="0.08" />
                <TextLines x={140} y={100} count={2} widths={[150, 100]} gap={14} />
                <TextLines x={140} y={132} count={3} widths={[155, 140, 90]} gap={12} />
                <circle cx="140" cy="158" r="4" fill="var(--ink)" opacity="0.15"
                  stroke="var(--ink)" strokeWidth="0.6" />
                <TextLines x={150} y={160} count={1} widths={[70]} />
              </ProjectWindow>
            </div>

            {/* ── 5. Drift ── */}
            <div onClick={() => handleCardClick(4)} style={{ cursor: 'pointer' }}>
              <ProjectWindow title="Drift" url="drift.focus" tag="focus · desktop app" rotate={-1}>
                <circle cx="160" cy="128" r="72"
                  fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.15" />
                <path
                  d="M 160 56 A 72 72 0 1 1 91 178"
                  fill="none" stroke="var(--ink)" strokeWidth="3.5"
                  strokeLinecap="round" opacity="0.55" />
                <text x="160" y="122" fontFamily="'Caveat', cursive" fontSize="32" fontWeight="700"
                  fill="var(--ink)" textAnchor="middle" opacity="0.7">14:22</text>
                <text x="160" y="142" fontFamily="'Architects Daughter', cursive" fontSize="9"
                  fill="var(--ink-mid)" textAnchor="middle" opacity="0.5">focus session</text>
                <rect x="152" y="174" width="6" height="16" rx="1"
                  fill="var(--ink)" opacity="0.3" />
                <rect x="162" y="174" width="6" height="16" rx="1"
                  fill="var(--ink)" opacity="0.3" />
              </ProjectWindow>
            </div>

          </div>
        </div>

        {/* drag hint */}
        <div className={styles.hint}>drag to explore →</div>

      </div>{/* end .page */}

      {/* modal */}
      <ProjectModal
        project={selectedIndex !== null ? PROJECTS[selectedIndex] : null}
        onClose={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex(i => (i !== null && i > 0 ? i - 1 : i))}
        onNext={() => setSelectedIndex(i => (i !== null && i < PROJECTS.length - 1 ? i + 1 : i))}
        hasPrev={selectedIndex !== null && selectedIndex > 0}
        hasNext={selectedIndex !== null && selectedIndex < PROJECTS.length - 1}
      />
    </div>
  );
}
