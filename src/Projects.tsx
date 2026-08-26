import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SvgFilters } from './SvgFilters';
import { BindingNav } from './BindingNav';
import { ProjectWindow } from './ProjectWindow';
import styles from './Projects.module.css';

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

  /* mouse drag to scroll */
  function onMouseDown(e: React.MouseEvent) {
    const el = railRef.current;
    if (!el) return;
    const startX = e.pageX - el.offsetLeft;
    const startScroll = el.scrollLeft;
    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = startScroll - (ev.pageX - el.offsetLeft - startX);
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  return (
    <div className={styles.desk}>
      <SvgFilters />
      <BindingNav sidebar />

      {/* back link */}
      <Link to="/" className={styles.back}>← back</Link>

      {/* section title */}
      <div className={styles.titleWrap}>
        <svg viewBox="0 0 260 48" className={styles.titleSvg} overflow="visible">
          <text x="2" y="38" fontFamily="'Caveat', cursive" fontSize="42" fontWeight="700"
            fill="var(--paper)" filter="url(#pencil)" opacity="0.92">
            i do create
          </text>
          <path d="M 2 44 Q 90 49 200 46"
            stroke="var(--paper)" strokeWidth="1.6" fill="none" opacity="0.45"
            filter="url(#pencil)" strokeLinecap="round" />
        </svg>
      </div>

      {/* horizontal window rail */}
      <div className={styles.rail} ref={railRef} onMouseDown={onMouseDown}>
        <div className={styles.track}>

          {/* ── 1. Scribbly — markdown notes app ── */}
          <ProjectWindow title="Scribbly" url="scribbly.app" tag="notes · web app" rotate={-3}>
            {/* heading line */}
            <text x="22" y="58" fontFamily="'Caveat', cursive" fontSize="15" fontWeight="700"
              fill="var(--ink)" opacity="0.7">My Notes</text>
            {/* ruled lines */}
            <TextLines x={22} y={74} count={7} gap={13}
              widths={[230, 180, 210, 150, 200, 170, 120]} />
            {/* pencil icon on the right */}
            <g transform="translate(268, 50) rotate(40)" opacity="0.3">
              <rect x="-4" y="-18" width="8" height="24" rx="1"
                fill="var(--ink-faint)" stroke="var(--ink)" strokeWidth="0.8" />
              <polygon points="-4,6 4,6 0,13" fill="var(--ink)" />
              <rect x="-4" y="-18" width="8" height="5" rx="1" fill="#B0A090"
                stroke="var(--ink)" strokeWidth="0.5" />
            </g>
            {/* bullet dots */}
            {[74, 87, 100, 113, 126, 139, 152].map((cy, i) => (
              <circle key={i} cx="16" cy={cy} r="1.5" fill="var(--ink)" opacity="0.25" />
            ))}
          </ProjectWindow>

          {/* ── 2. Wavr — audio waveform visualiser ── */}
          <ProjectWindow title="Wavr" url="wavr.fm" tag="audio · web app" rotate={2}>
            {/* track label */}
            <text x="22" y="58" fontFamily="'Architects Daughter', cursive" fontSize="9"
              fill="var(--ink-mid)" opacity="0.6">now playing — lo-fi study mix</text>
            {/* waveform bars */}
            {(() => {
              const heights = [18,28,14,34,22,40,16,30,36,12,26,38,20,32,10,44,24,36,18,28,14,32,22,40,16];
              return heights.map((h, i) => (
                <path key={i}
                  d={`M ${22 + i * 11} ${128 + h / 2} C ${22 + i * 11 + 3} ${128 + h / 2 - 1} ${22 + i * 11 + 7} ${128 - h / 2 + 1} ${22 + i * 11 + 9} ${128 - h / 2}`}
                  stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" fill="none"
                  opacity={i < 14 ? 0.7 : 0.2} />
              ));
            })()}
            {/* play button */}
            <circle cx="160" cy="175" r="12" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.5" />
            <polygon points="156,170 156,180 168,175" fill="var(--ink)" opacity="0.4" />
            {/* timeline bar */}
            <path d="M 22 160 L 298 160" stroke="var(--ink)" strokeWidth="1" opacity="0.2" strokeLinecap="round" />
            <path d="M 22 160 L 145 160" stroke="var(--ink)" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
            <circle cx="145" cy="160" r="4" fill="var(--ink)" opacity="0.5" />
          </ProjectWindow>

          {/* ── 3. Bloom — habit tracker ── */}
          <ProjectWindow title="Bloom" url="bloom.day" tag="habits · mobile web" rotate={-2}>
            <text x="22" y="56" fontFamily="'Caveat', cursive" fontSize="14" fontWeight="700"
              fill="var(--ink)" opacity="0.7">August</text>
            {/* calendar grid 7×4 */}
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

          {/* ── 4. Peek — link preview generator ── */}
          <ProjectWindow title="Peek" url="peek.link" tag="utility · chrome ext" rotate={3}>
            <text x="22" y="56" fontFamily="'Architects Daughter', cursive" fontSize="8"
              fill="var(--ink-mid)" opacity="0.6">paste a url, get a preview</text>
            {/* input box */}
            <path d="M 20 63 L 280 64 L 280 76 L 20 75 Z"
              fill="var(--paper-dark)" stroke="var(--ink)" strokeWidth="0.8" opacity="0.6" />
            <text x="26" y="73" fontFamily="'Architects Daughter', cursive" fontSize="7"
              fill="var(--ink-faint)">https://</text>
            {/* preview card */}
            <path d="M 20 84 L 300 85 L 299 210 L 21 209 Z"
              fill="var(--paper-dark)" stroke="var(--ink)" strokeWidth="0.9" opacity="0.45" />
            {/* image placeholder */}
            <path d="M 26 90 L 130 91 L 130 140 L 26 139 Z"
              fill="var(--ink)" opacity="0.06" stroke="var(--ink)" strokeWidth="0.7" />
            <path d="M 55 115 L 75 100 L 95 118 L 108 108 L 130 130 L 26 130 Z"
              fill="var(--ink)" opacity="0.08" />
            {/* text lines */}
            <TextLines x={140} y={100} count={2} widths={[150, 100]} gap={14} />
            <TextLines x={140} y={132} count={3} widths={[155, 140, 90]} gap={12} />
            {/* favicon dot */}
            <circle cx="140" cy="158" r="4" fill="var(--ink)" opacity="0.15"
              stroke="var(--ink)" strokeWidth="0.6" />
            <TextLines x={150} y={160} count={1} widths={[70]} />
          </ProjectWindow>

          {/* ── 5. Drift — pomodoro / focus timer ── */}
          <ProjectWindow title="Drift" url="drift.focus" tag="focus · desktop app" rotate={-1}>
            {/* big circle ring */}
            <circle cx="160" cy="128" r="72"
              fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.15" />
            {/* progress arc — ~70% done */}
            <path
              d="M 160 56 A 72 72 0 1 1 91 178"
              fill="none" stroke="var(--ink)" strokeWidth="3.5"
              strokeLinecap="round" opacity="0.55" />
            {/* time text */}
            <text x="160" y="122" fontFamily="'Caveat', cursive" fontSize="32" fontWeight="700"
              fill="var(--ink)" textAnchor="middle" opacity="0.7">14:22</text>
            <text x="160" y="142" fontFamily="'Architects Daughter', cursive" fontSize="9"
              fill="var(--ink-mid)" textAnchor="middle" opacity="0.5">focus session</text>
            {/* pause button */}
            <rect x="152" y="174" width="6" height="16" rx="1"
              fill="var(--ink)" opacity="0.3" />
            <rect x="162" y="174" width="6" height="16" rx="1"
              fill="var(--ink)" opacity="0.3" />
          </ProjectWindow>

        </div>
      </div>

      {/* drag hint */}
      <div className={styles.hint}>drag to explore →</div>
    </div>
  );
}
