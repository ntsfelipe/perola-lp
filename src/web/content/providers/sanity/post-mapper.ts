import { toSafeHref } from "@/lib/safe-url";
import type {
  PostDetail,
  PostImage,
  PostSummary,
} from "@/types/blog";
import type { PortableTextBlock } from "@portabletext/react";

type UnknownRecord = Record<string, unknown>;

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SANITY_IMAGE_HOST = "cdn.sanity.io";
const FALLBACK_IMAGE: PostImage = {
  src: "/images/placeholders/blog-cover.svg",
  alt: "Ilustração editorial da clínica Pérola",
  width: 1200,
  height: 675,
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: unknown): value is string {
  return isNonEmptyString(value) && !Number.isNaN(Date.parse(value));
}

function mapImage(value: unknown): PostImage | null {
  if (!isRecord(value)) {
    return FALLBACK_IMAGE;
  }

  const fallbackAlt = isNonEmptyString(value.alt)
    ? value.alt.trim()
    : FALLBACK_IMAGE.alt;

  if (value.url == null || value.url === "") {
    return { ...FALLBACK_IMAGE, alt: fallbackAlt };
  }

  const src = toSafeHref(value.url);
  const width = value.width;
  const height = value.height;

  if (
    !src ||
    !isNonEmptyString(value.alt) ||
    typeof width !== "number" ||
    typeof height !== "number" ||
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width <= 0 ||
    height <= 0
  ) {
    return null;
  }

  try {
    if (new URL(src).hostname !== SANITY_IMAGE_HOST) {
      return null;
    }
  } catch {
    return null;
  }

  return { src, alt: value.alt.trim(), width, height };
}

function mapBasePost(value: unknown): PostSummary | null {
  if (!isRecord(value) || value.archivedAt != null) {
    return null;
  }

  const coverImage = mapImage(value.coverImage);

  if (
    !isNonEmptyString(value.id) ||
    !isNonEmptyString(value.title) ||
    !isNonEmptyString(value.slug) ||
    !SLUG_PATTERN.test(value.slug) ||
    !isNonEmptyString(value.excerpt) ||
    !isIsoDate(value.publishedAt) ||
    !coverImage
  ) {
    return null;
  }

  return {
    id: value.id,
    title: value.title.trim(),
    slug: value.slug,
    excerpt: value.excerpt.trim(),
    publishedAt: value.publishedAt,
    coverImage,
  };
}

function isPortableTextBlock(value: unknown): value is PortableTextBlock {
  return (
    isRecord(value) &&
    value._type === "block" &&
    Array.isArray(value.children)
  );
}

export function mapSanityPostSummary(value: unknown): PostSummary | null {
  return mapBasePost(value);
}

export function isValidPostSlug(value: unknown): value is string {
  return typeof value === "string" && SLUG_PATTERN.test(value);
}

export function mapSanityPostDetail(value: unknown): PostDetail | null {
  const summary = mapBasePost(value);

  if (!summary || !isRecord(value) || !Array.isArray(value.body)) {
    return null;
  }

  if (value.body.length === 0 || !value.body.every(isPortableTextBlock)) {
    return null;
  }

  return { ...summary, body: value.body };
}
