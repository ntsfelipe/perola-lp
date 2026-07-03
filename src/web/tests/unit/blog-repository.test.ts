import { describe, expect, it, vi } from "vitest";

import { SanityBlogRepository } from "@/content/providers/sanity/sanity-blog-repository";
import {
  LATEST_POSTS_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
} from "@/sanity/queries/posts";

const summaryDto = {
  id: "post-1",
  title: "Primeiro post",
  slug: "primeiro-post",
  excerpt: "Resumo do primeiro post.",
  publishedAt: "2026-07-02T12:00:00.000Z",
  archivedAt: null,
  coverImage: {
    url: "https://cdn.sanity.io/images/project/production/cover.jpg",
    alt: "Descrição da capa",
    width: 1200,
    height: 675,
  },
};

describe("public post GROQ", () => {
  it.each([POSTS_QUERY, LATEST_POSTS_QUERY, POST_BY_SLUG_QUERY])(
    "filters unpublished and archived documents",
    (query) => {
      expect(query).toContain('defined(publishedAt)');
      expect(query).toContain('!defined(archivedAt)');
      expect(query).not.toContain("${");
    },
  );

  it("uses a value parameter for the route slug", () => {
    expect(POST_BY_SLUG_QUERY).toContain("slug.current == $slug");
  });
});

describe("SanityBlogRepository", () => {
  it("maps public posts and discards invalid DTOs", async () => {
    const fetch = vi.fn().mockResolvedValue([summaryDto, { title: "inválido" }]);
    const repository = new SanityBlogRepository({ fetch });

    await expect(repository.getPosts()).resolves.toHaveLength(1);
    expect(fetch).toHaveBeenCalledWith(POSTS_QUERY, {}, expect.any(Object));
  });

  it("clamps the latest-post limit before sending it as a query parameter", async () => {
    const fetch = vi.fn().mockResolvedValue([summaryDto]);
    const repository = new SanityBlogRepository({ fetch });

    await repository.getLatestPosts(999);

    expect(fetch).toHaveBeenCalledWith(
      LATEST_POSTS_QUERY,
      { limit: 10 },
      expect.any(Object),
    );
  });

  it("passes a valid slug separately from the query text", async () => {
    const fetch = vi.fn().mockResolvedValue({
      ...summaryDto,
      body: [{ _type: "block", children: [] }],
    });
    const repository = new SanityBlogRepository({ fetch });

    await expect(repository.getPostBySlug("primeiro-post")).resolves.toMatchObject({
      slug: "primeiro-post",
    });
    expect(fetch).toHaveBeenCalledWith(
      POST_BY_SLUG_QUERY,
      { slug: "primeiro-post" },
      expect.any(Object),
    );
  });

  it("rejects an unsafe slug without calling Sanity", async () => {
    const fetch = vi.fn();
    const repository = new SanityBlogRepository({ fetch });

    await expect(repository.getPostBySlug('x"] | *[true]')).resolves.toBeNull();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("degrades safely when Sanity is unavailable", async () => {
    const fetch = vi.fn().mockRejectedValue(new Error("private upstream detail"));
    const repository = new SanityBlogRepository({ fetch });

    await expect(repository.getPosts()).resolves.toEqual([]);
    await expect(repository.getPostBySlug("primeiro-post")).resolves.toBeNull();
  });
});
