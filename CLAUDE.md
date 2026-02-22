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
bun run vitest run src/__tests__/HeroSection.test.tsx
```

> **Note:** `bun` is at `~/.bun/bin/bun` — add it to PATH or use the full path if the shell can't find it.

## Architecture

Single-page portfolio rendered as a static Next.js 15 App Router site. The entire page lives in `src/app/page.tsx`, which composes all sections in order. There is no routing beyond the root.

### Data layer
All content (bio, experience, projects, achievements, nav links, social links, AI chat intro) lives in **`src/lib/portfolio-data.ts`** as typed `as const` exports. To personalize the portfolio, edit only this file — no component changes needed.

### Theme system
- `next-themes` with `attribute="class"` and `defaultTheme="dark"` — adds `.dark` to `<html>`.
- Tailwind CSS v4 with `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`.
- All custom color tokens (`primary`, `terminal`, `cream`, etc.) and font/animation tokens are defined in the `@theme {}` block in `globals.css` — there is **no `tailwind.config.ts`**.
- Primary accent color: `#FF8225` → `text-primary` / `bg-primary`.

### Framer Motion usage
Components that animate on scroll use `motion.*` elements with `whileInView`. `HeroSection` uses named `Variants` objects (typed as `Variants` from framer-motion — required for v12 type compatibility). Other sections use inline `initial/whileInView/transition` props.

### Testing setup (`src/__tests__/`)
- **Vitest v3** + **jsdom** + **@testing-library/react**.
- Global setup in `setup.ts` mocks: `next-themes` (resolvedTheme always `"dark"`), `framer-motion` (Proxy-based mock so any `motion.TAG` renders as the plain HTML element), `next/navigation`.
- React 19 note: wrap `fireEvent` calls in `act(async () => {...})` due to batched state updates. `fireEvent.change` on `<textarea>` can be unreliable — test the DOM property directly if needed.
- `vitest.config.ts` is excluded from the Next.js build type-check; keep it that way.

### Icons
Material Symbols Outlined loaded via Google Fonts CSS import in `globals.css`. Used as `<span className="material-symbols-outlined">icon_name</span>`.
