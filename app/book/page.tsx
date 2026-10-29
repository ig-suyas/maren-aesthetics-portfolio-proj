import type { Metadata } from "next";
import { BookingForm } from "@/components/book/booking-form";
import { MaskLines } from "@/components/in-view";

export const metadata: Metadata = {
  title: "Book a consultation",
  description: "Request a 45-minute consultation at Maren Aesthetics in Scottsdale. Choose a treatment, a day and a time. Concept site: nothing is sent.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="container-x pt-16 pb-12 md:pt-24 md:pb-16">
        <p className="eyebrow text-muted">Book a consultation</p>
        <h1 id="page-title" className="mt-6 max-w-[16ch] font-display text-display-xl">
          <MaskLines lines={["Start with", <em key="e" className="display-em">a conversation.</em>]} />
        </h1>
        <p className="mt-8 max-w-[54ch] text-lead text-ink-2">
          Four short steps. We&apos;ll confirm by your preferred method within one business day, and you can change or cancel at any time.
        </p>
      </section>

      <section aria-label="Booking form" className="container-x grid gap-12 pb-24 md:pb-36 lg:grid-cols-12 lg:gap-8">
        <BookingForm />
      </section>
    </>
  );
}
