# Stark & Serif — Developer Portfolio

A monochrome, multi-page developer portfolio built with Next.js. Features dark/light theming, scroll animations, and an AI-powered chat that answers questions about the developer.

## Features

- **Stark & Serif aesthetic** — monochrome tokens, serif headlines, plain-text nav
- **Dark + light mode** — toggle via `next-themes`, defaults to system preference
- **AI chat** — "Ask Me Anything" dialog powered by Google Gemini 2.0 Flash via Vercel AI SDK
- **Scroll animations** — Framer Motion `whileInView` transitions throughout
- **Single data file** — all content lives in `src/lib/portfolio-data.ts`

The `/api/chat` route streams responses server-side, so this needs a server or serverless host (e.g. Vercel) — it isn't static-exportable.

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + custom tokens |
| Animations | Framer Motion v12 |
| Theming | next-themes |
| AI | Vercel AI SDK v6 + `@ai-sdk/google` (Gemini 2.0 Flash) |
| Linting | Biome |
| Testing | Vitest v3 + Testing Library + jsdom |
| Package manager | bun |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
bun dev              # start dev server
bun run build        # production build (tsc + Next.js)
bun run start        # serve production build
bun run lint         # biome check
bun run format       # biome format --write
bun run test         # vitest watch mode
bun run test:run     # run all tests once
bun run test:coverage  # generate coverage report
```

Run a single test file:

```bash
bun run vitest run src/__tests__/Nav.test.tsx
```

> `bun` is at `~/.bun/bin/bun`. Add it to your PATH or use the full path if the shell cannot find it.

## Personalization

**All content is in one file: `src/lib/portfolio-data.ts`**

Edit the following exports to make it yours:

| Export | What it controls |
|--------|-----------------|
| `SITE_CONFIG` | Page `<title>` and meta description |
| `GREETING` / `BIO` | Home page headline and intro paragraph |
| `CONTACT_EMAIL` | Email used in the contact/social links |
| `NAV_LINKS` | Navigation items |
| `SOCIAL_LINKS` | GitHub / LinkedIn / X / email links |
| `EXPERIENCES` | Work history timeline |
| `PROJECTS` | Project showcase cards |
| `SKILLS` | Skill categories on the achievements page |
| `ACHIEVEMENTS` | Awards, certifications, talks |
| `DROPS` | Home page Drops feed (projects, notes, posts, releases) |
| `ASK_SUGGESTIONS` | Suggestion chips in the AI chat dialog |
| `RESUME_URL` | Optional resume link (`null` hides it) |

For the AI chat, update **`src/lib/personal-context.ts`** with your real resume/bio data. This becomes the system prompt sent to Gemini.

For the API route, set your Google AI API key:

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
```

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts   # Gemini streaming endpoint
│   ├── achievements/page.tsx
│   ├── experience/page.tsx
│   ├── projects/page.tsx
│   ├── globals.css         # Tailwind theme tokens
│   ├── layout.tsx
│   └── page.tsx            # Home page — greeting, bio, Drops feed
├── components/
│   ├── Nav.tsx              # Shared nav, owns AskDialog open state
│   ├── ThemeToggle.tsx
│   ├── AskDialog.tsx        # AI chat, native <dialog>
│   ├── DropsFeed.tsx
│   ├── ProjectCard.tsx
│   ├── TimelineItem.tsx
│   ├── Chip.tsx
│   ├── Reveal.tsx           # Scroll-in wrapper
│   └── ThemeProvider.tsx
├── lib/
│   ├── portfolio-data.ts   # All content — edit this to personalize
│   ├── drops.ts            # getDrops() accessor for the Drops feed
│   ├── personal-context.ts # AI system prompt
│   └── utils.ts            # cn() helper
└── __tests__/              # Vitest test files
```

## Design Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `paper` | `#F9F9F9` | `#111111` | Page background |
| `surface` | `#FFFFFF` | `#1A1A1A` | Card background |
| `surface-2` | `#EEEEEE` | `#242424` | Chip/pill background |
| `ink` | `#1A1C1C` | `#F1F1F1` | Primary text |
| `ink-muted` | `#444748` | `#A6A6A6` | Secondary text |
| `ink-faint` | `#747878` | `#6E6E6E` | Labels, timestamps |
| `hairline` | `#E2E2E2` | `#2A2A2A` | Borders/dividers |

No accent color, no shadows. Fonts: **Source Serif 4** (headlines) + **Inter** (body) + **JetBrains Mono** (labels/microcopy), all via `next/font`.

## License

MIT
