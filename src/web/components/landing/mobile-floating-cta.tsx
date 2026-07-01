"use client";

import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";

type MobileFloatingCtaProps = {
  whatsappUrl: string;
  ctaLabel: string;
};

export function MobileFloatingCta({
  whatsappUrl,
  ctaLabel,
}: MobileFloatingCtaProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 lg:hidden">
      {isOpen ? (
        <div className="mb-3 w-[min(18rem,calc(100vw-2.5rem))] rounded-lg border border-white/60 bg-white p-3 shadow-[var(--shadow-lg)]">
          <ButtonLink
            href={whatsappUrl}
            target="_blank"
            className="w-full justify-center"
            onClick={() => setIsOpen(false)}
          >
            {ctaLabel}
          </ButtonLink>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar agendamento" : "Abrir agendamento"}
        onClick={() => setIsOpen((current) => !current)}
        className="mobile-floating-cta-button ml-auto grid size-14 place-items-center rounded-full bg-[var(--brand)] text-white shadow-[0_16px_38px_rgba(21,86,90,0.28)] transition hover:bg-[var(--brand-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <MessageCircle aria-hidden="true" className="size-6" />
        )}
      </button>
    </div>
  );
}
