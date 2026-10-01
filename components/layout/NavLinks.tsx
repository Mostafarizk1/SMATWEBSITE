"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { localizeHref, stripLocale } from "@/lib/i18n-client";
import type { NavLabels } from "@/lib/nav";

export function NavLinks({ items, label, locale }: { items: NavLabels; label: string; locale: string }) {
  const pathname = stripLocale(usePathname());
  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.key}>
              <NextLink
                href={localizeHref(locale, item.href)}
                aria-current={active ? "page" : undefined}
                className="group relative inline-flex min-h-11 items-center px-3.5 text-[0.9375rem] text-muted transition-colors hover:text-fg aria-[current=page]:text-fg"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-aria-[current=page]:scale-x-100 rtl:origin-right"
                />
              </NextLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
