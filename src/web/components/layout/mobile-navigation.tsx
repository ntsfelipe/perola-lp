"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import type { NavigationItem } from "@/types/content";

type MobileNavigationProps = {
  items: NavigationItem[];
  whatsappUrl: string;
  ctaLabel: string;
};

export function MobileNavigation({
  items,
  whatsappUrl,
  ctaLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    firstLinkRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setIsOpen((current) => !current)}
        className="grid size-12 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-panel"
          className="absolute inset-x-4 top-[calc(100%+0.75rem)] rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow-lg)]"
        >
          <nav aria-label="Navegação mobile">
            <ul className="grid gap-1">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex min-h-12 items-center rounded-xl px-4 font-medium text-[var(--ink)] transition hover:bg-[var(--brand-soft)] focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href={whatsappUrl}
            target="_blank"
            className="mt-4 w-full"
            onClick={closeMenu}
          >
            {ctaLabel}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );
}
