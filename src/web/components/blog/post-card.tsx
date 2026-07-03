import Image from "next/image";
import Link from "next/link";

import { formatPostDate } from "@/lib/post-date";
import type { PostSummary } from "@/types/blog";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      <Link
        href={`/blog/${post.slug}`}
        className="block rounded-[var(--radius-lg)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface-alt)]">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-6 sm:p-7">
          <time
            dateTime={post.publishedAt}
            className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--brand)]"
          >
            {formatPostDate(post.publishedAt)}
          </time>
          <h2 className="font-editorial mt-3 text-2xl leading-tight text-[var(--ink)]">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 leading-7 text-[var(--muted)]">
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex text-sm font-bold text-[var(--brand-dark)]">
            Ler artigo <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
