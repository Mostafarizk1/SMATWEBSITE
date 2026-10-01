"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { localizeHref, stripLocale } from "@/lib/i18n-client";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import type { NavLabels } from "@/lib/nav";

type Props = {
  items: NavLabels;
  locale: string;
  labels: { menu: string; close: string; quote: string; nav: string };
};

/** Full-screen mobile menu. CSS transitions only (transform/opacity). */
export function MobileMenu({ items, locale, labels }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = stripLocale(usePathname());

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.menu}
        className="relative z-[60] inline-flex size-11 items-center justify-center rounded-full border border-line text-fg"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        id="mobile-menu"
        inert={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-bg px-5 pb-10 pt-28 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav aria-label={labels.nav}>
          <ul className="flex flex-col gap-1">
            {items.map((item, i) => (
              <li
                key={item.key}
                className="transition-[transform,opacity] duration-500 ease-out"
                style={{
                  transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
                  transform: open ? "none" : "translateY(16px)",
                  opacity: open ? 1 : 0,
                }}
              >
                <NextLink
                  href={localizeHref(locale, item.href)}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block py-2 font-display text-4xl font-semibold text-fg aria-[current=page]:text-accent-ink"
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>
        <NextLink href={localizeHref(locale, "/contact")} className="btn btn-primary mt-auto w-full">
          {labels.quote}
        </NextLink>
      </div>
    </div>
  );
}
