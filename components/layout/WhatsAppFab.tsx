import { getTranslations } from "next-intl/server";
import { whatsappHref } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Floating WhatsApp button on every page. Plain link, zero JS. */
export async function WhatsAppFab() {
  const t = await getTranslations("common");
  return (
    <a
      href={whatsappHref(t("whatsappMessage"))}
      target="_blank"
      rel="noopener"
      aria-label={t("whatsapp")}
      className="fixed bottom-5 end-5 z-30 inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#0b1f12] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-105 active:scale-95 md:bottom-7 md:end-7"
    >
      <WhatsAppIcon width={28} height={28} />
    </a>
  );
}
