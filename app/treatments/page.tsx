import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { TreatmentBrowser } from "@/components/treatments/treatment-browser";
import { MaskLines } from "@/components/in-view";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "Treatments",
  description: "Neurotoxin, filler, microneedling, peels, facials, IPL and laser hair reduction, with session times and honest downtime. Concept site.",
  alternates: { canonical: "/treatments" },
};

const faqs = [
  {
    q: "Who performs the treatments?",
    a: "Injectables are performed by our medical director or a registered nurse injector working under the medical director's supervision. Facials and peels are performed by a licensed aesthetician.",
  },
  {
    q: "Will it hurt?",
    a: "Most people describe injections as a brief pinch. We use numbing cream for microneedling and offer it for filler, and many fillers also contain a local anesthetic.",
  },
  {
    q: "Can I combine treatments?",
    a: "Often, yes, though not always on the same day. We sequence treatments in your written plan so that each one has time to settle before the next.",
  },
  {
    q: "Why don't you list prices?",
    a: "The right dose or number of sessions depends on your assessment. You will receive a written estimate at your consultation, before anything is booked.",
  },
  {
    q: "Is there anyone you won't treat?",
    a: "We do not offer injectables during pregnancy or breastfeeding, and some medications and conditions mean waiting or choosing another option. We will always tell you why.",
  },
];

export default function TreatmentsPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="container-x grid gap-10 pt-16 pb-16 md:pt-24 md:pb-24 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-muted">Treatments</p>
          <h1 id="page-title" className="mt-6 font-display text-display-xl">
            <MaskLines lines={["Seven treatments,", <em key="e" className="display-em">known well.</em>]} />
          </h1>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="text-lead text-ink-2">
            Each treatment below lists how long it takes, what recovery looks like and how results unfold. Every plan starts with a consultation.
          </p>
        </div>
      </section>

      <div className="container-x">
        <TreatmentBrowser />
      </div>

      <section aria-labelledby="faq-title" className="bg-stone-2 py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted">Questions</p>
            <h2 id="faq-title" className="mt-6 font-display text-display-m">
              Asked <em className="display-em">often.</em>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b border-line first:border-t">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus className="size-5 shrink-0 text-rose-deep transition-transform duration-300 ease-[var(--ease-soft)] group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="max-w-[62ch] pb-6 text-ink-2">{f.a}</p>
              </details>
            ))}
            <ButtonLink href="/book" className="mt-12">
              Book a consultation
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
