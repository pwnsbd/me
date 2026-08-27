import styles from './ProjectWindow.module.css';

interface Props {
  title: string;
  url: string;
  tag: string;
  rotate: number;
  /** SVG content rendered inside the window (coords: x 12–308, y 38–210) */
  children: React.ReactNode;
}

export function ProjectWindow({ title, url, tag, rotate, children }: Props) {
  return (
    <div className={styles.card} style={{ '--rot': `${rotate}deg` } as React.CSSProperties}>
      <svg viewBox="0 0 320 220" className={styles.svg} overflow="visible">
        <g filter="url(#pencil)">
          {/* window body */}
          <path
            d="M 10 4 C 105 2 215 3 311 5 C 313 70 314 148 311 216
               C 215 218 105 217 9 215 C 7 148 6 70 10 4 Z"
            fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5"
          />
          {/* title bar separator */}
          <path d="M 9 32 C 105 30 215 31 311 33"
            stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.55" />

          {/* traffic lights */}
          <circle cx="26" cy="18" r="5.2" fill="#E57373" opacity="0.65"
            stroke="var(--ink)" strokeWidth="0.8" />
          <circle cx="42" cy="18" r="5.2" fill="#FFB74D" opacity="0.65"
            stroke="var(--ink)" strokeWidth="0.8" />
          <circle cx="58" cy="18" r="5.2" fill="#81C784" opacity="0.65"
            stroke="var(--ink)" strokeWidth="0.8" />

          {/* url bar background */}
          <path d="M 75 11 C 170 10 255 11 308 12 L 308 25 C 255 26 170 25 75 24 Z"
            fill="var(--paper-dark)" stroke="var(--ink)" strokeWidth="0.7" opacity="0.6" />
          {/* window title */}
          <text x="160" y="21" fontFamily="'Caveat', cursive" fontSize="11" fontWeight="700"
            fill="var(--ink)" textAnchor="middle" opacity="0.6">{title}</text>
          {/* url text */}
          <text x="116" y="21" fontFamily="'Architects Daughter', cursive" fontSize="7"
            fill="var(--ink-faint)">{url}</text>

          {/* content */}
          {children}

          {/* coming soon stamp */}
          <text
            x="160" y="128"
            fontFamily="'Caveat', cursive"
            fontSize="28"
            fontWeight="700"
            fill="var(--ink)"
            opacity="0.1"
            textAnchor="middle"
            dominantBaseline="middle"
            transform="rotate(-28, 160, 128)"
            letterSpacing="2"
          >coming soon</text>
        </g>
      </svg>

      {/* floating label */}
      <div className={styles.tag}>{tag}</div>
    </div>
  );
}
