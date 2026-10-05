import { Fragment, useRef, useState } from 'react';
import { SvgFilters } from './SvgFilters';
import { BindingNav } from './BindingNav';
import { ProjectWindow } from './ProjectWindow';
import { ProjectModal } from './ProjectModal';
import { ProjectSketch } from './ProjectSketches';
import { GROUPS, PROJECTS } from './projectData';
import styles from './Projects.module.css';

/* gentle hand-placed tilt, cycled across cards */
const ROTATIONS = [-3, 2, -2, 3, -1, 1.5, -2.5, 2.5];

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
            {GROUPS.map(group => (
              <Fragment key={group.id}>
                {/* shelf label between groups */}
                <div className={styles.shelf}>
                  <span className={styles.shelfLabel}>{group.label}</span>
                  <span className={styles.shelfNote}>{group.note}</span>
                </div>

                {PROJECTS.map((p, index) => p.group === group.id && (
                  <div key={p.title} onClick={() => handleCardClick(index)}>
                    <ProjectWindow title={p.title} url={p.url} tag={p.tag} stamp={p.stamp}
                      rotate={ROTATIONS[index % ROTATIONS.length]} small={p.group === 'more'}>
                      <ProjectSketch kind={p.sketch} />
                    </ProjectWindow>
                  </div>
                ))}
              </Fragment>
            ))}
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
