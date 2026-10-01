import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { site } from "@/content/site";
import { Magnetic } from "@/components/motion/Magnetic";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { ArrowIcon } from "@/components/ui/Icons";
import { CreateMotif, GrowMotif, ThinkMotif } from "./HeroMotifs";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/**
 * Server component. The h1 and poster are in the HTML and painted on the first frame (LCP-safe):
 * the word animations are transform-only CSS, so the text is never invisible.
 */
export async function Hero() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common");
  const { showreel } = site;

  const words = [
    { id: "think", delay: 0.05, Motif: ThinkMotif },
    { id: "create", delay: 0.3, Motif: CreateMotif },
    { id: "grow", delay: 0.55, Motif: GrowMotif },
  ] as const;

  return (
    <section className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Background: poster (LCP image, preloaded) + idle-loaded showreel + readability gradients. */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={showreel.poster}
          alt={t("posterAlt")}
          fill
          preload
          quality={60}
          sizes="100vw"
          className="object-cover opacity-60"
        />
        {(showreel.webm || showreel.mp4) && (
          <LazyVideo webm={showreel.webm} mp4={showreel.mp4} trigger="idle" className="absolute inset-0 size-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_20%,color-mix(in_oklab,var(--accent-2)_22%,transparent),transparent)] rtl:bg-[radial-gradient(60%_50%_at_15%_20%,color-mix(in_oklab,var(--accent-2)_22%,transparent),transparent)]" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pb-14 pt-[calc(var(--header-h)+3rem)] md:pb-20">
        <h1 className="display text-[clamp(3.6rem,15vw,11.5rem)] text-fg">
          <span className="sr-only">{t("srTitle")}</span>
          {words.map(({ id, delay, Motif }) => (
            <span key={id} className="flex items-center gap-[0.22em]">
              <span className="hero-word" style={d(delay)}>
                {t(`words.${id}`)}
                <span className="text-accent-ink">.</span>
              </span>
              <Motif base={delay} />
            </span>
          ))}
        </h1>

        <div className="mt-10 grid items-end gap-8 md:mt-14 lg:grid-cols-[minmax(0,36rem)_auto] lg:justify-between">
          <p className="lede fade-up max-w-xl text-fg/80" style={d(0.8)}>
            {t("subheadline")}
          </p>
          <div className="fade-up flex flex-wrap gap-3" style={d(0.95)}>
            <Magnetic>
              <Link href="/contact" className="btn btn-primary">
                {tc("requestQuote")}
                <ArrowIcon className="btn-arrow" />
              </Link>
            </Magnetic>
            <Link href="/work" className="btn btn-ghost">
              {tc("seeWork")}
            </Link>
          </div>
        </div>

        <div className="fade-up mt-12 hidden items-center gap-3 text-sm text-muted md:flex" style={d(1.2)} aria-hidden>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
            <span className="scroll-cue block h-2 w-0.5 rounded-full bg-fg" />
          </span>
          {t("scroll")}
        </div>
      </div>
    </section>
  );
}
