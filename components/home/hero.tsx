"use client";

import { useState, type CSSProperties } from "react";
import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { DuskScene } from "@/components/art/dusk-scene";
import { ButtonLink } from "@/components/button";
import { MaskLines } from "@/components/in-view";
import { ConceptTag } from "@/components/concept-tag";

const letters = ["M", "a", "r", "e", "n"];

/**
 * Signature moment: the sunrise arch intro. Every animation is CSS so it starts
 * on first paint; Replay bumps a key, which remounts the art and restarts it.
 */
export function Hero() {
  const [run, setRun] = useState(0);
  const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-x grid min-h-[calc(100svh-72px)] gap-x-8 gap-y-8 pt-4 pb-14 md:grid-cols-2 md:gap-y-12 lg:grid-cols-12 lg:items-end lg:pb-16">
        {/* Arch + wordmark: the recordable frame */}
        <div key={run} className="flex flex-col items-center md:col-span-2 lg:order-2 lg:col-span-6">
          <div className="intro-arch relative w-[min(62vw,19rem)] lg:w-auto lg:h-[min(62svh,36rem)] lg:aspect-[424/584]">
            <DuskScene id="hero" intro className="block h-auto w-full lg:h-full" />
            <ConceptTag className="intro-fade absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
          </div>
          <p
            aria-hidden="true"
            className="-mt-[0.06em] flex font-display text-wordmark font-normal tracking-[-0.01em] text-ink italic"
          >
            {letters.map((l, i) => (
              <span key={i} className="-mx-[0.08em] inline-block overflow-hidden px-[0.08em] pb-[0.14em]">
                <span className="intro-letter" style={{ ["--i" as string]: i }}>
                  {l}
                </span>
              </span>
            ))}
          </p>
        </div>

        <div className="lg:order-1 lg:col-span-3 lg:pb-[4.5rem]">
          <p className="eyebrow text-muted">
            <MaskLines lines={["Aesthetic medicine", "Old Town Scottsdale"]} delay={500} />
          </p>
          <h1 id="hero-title" className="mt-6 max-w-[16ch] font-display text-display-s lg:text-[clamp(1.75rem,1rem+1.2vw,2.5rem)] lg:leading-[1.08]">
            <MaskLines lines={["Quiet,", <em key="e" className="display-em">physician-led</em>, "aesthetics for a", "rested, natural look."]} delay={650} />
          </h1>
        </div>

        <div className="flex flex-col lg:order-3 lg:col-span-3 lg:pb-[4.5rem]">
          <p className="intro-fade order-2 mt-8 max-w-[34ch] text-ink-2 lg:order-1 lg:mt-0" style={d(1000)}>
            Every plan starts with a consultation with our medical team. We treat conservatively, review with you at two weeks, and add more only if you ask.
          </p>
          <div className="intro-fade order-1 flex flex-wrap items-center gap-x-6 gap-y-4 lg:order-2 lg:mt-8" style={d(1150)}>
            <ButtonLink href="/book">Book a consultation</ButtonLink>
            <Link href="/treatments" className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-ink">
              <span className="link-draw">See treatments</span>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="intro-fade order-3 mt-8 -ml-2 inline-flex self-start lg:mt-10 min-h-11 items-center gap-2 rounded-pill px-2 text-sm text-muted transition-colors hover:text-ink"
            style={d(3400)}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Replay intro
          </button>
        </div>
      </div>
    </section>
  );
}
