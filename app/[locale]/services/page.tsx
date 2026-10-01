import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
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
  const t = await getTranslations("pages");
  const tm = await getTranslations("method");
  const lang = await getLocale();

  return (
    <>
      <PageHeader eyebrow={t("services.eyebrow")} title={t("services.title")} intro={t("services.intro")} />
      <section className="section">
        <div className="container-x space-y-20">
          {pillars.map((id, i) => (
            <div key={id} className="grid gap-8 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <span className="font-display text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 font-display text-5xl font-bold">{tm(`pillars.${id}.name`)}</h2>
                <p className="mt-4 text-muted">{tm(`pillars.${id}.tagline`)}</p>
              </Reveal>
              <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2 lg:col-span-8">
                {servicesByPillar(id).map((s) => (
                  <li key={s.id} className="bg-bg p-7">
                    <h3 className="font-display text-lg font-semibold">{pick(s.title, lang)}</h3>
                    <p className="mt-2 text-muted">{pick(s.summary, lang)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <FinalCta title={t("ctaTitle")} />
    </>
  );
}
