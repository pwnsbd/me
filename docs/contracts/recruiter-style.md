# Contract: recruiter style (step 4a — panel Home + shared look)

## Inputs
- Content from `src/content` (`PROFILE`, resume data, `PROJECTS`). No content edits.
- Design reference: rauno.me — light-gray stage, row of white panels, small label above each panel, tick ruler on top.

## Outputs
1. **Shared look (all recruiter pages):** font Geist 400/500 (Google Fonts, loaded from recruiter CSS only), accent teal `#0f766e` for links, active tab, and accents. Text `#111`. The nav bar keeps its items and the `PullChainToggle` exactly as it is now (same props, same place).
2. **Home = horizontal panel strip** on a `#ececea` stage below the nav bar:
   - Tick ruler centred above the strip: one tick per panel; the current panel's tick is a small outlined box. Clicking a tick scrolls to that panel.
   - Four panels, in order, each with a small grey label above a white box:
     1. **About me**: big stacked headline (name, then "software engineer / building games, AR/VR and AI tools" style lines from `PROFILE`), teal circle partly behind the text, `PROFILE.role` small at the bottom.
     2. **Experience**: one row per job from the resume data (title left, dates right, org below in grey). Footer links: "Full résumé →" (Resume route) and "Download PDF ↓" if a PDF path exists in content (omit if none).
     3. **Projects**: rows for RayForge, Words, Buddhi, FroggerAR, Nakshatra (title left, `tag` right), each linking to that project's detail (or the Projects page if there's no detail route). Footer: "All projects →".
     4. **Contact**: "Say hi." headline, then email, phone, GitHub, LinkedIn from `PROFILE`.
   - Vertical mouse wheel over the strip scrolls it sideways; at either end the page scrolls normally. Scroll-snap to panels. Drag/trackpad horizontal scroll works.
   - Panels fill the viewport height sensibly on desktop (roughly 60–70vh tall, ~min(560px, 80vw) wide).
   - **≤ 600px wide:** panels stack vertically, full width, no horizontal scroll, ruler hidden.
3. Resume, Projects, Writing pages keep their structure and section tabs; they only pick up the shared font and accent.

## 4b polish (2026-10-12)
- Home has **no nav bar**: the panels are the navigation. The `PullChainToggle` still renders on Home (same fixture/hint/label/colors) but floats top-right of the viewport instead of sitting in a bar. Resume/Projects/Writing keep the bar unchanged.
- Stage fills exactly the viewport on desktop (no stray vertical scroll); panels start low enough that the lamp and its "creative view" hint never overlap panel content.
- About me: headline ~40–44px; teal circle sits partly behind the headline text (text stays readable: white or dark text has enough contrast where it overlaps — or circle sits behind the lower-right of the text block only).
- ≤600px: circle shrinks/moves to a corner so it never covers text; lamp doesn't cover the first panel's headline.

## 4c Projects page: card strip → detail view (2026-10-12)
- Route ROUTES.projects in recruiter view. **No nav bar** (same as Home): lamp hangs from top (hangingFixture, --lamp-top), plus a small "← Pawan Subedi" home link top-left.
- **Strip state** (no project selected): same stage/ruler/strip look as Home; one card per project in PROJECTS order. Card = white box with the project's pencil sketch (`ProjectSketch` from `src/themes/creative/components/ProjectSketches.tsx`, kind = `p.sketch`) filling the upper part, then title and `tag` below. Small grey group label (GROUPS label) above each card.
- **Click a card** → detail state: all cards animate (FLIP: measure before/after, transform+opacity, ~450ms ease-out) into a row of small cards along the top (sketch thumbnail + title, horizontally scrollable if it overflows); the selected small card is larger/highlighted (teal outline) like the user's sketch. A big white detail panel rises below (translateY ~40px→0 + fade). Detail shows: title, tag · status, description, Problem, Vision, Stack, GitHub/Live links when present, and the sketch large on the right (desktop).
- Clicking another small card switches the detail (panel content fades/slides, row stays). Clicking the selected small card again, pressing Esc, or a "× close" button returns to the strip (reverse animation).
- URL: selected project in hash, slug = title lowercased, non-alphanumerics → "-" (e.g. `#froggerar`, `#color-picker`). Loading `/projects#rayforge` opens straight into detail state (no animation). Back/forward follows the hash.
- Home Projects panel rows link to `/projects#<slug>`.
- prefers-reduced-motion: no movement, instant swap. Any state change gated on an animation has a setTimeout fallback (rAF/transitionend may stall).
- ≤600px: strip cards stack vertically; detail state = small-card row scrolls sideways at top, detail panel full width, sketch above text.

## 4d Detailed CV view (2026-10-12)
- Source: `src/content/cv-detailed.md` (user's own text; render it faithfully, never rewrite). Import with Vite `?raw`.
- Rendered by a small in-repo markdown renderer → React elements (no `dangerouslySetInnerHTML`, no new deps). Subset: `#`/`##`/`###` headings, paragraphs, `**bold**`, `*italic*`, `[text](url)` (external links open in new tab), `- ` lists, pipe tables, `---` rules, trailing-two-space line breaks.
- Route: `/resume?cv=detailed` (recruiter Resume page switches view; no new route, no core changes). Same bare layout as Resume: back link, hanging lamp without hint, Geist/teal, sticky SectionTabs built from the `##` headings (ids = slug of heading).
- Buttons: on the short Resume, a "Detailed CV" button next to the contact links (teal outline button). On the detailed view, a "Short CV" button in the same spot. Home Experience panel footer gets a third link "Detailed CV →".
- Done-check: every `##` section of the md appears, tables render as tables, links work, tabs scroll-spy works, ≤600px no horizontal scroll (tables may scroll inside their own wrapper).

## Errors / edge cases
- Fonts fail to load → falls back to system-ui; layout must not break.
- A listed project title missing from `PROJECTS` → skip that row silently.

## Perf budget
- No new npm dependencies. No GSAP/three on recruiter pages. Wheel handler is passive except when actually redirecting the scroll.

## Out of scope
- Creative theme (must stay pixel-identical), `src/core/*` (incl. PullChainToggle), content files, dark mode (later task), the full Resume/Projects page redesign.

## Done-check
- `npm run build` and `npm run lint` pass.
- Browser at `/?view=recruiter`: four panels in order, ruler tracks the current panel, wheel scrolls sideways, pull-chain lamp still in the nav bar and switches to creative.
- At 375px wide: panels stack, no horizontal page scroll.
- `git diff --stat` touches only `src/themes/recruiter/**`.
