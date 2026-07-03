import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import { toSafeHref } from "@/lib/safe-url";
import type { PostDetail } from "@/types/blog";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-5 leading-8">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-editorial mb-4 mt-12 text-3xl leading-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-editorial mb-3 mt-9 text-2xl leading-tight">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[var(--brand-light)] pl-6 text-xl italic text-[var(--muted)]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="my-5 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="my-5 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = toSafeHref(value?.href);

      if (!href) {
        return <>{children}</>;
      }

      const external = href.startsWith("http://") || href.startsWith("https://");

      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-semibold text-[var(--brand-dark)] underline"
        >
          {children}
        </a>
      );
    },
  },
};

type PostBodyProps = {
  value: PostDetail["body"];
};

export function PostBody({ value }: PostBodyProps) {
  return <PortableText value={value} components={components} onMissingComponent={false} />;
}
