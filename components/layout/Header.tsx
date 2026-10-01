import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { Logo } from "@/components/brand/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { navItems } from "@/lib/nav";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Header() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const items = navItems.map((i) => ({ ...i, label: t(i.key) }));

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 isolate">
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" className="relative z-[60] inline-flex min-h-11 items-center">
          {/* data-logo-target: where the intro wordmark lands. */}
          <span data-logo-target className="inline-flex">
            <Logo className="text-[1.375rem]" />
          </span>
        </Link>

        <NavLinks items={items} label={t("primary")} locale={locale} />

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={t("switchLocale")} ariaLabel={t("switchLocaleLabel")} className="relative z-[60]" />
          <span className="hidden sm:inline-flex">
            <Magnetic>
              <Link href="/contact" className="btn btn-primary min-h-11 px-5 py-2 text-[0.9375rem]">
                {tc("requestQuote")}
              </Link>
            </Magnetic>
          </span>
          <MobileMenu items={items} locale={locale} labels={{ menu: t("menu"), close: t("close"), quote: tc("requestQuote"), nav: t("primary") }} />
        </div>
      </div>
    </header>
  );
}
