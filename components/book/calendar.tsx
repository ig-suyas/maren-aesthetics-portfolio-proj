"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, bookableRange, fromKey, isBookable, longDate, monthLabel, toKey } from "@/lib/availability";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarProps = {
  value: string | null;
  onChange: (key: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

/** Month grid with roving focus: arrows move by day or week, Home/End jump within the week. */
export function Calendar({ value, onChange, invalid, describedBy }: CalendarProps) {
  const { first, last } = useMemo(() => bookableRange(), []);
  const initial = value ? fromKey(value) : first;
  const [month, setMonth] = useState(() => new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [focusKey, setFocusKey] = useState(() => toKey(initial));
  const grid = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);

  const days = useMemo(() => {
    const start = addDays(month, -month.getDay());
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [month]);

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-key="${focusKey}"]`)?.focus();
  }, [focusKey, month]);

  const canPrev = month > new Date(first.getFullYear(), first.getMonth(), 1);
  const canNext = month < new Date(last.getFullYear(), last.getMonth(), 1);

  const shiftMonth = (dir: 1 | -1) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + dir, 1));

  const moveFocus = (d: Date) => {
    if (d < first || d > last) return;
    if (d.getMonth() !== month.getMonth() || d.getFullYear() !== month.getFullYear()) {
      setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    }
    shouldFocus.current = true;
    setFocusKey(toKey(d));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, d: Date) => {
    const moves: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -d.getDay(), End: 6 - d.getDay() };
    if (e.key in moves) {
      e.preventDefault();
      moveFocus(addDays(d, moves[e.key]));
    }
  };

  // Keep a focusable day in the visible month
  const visibleFocus = days.some((d) => toKey(d) === focusKey && d.getMonth() === month.getMonth())
    ? focusKey
    : toKey(days.find((d) => d.getMonth() === month.getMonth() && isBookable(d)) ?? days.find((d) => d.getMonth() === month.getMonth())!);

  return (
    <div className={`rounded-md border bg-stone p-4 sm:p-6 ${invalid ? "border-error" : "border-line"}`}>
      <div className="flex items-center justify-between">
        <p className="font-display text-2xl" aria-live="polite">
          {monthLabel.format(month)}
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            disabled={!canPrev}
            aria-label="Previous month"
            className="inline-flex size-11 items-center justify-center rounded-pill text-ink transition-colors hover:bg-stone-2 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            disabled={!canNext}
            aria-label="Next month"
            className="inline-flex size-11 items-center justify-center rounded-pill text-ink transition-colors hover:bg-stone-2 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={grid} role="group" aria-label="Choose a date" aria-describedby={describedBy} className="mt-4">
        <div className="grid grid-cols-7 text-center" aria-hidden="true">
          {WEEKDAYS.map((w) => (
            <span key={w} className="py-2 text-xs font-semibold tracking-[0.08em] text-muted uppercase">
              {w}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const key = toKey(d);
            const inMonth = d.getMonth() === month.getMonth();
            if (!inMonth) return <span key={key} aria-hidden="true" />;
            const ok = isBookable(d);
            const selected = value === key;
            return (
              <button
                key={key}
                type="button"
                data-key={key}
                tabIndex={key === visibleFocus ? 0 : -1}
                aria-pressed={selected}
                aria-disabled={!ok}
                aria-label={`${longDate.format(d)}${ok ? "" : ", unavailable"}`}
                onClick={() => {
                  setFocusKey(key);
                  if (ok) onChange(key);
                }}
                onKeyDown={(e) => onKeyDown(e, d)}
                className={`tabular relative mx-auto flex size-11 items-center justify-center rounded-pill text-[0.9375rem] transition-colors ${
                  selected
                    ? "bg-rose-deep font-semibold text-stone"
                    : ok
                      ? "text-ink hover:bg-rose-soft"
                      : "cursor-not-allowed text-muted/60 line-through decoration-muted/40"
                }`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
