import { SITE_CONFIG } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * Footer — kernel version and copyright.
 * Server component — no client interactivity needed.
 */
export function Footer() {
  return (
    <footer
      className={cn(
        "p-6 sm:p-12 border-t text-center text-neutral-500 text-[10px] uppercase tracking-[0.1em] sm:tracking-[0.2em]",
        "border-black/10 dark:border-white/10"
      )}
    >
      <p>
        © {SITE_CONFIG.year} Gen AI Developer. Kernel Version{" "}
        {SITE_CONFIG.kernelVersion}. Refined for Hybrid Environments.
      </p>
    </footer>
  );
}
