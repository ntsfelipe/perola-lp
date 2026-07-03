import Link from "next/link";

import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/ui/container";
import type { PostSummary } from "@/types/blog";

type BlogIndexProps = {
  posts: PostSummary[];
};

export function BlogIndex({ posts }: BlogIndexProps) {
  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--brand-soft)] py-16 sm:py-24">
        <Container>
          <p className="eyebrow">Conteúdo Pérola</p>
          <h1 className="font-editorial mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">
            Informação para cuidar de você com mais segurança
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Orientações claras sobre saúde pélvica, gestação, pós-parto e bem-estar.
          </p>
        </Container>
      </section>

      <section aria-labelledby="posts-title" className="section-space">
        <Container>
          {posts.length > 0 ? (
            <>
              <h2 id="posts-title" className="sr-only">
                Posts publicados
              </h2>
              <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-xl rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--surface)] p-8 text-center shadow-[var(--shadow-sm)] sm:p-12">
              <h2 id="posts-title" className="font-editorial text-3xl">
                Novos conteúdos em breve
              </h2>
              <p className="mt-4 leading-7 text-[var(--muted)]">
                Estamos preparando informações para apoiar seu cuidado.
              </p>
              <Link
                href="/"
                className="mt-7 inline-flex min-h-11 items-center font-bold text-[var(--brand-dark)] underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
              >
                Voltar para a página inicial
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
