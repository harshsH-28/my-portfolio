import AchievementsPage from "@/app/achievements/page";
import { ACHIEVEMENTS, SKILLS } from "@/lib/portfolio-data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("AchievementsPage", () => {
  it("renders the page title", () => {
    render(<AchievementsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Skills & achievements.");
  });

  it("renders every skill group label and item", () => {
    render(<AchievementsPage />);
    for (const group of SKILLS) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
      for (const item of group.items) {
        expect(screen.getAllByText(item).length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("renders every achievement with year, title, and description", () => {
    render(<AchievementsPage />);
    for (const achievement of ACHIEVEMENTS) {
      expect(screen.getByText(achievement.title)).toBeInTheDocument();
      expect(screen.getByText(achievement.description)).toBeInTheDocument();
      expect(screen.getAllByText(achievement.year).length).toBeGreaterThanOrEqual(1);
    }
  });
});
