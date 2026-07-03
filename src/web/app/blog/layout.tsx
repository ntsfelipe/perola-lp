import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { contentProvider } from "@/content/providers/static-content-provider";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LinkContent, NavigationItem } from "@/types/content";

function linkToHome(href: string): string {
  return href.startsWith("#") ? `/${href}` : href;
}

function mapNavigation(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => ({ ...item, href: linkToHome(item.href) }));
}

function mapLinks(items: LinkContent[]): LinkContent[] {
  return items.map((item) => ({ ...item, href: linkToHome(item.href) }));
}

export default async function BlogLayout({ children }: { children: ReactNode }) {
  const content = await contentProvider.getLandingPage();
  const whatsappUrl = buildWhatsAppUrl(
    content.contact.whatsappNumber,
    content.contact.whatsappMessage,
  );
  const footer = {
    ...content.footer,
    serviceLinks: mapLinks(content.footer.serviceLinks),
    institutionalLinks: mapLinks(content.footer.institutionalLinks),
  };

  return (
    <>
      <Header
        brand={content.brand}
        navigation={mapNavigation(content.navigation)}
        whatsappUrl={whatsappUrl}
        ctaLabel={content.hero.ctaLabel}
        homeHref="/"
      />
      {children}
      <Footer
        brand={content.brand}
        contact={content.contact}
        footer={footer}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}
