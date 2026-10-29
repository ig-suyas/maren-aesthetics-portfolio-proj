import type { Metadata } from "next";
import { PortraitArt, type Botanical } from "@/components/art/portrait-art";
import { ConceptTag } from "@/components/concept-tag";
import { InView, MaskLines } from "@/components/in-view";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the medical director, nurse injector, aesthetician and coordinator behind Maren. A fictional team for a concept site.",
  alternates: { canonical: "/team" },
};

type Person = { name: string; role: string; creds: string; bio: string; focus: string; art: Botanical };

const director: Person = {
  name: "Dr. Camille Arden",
  role: "Medical Director",
  creds: "MD, board-certified dermatologist",
  bio: "Reviews and signs every treatment plan at Maren and performs complex filler work in person. Trained in dermatology before moving into aesthetic medicine, and still thinks about skin health first and appearance second.",
  focus: "Filler, skin assessment, complex cases",
  art: "ocotillo",
};

const team: Person[] = [
  {
    name: "Noor Haddad",
    role: "Lead Nurse Injector",
    creds: "RN, BSN",
    bio: "Performs most neurotoxin and lip appointments, and prefers small changes made in stages. Known for long, unhurried consultations.",
    focus: "Neurotoxin, lip filler",
    art: "agave",
  },
  {
    name: "Jules Whitaker",
    role: "Licensed Aesthetician",
    creds: "Licensed aesthetician",
    bio: "Leads skin treatments and builds home routines that hold up to dry desert air and strong sun.",
    focus: "Facials, peels, microneedling",
    art: "marigold",
  },
  {
    name: "Sofia Lin",
    role: "Patient Coordinator",
    creds: "Front of house",
    bio: "Your first point of contact. Handles scheduling, written estimates and the two-week review reminders.",
    focus: "Scheduling, estimates, follow-up",
    art: "paloverde",
  },
];

export default function TeamPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="container-x pt-16 pb-16 md:pt-24 md:pb-24">
        <p className="eyebrow text-muted">Team</p>
        <h1 id="page-title" className="mt-6 max-w-[16ch] font-display text-display-xl">
          <MaskLines lines={["Four people,", <em key="e" className="display-em">one plan for you.</em>]} />
        </h1>
      </section>

      {/* Medical director, featured */}
      <section aria-labelledby="director-name" className="container-x grid gap-12 pb-24 md:pb-36 lg:grid-cols-12 lg:items-end lg:gap-8">
        <InView reveal="unveil" className="arch relative aspect-[3/4] w-full max-w-[30rem] lg:col-span-5">
          <PortraitArt kind={director.art} className="absolute inset-0 size-full" />
          <ConceptTag className="absolute bottom-4 left-4">Illustration, not a photo</ConceptTag>
        </InView>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow text-rose-deep">{director.role}</p>
          <h2 id="director-name" className="mt-5 font-display text-display-l">
            {director.name}
          </h2>
          <p className="mt-3 text-muted">{director.creds}</p>
          <p className="mt-8 max-w-[52ch] text-lead text-ink-2">{director.bio}</p>
          <p className="mt-8 border-t border-line pt-5 text-small">
            <span className="eyebrow mr-3 text-muted">Focus</span>
            {director.focus}
          </p>
        </div>
      </section>

      {/* Rest of the team, staggered */}
      <section aria-labelledby="team-title" className="bg-stone-2 py-24 md:py-32">
        <div className="container-x">
          <h2 id="team-title" className="font-display text-display-m">
            The people <em className="display-em">you will see.</em>
          </h2>
          <ul className="mt-16 grid gap-16 md:grid-cols-3 md:gap-8">
            {team.map((p, i) => (
              <li key={p.name} className={i === 1 ? "md:mt-24" : i === 2 ? "md:mt-12" : ""}>
                <InView reveal="unveil" className="arch relative aspect-[3/4] w-full max-w-[22rem]" style={{ ["--veil" as string]: "var(--color-stone-2)", ["--d" as string]: `${i * 120}ms` }}>
                  <PortraitArt kind={p.art} className="absolute inset-0 size-full" />
                </InView>
                <p className="eyebrow mt-8 text-rose-deep">{p.role}</p>
                <h3 className="mt-3 font-display text-display-s">{p.name}</h3>
                <p className="mt-1 text-small text-muted">{p.creds}</p>
                <p className="mt-4 max-w-[38ch] text-ink-2">{p.bio}</p>
                <p className="mt-5 text-small">
                  <span className="eyebrow mr-2 text-muted">Focus</span>
                  {p.focus}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-16 text-sm text-muted">All team members are fictional. Botanical illustrations stand in for portraits in this concept.</p>
        </div>
      </section>

      {/* Credentials */}
      <section aria-labelledby="creds-title" className="container-x grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="eyebrow text-muted">Credentials</p>
          <h2 id="creds-title" className="mt-6 font-display text-display-m">
            Licenses you can <em className="display-em">check yourself.</em>
          </h2>
        </div>
        <div className="space-y-6 text-ink-2 lg:col-span-5 lg:col-start-8">
          <p>
            In Arizona, physicians are licensed by the Arizona Medical Board and nurses by the Arizona State Board of Nursing. Both offer public license lookups.
          </p>
          <p>
            At launch, each clinician&apos;s license number would be listed here so you can confirm it before your visit. A clinic that is confident in its team should make that easy.
          </p>
          <ButtonLink href="/book" className="mt-4">
            Book a consultation
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
