import Link from "next/link";

import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/ui/container";
import type { PostSummary } from "@/types/blog";

type BlogPreviewSectionProps = {
  posts: PostSummary[];
};

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  const visiblePosts = posts.slice(0, 3);

  if (visiblePosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" aria-labelledby="blog-title" className="section-space bg-[var(--surface-alt)]">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Conteúdo para você</p>
            <h2 id="blog-title" className="font-editorial mt-3 text-4xl sm:text-5xl">
              Conteúdos recentes
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center font-bold text-[var(--brand-dark)] underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
          >
            Ver todos os posts
          </Link>
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
