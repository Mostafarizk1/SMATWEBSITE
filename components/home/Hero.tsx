import { getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { pillars } from "@/content/services";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowIcon } from "@/components/ui/Icons";
import { HeroArt } from "./HeroArt";
import { ScrollScenes } from "./ScrollScenes";

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

/**
 * Scroll-driven hero: a tall section with a sticky full-screen stage. As the visitor scrolls (natively,
 * nothing is hijacked) the stage moves through three scenes: Think → Create → Grow. Each scene is a
 * stack of layers that travel at different speeds (depth parallax).
 *
 * Server-rendered: scene 1 is in the HTML and painted on the first frame. <ScrollScenes>
 * only writes CSS variables; all motion is transform/opacity in globals.css (`.hero-scroll`).
 * Without JS or with reduced motion the scenes simply stack as normal sections.
 */
export async function Hero() {
  const t = await getTranslations("hero");
  const tc = await getTranslations("common");

  const scenes = pillars.map((id, i) => ({
    id,
    index: String(i + 1).padStart(2, "0"),
    word: t(`words.${id}`),
    tagline: t(`lines.${id}`),
  }));

  return (
    <section id="hero" data-index="0" className="hero-scroll relative" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {t("srTitle")}
        {scenes.map((s) => `${s.word}.`).join(" ")}
      </h1>

      <div data-stage className="hero-stage grain isolate">
        {/* Atmosphere: one backdrop per scene, cross-fading with the story (see `.atmo` in globals.css). */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          {scenes.map((scene, i) => (
            <div key={scene.id} data-atmo className={`atmo atmo-${scene.id}`} style={{ "--a": i } as React.CSSProperties} />
          ))}
          {/* Rings: one constant backdrop behind all three scenes. */}
          <div className="atmo-rings" />
          <div className="atmo-shade" />
        </div>

        {scenes.map((scene, i) => (
          <div key={scene.id} data-scene className="scene container-x" style={{ "--t": -i, "--a": i, "--s": 0 } as React.CSSProperties} aria-hidden>
            <div className={"scene-art fade-up" + (scene.id === "create" ? " scene-art--hands-over" : scene.id === "grow" ? " scene-art--takes-over" : "")} style={d(0.25)}>
              <HeroArt id={scene.id} glyph={scenes[0].word.charAt(0)} />
            </div>
            <div className="scene-copy">
              <div className="layer" style={{ "--depth": 0.7 } as React.CSSProperties}>
                <span className="font-display text-sm text-accent-ink">{scene.index} / 03</span>
                <p className="display mt-2 text-[clamp(4.25rem,19vw,9rem)] lg:text-[clamp(6rem,11vw,11rem)] text-fg">
                  <span className={i === 0 ? "hero-word" : "block"} style={d(0.05)}>
                    {scene.word}
                    <span className="text-accent-ink">.</span>
                  </span>
                </p>
              </div>
              <p className="layer mt-3 max-w-md text-base text-fg/85 md:mt-5 md:text-xl" style={{ "--depth": 1.1 } as React.CSSProperties}>
                {scene.tagline}
              </p>
            </div>
          </div>
        ))}

        <div className="hero-bar container-x">
          <div className="hero-progress fade-up" style={d(0.7)} aria-hidden>
            <span className="hero-progress-fill" />
          </div>
          <div className="mt-5 grid items-end gap-6 lg:grid-cols-[minmax(0,34rem)_auto] lg:justify-between">
            <p className="fade-up text-fg/75 max-md:sr-only md:text-lg" style={d(0.8)}>
              {t("subheadline")}
            </p>
            <div className="fade-up flex gap-3" style={d(0.9)}>
              <Magnetic className="max-sm:min-w-0 max-sm:flex-1">
                <Link href="/contact" className="btn btn-primary max-sm:w-full max-sm:px-3 max-sm:text-sm">
                  {tc("requestQuote")}
                  <ArrowIcon className="btn-arrow max-sm:hidden" />
                </Link>
              </Magnetic>
              <Link href="/work" className="btn btn-ghost max-sm:min-w-0 max-sm:flex-1 max-sm:px-3 max-sm:text-sm">
                {tc("seeWork")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ScrollScenes targetId="hero" />
    </section>
  );
}
