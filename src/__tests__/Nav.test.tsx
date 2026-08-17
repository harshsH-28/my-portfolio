import { Nav } from "@/components/Nav";
import { NAV_LINKS } from "@/lib/portfolio-data";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

// biome-ignore lint/suspicious/noExplicitAny: test-global escape hatch
const usePathnameMock = (globalThis as any).__usePathnameMock;

describe("Nav", () => {
  it("renders all nav links lowercase", () => {
    usePathnameMock.mockReturnValue("/");
    render(<Nav />);
    for (const link of NAV_LINKS) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
    }
  });

  it("marks only the active route with aria-current", () => {
    usePathnameMock.mockReturnValue("/experience");
    render(<Nav />);
    expect(screen.getByRole("link", { name: "experience" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("link", { name: "home" })).not.toHaveAttribute("aria-current");
  });

  it("opens the ask dialog from the ask button", async () => {
    usePathnameMock.mockReturnValue("/");
    const { container } = render(<Nav />);
    const dialog = container.querySelector("dialog") as HTMLDialogElement;
    expect(dialog).not.toHaveAttribute("open");
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "ask" }));
    });
    expect(dialog).toHaveAttribute("open");
  });
});
