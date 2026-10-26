import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactDetails, MapEmbed } from "@/components/ContactBlock";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/contact", "nav.contact", "contact.hero.subtitle");
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <ContactDetails />
          <Reveal delay={0.1} className="card p-6 sm:p-8">
            <LeadForm variant="contact" />
          </Reveal>
        </div>
        <MapEmbed className="mt-10 h-[420px]" />
      </Section>
    </>
  );
}
