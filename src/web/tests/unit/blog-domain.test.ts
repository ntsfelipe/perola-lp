import { describe, expect, it } from "vitest";

import {
  mapSanityPostDetail,
  mapSanityPostSummary,
} from "@/content/providers/sanity/post-mapper";
import { toSafeHref } from "@/lib/safe-url";

const validSummaryDto = {
  id: "post-1",
  title: "Cuidado materno baseado em evidências",
  slug: "cuidado-materno",
  excerpt: "Informação clara para decisões mais seguras.",
  publishedAt: "2026-07-02T12:00:00.000Z",
  archivedAt: null,
  coverImage: {
    url: "https://cdn.sanity.io/images/project/production/cover.jpg",
    alt: "Profissional acolhendo uma paciente",
    width: 1200,
    height: 675,
  },
};

describe("Sanity post mapper", () => {
  it("maps a valid summary into the CMS-independent contract", () => {
    expect(mapSanityPostSummary(validSummaryDto)).toEqual({
      id: "post-1",
      title: "Cuidado materno baseado em evidências",
      slug: "cuidado-materno",
      excerpt: "Informação clara para decisões mais seguras.",
      publishedAt: "2026-07-02T12:00:00.000Z",
      coverImage: {
        src: "https://cdn.sanity.io/images/project/production/cover.jpg",
        alt: "Profissional acolhendo uma paciente",
        width: 1200,
        height: 675,
      },
    });
  });

  it("rejects archived, malformed, or unsafe post data", () => {
    expect(
      mapSanityPostSummary({ ...validSummaryDto, archivedAt: "2026-07-02" }),
    ).toBeNull();
    expect(mapSanityPostSummary({ ...validSummaryDto, slug: "../admin" })).toBeNull();
    expect(
      mapSanityPostSummary({
        ...validSummaryDto,
        coverImage: { ...validSummaryDto.coverImage, url: "javascript:alert(1)" },
      }),
    ).toBeNull();
  });

  it("uses a local fallback when the editor saved alt text without an image asset", () => {
    expect(
      mapSanityPostSummary({
        ...validSummaryDto,
        coverImage: {
          url: null,
          alt: "Descrição editorial da capa",
          width: null,
          height: null,
        },
      }),
    ).toMatchObject({
      coverImage: {
        src: "/images/placeholders/blog-cover.svg",
        alt: "Descrição editorial da capa",
        width: 1200,
        height: 675,
      },
    });
  });

  it("maps detail only when Portable Text blocks are present", () => {
    const body = [
      {
        _key: "block-1",
        _type: "block",
        children: [{ _key: "span-1", _type: "span", text: "Conteúdo seguro." }],
        markDefs: [],
        style: "normal",
      },
    ];

    expect(mapSanityPostDetail({ ...validSummaryDto, body })).toMatchObject({ body });
    expect(mapSanityPostDetail({ ...validSummaryDto, body: "<script />" })).toBeNull();
  });
});

describe("safe CMS URL policy", () => {
  it.each(["/blog", "/contato#mapa", "https://example.com/artigo", "http://example.com"])(
    "accepts %s",
    (href) => expect(toSafeHref(href)).toBe(href),
  );

  it.each([
    "javascript:alert(1)",
    "data:text/html,<script>alert(1)</script>",
    "//evil.example/path",
    "mailto:admin@example.com",
    "not-a-url",
  ])("rejects %s", (href) => expect(toSafeHref(href)).toBeNull());
});
