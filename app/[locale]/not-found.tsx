import { getTranslations } from "next-intl/server";
import { Link } from "@/components/ui/Link";

export default async function NotFound() {
  const t = await getTranslations("pages.notFound");
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-[var(--header-h)]">
      <p className="font-display text-8xl font-bold text-accent-ink">404</p>
      <h1 className="display mt-6 text-5xl">{t("title")}</h1>
      <p className="lede mt-4">{t("body")}</p>
      <Link href="/" className="btn btn-primary mt-10">
        {t("back")}
      </Link>
    </section>
  );
}
