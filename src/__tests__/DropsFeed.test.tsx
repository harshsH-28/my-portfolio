import { DropsFeed } from "@/components/DropsFeed";
import type { Drop } from "@/lib/drops";
import { formatDropDate, getDrops } from "@/lib/drops";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/drops", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/drops")>();
  return {
    ...actual,
    getDrops: vi.fn(actual.getDrops),
  };
});

const mockedGetDrops = vi.mocked(getDrops);

afterEach(() => {
  mockedGetDrops.mockRestore();
});

describe("DropsFeed", () => {
  it("renders the DROPS label", () => {
    render(<DropsFeed />);
    expect(screen.getByText("Drops")).toBeInTheDocument();
  });

  it("renders each drop with formatted date and title", () => {
    render(<DropsFeed />);
    for (const drop of getDrops().slice(0, 4)) {
      expect(screen.getByText(drop.title)).toBeInTheDocument();
      expect(screen.getByText(formatDropDate(drop.date))).toBeInTheDocument();
    }
  });

  it("hides the more button when 4 or fewer drops exist", () => {
    render(<DropsFeed />);
    if (getDrops().length <= 4) {
      expect(screen.queryByText("more ↓")).not.toBeInTheDocument();
    }
  });

  it("shows only 4 drops until 'more' is clicked, then reveals the rest", async () => {
    const many: Drop[] = Array.from({ length: 5 }, (_, i) => ({
      id: `drop-${i}`,
      date: `2026-01-0${i + 1}`,
      kind: "note",
      title: `Extra Drop ${i}`,
    }));
    mockedGetDrops.mockReturnValue(many);

    render(<DropsFeed />);
    expect(screen.getAllByText(/^Extra Drop \d$/)).toHaveLength(4);
    expect(screen.getByText("more ↓")).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText("more ↓"));
    });

    expect(screen.getAllByText(/^Extra Drop \d$/)).toHaveLength(5);
    expect(screen.queryByText("more ↓")).not.toBeInTheDocument();
  });
});
