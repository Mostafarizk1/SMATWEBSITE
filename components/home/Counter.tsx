"use client";

import { useEffect, useRef } from "react";

/**
 * Counts up once when scrolled into view. SSR renders the final value (correct without JS / for SEO).
 * Number + suffix live in one text node inside a width-reserving grid cell, so counting causes no layout shift.
 */
export function Counter({ value, suffix = "", locale }: { value: number; suffix?: string; locale: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (n: number) => `${n.toLocaleString(locale === "ar" ? "ar-SA-u-nu-latn" : "en-US")}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already visible on mount (e.g. deep link)? Leave the final value.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = fmt(0);
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 4);
          el.textContent = fmt(Math.round(value * eased));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, suffix, locale]);

  return (
    <span className="grid tabular-nums">
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {fmt(value)}
      </span>
      <span ref={ref} className="col-start-1 row-start-1">
        {fmt(value)}
      </span>
    </span>
  );
}
