# Minimal "Stark & Serif" Portfolio Redesign — Design Spec

**Date:** 2026-08-03 (revised 2026-08-17)
**Status:** Approved sections; pending final user review
**Reference designs:** Stitch project `2450155136191917159` ("Minimalist Developer Portfolio") — screens: Home - No Images, Home - Blog Style Minimal, Experience - No Images, Experience - Combined Minimal, Projects - No Images. The Home page follows **Home - Blog Style Minimal** exactly (layout, spacing, alignment).

## 1. Goal

Replace the current CLI/terminal-aesthetic single-page portfolio with a minimalist, editorial, "chill" design based on the Stark & Serif Stitch mockups. Light and dark mode, both first-class. The old design's code is removed entirely — no dead code remains.

**Non-goals (this spec):** analytics, comments, full blog rendering (long-form posts), CMS beyond the Drops studio described in §10.

## 2. Decisions made (with user)

| Decision | Choice |
|---|---|
| Structure | Multi-page routes: `/`, `/experience`, `/projects`, `/achievements` |
| Accent color | None — pure monochrome |
| Home layout | Imitates the "Home - Blog Style Minimal" mockup: serif greeting heading, bio, social links, Drops feed, "let's talk" closing line |
| Nav | Plain text links, no pill/border/background; active link underlined; small vertical divider before `ask` + theme toggle |
| Feed section | Named **DROPS** — flexible highlight feed (projects now; blog notes, X/LinkedIn posts, releases later) |
| Feed publishing | Mini-admin: hidden passcode-protected `/studio` route + hosted DB (phase 2 — separate implementation plan) |
| AI chat | Kept, redesigned as a minimal dialog overlay ("ask" in nav) |
| Contact | No section, no footer — social links after the Home intro + closing "let's talk" line |
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
| `surface-2` | `#EEEEEE` | `#242424` | chips, code |
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
| **Source Serif 4** | Headlines only | Greeting/display 40–48px / 700 / −0.02em; page titles ~40px; item titles 20–28px / 600 |
| **Inter** | All body text | 16–18px, line-height 1.6, always left-aligned (never justified) |
| **JetBrains Mono** | Dates, section labels, chips, nav | 13–14px, +0.05em tracking, often uppercase, color `ink-faint` |

Removed: Space Mono, Material Symbols Outlined (no icon font; arrows/glyphs are plain text characters like `↗`, `●`, `▍`).

### 3.3 Shape & spacing

- Pills (9999px): chips and suggestion chips only. The nav is plain text — no container shape.
- Cards & dialog: 12px radius. Everything else: 4px.
- Base-4 spacing. Spacing imitates the Home mockup: generous top padding (~96px+), large gaps between content groups, content well clear of screen edges.
- Reading column ≈ 580–640px on Home (as in the mockup), ~720px on other pages; centered on the page, text left-aligned.
- Whitespace is the primary design material — cut anything that doesn't earn its place.

### 3.4 Theme

`next-themes`, `attribute="class"`, `defaultTheme="system"`, `enableSystem`. Toggle in nav as a tiny mono text button (`[dark]` / `[light]`).

## 4. Pages

No footer on any page; pages end in whitespace.

### 4.1 Nav (shared, imitates the mockup)

Centered row of plain lowercase JetBrains Mono text links — **no pill, no border, no background, no lines**; it blends into the page. Active route = `ink` with an underline (underline-offset ~6px); inactive = `ink-faint`. After the page links, a small sleek vertical hairline divider, then `ask` (opens AskDialog) and the theme toggle:

```
home   experience   projects   achievements   │   ask   [dark]
```

Sticky at top with a touch of backdrop blur so content scrolls under it quietly.

### 4.2 `/` Home — imitates "Home - Blog Style Minimal" exactly

Layout, spacing, alignment, and centering follow the mockup. Content, top to bottom:

1. Serif greeting as the page's H1 (no badge pill): **"Hi, I'm Harsh."**
2. Bio paragraph in `ink-muted` — 3–4 calm lines, trimmed to a chill, non-corporate tone. Left-aligned, ragged right.
3. Social links row — quiet mono links in the same style: `github ↗ · linkedin ↗ · x ↗ · email ↗` (from `socialLinks` data)
4. Large gap, then mono label **`DROPS`** + the feed (§4.6): dated list rows — mono date, serif title, one-line description in `ink-muted`.
5. Hairline rule.
6. Closing line, exactly in the mockup's manner: "Interested in working together or just want to say hi? **let's talk**." (mailto link)

### 4.3 `/experience`

Serif page title "Where I've been." + one intro line. Left-rail timeline: mono year range (`2021 — PRESENT`) beside a thin vertical hairline; per entry: serif role title, company in `ink-muted`, short description, tech chips. Résumé link at the end only if `portfolio-data.ts` exposes a résumé URL (plain underlined mono link, not a button); otherwise omitted.

### 4.4 `/projects`

"Selected work." + one intro line. Stacked full-width cards (`surface` bg, hairline border, 12px radius): serif title, description, tech chips, quiet mono links (`code ↗`, `live ↗`). Dark mode cards are `#1A1A1A` (not white-on-black as in the mockup — too loud).

### 4.5 `/achievements`

"Skills & achievements." Two groups:
- **Skills:** chip clusters under mono category labels (`LANGUAGES`, `TOOLS`, …)
- **Achievements:** dated editorial list rows — mono date, serif title, one-line description. No cards, no icons.

### 4.6 Drops — the flexible feed

A drop is anything worth highlighting: a project, a blog-style note, an X/LinkedIn post link, a release. Shape:

```ts
type Drop = {
  id: string;
  date: string;        // ISO date, rendered as "Oct 24, 2026"
  title: string;       // serif
  description?: string; // one-liner, ink-muted
  href?: string;        // optional external/internal link (↗ when external)
  kind: "project" | "note" | "post" | "release";
};
```

- Home shows the latest 3–4; if more exist, a quiet mono "more ↓" reveals further drops (simple client-side pagination — no separate page for now).
- Rendering is identical regardless of `kind`; `kind` exists for future filtering and the studio form.
- **v1 (this redesign):** drops come from a `drops` array in `portfolio-data.ts`, seeded with the top 2 projects. The feed component reads through a single `getDrops()` accessor so swapping the source later touches one function.
- **v2 (phase 2, §10):** `getDrops()` reads from the hosted DB instead.

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
  DropsFeed.tsx  ProjectCard.tsx  TimelineItem.tsx  Chip.tsx
  ThemeProvider.tsx       kept as-is
src/lib/
  portfolio-data.ts       extended: drops array + skills groups
  drops.ts                Drop type + getDrops() accessor
  personal-context.ts     kept
  utils.ts                kept
```

**Deleted:** `Navigation.tsx`, `HeroSection.tsx`, `AskMeAnything.tsx`, `ExperienceSection.tsx`, `ProjectsSection.tsx`, `AchievementsSection.tsx`, `ContactSection.tsx`, `Footer.tsx`, `CRTOverlay.tsx`, their test files, all terminal/cream tokens and CRT styles, Space Mono font, Material Symbols import.

## 6. AskDialog (redesigned AI chat)

- Trigger: `ask` in nav.
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

- Add `drops` array (see §4.6), seeded with the top 2 projects.
- Add `skills` groups: `{ category: string; items: string[] }[]`.
- Trim copy (bio, descriptions) to the chill tone; all content stays in this file — components hold no content.

## 9. Testing & done-criteria

- Keep Vitest + jsdom + Testing Library infra and `setup.ts` mocks (framer-motion proxy, next-themes, AI SDK).
- New tests: one per new component + a render test per page (nav links + active state + divider, social links, drops rows, timeline entries, project cards, dialog open/suggestions/submit).
- Done when `bun run build`, `bun run test:run`, and `bun run lint` are all green, and no orphaned files/tokens/imports from the old design remain.

## 10. Phase 2 — the Drops studio (separate implementation plan)

Publishing drops without touching code. Designed here so the redesign accommodates it; built after the redesign ships, under its own plan.

- **`/studio`** — hidden route, not linked anywhere. Gate: a single passcode compared against an env secret (`STUDIO_SECRET`), stored in an httpOnly cookie after entry. One owner, no user accounts.
- **UI** — same design system: one quiet form (kind, date, title, one-liner, optional link), a publish action, and a list of existing drops with delete. Nothing else.
- **Storage** — a **SQLite file (Drizzle)** on a Docker volume; the site is self-hosted on the user's VPS behind Caddy (decided 2026-08-17 — no hosted DB: Supabase free pauses after inactivity, and serverless-only stores aren't needed on a persistent server). Single `drops` table mirroring the `Drop` type.
- **API** — `GET /api/drops` (public, cached/revalidated) and `POST`/`DELETE /api/drops` (passcode-gated). `getDrops()` switches from the data file to this source and becomes a server-side read — the Home page fetches drops and passes them to `DropsFeed` as props (it currently calls `getDrops()` synchronously from the client component).
- **Out of scope for phase 2:** editing, images, drafts, markdown rendering — add only when actually needed.
