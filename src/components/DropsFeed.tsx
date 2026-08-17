"use client";

import { formatDropDate, getDrops } from "@/lib/drops";
import { motion } from "framer-motion";
import { useState } from "react";

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
              <span className="font-serif text-xl font-semibold text-ink">{drop.title}</span>
            )}
            {drop.description && (
              <p className="text-[15px] leading-relaxed text-ink-muted">{drop.description}</p>
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
