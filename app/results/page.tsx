import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { ResultsTimeline } from "@/components/results/results-timeline";
import { PhotoSetupArt } from "@/components/art/photo-setup-art";
import { ConceptTag } from "@/components/concept-tag";
import { InView, MaskLines } from "@/components/in-view";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "Results",
  description: "What to expect after each treatment, week by week, and how Maren photographs results with consent and without retouching. Concept site.",
  alternates: { canonical: "/results" },
};

const standards = [
  { title: "Same light", body: "Two softboxes at fixed positions, the same settings every time." },
  { title: "Same angles", body: "Front, both 45° views and both profiles, from a mark on the floor." },
  { title: "Same timing", body: "Photographed at the same point after treatment, two weeks for injectables." },
  { title: "Consent in writing", body: "Separate consent to photograph and to show. You can withdraw it at any time." },
  { title: "Nothing altered", body: "No filters, no retouching, and no makeup in either photo." },
];

export default function ResultsPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="container-x pt-16 pb-20 md:pt-24 md:pb-28">
        <p className="eyebrow text-muted">Results</p>
        <h1 id="page-title" className="mt-6 max-w-[18ch] font-display text-display-xl">
          <MaskLines lines={["Results,", <em key="e" className="display-em">shown honestly.</em>]} />
        </h1>
        <p className="mt-10 max-w-[56ch] text-lead text-ink-2">
          Good results arrive in stages, and some take months. Here is what a typical recovery looks like, and the standard we hold our photographs to.
        </p>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-title" className="bg-stone-2 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="timeline-title" className="font-display text-display-m">
              What to expect, <em className="display-em">and when.</em>
            </h2>
            <p className="max-w-[36ch] text-small text-muted">Pick a treatment, then a point in time. General guidance only. Everyone heals differently.</p>
          </div>
          <div className="mt-12">
            <ResultsTimeline />
          </div>
        </div>
      </section>

      {/* Photography standard */}
      <section aria-labelledby="standard-title" className="container-x grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted">Our photography standard</p>
          <InView as="h2" reveal="mask" id="standard-title" className="mt-6 font-display text-display-m">
            <MaskLines lines={["If the light changes,", <em key="e" className="display-em">the result isn&apos;t real.</em>]} />
          </InView>
          <InView reveal="unveil" className="relative mt-12 overflow-hidden rounded-md">
            <PhotoSetupArt className="block h-auto w-full" />
            <ConceptTag className="absolute top-3 right-3">Illustrative diagram</ConceptTag>
          </InView>
        </div>
        <InView as="ol" reveal="rule" className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          {standards.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-x-4 pb-10">
              <span className="tabular pt-1 text-sm text-rose-deep">0{i + 1}</span>
              <div>
                <span className="rule mb-5 block h-px bg-ink/30" style={{ ["--i" as string]: i }} />
                <h3 className="font-display text-display-s">{s.title}</h3>
                <p className="mt-2 max-w-[46ch] text-ink-2">{s.body}</p>
              </div>
            </li>
          ))}
        </InView>
      </section>

      {/* Gallery: intentionally empty in the concept */}
      <section aria-labelledby="gallery-title" className="on-dark bg-ink py-24 text-stone md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow text-stone/65">Before & after</p>
            <h2 id="gallery-title" className="mt-6 font-display text-display-m">
              The gallery <em className="display-em">stays in clinic.</em>
            </h2>
            <p className="mt-6 max-w-[44ch] text-stone/80">
              Patients who agree to share their photos do so for consultations, not for the internet. Ask to see results for your treatment when you visit.
            </p>
            <ButtonLink href="/book" variant="light" className="mt-10">
              Book a consultation
            </ButtonLink>
          </div>

          <figure className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {["Before", "After, 2 weeks"].map((label) => (
                <div key={label} className="arch relative flex aspect-[3/4] flex-col items-center justify-center border border-dashed border-stone/35 p-4 text-center">
                  <Lock className="size-5 text-rose-light" aria-hidden="true" />
                  <span className="mt-3 text-sm text-stone/80">{label}</span>
                </div>
              ))}
            </div>
            <figcaption className="mt-5 flex flex-wrap items-center gap-3 text-sm text-stone/70">
              <ConceptTag tone="dark">Placeholder</ConceptTag>
              Patient photography appears here only with written consent.
            </figcaption>
          </figure>
        </div>
      </section>

      <p className="container-x py-10 text-sm text-muted">
        Results vary from person to person. Timelines on this page are general guidance and should be confirmed by a medical director before launch.
      </p>
    </>
  );
}
