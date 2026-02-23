import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AskMeAnything } from "@/components/AskMeAnything";
import { AI_CHAT_INTRO } from "@/lib/portfolio-data";

describe("AskMeAnything", () => {
  it("renders the section heading", () => {
    render(<AskMeAnything />);
    expect(screen.getByText(/Ask Me Anything/i)).toBeInTheDocument();
  });

  it("renders the terminal window decorations (traffic-light dots)", () => {
    const { container } = render(<AskMeAnything />);
    // Three traffic light dots
    const dots = container.querySelectorAll(".rounded-full");
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });

  it("renders AI greeting message", () => {
    render(<AskMeAnything />);
    expect(screen.getByText(AI_CHAT_INTRO.aiGreeting)).toBeInTheDocument();
  });

  it("renders a sample guest question", () => {
    render(<AskMeAnything />);
    expect(
      screen.getByText(AI_CHAT_INTRO.guestQuestion)
    ).toBeInTheDocument();
  });

  it("renders the input field for user queries", () => {
    render(<AskMeAnything />);
    const input = screen.getByPlaceholderText(/Ask about my tech stack/i);
    expect(input).toBeInTheDocument();
  });

  it("accepts user input in the query field", () => {
    render(<AskMeAnything />);
    const input = screen.getByPlaceholderText(
      /Ask about my tech stack/i
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "What is your stack?" } });
    expect(input.value).toBe("What is your stack?");
  });

  it("does not show typing indicator when not loading", () => {
    const { container } = render(<AskMeAnything />);
    // The cursor only appears while status === "submitted" (waiting for AI response)
    const cursor = container.querySelector(".animate-blink");
    expect(cursor).not.toBeInTheDocument();
  });

  it("renders the shell session label", () => {
    render(<AskMeAnything />);
    expect(screen.getByText(/DigitalTwin\.session/i)).toBeInTheDocument();
  });

  it("renders section with correct id for navigation", () => {
    const { container } = render(<AskMeAnything />);
    const section = container.querySelector("#about");
    expect(section).toBeInTheDocument();
  });
});
