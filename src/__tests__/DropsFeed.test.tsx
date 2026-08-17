import { DropsFeed } from "@/components/DropsFeed";
import { formatDropDate, getDrops } from "@/lib/drops";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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
});
