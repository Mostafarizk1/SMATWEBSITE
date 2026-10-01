"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  webm: string | null;
  mp4: string | null;
  /** "idle": after the page is idle (hero). "visible": when scrolled near (below the fold). */
  trigger: "idle" | "visible";
  className?: string;
};

type NetworkInformation = { saveData?: boolean };

const shouldSkip = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  (navigator as Navigator & { connection?: NetworkInformation }).connection?.saveData === true;

/**
 * Never the LCP element: the poster (a next/image behind it) is. Sources aren't attached until
 * the trigger fires, and not at all with reduced motion or Save-Data. Fades in only once playing.
 */
export function LazyVideo({ webm, mp4, trigger, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (shouldSkip()) return;
    const el = ref.current;
    if (!el) return;

    if (trigger === "visible") {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoad(true);
            io.disconnect();
          }
        },
        { rootMargin: "200px" },
      );
      io.observe(el);
      return () => io.disconnect();
    }

    const hasIdle = typeof window.requestIdleCallback === "function";
    let idleId = 0;
    const start = () => {
      idleId = hasIdle ? window.requestIdleCallback(() => setLoad(true), { timeout: 4000 }) : window.setTimeout(() => setLoad(true), 2500);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, [trigger]);

  useEffect(() => {
    const el = ref.current;
    if (!load || !el) return;
    el.load();
    el.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      muted
      playsInline
      loop
      preload="none"
      aria-hidden
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={`transition-opacity duration-1000 ${playing ? "" : "!opacity-0"} ${className}`}
    >
      {load && webm && <source src={webm} type="video/webm" />}
      {load && mp4 && <source src={mp4} type="video/mp4" />}
    </video>
  );
}
