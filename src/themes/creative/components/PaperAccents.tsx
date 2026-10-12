import styles from './PaperAccents.module.css';

export function PaperAccents() {
  return (
    <div className={styles.root}>

      {/* ── SCIENCE DRAWINGS ── */}

      {/* Atom — top right */}
      <svg className={`${styles.drawing} ${styles.atom}`} viewBox="-70 -70 140 140" overflow="visible">
        <g stroke="var(--ink)" fill="none" strokeWidth="1">
          <ellipse rx="58" ry="22" transform="rotate(0)"   strokeWidth="0.9" />
          <ellipse rx="58" ry="22" transform="rotate(60)"  strokeWidth="0.9" />
          <ellipse rx="58" ry="22" transform="rotate(120)" strokeWidth="0.9" />
          <circle r="7" fill="var(--ink)" />
          <circle cx="58"  cy="0"   r="3" fill="var(--ink)" stroke="none" />
          <circle cx="-29" cy="50"  r="3" fill="var(--ink)" stroke="none" />
          <circle cx="-29" cy="-50" r="3" fill="var(--ink)" stroke="none" />
        </g>
      </svg>

      {/* DNA double helix — left edge */}
      <svg className={`${styles.drawing} ${styles.dna}`} viewBox="-15 -90 60 200" overflow="visible">
        <g stroke="var(--ink)" fill="none">
          <path d="M 0 -80 C 20 -60 20 -40 0 -20 C -20 0 -20 20 0 40 C 20 60 20 80 0 100"
            strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 30 -80 C 10 -60 10 -40 30 -20 C 50 0 50 20 30 40 C 10 60 10 80 30 100"
            strokeWidth="1.2" strokeLinecap="round" />
          {[-60,-40,-20,0,20,40,60,80].map((y, i) => (
            <line key={i}
              x1={i % 2 === 0 ? 4 : 22} y1={y}
              x2={i % 2 === 0 ? 26 : 8} y2={y}
              strokeWidth="0.8" />
          ))}
        </g>
      </svg>

      {/* Benzene ring — center */}
      <svg className={`${styles.drawing} ${styles.benzene}`} viewBox="-55 -55 110 110" overflow="visible">
        <g stroke="var(--ink)" fill="none" strokeWidth="1">
          <polygon points="0,-36 31,-18 31,18 0,36 -31,18 -31,-18" strokeWidth="1" />
          <circle r="20" strokeDasharray="9 5" strokeWidth="0.9" />
          {[0,60,120,180,240,300].map((deg, i) => {
            const r = Math.PI * deg / 180;
            return (
              <line key={i}
                x1={Math.sin(r) * 36} y1={-Math.cos(r) * 36}
                x2={Math.sin(r) * 46} y2={-Math.cos(r) * 46}
                strokeWidth="0.7" />
            );
          })}
        </g>
      </svg>

      {/* Sine wave — bottom */}
      <svg className={`${styles.drawing} ${styles.sine}`} viewBox="-90 -40 320 80" overflow="visible">
        <g stroke="var(--ink)" fill="none">
          <path d="M -80 0 C -60 -28 -40 -28 -20 0 C 0 28 20 28 40 0 C 60 -28 80 -28 100 0 C 120 28 140 28 160 0 C 180 -28 200 -28 220 0"
            strokeWidth="1.2" strokeLinecap="round" />
          <line x1="-85" y1="0" x2="-85" y2="-28" strokeWidth="0.7" />
          <line x1="-90" y1="-28" x2="-80" y2="-28" strokeWidth="0.7" />
          <path d="M -20 16 L -20 26 L 40 26 L 40 16" strokeWidth="0.7" />
          <text x="-88" y="-14" fontFamily="'Caveat', cursive" fontSize="12" fill="var(--ink)" textAnchor="middle">A</text>
          <text x="10"  y="36"  fontFamily="'Caveat', cursive" fontSize="12" fill="var(--ink)" textAnchor="middle">λ</text>
        </g>
      </svg>

      {/* Newton apple + gravity arc — lower left */}
      <svg className={`${styles.drawing} ${styles.newton}`} viewBox="-50 -60 100 110" overflow="visible">
        <g stroke="var(--ink)" fill="none">
          <path d="M -30 -40 Q 0 10 30 40" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="-30" y1="-40" x2="15" y2="-40" strokeWidth="0.7" strokeDasharray="4 3" />
          <line x1="15"  y1="-40" x2="15"  y2="0"  strokeWidth="0.7" />
          <polygon points="12,-2 18,-2 15,7" fill="var(--ink)" />
          <circle cx="-30" cy="-48" r="8" strokeWidth="0.9" />
          <path d="M -30 -56 C -28 -61 -22 -62 -22 -58" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      </svg>

      {/* Cell — bottom left */}
      <svg className={`${styles.drawing} ${styles.cell}`} viewBox="-55 -40 110 80" overflow="visible">
        <g stroke="var(--ink)" fill="none">
          <ellipse rx="48" ry="34" strokeWidth="1.1" />
          <ellipse rx="15" ry="11" cx="6" cy="-4" strokeWidth="0.9" strokeDasharray="3 2" />
          <ellipse rx="10" ry="6" cx="-22" cy="14" transform="rotate(-20,-22,14)" strokeWidth="0.7" />
          <line x1="-27" y1="14" x2="-17" y2="14" strokeWidth="0.5" />
          <circle cx="22"  cy="16"  r="2.2" fill="var(--ink)" />
          <circle cx="28"  cy="8"   r="2.2" fill="var(--ink)" />
          <circle cx="26"  cy="-14" r="2.2" fill="var(--ink)" />
          <circle cx="-10" cy="22"  r="2.2" fill="var(--ink)" />
        </g>
      </svg>

      {/* Pythagorean triangle — mid right */}
      <svg className={`${styles.drawing} ${styles.pythagoras}`} viewBox="-10 -50 80 70" overflow="visible">
        <g stroke="var(--ink)" fill="none">
          <polygon points="0,0 54,0 0,-40" strokeWidth="1" />
          <polyline points="0,-9 9,-9 9,0" strokeWidth="0.7" />
          <text x="27"  y="14"  fontFamily="'Caveat', cursive" fontSize="13" fill="var(--ink)" textAnchor="middle">a</text>
          <text x="-12" y="-18" fontFamily="'Caveat', cursive" fontSize="13" fill="var(--ink)" textAnchor="middle">b</text>
          <text x="34"  y="-26" fontFamily="'Caveat', cursive" fontSize="13" fill="var(--ink)" textAnchor="middle">c</text>
        </g>
      </svg>

      {/* E = mc² */}
      <svg className={`${styles.drawing} ${styles.emc}`} viewBox="-60 -18 120 36" overflow="visible">
        <text x="0" y="0" fontFamily="'Caveat', cursive" fontSize="26"
          fill="var(--ink)" textAnchor="middle" dominantBaseline="middle">E = mc²</text>
      </svg>

      {/* Fibonacci spiral — right side */}
      <svg className={`${styles.drawing} ${styles.fibonacci}`} viewBox="-65 -100 140 120" overflow="visible">
        <g stroke="var(--ink)" fill="none">
          <rect x="0"   y="-34" width="34" height="34" strokeWidth="0.7" opacity="0.7" />
          <rect x="-21" y="-34" width="21" height="21" strokeWidth="0.7" opacity="0.7" />
          <rect x="0"   y="0"   width="55" height="55" strokeWidth="0.7" opacity="0.7" />
          <path d="M 34 -34 Q 34 0 0 0 Q -21 0 -21 -13 Q -21 -34 0 -34"
            strokeWidth="1.1" strokeLinecap="round" />
        </g>
      </svg>

      {/*
        Golden ratio — Fibonacci grid + correct spiral
        Outer rect: 162 × 100  (162/100 = 1.62 ≈ φ)

        Square 1 (100×100) x:0→100,  y:0→100    pivot corner: (100,100)  sweep CW  (1)
        Square 2  (62×62)  x:100→162,y:0→62     pivot corner: (100,62)   sweep CW  (1)
        Square 3  (38×38)  x:124→162,y:62→100   pivot corner: (162,100)  sweep CCW (0)
        Square 4  (24×24)  x:100→124,y:76→100   pivot corner: (124,76)   sweep CW  (1)
        Square 5  (14×14)  x:100→114,y:62→76    pivot corner: (114,76)   sweep CW  (1)
      */}
      <svg className={`${styles.drawing} ${styles.golden}`} viewBox="-4 -4 170 116" overflow="visible">
        <g stroke="var(--ink)" fill="none">
          {/* outer rectangle */}
          <rect x="0" y="0" width="162" height="100" strokeWidth="1.3" />
          {/* square dividers */}
          <line x1="100" y1="0"  x2="100" y2="100" strokeWidth="0.7" strokeDasharray="4 3" />
          <line x1="100" y1="62" x2="162" y2="62"  strokeWidth="0.7" strokeDasharray="4 3" />
          <line x1="124" y1="62" x2="124" y2="100" strokeWidth="0.7" strokeDasharray="4 3" />
          <line x1="100" y1="76" x2="124" y2="76"  strokeWidth="0.7" strokeDasharray="4 3" />
          <line x1="114" y1="62" x2="114" y2="76"  strokeWidth="0.7" strokeDasharray="4 3" />
          {/* golden spiral — verified sweep flags */}
          <path d="M 0   100 A 100 100 0 0 1 100 0"   strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 100 0   A 62  62  0 0 1 162 62"  strokeWidth="1.4" strokeLinecap="round" />
          <path d="M 162 62  A 38  38  0 0 0 124 100" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M 124 100 A 24  24  0 0 1 100 76"  strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 100 76  A 14  14  0 0 1 114 62"  strokeWidth="1.1" strokeLinecap="round" />
          {/* φ label */}
          <text x="81" y="113" fontFamily="'Caveat', cursive" fontSize="14"
            fill="var(--ink)" textAnchor="middle">φ ≈ 1.618</text>
        </g>
      </svg>

      {/* ── NEPALI TEXT ── */}
      <div className={`${styles.np} ${styles.np1}`}>जहाँ इच्छा, त्यहाँ बाटो</div>
      <div className={`${styles.np} ${styles.np2}`}>बनाउँदै जाऊ</div>
      <div className={`${styles.np} ${styles.np3}`}>हार नमान</div>
      <div className={`${styles.np} ${styles.np4}`}>सिक्दै जाऊ</div>
      <div className={`${styles.np} ${styles.np5}`}>सपना देख्नु पाप होइन</div>

    </div>
  );
}
