import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { getWorkViews } from "@/components/home/SelectedWork";
import { WorkGrid } from "@/components/home/WorkGrid";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  return buildMetadata(locale, "work");
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages");
  const views = await getWorkViews();

  return (
    <>
      <PageHeader eyebrow={t("work.eyebrow")} title={t("work.title")} intro={t("work.intro")} />
      <section className="section">
        <div className="container-x">
          <WorkGrid {...views} />
        </div>
      </section>
      <FinalCta title={t("ctaTitle")} />
    </>
  );
}
