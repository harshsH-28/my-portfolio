import { formatDropDate, getDrops } from "@/lib/drops";
import { describe, expect, it } from "vitest";

describe("getDrops", () => {
  it("returns drops sorted newest-first", () => {
    const drops = getDrops();
    expect(drops.length).toBeGreaterThanOrEqual(2);
    const dates = drops.map((d) => d.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it("every drop has id, title, kind, and an ISO date", () => {
    for (const drop of getDrops()) {
      expect(drop.id).toBeTruthy();
      expect(drop.title).toBeTruthy();
      expect(["project", "note", "post", "release"]).toContain(drop.kind);
      expect(drop.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("formatDropDate", () => {
  it("formats an ISO date as 'Mon DD, YYYY'", () => {
    expect(formatDropDate("2026-07-12")).toBe("Jul 12, 2026");
  });
});
