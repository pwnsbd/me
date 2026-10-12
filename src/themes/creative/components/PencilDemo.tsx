import styles from './PencilDemo.module.css';

export function PencilDemo() {
  return (
    <div className={styles.page}>
      {/* SVG filters — pencil grain + wobbly stroke */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          {/* Paper grain */}
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
            <feComponentTransfer in="blended">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
          </filter>

          {/* Pencil stroke feel — rough edges */}
          <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.06" numOctaves="3" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>

          {/* Heavier pencil for headings */}
          <filter id="pencil-heavy" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.05" numOctaves="4" seed="14" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Paper surface */}
      <div className={styles.paper}>

        <h1 className={styles.heading}>PAWAN</h1>
        <p className={styles.subheading}>engineer &amp; builder</p>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.label}>about</h2>
          <p className={styles.body}>
            I design and build things that live at the intersection of
            software, hardware, and curiosity.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.label}>current focus</h2>
          <p className={styles.body}>
            Designing tools that make complex ideas tangible.
          </p>
        </div>

        <div className={styles.sketchLine} />
        <p className={styles.caption}>iterate · learn · improve</p>
      </div>
    </div>
  );
}
