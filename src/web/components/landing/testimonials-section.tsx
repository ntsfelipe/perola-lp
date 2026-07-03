"use client";

import { Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { LandingPageContent, Testimonial } from "@/types/content";

type TestimonialsSectionProps = {
  content: LandingPageContent["testimonials"];
};

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  if (!content.enabled || content.items.length === 0) {
    return null;
  }

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="section-space scroll-mt-24 bg-white"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="center"
          />
        </Reveal>

        <TestimonialsMobileCarousel items={content.items} />

        <div className="mt-12 hidden gap-5 lg:grid lg:grid-cols-3">
          {content.items.map((item, index) => (
            <TestimonialCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialsMobileCarousel({ items }: { items: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const activeItem = items[activeIndex];

  useEffect(() => {
    if (items.length <= 1 || reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [items.length, reducedMotion]);

  if (!activeItem) {
    return null;
  }

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? items.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((currentIndex) => (currentIndex + 1) % items.length);
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    const swipePower = Math.abs(info.offset.x) * info.velocity.x;

    if (info.offset.x < -60 || swipePower < -450) {
      goToNext();
      return;
    }

    if (info.offset.x > 60 || swipePower > 450) {
      goToPrevious();
    }
  };

  return (
    <Reveal className="mt-9 lg:hidden">
      <div className="relative overflow-hidden" aria-live="polite">
        <div className="relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeItem.id}
              custom={direction}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: direction > 0 ? 36 : -36, scale: 0.985 }
              }
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, x: direction > 0 ? -36 : 36, scale: 0.985 }
              }
              transition={{
                duration: reducedMotion ? 0.01 : 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              drag={items.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
              whileDrag={reducedMotion ? undefined : { scale: 0.985 }}
              className="touch-pan-y cursor-grab active:cursor-grabbing"
            >
              <TestimonialFigure item={activeItem} />
            </motion.div>
          </AnimatePresence>
        </div>

        {items.length > 1 ? (
          <div className="mt-5 flex items-center justify-center gap-2.5">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Mostrar avaliação ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className="h-2.5 w-2.5 rounded-full bg-[var(--surface-strong)] transition-all aria-current:w-6 aria-current:bg-[var(--brand)]"
              />
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}

function TestimonialCard({
  item,
  index,
}: {
  item: Testimonial;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <TestimonialFigure item={item} />
    </Reveal>
  );
}

function TestimonialFigure({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full min-h-80 flex-col rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-7 shadow-[var(--shadow-sm)] sm:p-8">
      <div className="flex gap-1 text-[var(--brand)]" aria-label={`${item.rating} de 5 estrelas`}>
        {Array.from({ length: item.rating }, (_, starIndex) => (
          <Star key={`${item.id}-${starIndex}`} aria-hidden="true" className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-6 flex-1 text-base leading-8 text-[var(--muted)]">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-[var(--surface-strong)] text-sm font-bold text-[var(--ink)]">
          {item.initials}
        </span>
        <span className="text-sm font-semibold text-[var(--ink)]">{item.author}</span>
      </figcaption>
    </figure>
  );
}
