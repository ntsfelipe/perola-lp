import Image from "next/image";
import Link from "next/link";

import { PostBody } from "@/components/blog/post-body";
import { Container } from "@/components/ui/container";
import { formatPostDate } from "@/lib/post-date";
import type { PostDetail } from "@/types/blog";

type BlogPostArticleProps = {
  post: PostDetail;
};

export function BlogPostArticle({ post }: BlogPostArticleProps) {
  return (
    <article className="pb-20 sm:pb-28">
      <header className="bg-[var(--brand-soft)] py-14 sm:py-20">
        <Container className="max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center text-sm font-bold text-[var(--brand-dark)] underline"
          >
            ← Voltar para o blog
          </Link>
          <time
            dateTime={post.publishedAt}
            className="mt-7 block text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand)]"
          >
            {formatPostDate(post.publishedAt)}
          </time>
          <h1 className="font-editorial mt-4 text-4xl leading-tight sm:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
            {post.excerpt}
          </p>
        </Container>
      </header>

      <Container className="max-w-4xl">
        <div className="relative -mt-1 aspect-[16/9] overflow-hidden rounded-b-[var(--radius-lg)] bg-[var(--surface-alt)] shadow-[var(--shadow-md)]">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
        </div>
        <div className="mx-auto mt-12 max-w-3xl text-lg text-[var(--ink)] sm:mt-16">
          <PostBody value={post.body} />
        </div>
      </Container>
    </article>
  );
}
