"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EXPERIENCES, STATS } from "@/lib/portfolio-data";

/**
 * ExperienceSection — Work history log with CLI-style entries and stat counters.
 */
export function ExperienceSection() {
  return (
    <motion.section
      id="work"
      className="mb-32"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Section header */}
      <div
        className={cn(
          "flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 gap-6",
          "border-b pb-6 border-black/10 dark:border-white/10"
        )}
      >
        <div>
          <h2
            className={cn(
              "text-2xl font-bold uppercase",
              "text-neutral-900 dark:text-white"
            )}
          >
            Experience Log
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            My journey through the digital landscape.
          </p>
        </div>
      </div>

      {/* Experience entries */}
      <div className="space-y-1">
        {EXPERIENCES.map((exp) => (
          <article
            key={exp.id}
            className={cn(
              "group flex flex-col md:flex-row gap-3 sm:gap-4 p-4 sm:p-6 border transition-colors duration-150",
              "border-black/10 hover:bg-black/5",
              "dark:border-white/10 dark:hover:bg-white/5"
            )}
          >
            <div className="text-primary font-bold min-w-[100px] sm:min-w-[130px] text-sm">
              {exp.period}
            </div>
            <div className="flex-1">
              <h3
                className={cn(
                  "text-xl font-bold uppercase group-hover:text-primary transition-colors duration-150",
                  "text-neutral-900 dark:text-white"
                )}
              >
                {exp.title}
              </h3>
              <p className="text-neutral-500 text-xs mb-3">{exp.company}</p>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-4">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-4 text-[10px] text-neutral-500 uppercase tracking-wider">
                {exp.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-1">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className={cn(
              "p-4 sm:p-6 border text-center",
              "border-black/10",
              "dark:border-white/10"
            )}
          >
            <div className="text-3xl font-bold text-primary">{value}</div>
            <div className="text-[10px] uppercase text-neutral-500 mt-2 tracking-wider">
              {label}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
