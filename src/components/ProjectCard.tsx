"use client";

import { Chip } from "@/components/Chip";
import type { PROJECTS } from "@/lib/portfolio-data";
import { motion } from "framer-motion";

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
      <h2 className="font-serif text-[21px] font-semibold text-ink">{project.title}</h2>
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
