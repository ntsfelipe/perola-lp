import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { LandingPage } from "@/components/landing/landing-page";
import { Header } from "@/components/layout/header";
import { landingPageContent } from "@/content/landing-page";

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => true,
}));

describe("LandingPage", () => {
  it("renders a single h1 and content-driven sections", () => {
    const { container } = render(<LandingPage content={landingPageContent} />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 2, name: "Nossas especialidades" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Érica Luisa" }),
    ).toBeInTheDocument();
  });

  it("updates selected professional details from the team portraits", () => {
    render(<LandingPage content={landingPageContent} />);

    fireEvent.click(screen.getByTitle("Bianca Fernandes - Fisioterapeuta pélvica"));

    expect(
      screen.getByRole("heading", { level: 3, name: "Bianca Fernandes" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/olhar atento para cada história/i),
    ).not.toHaveLength(0);
  });

  it("renders the blog navigation when the route is available", () => {
    render(<LandingPage content={landingPageContent} />);

    expect(screen.getAllByRole("link", { name: "Blog" })).not.toHaveLength(0);
  });

  it("hides sections with empty lists", () => {
    const content = structuredClone(landingPageContent);
    content.specialties.items = [];
    content.testimonials.items = [];

    render(<LandingPage content={content} />);

    expect(
      screen.queryByRole("heading", { level: 2, name: "Nossas especialidades" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", {
        level: 2,
        name: "O que dizem nossas pacientes",
      }),
    ).not.toBeInTheDocument();
  });
});

describe("Header mobile navigation", () => {
  it("exposes accessible expanded state and closes with Escape", () => {
    render(
      <Header
        brand={landingPageContent.brand}
        navigation={landingPageContent.navigation}
        whatsappUrl="https://wa.me/5500000000000"
        ctaLabel="Agendar consulta"
      />,
    );

    const menuButton = screen.getByRole("button", { name: "Abrir menu" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);
    expect(
      screen.getByRole("button", { name: "Fechar menu" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Navegação mobile" })).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveFocus();
  });
});
