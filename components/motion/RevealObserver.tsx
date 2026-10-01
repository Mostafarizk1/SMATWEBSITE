"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Single IntersectionObserver for every <Reveal>. Re-scans after client-side navigation.
 * Marks elements once (`data-shown`), then stops observing them (viewport "once" semantics).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __reveal?: boolean }).__reveal = true;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
