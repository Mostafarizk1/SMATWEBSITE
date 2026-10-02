"use client";

import { useEffect } from "react";

/**
 * Drives the scroll hero. The page scrolls natively (no scroll-jacking); this only reads the section's
 * position once per frame and writes CSS variables, and CSS does every transform:
 *   --t  on each [data-scene]: signed distance from being the active scene (-1 upcoming, 0 active, 1 gone)
 *   --a  on each [data-scene]: |--t| (CSS abs() isn't widely supported yet)
 *   --s  on each [data-scene]: that scene's own story progress 0..1 while it holds the screen
 *   --p  on [data-stage]: overall progress 0..1 (progress bar)
 *   --mx / --my on [data-stage]: pointer position -1..1 (desktop parallax only)
 * Works on every browser incl. older iOS Safari, unlike CSS scroll timelines. Skipped for reduced motion.
 */
export function ScrollScenes({ targetId }: { targetId: string }) {
  useEffect(() => {
    const root = document.getElementById(targetId);
    const stage = root?.querySelector<HTMLElement>("[data-stage]");
    if (!root || !stage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-scene]"));
    const atmos = Array.from(root.querySelectorAll<HTMLElement>("[data-atmo]"));
    const n = scenes.length;
    let frame = 0;
    let last = -1;

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      if (Math.abs(p - last) < 0.0004) return;
      last = p;

      // Each scene owns an equal slice of the scroll. Inside its slice it first plays its own story
      // (--s: 0 → 1), holds briefly, then hands over to the next scene (smoothstep over the last 22%).
      const f = p * n;
      const k = Math.min(n - 1, Math.floor(f));
      const frac = f - k;
      const e = k === n - 1 ? 0 : Math.min(1, Math.max(0, (frac - 0.78) / 0.22));
      const pos = k + e * e * (3 - 2 * e);

      scenes.forEach((scene, i) => {
        const t = pos - i;
        scene.style.setProperty("--t", t.toFixed(4));
        scene.style.setProperty("--a", Math.abs(t).toFixed(4));
        // Direction-aware halves of --t: still to come in (--in), already going out (--out).
        scene.style.setProperty("--in", Math.max(0, -t).toFixed(4));
        scene.style.setProperty("--out", Math.max(0, t).toFixed(4));
        scene.style.setProperty("--s", (i < k ? 1 : i > k ? 0 : Math.min(1, frac / 0.66)).toFixed(4));
      });
      atmos.forEach((atmo, i) => atmo.style.setProperty("--a", Math.abs(pos - i).toFixed(4)));
      stage.style.setProperty("--p", p.toFixed(4));
      root.dataset.index = String(Math.round(pos));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Pointer parallax: fine pointers only (never fires meaningfully on touch).
    let pointerFrame = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onPointer = (ev: PointerEvent) => {
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        stage.style.setProperty("--mx", ((ev.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        stage.style.setProperty("--my", ((ev.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    if (fine) root.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.removeEventListener("pointermove", onPointer);
    };
  }, [targetId]);

  return null;
}
