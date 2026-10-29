"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { treatments } from "@/lib/treatments";
import { TreatmentArt } from "@/components/art/treatment-art";
import { ConceptTag } from "@/components/concept-tag";
import { InView } from "@/components/in-view";

/** Treatment list with a still preview that follows hover and keyboard focus. Touch gets inline thumbnails instead. */
export function TreatmentIndex() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <InView reveal="unveil" className="arch relative aspect-[3/4] w-full max-w-[26rem]">
            {treatments.map((t, i) => (
              <TreatmentArt
                key={t.id}
                kind={t.art}
                className={`absolute inset-0 size-full transition-[opacity,transform] duration-700 ease-[var(--ease-soft)] ${
                  i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                }`}
              />
            ))}
            <ConceptTag className="absolute bottom-4 left-4" />
          </InView>
          <p className="mt-5 max-w-[26rem] text-small text-muted" aria-hidden="true">
            <span className="text-ink">{treatments[active].name}.</span> {treatments[active].for}
          </p>
        </div>
      </div>

      <ol className="border-t border-line lg:col-span-7">
        {treatments.map((t, i) => (
          <li key={t.id} className="border-b border-line">
            <Link
              href={`/treatments#${t.id}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-x-4 py-5 sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-x-6 md:py-6"
            >
              <span className="arch aspect-[3/4] w-14 sm:hidden">
                <TreatmentArt kind={t.art} className="size-full" />
              </span>
              <span className="tabular hidden text-sm text-muted sm:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">
                <span className="block font-display text-display-s transition-colors duration-300 group-hover:text-rose-deep group-hover:italic">
                  {t.name}
                </span>
                <span className="mt-1 block text-small text-muted">{t.short}</span>
              </span>
              <span className="tabular hidden text-sm text-muted sm:block">{t.session}</span>
              <ArrowRight
                className="size-5 text-ink-2 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:translate-x-1 group-hover:text-rose-deep"
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
