# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev            # start dev server
bun run build      # production build (runs tsc + Next.js)
bun run test:run   # run all tests once
bun run test       # run tests in watch mode
bun run test:coverage  # generate coverage report
bun run lint       # biome check (linter)
bun run format     # biome format --write (formatter)
```

Run a single test file:
```bash
bun run vitest run src/__tests__/Nav.test.tsx
```

> **Note:** `bun` is at `~/.bun/bin/bun` — add it to PATH or use the full path if the shell can't find it.

## Architecture

Multi-page static-ish Next.js App Router site with the "Stark & Serif" monochrome design.
Routes: `/` (greeting, bio, social links, Drops feed), `/experience`, `/projects`, `/achievements`.
`src/components/Nav.tsx` renders the shared plain-text nav and owns the AskDialog (AI chat) state.

### Data layer
All content lives in `src/lib/portfolio-data.ts`. The Drops feed reads through
`getDrops()` in `src/lib/drops.ts` — phase 2 will swap that accessor to a database
without touching components.

### Theme system
- `next-themes` with `attribute="class"` and `defaultTheme="system"`.
- Monochrome semantic tokens (`paper`, `surface`, `surface-2`, `ink`, `ink-muted`,
  `ink-faint`, `hairline`) defined as CSS vars in `globals.css`, flipped by `.dark`,
  and exposed to Tailwind v4 via `@theme inline`. No accent color, no shadows.
- Fonts: Source Serif 4 (headlines), Inter (body), JetBrains Mono (labels) via `next/font`.

### Framer Motion usage
Motion is whisper-level: the `Reveal` wrapper and ad-hoc `motion.*` elements use `whileInView` for an 8px fade-up, and `layout.tsx` sets `MotionConfig reducedMotion="user"` globally.

### Testing setup (`src/__tests__/`)
- **Vitest v3** + **jsdom** + **@testing-library/react**.
- Global setup in `setup.ts` mocks: `next-themes` (resolvedTheme always `"dark"`), `framer-motion` (Proxy-based mock so any `motion.TAG` renders as the plain HTML element), `next/navigation`.
- React 19 note: wrap `fireEvent` calls in `act(async () => {...})` due to batched state updates. `fireEvent.change` on `<textarea>` can be unreliable — test the DOM property directly if needed.
- `vitest.config.ts` is excluded from the Next.js build type-check; keep it that way.
