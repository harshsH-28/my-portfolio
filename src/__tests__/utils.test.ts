import { cn } from "@/lib/utils";
import { describe, expect, it } from "vitest";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "ignored", "active")).toBe("base active");
  });

  it("resolves Tailwind conflicts (last value wins)", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("handles undefined and null gracefully", () => {
    expect(cn("base", undefined, null)).toBe("base");
  });

  it("handles object syntax", () => {
    expect(cn({ "text-primary": true, "text-white": false })).toBe("text-primary");
  });
});
