import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { ArrowIcon, PlayIcon } from "@/components/ui/Icons";
import { ScrollMedia } from "./ScrollMedia";

const featureKeys = ["film", "viz", "splat", "launch"] as const;

/** Home section. On the Real Estate page it runs in `standalone` mode: no intro heading (the page h1 has it) and no CTA. */
export async function RealEstateSpotlight({ standalone = false }: { standalone?: boolean }) {
  const t = await getTranslations("realEstate");
  const reel = site.realEstateReel;

  return (
    <section aria-labelledby={standalone ? undefined : "re-title"} aria-label={standalone ? t("eyebrow") : undefined} className="section relative overflow-hidden">
      {/* Cheap CSS glow behind the section */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_0%,color-mix(in_oklab,var(--accent)_10%,transparent),transparent)]" />

      <div className="container-x">
        {standalone ? (
          <p className="lede mx-auto max-w-2xl text-center">{t("body")}</p>
        ) : (
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow justify-center">{t("eyebrow")}</p>
            <h2 id="re-title" className="display mt-6 text-balance text-[clamp(2.75rem,8vw,6.5rem)]">
              {t("title")}
            </h2>
            <p className="lede mx-auto mt-6 max-w-2xl">{t("body")}</p>
          </Reveal>
        )}

        <ScrollMedia className="mt-14 aspect-[4/5] rounded-[1.75rem] border border-line sm:aspect-[16/9] md:mt-20">
          <Image src={reel.poster} alt={t("mediaAlt")} fill quality={60} sizes="(min-width: 1408px) 1328px, 100vw" className="object-cover" />
          {(reel.webm || reel.mp4) && <LazyVideo webm={reel.webm} mp4={reel.mp4} trigger="visible" className="absolute inset-0 size-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
        </ScrollMedia>

        <div className="relative -mt-16 flex justify-center sm:-mt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/90 px-4 py-2 text-sm text-muted">
            <PlayIcon className="text-accent-ink" />
            {t("reelBadge")}
          </span>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((k, i) => (
            <Reveal as="li" key={k} delay={i * 0.08} className="bg-bg p-7">
              <span className="font-display text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-xl font-semibold">{t(`features.${k}.title`)}</h3>
              <p className="mt-2 text-muted">{t(`features.${k}.body`)}</p>
            </Reveal>
          ))}
        </ul>

        {!standalone && (
          <div className="mt-12 flex justify-center">
            <Link href="/real-estate" className="btn btn-ghost">
              {t("cta")}
              <ArrowIcon className="btn-arrow" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
