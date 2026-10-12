import { create } from 'zustand';
import { THEME_IDS, isThemeId } from '../themes';
import type { ThemeId } from '../themes/types';

const KEY = 'site.view';
const DEFAULT: ThemeId = 'creative';

function initial(): ThemeId {
  try {
    const q = new URLSearchParams(window.location.search).get('view');
    if (isThemeId(q)) {
      try { localStorage.setItem(KEY, q); } catch { /* memory only */ }
      return q;
    }
  } catch { /* no window */ }
  try {
    const s = localStorage.getItem(KEY);
    if (isThemeId(s)) return s;
  } catch { /* storage unavailable */ }
  return DEFAULT;
}

function persist(id: ThemeId) {
  try { localStorage.setItem(KEY, id); } catch { /* memory only */ }
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.has('view')) {
      url.searchParams.delete('view');
      history.replaceState(history.state, '', url);
    }
  } catch { /* ignore */ }
}

interface ThemeState {
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  themeId: initial(),
  setTheme: (id) => {
    if (!isThemeId(id)) return;
    persist(id);
    set({ themeId: id });
  },
  toggle: () => {
    const i = THEME_IDS.indexOf(get().themeId);
    get().setTheme(THEME_IDS[(i + 1) % THEME_IDS.length]);
  },
}));
