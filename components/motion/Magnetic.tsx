"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle magnetic pull toward the cursor. Desktop (fine pointer) only, skipped for reduced motion.
 * Writes transform directly in a rAF: no React re-renders, no layout reads during animation.
 */
export function Magnetic({ children, strength = 0.28, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let rect: DOMRect | null = null;

    const set = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const onEnter = () => {
      rect = el.getBoundingClientRect();
      el.style.transition = "transform 0.2s cubic-bezier(0.22,1,0.36,1)";
    };
    const onMove = (e: PointerEvent) => {
      if (!rect) return;
      set((e.clientX - rect.left - rect.width / 2) * strength, (e.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      rect = null;
      el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
      set(0, 0);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-flex will-change-transform ${className}`}>
      {children}
    </span>
  );
}
