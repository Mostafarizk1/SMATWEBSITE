import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { pillars, servicesByPillar } from "@/content/services";
import { pick } from "@/content/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  return buildMetadata(locale, "services");
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.services");
  const tm = await getTranslations("method");
  const lang = (await getLocale()) as Locale;

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <section className="section">
        <div className="container-x space-y-24">
          {pillars.map((id, i) => (
            <div key={id} className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
                <span className="font-display text-sm text-accent-ink">
                  {String(i + 1).padStart(2, "0")} · {tm(`pillars.${id}.name`)}
                </span>
                <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">{t(`stages.${id}.title`)}</h2>
                <p className="mt-4 text-muted">{t(`stages.${id}.intro`)}</p>
              </Reveal>
              <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:col-span-8">
                {servicesByPillar(id).map((s) => (
                  <li key={s.id} id={s.id} className="scroll-mt-28 bg-bg p-7 sm:p-9">
                    <h3 className="font-display text-xl font-semibold md:text-2xl">{pick(s.title, lang)}</h3>
                    <p className="mt-3 max-w-2xl text-muted">{pick(s.detail, lang)}</p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="text-sm text-muted">{t("includes")}:</span>
                      {s.includes[lang].map((item) => (
                        <span key={item} className="rounded-full border border-line px-3 py-1 text-sm text-fg/85">
                          {item}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <FinalCta title={t("cta.title")} body={t("cta.body")} />
    </>
  );
}
