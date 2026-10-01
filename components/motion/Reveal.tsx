/**
 * Fades + slides content in once when it enters the viewport. Server component: it only renders
 * data attributes; one shared IntersectionObserver (RevealObserver) flips them and CSS does the
 * transition (globals.css → [data-reveal]). transform/opacity only, ~1 KB of JS for the whole site
 * instead of a Motion component per element. `x` is in reading direction and mirrors in RTL via --dir.
 */
type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset (px) to rise from. */
  y?: number;
  /** Horizontal offset (px) in reading direction; mirrored automatically in RTL. */
  x?: number;
  as?: "div" | "li" | "section" | "p";
};

export function Reveal({ children, className, delay = 0, y = 28, x = 0, as: Tag = "div" }: Props) {
  return (
    <Tag
      data-reveal=""
      className={className}
      style={{ "--ry": `${y}px`, "--rx": `${x}px`, "--rd": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
