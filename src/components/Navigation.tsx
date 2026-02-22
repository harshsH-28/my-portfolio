"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * Sticky top navigation bar.
 *
 * Features:
 * - System version badge
 * - Anchor navigation links (~/section convention from Stitch design)
 * - "Execute_Hire.sh" CTA → #contact
 * - Theme toggle button (sun/moon icon) — bottom-right is replicated in a
 *   fixed button component too, but this one is inline in the nav on mobile.
 */
export function Navigation() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch — theme is unknown until client mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 px-3 sm:px-6 py-3 flex items-center justify-between",
        "backdrop-blur-sm border-b",
        "bg-cream/90 border-black/10",
        "dark:bg-terminal/90 dark:border-white/10",
        "transition-colors duration-300"
      )}
      aria-label="Primary navigation"
    >
      {/* ── Brand + links ── */}
      <div className="flex items-center gap-4">
        <span className="font-bold text-primary text-sm tracking-tight">
          [{SITE_CONFIG.systemVersion.replace("v", "DEV-OS v")}]
        </span>

        <div className="hidden md:flex gap-6 text-[10px] text-neutral-500 dark:text-neutral-500 uppercase tracking-widest font-bold">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="hover:text-primary transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* ── Right side controls ── */}
      <div className="flex items-center gap-3">
        {/* Theme toggle — visible on all breakpoints */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={cn(
            "h-[30px] uppercase flex items-center overflow-hidden border transition-colors duration-150",
            "border-black/10 dark:border-white/10"
          )}
        >
          {mounted ? (
            <>
              {/* Sun side */}
              <span
                className={cn(
                  "px-2 py-1.5 transition-colors duration-150",
                  !isDark
                    ? "bg-primary text-black"
                    : "text-neutral-400 hover:text-neutral-300"
                )}
              >
                <span className="material-symbols-outlined text-xs leading-none" aria-hidden="true">
                  light_mode
                </span>
              </span>
              {/* Divider */}
              <span className="w-px h-4 bg-black/10 dark:bg-white/10 shrink-0" />
              {/* Moon side */}
              <span
                className={cn(
                  "px-2 py-1.5 transition-colors duration-150",
                  isDark
                    ? "bg-primary text-black"
                    : "text-neutral-400 hover:text-neutral-600"
                )}
              >
                <span className="material-symbols-outlined text-xs leading-none" aria-hidden="true">
                  dark_mode
                </span>
              </span>
            </>
          ) : (
            <span className="w-[68px] h-[30px] block" />
          )}
        </button>

        {/* CTA */}
        <a
          href="#contact"
          className={cn(
            "text-[11px] px-4 py-1.5 font-bold uppercase tracking-wider transition-all duration-150",
            "bg-primary text-black hover:bg-white hover:text-black",
            "dark:hover:bg-neutral-200"
          )}
        >
          Execute_Hire.sh
        </a>
      </div>
    </nav>
  );
}
