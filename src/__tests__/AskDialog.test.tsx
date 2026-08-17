import { AskDialog } from "@/components/AskDialog";
import { ASK_SUGGESTIONS } from "@/lib/portfolio-data";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Stable mock return object installed by setup.ts
// biome-ignore lint/suspicious/noExplicitAny: test-global escape hatch
const chat = (globalThis as any).__useChatReturn;

describe("AskDialog", () => {
  it("shows the input and suggestion chips when open with no messages", () => {
    render(<AskDialog open onClose={vi.fn()} />);
    expect(screen.getByPlaceholderText("ask me anything…")).toBeInTheDocument();
    for (const suggestion of ASK_SUGGESTIONS) {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    }
  });

  it("sends the typed question on submit", async () => {
    chat.sendMessage.mockClear();
    render(<AskDialog open onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText("ask me anything…");
    await act(async () => {
      fireEvent.change(input, { target: { value: "what do you build?" } });
    });
    await act(async () => {
      fireEvent.submit(input.closest("form") as HTMLFormElement);
    });
    expect(chat.sendMessage).toHaveBeenCalledWith({ text: "what do you build?" });
  });

  it("sends a suggestion when its chip is clicked", async () => {
    chat.sendMessage.mockClear();
    render(<AskDialog open onClose={vi.fn()} />);
    await act(async () => {
      fireEvent.click(screen.getByText(ASK_SUGGESTIONS[0]));
    });
    expect(chat.sendMessage).toHaveBeenCalledWith({ text: ASK_SUGGESTIONS[0] });
  });
});
