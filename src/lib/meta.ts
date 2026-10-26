import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// Per-page metadata with hreflang alternates for every locale.
export async function pageMeta(locale: string, path: string, titleKey: string, descKey: string): Promise<Metadata> {
  const t = await getTranslations({ locale });
  return {
    title: t(titleKey),
    description: t(descKey),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
    },
  };
}

export type PageProps = { params: Promise<{ locale: string }> };
