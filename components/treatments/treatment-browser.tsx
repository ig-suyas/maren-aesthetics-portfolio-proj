"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { categories, treatments, type Category } from "@/lib/treatments";
import { TreatmentArt } from "@/components/art/treatment-art";
import { ConceptTag } from "@/components/concept-tag";
import { ButtonLink } from "@/components/button";

type Filter = Category | "all";

const ease = [0.22, 1, 0.36, 1] as const;

export function TreatmentBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? treatments : treatments.filter((t) => t.category === filter);
  const label = (id: Category) => categories.find((c) => c.id === id)?.label;

  return (
    <MotionConfig reducedMotion="user">
      <div className="sticky top-[72px] z-20 -mx-4 border-b border-line bg-stone px-4 md:-mx-8 md:px-8 xl:-mx-14 xl:px-14">
        <div role="group" aria-label="Filter treatments" className="-mx-1 flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
          {[{ id: "all" as const, label: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id)}
              className="relative min-h-11 shrink-0 rounded-pill px-5 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink aria-pressed:text-stone"
            >
              {filter === c.id && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-pill bg-ink" transition={{ duration: 0.45, ease }} />
              )}
              <span className="relative">{c.label}</span>
            </button>
          ))}
          <p className="sr-only" aria-live="polite">
            Showing {shown.length} treatments
          </p>
        </div>
      </div>

      <ul>
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((t, i) => (
            <motion.li
              key={t.id}
              id={t.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="scroll-mt-40 border-b border-line py-14 last:border-b-0 md:py-20"
            >
              <article aria-labelledby={`${t.id}-title`} className="grid gap-8 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-4 lg:col-span-3">
                  <div className="arch relative aspect-[3/4] w-full max-w-[15rem]">
                    <TreatmentArt kind={t.art} className="absolute inset-0 size-full" />
                    {i === 0 && <ConceptTag className="absolute bottom-3 left-3" />}
                  </div>
                </div>

                <div className="md:col-span-8 lg:col-span-8 lg:col-start-5">
                  <p className="eyebrow text-rose-deep">{label(t.category)}</p>
                  <h2 id={`${t.id}-title`} className="mt-4 font-display text-display-m">
                    {t.name}
                  </h2>
                  <p className="mt-4 text-lead text-ink">{t.for}</p>
                  <p className="mt-4 max-w-[62ch] text-ink-2">{t.about}</p>

                  <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
                    {[
                      ["Session", t.session],
                      ["Downtime", t.downtime],
                      ["Plan & results", t.plan],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="eyebrow text-muted">{k}</dt>
                        <dd className="mt-2 text-small text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <ButtonLink href={`/book?service=${t.id}`} variant="ghost" className="mt-10">
                    Book a consultation<span className="sr-only"> for {t.name}</span>
                  </ButtonLink>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </MotionConfig>
  );
}
