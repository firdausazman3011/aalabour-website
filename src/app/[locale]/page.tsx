import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { Paths } from "@/components/home/Paths";
import { Jobs } from "@/components/home/Jobs";
import { Process } from "@/components/home/Process";
import { CeoMessage } from "@/components/home/CeoMessage";
import { Trust } from "@/components/home/Trust";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { DestinationCards } from "@/components/DestinationCards";
import { ContactDetails, MapEmbed } from "@/components/ContactBlock";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { LeadForm } from "@/components/forms/LeadForm";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import type { PageProps } from "@/lib/meta";

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <Hero />
      <Stats />
      <Paths />
      <Jobs />
      <Process />
      <Section>
        <SectionHeading title={t("home.destinations.title")} subtitle={t("home.destinations.subtitle")} />
        <DestinationCards />
      </Section>
      <CeoMessage />
      <Trust />
      <GalleryTeaser />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" title={t("faq.title")} subtitle={t("faq.subtitle")} />
            <Faq items={t.raw("faq.items")} />
          </div>
          <div>
            <SectionHeading align="left" title={t("contact.hero.title")} subtitle={t("contact.hero.subtitle")} />
            <Reveal className="card p-6 sm:p-8">
              <LeadForm variant="contact" />
            </Reveal>
          </div>
        </div>
      </Section>
      <Section tone="white" className="!pt-0 sm:!pt-0">
        <div className="grid gap-6 pt-20 sm:pt-28 lg:grid-cols-[1fr_1.4fr]">
          <ContactDetails />
          <MapEmbed className="min-h-[380px]" />
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
