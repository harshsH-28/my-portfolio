import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EXPERIENCES, STATS } from "@/lib/portfolio-data";

describe("ExperienceSection", () => {
  it("renders the section heading", () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/Experience Log/i)).toBeInTheDocument();
  });

  it("renders all experience entries", () => {
    render(<ExperienceSection />);
    EXPERIENCES.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders company names for each experience", () => {
    render(<ExperienceSection />);
    EXPERIENCES.forEach(({ company }) => {
      expect(screen.getByText(company)).toBeInTheDocument();
    });
  });

  it("renders period badges for each experience", () => {
    render(<ExperienceSection />);
    EXPERIENCES.forEach(({ period }) => {
      expect(screen.getByText(period)).toBeInTheDocument();
    });
  });

  it("renders all stats", () => {
    render(<ExperienceSection />);
    STATS.forEach(({ value, label }) => {
      expect(screen.getByText(value)).toBeInTheDocument();
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders section with correct id for navigation", () => {
    const { container } = render(<ExperienceSection />);
    const section = container.querySelector("#work");
    expect(section).toBeInTheDocument();
  });
});
