import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { pillars, servicesByPillar } from "@/content/services";
import { pick } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";
import dynamic from "next/dynamic";
import type { PillarView } from "./MethodTabs";

// Below the fold: split into its own chunk (still server-rendered).
const MethodTabs = dynamic(() => import("./MethodTabs").then((mod) => mod.MethodTabs));

export async function Method() {
  const t = await getTranslations("method");
  const locale = await getLocale();

  const data: PillarView[] = pillars.map((id, i) => ({
    id,
    index: String(i + 1).padStart(2, "0"),
    name: t(`pillars.${id}.name`),
    latin: t(`pillars.${id}.latin`),
    tagline: t(`pillars.${id}.tagline`),
    services: servicesByPillar(id).map((s) => ({ id: s.id, title: pick(s.title, locale), summary: pick(s.summary, locale) })),
  }));

  const letters = ["s", "m", "a", "t"] as const;

  return (
    <section aria-labelledby="method-title" className="section">
      <div className="container-x">
        <SectionHeading id="method-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        <MethodTabs pillars={data} label={t("tablistLabel")} locale={locale} />

        <Reveal className="mt-16 flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="sr-only">{t("smatNote")}</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-4" aria-hidden dir="ltr">
              {letters.map((l) => (
                <li key={l} className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-bold text-accent-ink">{l.toUpperCase()}</span>
                  <span className="text-sm text-muted">{t(`smatLetters.${l}`)}</span>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/contact" className="btn btn-ghost self-start md:self-auto">
            {t("cta")}
            <ArrowIcon className="btn-arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
