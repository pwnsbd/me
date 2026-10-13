# Project showcase pages

Each project's showcase page lives in this repo under `public/<name>/` and is served at
`pwnsbd.me/<name>/`. The project's code stays in its own repo; the portfolio owns the
showcase page so it can change as the work evolves.

| Page | Folder | Copied from | Linked from |
| --- | --- | --- | --- |
| [pwnsbd.me/words/](https://pwnsbd.me/words/) | `public/words/` | `pwnsbd/Words` → `docs/` (2026-10-13) | Words project card, detailed CV |
| [pwnsbd.me/rasa/](https://pwnsbd.me/rasa/) | `public/rasa/` | `pwnsbd/rasa` → `docs/` (2026-10-13) | Rasa project card, detailed CV |

Other project sites that live elsewhere: Nakshatra (`nakshatra.pwnsbd.me`), Spotlight
(`spotlight.pwnsbd.me`).

## Rules

- **One folder per project**, lowercase, matching the URL: `public/<name>/index.html`.
- **Relative paths only** inside a page (`media/x.png`, not `/media/x.png`), so it works
  under its subfolder. Absolute URLs (share cards, `og:url`) use `https://pwnsbd.me/<name>/`.
- **Only what the page uses**: the HTML and the media it references. No internal notes
  or specs from the project repo.
- **Don't reuse the name as an app route.** The React app's routes (`/`, `/projects`,
  `/resume`, `/writing`) must never collide with a showcase folder.

## Adding a page

1. Copy the page into `public/<name>/` (HTML + referenced media only).
2. Add `<name>` to `vercel.json`: a redirect `/<name>` → `/<name>/`, and `<name>/` in the
   rewrite's exclusion list.
3. Point the project's `link` in `src/content/projects.ts` at `/<name>/`.
4. Add a row to the table above.

## How it's served

- **Vercel (production):** static files win over rewrites, so `/<name>/` serves
  `public/<name>/index.html`. Every other unknown path rewrites to the app's
  `index.html`, which is also what makes `/projects` and `/resume` load on refresh.
- **Dev and `vite preview`:** a small plugin in `vite.config.ts` serves
  `<folder>/index.html` for `/<folder>/`, matching Vercel.
