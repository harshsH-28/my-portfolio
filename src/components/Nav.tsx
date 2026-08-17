"use client";

import { AskDialog } from "@/components/AskDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_LINKS } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** Plain-text nav — no pill, no border. Active route is underlined. */
export function Nav() {
  const pathname = usePathname();
  const [askOpen, setAskOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-6 font-mono text-[13px] tracking-[0.05em]"
      >
        {NAV_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "transition-colors",
                active
                  ? "text-ink underline decoration-1 underline-offset-[6px]"
                  : "text-ink-faint hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          );
        })}
        <span aria-hidden className="h-3.5 w-px bg-hairline" />
        <button
          type="button"
          onClick={() => setAskOpen(true)}
          className="text-ink-faint transition-colors hover:text-ink"
        >
          ask
        </button>
        <ThemeToggle />
      </nav>
      <AskDialog open={askOpen} onClose={() => setAskOpen(false)} />
    </header>
  );
}
