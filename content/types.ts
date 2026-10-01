import type { Locale } from "@/i18n/routing";

/** A string provided in every supported locale. Shape mirrors what a CMS/Supabase row would return. */
export type Localized = Record<Locale, string>;

export const pick = (value: Localized, locale: string) => value[locale as Locale] ?? value.ar;
