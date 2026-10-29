import { Hero } from "@/components/home/hero";
import { TreatmentIndex } from "@/components/home/treatment-index";
import { InView, MaskLines } from "@/components/in-view";
import { ButtonLink } from "@/components/button";
import { MapArt } from "@/components/art/map-art";
import { ConceptTag } from "@/components/concept-tag";
import { clinic } from "@/lib/site";

const principles = [
  {
    title: "A physician reviews every plan",
    body: "Our medical director signs off on each treatment plan before your first appointment.",
  },
  {
    title: "Conservative first doses",
    body: "We start below what you expect to need and check in at two weeks. Adding a little is easy. Undoing is harder.",
  },
  {
    title: "Downtime, stated plainly",
    body: "You will know how long swelling, flaking or redness can last before you book, so you can plan around it.",
  },
  {
    title: "No pressure to buy",
    body: "A consultation ends with a written plan you can take home. Decide in your own time.",
  },
];

const visit = [
  { title: "Arrive and settle", body: "A quiet room, a glass of water and a short health form. No waiting-room rush." },
  {
    title: "Talk it through",
    body: "Tell us what you notice in the mirror. We listen first, and photograph your skin in consistent light only with your consent.",
  },
  {
    title: "Assessment with a clinician",
    body: "A nurse injector or our medical director looks at skin, structure and movement, and explains what is realistic for you.",
  },
  {
    title: "Leave with a written plan",
    body: "Options, timing and expected downtime on paper. Same-day treatment only if you want it and it is appropriate.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Approach */}
      <section aria-labelledby="approach-title" className="container-x pt-24 pb-24 md:pt-36 md:pb-32">
        <p className="eyebrow text-muted">Our approach</p>
        <InView as="h2" reveal="mask" id="approach-title" className="mt-6 max-w-[22ch] font-display text-display-l">
          <MaskLines
            lines={[
              "We would rather do",
              <span key="l">
                <em className="display-em">a little less,</em> review it
              </span>,
              "with you, and add more",
              "only if you ask.",
            ]}
          />
        </InView>

        <InView as="ol" reveal="rule" className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {principles.map((p, i) => (
            <li key={p.title} style={{ ["--i" as string]: i }}>
              <span className="rule block h-px bg-ink/40" style={{ ["--i" as string]: i }} />
              <p className="tabular mt-5 text-sm text-rose-deep">0{i + 1}</p>
              <h3 className="mt-3 text-lg leading-snug font-semibold">{p.title}</h3>
              <p className="mt-3 max-w-[34ch] text-ink-2">{p.body}</p>
            </li>
          ))}
        </InView>
      </section>

      {/* Treatments */}
      <section aria-labelledby="treatments-title" className="bg-stone-2 py-24 md:py-32">
        <div className="container-x">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-muted">Treatments</p>
              <InView as="h2" reveal="mask" id="treatments-title" className="mt-6 font-display text-display-m">
                <MaskLines lines={["A short menu,", <em key="e" className="display-em">chosen with care.</em>]} />
              </InView>
            </div>
            <p className="max-w-[40ch] text-ink-2">
              Seven treatments we know well, rather than every machine on the market. Each one is offered only after a consultation.
            </p>
          </div>
          <div className="mt-16 md:mt-20">
            <TreatmentIndex />
          </div>
        </div>
      </section>

      {/* First visit */}
      <section aria-labelledby="visit-title" className="container-x grid gap-14 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow text-muted">Your first visit</p>
            <InView as="h2" reveal="mask" id="visit-title" className="mt-6 font-display text-display-m">
              <MaskLines lines={["Forty-five minutes.", <em key="e" className="display-em">Nothing booked</em>, "unless you ask."]} />
            </InView>
            <p className="mt-8 max-w-[38ch] text-ink-2">
              A consultation is a conversation, with a clinician who can answer medical questions. You can bring photos of yourself from a few years ago if that helps.
            </p>
          </div>
        </div>

        <ol className="relative lg:col-span-6 lg:col-start-7">
          <span className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-line" aria-hidden="true" />
          {visit.map((step, i) => (
            <li key={step.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-6 pb-14 last:pb-0">
              <span
                className="arch relative z-10 flex h-12 w-[2.3rem] items-end justify-center border border-rose bg-stone pb-1.5 font-display text-lg text-rose-deep italic"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="pt-2">
                <h3 className="font-display text-display-s">{step.title}</h3>
                <p className="mt-3 max-w-[46ch] text-ink-2">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Results honesty */}
      <section aria-labelledby="honest-title" className="on-dark bg-ink text-stone">
        <div className="container-x grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-stone/65">Results</p>
            <InView as="h2" reveal="mask" id="honest-title" className="mt-6 font-display text-display-l">
              <MaskLines lines={["We only show", "before-and-afters", <em key="e" className="display-em">we can stand behind.</em>]} />
            </InView>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-stone/85">
              Photographs are taken in the same light, at the same angle, with written consent from the patient. No filters and no retouching. We show them in clinic, during your consultation.
            </p>
            <ButtonLink href="/results" variant="light" className="mt-10">
              How we show results
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Visit */}
      <section aria-labelledby="find-title" className="container-x grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:items-center lg:gap-8">
        <InView reveal="unveil" className="relative aspect-[4/3] overflow-hidden rounded-md lg:col-span-7">
          <MapArt className="absolute inset-0 size-full" />
          <ConceptTag className="absolute top-4 left-4">Illustrative map</ConceptTag>
        </InView>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-muted">Visit</p>
          <h2 id="find-title" className="mt-6 font-display text-display-m">
            Come and see <em className="display-em">the space.</em>
          </h2>
          <p className="mt-6 text-ink-2">
            A short walk from the Scottsdale Arts District, with covered parking behind the building. {clinic.area}.
          </p>
          <dl className="mt-8 space-y-2.5 text-small">
            {clinic.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-6 border-b border-line pb-2.5">
                <dt className="text-muted">{h.days}</dt>
                <dd className="tabular">{h.time}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href="/book" className="mt-10">
            Book a consultation
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
