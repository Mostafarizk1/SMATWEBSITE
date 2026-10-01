import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";
import { work, workCategories } from "@/content/work";
import { pick } from "@/content/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/Icons";
import dynamic from "next/dynamic";

// Below the fold: split into its own chunk (still server-rendered).
const WorkGrid = dynamic(() => import("./WorkGrid").then((mod) => mod.WorkGrid));

export async function getWorkViews() {
  const t = await getTranslations("work");
  const locale = await getLocale();
  const items = work.map((w) => ({
    slug: w.slug,
    title: pick(w.title, locale),
    client: pick(w.client, locale),
    category: w.category,
    categoryLabel: t(`categories.${w.category}`),
    poster: w.poster,
    preview: w.preview,
  }));
  const categories = workCategories.map((id) => ({ id, label: t(`categories.${id}`) }));
  const labels = { all: t("all"), filter: t("filterLabel"), empty: t("empty") };
  return { items, categories, labels };
}

export async function SelectedWork() {
  const t = await getTranslations("work");
  const views = await getWorkViews();

  return (
    <section aria-labelledby="work-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading id="work-title" eyebrow={t("eyebrow")} title={t("title")}>
          <Link href="/work" className="btn btn-ghost hidden self-end md:inline-flex">
            {t("viewAll")}
            <ArrowIcon className="btn-arrow" />
          </Link>
        </SectionHeading>
        <div className="mt-12">
          <WorkGrid {...views} />
        </div>
        <Link href="/work" className="btn btn-ghost mt-12 w-full md:hidden">
          {t("viewAll")}
          <ArrowIcon className="btn-arrow" />
        </Link>
      </div>
    </section>
  );
}
