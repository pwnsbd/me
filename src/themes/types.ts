import type { FC, ReactNode } from 'react';

export type ThemeId = 'creative' | 'recruiter';

export interface Theme {
  id: ThemeId;
  label: string;
  /** its own shell/nav; builds its toggle with useThemeToggle */
  Layout: FC<{ children: ReactNode }>;
  Home: FC;
  Projects: FC;
  Resume: FC;
  Writing: FC;
}
