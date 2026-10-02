import { getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { sectors } from "@/content/sectors";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

/** Sectors we serve. Every sector gets equal weight; one with a dedicated page links to it. */
export async function Sectors() {
  const t = await getTranslations("sectors");

  return (
    <section aria-labelledby="sectors-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading id="sectors-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => (
            <Reveal as="li" key={sector.id} delay={(i % 3) * 0.07} className="group relative bg-bg p-7 transition-colors hover:bg-surface sm:p-9">
              <span className="font-display text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{t(`items.${sector.id}.name`)}</h3>
              <p className="mt-2 text-muted">{t(`items.${sector.id}.line`)}</p>
              {sector.href && (
                <Link href={sector.href} className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm text-fg after:absolute after:inset-0 hover:text-accent-ink">
                  {t("more")}
                  <ArrowIcon className="btn-arrow" width={16} height={16} />
                </Link>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
