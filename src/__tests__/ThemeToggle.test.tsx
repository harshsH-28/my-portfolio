import { ThemeToggle } from "@/components/ThemeToggle";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("ThemeToggle", () => {
  it("offers the opposite theme as a mono text button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toHaveTextContent("[light]");
  });
});
