import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { markets } from "@/content/markets";
import { pick } from "@/content/types";
import { site, whatsappHref } from "@/content/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { QuoteForm, type QuoteFormLabels } from "@/components/contact/QuoteForm";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  return buildMetadata(locale, "contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.contact");
  const tf = await getTranslations("form");
  const tc = await getTranslations("common");

  const plain = [
    "title", "name", "nameHint", "company", "companyHint", "email", "emailHint", "phone", "phoneHint", "country", "countryHint",
    "service", "serviceHint", "message", "messageHint", "helper", "optional", "submit", "sending", "successTitle", "successBody", "again", "privacy",
  ] as const;
  const errorKeys = ["name", "contact", "email", "phone", "country", "service", "message"] as const;

  const labels = {
    ...Object.fromEntries(plain.map((key) => [key, tf(key)])),
    errors: Object.fromEntries(errorKeys.map((key) => [key, tf(`errors.${key}`)])),
  } as QuoteFormLabels;

  const countries = [...markets.map((mk) => ({ value: mk.id, label: tf(`countries.${mk.id}`) })), { value: "other", label: tf("countries.other") }];
  const serviceOptions = [
    ...services.map((s) => ({ value: s.id, label: pick(s.title, locale) })),
    { value: "integrated", label: tf("integrated") },
    { value: "unsure", label: tf("unsure") },
  ];

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <QuoteForm labels={labels} locale={locale} countries={countries} services={serviceOptions} />
          </div>
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-3xl border border-line p-6">
              <h2 className="font-display text-xl font-semibold">{t("direct.title")}</h2>
              <p className="mt-2 text-muted">{t("direct.body")}</p>
              <a
                href={whatsappHref(tc("whatsappMessage"))}
                target="_blank"
                rel="noopener"
                className="mt-5 flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors hover:border-[#25D366]"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#0b1f12]">
                  <WhatsAppIcon />
                </span>
                <span className="font-display font-semibold">{tc("whatsapp")}</span>
              </a>
              {/* PLACEHOLDER contact details (content/site.ts): replace before launch. */}
              <a href={`mailto:${site.email}`} className="mt-5 block w-fit font-display text-lg hover:text-accent-ink" dir="ltr">
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
