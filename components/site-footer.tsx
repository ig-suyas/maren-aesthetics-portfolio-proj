import Link from "next/link";
import { Logo } from "./logo";
import { clinic, primaryNav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-stone">
      <div className="container-x grid gap-14 pt-20 pb-12 md:grid-cols-12 md:pt-28">
        <div className="md:col-span-5">
          <Logo tone="stone" />
          <p className="mt-6 max-w-sm font-display text-display-s text-stone/90">
            Aesthetic care, planned slowly and <em className="display-em">done carefully.</em>
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow text-stone/60">Visit</h2>
          <ul className="mt-4">
            {[...primaryNav, { href: "/book", label: "Book a consultation" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-small text-stone/85 transition-colors hover:text-stone">
                  <span className="link-draw">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="eyebrow text-stone/60">Hours</h2>
          <dl className="mt-5 space-y-2.5 text-small">
            {clinic.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-6 border-b border-stone/15 pb-2.5">
                <dt className="text-stone/70">{h.days}</dt>
                <dd className="tabular text-stone/90">{h.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-small text-stone/70">{clinic.area}</p>
        </div>
      </div>

      <div className="container-x">
        <div className="flex flex-col gap-4 border-t border-stone/15 py-8 text-sm text-stone/70 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl">
            <span className="mr-2 inline-flex items-center rounded-pill border border-rose-light/70 px-2 py-0.5 text-[0.6875rem] font-semibold tracking-[0.12em] text-rose-light uppercase">
              Concept
            </span>
            Maren Aesthetics is a fictional clinic designed as a portfolio concept. The people, artwork and copy are illustrative, and nothing here is medical advice.
          </p>
          <p className="tabular shrink-0">© 2026 Maren concept</p>
        </div>
      </div>
    </footer>
  );
}
