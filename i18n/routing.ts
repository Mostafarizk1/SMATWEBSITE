import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
  // "/" always goes to Arabic (the primary market), regardless of browser language.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

export const localeDir = (locale: string) => (locale === "ar" ? "rtl" : "ltr");
