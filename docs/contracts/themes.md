# Contract: themes and style switch (`src/themes/`, `src/core/`)

Two (or more) complete UI "styles" over the same content and routes. They are toggled like dark/light mode.

## Inputs
- Content from `src/content` (see `content.md`)
- `?view=<themeId>` URL param, plus the localStorage key `site.view`

## Outputs
```ts
// src/themes/types.ts
export interface Theme {
  id: 'creative' | 'recruiter';
  label: string;
  Layout: FC<{ children: ReactNode }>;   // its own shell/nav; must render <ThemeToggle/>
  Home: FC; Projects: FC; Resume: FC; Writing: FC;
}
```
- `src/themes/index.ts` holds a registry where each theme is lazy-loaded (`React.lazy` / dynamic import).
- `src/core/themeStore.ts` is a Zustand store: `{ themeId, setTheme, toggle }`. It reads `?view=` first, then localStorage, then the default.
- **Default: `creative`.** `?view=recruiter` deep-links into the recruiter style and persists that choice.
- `src/core/routes.ts` defines the paths `/`, `/projects`, `/resume`, `/writing` once. `App.tsx` maps them to `theme.Home` and so on.
- `ThemeToggle` (in `core/`) holds the logic only. Each theme passes its own visual for it.

## Errors
- An unknown `?view=` value falls back to the default.
- If localStorage is unavailable, the store works in memory only.

## Perf budget
- Users who stay in the recruiter style never download three.js, R3F, GSAP or RoughJS. Creative-only dependencies are imported only under `themes/creative/`.
- A toggle swaps themes in under 300 ms after the first load.

## Out of scope
- Designing the recruiter style. That is step 4 and is done with the user.
- SSR or SEO work.

## Done-check
- Step 2: the site is pixel-identical, and every creative file is under `themes/creative/`.
- Step 3: the toggle flips between creative and a placeholder recruiter page, the choice survives a reload, `?view=recruiter` works, and creative stays the default.
- `npm run build` and `npm run lint` pass.
