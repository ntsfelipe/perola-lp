export type PostImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

import type { PortableTextBlock } from "@portabletext/react";

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImage: PostImage;
};

export type PostDetail = PostSummary & {
  body: PortableTextBlock[];
};

export interface BlogRepository {
  getPosts(): Promise<PostSummary[]>;
  getLatestPosts(limit: number): Promise<PostSummary[]>;
  getPostBySlug(slug: string): Promise<PostDetail | null>;
}
