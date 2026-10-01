import { getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { whatsappHref } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/Icons";

export async function FinalCta({ title }: { title?: string }) {
  const t = await getTranslations("finalCta");
  const tc = await getTranslations("common");

  return (
    <section aria-labelledby="cta-title" className="grain relative isolate overflow-hidden border-t border-line">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_110%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent),radial-gradient(40%_40%_at_90%_0%,color-mix(in_oklab,var(--accent-2)_18%,transparent),transparent)]"
      />
      <Reveal className="container-x section flex flex-col items-center text-center">
        <h2 id="cta-title" className="display max-w-5xl text-balance text-[clamp(2.5rem,7.5vw,6rem)]">
          {title ?? t("title")}
        </h2>
        <p className="lede mt-6 max-w-xl">{t("body")}</p>
        <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Magnetic className="w-full sm:w-auto">
            <Link href="/contact" className="btn btn-primary w-full px-8 text-lg sm:w-auto">
              {tc("requestQuote")}
              <ArrowIcon className="btn-arrow" />
            </Link>
          </Magnetic>
          <a href={whatsappHref(tc("whatsappMessage"))} target="_blank" rel="noopener" className="btn btn-ghost px-8 text-lg">
            <WhatsAppIcon className="text-[#25D366]" />
            {tc("whatsapp")}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
