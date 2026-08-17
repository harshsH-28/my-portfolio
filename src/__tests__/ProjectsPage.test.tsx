import ProjectsPage from "@/app/projects/page";
import { PROJECTS } from "@/lib/portfolio-data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ProjectsPage", () => {
  it("renders the page title", () => {
    render(<ProjectsPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Selected work.");
  });

  it("renders every project with title, description, and tags", () => {
    render(<ProjectsPage />);
    for (const project of PROJECTS) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      expect(screen.getByText(project.description)).toBeInTheDocument();
      for (const tag of project.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("links code ↗ only for projects with a repo", () => {
    render(<ProjectsPage />);
    const withRepo = PROJECTS.filter((p) => p.repo !== null).length;
    expect(screen.queryAllByText("code ↗")).toHaveLength(withRepo);
  });
});
