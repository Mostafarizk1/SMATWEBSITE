/**
 * Scroll-linked reveal for a media frame: the frame scales up as it enters and the image inside drifts
 * (parallax). Pure CSS scroll-driven animations (`animation-timeline: view()`), which run off the main
 * thread with zero JS. Browsers without support (currently Firefox) show the static frame.
 * See `.scroll-media` in globals.css. transform only; disabled under prefers-reduced-motion.
 */
export function ScrollMedia({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`scroll-media relative overflow-hidden ${className}`}>
      <div className="scroll-media-inner absolute inset-[-10%_0]">{children}</div>
    </div>
  );
}
