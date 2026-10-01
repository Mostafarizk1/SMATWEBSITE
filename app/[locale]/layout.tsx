import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, localeDir } from "@/i18n/routing";
import { alexandria, inter, plexArabic } from "@/lib/fonts";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";
import { bootScript } from "@/components/intro/boot";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import "../globals.css";

const showThemeSwitcher = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_THEME_SWITCHER === "1";

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale, "home");
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "nav" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const tDev = await getTranslations({ locale, namespace: "dev" });

  return (
    <html
      lang={locale}
      dir={localeDir(locale)}
      data-theme="night"
      className={`${alexandria.variable} ${plexArabic.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript(showThemeSwitcher) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-on-accent"
        >
          {t("skipToContent")}
        </a>
        {/* No NextIntlClientProvider: client components get translated strings + locale as props,
            so neither messages nor the i18n runtime ship to the browser. */}
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <RevealObserver />
        {showThemeSwitcher && <ThemeSwitcher label={tDev("theme")} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(locale, tMeta("description"))) }}
        />
      </body>
    </html>
  );
}
