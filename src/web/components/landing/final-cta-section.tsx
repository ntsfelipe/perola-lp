import { MessageCircleHeart } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { LandingPageContent } from "@/types/content";

type FinalCtaSectionProps = {
  content: LandingPageContent["finalCta"];
  whatsappUrl: string;
};

export function FinalCtaSection({ content, whatsappUrl }: FinalCtaSectionProps) {
  if (!content.enabled) {
    return null;
  }

  return (
    <section className="section-space">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,var(--brand-soft),var(--lavender-soft))] px-6 py-14 text-center sm:px-12 sm:py-20">
            <div aria-hidden="true" className="cta-ring cta-ring-one" />
            <div aria-hidden="true" className="cta-ring cta-ring-two" />
            <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-white text-[var(--brand)] shadow-sm">
              <MessageCircleHeart aria-hidden="true" className="size-6" />
            </span>
            {content.eyebrow ? <p className="eyebrow relative mt-6">{content.eyebrow}</p> : null}
            <h2 className="relative mx-auto mt-4 max-w-3xl font-editorial text-4xl leading-tight text-[var(--ink)] sm:text-6xl">
              {content.title}
            </h2>
            {content.description ? (
              <p className="relative mx-auto mt-5 max-w-2xl leading-7 text-[var(--muted)]">
                {content.description}
              </p>
            ) : null}
            <ButtonLink href={whatsappUrl} target="_blank" className="relative mt-8">
              {content.ctaLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
