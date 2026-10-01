"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { localizeHref, stripLocale } from "@/lib/i18n-client";

/** Switches locale and keeps the visitor on the same page. */
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
    <NextLink
      href={localizeHref(other, pathname)}
      hrefLang={other}
      lang={other}
      aria-label={ariaLabel}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 font-display text-sm font-medium transition-colors hover:border-fg ${className}`}
    >
      {label}
    </NextLink>
  );
}
