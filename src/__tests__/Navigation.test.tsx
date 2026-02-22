import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navigation } from "@/components/Navigation";
import { NAV_LINKS } from "@/lib/portfolio-data";

// next-themes mock is handled globally in setup.ts
describe("Navigation", () => {
  it("renders the system version badge", () => {
    render(<Navigation />);
    expect(screen.getByText(/DEV-OS v1\.0\.5/i)).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    render(<Navigation />);
    NAV_LINKS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("renders the hire CTA button", () => {
    render(<Navigation />);
    expect(screen.getByText(/Execute_Hire\.sh/i)).toBeInTheDocument();
  });

  it("all nav links have correct href attributes", () => {
    render(<Navigation />);
    NAV_LINKS.forEach(({ label, href }) => {
      const link = screen.getByText(label).closest("a");
      expect(link).toHaveAttribute("href", href);
    });
  });

  it("hire button links to #contact section", () => {
    render(<Navigation />);
    const cta = screen.getByText(/Execute_Hire\.sh/i).closest("a");
    expect(cta).toHaveAttribute("href", "#contact");
  });

  it("renders theme toggle button", () => {
    render(<Navigation />);
    const toggleBtn = screen.getByRole("button", { name: /toggle theme/i });
    expect(toggleBtn).toBeInTheDocument();
  });

  it("theme toggle button is clickable", () => {
    render(<Navigation />);
    const toggleBtn = screen.getByRole("button", { name: /toggle theme/i });
    expect(() => fireEvent.click(toggleBtn)).not.toThrow();
  });

  it("navigation has correct aria-label", () => {
    render(<Navigation />);
    expect(
      screen.getByRole("navigation", { name: /primary navigation/i })
    ).toBeInTheDocument();
  });
});
