import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostArticle } from "@/components/blog/blog-post-article";
import { blogRepository } from "@/content/providers/sanity/blog-repository";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogRepository.getPostBySlug(slug);

  if (!post) {
    return { title: "Post não encontrado | Pérola" };
  }

  return {
    title: `${post.title} | Pérola`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.coverImage.src,
          width: post.coverImage.width,
          height: post.coverImage.height,
          alt: post.coverImage.alt,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await blogRepository.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <BlogPostArticle post={post} />
    </main>
  );
}
