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

  return (
    <section aria-labelledby="method-title" className="section">
      <div className="container-x">
        <SectionHeading id="method-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

        <MethodTabs pillars={data} label={t("tablistLabel")} locale={locale} />

        <Reveal className="mt-16 flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-2xl font-semibold text-fg md:text-3xl">{t("bottomLine")}</p>
          <Link href="/contact" className="btn btn-ghost self-start md:self-auto">
            {t("cta")}
            <ArrowIcon className="btn-arrow" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
