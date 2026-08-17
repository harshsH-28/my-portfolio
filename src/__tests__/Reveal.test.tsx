import { Reveal } from "@/components/Reveal";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("Reveal", () => {
  it("renders children", () => {
    render(
      <Reveal>
        <p>hello</p>
      </Reveal>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });
});
