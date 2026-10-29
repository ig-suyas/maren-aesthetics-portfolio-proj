import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "light";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-pill px-7 text-[0.9375rem] font-medium tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-soft)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-rose-deep text-stone hover:bg-ink",
  ghost: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-stone",
  light: "bg-stone text-ink hover:bg-rose-soft",
};

function Arrow() {
  return (
    <span className="relative -mr-1 inline-flex size-5 items-center justify-center overflow-hidden" aria-hidden="true">
      <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-4 group-hover:-translate-y-4" />
      <ArrowUpRight className="absolute size-4 -translate-x-4 translate-y-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-0 group-hover:translate-y-0" />
    </span>
  );
}

export function ButtonLink({
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
