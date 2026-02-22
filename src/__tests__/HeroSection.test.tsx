import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/HeroSection";

describe("HeroSection", () => {
  it("renders the hero headline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Crafting/i)).toBeInTheDocument();
    expect(screen.getByText(/Intelligence/i)).toBeInTheDocument();
    expect(screen.getByText(/Into Reality/i)).toBeInTheDocument();
  });

  it("renders the system init status indicator", () => {
    render(<HeroSection />);
    expect(screen.getByText(/system_init/i)).toBeInTheDocument();
  });

  it("renders the primary CTA button", () => {
    render(<HeroSection />);
    expect(screen.getByText(/talk_to_digital_twin\.bin/i)).toBeInTheDocument();
  });

  it("renders the projects CTA button", () => {
    render(<HeroSection />);
    expect(screen.getByText(/ls \.\/projects/i)).toBeInTheDocument();
  });

  it("renders the ASCII avatar area", () => {
    render(<HeroSection />);
    expect(screen.getByText(/AVATAR\.IMG/i)).toBeInTheDocument();
  });

  it("renders system status readouts", () => {
    render(<HeroSection />);
    expect(screen.getByText(/ROOT_USER_DETECTED/i)).toBeInTheDocument();
    expect(screen.getByText(/SENSORS: ONLINE/i)).toBeInTheDocument();
    expect(screen.getByText(/AI_CORE: STABLE/i)).toBeInTheDocument();
  });

  it("renders the descriptive tagline", () => {
    render(<HeroSection />);
    expect(
      screen.getByText(/immersive web experiences powered by generative AI/i)
    ).toBeInTheDocument();
  });
});
