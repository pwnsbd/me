# PLAN

## Goal
Separate content from presentation so the site can switch between the current **creative** style and a new **recruiter** style (toggled like dark/light mode) without touching the current UI.

## Decisions
- 2026-10-05: Each style is a full theme (its own Layout and pages), not CSS-variable swaps, because the creative style is structural (sketches, 3D, GSAP).
- 2026-10-05: The default style is **creative**. `?view=recruiter` deep-links to the recruiter style, and the choice persists in localStorage.
- 2026-10-05: Work happens on the `dev` branch (base `e3b3d0a`).
- 2026-10-05: Every step before step 4 must leave the UI pixel-identical.
- 2026-10-05: Creative global.css leak into recruiter fixed by recruiter .shell base styles (e4e4d5f).
- 2026-10-12: Recruiter style direction is **editorial resume**: serif name, sans body, generous white space, one accent color, small-caps section labels, print-friendly, Download PDF button.
- 2026-10-12: Recruiter Home = rauno.me-style horizontal strip of 4 white panels (About me, Experience, Projects, Contact) on a light-gray stage, tick ruler on top, vertical wheel scrolls sideways; panels link to the full Resume/Projects pages. Placeholder type Geist, accent teal #0f766e. (Supersedes the pitch + featured cards idea.)
- 2026-10-12: Recruiter dark mode follows the OS (`prefers-color-scheme`); no extra toggle, so the pull-chain stays the only switch.

## Contracts
- `docs/contracts/content.md`
- `docs/contracts/themes.md`
- `docs/contracts/recruiter-style.md`

## Tasks
| # | Task | Owner | Files | Done when | Status |
|---|---|---|---|---|---|
| 1 | Extract content into `src/content/` | builder | `src/content/*`, `src/projectData.ts` (delete), components that import or hold content | content.md done-check | done (2c9160a) |
| 2 | Move creative UI into `src/themes/creative/` | builder | `src/*` → `src/themes/creative/` | themes.md step 2 check | done (940436d) |
| 3 | Theme registry, store, toggle, placeholder recruiter | builder | `src/core/*`, `src/themes/{types,index}.ts`, `src/themes/recruiter/*`, `App.tsx` | themes.md step 3 check | done (a394ff0) |
| 3b | Pull-chain light toggle (replaces nav tie); arrow always on; recruiter lamp on nav bar; amber/white bulbs | builder | `src/core/PullChainToggle.*`, theme Layouts | user signs off | done (1e9515c, 7a0209d, 2c12c2b) |
| 3c | Recruiter pages render all content (resume sections, project details, groups, contact); recruiter base styles stop creative CSS leak | builder | `src/themes/recruiter/**` | browser text diff: only decorative creative text missing | done (e4e4d5f) |
| 3d | Sticky nav + section tabs (scroll-spy, #hash links) on recruiter Resume/Projects; phone number updated | builder + Conductor | `src/themes/recruiter/**`, `src/content/profile.ts` | browser: click lands under bars, highlight follows scroll | done (fb8fb18, a96d46c) |
| 4a | Recruiter panel Home (About/Experience/Projects/Contact strip, tick ruler) + Geist/teal on all recruiter pages; pull-chain unchanged | builder | `src/themes/recruiter/**` | recruiter-style.md done-check | done (b210210) |
| 4b | Home: no nav bar (lamp floats top-right), bigger About headline + circle behind text, no lamp/hint overlap, no stray scroll, mobile circle fix | builder | `src/themes/recruiter/**` | recruiter-style.md 4b + browser check | done (ec86f42 + body-margin/mobile fix) |
| 4c | Recruiter Projects: card strip with pencil sketches → click animates cards into top row + detail panel; hash deep links; no nav bar | builder | `src/themes/recruiter/**` | recruiter-style.md 4c + browser check | done (c485a29 + lamp-clearance fix) |
| 4d | Detailed CV view at /resume?cv=detailed from cv-detailed.md + Detailed CV buttons | builder | `src/themes/recruiter/**` | recruiter-style.md 4d + browser check | done (8656b2c) |
| 4 | Design and build the recruiter style | Conductor + user, then builder | `src/themes/recruiter/*` | user signs off | todo |
