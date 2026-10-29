export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const siteName = "Maren Aesthetics";

export const siteDescription =
  "Physician-led aesthetic medicine in Old Town Scottsdale. Neurotoxin, filler, skin and laser treatments planned conservatively, with honest downtime. A concept site.";

export const primaryNav = [
  { href: "/treatments", label: "Treatments" },
  { href: "/results", label: "Results" },
  { href: "/team", label: "Team" },
] as const;

/** Fictional clinic details. Placeholder until a real client supplies them. */
export const clinic = {
  area: "Old Town Scottsdale, Arizona",
  hours: [
    { days: "Tue – Fri", time: "9:00 am – 6:00 pm" },
    { days: "Saturday", time: "9:00 am – 3:00 pm" },
    { days: "Sun – Mon", time: "Closed" },
  ],
} as const;
