# Stark & Serif — Developer Portfolio

A monochrome, multi-page developer portfolio built with Next.js 15. Features dark/light theming, scroll animations, and an AI-powered chat that answers questions about the developer.

## Features

- **Stark & Serif aesthetic** — monochrome tokens, serif headlines, plain-text nav
- **Dark + light mode** — toggle via `next-themes`, defaults to dark
- **AI chat** — "Ask Me Anything" section powered by Google Gemini 2.0 Flash via Vercel AI SDK
- **Scroll animations** — Framer Motion `whileInView` transitions throughout
- **Static export ready** — no server required after build
- **Single data file** — all content lives in `src/lib/portfolio-data.ts`

## Tech Stack

| Layer | Library |
|-------|---------|
| Framework | Next.js 15 (App Router) |
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
bun run vitest run src/__tests__/HeroSection.test.tsx
```

> `bun` is at `~/.bun/bin/bun`. Add it to your PATH or use the full path if the shell cannot find it.

## Personalization

**All content is in one file: `src/lib/portfolio-data.ts`**

Edit the following exports to make it yours:

| Export | What it controls |
|--------|-----------------|
| `SITE_CONFIG` | Page title, tagline, version string |
| `NAV_LINKS` | Navigation items |
| `EXPERIENCES` | Work history cards |
| `STATS` | Summary numbers (projects, users, etc.) |
| `PROJECTS` | Project showcase cards |
| `ACHIEVEMENTS` | Awards, certifications, talks |
| `SOCIAL_LINKS` | LinkedIn / GitHub / Twitter URLs |
| `AI_CHAT_INTRO` | Seed messages shown in the chat widget |

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
│   ├── globals.css         # Tailwind theme tokens, CRT styles
│   ├── layout.tsx
│   └── page.tsx            # Root page — composes all sections
├── components/
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   ├── AskMeAnything.tsx   # AI chat widget
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   ├── AchievementsSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── CRTOverlay.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── portfolio-data.ts   # All content — edit this to personalize
│   ├── personal-context.ts # AI system prompt
│   └── utils.ts            # cn() helper
└── __tests__/              # Vitest test files
```

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#FF8225` | Orange accent |
| `terminal` | `#1A1A1A` | Dark background |
| `terminal-surface` | `#282828` | Dark card background |
| `cream` | `#F5F5DC` | Light background |
| `cream-surface` | `#E8E8D0` | Light card background |

Fonts: **Space Mono** (headings/code) + **Inter** (body). Icons via Material Symbols Outlined (Google Fonts).

## License

MIT
