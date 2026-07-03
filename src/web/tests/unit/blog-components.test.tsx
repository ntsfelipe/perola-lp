import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BlogIndex } from "@/components/blog/blog-index";
import { BlogPostArticle } from "@/components/blog/blog-post-article";
import { PostBody } from "@/components/blog/post-body";
import { BlogPreviewSection } from "@/components/landing/blog-preview-section";
import type { PostDetail, PostSummary } from "@/types/blog";

const post: PostSummary = {
  id: "post-1",
  title: "Cuidado materno baseado em evidências",
  slug: "cuidado-materno",
  excerpt: "Informação clara para decisões mais seguras durante a maternidade.",
  publishedAt: "2026-07-02T12:00:00.000Z",
  coverImage: {
    src: "https://cdn.sanity.io/images/project/production/cover.jpg",
    alt: "Profissional acolhendo uma paciente",
    width: 1200,
    height: 675,
  },
};

describe("BlogIndex", () => {
  it("renders a controlled empty state", () => {
    render(<BlogIndex posts={[]} />);

    expect(screen.getByRole("heading", { name: "Novos conteúdos em breve" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Voltar para a página inicial" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders accessible links and images for public posts", () => {
    render(<BlogIndex posts={[post]} />);

    expect(screen.getByRole("link", { name: /Cuidado materno/ })).toHaveAttribute(
      "href",
      "/blog/cuidado-materno",
    );
    expect(screen.getByAltText("Profissional acolhendo uma paciente")).toBeInTheDocument();
  });
});

describe("BlogPreviewSection", () => {
  it("shows no more than three recent posts and a blog CTA", () => {
    const posts = Array.from({ length: 4 }, (_, index) => ({
      ...post,
      id: `post-${index}`,
      slug: `post-${index}`,
      title: `Post ${index}`,
    }));

    render(<BlogPreviewSection posts={posts} />);

    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Ver todos os posts" })).toHaveAttribute(
      "href",
      "/blog",
    );
  });

  it("does not render when there are no posts", () => {
    const { container } = render(<BlogPreviewSection posts={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe("Portable Text security", () => {
  it("renders safe links and downgrades unsafe links to plain text", () => {
    const value: PostDetail["body"] = [
      {
        _key: "block-1",
        _type: "block",
        style: "normal",
        markDefs: [
          { _key: "safe", _type: "link", href: "https://example.com" },
          { _key: "unsafe", _type: "link", href: "javascript:alert(1)" },
        ],
        children: [
          { _key: "span-1", _type: "span", text: "Fonte segura", marks: ["safe"] },
          { _key: "span-2", _type: "span", text: "Não executar", marks: ["unsafe"] },
        ],
      },
    ];

    render(<PostBody value={value} />);

    expect(screen.getByRole("link", { name: "Fonte segura" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
    expect(screen.queryByRole("link", { name: "Não executar" })).not.toBeInTheDocument();
    expect(screen.getByText("Não executar")).toBeInTheDocument();
  });
});

describe("BlogPostArticle", () => {
  it("renders one h1 and the article body", () => {
    const detail: PostDetail = {
      ...post,
      body: [
        {
          _key: "block-1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [{ _key: "span-1", _type: "span", text: "Conteúdo do artigo." }],
        },
      ],
    };

    const { container } = render(<BlogPostArticle post={detail} />);

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText("Conteúdo do artigo.")).toBeInTheDocument();
  });
});
