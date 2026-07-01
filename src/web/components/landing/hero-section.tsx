import { Sparkles } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import type { LandingPageContent } from "@/types/content";

type HeroSectionProps = {
  content: LandingPageContent["hero"];
  whatsappUrl: string;
};

export function HeroSection({ content, whatsappUrl }: HeroSectionProps) {
  if (!content.enabled) {
    return null;
  }

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pb-24 lg:pt-20"
    >
      <div aria-hidden="true" className="hero-orb hero-orb-one" />
      <div aria-hidden="true" className="hero-orb hero-orb-two" />
      <Container className="relative grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
        <Reveal className="order-1">
          <div className="max-w-2xl">
            {content.eyebrow ? (
              <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-[var(--brand-soft)] px-4 py-2">
                <Sparkles aria-hidden="true" className="size-3.5" />
                {content.eyebrow}
              </p>
            ) : null}
            <h1
              id="hero-title"
              className="mt-7 font-editorial text-[clamp(3.2rem,12vw,6.5rem)] leading-[0.88] tracking-[-0.045em] text-[var(--ink)] lg:text-[4.85rem]"
            >
              {content.title}{" "}
              <em className="block pt-2 font-normal text-[var(--brand)]">
                {content.titleAccent}
              </em>
            </h1>
            {content.description ? (
              <p className="mt-7 max-w-xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                {content.description}
              </p>
            ) : null}
            <ButtonLink
              href={whatsappUrl}
              target="_blank"
              className="mt-8"
            >
              {content.ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative order-2 mx-auto hidden w-full max-w-[600px] lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(223,199,246,0.7),rgba(200,239,239,0.1)_62%,transparent_70%)] blur-2xl"
          />
          <ImagePlaceholder
            image={content.image}
            priority
            className="relative rounded-none bg-transparent"
            imageClassName="object-contain"
          />
        </Reveal>
      </Container>
    </section>
  );
}
