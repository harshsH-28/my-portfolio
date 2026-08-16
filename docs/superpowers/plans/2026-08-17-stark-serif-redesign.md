# Stark & Serif Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the CLI/terminal portfolio with the approved monochrome "Stark & Serif" editorial design: 4 routes, plain-text nav, Drops feed on home, AI chat as a native dialog, light+dark via system preference, zero old design code left.

**Architecture:** Clean rebuild. Demolish old UI first (keeping data/API/test infra), then rebuild bottom-up: tokens → data → primitives → dialog/nav → pages → layout. Every task ends green (`build` + `test:run`). Spec: `docs/superpowers/specs/2026-08-03-minimal-redesign-design.md`.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS v4 (`@theme` in `globals.css`, no config file), next-themes, Framer Motion 12, Vitest 3 + jsdom + Testing Library, AI SDK v6 (`useChat`), Biome. Package manager: **bun** (binary at `~/.bun/bin/bun`; use the full path if `bun` isn't on PATH).

## Global Constraints

- Color tokens (light / dark): `paper #F9F9F9/#111111`, `surface #FFFFFF/#1A1A1A`, `surface-2 #EEEEEE/#242424`, `ink #1A1C1C/#F1F1F1`, `ink-muted #444748/#A6A6A6`, `ink-faint #747878/#6E6E6E`, `hairline #E2E2E2/#2A2A2A`. **No other colors. No shadows.**
- Fonts: Source Serif 4 (headlines only), Inter (body), JetBrains Mono (labels/dates/chips/nav). No Space Mono, no Material Symbols, no icon fonts — glyphs are text characters (`↗ ● ▍ │`).
- Nav: plain text, no pill/border/background; active link underlined (`underline-offset` ≈ 6px); one vertical hairline divider before `ask` + theme toggle.
- Copy is lowercase-chill in mono contexts (`home`, `ask`, `[dark]`, `more ↓`, `let's talk`); serif headings use sentence case with a period ("Where I've been.").
- Theme: `next-themes` `attribute="class"`, `defaultTheme="system"`, `enableSystem`.
- Motion: 8px fade-up entries (~0.45s, once), ~60ms stagger, `MotionConfig reducedMotion="user"`. Nothing decorative.
- Body text always left-aligned; never `text-justify`.
- Every task ends with `~/.bun/bin/bun run test:run` and (where stated) `~/.bun/bin/bun run build` green before commit.
- The chat backend (`src/app/api/chat/route.ts`, `src/lib/personal-context.ts`) is **never modified**.
- Placeholder user data (`href: "#"`, `you@example.com`) is intentional — the user personalizes `portfolio-data.ts` later.

---

### Task 1: Demolish the old UI

Remove every old-design component and its tests, and stub the home page. The site is intentionally bare after this task; the build and remaining tests (utils) must stay green.

**Files:**
- Delete: `src/components/Navigation.tsx`, `src/components/HeroSection.tsx`, `src/components/AskMeAnything.tsx`, `src/components/ExperienceSection.tsx`, `src/components/ProjectsSection.tsx`, `src/components/AchievementsSection.tsx`, `src/components/ContactSection.tsx`, `src/components/Footer.tsx`, `src/components/CRTOverlay.tsx`
- Delete: `src/__tests__/Navigation.test.tsx`, `src/__tests__/HeroSection.test.tsx`, `src/__tests__/AskMeAnything.test.tsx`, `src/__tests__/ExperienceSection.test.tsx`, `src/__tests__/ProjectsSection.test.tsx`, `src/__tests__/AchievementsSection.test.tsx`, `src/__tests__/ContactSection.test.tsx`
- Modify: `src/app/page.tsx` (replace entirely)

**Interfaces:**
- Consumes: nothing.
- Produces: a bare `src/app/page.tsx` default export `HomePage` (replaced again in Task 7). `src/components/ThemeProvider.tsx`, `src/lib/*`, `src/app/api/chat/*`, `src/__tests__/setup.ts`, `src/__tests__/utils.test.ts` all remain.

- [ ] **Step 1: Delete old components and tests**

```bash
git rm src/components/Navigation.tsx src/components/HeroSection.tsx src/components/AskMeAnything.tsx \
  src/components/ExperienceSection.tsx src/components/ProjectsSection.tsx src/components/AchievementsSection.tsx \
  src/components/ContactSection.tsx src/components/Footer.tsx src/components/CRTOverlay.tsx \
  src/__tests__/Navigation.test.tsx src/__tests__/HeroSection.test.tsx src/__tests__/AskMeAnything.test.tsx \
  src/__tests__/ExperienceSection.test.tsx src/__tests__/ProjectsSection.test.tsx \
  src/__tests__/AchievementsSection.test.tsx src/__tests__/ContactSection.test.tsx
```

- [ ] **Step 2: Replace `src/app/page.tsx` entirely**

```tsx
export default function HomePage() {
  return <main />;
}
```

- [ ] **Step 3: Verify tests and build pass**

Run: `~/.bun/bin/bun run test:run`
Expected: PASS (only `utils.test.ts` remains).

Run: `~/.bun/bin/bun run build`
Expected: compiles with no missing-import errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "refactor: remove terminal-era UI components ahead of redesign"
```

---

### Task 2: New design tokens and fonts

Rewrite `globals.css` with the monochrome token system and swap fonts in `layout.tsx`. No unit tests for CSS — verification is the build plus a token grep.

**Files:**
- Modify: `src/app/globals.css` (replace entirely)
- Modify: `src/app/layout.tsx` (replace entirely)

**Interfaces:**
- Consumes: nothing.
- Produces: Tailwind utilities used by every later task: colors `bg-paper`, `bg-surface`, `bg-surface-2`, `text-ink`, `text-ink-muted`, `text-ink-faint`, `border-hairline`, `bg-hairline`, `decoration-ink-faint`, `decoration-ink`; fonts `font-serif`, `font-body`, `font-mono`; animation `animate-blink`. CSS variables `--font-source-serif`, `--font-inter`, `--font-jetbrains-mono` set by `next/font`.

- [ ] **Step 1: Replace `src/app/globals.css` entirely**

```css
/* Tailwind CSS v4 */
@import "tailwindcss";

/* Class-based dark mode — compatible with next-themes (.dark on <html>) */
@custom-variant dark (&:where(.dark, .dark *));

/* ─── Stark & Serif tokens — semantic, flip with theme ───────────────── */
:root {
  --paper: #F9F9F9;
  --surface: #FFFFFF;
  --surface-2: #EEEEEE;
  --ink: #1A1C1C;
  --ink-muted: #444748;
  --ink-faint: #747878;
  --hairline: #E2E2E2;
}

.dark {
  --paper: #111111;
  --surface: #1A1A1A;
  --surface-2: #242424;
  --ink: #F1F1F1;
  --ink-muted: #A6A6A6;
  --ink-faint: #6E6E6E;
  --hairline: #2A2A2A;
}

@theme inline {
  --color-paper: var(--paper);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-ink: var(--ink);
  --color-ink-muted: var(--ink-muted);
  --color-ink-faint: var(--ink-faint);
  --color-hairline: var(--hairline);

  --font-serif: var(--font-source-serif), Georgia, serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  --animate-blink: blink 1.1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

/* ─── Base ────────────────────────────────────────────────────────────── */
@layer base {
  body {
    @apply bg-paper font-body text-ink-muted antialiased transition-colors duration-300;
  }

  ::selection {
    @apply bg-ink text-paper;
  }
}
```

- [ ] **Step 2: Replace `src/app/layout.tsx` entirely**

(Nav and MotionConfig are mounted later, in Task 11 — this version only swaps fonts, theme default, and metadata source.)

```tsx
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/portfolio-data";

/* ─── Fonts ─────────────────────────────────────────────────────────── */
const sourceSerif = Source_Serif_4({
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/* ─── Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

/* ─── Root Layout ────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceSerif.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify no old-token references survive**

Run: `grep -rnE "terminal|cream|crt|Space_Mono|space-mono|material-symbols|Material Symbols|FF8225" src/ --include="*.tsx" --include="*.ts" --include="*.css"`
Expected: no matches (comments included). If any appear, remove them.

- [ ] **Step 4: Verify build and tests**

Run: `~/.bun/bin/bun run build && ~/.bun/bin/bun run test:run`
Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add Stark & Serif monochrome tokens and editorial fonts"
```

---

### Task 3: Data layer — drops accessor and rewritten portfolio data

`drops.ts` holds the `Drop` type and accessors (TDD). `portfolio-data.ts` is rewritten to the new shape with chill copy. `setup.ts` mocks are updated for the new world.

**Files:**
- Create: `src/lib/drops.ts`
- Test: `src/__tests__/drops.test.ts`
- Modify: `src/lib/portfolio-data.ts` (replace entirely)
- Modify: `src/__tests__/setup.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `src/lib/drops.ts`: `type DropKind = "project" | "note" | "post" | "release"`; `type Drop = { id: string; date: string; title: string; description?: string; href?: string; kind: DropKind }`; `getDrops(): readonly Drop[]` (sorted newest-first); `formatDropDate(iso: string): string` (e.g. `"Jul 12, 2026"`).
  - `src/lib/portfolio-data.ts` exports: `SITE_CONFIG { title, description }`, `GREETING: string`, `BIO: string`, `CONTACT_EMAIL: string`, `NAV_LINKS: readonly { label; href }[]`, `SOCIAL_LINKS: readonly { label; href }[]`, `EXPERIENCES: readonly { id; period; title; company; description; tags: readonly string[] }[]`, `PROJECTS: readonly { id; title; description; tags: readonly string[]; repo: string | null; live: string | null }[]`, `SKILLS: readonly { category: string; items: readonly string[] }[]`, `ACHIEVEMENTS: readonly { id; year; title; description }[]`, `DROPS: readonly Drop[]`, `ASK_SUGGESTIONS: readonly string[]`, `RESUME_URL: string | null`.

- [ ] **Step 1: Write the failing test `src/__tests__/drops.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { formatDropDate, getDrops } from "@/lib/drops";

describe("getDrops", () => {
  it("returns drops sorted newest-first", () => {
    const drops = getDrops();
    expect(drops.length).toBeGreaterThanOrEqual(2);
    const dates = drops.map((d) => d.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it("every drop has id, title, kind, and an ISO date", () => {
    for (const drop of getDrops()) {
      expect(drop.id).toBeTruthy();
      expect(drop.title).toBeTruthy();
      expect(["project", "note", "post", "release"]).toContain(drop.kind);
      expect(drop.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("formatDropDate", () => {
  it("formats an ISO date as 'Mon DD, YYYY'", () => {
    expect(formatDropDate("2026-07-12")).toBe("Jul 12, 2026");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `~/.bun/bin/bun run vitest run src/__tests__/drops.test.ts`
Expected: FAIL — cannot resolve `@/lib/drops`.

- [ ] **Step 3: Create `src/lib/drops.ts`**

```ts
import { DROPS } from "@/lib/portfolio-data";

export type DropKind = "project" | "note" | "post" | "release";

export type Drop = {
  id: string;
  /** ISO date, e.g. "2026-07-12" */
  date: string;
  title: string;
  description?: string;
  href?: string;
  kind: DropKind;
};

/**
 * Single accessor for the Drops feed. Phase 2 (the /studio + DB plan)
 * swaps this implementation for a database read — callers never change.
 */
export function getDrops(): readonly Drop[] {
  return [...DROPS].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDropDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
```

- [ ] **Step 4: Replace `src/lib/portfolio-data.ts` entirely**

(The `#`/`you@example.com` values are deliberate placeholders for the user to personalize.)

```ts
import type { Drop } from "@/lib/drops";

/**
 * Portfolio data — update this file to personalize your portfolio.
 * All site content lives here; components hold no content.
 */

export const SITE_CONFIG = {
  title: "Harsh — software engineer",
  description:
    "I build immersive web things, powered by AI. Focused on clarity and craft.",
} as const;

export const GREETING = "Hi, I'm Harsh.";

export const BIO =
  "I build immersive web things, powered by AI. An engineer focused on clarity and craft — tools that respect your attention and scale quietly behind the scenes.";

/** Update with your real email. */
export const CONTACT_EMAIL = "you@example.com";

export const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "experience", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "achievements", href: "/achievements" },
] as const;

export const SOCIAL_LINKS = [
  { label: "github", href: "#" },
  { label: "linkedin", href: "#" },
  { label: "twitter", href: "#" },
  { label: "email", href: "mailto:you@example.com" },
] as const;

export const EXPERIENCES = [
  {
    id: "exp-1",
    period: "2021 — Present",
    title: "Senior AI Engineer",
    company: "TechFlow Innovations",
    description:
      "Leading the generative AI division. Built an LLM wrapper that cut token costs 40%; shipped three SaaS products with a team of five.",
    tags: ["Python", "PyTorch", "AWS"],
  },
  {
    id: "exp-2",
    period: "2018 — 2021",
    title: "Full Stack Developer",
    company: "Creative Agency X",
    description:
      "High-performance sites for Fortune 500 clients in React and WebGL. Core-web-vitals work lifted conversions 30%.",
    tags: ["React", "WebGL", "TypeScript"],
  },
] as const;

export const PROJECTS = [
  {
    id: "proj-1",
    title: "Neural Voice Synth",
    description:
      "A web-based text-to-speech engine using custom-trained GANs. Real-time voice cloning, directly in the browser.",
    tags: ["TensorFlow.js", "React"],
    repo: "#",
    live: null,
  },
  {
    id: "proj-2",
    title: "Vision Guard",
    description:
      "Automated surveillance that spots anomalies in real-time video feeds with object-detection models.",
    tags: ["Python", "OpenCV"],
    repo: "#",
    live: null,
  },
] as const;

export const SKILLS = [
  {
    category: "Languages & frameworks",
    items: ["TypeScript", "Python", "React", "Next.js", "PyTorch"],
  },
  {
    category: "Tools",
    items: ["AWS", "TensorFlow", "OpenCV", "WebGL"],
  },
] as const;

export const ACHIEVEMENTS = [
  {
    id: "ach-1",
    year: "2023",
    title: "Hackathon Winner — Global AI Summit",
    description:
      "1st place: computer vision in healthcare — a low-latency triage tool.",
  },
  {
    id: "ach-2",
    year: "2022",
    title: "Open Source Contributor of the Year",
    description: "Maintaining middleware used by 500k+ developers.",
  },
  {
    id: "ach-3",
    year: "2021",
    title: "Google Cloud Architect Professional",
    description: "Enterprise infrastructure and security certification.",
  },
  {
    id: "ach-4",
    year: "2020",
    title: "Keynote Speaker — WebSummit AI",
    description: "The ethics of generative design, for 5k+ attendees.",
  },
] as const;

export const DROPS: readonly Drop[] = [
  {
    id: "drop-1",
    date: "2026-07-12",
    kind: "project",
    title: "Neural Voice Synth",
    description: "Real-time voice cloning in the browser, with custom-trained GANs.",
    href: "/projects",
  },
  {
    id: "drop-2",
    date: "2026-05-03",
    kind: "project",
    title: "Vision Guard",
    description: "Anomaly detection on live video feeds, low-latency by design.",
    href: "/projects",
  },
];

export const ASK_SUGGESTIONS = [
  "what do you build?",
  "what's your stack?",
] as const;

export const RESUME_URL: string | null = null;
```

- [ ] **Step 5: Update `src/__tests__/setup.ts`**

Three changes — replace the `@ai-sdk/react` mock block, extend the framer-motion mock's return, and add mocks/stubs for `next/navigation` overridability and `<dialog>`:

Replace the whole `vi.mock("next/navigation", ...)` block with (exported spy so tests can change the path):

```ts
// Mock next/navigation — usePathname is a spy so tests can override the route
const usePathnameMock = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => usePathnameMock(),
  useSearchParams: () => new URLSearchParams(),
}));
// biome-ignore lint/suspicious/noExplicitAny: test-global escape hatch
(globalThis as any).__usePathnameMock = usePathnameMock;
```

Replace the whole `vi.mock("@ai-sdk/react", ...)` block with:

```ts
// Mock @ai-sdk/react — stable return object so tests can assert on sendMessage
const useChatReturn = {
  messages: [] as unknown[],
  sendMessage: vi.fn(),
  status: "ready" as const,
};
vi.mock("@ai-sdk/react", () => ({
  useChat: vi.fn(() => useChatReturn),
}));
// biome-ignore lint/suspicious/noExplicitAny: test-global escape hatch
(globalThis as any).__useChatReturn = useChatReturn;
```

In the framer-motion mock's `return { ... }`, add one entry:

```ts
    MotionConfig: ({ children }: { children: unknown }) => children,
```

At the top (next to the `scrollIntoView` stub), add `<dialog>` support for jsdom:

```ts
// jsdom's <dialog> support is incomplete — stub the modal API if missing
if (!window.HTMLDialogElement.prototype.showModal) {
  window.HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  window.HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}
```

- [ ] **Step 6: Run tests to verify everything passes**

Run: `~/.bun/bin/bun run test:run`
Expected: PASS (`drops.test.ts` + `utils.test.ts`).

- [ ] **Step 7: Verify build**

Run: `~/.bun/bin/bun run build`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/lib/drops.ts src/lib/portfolio-data.ts src/__tests__/drops.test.ts src/__tests__/setup.ts
git commit -m "feat: add drops data layer and rewrite portfolio data for redesign"
```

---

### Task 4: Primitives — Chip and Reveal

**Files:**
- Create: `src/components/Chip.tsx`
- Create: `src/components/Reveal.tsx`
- Test: `src/__tests__/Chip.test.tsx`, `src/__tests__/Reveal.test.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`.
- Produces: `Chip({ children, className? })` — pill label; `Reveal({ children, delay?, className? })` — client component wrapping children in the standard 8px fade-up (`whileInView`, once, 0.45s, easeOut).

- [ ] **Step 1: Write the failing tests**

`src/__tests__/Chip.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Chip } from "@/components/Chip";

describe("Chip", () => {
  it("renders its label text", () => {
    render(<Chip>TypeScript</Chip>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("is pill-shaped via rounded-full", () => {
    render(<Chip>Python</Chip>);
    expect(screen.getByText("Python").className).toContain("rounded-full");
  });
});
```

`src/__tests__/Reveal.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal } from "@/components/Reveal";

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `~/.bun/bin/bun run vitest run src/__tests__/Chip.test.tsx src/__tests__/Reveal.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `src/components/Chip.tsx`**

```tsx
import { cn } from "@/lib/utils";

/** Pill-shaped mono label for tech tags and skills. */
export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface-2 px-3 py-1 font-mono text-xs tracking-[0.04em] text-ink-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Create `src/components/Reveal.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

/** Standard whisper-level entry: 8px fade-up, once, 0.45s ease-out. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `~/.bun/bin/bun run vitest run src/__tests__/Chip.test.tsx src/__tests__/Reveal.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/Chip.tsx src/components/Reveal.tsx src/__tests__/Chip.test.tsx src/__tests__/Reveal.test.tsx
git commit -m "feat: add Chip and Reveal primitives"
```

---

### Task 5: AskDialog — the AI chat as a quiet dialog

Native `<dialog>` wired to the existing `useChat` + `/api/chat`. Controlled by an `open` prop (the Nav owns the state, Task 6).

**Files:**
- Create: `src/components/AskDialog.tsx`
- Test: `src/__tests__/AskDialog.test.tsx`

**Interfaces:**
- Consumes: `ASK_SUGGESTIONS` from `@/lib/portfolio-data`; `useChat` from `@ai-sdk/react`; `DefaultChatTransport` from `ai`.
- Produces: `AskDialog({ open: boolean; onClose: () => void })`.

- [ ] **Step 1: Write the failing test `src/__tests__/AskDialog.test.tsx`**

```tsx
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AskDialog } from "@/components/AskDialog";
import { ASK_SUGGESTIONS } from "@/lib/portfolio-data";

// Stable mock return object installed by setup.ts
// biome-ignore lint/suspicious/noExplicitAny: test-global escape hatch
const chat = (globalThis as any).__useChatReturn;

describe("AskDialog", () => {
  it("shows the input and suggestion chips when open with no messages", () => {
    render(<AskDialog open onClose={vi.fn()} />);
    expect(screen.getByPlaceholderText("ask me anything…")).toBeInTheDocument();
    for (const suggestion of ASK_SUGGESTIONS) {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    }
  });

  it("sends the typed question on submit", async () => {
    chat.sendMessage.mockClear();
    render(<AskDialog open onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText("ask me anything…");
    await act(async () => {
      fireEvent.change(input, { target: { value: "what do you build?" } });
    });
    await act(async () => {
      fireEvent.submit(input.closest("form") as HTMLFormElement);
    });
    expect(chat.sendMessage).toHaveBeenCalledWith({ text: "what do you build?" });
  });

  it("sends a suggestion when its chip is clicked", async () => {
    chat.sendMessage.mockClear();
    render(<AskDialog open onClose={vi.fn()} />);
    await act(async () => {
      fireEvent.click(screen.getByText(ASK_SUGGESTIONS[0]));
    });
    expect(chat.sendMessage).toHaveBeenCalledWith({ text: ASK_SUGGESTIONS[0] });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `~/.bun/bin/bun run vitest run src/__tests__/AskDialog.test.tsx`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/components/AskDialog.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { type UIMessage, useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ASK_SUGGESTIONS } from "@/lib/portfolio-data";

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

/**
 * AskDialog — the AI chat as a quiet, native <dialog>.
 * Serif-italic questions, plain prose answers, a ▍ cursor while streaming.
 */
export function AskDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const ask = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => {
        // Native <dialog> doesn't close on backdrop click — the backdrop IS the dialog element
        if (e.target === dialogRef.current) dialogRef.current?.close();
      }}
      className="m-auto w-[min(640px,calc(100vw-32px))] rounded-xl border border-hairline bg-surface p-6 text-ink-muted backdrop:bg-paper/70 backdrop:backdrop-blur-sm"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex items-baseline gap-3 border-b border-hairline pb-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="ask me anything…"
          aria-label="Ask me anything"
          className="w-full bg-transparent font-mono text-sm tracking-[0.04em] text-ink outline-none placeholder:text-ink-faint"
        />
        <span aria-hidden className="font-mono text-sm text-ink-faint">
          ↵
        </span>
      </form>

      {messages.length === 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {ASK_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => ask(suggestion)}
              className="rounded-full bg-surface-2 px-3 py-1 font-mono text-xs text-ink-muted transition-colors hover:text-ink"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div className="mt-5 flex max-h-[50vh] flex-col gap-4 overflow-y-auto">
          {messages.map((msg) =>
            msg.role === "user" ? (
              <p key={msg.id} className="font-serif italic text-ink">
                “{getMessageText(msg)}”
              </p>
            ) : (
              <p key={msg.id} className="text-sm leading-relaxed">
                {getMessageText(msg)}
              </p>
            )
          )}
          {busy && (
            <span aria-hidden className="animate-blink text-ink">
              ▍
            </span>
          )}
        </div>
      )}
    </dialog>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `~/.bun/bin/bun run vitest run src/__tests__/AskDialog.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/AskDialog.tsx src/__tests__/AskDialog.test.tsx
git commit -m "feat: add AskDialog — AI chat as a native dialog"
```

---

### Task 6: ThemeToggle and Nav

Plain-text nav: links, hairline divider, `ask` trigger (owns AskDialog state), theme toggle.

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/Nav.tsx`
- Test: `src/__tests__/ThemeToggle.test.tsx`, `src/__tests__/Nav.test.tsx`

**Interfaces:**
- Consumes: `NAV_LINKS` from `@/lib/portfolio-data`; `AskDialog` from Task 5; `useTheme` from `next-themes`; `usePathname` from `next/navigation`; `cn` from `@/lib/utils`.
- Produces: `ThemeToggle()` (no props); `Nav()` (no props) — mounted once in the root layout (Task 11).

- [ ] **Step 1: Write the failing tests**

`src/__tests__/ThemeToggle.test.tsx` (setup.ts mocks `resolvedTheme: "dark"`, so the label offers light):

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ThemeToggle } from "@/components/ThemeToggle";

describe("ThemeToggle", () => {
  it("offers the opposite theme as a mono text button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toHaveTextContent(
      "[light]"
    );
  });
});
```

`src/__tests__/Nav.test.tsx`:

```tsx
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "@/components/Nav";
import { NAV_LINKS } from "@/lib/portfolio-data";

// biome-ignore lint/suspicious/noExplicitAny: test-global escape hatch
const usePathnameMock = (globalThis as any).__usePathnameMock;

describe("Nav", () => {
  it("renders all nav links lowercase", () => {
    usePathnameMock.mockReturnValue("/");
    render(<Nav />);
    for (const link of NAV_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });

  it("marks only the active route with aria-current", () => {
    usePathnameMock.mockReturnValue("/experience");
    render(<Nav />);
    expect(screen.getByRole("link", { name: "experience" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "home" })).not.toHaveAttribute(
      "aria-current"
    );
  });

  it("opens the ask dialog from the ask button", async () => {
    usePathnameMock.mockReturnValue("/");
    render(<Nav />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "ask" }));
    });
    expect(screen.getByPlaceholderText("ask me anything…")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `~/.bun/bin/bun run vitest run src/__tests__/ThemeToggle.test.tsx src/__tests__/Nav.test.tsx`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `src/components/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/** Mono text theme switch: shows the theme you'd switch to. */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="font-mono text-[13px] tracking-[0.05em] text-ink-faint transition-colors hover:text-ink"
    >
      {mounted ? (isDark ? "[light]" : "[dark]") : "[ ]"}
    </button>
  );
}
```

- [ ] **Step 4: Create `src/components/Nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AskDialog } from "@/components/AskDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_LINKS } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/** Plain-text nav — no pill, no border. Active route is underlined. */
export function Nav() {
  const pathname = usePathname();
  const [askOpen, setAskOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-6 font-mono text-[13px] tracking-[0.05em]"
      >
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "transition-colors",
                active
                  ? "text-ink underline decoration-1 underline-offset-[6px]"
                  : "text-ink-faint hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <span aria-hidden className="h-3.5 w-px bg-hairline" />
        <button
          type="button"
          onClick={() => setAskOpen(true)}
          className="text-ink-faint transition-colors hover:text-ink"
        >
          ask
        </button>
        <ThemeToggle />
      </nav>
      <AskDialog open={askOpen} onClose={() => setAskOpen(false)} />
    </header>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `~/.bun/bin/bun run vitest run src/__tests__/ThemeToggle.test.tsx src/__tests__/Nav.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ThemeToggle.tsx src/components/Nav.tsx src/__tests__/ThemeToggle.test.tsx src/__tests__/Nav.test.tsx
git commit -m "feat: add plain-text Nav with ask trigger and theme toggle"
```

---

### Task 7: DropsFeed and the Home page

**Files:**
- Create: `src/components/DropsFeed.tsx`
- Modify: `src/app/page.tsx` (replace entirely)
- Test: `src/__tests__/DropsFeed.test.tsx`, `src/__tests__/HomePage.test.tsx`

**Interfaces:**
- Consumes: `getDrops`, `formatDropDate` from `@/lib/drops`; `GREETING`, `BIO`, `SOCIAL_LINKS`, `CONTACT_EMAIL` from `@/lib/portfolio-data`; `Reveal` from Task 4.
- Produces: `DropsFeed()` (no props, shows latest 4 + `more ↓` expander); `HomePage` default export.

- [ ] **Step 1: Write the failing tests**

`src/__tests__/DropsFeed.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DropsFeed } from "@/components/DropsFeed";
import { formatDropDate, getDrops } from "@/lib/drops";

describe("DropsFeed", () => {
  it("renders the DROPS label", () => {
    render(<DropsFeed />);
    expect(screen.getByText("Drops")).toBeInTheDocument();
  });

  it("renders each drop with formatted date and title", () => {
    render(<DropsFeed />);
    for (const drop of getDrops().slice(0, 4)) {
      expect(screen.getByText(drop.title)).toBeInTheDocument();
      expect(screen.getByText(formatDropDate(drop.date))).toBeInTheDocument();
    }
  });

  it("hides the more button when 4 or fewer drops exist", () => {
    render(<DropsFeed />);
    if (getDrops().length <= 4) {
      expect(screen.queryByText("more ↓")).not.toBeInTheDocument();
    }
  });
});
```

`src/__tests__/HomePage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";
import { BIO, GREETING, SOCIAL_LINKS } from "@/lib/portfolio-data";

describe("HomePage", () => {
  it("renders the serif greeting as the page heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(GREETING);
  });

  it("renders the bio", () => {
    render(<HomePage />);
    expect(screen.getByText(BIO)).toBeInTheDocument();
  });

  it("renders every social link", () => {
    render(<HomePage />);
    for (const social of SOCIAL_LINKS) {
      expect(
        screen.getByRole("link", { name: new RegExp(social.label) })
      ).toHaveAttribute("href", social.href);
    }
  });

  it("renders the let's talk closing line", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /let's talk/ })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `~/.bun/bin/bun run vitest run src/__tests__/DropsFeed.test.tsx src/__tests__/HomePage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/DropsFeed.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatDropDate, getDrops } from "@/lib/drops";

const VISIBLE_COUNT = 4;

/** The flexible highlight feed: projects today; notes, posts, releases later. */
export function DropsFeed() {
  const drops = getDrops();
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? drops : drops.slice(0, VISIBLE_COUNT);

  return (
    <section aria-label="Drops">
      <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
        Drops
      </h2>
      <ul className="mt-2">
        {shown.map((drop, index) => (
          <motion.li
            key={drop.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
            className="flex flex-col gap-1 py-4"
          >
            <span className="font-mono text-xs tracking-[0.05em] text-ink-faint">
              {formatDropDate(drop.date)}
            </span>
            {drop.href ? (
              <a
                href={drop.href}
                className="w-fit font-serif text-xl font-semibold text-ink transition-colors hover:underline hover:underline-offset-4"
              >
                {drop.title}
              </a>
            ) : (
              <span className="font-serif text-xl font-semibold text-ink">
                {drop.title}
              </span>
            )}
            {drop.description && (
              <p className="text-[15px] leading-relaxed text-ink-muted">
                {drop.description}
              </p>
            )}
          </motion.li>
        ))}
      </ul>
      {drops.length > VISIBLE_COUNT && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-2 font-mono text-xs tracking-[0.05em] text-ink-faint transition-colors hover:text-ink"
        >
          more ↓
        </button>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Replace `src/app/page.tsx` entirely**

```tsx
import { DropsFeed } from "@/components/DropsFeed";
import { Reveal } from "@/components/Reveal";
import {
  BIO,
  CONTACT_EMAIL,
  GREETING,
  SOCIAL_LINKS,
} from "@/lib/portfolio-data";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[640px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink md:text-5xl">
          {GREETING}
        </h1>
        <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">{BIO}</p>
        <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] tracking-[0.05em]">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="mt-20">
        <DropsFeed />
      </div>
      <hr className="mt-12 border-hairline" />
      <p className="mt-10 text-[15px] text-ink-muted">
        Interested in working together or just want to say hi?{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-ink underline underline-offset-4"
        >
          let's talk
        </a>
        .
      </p>
    </main>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `~/.bun/bin/bun run vitest run src/__tests__/DropsFeed.test.tsx src/__tests__/HomePage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/DropsFeed.tsx src/app/page.tsx src/__tests__/DropsFeed.test.tsx src/__tests__/HomePage.test.tsx
git commit -m "feat: add Home page with Drops feed"
```

---

### Task 8: TimelineItem and the Experience page

**Files:**
- Create: `src/components/TimelineItem.tsx`
- Create: `src/app/experience/page.tsx`
- Test: `src/__tests__/ExperiencePage.test.tsx`

**Interfaces:**
- Consumes: `EXPERIENCES`, `RESUME_URL` from `@/lib/portfolio-data`; `Chip` from Task 4; `Reveal` from Task 4.
- Produces: `TimelineItem({ experience, index })` where `experience` is one element of `EXPERIENCES` (`{ id; period; title; company; description; tags }`); `ExperiencePage` default export at route `/experience`.

- [ ] **Step 1: Write the failing test `src/__tests__/ExperiencePage.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ExperiencePage from "@/app/experience/page";
import { EXPERIENCES, RESUME_URL } from "@/lib/portfolio-data";

describe("ExperiencePage", () => {
  it("renders the page title", () => {
    render(<ExperiencePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Where I've been."
    );
  });

  it("renders every experience entry with role, company, period, and tags", () => {
    render(<ExperiencePage />);
    for (const exp of EXPERIENCES) {
      expect(screen.getByText(exp.title)).toBeInTheDocument();
      expect(screen.getByText(exp.company)).toBeInTheDocument();
      expect(screen.getByText(exp.period)).toBeInTheDocument();
      for (const tag of exp.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("omits the résumé link when RESUME_URL is null", () => {
    render(<ExperiencePage />);
    if (RESUME_URL === null) {
      expect(screen.queryByText(/résumé/)).not.toBeInTheDocument();
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `~/.bun/bin/bun run vitest run src/__tests__/ExperiencePage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/TimelineItem.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Chip } from "@/components/Chip";
import type { EXPERIENCES } from "@/lib/portfolio-data";

type Experience = (typeof EXPERIENCES)[number];

/** One timeline entry: mono period beside a hairline rail, serif role. */
export function TimelineItem({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
      className="grid gap-3 md:grid-cols-[140px_1fr] md:gap-5"
    >
      <span className="pt-1 font-mono text-xs uppercase tracking-[0.05em] text-ink-faint">
        {experience.period}
      </span>
      <div className="flex flex-col gap-2 border-hairline md:border-l md:pl-6">
        <h2 className="font-serif text-2xl font-semibold text-ink">
          {experience.title}
        </h2>
        <p className="font-mono text-xs tracking-[0.05em] text-ink-faint">
          {experience.company}
        </p>
        <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
          {experience.description}
        </p>
        <div className="mt-1 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
```

- [ ] **Step 4: Create `src/app/experience/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { TimelineItem } from "@/components/TimelineItem";
import { EXPERIENCES, RESUME_URL } from "@/lib/portfolio-data";

export const metadata: Metadata = { title: "experience" };

export default function ExperiencePage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink">
          Where I've been.
        </h1>
        <p className="mt-4 text-[17px] text-ink-muted">
          A short chronicle of building, shipping, and learning.
        </p>
      </Reveal>
      <div className="mt-16 flex flex-col gap-14">
        {EXPERIENCES.map((experience, index) => (
          <TimelineItem key={experience.id} experience={experience} index={index} />
        ))}
      </div>
      {RESUME_URL && (
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-16 inline-block font-mono text-[13px] tracking-[0.05em] text-ink underline underline-offset-4"
        >
          résumé ↗
        </a>
      )}
    </main>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `~/.bun/bin/bun run vitest run src/__tests__/ExperiencePage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/TimelineItem.tsx src/app/experience/page.tsx src/__tests__/ExperiencePage.test.tsx
git commit -m "feat: add Experience page with timeline"
```

---

### Task 9: ProjectCard and the Projects page

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/app/projects/page.tsx`
- Test: `src/__tests__/ProjectsPage.test.tsx`

**Interfaces:**
- Consumes: `PROJECTS` from `@/lib/portfolio-data`; `Chip`, `Reveal` from Task 4.
- Produces: `ProjectCard({ project, index })` where `project` is one element of `PROJECTS` (`{ id; title; description; tags; repo: string | null; live: string | null }`); `ProjectsPage` default export at route `/projects`.

- [ ] **Step 1: Write the failing test `src/__tests__/ProjectsPage.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsPage from "@/app/projects/page";
import { PROJECTS } from "@/lib/portfolio-data";

describe("ProjectsPage", () => {
  it("renders the page title", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Selected work."
    );
  });

  it("renders every project with title, description, and tags", () => {
    render(<ProjectsPage />);
    for (const project of PROJECTS) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      for (const tag of project.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("links code ↗ only for projects with a repo", () => {
    render(<ProjectsPage />);
    const withRepo = PROJECTS.filter((p) => p.repo !== null).length;
    expect(screen.queryAllByText("code ↗")).toHaveLength(withRepo);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `~/.bun/bin/bun run vitest run src/__tests__/ProjectsPage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/components/ProjectCard.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { Chip } from "@/components/Chip";
import type { PROJECTS } from "@/lib/portfolio-data";

type Project = (typeof PROJECTS)[number];

/** Full-width project card: surface bg, hairline border, 12px radius. */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
      className="flex flex-col gap-2 rounded-xl border border-hairline bg-surface p-6"
    >
      <h2 className="font-serif text-[21px] font-semibold text-ink">
        {project.title}
      </h2>
      <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-muted">
        {project.description}
      </p>
      <div className="mt-1 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      {(project.repo || project.live) && (
        <div className="mt-2 flex gap-5 font-mono text-[13px] tracking-[0.05em]">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
            >
              code ↗
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
            >
              live ↗
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
```

- [ ] **Step 4: Create `src/app/projects/page.tsx`**

```tsx
import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/lib/portfolio-data";

export const metadata: Metadata = { title: "projects" };

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink">
          Selected work.
        </h1>
        <p className="mt-4 text-[17px] text-ink-muted">
          Recent explorations in interfaces, AI, and systems.
        </p>
      </Reveal>
      <div className="mt-16 flex flex-col gap-4">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `~/.bun/bin/bun run vitest run src/__tests__/ProjectsPage.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProjectCard.tsx src/app/projects/page.tsx src/__tests__/ProjectsPage.test.tsx
git commit -m "feat: add Projects page with cards"
```

---

### Task 10: Achievements page

Skills chip clusters + dated achievement rows. No new components — composed from `Chip` and `Reveal` directly in the page.

**Files:**
- Create: `src/app/achievements/page.tsx`
- Test: `src/__tests__/AchievementsPage.test.tsx`

**Interfaces:**
- Consumes: `SKILLS`, `ACHIEVEMENTS` from `@/lib/portfolio-data`; `Chip`, `Reveal` from Task 4.
- Produces: `AchievementsPage` default export at route `/achievements`.

- [ ] **Step 1: Write the failing test `src/__tests__/AchievementsPage.test.tsx`**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AchievementsPage from "@/app/achievements/page";
import { ACHIEVEMENTS, SKILLS } from "@/lib/portfolio-data";

describe("AchievementsPage", () => {
  it("renders the page title", () => {
    render(<AchievementsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Skills & achievements."
    );
  });

  it("renders every skill group label and item", () => {
    render(<AchievementsPage />);
    for (const group of SKILLS) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
      for (const item of group.items) {
        expect(screen.getAllByText(item).length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("renders every achievement with year, title, and description", () => {
    render(<AchievementsPage />);
    for (const achievement of ACHIEVEMENTS) {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
      expect(screen.getByText(achievement.description)).toBeInTheDocument();
      expect(screen.getAllByText(achievement.year).length).toBeGreaterThanOrEqual(1);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `~/.bun/bin/bun run vitest run src/__tests__/AchievementsPage.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Create `src/app/achievements/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Chip } from "@/components/Chip";
import { Reveal } from "@/components/Reveal";
import { ACHIEVEMENTS, SKILLS } from "@/lib/portfolio-data";

export const metadata: Metadata = { title: "achievements" };

export default function AchievementsPage() {
  return (
    <main className="mx-auto max-w-[720px] px-6 pb-32 pt-16 md:pt-24">
      <Reveal>
        <h1 className="font-serif text-4xl font-bold tracking-[-0.02em] text-ink">
          Skills &amp; achievements.
        </h1>
        <p className="mt-4 text-[17px] text-ink-muted">
          What I work with, and a few moments worth keeping.
        </p>
      </Reveal>
      <div className="mt-16 flex flex-col gap-8">
        {SKILLS.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.06}>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
              {group.category}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-16">
        <h2 className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-faint">
          Achievements
        </h2>
        <ul className="mt-2">
          {ACHIEVEMENTS.map((achievement) => (
            <li
              key={achievement.id}
              className="flex flex-col gap-1 border-b border-hairline py-5 last:border-b-0"
            >
              <span className="font-mono text-xs tracking-[0.05em] text-ink-faint">
                {achievement.year}
              </span>
              <h3 className="font-serif text-xl font-semibold text-ink">
                {achievement.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                {achievement.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `~/.bun/bin/bun run vitest run src/__tests__/AchievementsPage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/achievements/page.tsx src/__tests__/AchievementsPage.test.tsx
git commit -m "feat: add Achievements page with skills and dated list"
```

---

### Task 11: Final assembly — mount Nav, motion config, docs, and full verification

**Files:**
- Modify: `src/app/layout.tsx` (add Nav + MotionConfig)
- Modify: `CLAUDE.md` (architecture section)
- Modify: `README.md` (only if it describes the old CLI design — align the description)

**Interfaces:**
- Consumes: `Nav` from Task 6; `MotionConfig` from `framer-motion`.
- Produces: the finished site.

- [ ] **Step 1: Update `src/app/layout.tsx` body**

Add imports:

```tsx
import { MotionConfig } from "framer-motion";
import { Nav } from "@/components/Nav";
```

Replace the `<ThemeProvider …>` block inside `<body>` with:

```tsx
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MotionConfig reducedMotion="user">
            <Nav />
            {children}
          </MotionConfig>
        </ThemeProvider>
```

(If the build complains that `MotionConfig` can't render from a server component, move the `MotionConfig` wrapper inside `src/components/ThemeProvider.tsx` — it's already a client component — keeping the same nesting order.)

- [ ] **Step 2: Full verification**

Run: `~/.bun/bin/bun run test:run && ~/.bun/bin/bun run build && ~/.bun/bin/bun run lint`
Expected: all PASS. Fix any Biome findings in files this plan created (do not reformat untouched files).

- [ ] **Step 3: Orphan sweep**

Run: `grep -rnE "terminal|cream|crt|CRT|Space_Mono|space-mono|material-symbols|Material Symbols|FF8225|STATS|AI_CHAT_INTRO|kernelVersion" src/`
Expected: no matches. Any match is dead code from the old design — delete it.

Run: `grep -rn "SITE_CONFIG" src/` and confirm only `layout.tsx` and `portfolio-data.ts` reference it.

- [ ] **Step 4: Update `CLAUDE.md` architecture notes**

In the `## Architecture` section, replace the single-page description with (keep the Commands, Testing setup, and other still-true sections):

```markdown
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
```

Also delete the `### Icons` section (Material Symbols is gone) and any remaining references to Material Symbols or Space Mono in `CLAUDE.md`.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx CLAUDE.md README.md
git commit -m "feat: assemble Stark & Serif layout with nav and motion config"
```

---

## Post-plan notes

- **User personalization (not part of this plan):** real links in `SOCIAL_LINKS`, real `CONTACT_EMAIL`, real bio/experience/project content in `portfolio-data.ts`.
- **Phase 2 (separate plan):** the Drops studio — `/studio` passcode route, hosted DB, `GET/POST/DELETE /api/drops`, `getDrops()` swap. Spec §10.
