import { MapPin } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageContent } from "@/types/content";

type LocationSectionProps = {
  content: LandingPageContent["location"];
  contact: LandingPageContent["contact"];
};

export function LocationSection({ content, contact }: LocationSectionProps) {
  if (!content.enabled) {
    return null;
  }

  return (
    <section
      id="localizacao"
      aria-labelledby="location-title"
      className="scroll-mt-24 bg-[var(--surface-alt)] py-14 text-[var(--ink)] sm:py-16 lg:py-[4.5rem]"
    >
      <Container>
        <Reveal className="mx-auto max-w-5xl">
          <div className="grid gap-7 lg:grid-cols-[minmax(220px,310px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:items-end lg:gap-x-10 lg:gap-y-6">
            {content.images.length > 0 ? (
              <ImageCarousel
                images={content.images}
                ariaLabel="Fotos da localizacao"
                aspectRatio="9 / 16"
                buttonClassName="text-[var(--lavender-dark)] focus-visible:outline-[var(--lavender-dark)]"
                className="order-2 mx-auto w-full max-w-[230px] sm:max-w-[270px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-[290px]"
              />
            ) : null}

            <div className="order-1 border-y border-[var(--line)] py-7 lg:col-start-2 lg:row-start-1 lg:border-b-0 lg:border-t">
              <SectionHeading
                id="location-title"
                eyebrow={content.eyebrow}
                title={content.title}
                description={content.description}
                className="max-w-2xl [&_.eyebrow]:text-[var(--lavender-dark)]"
              />
            </div>

            <div className="order-3 rounded-lg bg-[var(--surface)] p-5 shadow-[var(--shadow-sm)] lg:col-start-2 lg:row-start-2 lg:mb-4 lg:max-w-md">
              <div className="flex gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--lavender-soft)] text-[var(--lavender-dark)]">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <p className="pt-1 text-sm font-semibold uppercase leading-6 tracking-[0.08em] text-[var(--ink)]">
                  {contact.address}
                </p>
              </div>
              <ButtonLink
                href={contact.mapUrl}
                target="_blank"
                variant="secondary"
                className="mt-5 w-full justify-center border-[var(--lavender-dark)] text-[var(--lavender-dark)] hover:bg-[var(--lavender-soft)] focus-visible:outline-[var(--lavender-dark)] sm:w-auto"
              >
                {content.ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
