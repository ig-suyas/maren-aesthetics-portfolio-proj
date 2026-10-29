"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

type Stage = { when: string; title: string; body: string };

/* General guidance only. Concept copy, to be reviewed by a medical director. */
const journeys: { id: string; label: string; stages: Stage[] }[] = [
  {
    id: "neurotoxin",
    label: "Neurotoxin",
    stages: [
      { when: "Day 0", title: "Treatment", body: "Small raised marks where the injections went in. They usually settle within the hour." },
      { when: "Days 3–5", title: "Softening begins", body: "Movement starts to ease. Lines formed by frowning or squinting look less etched." },
      { when: "Week 2", title: "Full effect", body: "Your review appointment. We photograph in the same light and top up only if you want more." },
      { when: "Months 3–4", title: "Gradual return", body: "Movement comes back slowly. Most people rebook when they notice the lines again." },
    ],
  },
  {
    id: "filler",
    label: "Filler",
    stages: [
      { when: "Day 0", title: "Immediate change", body: "Volume is visible straight away, along with some swelling that exaggerates it." },
      { when: "Days 2–3", title: "Swelling peaks", body: "Any swelling or bruising is at its most noticeable, then eases over the following days." },
      { when: "Week 2", title: "Settled", body: "The filler has integrated. This is the result to judge, at your review appointment." },
      { when: "Months 6–18", title: "Slowly absorbed", body: "The body breaks filler down over time. How long depends on the area and the product." },
    ],
  },
  {
    id: "microneedling",
    label: "Microneedling",
    stages: [
      { when: "Day 0", title: "Flushed skin", body: "Skin looks and feels like a mild sunburn. Mineral sunscreen only from the next morning." },
      { when: "Days 1–3", title: "Calming", body: "Redness fades and skin may feel tight or dry. Makeup is usually fine after day two." },
      { when: "Weeks 4–6", title: "Next session", body: "The second of three sessions, once the skin has fully recovered from the first." },
      { when: "Month 3", title: "Texture refines", body: "New collagen keeps forming after your last session, so texture continues to improve." },
    ],
  },
  {
    id: "ipl",
    label: "IPL",
    stages: [
      { when: "Day 0", title: "Warmth", body: "A warm, slightly pink look, similar to a short time in the sun." },
      { when: "Days 2–7", title: "Spots darken", body: "Treated brown spots turn darker, a little like coffee grounds. That's expected." },
      { when: "Weeks 1–2", title: "Spots lift", body: "Darkened spots flake away on their own. Skin tone looks clearer and more even." },
      { when: "Month 1", title: "Next session", body: "Usually three sessions in total. Daily sunscreen keeps new spots from forming." },
    ],
  },
];

// Four points along the sun's arc
const ARC = { cx: 400, cy: 210, rx: 350, ry: 168 };
const points = [0.1, 0.37, 0.63, 0.9].map((t) => {
  const a = Math.PI * (1 - t);
  return { x: ARC.cx + ARC.rx * Math.cos(a), y: ARC.cy - ARC.ry * Math.sin(a) };
});

const ease = [0.22, 1, 0.36, 1] as const;

export function ResultsTimeline() {
  const [tab, setTab] = useState(0);
  const [stage, setStage] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const journey = journeys[tab];

  const selectTab = (i: number) => {
    setTab(i);
    setStage(0);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (tab + dir + journeys.length) % journeys.length;
    selectTab(next);
    tabs.current[next]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div role="tablist" aria-label="Treatment" className="flex flex-wrap gap-2">
        {journeys.map((j, i) => (
          <button
            key={j.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${j.id}`}
            aria-selected={tab === i}
            aria-controls={`panel-${j.id}`}
            tabIndex={tab === i ? 0 : -1}
            onClick={() => selectTab(i)}
            onKeyDown={onTabKey}
            className="relative min-h-11 rounded-pill border border-ink/20 px-5 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:border-ink hover:text-ink aria-selected:border-ink aria-selected:text-stone"
          >
            {tab === i && <motion.span layoutId="journey-pill" className="absolute inset-0 rounded-pill bg-ink" transition={{ duration: 0.45, ease }} />}
            <span className="relative">{j.label}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${journey.id}`} aria-labelledby={`tab-${journey.id}`} className="mt-12">
        <div className="relative">
          <svg viewBox="0 0 800 230" className="block w-full" aria-hidden="true">
            <line x1="0" x2="800" y1={ARC.cy} y2={ARC.cy} stroke="#2b1f22" strokeOpacity="0.35" />
            <path
              d={`M${ARC.cx - ARC.rx} ${ARC.cy} A${ARC.rx} ${ARC.ry} 0 0 1 ${ARC.cx + ARC.rx} ${ARC.cy}`}
              fill="none"
              stroke="#9c5f66"
              strokeOpacity="0.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
            />
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="5" fill={i <= stage ? "#84464e" : "#f3ece6"} stroke="#84464e" strokeWidth="1.5" />
            ))}
            <motion.g initial={false} animate={{ x: points[stage].x, y: points[stage].y }} transition={{ duration: 0.9, ease }}>
              <circle r="30" fill="#f6e0cb" />
              <circle r="42" fill="none" stroke="#e9b9a2" strokeOpacity="0.8" />
            </motion.g>
          </svg>
        </div>

        <ol className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {journey.stages.map((s, i) => (
            <li key={s.when}>
              <button
                type="button"
                aria-pressed={stage === i}
                onClick={() => setStage(i)}
                className="flex min-h-16 w-full flex-col items-start rounded-md border border-transparent px-4 py-3 text-left transition-colors hover:border-line aria-pressed:border-rose aria-pressed:bg-rose-soft/60"
              >
                <span className="tabular text-sm text-muted">{s.when}</span>
                <span className="mt-0.5 font-medium">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-10 min-h-36 border-t border-line pt-8 md:min-h-28" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${journey.id}-${stage}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
              className="grid gap-4 md:grid-cols-12"
            >
              <p className="font-display text-display-s italic text-rose-deep md:col-span-4">{journey.stages[stage].when}</p>
              <p className="max-w-[52ch] text-lead text-ink md:col-span-8">{journey.stages[stage].body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  );
}
