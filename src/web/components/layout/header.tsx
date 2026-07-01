import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import type { LandingPageContent } from "@/types/content";

type HeaderProps = {
  brand: LandingPageContent["brand"];
  navigation: LandingPageContent["navigation"];
  whatsappUrl: string;
  ctaLabel: string;
};

export function Header({
  brand,
  navigation,
  whatsappUrl,
  ctaLabel,
}: HeaderProps) {
  const visibleItems = navigation.filter((item) => item.visible);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(250,248,244,0.9)] backdrop-blur-xl">
      <Container className="relative flex min-h-20 items-center justify-between gap-6">
        <a
          href="#inicio"
          aria-label={`${brand.name}, voltar ao início`}
          className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
        >
          <span
            aria-hidden="true"
            className="grid size-15 place-items-center"
          >
            <img src={brand.logoUrl} alt={brand.name} className="size-full object-contain" />
          </span>
          <span className="font-editorial text-2xl tracking-[0.12em] text-[var(--brand-dark)]">
            {brand.name}
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {visibleItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--brand)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={whatsappUrl} target="_blank">
            {ctaLabel}
          </ButtonLink>
        </div>

        <MobileNavigation
          items={visibleItems}
          whatsappUrl={whatsappUrl}
          ctaLabel={ctaLabel}
        />
      </Container>
    </header>
  );
}
