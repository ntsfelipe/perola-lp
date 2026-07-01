import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ContentImage } from "@/types/content";

type ImagePlaceholderProps = {
  image: ContentImage;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function ImagePlaceholder({
  image,
  className,
  imageClassName,
  priority = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface-strong)]",
        className,
      )}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
