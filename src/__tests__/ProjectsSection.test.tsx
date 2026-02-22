import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "@/components/ProjectsSection";
import { PROJECTS } from "@/lib/portfolio-data";

describe("ProjectsSection", () => {
  it("renders the PORTFOLIO watermark", () => {
    render(<ProjectsSection />);
    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();
  });

  it("renders the CLI command header", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/ls -l \.\/active_projects/i)).toBeInTheDocument();
  });

  it("renders all project titles", () => {
    render(<ProjectsSection />);
    PROJECTS.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders project visibility badges", () => {
    render(<ProjectsSection />);
    PROJECTS.forEach(({ visibility }) => {
      expect(screen.getByText(visibility)).toBeInTheDocument();
    });
  });

  it("renders More Details links for all projects", () => {
    render(<ProjectsSection />);
    const links = screen.getAllByText(/\[\+\] More Details/i);
    expect(links).toHaveLength(PROJECTS.length);
  });

  it("renders the archived projects CLI prompt", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/ls -a projects\/archived/i)).toBeInTheDocument();
  });

  it("renders project index numbers", () => {
    render(<ProjectsSection />);
    PROJECTS.forEach(({ index }) => {
      expect(screen.getByText(index)).toBeInTheDocument();
    });
  });

  it("renders section with correct id for navigation", () => {
    const { container } = render(<ProjectsSection />);
    const section = container.querySelector("#projects");
    expect(section).toBeInTheDocument();
  });
});
