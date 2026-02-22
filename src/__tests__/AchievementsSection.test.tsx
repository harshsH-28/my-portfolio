import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AchievementsSection } from "@/components/AchievementsSection";
import { ACHIEVEMENTS } from "@/lib/portfolio-data";

describe("AchievementsSection", () => {
  it("renders the section heading", () => {
    render(<AchievementsSection />);
    expect(screen.getByText(/Achievement Log/i)).toBeInTheDocument();
  });

  it("renders all achievement titles", () => {
    render(<AchievementsSection />);
    ACHIEVEMENTS.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders achievement period badges", () => {
    render(<AchievementsSection />);
    ACHIEVEMENTS.forEach(({ period }) => {
      expect(screen.getByText(period)).toBeInTheDocument();
    });
  });

  it("renders achievement organisations", () => {
    render(<AchievementsSection />);
    ACHIEVEMENTS.forEach(({ org }) => {
      expect(screen.getByText(org)).toBeInTheDocument();
    });
  });

  it("renders section with correct id for navigation", () => {
    const { container } = render(<AchievementsSection />);
    const section = container.querySelector("#achievements");
    expect(section).toBeInTheDocument();
  });

  it("featured achievement has highlighted styling", () => {
    const { container } = render(<AchievementsSection />);
    // The first achievement (featured) should have bg-primary class
    const featuredEl = container.querySelector(".bg-primary");
    expect(featuredEl).toBeInTheDocument();
  });
});
