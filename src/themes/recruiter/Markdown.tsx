import type { ReactNode } from 'react';
import recruiter from './recruiter.module.css';
import styles from './markdown.module.css';
import type { Block } from './mdParse';
import { slugify } from './slug';

const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)/;

function inline(text: string, key = ''): ReactNode[] {
  const out: ReactNode[] = [];
  let rest = text;
  let i = 0;
  while (rest) {
    const m = INLINE.exec(rest);
    if (!m) { out.push(rest); break; }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    const k = `${key}${i++}`;
    if (m[1] !== undefined) out.push(<strong key={k}>{inline(m[1], k + '.')}</strong>);
    else if (m[2] !== undefined) out.push(<em key={k}>{inline(m[2], k + '.')}</em>);
    else {
      const external = /^https?:/.test(m[4]);
      out.push(
        <a key={k} href={m[4]} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
          {inline(m[3], k + '.')}
        </a>,
      );
    }
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

/** Italic-only paragraph (a date / place line). */
const isDateLine = (lines: string[]) => lines.length === 1 && /^\*[^*]+\*$/.test(lines[0].trim());

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.md}>
      {blocks.map((b, n) => {
        switch (b.t) {
          case 'h': {
            if (b.level === 1) return <h1 key={n}>{inline(b.text)}</h1>;
            if (b.level === 2) {
              return (
                <h2 key={n} id={slugify(b.text)} className={`${recruiter.section} ${recruiter.anchor}`}>
                  {inline(b.text)}
                </h2>
              );
            }
            return <h3 key={n}>{inline(b.text)}</h3>;
          }
          case 'hr': return <hr key={n} />;
          case 'ul': return <ul key={n}>{b.items.map((it, j) => <li key={j}>{inline(it)}</li>)}</ul>;
          case 'table':
            return (
              <div key={n} className={styles.tableWrap}>
                <table>
                  <thead><tr>{b.head.map((c, j) => <th key={j}>{inline(c)}</th>)}</tr></thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>{r.map((c, k) => <td key={k}>{inline(c)}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'p':
            return (
              <p key={n} className={isDateLine(b.lines) ? styles.date : undefined}>
                {b.lines.map((l, j) => (
                  <span key={j}>
                    {inline(l.trim())}
                    {j < b.lines.length - 1 && (/ {2}$/.test(l) ? <br /> : ' ')}
                  </span>
                ))}
              </p>
            );
        }
      })}
    </div>
  );
}
