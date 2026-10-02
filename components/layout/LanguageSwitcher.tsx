"use client";

import { usePathname } from "next/navigation";
import { localizeHref, stripLocale } from "@/lib/i18n-client";

/**
 * Switches locale, keeps the visitor on the same page, and starts them at the top of it.
 *
 * Deliberately a plain <a> (full page load), not next/link. Switching locale changes <html lang/dir>;
 * on a client-side transition React re-creates the root attributes and drops what the boot script set
 * on <html> (the "js" flag the scroll hero and reveals depend on, the dev palette), so the hero fell
 * back to its static no-JS layout. A real load re-runs the boot script, loads the right body font and
 * flips the layout cleanly. Landing at the top is also right for the reader: the page mirrors (RTL/LTR),
 * so a kept scroll position would no longer point at the same content.
 */
export function LanguageSwitcher({
  locale,
  label,
  ariaLabel,
  className = "",
}: {
  locale: string;
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  const pathname = stripLocale(usePathname());
  const other = locale === "ar" ? "en" : "ar";

  return (
    <a
      href={localizeHref(other, pathname)}
      hrefLang={other}
      lang={other}
      aria-label={ariaLabel}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 font-display text-sm font-medium transition-colors hover:border-fg ${className}`}
    >
      {label}
    </a>
  );
}
