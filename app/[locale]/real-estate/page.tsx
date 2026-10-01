import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { RealEstateSpotlight } from "@/components/home/RealEstateSpotlight";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/real-estate">) {
  const { locale } = await params;
  return buildMetadata(locale, "realEstate");
}

export default async function RealEstatePage({ params }: PageProps<"/[locale]/real-estate">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages");

  return (
    <>
      <PageHeader eyebrow={t("realEstate.eyebrow")} title={t("realEstate.title")} intro={t("realEstate.intro")} />
      <RealEstateSpotlight standalone />
      <FinalCta title={t("ctaTitle")} />
    </>
  );
}
