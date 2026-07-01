import {
  Baby,
  HeartPulse,
  PersonStanding,
  Sparkles,
  Utensils,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageContent, Specialty } from "@/types/content";

const icons = {
  baby: Baby,
  heart: HeartPulse,
  sparkles: Sparkles,
  person: PersonStanding,
  nutrition: Utensils,
};

type SpecialtiesSectionProps = {
  content: LandingPageContent["specialties"];
};

export function SpecialtiesSection({ content }: SpecialtiesSectionProps) {
  if (!content.enabled || content.items.length === 0) {
    return null;
  }

  return (
    <section
      id="especialidades"
      aria-labelledby="specialties-title"
      className="section-space scroll-mt-24"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="specialties-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
          />
        </Reveal>

        <div className="mobile-stagger-grid mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
          {content.items.map((item, index) => (
            <SpecialtyCard
              key={item.id}
              item={item}
              index={index}
              className={
                content.items.length === 5 && index >= 3
                  ? "lg:col-span-3"
                  : "lg:col-span-2"
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SpecialtyCard({
  item,
  index,
  className,
}: {
  item: Specialty;
  index: number;
  className: string;
}) {
  const Icon = icons[item.icon];

  return (
    <Reveal delay={(index % 3) * 0.08} className={className}>
      <article className="mobile-specialty-card group h-full min-h-[12.5rem] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-white p-3.5 transition duration-300 hover:-translate-y-1 hover:border-[var(--brand-light)] hover:shadow-[var(--shadow-md)] sm:min-h-72 sm:p-8">
        <span className="grid size-10 place-items-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)] transition duration-300 group-hover:scale-110 sm:size-12">
          <Icon aria-hidden="true" className="size-5" />
        </span>
        <h3 className="mt-4 overflow-wrap-anywhere font-editorial text-[1.05rem] leading-[1.08] text-[var(--ink)] sm:mt-8 sm:text-3xl sm:leading-tight">
          {item.title}
        </h3>
        <p className="mobile-line-clamp mt-2 text-xs leading-5 text-[var(--muted)] sm:mt-4 sm:text-base sm:leading-7">
          {item.description}
        </p>
      </article>
    </Reveal>
  );
}
