import {
  isValidPostSlug,
  mapSanityPostDetail,
  mapSanityPostSummary,
} from "@/content/providers/sanity/post-mapper";
import {
  LATEST_POSTS_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
} from "@/sanity/queries/posts";
import type { BlogRepository, PostDetail, PostSummary } from "@/types/blog";

type FetchOptions = {
  next: {
    revalidate: number;
    tags: string[];
  };
};

export type SanityFetchClient = {
  fetch<T>(
    query: string,
    params: Record<string, unknown>,
    options: FetchOptions,
  ): Promise<T>;
};

const PUBLIC_FETCH_OPTIONS: FetchOptions = {
  next: { revalidate: 300, tags: ["sanity-posts"] },
};

function clampLimit(limit: number): number {
  if (!Number.isFinite(limit)) {
    return 3;
  }

  return Math.min(10, Math.max(1, Math.trunc(limit)));
}

export class SanityBlogRepository implements BlogRepository {
  constructor(private readonly client: SanityFetchClient) {}

  async getPosts(): Promise<PostSummary[]> {
    try {
      const documents = await this.client.fetch<unknown[]>(
        POSTS_QUERY,
        {},
        PUBLIC_FETCH_OPTIONS,
      );

      return documents
        .map(mapSanityPostSummary)
        .filter((post): post is PostSummary => post !== null);
    } catch {
      return [];
    }
  }

  async getLatestPosts(limit: number): Promise<PostSummary[]> {
    try {
      const documents = await this.client.fetch<unknown[]>(
        LATEST_POSTS_QUERY,
        { limit: clampLimit(limit) },
        PUBLIC_FETCH_OPTIONS,
      );

      return documents
        .map(mapSanityPostSummary)
        .filter((post): post is PostSummary => post !== null);
    } catch {
      return [];
    }
  }

  async getPostBySlug(slug: string): Promise<PostDetail | null> {
    if (!isValidPostSlug(slug)) {
      return null;
    }

    try {
      const document = await this.client.fetch<unknown>(
        POST_BY_SLUG_QUERY,
        { slug },
        PUBLIC_FETCH_OPTIONS,
      );

      return mapSanityPostDetail(document);
    } catch {
      return null;
    }
  }
}
