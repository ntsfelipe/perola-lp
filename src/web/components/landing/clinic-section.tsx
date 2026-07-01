import { DoorOpen, FlaskConical, HeartHandshake } from "lucide-react";

import { Container } from "@/components/ui/container";
import { ImageCarousel } from "@/components/ui/image-carousel";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Feature, LandingPageContent } from "@/types/content";

const icons = {
  heart: HeartHandshake,
  door: DoorOpen,
  science: FlaskConical,
  check: HeartHandshake,
};

type ClinicSectionProps = {
  content: LandingPageContent["clinic"];
};

export function ClinicSection({ content }: ClinicSectionProps) {
  if (!content.enabled) {
    return null;
  }

  return (
    <section
      id="clinica"
      aria-labelledby="clinic-title"
      className="section-space scroll-mt-24"
    >
      <Container className="grid items-center gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {content.gallery.length > 0 ? (
          <Reveal delay={0.1} className="order-first min-w-0 lg:order-last">
            <div className="relative mx-auto w-full max-w-md sm:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 bg-[linear-gradient(135deg,var(--brand-soft),var(--lavender-soft))] sm:rounded-[calc(var(--radius-lg)+1rem)] lg:-inset-4"
              />
              <ImageCarousel
                images={content.gallery}
                ariaLabel="Fotos da clínica"
                className="sm:rounded-[var(--radius-lg)]"
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal className="min-w-0">
          <SectionHeading
            id="clinic-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
          {content.features.length > 0 ? (
            <div className="-mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:mt-10 lg:grid lg:overflow-visible">
              {content.features.map((feature) => (
                <ClinicFeature key={feature.id} feature={feature} />
              ))}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

function ClinicFeature({ feature }: { feature: Feature }) {
  const Icon = icons[feature.icon];

  return (
    <div className="flex min-w-[16.5rem] gap-4 rounded-lg bg-white/80 p-4 shadow-sm lg:min-w-0 lg:bg-transparent lg:p-0 lg:shadow-none">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--lavender-soft)] text-[var(--lavender-dark)]">
        <Icon aria-hidden="true" className="size-5" />
      </span>
      <div>
        <h3 className="font-editorial text-2xl text-[var(--ink)]">
          {feature.title}
        </h3>
        <p className="mt-1 leading-7 text-[var(--muted)]">{feature.description}</p>
      </div>
    </div>
  );
}
