/*
 * Concept copy. Durations and downtime reflect commonly published, general
 * guidance and must be reviewed by the clinic's medical director before launch.
 */

export type Category = "injectables" | "skin" | "laser";

export type Treatment = {
  id: string;
  name: string;
  short: string;
  category: Category;
  for: string;
  about: string;
  session: string;
  downtime: string;
  plan: string;
  art: "relax" | "volume" | "texture" | "layers" | "ripple" | "light" | "fine";
};

export const categories: { id: Category; label: string }[] = [
  { id: "injectables", label: "Injectables" },
  { id: "skin", label: "Skin" },
  { id: "laser", label: "Laser & light" },
];

export const treatments: Treatment[] = [
  {
    id: "neurotoxin",
    name: "Neurotoxin",
    short: "Soften expression lines",
    category: "injectables",
    for: "Frown lines, forehead lines and crow's feet.",
    about:
      "Small, precise doses relax the muscles that crease the skin when you frown or squint. We start conservatively and review at two weeks, so you still look like yourself on a good day.",
    session: "15–20 min",
    downtime: "None. Stay upright for four hours.",
    plan: "Settles in 3–5 days, full effect at 2 weeks, typically lasts 3–4 months.",
    art: "relax",
  },
  {
    id: "filler",
    name: "Hyaluronic acid filler",
    short: "Restore lost volume",
    category: "injectables",
    for: "Cheeks, lips, temples, chin and under-eye hollows.",
    about:
      "A gel similar to a substance your skin already makes, placed to replace volume that time has moved or taken. It can be dissolved if you ever change your mind, which is why we prefer it.",
    session: "45–60 min",
    downtime: "Possible swelling or bruising for a few days.",
    plan: "Visible right away, settles over 2 weeks, lasts 6–18 months by area.",
    art: "volume",
  },
  {
    id: "microneedling",
    name: "Microneedling",
    short: "Refine texture and scarring",
    category: "skin",
    for: "Acne scarring, enlarged pores, fine lines and uneven texture.",
    about:
      "Controlled micro-channels prompt the skin to repair itself and build new collagen. Gradual by design: the change arrives over months, not overnight.",
    session: "60 min",
    downtime: "Pink, sun-sensitive skin for 1–3 days.",
    plan: "A series of 3 sessions, 4–6 weeks apart. Results build for about 3 months.",
    art: "texture",
  },
  {
    id: "peel",
    name: "Chemical peel",
    short: "Brighten tone",
    category: "skin",
    for: "Dullness, mild pigmentation and rough texture.",
    about:
      "A clinical-strength solution lifts dull surface cells so fresher skin comes through. We choose the depth after examining your skin type and recent sun exposure.",
    session: "30–45 min",
    downtime: "Light flaking for 3–7 days, depending on depth.",
    plan: "Often a series of 3–6, spaced about a month apart.",
    art: "layers",
  },
  {
    id: "facial",
    name: "Medical-grade facial",
    short: "Clear and hydrate",
    category: "skin",
    for: "Congestion, dehydration from desert air, pre-event skin.",
    about:
      "Deep cleansing, gentle extraction and hydration with products chosen for your skin, not a set routine. A good first visit if you are new to treatments.",
    session: "60 min",
    downtime: "None.",
    plan: "Monthly, or a week before an event.",
    art: "ripple",
  },
  {
    id: "ipl",
    name: "IPL photofacial",
    short: "Fade sun damage",
    category: "laser",
    for: "Brown spots, redness and visible vessels from years of Arizona sun.",
    about:
      "Broad-spectrum light targets pigment and redness under the surface. Spots darken first, then lift away. Best scheduled in the cooler months, when sun exposure is easier to avoid.",
    session: "30–45 min",
    downtime: "Spots darken and flake off within 1–2 weeks.",
    plan: "Usually 3 sessions, about 4 weeks apart.",
    art: "light",
  },
  {
    id: "laser-hair",
    name: "Laser hair reduction",
    short: "Lasting smooth skin",
    category: "laser",
    for: "Face, underarms, legs and bikini area.",
    about:
      "Laser energy targets the follicle during its growth phase, which is why it takes a series. Settings are matched to your skin tone and hair color at a patch test first.",
    session: "15–60 min by area",
    downtime: "Mild redness for a few hours.",
    plan: "Typically 6–8 sessions, 4–8 weeks apart.",
    art: "fine",
  },
];

export const consultation = {
  id: "consultation",
  name: "Consultation only",
  short: "Not sure yet? Start here.",
} as const;

export function findTreatment(id: string | null | undefined) {
  return treatments.find((t) => t.id === id);
}
