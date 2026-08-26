import styles from './Page.module.css';
import { Binding } from './Binding';
import { NameScribble } from './NameScribble';
import { PaperSketches } from './PaperSketches';
import { Stickman } from './Stickman';

export function Page() {
  return (
    <div className={styles.desk}>
      <div className={styles.notebook}>
        <div className={styles.front}>
          <Binding />
          <div className={styles.paper}>
            <NameScribble />
            <PaperSketches />
            <Stickman />
          </div>
        </div>
      </div>
    </div>
  );
}
