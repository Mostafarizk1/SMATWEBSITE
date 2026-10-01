import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Markets } from "@/components/home/Markets";
import { Numbers } from "@/components/home/Numbers";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  return buildMetadata(locale, "about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages");
  const tm = await getTranslations("method");
  const letters = ["s", "m", "a", "t"] as const;

  return (
    <>
      <PageHeader eyebrow={t("about.eyebrow")} title={t("about.title")} intro={t("about.intro")} />
      <section className="section">
        <div className="container-x">
          <h2 className="sr-only">{tm("smatNote")}</h2>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {letters.map((l, i) => (
              <Reveal as="li" key={l} delay={i * 0.08} className="bg-bg p-8">
                <span className="font-display text-7xl font-bold text-accent-ink" dir="ltr">
                  {l.toUpperCase()}
                </span>
                <p className="mt-6 font-display text-lg font-semibold">{tm(`smatLetters.${l}`)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <Numbers />
      <Markets />
      <FinalCta title={t("ctaTitle")} />
    </>
  );
}
