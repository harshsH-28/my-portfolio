import { DROPS } from "@/lib/portfolio-data";

export type DropKind = "project" | "note" | "post" | "release";

export type Drop = {
  id: string;
  /** ISO date, e.g. "2026-07-12" */
  date: string;
  title: string;
  description?: string;
  href?: string;
  kind: DropKind;
};

/**
 * Single accessor for the Drops feed. Phase 2 (the /studio + DB plan)
 * swaps this implementation for a database read — callers never change.
 */
export function getDrops(): readonly Drop[] {
  return [...DROPS].sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDropDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
