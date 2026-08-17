import { Chip } from "@/components/Chip";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Chip", () => {
  it("renders its label text", () => {
    render(<Chip>TypeScript</Chip>);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("is pill-shaped via rounded-full", () => {
    render(<Chip>Python</Chip>);
    expect(screen.getByText("Python").className).toContain("rounded-full");
  });
});
