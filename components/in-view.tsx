"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";

type InViewProps<T extends ElementType> = {
  as?: T;
  reveal: "mask" | "unveil" | "rule";
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "style">;

/** Sets data-inview once the element enters the viewport; CSS in globals.css handles the motion. */
export function InView<T extends ElementType = "div">({ as, reveal, children, className, style, ...rest }: InViewProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal={reveal} data-inview={seen} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/** Splits a heading into masked lines. Pass lines explicitly so breaks are art-directed. */
export function MaskLines({ lines, delay }: { lines: ReactNode[]; delay?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="mask-line" style={{ ["--i" as string]: i, ...(delay !== undefined && { ["--d" as string]: `${delay}ms` }) }}>
          <span>{line}</span>
        </span>
      ))}
    </>
  );
}
