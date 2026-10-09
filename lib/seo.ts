import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";

export type PageKey = "home" | "services" | "work" | "realEstate" | "about" | "contact";

export const pagePaths: Record<PageKey, string> = {
  home: "",
  services: "/services",
  work: "/work",
  realEstate: "/real-estate",
  about: "/about",
  contact: "/contact",
};

export const absoluteUrl = (locale: string, path = "") => `${site.url}/${locale}${path}`;

/** Per-locale metadata with canonical + hreflang alternates + OpenGraph. */
export async function buildMetadata(locale: string, page: PageKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = pagePaths[page];

  const title = page === "home" ? t("title") : `${t(`pages.${page}.title`)} | ${t("siteName")}`;
  const description = page === "home" ? t("description") : t(`pages.${page}.description`);

  const languages = Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)]));

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: absoluteUrl(locale, path),
      languages: { ...languages, "x-default": absoluteUrl(routing.defaultLocale, path) },
    },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title,
      description,
      url: absoluteUrl(locale, path),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: t("siteName") }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/media/og.jpg"] },
  };
}

export function organizationJsonLd(locale: string, name: string, description: string, slogan: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name,
    alternateName: locale === "ar" ? "SMAT" : "سمت",
    url: absoluteUrl(locale),
    logo: `${site.url}/media/og.jpg`,
    image: `${site.url}/media/og.jpg`,
    description,
    slogan,
    email: site.email,
    telephone: site.phone,
    areaServed: ["Saudi Arabia", "United Arab Emirates", "Kuwait", "Qatar", "Bahrain", "Oman", "Egypt", "Türkiye"].map((country) => ({ "@type": "Country", name: country })),
    knowsLanguage: ["ar", "en"],
    sameAs: site.socials.map((s) => s.href).filter((h) => h.startsWith("http")),
  };
}
