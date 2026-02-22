"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const ASCII_AVATAR = `      _..._
    .'     '.
   / \\     / \\
  (  O ) (  O )
   \\  '   '  /
    |  _ _  |
    \\  \\_/  /
     '.___.'
   ___|   |___
  /           \\
 /             \\`;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/**
 * Hero section — two-column layout:
 *  Left: headline + CTAs
 *  Right: ASCII avatar terminal card
 */
export function HeroSection() {
  return (
    <motion.header
      className="mb-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* ── Left column ── */}
        <div className="space-y-6">
          {/* Status indicator */}
          <motion.div
            className="text-primary text-sm flex items-center gap-2"
            variants={itemVariants}
          >
            <span
              className="material-symbols-outlined text-sm"
              aria-hidden="true"
            >
              terminal
            </span>
            <span>system_init --status=active</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className={cn(
              "text-4xl md:text-6xl font-bold leading-tight uppercase",
              "text-neutral-900 dark:text-white"
            )}
            variants={itemVariants}
          >
            Crafting{" "}
            <span className="text-primary">Intelligence</span>
            {" "}Into Reality.
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="max-w-md text-neutral-500 dark:text-neutral-400 leading-relaxed"
            variants={itemVariants}
          >
            I build immersive web experiences powered by generative AI. Let&apos;s
            transcend the traditional interface through CLI-driven design.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            variants={itemVariants}
          >
            <a
              href="#about"
              className={cn(
                "bg-primary text-black px-4 py-2.5 sm:px-6 sm:py-3 font-bold uppercase",
                "flex items-center gap-2 transition-all duration-200",
                "hover:bg-white hover:text-black dark:hover:bg-neutral-200"
              )}
            >
              ./talk_to_digital_twin.bin
            </a>
            <a
              href="#projects"
              className={cn(
                "border px-4 py-2.5 sm:px-6 sm:py-3 font-bold uppercase transition-all duration-200",
                "border-black/20 text-neutral-900 hover:bg-black/5",
                "dark:border-white/20 dark:text-white dark:hover:bg-white/10"
              )}
            >
              ls ./projects
            </a>
          </motion.div>
        </div>

        {/* ── Right column — ASCII terminal card ── */}
        <motion.div
          className={cn(
            "relative p-4 sm:p-6 border",
            "border-black/10 bg-cream-surface",
            "dark:border-white/10 dark:bg-terminal-surface"
          )}
          variants={itemVariants}
        >
          {/* File label */}
          <div className="absolute top-0 right-0 p-2 text-[10px] text-neutral-500 uppercase tracking-widest">
            AVATAR.IMG
          </div>

          {/* ASCII art */}
          <pre
            className="ascii-art text-neutral-900 dark:text-primary"
            aria-label="Developer avatar ASCII art"
          >
            {ASCII_AVATAR}
          </pre>

          {/* System readouts */}
          <div className="mt-4 text-[10px] text-neutral-500 uppercase tracking-tighter space-y-0.5">
            <p>[ROOT_USER_DETECTED]</p>
            <p>SENSORS: ONLINE</p>
            <p>AI_CORE: STABLE</p>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
