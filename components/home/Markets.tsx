import { getLocale, getTranslations } from "next-intl/server";
import { markets, type Market } from "@/content/markets";
import { gulfMapActive, gulfMapContext, gulfMapView } from "@/content/gulf-map";
import { Reveal } from "@/components/motion/Reveal";

type CSS = React.CSSProperties;

// Same projection as the outlines in content/gulf-map.ts. Geography never mirrors in RTL.
const project = (lon: number, lat: number) => ({
  x: 795.2 + (lon - 46.7) * 34.8,
  y: 471.7 - (lat - 24.7) * 22.53,
});

const labelPos = {
  above: { dx: 0, dy: -16, anchor: "middle" },
  below: { dx: 0, dy: 30, anchor: "middle" },
  start: { dx: -16, dy: 6, anchor: "end" },
  end: { dx: 16, dy: 6, anchor: "start" },
} as const;

/** The order the thread reaches each market in, starting from the hub. Sets each one's delay (--gd). */
const arrival: Market["id"][] = ["sa", "bh", "qa", "kw", "ae", "om", "eg", "tr"];
const delay = (id: Market["id"]) => ({ "--gd": `${0.25 + arrival.indexOf(id) * 0.3}s` }) as CSS;

/**
 * "No two markets are alike": every market has its own signature, a small pattern of its own.
 * It fills the country on hover and labels its name chip. One <pattern> each, drawn once.
 */
const ink = { stroke: "var(--text)", strokeWidth: 1.3, strokeLinecap: "round", fill: "none" } as const;
const signatures: Record<Market["id"], { size: [number, number]; mark: React.ReactNode }> = {
  sa: { size: [10, 10], mark: <circle cx="3" cy="3" r="1.6" fill="var(--text)" /> },
  ae: { size: [10, 10], mark: <path d="M-2 12 L12 -2" {...ink} /> },
  kw: { size: [12, 8], mark: <path d="M0 4 Q3 0 6 4 T12 4" {...ink} /> },
  qa: { size: [9, 9], mark: <path d="M0 0 L9 9 M9 0 L0 9" {...ink} /> },
  bh: { size: [9, 9], mark: <circle cx="4.5" cy="4.5" r="2.6" {...ink} /> },
  om: { size: [7, 10], mark: <path d="M3.5 0 V10" {...ink} /> },
  eg: { size: [12, 11], mark: <path d="M6 2 L10 9 H2 Z" {...ink} /> },
  tr: { size: [11, 11], mark: <path d="M5.5 2 V9 M2 5.5 H9" {...ink} /> },
};

/**
 * Where we work: a real map of the region (country outlines from the client's own map concept).
 *
 * Two ideas, both pure CSS (see `.gmap` in globals.css), so the section ships no JS:
 *  1. The orange thread from the hero carries on here. When the map scrolls into view, routes draw
 *     out from Riyadh one after another, and each market lights up as the thread reaches it.
 *  2. Every market has its own signature pattern. Hovering a country, its pin or its name chip lights
 *     all three and fills the country with that pattern (`:has()` links them).
 */
export async function Markets() {
  const t = await getTranslations("markets");
  const locale = (await getLocale()) as "ar" | "en";
  const other = locale === "ar" ? "en" : "ar";
  const v = gulfMapView;
  const pins = markets.map((mk) => ({ ...mk, ...project(mk.lon, mk.lat) }));
  const hub = pins[0];
  const bahrain = pins.find((p) => p.id === "bh");

  return (
    <section aria-labelledby="markets-title" className="section border-t border-line">
      <div className="gmap container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 id="markets-title" className="h2 mt-5">
            {t("title")}
          </h2>
          <p className="lede mt-5 max-w-2xl">{t("body")}</p>
        </Reveal>

        <Reveal y={0} className="gmap-stage mt-12 overflow-hidden rounded-3xl border border-line bg-[radial-gradient(55%_70%_at_66%_62%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent)]">
          <svg viewBox={`${v.x} ${v.y} ${v.w} ${v.h}`} role="img" aria-label={t("mapLabel")} className="block h-auto w-full" direction="ltr">
            <defs>
              {markets.map((mk) => {
                const s = signatures[mk.id];
                return (
                  <pattern key={mk.id} id={`gsig-${mk.id}`} width={s.size[0]} height={s.size[1]} patternUnits="userSpaceOnUse">
                    {s.mark}
                  </pattern>
                );
              })}
            </defs>

            <g>
              {gulfMapContext.map((d, i) => (
                <path key={i} className="gmap-ctx" d={d} />
              ))}
            </g>

            {/* Markets, each with its signature laid over it (shown on hover). */}
            <g>
              {gulfMapActive.map((c) => (
                <g key={c.id} style={delay(c.id)}>
                  <path className="gmap-act" data-k={c.id} d={c.d} />
                  <path className="gmap-sig" data-k={c.id} d={c.d} fill={`url(#gsig-${c.id})`} />
                </g>
              ))}
              {/* Bahrain has no outline at this scale: its signature sits in a disc around the pin. */}
              {bahrain && <circle className="gmap-sig" data-k="bh" cx={bahrain.x} cy={bahrain.y} r="20" fill="url(#gsig-bh)" />}
            </g>

            {/* The thread: one route from the hub to each market. */}
            <g fill="none">
              {pins.slice(1).map((p) => {
                const cx = (hub.x + p.x) / 2;
                const cy = Math.min(hub.y, p.y) - 46;
                return (
                  <path
                    key={p.id}
                    className="gmap-arc"
                    pathLength={1}
                    style={delay(p.id)}
                    d={`M${hub.x.toFixed(1)} ${hub.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`}
                  />
                );
              })}
            </g>

            {pins.map((p, i) => {
              const l = labelPos[p.label];
              return (
                <g key={p.id} className="gmap-pin" data-k={p.id} style={delay(p.id)}>
                  <circle className="gmap-halo" cx={p.x} cy={p.y} r="7" style={{ animationDelay: `${i * 0.45}s` }} />
                  <circle className="gmap-dot" cx={p.x} cy={p.y} r={p.id === "sa" ? 7 : 5.2} />
                  <text className="gmap-label" x={p.x + l.dx} y={p.y + l.dy} textAnchor={l.anchor}>
                    {p.name[locale]}
                  </text>
                  <circle cx={p.x} cy={p.y} r="24" fill="transparent" />
                </g>
              );
            })}
          </svg>
        </Reveal>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {markets.map((mk, i) => (
            <Reveal as="li" key={mk.id} delay={i * 0.05}>
              <span className="gmap-name flex h-full items-start justify-between gap-3 rounded-2xl border border-line p-4 transition-colors" data-k={mk.id}>
                <span className="flex min-w-0 flex-col">
                  <b className="font-display text-lg font-semibold">{mk.name[locale]}</b>
                  <span className="mt-0.5 text-sm text-muted" lang={other} dir={other === "ar" ? "rtl" : "ltr"}>
                    {mk.name[other]}
                  </span>
                </span>
                {/* The market's signature, as a swatch. */}
                <svg viewBox="0 0 30 30" className="size-8 shrink-0 rounded-lg" aria-hidden>
                  <rect width="30" height="30" fill="color-mix(in oklab, var(--accent) 62%, var(--surface))" />
                  <rect width="30" height="30" fill={`url(#gsig-${mk.id})`} />
                </svg>
              </span>
            </Reveal>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <i className="size-2.5 rounded-full bg-accent" aria-hidden />
            {t("caption")}
          </span>
          <span className="hidden md:inline">{t("hint")}</span>
        </div>
      </div>
    </section>
  );
}
