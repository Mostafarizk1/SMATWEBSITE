import { getLocale, getTranslations } from "next-intl/server";
import { teamExperienceYears } from "@/content/markets";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "./Counter";

const tiles = ["gulf", "sectors", "team"] as const;

/**
 * The experience behind the work. One real number only (the team's years of experience); everything
 * else is stated in words until the company approves project and client figures.
 */
export async function Experience() {
  const t = await getTranslations("experience");
  const locale = await getLocale();

  return (
    <section aria-labelledby="experience-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="experience-title" className="h2 mt-5">
            {t("title")}
          </h2>
          <p className="lede mt-5 max-w-2xl">{t("body")}</p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="flex flex-col justify-between gap-6 bg-bg p-7 sm:p-10">
            <p className="font-display text-[clamp(4.5rem,12vw,8.5rem)] font-bold leading-none text-fg" dir="ltr">
              <Counter value={teamExperienceYears} suffix="+" locale={locale} />
            </p>
            <p className="max-w-[16rem] text-muted">{t("yearsLabel")}</p>
          </div>
          <ul className="grid gap-px bg-line sm:grid-cols-3">
            {tiles.map((id, i) => (
              <Reveal as="li" key={id} delay={i * 0.07} className="bg-bg p-7 sm:p-8">
                <span className="font-display text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-display text-xl font-semibold">{t(`tiles.${id}.title`)}</h3>
                <p className="mt-2 text-muted">{t(`tiles.${id}.body`)}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
