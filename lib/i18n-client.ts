// Tiny locale helpers for client components. We deliberately avoid next-intl's client runtime
// (its Link/usePathname pull in use-intl + ICU formatting, ~10 KB gz) since the browser never formats messages.
import { routing } from "@/i18n/routing";

const prefix = new RegExp(`^/(${routing.locales.join("|")})(?=/|$)`);

/** "/work" + "ar" → "/ar/work"; "/" → "/ar" */
export const localizeHref = (locale: string, href: string) => `/${locale}${href === "/" ? "" : href}`;

/** "/ar/work" → "/work"; "/ar" → "/" */
export const stripLocale = (pathname: string) => pathname.replace(prefix, "") || "/";
