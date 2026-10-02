/**
 * Scene artwork for the scroll hero, drawn entirely in CSS/SVG (no image bytes), in real CSS 3D.
 *
 * One system across three scenes, sector-neutral on purpose (SMAT is a full digital marketing agency):
 *   Think  → layers of knowledge: a canvas under study, we find the direction.
 *   Create → layers of craft: they close into one poster, the Monolith.
 *   Grow   → the same poster becomes a living system that spreads, adapts and scales.
 *
 * Every `.layer` carries a --depth for scroll/pointer parallax; each scene's own choreography is driven
 * by --s (0 → 1 while it holds the screen). See `.hero-scroll` and the scene blocks in globals.css.
 */
import type { PillarId } from "@/content/services";

type CSS = React.CSSProperties;

function Layer({ depth, className = "", children }: { depth: number; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`layer absolute ${className}`} style={{ "--depth": depth } as CSS}>
      {children}
    </div>
  );
}

/* ────────────────────────────── Scene 1: Think ────────────────────────────── */

/** One transparent layer of thinking. --z is its place in the stack. */
function ThinkSheet({ z, label, children }: { z: number; label: string; children?: React.ReactNode }) {
  return (
    <div className="think-sheet absolute inset-0" style={{ "--z": z } as CSS}>
      {children}
      <span className="think-plane absolute inset-0 rounded-[1.5rem] border border-white/30 bg-white/[0.025]" />
      <span className="think-plane absolute -top-[4.5%] left-[3%] font-display text-[clamp(0.5rem,2.1cqw,0.75rem)] uppercase tracking-[0.24em] text-fg/75">{label}</span>
    </div>
  );
}

const board = { viewBox: "0 0 200 320", className: "absolute inset-0 size-full overflow-visible", fill: "none", preserveAspectRatio: "none" } as const;

/**
 * Think: "finding the right direction", before anything is made. Same language as the Create monolith:
 * one tall canvas is the hero, but here it is unfinished, still under study. In front of it float four
 * thin transparent layers of thinking (Audience, Insight, Direction, Idea), offset in depth.
 * As --s goes 0 → 1 the layers draw closer, the options that don't matter fade out, one orange line
 * finds its way through and becomes the direction, and the canvas ends on a clear composition that is
 * still only the idea: an outline of the poster Create will then build (same letter, same circle,
 * same places). Few, precise details: crop marks, a selection frame, a handful of points, small notes.
 */
function ThinkArt({ glyph }: { glyph: string }) {
  return (
    <>
      {/* Ground: fainter than in Create. Nothing is built yet. */}
      <Layer depth={0.4} className="bottom-[-6%] left-[14%] h-[14%] w-[72%]">
        <span className="block size-full rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_38%,transparent),transparent)]" />
      </Layer>

      <Layer depth={1} className="left-[21%] top-[-3%] h-[104%] w-[58%]">
        <div className="mono size-full">
          <div className="think-stack relative size-full">
            {/* The canvas under study. */}
            <div className="think-sheet absolute inset-0" style={{ "--z": -1.6 } as CSS}>
              <span className="absolute inset-0 rounded-[1.5rem] border border-white/20 bg-[linear-gradient(168deg,color-mix(in_oklab,var(--accent)_22%,var(--surface)),var(--surface)_55%,var(--bg))] shadow-[0_50px_100px_-40px_rgba(0,0,0,1)]" />
              <span className="absolute inset-0 rounded-[1.5rem] bg-[radial-gradient(circle,rgba(255,255,255,0.28)_0.9px,transparent_1.5px)] [background-size:8%_5%] [mask-image:linear-gradient(190deg,#000,transparent_70%)]" />
              {/* Crop marks and a measure: it is still on the table. */}
              <svg {...board} stroke="#fff" strokeOpacity="0.7" strokeWidth="1">
                <path d="M-8 0 H-2 M0 -8 V-2 M208 0 H202 M200 -8 V-2 M-8 320 H-2 M0 328 V322 M208 320 H202 M200 328 V322" />
                <path d="M212 40 V280 M209 40 H215 M209 280 H215 M209 160 H215" strokeOpacity="0.45" />
              </svg>
            </div>

            {/* Audience: a handful of points. Most are let go; one group stays. */}
            <ThinkSheet z={-0.6} label="Audience">
              <svg {...board}>
                <g className="think-ignored" fill="#fff" fillOpacity="0.55">
                  <circle cx="150" cy="60" r="3" />
                  <circle cx="172" cy="96" r="2.4" />
                  <circle cx="34" cy="120" r="2.6" />
                  <circle cx="168" cy="286" r="2.8" />
                </g>
                <g fill="#fff">
                  <circle cx="44" cy="232" r="3.4" />
                  <circle cx="60" cy="250" r="3.4" />
                  <circle cx="36" cy="258" r="3.4" />
                </g>
                <circle cx="46" cy="247" r="24" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="3 4" />
                <path d="M68 232 L86 220 H104" stroke="#fff" strokeOpacity="0.6" strokeWidth="1" />
              </svg>
            </ThinkSheet>

            {/* Insight: what we choose to look at. */}
            <ThinkSheet z={0.3} label="Insight">
              <svg {...board}>
                <g className="think-select" stroke="var(--accent-ink)" strokeWidth="1.2">
                  <rect x="92" y="150" width="96" height="112" strokeDasharray="5 5" />
                  <g fill="var(--bg)">
                    <rect x="88" y="146" width="8" height="8" />
                    <rect x="184" y="146" width="8" height="8" />
                    <rect x="88" y="258" width="8" height="8" />
                    <rect x="184" y="258" width="8" height="8" />
                  </g>
                </g>
              </svg>
            </ThinkSheet>

            {/* Direction: several ways to go, one of them right. */}
            <ThinkSheet z={1.2} label="Direction">
              <svg {...board} strokeLinecap="round" strokeLinejoin="round">
                <g className="think-ignored" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 5">
                  <path d="M30 292 C90 280 150 250 178 196" />
                  <path d="M30 292 C70 300 120 304 172 300" />
                  <path d="M30 292 C20 240 22 190 30 150" />
                </g>
                <circle cx="30" cy="292" r="4" fill="var(--accent-2)" />
                <path className="think-path" pathLength={1} d="M30 292 C60 252 120 262 128 214 C134 176 84 170 70 132 C62 106 78 82 104 70" stroke="var(--accent-2)" strokeWidth="2.4" />
                <path className="think-arrow" d="M90 68 L105 69 L100 84" stroke="var(--accent-2)" strokeWidth="2.4" />
              </svg>
            </ThinkSheet>

            {/* Idea: the outline of what will be built (same letter and form as the Create poster). */}
            <ThinkSheet z={2.1} label="Idea">
              <span className="think-outline absolute left-[8%] top-[-1%] font-display text-[clamp(5rem,52cqw,19rem)] font-bold leading-none">{glyph}</span>
              <span className="think-settle absolute left-[8%] top-[-1%] font-display text-[clamp(5rem,52cqw,19rem)] font-bold leading-none text-fg/30">{glyph}</span>
              <span className="absolute bottom-[7%] right-[-24%] aspect-square w-[86%] rounded-full border border-dashed border-white/60">
                <span className="think-settle absolute inset-0 rounded-full bg-white/10" />
              </span>
            </ThinkSheet>
          </div>
        </div>
      </Layer>
    </>
  );
}

/* ────────────────────────────── Scene 2: Create ────────────────────────────── */

/** One sheet of the monolith. --z is its place in the stack while the layers are still apart. */
function MonoSheet({ z, label, clip = false, children }: { z: number; label: string; clip?: boolean; children?: React.ReactNode }) {
  return (
    <div className="mono-sheet absolute inset-0" style={{ "--z": z } as CSS}>
      <div className={"absolute inset-0 rounded-[1.5rem] " + (clip ? "overflow-hidden" : "")}>{children}</div>
      <span className="mono-plane absolute inset-0 rounded-[1.5rem] border border-white/30 bg-white/[0.03]" />
      <span className="mono-plane absolute -top-[4.5%] left-[3%] font-display text-[clamp(0.5rem,2.1cqw,0.75rem)] uppercase tracking-[0.24em] text-fg/75">{label}</span>
    </div>
  );
}

/** The poster itself: four sheets (colour, motion, image, type). Shared by Create and Grow. */
function MonolithSheets({ glyph }: { glyph: string }) {
  return (
    <>
      {/* Colour */}
      <MonoSheet z={-1.5} label="Colour" clip>
        <span className="absolute inset-0 bg-[linear-gradient(168deg,var(--accent)_0%,color-mix(in_oklab,var(--accent)_55%,#8b3dff)_52%,color-mix(in_oklab,var(--accent)_34%,var(--bg))_100%)]" />
        <span className="absolute inset-0 bg-[radial-gradient(80%_45%_at_100%_100%,color-mix(in_oklab,var(--accent-2)_45%,transparent),transparent_70%)]" />
        <span className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" style={{ borderRadius: "inherit" }} />
      </MonoSheet>

      {/* Motion: the quiet structure under everything. */}
      <MonoSheet z={-0.5} label="Motion" clip>
        <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.42)_0.9px,transparent_1.5px)] [background-size:8%_5%] [mask-image:linear-gradient(190deg,#000,transparent_60%)]" />
        <svg viewBox="0 0 200 320" className="absolute inset-0 size-full" fill="none" preserveAspectRatio="none">
          <g stroke="#fff" strokeOpacity="0.28" strokeWidth="0.7">
            <circle cx="150" cy="232" r="84" />
            <circle cx="150" cy="232" r="106" />
            <circle cx="150" cy="232" r="128" />
          </g>
        </svg>
      </MonoSheet>

      {/* Image: one large white form, breaking out of the frame. */}
      <MonoSheet z={0.5} label="Image">
        <span className="absolute bottom-[7%] right-[-24%] aspect-square w-[86%] rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff,color-mix(in_oklab,var(--accent)_18%,white)_58%,color-mix(in_oklab,var(--accent)_50%,white))] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]" />
      </MonoSheet>

      {/* Type: the letter, and the few fine lines that finish the piece. */}
      <MonoSheet z={1.5} label="Type">
        <span className="absolute left-[8%] top-[-1%] font-display text-[clamp(5rem,52cqw,19rem)] font-bold leading-none text-fg">{glyph}</span>
        <svg viewBox="0 0 200 320" className="absolute inset-0 size-full overflow-visible" fill="none" preserveAspectRatio="none" strokeLinecap="round">
          <g stroke="var(--accent-2)" strokeWidth="2.2">
            <path d="M150 22 H184 M160 31 H184 M170 40 H184" />
          </g>
          <g stroke="#fff" strokeWidth="2.4">
            <path d="M16 286 H70" />
            <path d="M16 296 H52" strokeOpacity="0.55" />
          </g>
        </svg>
      </MonoSheet>
    </>
  );
}

/**
 * Create, "Poster Monolith" direction: one hero and nothing else. A single tall poster stands in the
 * scene like a monument. It opens as a few transparent layers one behind the other (TYPE, IMAGE,
 * MOTION, COLOUR), seen from the side; as --s goes 0 → 1 they close along Z, calmly, and lock into one
 * final poster that holds a slight angle so it keeps its presence. 80% of the scene is the poster
 * itself: a giant letter, one large white form breaking out of the frame, three fine orange lines,
 * a faint grid, two lines of text. Helpers are limited to a ghost plate behind, a small badge and
 * one thin orange beam.
 */
function CreateMonolithArt({ glyph }: { glyph: string }) {
  return (
    <>
      {/* Ground: the light the monument stands in. */}
      <Layer depth={0.4} className="bottom-[-6%] left-[10%] h-[16%] w-[80%]">
        <span className="block size-full rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_65%,transparent),transparent)]" />
      </Layer>

      <Layer depth={1} className="left-[21%] top-[-3%] h-[104%] w-[58%]">
        <div className="mono size-full">
          <div className="mono-stack relative size-full">
            {/* Helper: a ghost plate that stays just behind the finished poster. */}
            <span className="mono-ghost mono-helper absolute inset-0 rounded-[1.5rem] border border-white/20 bg-white/[0.04]" />

            <MonolithSheets glyph={glyph} />
          </div>
        </div>
      </Layer>

      {/* Helper: one thin orange beam beside the monument. */}
      <Layer depth={1.6} className="left-[14%] top-[6%] h-[84%] w-[0.5cqw] min-w-[2px]">
        <span className="mono-beam block size-full rounded-full bg-accent-2 shadow-[0_0_18px_2px_color-mix(in_oklab,var(--accent-2)_70%,transparent)]" />
      </Layer>

      {/* Helper: a small badge carrying the letter. */}
      <Layer depth={2.4} className="left-[80%] top-[6%] aspect-square w-[13%]">
        <span className="mono-pop flex size-full items-center justify-center rounded-full border border-white/20 bg-surface shadow-[0_18px_40px_-18px_rgba(0,0,0,0.95)]">
          <span className="font-display text-[clamp(0.9rem,6cqw,2.2rem)] font-bold leading-none text-fg">{glyph}</span>
        </span>
      </Layer>
    </>
  );
}

/* ─────────────────────────────── Scene 3: Grow ─────────────────────────────── */

const posterBg = "bg-[linear-gradient(168deg,var(--accent)_0%,color-mix(in_oklab,var(--accent)_55%,#8b3dff)_52%,color-mix(in_oklab,var(--accent)_34%,var(--bg))_100%)]";
const sphere = "rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff,color-mix(in_oklab,var(--accent)_18%,white)_58%,color-mix(in_oklab,var(--accent)_50%,white))]";
const glyphBase = "absolute font-display font-bold leading-none text-fg";

type Variant = "full" | "wide" | "crop" | "motion" | "short";

/**
 * The Create poster, redrawn so it can exist in any format. Sizes inside are container units of the
 * poster itself, so every variant is the same design, adapted, not a different picture.
 */
function Poster({ variant, glyph, width, ratio }: { variant: Variant; glyph: string; width: number; ratio: string }) {
  const clip = variant !== "full";
  return (
    <div className="relative" style={{ width: width + "cqw", aspectRatio: ratio, containerType: "size" }}>
      <span className={"absolute inset-0 rounded-[7cqw] shadow-[0_24px_50px_-22px_rgba(0,0,0,0.95)] " + posterBg} />
      <span className={"absolute inset-0 rounded-[7cqw] " + (clip ? "overflow-hidden" : "")}>
        <span className="absolute inset-0 bg-[radial-gradient(80%_45%_at_100%_100%,color-mix(in_oklab,var(--accent-2)_45%,transparent),transparent_70%)]" />
        {variant === "full" && (
          <>
            <span className={glyphBase + " left-[8%] top-[-1%] text-[90cqw]"}>{glyph}</span>
            <span className={"absolute bottom-[7%] right-[-24%] aspect-square w-[86%] " + sphere} />
          </>
        )}
        {variant === "motion" && (
          <>
            <span className={glyphBase + " left-[8%] top-[-1%] text-[90cqw]"}>{glyph}</span>
            <span className={"absolute bottom-[12%] right-[-30%] aspect-square w-[86%] " + sphere} />
            <span className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(to_top,rgba(0,0,0,0.6),transparent)]" />
            <span className="absolute inset-x-[9%] bottom-[7%] h-[2cqw] rounded-full bg-white/30">
              <span className="absolute inset-y-0 left-0 w-[46%] rounded-full bg-accent-2" />
            </span>
          </>
        )}
        {variant === "wide" && (
          <>
            <span className={glyphBase + " left-[6%] top-[-10%] text-[66cqh]"}>{glyph}</span>
            <span className={"absolute right-[-7%] top-[16%] aspect-square h-[124%] " + sphere} />
          </>
        )}
        {variant === "crop" && (
          <>
            <span className={glyphBase + " left-[-24%] top-[-20%] text-[150cqw]"}>{glyph}</span>
            <span className={"absolute bottom-[-24%] right-[-52%] aspect-square w-[124%] " + sphere} />
          </>
        )}
        {variant === "short" && <span className={glyphBase + " inset-0 flex items-center justify-center text-[74cqw]"}>{glyph}</span>}
      </span>
      {variant !== "short" && (
        <span className="absolute right-[8%] top-[6%] flex flex-col items-end gap-[2.4cqw]">
          <span className="h-[1.5cqw] w-[17cqw] rounded-full bg-accent-2" />
          <span className="h-[1.5cqw] w-[12cqw] rounded-full bg-accent-2" />
          <span className="h-[1.5cqw] w-[7cqw] rounded-full bg-accent-2" />
        </span>
      )}
      <span className="absolute inset-0 rounded-[7cqw] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]" />
    </div>
  );
}

type Node = { variant: Variant; x: number; y: number; z: number; width: number; ratio: string; at: number; fate?: "strong" | "weak" };

/**
 * The system's grid: positions are % of the art box from its centre, z in depth steps.
 * Laid out as an even ring around the original with equal gaps: top, left, right, and two slots below.
 * The two lower slots are first taken by weak versions, which fade, and are then re-filled by repeats
 * of what worked, so the finished system is balanced.
 */
const nodes: Node[] = [
  { variant: "wide", x: 0, y: -39, z: -1, width: 30, ratio: "16 / 9", at: 0.12 },
  { variant: "motion", x: -37, y: -2, z: 1, width: 18, ratio: "0.62", at: 0.18 },
  { variant: "crop", x: 37, y: -2, z: 1.2, width: 20, ratio: "3 / 4", at: 0.24, fate: "strong" },
  { variant: "short", x: -23, y: 39, z: 1.6, width: 13, ratio: "1 / 1", at: 0.3, fate: "weak" },
  { variant: "full", x: 23, y: 39, z: 1.6, width: 12, ratio: "0.62", at: 0.34, fate: "weak" },
  // What works is repeated into the freed slots.
  { variant: "crop", x: 23, y: 39, z: 2, width: 17, ratio: "3 / 4", at: 0.68, fate: "strong" },
  { variant: "wide", x: -23, y: 39, z: 2, width: 25, ratio: "16 / 9", at: 0.76, fate: "strong" },
];

/**
 * Grow, "Living System" direction: no new element is invented. The scene opens on the poster Create
 * ended with. As --s goes 0 → 1 the camera pulls back and versions of that same poster unfold out of
 * it (wide, cropped, in motion, short, small), placed on an ordered 3D grid like a design system
 * extending itself. Thin lines connect them; most stay faint, one route turns orange. What sits on
 * that route adapts: it grows, the weaker versions fade, the best one is repeated further out. At the
 * end the glass layers open up beyond the poster into a structure around the whole thing: one piece
 * has become a system that can keep growing. No charts, numbers, likes, phones or platform icons.
 */
function GrowArt({ glyph }: { glyph: string }) {
  return (
    <>
      <Layer depth={0.4} className="bottom-[-6%] left-[10%] h-[16%] w-[80%]">
        <span className="block size-full rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_60%,transparent),transparent)]" />
      </Layer>

      <Layer depth={1} className="inset-0">
        <div className="mono size-full">
          <div className="sys-stack relative size-full">
            {/* Architecture: the layers, opened up around the system. */}
            {[
              { w: 78, h: 88, z: -10 },
              { w: 104, h: 112, z: -22 },
            ].map((p) => (
              <span key={p.z} className="absolute left-1/2 top-1/2">
                <span
                  className="sys-arch absolute left-0 top-0 block rounded-[2rem] border border-white/25 bg-white/[0.025]"
                  style={{ width: p.w + "cqw", height: p.h + "cqh", marginLeft: -p.w / 2 + "cqw", marginTop: -p.h / 2 + "cqh", "--az": p.z } as CSS}
                />
              </span>
            ))}

            {/* Routes between the pieces. Most stay faint; one becomes the way forward. */}
            <svg viewBox="-50 -50 100 100" className="sys-lines absolute inset-0 size-full overflow-visible" fill="none" preserveAspectRatio="none" strokeLinecap="round" strokeLinejoin="round">
              <g stroke="#fff" strokeOpacity="0.35" strokeWidth="0.25">
                {nodes.slice(0, 5).map((n) => (
                  <path key={n.variant + n.x} d={`M0 0 L${n.x} ${n.y}`} />
                ))}
                <path d="M0 -39 L37 -2 L23 39 L-23 39 L-37 -2 Z" strokeDasharray="0.8 1.6" />
              </g>
              <path className="sys-route-a" pathLength={1} d="M0 0 L37 -2" stroke="var(--accent-2)" strokeWidth="0.6" />
              <path className="sys-route-b" pathLength={1} d="M37 -2 L23 39" stroke="var(--accent-2)" strokeWidth="0.6" />
              <path className="sys-route-c" pathLength={1} d="M23 39 L-23 39" stroke="var(--accent-2)" strokeWidth="0.6" />
            </svg>

            {/* The versions. */}
            {nodes.map((n) => (
              <span key={n.variant + n.x + n.at} className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]">
                <span
                  className={"sys-node block" + (n.fate ? " sys-" + n.fate : "")}
                  style={{ "--x": n.x, "--y": n.y, "--z": n.z, "--d0": n.at } as CSS}
                >
                  <span className="block -translate-x-1/2 -translate-y-1/2">
                    <Poster variant={n.variant} glyph={glyph} width={n.width} ratio={n.ratio} />
                  </span>
                </span>
              </span>
            ))}

            {/* The original poster: the very same object Create ended on, in the same place. */}
            <div className="sys-hero absolute left-[21%] top-[-3%] h-[104%] w-[58%]" style={{ "--e": 0 } as CSS}>
              <MonolithSheets glyph={glyph} />
            </div>
          </div>
        </div>
      </Layer>
    </>
  );
}

export function HeroArt({ id, glyph }: { id: PillarId; glyph: string }) {
  if (id === "think") return <ThinkArt glyph={glyph} />;
  if (id === "create") return <CreateMonolithArt glyph={glyph} />;
  return <GrowArt glyph={glyph} />;
}
