"use client";

import { useSyncExternalStore } from "react";

const themes = [
  { id: "night", swatch: ["#0A0A0F", "#D4FF3A", "#7B61FF"] },
  { id: "desert", swatch: ["#0F0E0C", "#C8A15A", "#E8D9BD"] },
  { id: "electric", swatch: ["#07080D", "#3D5AFE", "#FF6A3D"] },
] as const;

const subscribe = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const getTheme = () => document.documentElement.dataset.theme ?? "electric";

function applyTheme(id: string) {
  document.documentElement.setAttribute("data-theme", id);
  try {
    localStorage.setItem("smat-theme", id);
  } catch {}
}

/**
 * Dev-only palette comparison. Rendered only when NODE_ENV=development or
 * NEXT_PUBLIC_THEME_SWITCHER=1 (see layout), so production never downloads it.
 */
export function ThemeSwitcher({ label }: { label: string }) {
  const current = useSyncExternalStore(subscribe, getTheme, () => "electric");

  return (
    <div
      role="group"
      aria-label={label}
      className="fixed bottom-5 start-5 z-30 flex items-center gap-1.5 rounded-full border border-line bg-surface/90 p-1.5 shadow-lg md:bottom-7 md:start-7"
    >
      <span className="hidden px-2 font-display text-xs text-muted sm:inline">{label}</span>
      {themes.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => applyTheme(t.id)}
          aria-pressed={current === t.id}
          title={t.id}
          className="flex h-9 items-center gap-1 rounded-full px-2 text-xs capitalize text-muted ring-accent transition aria-pressed:bg-bg aria-pressed:text-fg aria-pressed:ring-1"
        >
          <span className="flex -space-x-1 rtl:space-x-reverse">
            {t.swatch.map((c) => (
              <span key={c} className="size-3.5 rounded-full border border-white/20" style={{ background: c }} />
            ))}
          </span>
          <span className="hidden sm:inline">{t.id}</span>
        </button>
      ))}
    </div>
  );
}
