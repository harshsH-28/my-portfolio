import type { Drop } from "@/lib/drops";

/**
 * Portfolio data — update this file to personalize your portfolio.
 * All site content lives here; components hold no content.
 */

export const SITE_CONFIG = {
  title: "Harsh — software engineer",
  description: "I build immersive web things, powered by AI. Focused on clarity and craft.",
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
  { label: "x", href: "#" },
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
    description: "1st place: computer vision in healthcare — a low-latency triage tool.",
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

export const ASK_SUGGESTIONS = ["what do you build?", "what's your stack?"] as const;

export const RESUME_URL: string | null = null;
