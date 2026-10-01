import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, pagePaths } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.entries(pagePaths).flatMap(([key, path]) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)])),
      },
    })),
  );
}
