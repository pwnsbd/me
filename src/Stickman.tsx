import { useState } from 'react';
import styles from './Stickman.module.css';

export function Stickman() {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      viewBox="0 0 1058 760"
      preserveAspectRatio="xMidYMid meet"
    >
      <g transform="translate(530, 415)" filter="url(#pencil)">

        {/* ── AMOEBA AURA — organic blob rings pulsing outward ── */}
        {hovered && (
          <>
            <path
              d="M 8 -118 C 44 -122 78 -80 72 -44 C 68 -18 56 22 18 24 C -12 26 -68 6 -78 -30 C -86 -62 -62 -112 -26 -122 C -10 -126 0 -118 8 -118 Z"
              fill="none" stroke="var(--ink)" strokeWidth="0.8"
              className={`${styles.aura} ${styles.a1}`} />
            <path
              d="M 8 -118 C 44 -122 78 -80 72 -44 C 68 -18 56 22 18 24 C -12 26 -68 6 -78 -30 C -86 -62 -62 -112 -26 -122 C -10 -126 0 -118 8 -118 Z"
              fill="none" stroke="var(--ink)" strokeWidth="0.8"
              className={`${styles.aura} ${styles.a2}`} />
            <path
              d="M 8 -118 C 44 -122 78 -80 72 -44 C 68 -18 56 22 18 24 C -12 26 -68 6 -78 -30 C -86 -62 -62 -112 -26 -122 C -10 -126 0 -118 8 -118 Z"
              fill="none" stroke="var(--ink)" strokeWidth="0.8"
              className={`${styles.aura} ${styles.a3}`} />
          </>
        )}

        {/* ── THOUGHT BUBBLES — small → small → small → main cloud ── */}
        {hovered && (
          <>
            <g className={styles.bubble1}>
              <circle cx="-20" cy="-128" r="4"
                fill="#FFFDE7" stroke="var(--ink)" strokeWidth="0.9" opacity="0.2" />
            </g>
            <g className={styles.bubble2}>
              <circle cx="-35" cy="-145" r="6"
                fill="#FFFDE7" stroke="var(--ink)" strokeWidth="0.9" />
            </g>
            <g className={styles.bubble3}>
              <circle cx="-53" cy="-160" r="8"
                fill="#FFFDE7" stroke="var(--ink)" strokeWidth="1" />
            </g>

            {/* main thought cloud + coffee */}
            <g className={styles.mainBubble}>
              {/* cloud outline */}
              <path d="
                M -112 -190
                Q -122 -200 -108 -212
                Q -106 -226 -92 -228
                Q -88 -240 -75 -234
                Q -69 -243 -57 -234
                Q -48 -230 -48 -218
                Q -40 -210 -47 -202
                Q -40 -192 -50 -188
                L -110 -188
                Q -122 -188 -112 -190 Z"
                fill="#FFFDE7" stroke="var(--ink)" strokeWidth="1.1" />

              {/* ── COFFEE CUP ── */}
              {/* cup body — slight taper */}
              <path d="M -93 -204 L -64 -204 L -68 -229 L -89 -229 Z"
                fill="#F5EDD8" stroke="var(--ink)" strokeWidth="0.9" strokeLinejoin="round" />
              {/* coffee surface inside */}
              <ellipse cx="-79" cy="-228" rx="10" ry="2.8"
                fill="var(--ink-mid)" opacity="0.3" />
              {/* handle */}
              <path d="M -64 -223 C -54 -223 -54 -212 -64 -212"
                stroke="var(--ink)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
              {/* cup base plate */}
              <line x1="-96" y1="-204" x2="-61" y2="-204"
                stroke="var(--ink)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

              {/* steam — draws in after cloud appears */}
              <path d="M -88 -231 C -91 -237 -86 -242 -89 -248"
                stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round"
                className={`${styles.steam} ${styles.s0}`} />
              <path d="M -79 -231 C -76 -237 -82 -243 -79 -249"
                stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round"
                className={`${styles.steam} ${styles.s1}`} />
              <path d="M -70 -231 C -73 -236 -68 -242 -71 -247"
                stroke="var(--ink)" strokeWidth="1" fill="none" strokeLinecap="round"
                className={`${styles.steam} ${styles.s2}`} />
            </g>
          </>
        )}

        {/* ── FIGURE ── */}
        <g className={styles.breathe}
          style={{ pointerEvents: 'all', cursor: 'default' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* yoga mat */}
          <path d="M -90 128 L 88 122 L 50 -62 L -46 -56 Z"
            stroke="var(--ink)" strokeWidth="1.1" fill="var(--paper-dark)" opacity="0.36" />
          <line x1="-46" y1="-56" x2="50" y2="-62"
            stroke="var(--ink)" strokeWidth="0.9" opacity="0.28" />
          <line x1="-4" y1="128" x2="2" y2="-60"
            stroke="var(--ink)" strokeWidth="0.4" opacity="0.12" />

          {/* ground shadow */}
          <ellipse cx="0" cy="78" rx="62" ry="8"
            fill="var(--ink)" opacity="0.06" />

          {/* far leg (right) */}
          <path d="M 2 0 C 24 12 44 28 42 40 C 38 52 8 56 -18 58"
            stroke="var(--ink)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* far arm (right) */}
          <path d="M 6 -70 C 18 -56 32 -14 32 14"
            stroke="var(--ink)" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.85" />
          <circle cx="32" cy="17" r="3"
            stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.7" />

          {/* torso */}
          <path d="M 0 -70 C -4 -52 3 -28 2 0"
            stroke="var(--ink)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M -5 -67 C -8 -50 0 -26 -2 2"
            stroke="var(--ink)" strokeWidth="0.5" fill="none" strokeLinecap="round" opacity="0.2" />

          {/* near leg (left) */}
          <path d="M 2 0 C -26 16 -52 38 -48 52 C -44 68 -10 70 24 72"
            stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* neck */}
          <path d="M -2 -87 C -1 -82 0 -76 0 -70"
            stroke="var(--ink)" strokeWidth="1.9" fill="none" strokeLinecap="round" />

          {/* head */}
          <circle cx="-2" cy="-103" r="15"
            stroke="var(--ink)" strokeWidth="1.6" fill="var(--paper)" />
          <path d="M -10 -105 Q -7 -109 -4 -105"
            stroke="var(--ink)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M 0 -105 Q 3 -109 6 -105"
            stroke="var(--ink)" strokeWidth="1.1" fill="none" strokeLinecap="round" />
          <path d="M -6 -96 Q -1 -92 4 -96"
            stroke="var(--ink)" strokeWidth="1.0" fill="none" strokeLinecap="round" opacity="0.6" />

          {/* near arm (left) */}
          <path d="M -4 -70 C -16 -56 -34 -16 -36 14"
            stroke="var(--ink)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <circle cx="-36" cy="17" r="4"
            stroke="var(--ink)" strokeWidth="1.2" fill="none" />
        </g>

      </g>
    </svg>
  );
}
