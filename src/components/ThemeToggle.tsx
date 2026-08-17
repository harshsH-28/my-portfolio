"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** Mono text theme switch: shows the theme you'd switch to. */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="font-mono text-[13px] tracking-[0.05em] text-ink-faint transition-colors hover:text-ink"
    >
      {mounted ? (isDark ? "[light]" : "[dark]") : "[ ]"}
    </button>
  );
}
