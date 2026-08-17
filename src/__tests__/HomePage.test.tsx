import HomePage from "@/app/page";
import { BIO, GREETING, SOCIAL_LINKS } from "@/lib/portfolio-data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("HomePage", () => {
  it("renders the serif greeting as the page heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(GREETING);
  });

  it("renders the bio", () => {
    render(<HomePage />);
    expect(screen.getByText(BIO)).toBeInTheDocument();
  });

  it("renders every social link", () => {
    render(<HomePage />);
    for (const social of SOCIAL_LINKS) {
      expect(screen.getByRole("link", { name: new RegExp(social.label) })).toHaveAttribute(
        "href",
        social.href
      );
    }
  });

  it("renders the let's talk closing line", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /let's talk/ })).toBeInTheDocument();
  });
});
