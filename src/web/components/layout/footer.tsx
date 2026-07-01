import { Instagram, MapPin, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { LandingPageContent } from "@/types/content";

type FooterProps = {
  brand: LandingPageContent["brand"];
  contact: LandingPageContent["contact"];
  footer: LandingPageContent["footer"];
  whatsappUrl: string;
};

export function Footer({
  brand,
  contact,
  footer,
  whatsappUrl,
}: FooterProps) {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface-alt)] py-14 sm:py-20">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <p className="font-editorial text-3xl tracking-[0.1em] text-[var(--brand-dark)]">
              {brand.name}
            </p>
            <p className="mt-5 max-w-xs leading-7 text-[var(--muted)]">
              {footer.description}
            </p>
          </div>

          <FooterLinks title="Serviços" links={footer.serviceLinks} />
          <FooterLinks title="Institucional" links={footer.institutionalLinks} />

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--ink)]">
              Contato
            </h2>
            <div className="mt-5 grid gap-4 text-sm text-[var(--muted)]">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center gap-3 hover:text-[var(--brand)]"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                WhatsApp
              </a>
              <a
                href={contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 hover:text-[var(--brand)]"
              >
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                <span>{contact.address}</span>
              </a>
              {contact.instagramUrl ? (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center gap-3 hover:text-[var(--brand)]"
                >
                  <Instagram aria-hidden="true" className="size-5" />
                  Instagram
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--line)] pt-7 text-center text-xs tracking-wide text-[var(--muted)]">
          {footer.copyright}
        </div>
      </Container>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: LandingPageContent["footer"]["serviceLinks"];
}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--ink)]">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <a
              href={link.href}
              className="text-sm text-[var(--muted)] transition hover:text-[var(--brand)]"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
