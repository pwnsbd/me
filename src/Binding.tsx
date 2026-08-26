import styles from './Binding.module.css';
import { BindingNav } from './BindingNav';
import { SvgFilters } from './SvgFilters';

export function Binding() {
  return (
    <div className={styles.binding}>
      <SvgFilters />
      <BindingNav />
    </div>
  );
}
