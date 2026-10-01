"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export type WorkCardView = {
  slug: string;
  title: string;
  client: string;
  category: string;
  categoryLabel: string;
  poster: string;
  preview: string | null;
};

type Props = {
  items: WorkCardView[];
  categories: { id: string; label: string }[];
  labels: { all: string; filter: string; empty: string };
};

/** Filter re-entry animates with CSS (`.item-in`, keyed remount per filter). No Motion needed here. */
export function WorkGrid({ items, categories, labels }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [touched, setTouched] = useState(false);
  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);
  const chips = [{ id: "all", label: labels.all }, ...categories.filter((c) => items.some((i) => i.category === c.id))];

  return (
    <div>
      <div role="group" aria-label={labels.filter} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => {
              setTouched(true);
              setFilter(c.id);
            }}
            className="min-h-11 shrink-0 cursor-pointer rounded-full border border-line px-5 text-sm transition-colors hover:border-fg aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
          >
            {c.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((item, i) => (
          <li
            key={`${filter}-${item.slug}`}
            className={touched ? "item-in" : undefined}
            style={{ "--d": `${i * 0.05}s` } as React.CSSProperties}
          >
            <WorkCard item={item} />
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="mt-8 text-muted">{labels.empty}</p>}
    </div>
  );
}

function WorkCard({ item }: { item: WorkCardView }) {
  const video = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Hover preview: desktop (fine pointer) only, never on touch; nothing is fetched until hover.
  const onEnter = () => {
    if (!item.preview || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShowVideo(true);
    requestAnimationFrame(() => video.current?.play().catch(() => {}));
  };
  const onLeave = () => video.current?.pause();

  return (
    <article className="work-card group" onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <div className="work-media relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
        <Image src={item.poster} alt="" fill quality={60} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        {showVideo && item.preview && (
          <video ref={video} src={item.preview} muted playsInline loop preload="auto" aria-hidden className="absolute inset-0 size-full object-cover" />
        )}
        <span className="absolute start-4 top-4 rounded-full bg-bg/80 px-3 py-1 text-xs text-fg">{item.categoryLabel}</span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent-ink">{item.title}</h3>
          <p className="mt-1 text-sm text-muted">{item.client}</p>
        </div>
      </div>
    </article>
  );
}
