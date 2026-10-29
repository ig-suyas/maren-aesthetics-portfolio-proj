"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { AlertCircle, ArrowLeft, Check, CalendarPlus, Loader2 } from "lucide-react";
import { consultation, findTreatment, treatments } from "@/lib/treatments";
import { fromKey, longDate, nextOpenDay, shortDate, slotsFor, toKey, type Slot } from "@/lib/availability";
import { Calendar } from "./calendar";
import { Button } from "@/components/button";
import { ArchMark } from "@/components/logo";

const STEPS = ["Treatment", "Date & time", "Your details", "Review"] as const;
const ease = [0.22, 1, 0.36, 1] as const;

type Details = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contact: "email" | "phone" | "text";
  firstVisit: "yes" | "no" | "";
  notes: string;
  adult: boolean;
};

type Errors = Partial<Record<keyof Details | "service" | "date" | "time", string>>;

const emptyDetails: Details = { firstName: "", lastName: "", email: "", phone: "", contact: "email", firstVisit: "", notes: "", adult: false };

const serviceOptions = [{ id: consultation.id, name: consultation.name, short: consultation.short }, ...treatments];
const serviceName = (id: string | null) => serviceOptions.find((s) => s.id === id)?.name ?? "";

const digits = (v: string) => v.replace(/\D/g, "");
function formatPhone(v: string) {
  let d = digits(v);
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : v;
}

function validateDetails(d: Details): Errors {
  const e: Errors = {};
  if (!d.firstName.trim()) e.firstName = "Enter your first name.";
  if (!d.lastName.trim()) e.lastName = "Enter your last name.";
  if (!d.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = "Enter an email address like name@example.com.";
  const p = digits(d.phone);
  if (!p) e.phone = "Enter a phone number so we can confirm your visit.";
  else if (!(p.length === 10 || (p.length === 11 && p.startsWith("1")))) e.phone = "Enter a 10-digit US phone number.";
  if (!d.firstVisit) e.firstVisit = "Let us know if this is your first visit.";
  if (d.notes.length > 500) e.notes = "Keep notes under 500 characters.";
  if (!d.adult) e.adult = "Please confirm you are 18 or older.";
  return e;
}

function icsFile(service: string, dateKey: string, time: string) {
  const d = fromKey(dateKey);
  const [, hh, mm, ap] = time.match(/(\d+):(\d+) (am|pm)/)!;
  let h = Number(hh) % 12;
  if (ap === "pm") h += 12;
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = (date: Date, hour: number, min: number) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(hour)}${pad(min)}00`;
  const endMin = Number(mm) + 45;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maren Aesthetics concept//EN",
    "BEGIN:VEVENT",
    `UID:${dateKey}-${h}${mm}@maren-concept`,
    `DTSTAMP:${stamp(new Date(), new Date().getHours(), new Date().getMinutes())}`,
    `DTSTART:${stamp(d, h, Number(mm))}`,
    `DTEND:${stamp(d, h + Math.floor(endMin / 60), endMin % 60)}`,
    `SUMMARY:Maren consultation: ${service} (requested)`,
    "LOCATION:Old Town Scottsdale\\, AZ",
    "DESCRIPTION:Requested time. Concept booking: no appointment has been made.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Details, boolean>>>({});
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showSummary, setShowSummary] = useState(false);
  const summary = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef(false);

  // Move focus to a step's heading once it mounts (after the exit animation), for keyboard and screen reader users
  const focusOnMount = useCallback((el: HTMLHeadingElement | null) => {
    if (!el || !pendingFocus.current) return;
    pendingFocus.current = false;
    el.focus();
  }, []);

  // Prefill from /book?service=… (links on the Treatments page)
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("service");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of the URL after hydration
    if (findTreatment(id)) setService(id);
  }, []);

  // Simulated availability lookup, so the loading state is real
  useEffect(() => {
    if (!date) return;
    const t = setTimeout(() => setSlots(slotsFor(date)), 450);
    return () => clearTimeout(t);
  }, [date]);

  useEffect(() => {
    if (showSummary) summary.current?.focus();
  }, [showSummary]);

  const go = (n: number) => {
    pendingFocus.current = true;
    setShowSummary(false);
    setErrors({});
    setStep(n);
  };

  const next = () => {
    const e: Errors = {};
    if (step === 0 && !service) e.service = "Choose a treatment, or a consultation if you're not sure yet.";
    if (step === 1) {
      if (!date) e.date = "Choose a date.";
      else if (!time) e.time = "Choose a time.";
    }
    if (step === 2) Object.assign(e, validateDetails(details));
    setErrors(e);
    if (Object.keys(e).length) {
      if (step === 2) {
        setTouched({ firstName: true, lastName: true, email: true, phone: true, firstVisit: true, adult: true, notes: true });
        setShowSummary(true);
      }
      return;
    }
    go(step + 1);
  };

  const pickDate = (key: string) => {
    if (key === date) return;
    setDate(key);
    setTime(null);
    setSlots(null);
    setErrors((e) => ({ ...e, date: undefined }));
  };

  const update = <K extends keyof Details>(key: K, value: Details[K]) => {
    const nextDetails = { ...details, [key]: value };
    setDetails(nextDetails);
    if (touched[key]) setErrors((e) => ({ ...e, [key]: validateDetails(nextDetails)[key] }));
  };

  const blur = (key: keyof Details) => {
    setTouched((t) => ({ ...t, [key]: true }));
    const nextDetails = key === "phone" ? { ...details, phone: formatPhone(details.phone) } : details;
    if (key === "phone") setDetails(nextDetails);
    setErrors((e) => ({ ...e, [key]: validateDetails(nextDetails)[key] }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) return next();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    const ok = navigator.onLine;
    pendingFocus.current = ok;
    setStatus(ok ? "success" : "error");
  };

  const downloadIcs = () => {
    if (!service || !date || !time) return;
    const url = URL.createObjectURL(new Blob([icsFile(serviceName(service), date, time)], { type: "text/calendar" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: "maren-consultation.ics" });
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setService(null);
    setDate(null);
    setTime(null);
    setSlots(null);
    setDetails(emptyDetails);
    setTouched({});
    setStatus("idle");
    go(0);
  };

  const summaryItems: [string, string | null][] = [
    ["Treatment", service ? serviceName(service) : null],
    ["Date", date ? longDate.format(fromKey(date)) : null],
    ["Time", time],
  ];

  if (status === "success" && service && date && time) {
    return (
      <MotionConfig reducedMotion="user">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="lg:col-span-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <ArchMark className="h-16 w-auto" />
              <h2 ref={focusOnMount} tabIndex={-1} className="mt-8 font-display text-display-l outline-none">
                Request received, <em className="display-em">{details.firstName.trim()}.</em>
              </h2>
              <p className="mt-6 max-w-[52ch] text-lead text-ink-2">
                Our patient coordinator will {details.contact === "email" ? "email" : details.contact === "text" ? "text" : "call"} you within one business day to confirm your
                consultation. Nothing is final until then.
              </p>
              <p className="mt-4 text-sm text-muted">Concept site: no details were sent or stored.</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button type="button" onClick={downloadIcs}>
                  <CalendarPlus className="size-4" aria-hidden="true" />
                  Add to calendar
                </Button>
                <Button type="button" variant="ghost" onClick={reset}>
                  Make another request
                </Button>
              </div>
            </div>
            <dl className="self-start rounded-md border border-line p-6 lg:col-span-4 lg:col-start-9">
              {summaryItems.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </MotionConfig>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];

  return (
    <MotionConfig reducedMotion="user">
      {/* Summary rail */}
      <aside aria-label="Your request" className="hidden lg:col-span-4 lg:block">
        <div className="sticky top-28">
          <p className="eyebrow text-muted">Your request</p>
          <dl className="mt-5 border-t border-line">
            {summaryItems.map(([k, v]) => (
              <div key={k} className="flex min-h-14 items-center justify-between gap-6 border-b border-line py-3">
                <dt className="text-muted">{k}</dt>
                <dd className={v ? "text-right font-medium" : "text-muted/70"}>{v ?? "Not chosen"}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-[34ch] text-small text-muted">
            Consultations take about 45 minutes with a clinician. You will get a written plan and estimate. Treatment the same day is optional.
          </p>
        </div>
      </aside>

      <form noValidate onSubmit={submit} className="lg:col-span-7 lg:col-start-6" aria-labelledby="step-title">
        {/* Progress */}
        <ol className="grid grid-cols-4 gap-2" aria-label="Booking steps">
          {STEPS.map((s, i) => (
            <li key={s} aria-current={i === step ? "step" : undefined}>
              <span className={`block h-0.5 origin-left transition-colors duration-500 ${i <= step ? "bg-rose-deep" : "bg-line"}`} />
              <span className={`mt-3 hidden text-sm sm:block ${i === step ? "font-medium text-ink" : "text-muted"}`}>
                {i < step && <Check className="mr-1 inline size-3.5 text-rose-deep" aria-hidden="true" />}
                {s}
                {i < step && <span className="sr-only"> (done)</span>}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-muted sm:hidden">
          Step {step + 1} of 4 · {STEPS[step]}
        </p>

        {/* Error summary (details step) */}
        {showSummary && errorList.length > 0 && (
          <div ref={summary} tabIndex={-1} role="alert" className="mt-8 rounded-md border border-error bg-error/5 p-5 outline-none focus-visible:outline-2 focus-visible:outline-error">
            <p className="flex items-center gap-2 font-medium text-error">
              <AlertCircle className="size-5" aria-hidden="true" />
              Please fix {errorList.length === 1 ? "this" : `these ${errorList.length}`} before continuing
            </p>
            <ul className="mt-3 space-y-1 pl-7 text-small">
              {errorList.map(([k, v]) => (
                <li key={k}>
                  <a href={`#f-${k}`} className="text-ink underline decoration-error/50 underline-offset-4 hover:decoration-error">
                    {v}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease }}
            className="mt-10"
          >
            <h2 id="step-title" ref={focusOnMount} tabIndex={-1} className="font-display text-display-m outline-none">
              {
                [
                  <>What would you <em key="e" className="display-em">like to discuss?</em></>,
                  <>Choose a <em key="e" className="display-em">day and time.</em></>,
                  <>How should we <em key="e" className="display-em">reach you?</em></>,
                  <>Check your <em key="e" className="display-em">request.</em></>,
                ][step]
              }
            </h2>

            {step === 0 && (
              <fieldset className="mt-8" aria-describedby={errors.service ? "f-service-error" : undefined}>
                <legend className="sr-only">Treatment</legend>
                <div id="f-service" className="border-t border-line">
                  {serviceOptions.map((s) => (
                    <label
                      key={s.id}
                      className="group flex min-h-16 cursor-pointer items-center gap-4 border-b border-line py-4 transition-colors has-[:checked]:bg-rose-soft/50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rose-deep hover:bg-stone-2 sm:px-3"
                    >
                      <input
                        type="radio"
                        name="service"
                        value={s.id}
                        checked={service === s.id}
                        onChange={() => {
                          setService(s.id);
                          setErrors({});
                        }}
                        className="peer sr-only"
                      />
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-pill border border-field peer-checked:border-rose-deep peer-checked:bg-rose-deep" aria-hidden="true">
                        <span className="size-2 rounded-pill bg-stone opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{s.name}</span>
                        <span className="block text-small text-muted">{s.short}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <FieldError id="f-service-error" message={errors.service} />
              </fieldset>
            )}

            {step === 1 && (
              <div className="mt-8 grid gap-10">
                <div id="f-date">
                  <p className="mb-3 text-small text-muted" id="date-help">
                    Open Tuesday to Saturday. Use the arrow keys to move between days.
                  </p>
                  <Calendar value={date} onChange={pickDate} invalid={!!errors.date} describedBy={errors.date ? "date-help f-date-error" : "date-help"} />
                  <FieldError id="f-date-error" message={errors.date} />
                </div>

                {date && (
                  <fieldset id="f-time" aria-describedby={errors.time ? "f-time-error" : undefined}>
                    <legend className="font-medium">
                      Openings on <span className="text-rose-deep">{longDate.format(fromKey(date))}</span>
                    </legend>
                    <div className="mt-4" aria-live="polite" aria-busy={!slots}>
                      {!slots ? (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          <span className="sr-only">Checking openings…</span>
                          {Array.from({ length: 8 }, (_, i) => (
                            <span key={i} className="h-12 animate-pulse rounded-pill bg-stone-3/70" aria-hidden="true" />
                          ))}
                        </div>
                      ) : slots.some((s) => s.open) ? (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {slots.map((s) => (
                            <label key={s.time} className={`relative ${s.open ? "cursor-pointer" : "cursor-not-allowed"}`}>
                              <input
                                type="radio"
                                name="time"
                                value={s.time}
                                disabled={!s.open}
                                checked={time === s.time}
                                onChange={() => {
                                  setTime(s.time);
                                  setErrors({});
                                }}
                                className="peer sr-only"
                              />
                              <span className="tabular flex min-h-12 items-center justify-center rounded-pill border border-field/60 text-[0.9375rem] transition-colors peer-checked:border-rose-deep peer-checked:bg-rose-deep peer-checked:text-stone peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose-deep peer-disabled:border-dashed peer-disabled:border-line peer-disabled:text-muted/60 peer-disabled:line-through hover:peer-enabled:border-ink">
                                {s.time}
                                {!s.open && <span className="sr-only">, booked</span>}
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <EmptyDay dateKey={date} onPick={pickDate} />
                      )}
                    </div>
                    <FieldError id="f-time-error" message={errors.time} />
                  </fieldset>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field id="firstName" label="First name" error={touched.firstName ? errors.firstName : undefined}>
                  {(p) => <input {...p} autoComplete="given-name" value={details.firstName} onChange={(e) => update("firstName", e.target.value)} onBlur={() => blur("firstName")} />}
                </Field>
                <Field id="lastName" label="Last name" error={touched.lastName ? errors.lastName : undefined}>
                  {(p) => <input {...p} autoComplete="family-name" value={details.lastName} onChange={(e) => update("lastName", e.target.value)} onBlur={() => blur("lastName")} />}
                </Field>
                <Field id="email" label="Email" error={touched.email ? errors.email : undefined}>
                  {(p) => (
                    <input {...p} type="email" inputMode="email" autoComplete="email" value={details.email} onChange={(e) => update("email", e.target.value)} onBlur={() => blur("email")} />
                  )}
                </Field>
                <Field id="phone" label="Mobile phone" hint="US number, for confirming your visit" error={touched.phone ? errors.phone : undefined}>
                  {(p) => <input {...p} type="tel" inputMode="tel" autoComplete="tel-national" value={details.phone} onChange={(e) => update("phone", e.target.value)} onBlur={() => blur("phone")} />}
                </Field>

                <fieldset className="sm:col-span-2">
                  <legend className="text-small font-medium">Best way to confirm</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(["email", "phone", "text"] as const).map((c) => (
                      <Chip key={c} name="contact" checked={details.contact === c} onChange={() => update("contact", c)}>
                        {c === "phone" ? "Phone call" : c === "text" ? "Text message" : "Email"}
                      </Chip>
                    ))}
                  </div>
                </fieldset>

                <fieldset id="f-firstVisit" className="sm:col-span-2" aria-describedby={touched.firstVisit && errors.firstVisit ? "f-firstVisit-error" : undefined}>
                  <legend className="text-small font-medium">Is this your first visit to Maren?</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(["yes", "no"] as const).map((v) => (
                      <Chip
                        key={v}
                        name="firstVisit"
                        checked={details.firstVisit === v}
                        onChange={() => {
                          setTouched((t) => ({ ...t, firstVisit: true }));
                          update("firstVisit", v);
                          setErrors((e) => ({ ...e, firstVisit: undefined }));
                        }}
                      >
                        {v === "yes" ? "Yes, first visit" : "I've been before"}
                      </Chip>
                    ))}
                  </div>
                  <FieldError id="f-firstVisit-error" message={touched.firstVisit ? errors.firstVisit : undefined} />
                </fieldset>

                <Field id="notes" label="Anything we should know?" optional hint={`${details.notes.length}/500 characters`} error={touched.notes ? errors.notes : undefined} className="sm:col-span-2">
                  {(p) => (
                    <textarea {...p} rows={4} value={details.notes} onChange={(e) => update("notes", e.target.value)} onBlur={() => blur("notes")} className={`${p.className} min-h-32 py-3`} />
                  )}
                </Field>

                <div id="f-adult" className="sm:col-span-2">
                  <label className="flex min-h-11 cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={details.adult}
                      onChange={(e) => {
                        setTouched((t) => ({ ...t, adult: true }));
                        update("adult", e.target.checked);
                        if (e.target.checked) setErrors((er) => ({ ...er, adult: undefined }));
                      }}
                      aria-invalid={!!(touched.adult && errors.adult)}
                      aria-describedby={touched.adult && errors.adult ? "f-adult-error" : undefined}
                      className="mt-0.5 size-5 shrink-0 accent-rose-deep"
                    />
                    <span className="text-small">I confirm I am 18 or older.</span>
                  </label>
                  <FieldError id="f-adult-error" message={touched.adult ? errors.adult : undefined} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-8">
                <dl className="border-t border-line">
                  {(
                    [
                      ["Treatment", serviceName(service), 0],
                      ["Date", date ? longDate.format(fromKey(date)) : "", 1],
                      ["Time", time, 1],
                      ["Name", `${details.firstName.trim()} ${details.lastName.trim()}`, 2],
                      ["Email", details.email.trim(), 2],
                      ["Phone", details.phone, 2],
                    ] as const
                  ).map(([k, v, s]) => (
                    <div key={k} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 border-b border-line py-4 sm:grid-cols-[9rem_1fr_auto]">
                      <dt className="text-small text-muted">{k}</dt>
                      <dd className="min-w-0 break-words font-medium">{v}</dd>
                      <dd>
                        <button type="button" onClick={() => go(s)} className="min-h-11 rounded-sm px-2 text-small text-rose-deep underline-offset-4 hover:underline">
                          Change<span className="sr-only"> {k.toLowerCase()}</span>
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
                {details.notes.trim() && <p className="mt-6 max-w-[60ch] text-small text-ink-2">“{details.notes.trim()}”</p>}

                {status === "error" && (
                  <div role="alert" className="mt-8 flex gap-3 rounded-md border border-error bg-error/5 p-5 text-small">
                    <AlertCircle className="size-5 shrink-0 text-error" aria-hidden="true" />
                    <p>
                      <span className="font-medium text-error">We couldn&apos;t send your request.</span> It looks like you&apos;re offline. Check your connection and try again. Your
                      answers are still here.
                    </p>
                  </div>
                )}
                <p className="mt-8 text-sm text-muted">This is a concept. Submitting does not send your details anywhere.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={status === "submitting"}
              className="-ml-2 inline-flex min-h-11 items-center gap-2 rounded-pill px-2 text-[0.9375rem] font-medium text-ink-2 hover:text-ink disabled:opacity-50"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back
            </button>
          ) : (
            <span />
          )}
          <Button type="submit" disabled={status === "submitting"} aria-describedby={step === 3 ? undefined : "step-next-hint"}>
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Sending request…
              </>
            ) : step === 3 ? (
              status === "error" ? "Try again" : "Request appointment"
            ) : (
              "Continue"
            )}
          </Button>
          <span id="step-next-hint" className="sr-only">
            Goes to {STEPS[Math.min(step + 1, 3)]}
          </span>
        </div>
      </form>
    </MotionConfig>
  );
}

function EmptyDay({ dateKey, onPick }: { dateKey: string; onPick: (key: string) => void }) {
  const next = nextOpenDay(fromKey(dateKey));
  return (
    <div className="rounded-md border border-dashed border-field/60 p-6">
      <p className="font-medium">This day is fully booked.</p>
      {next ? (
        <p className="mt-2 text-small text-ink-2">
          The next opening is on {shortDate.format(next)}.{" "}
          <button type="button" onClick={() => onPick(toKey(next))} className="min-h-11 font-medium text-rose-deep underline underline-offset-4">
            Show {shortDate.format(next)}
          </button>
        </p>
      ) : (
        <p className="mt-2 text-small text-ink-2">Try a different date, or call us and we&apos;ll add you to the waitlist.</p>
      )}
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-small text-error">
      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

const inputClass =
  "w-full min-h-12 rounded-md border border-field bg-stone px-4 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-ink focus:border-rose-deep focus:outline-2 focus:outline-offset-0 focus:outline-rose-deep aria-[invalid=true]:border-error";

function Field({
  id,
  label,
  hint,
  optional,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  optional?: boolean;
  error?: string;
  className?: string;
  children: (props: { id: string; name: string; className: string; "aria-invalid": boolean; "aria-describedby"?: string; required?: boolean }) => ReactNode;
}) {
  const describedBy = [hint && `f-${id}-hint`, error && `f-${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="flex items-baseline justify-between gap-3 text-small font-medium">
        {label}
        {optional && <span className="font-normal text-muted">Optional</span>}
      </label>
      <div className="mt-2">{children({ id: `f-${id}`, name: id, className: inputClass, "aria-invalid": !!error, "aria-describedby": describedBy, required: !optional })}</div>
      {hint && (
        <p id={`f-${id}-hint`} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      <FieldError id={`f-${id}-error`} message={error} />
    </div>
  );
}

function Chip({ name, checked, onChange, children }: { name: string; checked: boolean; onChange: () => void; children: ReactNode }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-flex min-h-11 items-center rounded-pill border border-field/60 px-5 text-[0.9375rem] transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-stone peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose-deep hover:border-ink">
        {children}
      </span>
    </label>
  );
}
