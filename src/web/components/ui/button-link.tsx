import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
  showArrow?: boolean;
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  showArrow = true,
  target,
  rel,
  ...props
}: ButtonLinkProps) {
  const isExternalTarget = target === "_blank";

  return (
    <a
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]",
        variant === "primary" &&
          "bg-[var(--brand)] text-white shadow-[0_12px_30px_rgba(24,105,108,0.18)] hover:-translate-y-0.5 hover:bg-[var(--brand-dark)]",
        variant === "secondary" &&
          "border border-[var(--brand)] bg-transparent text-[var(--brand)] hover:bg-[var(--brand-soft)]",
        variant === "ghost" &&
          "px-0 text-[var(--brand)] hover:text-[var(--brand-dark)]",
        className,
      )}
      target={target}
      rel={isExternalTarget ? rel ?? "noopener noreferrer" : rel}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      ) : null}
    </a>
  );
}
