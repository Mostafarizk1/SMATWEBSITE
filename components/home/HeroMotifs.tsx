/**
 * Decorative motifs next to each slogan word. Pure SVG + CSS keyframes (globals.css), transform/opacity only.
 * `base` is the word's own delay so each motif plays right after its word lands.
 */
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

const svgProps = {
  "aria-hidden": true,
  className: "motif h-[0.62em] w-auto shrink-0 overflow-visible",
} as const;

/** Think: a thin grid drawing itself in, with one accent intersection. */
export function ThinkMotif({ base }: { base: number }) {
  const h = [8, 28, 48, 68];
  const v = [10, 40, 70, 100];
  return (
    <svg viewBox="0 0 110 76" {...svgProps}>
      {h.map((y, i) => (
        <rect key={`h${y}`} className="motif-line-h" style={d(base + 0.15 + i * 0.07)} x="0" y={y} width="110" height="1.4" fill="var(--muted)" opacity="0.7" />
      ))}
      {v.map((x, i) => (
        <rect key={`v${x}`} className="motif-line-v" style={d(base + 0.25 + i * 0.07)} x={x} y="0" width="1.4" height="76" fill="var(--muted)" opacity="0.7" />
      ))}
      <circle className="motif-shape" style={d(base + 0.7)} cx="70.7" cy="28.7" r="5" fill="var(--accent)" />
    </svg>
  );
}

/** Create: shapes and colour stacking up. */
export function CreateMotif({ base }: { base: number }) {
  return (
    <svg viewBox="0 0 110 76" {...svgProps}>
      <rect className="motif-shape" style={d(base + 0.15)} x="4" y="18" width="44" height="44" rx="4" fill="var(--accent-2)" />
      <circle className="motif-shape" style={d(base + 0.27)} cx="60" cy="38" r="24" fill="var(--accent)" />
      <path className="motif-shape" style={d(base + 0.39)} d="M84 62 L106 20 L106 62 Z" fill="var(--text)" />
    </svg>
  );
}

/** Grow: bars rising, then an arrow climbing past them. */
export function GrowMotif({ base }: { base: number }) {
  const bars = [
    { x: 4, h: 22 },
    { x: 26, h: 36 },
    { x: 48, h: 50 },
    { x: 70, h: 66 },
  ];
  return (
    <svg viewBox="0 0 110 76" {...svgProps}>
      {bars.map((b, i) => (
        <rect
          key={b.x}
          className="motif-bar"
          style={d(base + 0.15 + i * 0.08)}
          x={b.x}
          y={76 - b.h}
          width="16"
          height={b.h}
          rx="2"
          fill={i === bars.length - 1 ? "var(--accent)" : "var(--line)"}
        />
      ))}
      <g className="motif-arrow" style={d(base + 0.5)}>
        <path d="M100 70 V6 M90 16 L100 5 L110 16" fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
