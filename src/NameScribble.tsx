import styles from './NameScribble.module.css';

export function NameScribble() {
  return (
    <div className={styles.root}>
      <svg viewBox="0 0 520 160" className={styles.svg} overflow="visible" style={{ overflow: 'visible' }}>
        {/* ghost pass */}
        <text x="3" y="58" filter="url(#pencil)" className={styles.ghost}>
          Pawan
        </text>
        {/* main name */}
        <text x="1" y="56" filter="url(#pencil)" className={styles.name}>
          Pawan
        </text>
        {/* underline */}
        <path
          d="M 4 68 Q 100 75 200 71 Q 295 67 388 73"
          stroke="var(--ink)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          filter="url(#pencil)"
          opacity="0.55"
        />
        {/* summary — wrapped across two lines */}
        <text x="2" y="100" filter="url(#pencil)" className={styles.summary}>
          just an enthusiastic builder who wants to
        </text>
        <text x="2" y="124" filter="url(#pencil)" className={styles.summary}>
          create products that are fun to use.
        </text>

        {/* ── WALKING STICKMAN — walks the underline, sits at the end ── */}
        <g transform="translate(388, 70)">

          {/* WALKING GROUP — slides from left, fades out on arrival */}
          <g filter="url(#pencil)" className={styles.walkGroup}>
            {/* head */}
            <circle cy="-26" r="5"
              stroke="var(--ink)" strokeWidth="1.1" fill="var(--paper)" />
            {/* torso */}
            <line x1="0" y1="-21" x2="0" y2="-13"
              stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" />

            {/* RIGHT arm group — rotates from shoulder, hand circle travels with it */}
            <g className={styles.wRArm}>
              <line x1="0" y1="-19" x2="7" y2="-13"
                stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="7" cy="-13" r="2.2"
                fill="var(--ink)" opacity="0.78" />
            </g>
            {/* LEFT arm group */}
            <g className={styles.wLArm}>
              <line x1="0" y1="-19" x2="-7" y2="-13"
                stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="-7" cy="-13" r="2.2"
                fill="var(--ink)" opacity="0.78" />
            </g>

            {/* RIGHT leg — thigh + calf + shoe at foot */}
            <g className={styles.wRLeg}>
              <line x1="0" y1="-13" x2="0" y2="-5"
                stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="3" y2="0"
                stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="3" cy="0" r="2.2"
                fill="var(--ink)" opacity="0.82" />
            </g>
            {/* LEFT leg — thigh + calf + shoe at foot */}
            <g className={styles.wLLeg}>
              <line x1="0" y1="-13" x2="0" y2="-5"
                stroke="var(--ink)" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="0" y1="-5" x2="-3" y2="0"
                stroke="var(--ink)" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="-3" cy="0" r="2.2"
                fill="var(--ink)" opacity="0.82" />
            </g>
          </g>

          {/* SITTING GROUP — fades in, legs dangle with knee circles */}
          <g filter="url(#pencil)" className={styles.sitGroup}>
            {/* head + eyes — tilts from neck, eyes gaze independently */}
            <g className={styles.headLook}>
              <circle cx="3" cy="-23" r="5"
                stroke="var(--ink)" strokeWidth="1.1" fill="var(--paper)" />
              <g className={styles.eyeGaze}>
                <circle cx="1.5" cy="-19.8" r="0.9" fill="var(--ink)" />
                <circle cx="4.5" cy="-19.8" r="0.9" fill="var(--ink)" />
              </g>
            </g>
            {/* body — slight forward arch for natural sitting posture */}
            <path d="M 1 -18 Q -3 -9 0 0"
              stroke="var(--ink)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            {/* arms resting on the line edge, hand circles at tips */}
            <line x1="1" y1="-13" x2="-6" y2="-8"
              stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="-6" cy="-8" r="2"
              fill="var(--ink)" opacity="0.72" />
            <line x1="1" y1="-13" x2="8" y2="-8"
              stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="8" cy="-8" r="2"
              fill="var(--ink)" opacity="0.72" />
            {/* LEFT dangling leg — shoe at foot tip */}
            <g className={styles.sitLegL}>
              <path d="M 0 0 C -2 5 -3 9 -3 15"
                stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <circle cx="-3" cy="15" r="2.2"
                fill="var(--ink)" opacity="0.78" />
            </g>
            {/* RIGHT dangling leg — shoe at foot tip */}
            <g className={styles.sitLegR}>
              <path d="M 0 0 C 2 5 4 9 4 15"
                stroke="var(--ink)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <circle cx="4" cy="15" r="2.2"
                fill="var(--ink)" opacity="0.78" />
            </g>
          </g>

        </g>
      </svg>
    </div>
  );
}
