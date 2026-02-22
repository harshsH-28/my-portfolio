import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ContactSection } from "@/components/ContactSection";
import { SOCIAL_LINKS } from "@/lib/portfolio-data";

describe("ContactSection — structure", () => {
  it("renders the section heading", () => {
    render(<ContactSection />);
    expect(screen.getByText(/Let's collaborate/i)).toBeInTheDocument();
  });

  it("renders the email input field with correct type", () => {
    render(<ContactSection />);
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("renders the message textarea", () => {
    render(<ContactSection />);
    expect(screen.getByPlaceholderText(/Brief message/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactSection />);
    expect(screen.getByText(/Execute_Send/i)).toBeInTheDocument();
  });

  it("renders all social links", () => {
    render(<ContactSection />);
    SOCIAL_LINKS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("email label is associated with the email input", () => {
    render(<ContactSection />);
    const label = screen.getByText(/Input_Email:/i);
    const input = screen.getByPlaceholderText(/your@email\.com/i);
    expect(label.closest("div")).toContainElement(input);
  });

  it("renders section with correct id for navigation", () => {
    const { container } = render(<ContactSection />);
    expect(container.querySelector("#contact")).toBeInTheDocument();
  });
});

describe("ContactSection — synchronous validation", () => {
  it("shows 'Email is required' when submitting with empty email", async () => {
    render(<ContactSection />);
    const submitBtn = screen.getByText(/Execute_Send/i).closest("button")!;
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  });

  it("shows 'Message is required' when submitting with empty message and valid email", async () => {
    render(<ContactSection />);
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    const submitBtn = screen.getByText(/Execute_Send/i).closest("button")!;

    // Set email value via DOM property and fire both input + change events
    await act(async () => {
      (emailInput as HTMLInputElement).value = "test@example.com";
      fireEvent.input(emailInput, {
        target: { name: "email", value: "test@example.com" },
      });
      fireEvent.change(emailInput, {
        target: { name: "email", value: "test@example.com" },
      });
    });
    await act(async () => {
      fireEvent.click(submitBtn);
    });

    expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
  });

  it("submit button is enabled by default", () => {
    render(<ContactSection />);
    const submitBtn = screen.getByText(/Execute_Send/i).closest("button")!;
    expect(submitBtn).not.toBeDisabled();
  });

  it("submit button has type=submit", () => {
    render(<ContactSection />);
    const submitBtn = screen.getByText(/Execute_Send/i).closest("button")!;
    expect(submitBtn).toHaveAttribute("type", "submit");
  });
});

describe("ContactSection — form accessibility", () => {
  it("email input has aria-invalid=false initially", () => {
    render(<ContactSection />);
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    expect(emailInput).toHaveAttribute("aria-invalid", "false");
  });

  it("email input has aria-invalid=true after invalid submit", async () => {
    render(<ContactSection />);
    const submitBtn = screen.getByText(/Execute_Send/i).closest("button")!;
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    const emailInput = screen.getByPlaceholderText(/your@email\.com/i);
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
  });

  it("error messages have role=alert", async () => {
    render(<ContactSection />);
    const submitBtn = screen.getByText(/Execute_Send/i).closest("button")!;
    await act(async () => {
      fireEvent.click(submitBtn);
    });
    const alerts = screen.getAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(1);
  });
});
