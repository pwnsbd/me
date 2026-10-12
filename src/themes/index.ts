import { lazy, type ComponentType } from 'react';
import type { Theme, ThemeId } from './types';

/* Each theme is its own dynamic-import chunk; nothing here imports theme code statically. */
const loaders: Record<ThemeId, () => Promise<{ default: Theme }>> = {
  creative: () => import('./creative'),
  recruiter: () => import('./recruiter'),
};

export const THEME_IDS = Object.keys(loaders) as ThemeId[];

export const THEME_LABELS: Record<ThemeId, string> = {
  creative: 'creative view',
  recruiter: 'recruiter view',
};

export function isThemeId(v: unknown): v is ThemeId {
  return typeof v === 'string' && v in loaders;
}

type Part = 'Layout' | 'Home' | 'Projects' | 'Resume' | 'Writing';
const cache = new Map<ThemeId, Theme>();

/** Returns a Theme whose parts are React.lazy wrappers over one shared import. */
export function getTheme(id: ThemeId): Theme {
  let theme = cache.get(id);
  if (!theme) {
    const load = loaders[id];
    const part = <K extends Part>(k: K) =>
      lazy(() => load().then((m) => ({ default: m.default[k] as ComponentType }))) as unknown as Theme[K];
    theme = {
      id,
      label: THEME_LABELS[id],
      Layout: part('Layout'),
      Home: part('Home'),
      Projects: part('Projects'),
      Resume: part('Resume'),
      Writing: part('Writing'),
    };
    cache.set(id, theme);
  }
  return theme;
}
