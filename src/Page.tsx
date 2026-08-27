import styles from './Page.module.css';
import { SvgFilters } from './SvgFilters';
import { BindingNav } from './BindingNav';
import { NameScribble } from './NameScribble';
import { PaperSketches } from './PaperSketches';
import { PaperAccents } from './PaperAccents';
import { Stickman } from './Stickman';

export function Page() {
  return (
    <div className={styles.desk}>
      <SvgFilters />
      <BindingNav sidebar />
      <div className={styles.page}>
        <div className={styles.content}>
          <PaperAccents />
          <NameScribble />
          <PaperSketches />
          <Stickman />
        </div>
      </div>
    </div>
  );
}
