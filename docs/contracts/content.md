# Contract: content layer (`src/content/`)

One source of truth for everything the site *says*. No React, no JSX, no CSS, no imports from components.

## Inputs
None. These are static, typed TS modules edited by hand.

## Outputs
| File | Exports |
|---|---|
| `types.ts` | `Project`, `ProjectGroup`, `Profile`, `SocialLink`, `ResumeEntry`, `Education`, `Resume`, `WritingPost` (names may follow the existing types, such as `ProjectInfo` or `Entry`, if they are already used widely; keep one name per concept) |
| `profile.ts` | `PROFILE`: name, tagline/role, bio, email, location, links |
| `projects.ts` | `PROJECTS`, `GROUPS` (moved from `src/projectData.ts`) |
| `resume.ts` | `RESUME` (moved from `src/Resume.tsx`) |
| `writing.ts` | `POSTS: WritingPost[]` (empty array for now) |
| `index.ts` | re-exports all of the above |

Rules:
- Text that any style might show (name, bio, project copy, resume entries, contact, links) lives here, not in components.
- Text that is purely decorative and belongs to one style (sketch labels, doodle captions, "pencil" UI words) stays in that style's components.
- Strings are copied verbatim, with the same whitespace, punctuation and line breaks the UI relies on.

## Errors
Compile-time only (TS types). No runtime validation.

## Perf budget
No new dependencies. Bundle size is about the same, within ±1 KB.

## Out of scope
- Moving components into `themes/` (step 2)
- Theme store or toggle (step 3)
- Any visual, CSS or behaviour change

## Done-check
- `npm run build` and `npm run lint` pass.
- `grep` finds no remaining hardcoded resume, profile or project data in components.
- Every page (`/`, `/projects`, `/resume`, `/writing`, plus an open project modal) looks pixel-identical before and after, checked by the Conductor in the main checkout.
