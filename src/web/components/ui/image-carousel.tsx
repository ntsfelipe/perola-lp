"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import type { ContentImage } from "@/types/content";
import { ImagePlaceholder } from "./image-placeholder";

type ImageCarouselProps = {
  images: ContentImage[];
  ariaLabel: string;
  aspectRatio?: string;
  buttonClassName?: string;
  className?: string;
  imageClassName?: string;
};

export function ImageCarousel({
  images,
  ariaLabel,
  aspectRatio,
  buttonClassName,
  className,
  imageClassName,
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reducedMotion = useReducedMotion();
  const activeImage = images[activeIndex];
  const frameImage = images[0];

  useEffect(() => {
    if (images.length <= 1 || reducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [images.length, reducedMotion]);

  if (!activeImage) {
    return null;
  }

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? images.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
  };

  return (
    <div
      aria-label={ariaLabel}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <div
        className="relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-strong)] shadow-[var(--shadow-lg)]"
        style={{
          aspectRatio: aspectRatio ?? `${frameImage.width} / ${frameImage.height}`,
        }}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeImage.src}
            custom={direction}
            className="absolute inset-0"
            initial={
              reducedMotion
                ? false
                : { opacity: 0, x: direction > 0 ? 42 : -42, scale: 1.03 }
            }
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, x: direction > 0 ? -42 : 42, scale: 0.985 }
            }
            transition={{
              duration: reducedMotion ? 0.01 : 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ImagePlaceholder
              image={{
                ...activeImage,
                width: frameImage.width,
                height: frameImage.height,
              }}
              className="h-full w-full rounded-none shadow-none"
              imageClassName={imageClassName}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between sm:inset-x-3">
            <CarouselButton
              ariaLabel="Foto anterior"
              icon="previous"
              onClick={goToPrevious}
              className={buttonClassName}
            />
            <CarouselButton
              ariaLabel="Proxima foto"
              icon="next"
              onClick={goToNext}
              className={buttonClassName}
            />
          </div>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2.5">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Mostrar foto ${index + 1}`}
                aria-current={index === activeIndex}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className="h-2.5 w-2.5 rounded-full bg-white/55 transition-all aria-current:w-6 aria-current:bg-white"
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function CarouselButton({
  ariaLabel,
  icon,
  onClick,
  className,
}: {
  ariaLabel: string;
  icon: "previous" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = icon === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        "pointer-events-auto grid size-11 place-items-center rounded-full bg-white/90 text-[var(--ink)] shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
}
