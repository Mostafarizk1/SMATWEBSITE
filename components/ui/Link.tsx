import NextLink from "next/link";
import { getLocale } from "next-intl/server";
import { localizeHref } from "@/lib/i18n-client";

type Props = Omit<React.ComponentProps<typeof NextLink>, "href"> & { href: string };

/** Server-side locale-aware link. Pass unprefixed paths ("/work"); the active locale is added. */
export async function Link({ href, ...rest }: Props) {
  const locale = await getLocale();
  return <NextLink href={localizeHref(locale, href)} {...rest} />;
}
