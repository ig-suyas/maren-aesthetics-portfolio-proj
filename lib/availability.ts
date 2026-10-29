/*
 * Front-end only availability for the concept. Openings are generated
 * deterministically from the date so they stay stable between visits.
 */

const WEEKDAY_SLOTS = ["9:00 am", "9:45 am", "10:30 am", "11:15 am", "12:00 pm", "1:30 pm", "2:15 pm", "3:00 pm", "3:45 pm", "4:30 pm", "5:15 pm"];
const SATURDAY_SLOTS = WEEKDAY_SLOTS.slice(0, 7);

export const BOOKING_WINDOW_DAYS = 60;

export function toKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function fromKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function addDays(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

/** Closed Sunday and Monday (matches clinic hours). */
export function isClosed(d: Date) {
  const day = d.getDay();
  return day === 0 || day === 1;
}

function hash(key: string) {
  let h = 7;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h;
}

export type Slot = { time: string; open: boolean };

export function slotsFor(key: string): Slot[] {
  const d = fromKey(key);
  if (isClosed(d)) return [];
  const h = hash(key);
  const base = d.getDay() === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS;
  // Roughly one open day in eight is fully booked, so the empty state is real.
  if (h % 8 === 0) return base.map((time) => ({ time, open: false }));
  return base.map((time, i) => ({ time, open: (h >>> i) % 5 > 1 }));
}

/** Earliest bookable day is tomorrow; latest is the end of the booking window. */
export function bookableRange() {
  const today = startOfToday();
  return { first: addDays(today, 1), last: addDays(today, BOOKING_WINDOW_DAYS) };
}

export function isBookable(d: Date) {
  const { first, last } = bookableRange();
  return d >= first && d <= last && !isClosed(d);
}

export function nextOpenDay(after: Date) {
  const { last } = bookableRange();
  for (let d = addDays(after, 1); d <= last; d = addDays(d, 1)) {
    if (isBookable(d) && slotsFor(toKey(d)).some((s) => s.open)) return d;
  }
  return null;
}

export const longDate = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });
export const shortDate = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" });
export const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
