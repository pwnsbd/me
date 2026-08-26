import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PaperSketches.module.css';

export function PaperSketches({ onHover, onLeave }: { onHover?: (s: string) => void; onLeave?: () => void }) {
  const navigate = useNavigate();
  const [circlingCreate, setCirclingCreate] = useState(false);
  const [circlingPhoto, setCirclingPhoto] = useState(false);
  const [circlingResume, setCirclingResume] = useState(false);
  const [circlingWriting, setCirclingWriting] = useState(false);

  function handleCreateClick() {
    if (circlingCreate) return;
    setCirclingCreate(true);
    setTimeout(() => navigate('/projects'), 700);
  }

  function handleWritingClick() {
    if (circlingWriting) return;
    setCirclingWriting(true);
    setTimeout(() => navigate('/writing'), 700);
  }

  function handleResumeClick() {
    if (circlingResume) return;
    setCirclingResume(true);
    setTimeout(() => navigate('/resume'), 700);
  }

  function handlePhotoClick(e: React.MouseEvent) {
    e.preventDefault();
    if (circlingPhoto) return;
    setCirclingPhoto(true);
    setTimeout(() => window.open('https://www.instagram.com/pawan_subedi/', '_blank', 'noopener,noreferrer'), 700);
    setTimeout(() => setCirclingPhoto(false), 800);
  }

  return (
    <>
      {/* ── Writing sketch — links to /writing ── */}
      <div
        className={`${styles.sketch} ${styles.drawSketch}`}
        onClick={handleWritingClick}
        onMouseEnter={() => onHover?.('writing')}
        onMouseLeave={() => onLeave?.()}
      >
        <svg viewBox="0 0 110 145" className={styles.svg} overflow="visible">
          <g filter="url(#pencil)">
            {/* open journal — two pages */}
            <path d="M 10 20 Q 10 15 16 15 L 52 18 L 52 105 L 16 102 Q 10 102 10 97 Z"
              stroke="var(--ink)" strokeWidth="1.4" fill="none" />
            <path d="M 52 18 L 88 15 Q 95 15 95 20 L 95 97 Q 95 102 88 102 L 52 105 Z"
              stroke="var(--ink)" strokeWidth="1.4" fill="none" />
            {/* spine shadow */}
            <line x1="52" y1="18" x2="52" y2="105"
              stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
            {/* left page lines */}
            <line x1="18" y1="32" x2="48" y2="32" stroke="var(--ink)" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
            <line x1="18" y1="42" x2="48" y2="42" stroke="var(--ink)" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
            <line x1="18" y1="52" x2="48" y2="52" stroke="var(--ink)" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
            <line x1="18" y1="62" x2="44" y2="62" stroke="var(--ink)" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
            {/* right page — lines that draw in on hover */}
            <path d="M 57 32 Q 68 30 80 32" stroke="var(--ink-mid)" strokeWidth="0.9" fill="none" strokeLinecap="round"
              className={`${styles.writeLine} ${styles.wl0}`} />
            <path d="M 57 42 Q 72 40 84 43" stroke="var(--ink-mid)" strokeWidth="0.9" fill="none" strokeLinecap="round"
              className={`${styles.writeLine} ${styles.wl1}`} />
            <path d="M 57 52 Q 66 50 78 52" stroke="var(--ink-mid)" strokeWidth="0.9" fill="none" strokeLinecap="round"
              className={`${styles.writeLine} ${styles.wl2}`} />
            <path d="M 57 62 Q 70 61 82 63" stroke="var(--ink-mid)" strokeWidth="0.9" fill="none" strokeLinecap="round"
              className={`${styles.writeLine} ${styles.wl3}`} />
            <path d="M 57 72 Q 64 70 73 72" stroke="var(--ink-mid)" strokeWidth="0.9" fill="none" strokeLinecap="round"
              className={`${styles.writeLine} ${styles.wl4}`} />
            {/* ink drop appears on hover after lines are written */}
            <circle cx="79.5" cy="72" r="1.8" fill="var(--ink)" className={styles.inkDrop} />
          </g>
          <text x="8" y="140" filter="url(#pencil)"
            fontFamily="'Architects Daughter', cursive"
            fontSize="15" fill="var(--pencil-blue)">
            i do writing
          </text>
          <path d="M 8 143 Q 50 147 100 144"
            stroke="var(--pencil-blue)" strokeWidth="1.2" fill="none"
            strokeLinecap="round" strokeDasharray="3 3"
            filter="url(#pencil)" opacity="0.7" />
          {circlingWriting && (
            <ellipse
              cx="55" cy="72" rx="62" ry="80"
              stroke="var(--ink)" strokeWidth="2.2" fill="none"
              filter="url(#pencil)"
              className={styles.circleAnim}
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>

      {/* ── Rocket / create sketch — click to /projects ── */}
      <div
        className={`${styles.sketch} ${styles.createSketch}`}
        onClick={handleCreateClick}
        onMouseEnter={() => onHover?.('projects')}
        onMouseLeave={() => onLeave?.()}
      >
        <svg viewBox="0 0 110 155" className={styles.svg} overflow="visible">
          <g filter="url(#pencil)">
            <path d="M 55 12 Q 70 20 74 52 L 74 90 L 55 98 L 36 90 L 36 52 Q 40 20 55 12 Z"
              stroke="var(--ink)" strokeWidth="1.5" fill="none" />
            <path d="M 44 40 Q 55 28 66 40"
              stroke="var(--ink)" strokeWidth="0.8" fill="none" opacity="0.45" />
            <circle cx="55" cy="58" r="10"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" />
            <circle cx="55" cy="58" r="5"
              stroke="var(--ink)" strokeWidth="0.7" fill="none" opacity="0.4" />
            <path d="M 36 72 L 20 92 L 36 86"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
            <path d="M 74 72 L 90 92 L 74 86"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
            {/* static flame shape (always visible, small) */}
            <path d="M 46 98 Q 49 108 55 104 Q 61 108 64 98"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            <line x1="18" y1="60" x2="30" y2="60"
              stroke="var(--ink)" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
            <line x1="15" y1="68" x2="28" y2="68"
              stroke="var(--ink)" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
            <line x1="80" y1="60" x2="92" y2="60"
              stroke="var(--ink)" strokeWidth="0.8" opacity="0.35" strokeLinecap="round" />
            <line x1="82" y1="68" x2="95" y2="68"
              stroke="var(--ink)" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
          </g>

          {/* hover flames — outer red, mid orange, inner yellow */}
          <g filter="url(#pencil)">
            <path d="M 38 98 Q 42 124 55 116 Q 68 124 72 98"
              stroke="#C0381A" strokeWidth="1.4" fill="none" strokeLinecap="round"
              className={`${styles.flame} ${styles.f0}`} />
            <path d="M 43 98 Q 47 118 55 111 Q 63 118 67 98"
              stroke="#E07818" strokeWidth="1.2" fill="none" strokeLinecap="round"
              className={`${styles.flame} ${styles.f1}`} />
            <path d="M 48 98 Q 51 112 55 108 Q 59 112 62 98"
              stroke="#F5C030" strokeWidth="1" fill="none" strokeLinecap="round"
              className={`${styles.flame} ${styles.f2}`} />
          </g>

          {/* label in pencil-blue to signal it's a link */}
          <text x="12" y="150" filter="url(#pencil)"
            fontFamily="'Architects Daughter', cursive"
            fontSize="15" fill="var(--pencil-blue)">
            i do create
          </text>
          {/* rough hand-drawn underline */}
          <path d="M 12 153 Q 45 157 86 154"
            stroke="var(--pencil-blue)" strokeWidth="1.2" fill="none"
            strokeLinecap="round" strokeDasharray="3 3"
            filter="url(#pencil)" opacity="0.7" />

          {/* pencil circle drawn on click */}
          {circlingCreate && (
            <ellipse
              cx="55" cy="78" rx="62" ry="88"
              stroke="var(--ink)" strokeWidth="2.2" fill="none"
              filter="url(#pencil)"
              className={styles.circleAnim}
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>

      {/* ── Tree / experiences sketch — links to /resume ── */}
      <div
        className={`${styles.sketch} ${styles.resumeSketch}`}
        onClick={handleResumeClick}
        onMouseEnter={() => onHover?.('resume')}
        onMouseLeave={() => onLeave?.()}
      >
        <svg viewBox="0 0 120 150" className={styles.svg} overflow="visible">
          <g filter="url(#pencil)">
            {/* trunk */}
            <path d="M 58 110 Q 56 95 55 78"
              stroke="var(--ink)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* main branches */}
            <path d="M 55 78 Q 42 60 28 52"
              stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 55 78 Q 68 58 82 48"
              stroke="var(--ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            <path d="M 55 85 Q 40 75 24 72"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <path d="M 55 85 Q 72 76 88 74"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            {/* smaller branches */}
            <path d="M 28 52 Q 18 42 14 32"
              stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 28 52 Q 30 38 36 28"
              stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 82 48 Q 90 36 96 26"
              stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 82 48 Q 78 34 74 24"
              stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M 24 72 Q 14 66 8 58"
              stroke="var(--ink)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7" />
            <path d="M 88 74 Q 98 68 104 60"
              stroke="var(--ink)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.7" />
            {/* tiny tip twigs */}
            <path d="M 14 32 Q 10 24 8 18" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 14 32 Q 18 22 20 16" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 36 28 Q 32 18 34 10" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 96 26 Q 100 16 102 10" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 74 24 Q 72 14 76 8" stroke="var(--ink)" strokeWidth="0.7" fill="none" strokeLinecap="round" opacity="0.6" />
            {/* roots */}
            <path d="M 58 110 Q 46 118 34 120"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 58 110 Q 70 120 80 118"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.6" />
            <path d="M 34 120 Q 24 122 18 126"
              stroke="var(--ink)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
            <path d="M 80 118 Q 90 122 96 126"
              stroke="var(--ink)" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.4" />
            {/* resting bud dots at twig tips */}
            <circle cx="8" cy="18" r="1.5" stroke="var(--ink)" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="20" cy="16" r="1.5" stroke="var(--ink)" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="34" cy="10" r="1.5" stroke="var(--ink)" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="76" cy="8" r="1.5" stroke="var(--ink)" strokeWidth="0.8" fill="none" opacity="0.5" />
            <circle cx="102" cy="10" r="1.5" stroke="var(--ink)" strokeWidth="0.8" fill="none" opacity="0.5" />
          </g>

          {/* leaves that bloom on hover */}
          <g filter="url(#pencil)">
              {/* each leaf: a small almond path, unique delay */}
              <path d="M 8 18 Q 3 12 8 8 Q 13 12 8 18 Z"   className={`${styles.leaf} ${styles.l0}`} stroke="#5A8A3A" strokeWidth="0.9" fill="none" />
              <path d="M 8 18 Q 14 13 18 18 Q 13 22 8 18 Z" className={`${styles.leaf} ${styles.l1}`} stroke="#4A7A2E" strokeWidth="0.9" fill="none" />
              <path d="M 20 16 Q 15 10 20 6 Q 25 10 20 16 Z" className={`${styles.leaf} ${styles.l2}`} stroke="#5A8A3A" strokeWidth="0.9" fill="none" />
              <path d="M 20 16 Q 26 11 28 16 Q 24 20 20 16 Z" className={`${styles.leaf} ${styles.l3}`} stroke="#3D6B28" strokeWidth="0.9" fill="none" />
              <path d="M 34 10 Q 30 4 34 0 Q 38 4 34 10 Z"  className={`${styles.leaf} ${styles.l4}`} stroke="#4A7A2E" strokeWidth="0.9" fill="none" />
              <path d="M 34 10 Q 40 6 42 11 Q 38 15 34 10 Z" className={`${styles.leaf} ${styles.l5}`} stroke="#5A8A3A" strokeWidth="0.9" fill="none" />
              <path d="M 76 8 Q 72 2 76 -2 Q 80 2 76 8 Z"   className={`${styles.leaf} ${styles.l6}`} stroke="#3D6B28" strokeWidth="0.9" fill="none" />
              <path d="M 76 8 Q 82 3 84 8 Q 80 13 76 8 Z"   className={`${styles.leaf} ${styles.l7}`} stroke="#5A8A3A" strokeWidth="0.9" fill="none" />
              <path d="M 102 10 Q 98 4 102 0 Q 106 4 102 10 Z" className={`${styles.leaf} ${styles.l8}`} stroke="#4A7A2E" strokeWidth="0.9" fill="none" />
              <path d="M 102 10 Q 108 5 110 10 Q 106 15 102 10 Z" className={`${styles.leaf} ${styles.l9}`} stroke="#5A8A3A" strokeWidth="0.9" fill="none" />
              {/* a few extra mid-branch sprouts */}
              <path d="M 14 32 Q 8 27 12 22 Q 17 26 14 32 Z" className={`${styles.leaf} ${styles.l2}`} stroke="#4A7A2E" strokeWidth="0.8" fill="none" opacity="0.8" />
              <path d="M 96 26 Q 102 21 104 27 Q 100 31 96 26 Z" className={`${styles.leaf} ${styles.l5}`} stroke="#5A8A3A" strokeWidth="0.8" fill="none" opacity="0.8" />
              <path d="M 8 58 Q 3 52 7 48 Q 12 52 8 58 Z" className={`${styles.leaf} ${styles.l7}`} stroke="#3D6B28" strokeWidth="0.8" fill="none" opacity="0.7" />
              <path d="M 104 60 Q 110 55 112 60 Q 108 65 104 60 Z" className={`${styles.leaf} ${styles.l3}`} stroke="#4A7A2E" strokeWidth="0.8" fill="none" opacity="0.7" />
            </g>

          {/* pencil-blue label + underline */}
          <text x="2" y="144" filter="url(#pencil)"
            fontFamily="'Architects Daughter', cursive"
            fontSize="13" fill="var(--pencil-blue)">
            i do have experiences
          </text>
          <path d="M 2 147 Q 55 151 114 148"
            stroke="var(--pencil-blue)" strokeWidth="1.2" fill="none"
            strokeLinecap="round" strokeDasharray="3 3"
            filter="url(#pencil)" opacity="0.7" />
          {circlingResume && (
            <ellipse
              cx="60" cy="74" rx="68" ry="80"
              stroke="var(--ink)" strokeWidth="2.2" fill="none"
              filter="url(#pencil)"
              className={styles.circleAnim}
              strokeLinecap="round"
            />
          )}
        </svg>
      </div>

      {/* ── Camera / photography sketch — links to Instagram ── */}
      <a
        href="https://www.instagram.com/pawan_subedi/"
        className={`${styles.sketch} ${styles.photoSketch}`}
        onClick={handlePhotoClick}
        onMouseEnter={() => onHover?.('photography')}
        onMouseLeave={() => onLeave?.()}
      >
        <svg viewBox="0 0 130 130" className={styles.svg} overflow="visible">
          {/* camera — black ink strokes */}
          <g filter="url(#pencil)">
            <rect x="8" y="32" width="114" height="74" rx="7"
              stroke="var(--ink)" strokeWidth="1.5" fill="none" />
            <rect x="42" y="20" width="34" height="18" rx="4"
              stroke="var(--ink)" strokeWidth="1.3" fill="none" />
            <circle cx="65" cy="70" r="26"
              stroke="var(--ink)" strokeWidth="1.5" fill="none" />
            <circle cx="65" cy="70" r="16"
              stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.55" />
            <path d="M 56 60 Q 60 57 64 59"
              stroke="var(--ink)" strokeWidth="1" fill="none"
              strokeLinecap="round" opacity="0.45" />
            <circle cx="22" cy="44" r="6"
              stroke="var(--ink)" strokeWidth="1.2" fill="none" />
          </g>

          {/* flash burst — white core + yellow rays, shown on hover */}
          <g>
            {/* bright filled core */}
            <circle cx="22" cy="44" r="9"
              fill="#FFFDE0" stroke="#FFE840" strokeWidth="1.2"
              className={`${styles.flash} ${styles.fls0}`} />
            {/* outer glow ring */}
            <circle cx="22" cy="44" r="16"
              fill="none" stroke="#FFE840" strokeWidth="1.8" opacity="0.6"
              className={`${styles.flash} ${styles.fls0}`} />
            {/* long rays */}
            <line x1="22" y1="24" x2="22" y2="14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" className={`${styles.flash} ${styles.fls1}`} />
            <line x1="22" y1="64" x2="22" y2="74" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" className={`${styles.flash} ${styles.fls1}`} />
            <line x1="2"  y1="44" x2="-8" y2="44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" className={`${styles.flash} ${styles.fls1}`} />
            <line x1="42" y1="44" x2="52" y2="44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" className={`${styles.flash} ${styles.fls1}`} />
            {/* diagonal rays */}
            <line x1="33" y1="33" x2="40" y2="26" stroke="#FFE840" strokeWidth="2" strokeLinecap="round" className={`${styles.flash} ${styles.fls2}`} />
            <line x1="11" y1="33" x2="4"  y2="26" stroke="#FFE840" strokeWidth="2" strokeLinecap="round" className={`${styles.flash} ${styles.fls2}`} />
            <line x1="33" y1="55" x2="40" y2="62" stroke="#FFE840" strokeWidth="2" strokeLinecap="round" className={`${styles.flash} ${styles.fls2}`} />
            <line x1="11" y1="55" x2="4"  y2="62" stroke="#FFE840" strokeWidth="2" strokeLinecap="round" className={`${styles.flash} ${styles.fls2}`} />
          </g>
          <text x="4" y="124" filter="url(#pencil)"
            fontFamily="'Architects Daughter', cursive"
            fontSize="15" fill="var(--pencil-blue)">
            i do photography
          </text>
          <path d="M 4 127 Q 50 131 118 128"
            stroke="var(--pencil-blue)" strokeWidth="1.2" fill="none"
            strokeLinecap="round" strokeDasharray="3 3"
            filter="url(#pencil)" opacity="0.7" />
          {circlingPhoto && (
            <ellipse
              cx="65" cy="72" rx="70" ry="66"
              stroke="var(--ink)" strokeWidth="2.2" fill="none"
              filter="url(#pencil)"
              className={styles.circleAnim}
              strokeLinecap="round"
            />
          )}
        </svg>
      </a>
    </>
  );
}
