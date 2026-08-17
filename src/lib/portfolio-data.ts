import type { Drop } from "@/lib/drops";

/**
 * Portfolio data — update this file to personalize your portfolio.
 * All site content lives here; components hold no content.
 */

export const SITE_CONFIG = {
  title: "Harsh Sharma — software engineer",
  description:
    "Software engineer building backend systems, media pipelines, and AI workflows that serve 100K+ end users.",
} as const;

export const GREETING = "Hi, I'm Harsh.";

export const BIO =
  "I'm a software engineer at Tarsense, building backend systems, media pipelines, and AI workflows used by 100K+ end users. I care about clarity and craft — fast APIs, clean architecture, and tools that quietly do their job.";

export const CONTACT_EMAIL = "harshsharma6419@gmail.com";

export const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "experience", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "achievements", href: "/achievements" },
] as const;

export const SOCIAL_LINKS = [
  { label: "github", href: "https://github.com/harshsH-28" },
  { label: "linkedin", href: "https://www.linkedin.com/in/harshsharma" },
  { label: "leetcode", href: "https://leetcode.com/u/harshsh428" },
  { label: "email", href: "mailto:harshsharma6419@gmail.com" },
] as const;

export const EXPERIENCES = [
  {
    id: "exp-1",
    period: "2024 — Present",
    title: "Software Development Engineer",
    company: "Tarsense Technologies · Remote",
    description:
      "Cut media API response times 75% (12s → 3s) for 100K+ end users by eliminating redundant S3 network I/O. Designed the platform's five-channel messaging architecture (web, WhatsApp, SMS, email, voice) behind a single ports-and-adapters interface — swapping a provider needs one isolated adapter, zero core changes. Built an intent-management UI for AI workflow builders that cut feature setup time by 80%.",
    tags: ["Node.js", "MongoDB", "AWS S3", "System Design"],
  },
  {
    id: "exp-2",
    period: "2023 — 2024",
    title: "SDE Intern",
    company: "Tarsense Technologies · Remote",
    description:
      "Untangled scalability bottlenecks in an analytics pipeline processing 6.4M+ documents — request cancellation and tiered rate-limiting cut API calls 50% and MongoDB CPU load 20%. Fixed 20+ critical cross-platform bugs (monthly reports down 95.5%) and standardized end-to-end testing with Cypress.",
    tags: ["MongoDB", "Cypress", "Performance"],
  },
] as const;

export const PROJECTS = [
  {
    id: "proj-1",
    title: "J-Search Live",
    description:
      "A self-hosted job-application assistant: give it a posting URL and a 7-stage LLM pipeline returns a tailored résumé, cover letter, and outreach messages. Async workers over a SQLite job queue with atomic claiming, per-stage resumability, and a temperature-0 verification pass that rejects fabricated edits.",
    tags: ["TypeScript", "Hono", "Bun", "SQLite", "Gemini"],
    repo: null,
    live: null,
  },
  {
    id: "proj-2",
    title: "MeloFlow",
    description:
      "An on-demand audio streaming service. One CMAF pipeline transcodes a 3-tier AAC bitrate ladder and serves both HLS and DASH clients from a single set of fragmented-MP4 segments — roughly half the packaging storage of separate per-protocol copies.",
    tags: ["Python", "FastAPI", "FFmpeg", "Next.js"],
    repo: null,
    live: null,
  },
] as const;

export const SKILLS = [
  {
    category: "Languages",
    items: ["C++", "TypeScript", "JavaScript", "Python", "Go"],
  },
  {
    category: "Frameworks & libraries",
    items: ["React", "Next.js", "Node.js", "FastAPI", "Zustand", "Tailwind CSS"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "Redis", "PostgreSQL", "MySQL"],
  },
  {
    category: "Tools & platforms",
    items: ["Git", "Docker", "Bash", "AWS S3", "REST APIs"],
  },
] as const;

export const ACHIEVEMENTS = [
  {
    id: "ach-1",
    year: "2024",
    title: "LeetCode 1,760+ — top 9.5% globally",
    description:
      "800+ problems solved. CodeChef global rank 199 (October Long Challenge); Google Kickstart 3,601 of 18,000 (Round H).",
  },
  {
    id: "ach-2",
    year: "2022 — 2023",
    title: "Technical Lead, Google Developer Student Club",
    description:
      "Led a 20-member team running the college's first 24-hour hackathon (5,000+ participants), plus technical workshops and mentorship.",
  },
  {
    id: "ach-3",
    year: "2021",
    title: "Winner — Hack the Mountains (MLH)",
    description: "Best use of Appwrite at the 36-hour hackathon.",
  },
  {
    id: "ach-4",
    year: "2020 — 2024",
    title: "B.Tech CSE, Maharaja Surajmal Institute of Technology",
    description: "CGPA 8.95/10 · New Delhi, India.",
  },
] as const;

export const DROPS: readonly Drop[] = [
  {
    id: "drop-1",
    date: "2026-05-20",
    kind: "project",
    title: "J-Search Live",
    description:
      "A job-application assistant that turns a posting URL into a tailored résumé through a 7-stage LLM pipeline.",
    href: "/projects",
  },
  {
    id: "drop-2",
    date: "2025-11-08",
    kind: "project",
    title: "MeloFlow",
    description:
      "On-demand audio streaming — one CMAF pipeline serving both HLS and DASH from a single segment set.",
    href: "/projects",
  },
];

export const ASK_SUGGESTIONS = [
  "what do you do at tarsense?",
  "tell me about j-search live",
] as const;

export const RESUME_URL: string | null = null;
