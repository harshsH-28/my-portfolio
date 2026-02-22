"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/portfolio-data";

/**
 * ProjectsSection — CLI-style project list with watermark heading.
 */
export function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      className="mb-32"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Watermark + command header */}
      <div className="mb-8 sm:mb-12">
        <h2
          className={cn(
            "text-3xl sm:text-5xl font-bold select-none mb-4 uppercase",
            "opacity-[0.07] text-neutral-900",
            "dark:text-white dark:opacity-10"
          )}
        >
          PORTFOLIO
        </h2>
        <div
          className={cn(
            "flex items-center gap-2 font-bold text-sm",
            "text-neutral-900 dark:text-primary"
          )}
        >
          <span>&gt;</span>
          <span>ls -l ./active_projects</span>
        </div>
      </div>

      {/* Project list */}
      <div
        className={cn(
          "border border-b-0",
          "border-black/10 dark:border-white/10"
        )}
      >
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className={cn(
              "group p-4 sm:p-8 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6",
              "border-black/10 hover:bg-primary/5 transition-all duration-150",
              "dark:border-white/10"
            )}
          >
            {/* Left — project info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2 flex-wrap">
                <span className="text-neutral-500 text-xs">{project.index}</span>
                <h3
                  className={cn(
                    "text-2xl font-bold uppercase transition-colors duration-150 group-hover:text-primary",
                    "text-neutral-900 dark:text-white"
                  )}
                >
                  {project.title}
                </h3>
                <span
                  className={cn(
                    "text-[10px] border px-2 py-0.5 font-bold",
                    project.visibility === "PUBLIC"
                      ? "border-primary text-primary"
                      : "border-neutral-500 text-neutral-500"
                  )}
                >
                  {project.visibility}
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Right — tags + link */}
            <div className="flex items-center gap-8">
              <div className="hidden lg:flex gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "text-[10px] text-neutral-500 uppercase border px-2 py-1",
                      "border-black/10 dark:border-white/10"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.href}
                className="text-primary font-bold flex items-center gap-1 hover:underline text-sm"
              >
                [+] More Details
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Archived projects prompt */}
      <div
        className={cn(
          "mt-1 p-4 sm:p-8 border group cursor-pointer transition-colors duration-150",
          "border-black/10 bg-cream-surface hover:border-primary",
          "dark:border-white/10 dark:bg-terminal-surface"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-primary font-bold text-sm">
            guest@root:~$
          </span>
          <span className="text-neutral-900 dark:text-white text-sm">
            ls -a projects/archived
          </span>
          <span className="cli-cursor" aria-hidden="true" />
        </div>
        <p className="text-neutral-500 text-[10px] mt-2 uppercase tracking-widest font-bold">
          Click to reveal 12 additional repository entries
        </p>
      </div>
    </motion.section>
  );
}
