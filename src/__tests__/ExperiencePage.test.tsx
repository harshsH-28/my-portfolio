import ExperiencePage from "@/app/experience/page";
import { EXPERIENCES, RESUME_URL } from "@/lib/portfolio-data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ExperiencePage", () => {
  it("renders the page title", () => {
    render(<ExperiencePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Where I've been.");
  });

  it("renders every experience entry with role, company, period, and tags", () => {
    render(<ExperiencePage />);
    for (const exp of EXPERIENCES) {
      expect(screen.getByText(exp.title)).toBeInTheDocument();
      expect(screen.getByText(exp.company)).toBeInTheDocument();
      expect(screen.getByText(exp.period)).toBeInTheDocument();
      for (const tag of exp.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("omits the résumé link when RESUME_URL is null", () => {
    render(<ExperiencePage />);
    if (RESUME_URL === null) {
      expect(screen.queryByText(/résumé/)).not.toBeInTheDocument();
    }
  });
});
