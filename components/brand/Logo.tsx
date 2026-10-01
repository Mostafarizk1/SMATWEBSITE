/**
 * PLACEHOLDER wordmark. When the real logo arrives, replace the markup below with the SVG
 * (inline, so the intro can still animate its parts) and keep the same props so the header,
 * footer and intro keep working. The brand is always "SMAT Studio" and always rendered LTR.
 *
 * `animated` renders the exact same structure with per-part CSS animations, so the intro can
 * FLIP it onto the header logo without any visual jump.
 */
type Props = {
  className?: string;
  animated?: boolean;
};

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Logo({ className = "", animated = false }: Props) {
  return (
    <span dir="ltr" translate="no" className={`inline-flex items-baseline gap-[0.28em] font-display leading-none ${className}`}>
      <span className="font-bold tracking-[-0.03em]">
        {animated
          ? "SMAT".split("").map((ch, i) => (
              <span key={i} className="intro-letter" style={d(0.1 + i * 0.09)}>
                {ch}
              </span>
            ))
          : "SMAT"}
        {/* Real space for the accessible name ("SMAT Studio"); collapsed visually at the flex item edge. */}
        {" "}
      </span>
      <span className={`font-light text-muted ${animated ? "intro-letter" : ""}`} style={animated ? d(0.55) : undefined}>
        Studio
      </span>
      <span
        aria-hidden
        className={`inline-block size-[0.28em] translate-y-[-0.05em] rounded-full bg-accent ${animated ? "intro-letter" : ""}`}
        style={animated ? d(0.85) : undefined}
      />
    </span>
  );
}
