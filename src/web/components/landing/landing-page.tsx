import { ClinicSection } from "@/components/landing/clinic-section";
import { BlogPreviewSection } from "@/components/landing/blog-preview-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { LocationSection } from "@/components/landing/location-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { MobileFloatingCta } from "@/components/landing/mobile-floating-cta";
import { SpecialtiesSection } from "@/components/landing/specialties-section";
import { TeamSection } from "@/components/landing/team-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { LandingPageContent } from "@/types/content";
import type { PostSummary } from "@/types/blog";

type LandingPageProps = {
  content: LandingPageContent;
  posts?: PostSummary[];
};

export function LandingPage({ content, posts = [] }: LandingPageProps) {
  const whatsappUrl = buildWhatsAppUrl(
    content.contact.whatsappNumber,
    content.contact.whatsappMessage,
  );

  return (
    <>
      <Header
        brand={content.brand}
        navigation={content.navigation}
        whatsappUrl={whatsappUrl}
        ctaLabel={content.hero.ctaLabel}
      />
      <main>
        <HeroSection content={content.hero} whatsappUrl={whatsappUrl} />
        <MetricsSection content={content.metrics} />
        <SpecialtiesSection content={content.specialties} />
        <TeamSection content={content.team} />
        <ClinicSection content={content.clinic} />
        <LocationSection content={content.location} contact={content.contact} />
        <BlogPreviewSection posts={posts} />
        <TestimonialsSection content={content.testimonials} />
        <FinalCtaSection content={content.finalCta} whatsappUrl={whatsappUrl} />
      </main>
      <MobileFloatingCta
        whatsappUrl={whatsappUrl}
        ctaLabel={content.hero.ctaLabel}
      />
      <Footer
        brand={content.brand}
        contact={content.contact}
        footer={content.footer}
        whatsappUrl={whatsappUrl}
      />
    </>
  );
}
