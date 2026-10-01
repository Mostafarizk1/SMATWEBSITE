import { getTranslations } from "next-intl/server";
import { clients, type Client } from "@/content/clients";

function Mark({ shape }: { shape: Client["shape"] }) {
  const common = { fill: "currentColor" };
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
      {shape === "circle" && <circle cx="12" cy="12" r="10" {...common} />}
      {shape === "square" && <rect x="3" y="3" width="18" height="18" rx="3" {...common} />}
      {shape === "triangle" && <path d="M12 2 22 21H2Z" {...common} />}
      {shape === "diamond" && <path d="M12 1 23 12 12 23 1 12Z" {...common} />}
      {shape === "bars" && <path d="M3 14h4v8H3zM10 8h4v14h-4zM17 2h4v20h-4z" {...common} />}
      {shape === "ring" && <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="4" />}
    </svg>
  );
}

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {clients.map((c) => (
        <li key={c.id} className="flex shrink-0 items-center gap-3 text-muted transition-colors hover:text-fg" dir="ltr">
          <Mark shape={c.shape} />
          <span className="font-display text-lg font-semibold tracking-wide">{c.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Infinite CSS marquee (no JS). Pauses on hover, reverses in RTL via --dir, static with reduced motion. */
export async function ClientsMarquee() {
  const t = await getTranslations("clients");
  return (
    <section aria-labelledby="clients-label" className="border-y border-line py-10 md:py-12">
      <div className="container-x">
        <h2 id="clients-label" className="mb-7 text-center text-sm text-muted">
          {t("label")}
        </h2>
      </div>
      <div className="marquee overflow-hidden">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
