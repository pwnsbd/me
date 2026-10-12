import styles from './Page.module.css';
import { SvgFilters } from '../SvgFilters';
import { BindingNav } from '../components/BindingNav';
import { NameScribble } from '../components/NameScribble';
import { PaperSketches } from '../components/PaperSketches';
import { PaperAccents } from '../components/PaperAccents';
import { Stickman } from '../components/Stickman';

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
