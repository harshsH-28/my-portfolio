# Minimal "Stark & Serif" Portfolio Redesign — Design Spec

**Date:** 2026-08-03
**Status:** Approved sections; pending final user review
**Reference designs:** Stitch project `2450155136191917159` ("Minimalist Developer Portfolio") — screens: Home - No Images, Home - Blog Style Minimal, Experience - No Images, Experience - Combined Minimal, Projects - No Images.

## 1. Goal

Replace the current CLI/terminal-aesthetic single-page portfolio with a minimalist, editorial, "chill" design based on the Stark & Serif Stitch mockups. Light and dark mode, both first-class. The old design's code is removed entirely — no dead code remains.

**Non-goals:** blog/journal content, footer, new backend features, analytics, CMS.

## 2. Decisions made (with user)

| Decision | Choice |
|---|---|
| Structure | Multi-page routes: `/`, `/experience`, `/projects`, `/achievements` |
| Accent color | None — pure monochrome |
| Home layout | Blend: hero intro + social links + small featured-projects list |
| AI chat | Kept, redesigned as a minimal dialog overlay ("ask" in nav) |
| Contact | No section, no footer — social links directly after the Home intro |
| Achievements | Own route: skills groups + dated achievements list |
| Default theme | System preference, toggle in nav |
| Execution | Clean rebuild on new tokens; delete all old components/tokens |

## 3. Design system

### 3.1 Color — pure monochrome, semantic tokens

Defined in the `@theme {}` block of `globals.css` (Tailwind v4). `.dark` overrides the CSS variables. All old terminal/cream/CRT tokens are deleted.

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#F9F9F9` | `#111111` | page background |
| `surface` | `#FFFFFF` | `#1A1A1A` | cards, dialog panel |
| `surface-2` | `#EEEEEE` | `#242424` | chips, code, badge pill |
| `ink` | `#1A1C1C` | `#F1F1F1` | headlines, primary text, links |
| `ink-muted` | `#444748` | `#A6A6A6` | body, secondary text |
| `ink-faint` | `#747878` | `#6E6E6E` | dates, mono labels, inactive nav |
| `hairline` | `#E2E2E2` | `#2A2A2A` | 1px borders, rules |

- No accent color. Links/active states are `ink` + underline; hover thickens the underline or shifts `ink-faint → ink`.
- No shadows anywhere. Depth = tonal layers (`paper` → `surface` → `surface-2`) + hairline borders.
- Hover motion limited to color shifts or a 2px translateY.

### 3.2 Typography — via `next/font/google`

| Font | Role | Specs |
|---|---|---|
| **Source Serif 4** | Headlines only | Display 48–56px / 700 / −0.02em; page titles ~40px; card titles 24–28px |
| **Inter** | All body text | 16–18px, line-height 1.6 |
| **JetBrains Mono** | Dates, section labels, chips, nav | 13–14px, +0.05em tracking, often uppercase, color `ink-faint` |

Removed: Space Mono, Material Symbols Outlined (no icon font; arrows/glyphs are plain text characters like `↗`, `●`, `▍`).

### 3.3 Shape & spacing

- Pills (9999px): nav container, badge, buttons, chips.
- Cards & dialog: 12px radius. Everything else: 4px.
- Base-4 spacing. Section gaps 96–128px desktop / 64px mobile.
- Reading column max ~720px; nav/grid max ~1100px.
- Whitespace is the primary design material — cut anything that doesn't earn its place.

### 3.4 Theme

`next-themes`, `attribute="class"`, `defaultTheme="system"`, `enableSystem`. Toggle in nav as a tiny mono text button (`[dark]` / `[light]`).

## 4. Pages

No footer on any page; pages end in whitespace.

### 4.1 Nav (shared)

Floating centered pill, sticky, backdrop-blur, hairline border. Lowercase JetBrains Mono links: `home · experience · projects · achievements`, plus `ask` (opens AskDialog) and the theme toggle. Active route = `ink`; others `ink-faint`.

### 4.2 `/` Home

1. Pill badge: `● Hi, I'm <name>.` (surface-2 bg)
2. Large serif headline — the one-liner from `portfolio-data.ts`
3. 2–3 line bio in `ink-muted`, trimmed to a chill, non-corporate tone
4. Social links row — quiet mono links from `socialLinks` data: `github ↗ · linkedin ↗ · email ↗` (+ any others in data)
5. Quiet link: "or just ask me →" (opens AskDialog)
6. Mono label `SELECTED` + 2–3 featured projects as minimal list rows (serif title, one-line description), linking to `/projects`
7. Closing line: "Want to build something together? **let's talk** →" (mailto)

### 4.3 `/experience`

Serif page title "Where I've been." + one intro line. Left-rail timeline: mono year range (`2021 — PRESENT`) beside a thin vertical hairline; per entry: serif role title, company in `ink-muted`, short description, tech chips. Résumé link at the end only if `portfolio-data.ts` exposes a résumé URL (plain underlined mono link, not a button); otherwise omitted.

### 4.4 `/projects`

"Selected work." + one intro line. Stacked full-width cards (`surface` bg, hairline border, 12px radius): serif title, description, tech chips, quiet mono links (`code ↗`, `live ↗`). Dark mode cards are `#1A1A1A` (not white-on-black as in the mockup — too loud).

### 4.5 `/achievements`

"Skills & achievements." Two groups:
- **Skills:** chip clusters under mono category labels (`LANGUAGES`, `TOOLS`, …)
- **Achievements:** dated editorial list rows — mono date, serif title, one-line description. No cards, no icons.

## 5. Architecture

```
src/app/
  layout.tsx              fonts, ThemeProvider, Nav, AskDialog mount
  page.tsx                Home
  experience/page.tsx
  projects/page.tsx
  achievements/page.tsx
  globals.css             new @theme tokens only
  api/chat/route.ts       UNCHANGED (Gemini streaming)
src/components/
  Nav.tsx  ThemeToggle.tsx  AskDialog.tsx
  ProjectCard.tsx  TimelineItem.tsx  Chip.tsx
  ThemeProvider.tsx       kept as-is
src/lib/
  portfolio-data.ts       extended: featured flags on projects + skills groups
  personal-context.ts     kept
  utils.ts                kept
```

**Deleted:** `Navigation.tsx`, `HeroSection.tsx`, `AskMeAnything.tsx`, `ExperienceSection.tsx`, `ProjectsSection.tsx`, `AchievementsSection.tsx`, `ContactSection.tsx`, `Footer.tsx`, `CRTOverlay.tsx`, their test files, all terminal/cream tokens and CRT styles, Space Mono font, Material Symbols import.

## 6. AskDialog (redesigned AI chat)

- Trigger: `ask` in nav + "or just ask me →" on Home.
- Native `<dialog>` element (free focus trap + Esc). Centered panel: `surface` bg, hairline border, 12px radius, max-width 640px. Backdrop: blurred `paper` scrim.
- One input line, mono placeholder `ask me anything…`, Enter submits. No send button, no avatars, no bubbles.
- Empty state: 2–3 suggestion chips (e.g. "what do you build?", "what's your stack?").
- Q&A rendered editorially: question in small serif italic, streamed answer as plain Inter paragraphs. Thin `▍` cursor while streaming.
- Wired to existing `useChat` (`@ai-sdk/react`) + `/api/chat`. Backend untouched.

## 7. Motion

Framer Motion, whisper-level only:
- Section entry: 8px fade-up, `whileInView` once, ~0.45s ease-out.
- List rows: ~60ms stagger.
- Dialog: fade + scale 0.98 → 1.
- `MotionConfig reducedMotion="user"`.
- Nothing else — no typing effects, no CRT, no decorative animation.

## 8. Data changes (`portfolio-data.ts`)

- Add `featured: boolean` (or a `featuredProjects` slice) for the Home list.
- Add `skills` groups: `{ category: string; items: string[] }[]`.
- Trim copy (bio, descriptions) to the chill tone; all content stays in this file — components hold no content.

## 9. Testing & done-criteria

- Keep Vitest + jsdom + Testing Library infra and `setup.ts` mocks (framer-motion proxy, next-themes, AI SDK).
- New tests: one per new component + a render test per page (nav links + active state, social links, timeline entries, project cards, dialog open/suggestions/submit).
- Done when `bun run build`, `bun run test:run`, and `bun run lint` are all green, and no orphaned files/tokens/imports from the old design remain.
