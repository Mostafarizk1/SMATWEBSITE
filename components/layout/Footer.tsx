import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { Logo } from "@/components/brand/Logo";
import { navItems } from "@/lib/nav";
import { site, whatsappHref } from "@/content/site";
import { SocialIcon } from "@/components/ui/Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const th = await getTranslations("hero");
  const tmeta = await getTranslations("meta");
  const locale = await getLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex">
            <Logo className="text-3xl" />
          </Link>
          <p className="mt-5 max-w-sm text-muted">{t("description")}</p>
          <p className="mt-6 font-display text-lg font-semibold" lang={locale}>
            {th("slogan.a")} {th("slogan.b")} {th("slogan.c")}.
          </p>
        </div>

        <nav aria-label={t("explore")} className="md:col-span-2">
          <h2 className="text-sm text-muted">{t("explore")}</h2>
          <ul className="mt-4 space-y-1">
            {navItems.map((i) => (
              <li key={i.key}>
                <Link href={i.href} className="inline-flex min-h-10 items-center transition-colors hover:text-accent-ink">
                  {tn(i.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-sm text-muted">{t("contact")}</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={whatsappHref(tc("whatsappMessage"))} target="_blank" rel="noopener" className="inline-flex min-h-10 items-center hover:text-accent-ink">
                {tc("whatsappShort")}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-10 items-center hover:text-accent-ink" dir="ltr">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-flex min-h-10 items-center hover:text-accent-ink" dir="ltr">
                {site.phone}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-sm text-muted">{t("follow")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <li key={s.id}>
                {/* PLACEHOLDER links (content/site.ts): replace with the real accounts before launch. */}
                <a
                  href={s.href}
                  rel="noopener"
                  aria-label={`${t("follow")} ${t("followOn", { name: s.label })}`}
                  title={s.label}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent-ink hover:bg-accent hover:text-on-accent"
                >
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-x flex flex-col-reverse items-start justify-between gap-4 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center">
        <p>
          © {year} {tmeta("siteName")}. {t("rights")}
        </p>
        <LanguageSwitcher locale={locale} label={t("language")} ariaLabel={tn("switchLocaleLabel")} className="px-4" />
      </div>
    </footer>
  );
}
