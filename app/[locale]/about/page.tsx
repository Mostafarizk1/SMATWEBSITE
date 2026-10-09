import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Experience } from "@/components/home/Experience";
import { Markets } from "@/components/home/Markets";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return buildMetadata(locale, "about");
}

const cards = ["close", "gulf", "team", "improve"] as const;

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.about");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <section className="section" aria-labelledby="about-name">
        <div className="container-x">
          {/* What the name means: replaces the old "SMAT as an acronym" block. */}
          <Reveal className="max-w-3xl">
            <h2 id="about-name" className="h2">
              {t("name.title")}
            </h2>
            <p className="lede mt-6">{t("name.body")}</p>
          </Reveal>

          <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((id, i) => (
              <Reveal as="li" key={id} delay={i * 0.08} className="bg-bg p-8">
                <span className="font-display text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-xl font-semibold">{t(`cards.${id}.title`)}</h3>
                <p className="mt-2 text-muted">{t(`cards.${id}.body`)}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-16 grid gap-6 border-t border-line pt-12 lg:grid-cols-12">
            <h2 className="font-display text-3xl font-semibold leading-snug lg:col-span-5">{t("collab.title")}</h2>
            <p className="lede lg:col-span-7">{t("collab.body")}</p>
          </Reveal>
        </div>
      </section>

      <Experience />
      <Markets />
      <FinalCta title={t("cta.title")} body={t("cta.body")} />
    </>
  );
}
