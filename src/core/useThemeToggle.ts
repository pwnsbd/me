import { THEME_IDS, THEME_LABELS } from '../themes';
import { useThemeStore } from './themeStore';

/** Logic only: each theme draws its own toggle button. */
export function useThemeToggle() {
  const themeId = useThemeStore((s) => s.themeId);
  const toggle = useThemeStore((s) => s.toggle);
  const other = THEME_IDS[(THEME_IDS.indexOf(themeId) + 1) % THEME_IDS.length];
  return { themeId, toggle, otherLabel: THEME_LABELS[other] };
}
