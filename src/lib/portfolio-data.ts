/**
 * Portfolio data — update this file to personalize your portfolio.
 * Keeping content separate from components follows the single-responsibility principle.
 */

export const SITE_CONFIG = {
  title: "DEV-OS v1.0.5 | AI Developer Portfolio",
  description:
    "I build immersive web experiences powered by generative AI. CLI-driven design meets cutting-edge engineering.",
  kernelVersion: "5.10.0-brutalist",
  systemVersion: "v1.0.5",
  year: new Date().getFullYear(),
} as const;

export const NAV_LINKS = [
  { label: "~/whoami", href: "#about" },
  { label: "~/experience", href: "#work" },
  { label: "~/projects", href: "#projects" },
  { label: "~/achievements", href: "#achievements" },
] as const;

export const EXPERIENCES = [
  {
    id: "exp-1",
    period: "2021-PRESENT",
    title: "Senior AI Engineer",
    company: "TechFlow Innovations",
    description:
      "Leading the generative AI division. Architected a proprietary LLM wrapper that reduced token costs by 40%. Managed a team of 5 developers to ship 3 major SaaS products.",
    tags: ["#Python", "#PyTorch", "#AWS"],
  },
  {
    id: "exp-2",
    period: "2018-2021",
    title: "Full Stack Developer",
    company: "Creative Agency X",
    description:
      "Built high-performance marketing sites for Fortune 500 clients using React and WebGL. Optimized core web vitals resulting in 30% conversion uplift.",
    tags: ["#React", "#WebGL", "#TypeScript"],
  },
] as const;

export const STATS = [
  { value: "50+", label: "Projects Shipped" },
  { value: "12", label: "Open Source Contribs" },
  { value: "4.2m", label: "Users Impacted" },
] as const;

export const PROJECTS = [
  {
    id: "proj-1",
    index: "01/04",
    title: "Neural Voice Synth",
    visibility: "PUBLIC" as const,
    description:
      "A web-based text-to-speech engine using custom trained GANs. Features real-time voice cloning capabilities directly in the browser.",
    tags: ["TensorFlow.js", "React"],
    href: "#",
  },
  {
    id: "proj-2",
    index: "02/04",
    title: "Vision Guard",
    visibility: "PRIVATE" as const,
    description:
      "Automated security surveillance system that detects anomalies in real-time video feeds using object detection models.",
    tags: ["Python", "OpenCV"],
    href: "#",
  },
] as const;

export const ACHIEVEMENTS = [
  {
    id: "ach-1",
    period: "2023_AWARD",
    title: "Hackathon Winner",
    org: "Global AI Summit",
    detail: "1st Place",
    description:
      "Best Implementation of Computer Vision in Healthcare. Built a low-latency diagnostic tool for emergency triage.",
    featured: true,
    icon: "workspace_premium",
  },
  {
    id: "ach-2",
    period: "2022_KEY",
    title: "Open Source Contributor of the Year",
    org: "DevCommunity Awards",
    detail: null,
    description:
      "Recognized for maintaining critical middleware libraries used by over 500k developers.",
    featured: false,
    icon: "code",
  },
  {
    id: "ach-3",
    period: "2021_CERT",
    title: "Google Cloud Architect Professional",
    org: "Certification ID: #GC-99212",
    detail: null,
    description:
      "Advanced certification covering enterprise-level infrastructure and security protocols.",
    featured: false,
    icon: "article",
  },
  {
    id: "ach-4",
    period: "2020_SPK",
    title: "Keynote Speaker: WebSummit AI",
    org: "WebSummit 2020",
    detail: null,
    description:
      "Discussing the ethics of Generative Design to 5k+ attendees.",
    featured: false,
    icon: "campaign",
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Twitter", href: "#" },
] as const;

export const AI_CHAT_INTRO = {
  aiGreeting:
    "Hello! I'm the digital twin of the developer. I've been trained on 8 years of software engineering data.",
  aiSpecialty:
    "I specialize in Python, TensorFlow, and React. Ask me about my latest project at Google or my contribution to open-source LLMs.",
  guestQuestion: "Tell me about your experience with large language models.",
} as const;
