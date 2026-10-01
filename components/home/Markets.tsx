import { getLocale, getTranslations } from "next-intl/server";
import { markets } from "@/content/markets";
import { pick } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";

// Equirectangular projection of the region into the SVG viewBox. Geography never mirrors in RTL.
const W = 520;
const H = 320;
const project = (lon: number, lat: number) => ({
  x: 30 + ((lon - 34) / 26) * (W - 60),
  y: 30 + ((33 - lat) / 12) * (H - 60),
});

export async function Markets() {
  const t = await getTranslations("markets");
  const locale = await getLocale();
  const pts = Object.fromEntries(markets.map((mk) => [mk.id, project(mk.lon, mk.lat)]));
  const hub = pts.sa;

  return (
    <section aria-labelledby="markets-title" className="section border-t border-line">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 id="markets-title" className="h2 mt-5">
              {t("title")}
            </h2>
            <p className="lede mt-5 max-w-lg">{t("body")}</p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-3">
            {markets.map((mk, i) => (
              <Reveal as="li" key={mk.id} delay={i * 0.06} className="rounded-2xl border border-line p-5">
                <span className="font-display text-xs tracking-widest text-accent-ink" dir="ltr">
                  {mk.code}
                </span>
                <p className="mt-2 font-display text-xl font-semibold">{pick(mk.name, locale)}</p>
                <p className="mt-1 text-sm text-muted">{pick(mk.cities, locale)}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal y={0} className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t("mapLabel")} className="h-auto w-full" direction="ltr">
            <defs>
              <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="var(--line)" />
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#dots)" rx="24" />
            {markets
              .filter((mk) => mk.id !== "sa")
              .map((mk) => {
                const p = pts[mk.id];
                const cx = (hub.x + p.x) / 2;
                const cy = Math.min(hub.y, p.y) - 40;
                return <path key={mk.id} d={`M${hub.x} ${hub.y} Q${cx} ${cy} ${p.x} ${p.y}`} fill="none" stroke="var(--muted)" strokeWidth="1.25" strokeDasharray="4 6" opacity="0.7" />;
              })}
            {markets.map((mk) => {
              const p = pts[mk.id];
              const isHub = mk.id === "sa";
              return (
                <g key={mk.id}>
                  {isHub && <circle cx={p.x} cy={p.y} r="22" fill="var(--accent)" opacity="0.15" />}
                  <circle cx={p.x} cy={p.y} r={isHub ? 8 : 6} fill={isHub ? "var(--accent)" : "var(--text)"} />
                  <text x={p.x} y={p.y + (mk.id === "om" ? 28 : -16)} textAnchor="middle" fill="var(--text)" fontSize="14" fontFamily="var(--font-display)" fontWeight="600">
                    {mk.code}
                  </text>
                </g>
              );
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
