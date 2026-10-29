import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { DuskScene } from "@/components/art/dusk-scene";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[75vh] items-center gap-14 py-20 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="eyebrow tabular text-muted">Error 404</p>
        <h1 className="mt-6 font-display text-display-xl">
          This path leads <em className="display-em">into the desert.</em>
        </h1>
        <p className="mt-8 max-w-md text-lead text-ink-2">The page may have moved, or the link may be old. Everything else is where you left it.</p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/treatments" variant="ghost">
            See treatments
          </ButtonLink>
        </div>
      </div>
      <DuskScene id="lost" className="mx-auto w-full max-w-[18rem] lg:col-span-4 lg:col-start-9" />
    </section>
  );
}
