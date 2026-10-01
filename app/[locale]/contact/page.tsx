import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { pick } from "@/content/types";
import { site, whatsappHref } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { QuoteForm } from "@/components/contact/QuoteForm";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return buildMetadata(locale, "contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages");
  const tf = await getTranslations("form");
  const tc = await getTranslations("common");
  const tfoot = await getTranslations("footer");

  const countryIds = ["sa", "ae", "om", "jo", "other"] as const;
  const labels = {
    title: tf("title"),
    name: tf("name"),
    company: tf("company"),
    country: tf("country"),
    service: tf("service"),
    message: tf("message"),
    optional: tf("optional"),
    select: tf("select"),
    submit: tf("submit"),
    sending: tf("sending"),
    successTitle: tf("successTitle"),
    successBody: tf("successBody"),
    again: tf("again"),
    privacy: tf("privacy"),
    errors: { name: tf("errors.name"), country: tf("errors.country"), service: tf("errors.service"), message: tf("errors.message") },
  };

  return (
    <>
      <PageHeader eyebrow={t("contact.eyebrow")} title={t("contact.title")} intro={t("contact.intro")} />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <QuoteForm
              labels={labels}
              locale={locale}
              countries={countryIds.map((id) => ({ value: id, label: tf(`countries.${id}`) }))}
              services={[...services.map((s) => ({ value: s.id, label: pick(s.title, locale) })), { value: "other", label: tf("otherService") }]}
            />
          </div>
          <aside className="space-y-4 lg:col-span-4">
            <a
              href={whatsappHref(tc("whatsappMessage"))}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-4 rounded-3xl border border-line p-6 transition-colors hover:border-[#25D366]"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#0b1f12]">
                <WhatsAppIcon />
              </span>
              <span className="font-display text-lg font-semibold">{tc("whatsapp")}</span>
            </a>
            <div className="rounded-3xl border border-line p-6">
              <h2 className="text-sm text-muted">{tfoot("contact")}</h2>
              <a href={`mailto:${site.email}`} className="mt-3 block w-fit font-display text-lg hover:text-accent-ink" dir="ltr">
                {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-1 block w-fit font-display text-lg hover:text-accent-ink" dir="ltr">
                {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
