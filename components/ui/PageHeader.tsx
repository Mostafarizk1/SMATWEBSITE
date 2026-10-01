import { Reveal } from "@/components/motion/Reveal";

/** Header for inner pages: one h1 per page. Text is visible on first paint (CSS fade only). */
export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode }) {
  return (
    <section className="grain relative isolate overflow-hidden border-b border-line pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_80%_0%,color-mix(in_oklab,var(--accent-2)_16%,transparent),transparent)] rtl:bg-[radial-gradient(50%_60%_at_20%_0%,color-mix(in_oklab,var(--accent-2)_16%,transparent),transparent)]"
      />
      <div className="container-x">
        <p className="eyebrow fade-up">{eyebrow}</p>
        <h1 className="display fade-up mt-6 max-w-5xl text-balance text-[clamp(2.75rem,8vw,6.5rem)]" style={{ "--d": "0.08s" } as React.CSSProperties}>
          {title}
        </h1>
        <p className="lede fade-up mt-6 max-w-2xl" style={{ "--d": "0.16s" } as React.CSSProperties}>
          {intro}
        </p>
        {children && <Reveal className="mt-10">{children}</Reveal>}
      </div>
    </section>
  );
}
