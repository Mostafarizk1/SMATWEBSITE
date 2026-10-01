"use client";

import { useId, useRef, useState } from "react";
import { isRtl } from "@/lib/motion";
import type { PillarId } from "@/content/services";
import { CreateMotif, GrowMotif, ThinkMotif } from "./HeroMotifs";

export type PillarView = {
  id: PillarId;
  index: string;
  name: string;
  latin: string;
  tagline: string;
  services: { id: string; title: string; summary: string }[];
};

const motifs = { think: ThinkMotif, create: CreateMotif, grow: GrowMotif } as const;

type Props = { pillars: PillarView[]; label: string; locale: string };

/**
 * Tab switch animates with CSS (`.panel-in`, keyed remount), not Motion: measured, Motion added ~60 KB gz
 * to the home page for effects CSS runs on the compositor for free.
 */
export function MethodTabs({ pillars, label, locale }: Props) {
  const [active, setActiveState] = useState(0);
  // No entrance animation on first render (SSR markup is already in place).
  const [touched, setTouched] = useState(false);
  const setActive = (i: number) => {
    setTouched(true);
    setActiveState(i);
  };
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = pillars[active];
  const Motif = motifs[current.id];

  const focusTab = (i: number) => {
    const next = (i + pillars.length) % pillars.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const forward = isRtl(locale) ? "ArrowLeft" : "ArrowRight";
    const back = isRtl(locale) ? "ArrowRight" : "ArrowLeft";
    if (e.key === forward || e.key === "ArrowDown") focusTab(active + 1);
    else if (e.key === back || e.key === "ArrowUp") focusTab(active - 1);
    else if (e.key === "Home") focusTab(0);
    else if (e.key === "End") focusTab(pillars.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-10">
      <div role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={onKeyDown} className="grid grid-cols-3 gap-2 lg:col-span-5 lg:flex lg:flex-col lg:gap-0">
        {pillars.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`${uid}-tab-${p.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border px-3 py-4 text-center transition-colors duration-300 lg:flex-row lg:items-center lg:justify-between lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-0 lg:py-7 lg:text-start ${
                selected ? "border-accent bg-surface lg:bg-transparent" : "border-line hover:border-muted"
              }`}
            >
              <span className="flex flex-col items-center gap-1 lg:flex-row lg:items-baseline lg:gap-5">
                <span className={`font-display text-xs transition-colors lg:text-sm ${selected ? "text-accent-ink" : "text-muted"}`}>{p.index}</span>
                <span
                  className={`font-display text-xl font-semibold transition-colors duration-300 sm:text-2xl lg:text-6xl ${
                    selected ? "text-fg" : "text-muted group-hover:text-fg"
                  }`}
                >
                  {p.name}
                </span>
              </span>
              <span className="hidden font-display text-lg text-muted lg:inline">{p.latin}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel`}
        aria-labelledby={`${uid}-tab-${current.id}`}
        className="relative min-h-[26rem] overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:col-span-7"
      >
        <div key={current.id} className={touched ? "panel-in" : undefined}>
            <div className="flex items-start justify-between gap-6">
              <p className="max-w-md font-display text-xl leading-snug text-fg sm:text-2xl">{current.tagline}</p>
              <div className="text-[4.5rem] leading-none sm:text-[6rem]">
                <Motif base={0} />
              </div>
            </div>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
              {current.services.map((s) => (
                <li key={s.id} className="bg-surface p-5">
                  <h3 className="font-display text-base font-semibold text-fg">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{s.summary}</p>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </div>
  );
}
