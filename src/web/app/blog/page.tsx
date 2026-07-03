import type { Metadata } from "next";

import { BlogIndex } from "@/components/blog/blog-index";
import { blogRepository } from "@/content/providers/sanity/blog-repository";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog | Pérola Fisioterapia Pélvica",
  description:
    "Conteúdos sobre saúde pélvica, gestação, pós-parto e bem-estar produzidos pela Pérola.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await blogRepository.getPosts();

  return (
    <main>
      <BlogIndex posts={posts} />
    </main>
  );
}
