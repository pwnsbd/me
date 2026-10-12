import styles from './PageTitle.module.css';

interface Props {
  title: string;
}

export function PageTitle({ title }: Props) {
  return (
    <svg className={styles.root} overflow="visible">
      <text
        x="0"
        y="0"
        filter="url(#pencil)"
        fontFamily="'Caveat', cursive"
        fontWeight="700"
        fontSize="54"
        fill="var(--ink-faint)"
        textAnchor="middle"
        dominantBaseline="middle"
        transform="rotate(-90)"
      >
        {title}
      </text>
    </svg>
  );
}
