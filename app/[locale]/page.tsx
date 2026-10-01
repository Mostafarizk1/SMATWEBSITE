import { getTranslations, setRequestLocale } from "next-intl/server";
import { LogoIntro } from "@/components/intro/LogoIntro";
import { Hero } from "@/components/home/Hero";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { Method } from "@/components/home/Method";
import { RealEstateSpotlight } from "@/components/home/RealEstateSpotlight";
import { SelectedWork } from "@/components/home/SelectedWork";
import { Numbers } from "@/components/home/Numbers";
import { Markets } from "@/components/home/Markets";
import { FinalCta } from "@/components/home/FinalCta";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("intro");

  return (
    <>
      <LogoIntro skipLabel={t("skip")} />
      <Hero />
      <ClientsMarquee />
      <Method />
      <RealEstateSpotlight />
      <SelectedWork />
      <Numbers />
      <Markets />
      <FinalCta />
    </>
  );
}
