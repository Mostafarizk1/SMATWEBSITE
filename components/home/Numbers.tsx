import { getLocale, getTranslations } from "next-intl/server";
import { stats } from "@/content/stats";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "./Counter";

export async function Numbers() {
  const t = await getTranslations("numbers");
  const locale = await getLocale();

  return (
    <section aria-labelledby="numbers-title" className="section border-t border-line">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="numbers-title" className="h2 mt-5">
            {t("title")}
          </h2>
        </Reveal>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.id} className="flex flex-col-reverse gap-3 bg-bg p-6 sm:p-10">
              <dt className="text-sm text-muted sm:text-base">{t(`items.${s.id}`)}</dt>
              <dd className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold leading-none text-fg" dir="ltr">
                <Counter value={s.value} suffix={s.suffix} locale={locale} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
