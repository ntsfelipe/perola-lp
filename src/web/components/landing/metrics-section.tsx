import { Award, BadgeCheck, Users } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { LandingPageContent } from "@/types/content";

const icons = {
  badge: BadgeCheck,
  users: Users,
  award: Award,
};

type MetricsSectionProps = {
  content: LandingPageContent["metrics"];
};

export function MetricsSection({ content }: MetricsSectionProps) {
  if (!content.enabled || content.items.length === 0) {
    return null;
  }

  return (
    <section aria-label="Indicadores da clínica" className="border-y border-[var(--line)] bg-[var(--surface-alt)]">
      <Container className="grid sm:grid-cols-3">
        {content.items.map((item, index) => {
          const Icon = icons[item.icon];

          return (
            <Reveal
              key={item.id}
              delay={index * 0.08}
              className="flex min-h-48 flex-col items-center justify-center border-b border-[var(--line)] px-5 py-10 text-center last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <Icon aria-hidden="true" className="size-7 text-[var(--brand)]" />
              <p className="mt-5 font-editorial text-3xl text-[var(--ink)]">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.label}</p>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
