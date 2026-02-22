"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS } from "@/lib/portfolio-data";

/**
 * AchievementsSection — validates system milestones and industry recognition.
 *
 * The first "featured" achievement gets the inverted bg-primary highlight treatment
 * (matching the Stitch dark design). Remaining entries use the standard cli-border style.
 * On the light design, each card in the grid gets a hover-to-primary effect.
 */
export function AchievementsSection() {
  const [featuredAch, ...rest] = ACHIEVEMENTS;

  return (
    <motion.section
      id="achievements"
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
            Achievement Log
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            Validating system milestones and industry recognition.
          </p>
        </div>
      </div>

      {/* Featured achievement — inverted (lime) card */}
      <div className="space-y-1 mb-1">
        <article className="group flex flex-col md:flex-row gap-3 sm:gap-4 p-4 sm:p-6 bg-primary text-black">
          <div className="font-bold min-w-[100px] sm:min-w-[130px] text-sm">{featuredAch.period}</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold uppercase">{featuredAch.title}</h3>
            <p className="text-black/60 text-xs mb-3">{featuredAch.org}</p>
            {featuredAch.detail && (
              <p className="font-bold text-lg mb-2">{featuredAch.detail}</p>
            )}
            <p className="text-sm font-medium">{featuredAch.description}</p>
          </div>
        </article>

        {/* Remaining achievements */}
        {rest.map((ach) => (
          <article
            key={ach.id}
            className={cn(
              "group flex flex-col md:flex-row gap-3 sm:gap-4 p-4 sm:p-6 border transition-colors duration-150",
              "border-black/10 hover:bg-black/5",
              "dark:border-white/10 dark:hover:bg-white/5"
            )}
          >
            <div className="text-primary font-bold min-w-[100px] sm:min-w-[130px] text-sm">
              {ach.period}
            </div>
            <div className="flex-1">
              <h3
                className={cn(
                  "text-xl font-bold uppercase transition-colors duration-150 group-hover:text-primary",
                  "text-neutral-900 dark:text-white"
                )}
              >
                {ach.title}
              </h3>
              <p className="text-neutral-500 text-xs mb-3">{ach.org}</p>
              {ach.detail && (
                <p className="font-bold text-lg mb-2 text-primary">{ach.detail}</p>
              )}
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                {ach.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
