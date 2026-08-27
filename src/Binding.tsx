import styles from './Binding.module.css';
import { BindingNav } from './BindingNav';

interface Props { hideNav?: boolean; }

export function Binding({ hideNav }: Props) {
  return (
    <div className={styles.binding}>
      {!hideNav && <BindingNav />}
    </div>
  );
}
