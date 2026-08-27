import { SvgFilters } from './SvgFilters';
import { BindingNav } from './BindingNav';
import styles from './Writing.module.css';

export function Writing() {
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
            i do writing
          </text>
        </svg>

        {/* content goes here */}
      </div>
    </div>
  );
}
