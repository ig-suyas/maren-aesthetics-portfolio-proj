"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { ButtonLink } from "./button";
import { clinic, primaryNav } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const button = menuButton.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const items = [button, ...panel.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-stone" : "border-transparent bg-stone/0"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" aria-label="Maren Aesthetics, home" className="-m-2 rounded-sm p-2">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="link-draw inline-flex min-h-11 items-center text-[0.9375rem] text-ink-2 transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/book" arrow={false} className="min-h-11 px-6" aria-current={isActive("/book") ? "page" : undefined}>
            Book a consultation
          </ButtonLink>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="-mr-2 inline-flex min-h-11 items-center gap-3 rounded-pill px-3 text-[0.9375rem] font-medium md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0.5"}`} />
            <span className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-stone md:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pt-8 pb-10">
          <ul>
            {[{ href: "/", label: "Home" }, ...primaryNav, { href: "/book", label: "Book a consultation" }].map((item, i) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-16 items-baseline gap-4 py-3 font-display text-display-s aria-[current=page]:italic aria-[current=page]:text-rose-deep"
                >
                  <span className="tabular font-sans text-xs text-muted">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10 text-small text-muted">
            <p>{clinic.area}</p>
            {clinic.hours.map((h) => (
              <p key={h.days}>
                {h.days}: {h.time}
              </p>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
