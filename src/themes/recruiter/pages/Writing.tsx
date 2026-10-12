import { POSTS } from '../../../content';
import styles from '../recruiter.module.css';

export function Writing() {
  return (
    <>
      <h1>Writing</h1>
      {POSTS.length === 0 ? <p>Coming soon.</p> : POSTS.map((p) => (
        <section key={p.title} className={styles.item}>
          <h2>{p.title}</h2>
          <div className={styles.meta}>{p.date}</div>
        </section>
      ))}
    </>
  );
}
