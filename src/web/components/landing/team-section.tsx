"use client";

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageContent } from "@/types/content";

type TeamSectionProps = {
  content: LandingPageContent["team"];
};

export function TeamSection({ content }: TeamSectionProps) {
  const [selectedProfessionalId, setSelectedProfessionalId] = useState(
    content.professionals[0]?.id ?? "",
  );
  const selectedProfessional = useMemo(
    () =>
      content.professionals.find(
        (professional) => professional.id === selectedProfessionalId,
      ) ?? content.professionals[0],
    [content.professionals, selectedProfessionalId],
  );
  const selectedImage =
    selectedProfessional?.detailImage ?? selectedProfessional?.image ?? content.image;
  const standardizedSelectedImage = {
    ...selectedImage,
    width: content.image.width,
    height: content.image.height,
  };

  if (!content.enabled) {
    return null;
  }

  return (
    <section
      id="equipe"
      aria-labelledby="team-title"
      className="section-space scroll-mt-24 bg-[var(--surface-alt)]"
    >
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="min-w-0">
          <div className="relative mx-auto max-w-[23rem] lg:max-w-none">
            <ImagePlaceholder
              image={standardizedSelectedImage}
              className="shadow-[var(--shadow-lg)]"
            />
            {selectedProfessional ? (
              <div className="absolute inset-x-3 bottom-3 rounded-lg bg-white/90 p-3 shadow-sm backdrop-blur lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                  Profissional
                </p>
                <p className="mt-1 font-editorial text-2xl leading-none text-[var(--ink)]">
                  {selectedProfessional.name}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--muted)]">
                  {selectedProfessional.role}
                </p>
              </div>
            ) : null}
          </div>
          {content.professionals.length > 0 ? (
            <ul
              aria-label="Profissionais"
              className="-mx-5 mt-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-wrap lg:overflow-visible"
            >
              {content.professionals.map((professional) => (
                <li key={professional.id} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={professional.id === selectedProfessional?.id}
                    onClick={() => setSelectedProfessionalId(professional.id)}
                    className="group relative rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
                  >
                    <Image
                      src={professional.image.src}
                      alt={professional.image.alt}
                      width={professional.image.width}
                      height={professional.image.height}
                      title={`${professional.name} - ${professional.role}`}
                      className="size-14 rounded-full border-2 border-white object-cover shadow-sm transition group-hover:-translate-y-1 group-hover:border-[var(--brand-light)] group-aria-pressed:border-[var(--brand)] group-aria-pressed:ring-2 group-aria-pressed:ring-[var(--brand-light)]"
                    />
                  </button>
                  <span className="sr-only">
                    {professional.name}, {professional.role}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <SectionHeading
            id="team-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
          {selectedProfessional ? (
            <div className="mt-8 hidden border-l-2 border-[var(--brand-light)] pl-5 lg:block">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
                Profissional selecionada
              </p>
              <h3 className="mt-2 font-editorial text-3xl text-[var(--ink)]">
                {selectedProfessional.name}
              </h3>
              <p className="mt-1 text-lg font-semibold text-[var(--muted)]">
                {selectedProfessional.role}
              </p>
              {selectedProfessional.bio ? (
                <p className="mt-3 leading-7 text-[var(--muted)]">
                  {selectedProfessional.bio}
                </p>
              ) : null}
            </div>
          ) : null}
          {content.features.length > 0 ? (
            <ul className="-mx-5 mt-8 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:overflow-visible">
              {content.features.map((feature) => (
                <li
                  key={feature}
                  className="flex min-w-[16rem] items-start gap-3 rounded-lg bg-white/75 p-4 text-[var(--ink)] shadow-sm lg:min-w-0 lg:bg-transparent lg:p-0 lg:shadow-none"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[var(--brand)]"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
