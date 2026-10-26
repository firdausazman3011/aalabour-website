import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/GalleryGrid";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/gallery", "nav.gallery", "gallery.hero.subtitle");
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery.hero");
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Section>
        <GalleryGrid />
      </Section>
    </>
  );
}
