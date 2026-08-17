"use client";

import { Chip } from "@/components/Chip";
import type { EXPERIENCES } from "@/lib/portfolio-data";
import { motion } from "framer-motion";

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
        <h2 className="font-serif text-2xl font-semibold text-ink">{experience.title}</h2>
        <p className="font-mono text-xs tracking-[0.05em] text-ink-faint">{experience.company}</p>
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
