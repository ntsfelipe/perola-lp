import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    !defined(archivedAt)
  ] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    archivedAt,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt,
      "width": coverImage.asset->metadata.dimensions.width,
      "height": coverImage.asset->metadata.dimensions.height
    }
  }
`);

export const LATEST_POSTS_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    !defined(archivedAt)
  ] | order(publishedAt desc) [0...$limit] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    archivedAt,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt,
      "width": coverImage.asset->metadata.dimensions.width,
      "height": coverImage.asset->metadata.dimensions.height
    }
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "post" &&
    slug.current == $slug &&
    defined(publishedAt) &&
    publishedAt <= now() &&
    !defined(archivedAt)
  ][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    archivedAt,
    body,
    "coverImage": {
      "url": coverImage.asset->url,
      "alt": coverImage.alt,
      "width": coverImage.asset->metadata.dimensions.width,
      "height": coverImage.asset->metadata.dimensions.height
    }
  }
`);
