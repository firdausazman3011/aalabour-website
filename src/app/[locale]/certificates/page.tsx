import { getTranslations, setRequestLocale } from "next-intl/server";
import { ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { certificates } from "@/content/site";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/certificates", "nav.certificates", "certificates.hero.subtitle");
}

export default async function CertificatesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageHero eyebrow={t("certificates.hero.eyebrow")} title={t("certificates.hero.title")} subtitle={t("certificates.hero.subtitle")} />
      <Section>
        <Reveal className="mx-auto mb-12 flex w-fit items-center gap-3 rounded-full bg-emerald-50 px-5 py-3 text-sm font-semibold text-success ring-1 ring-emerald-200">
          <ShieldCheck className="size-5" /> {t("common.licensed")}
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c, i) => (
            <Reveal key={c.key} delay={(i % 3) * 0.06}>
              <a href={c.image} target="_blank" rel="noopener noreferrer" className="card group block p-4 transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-sand-100">
                  <SmartImage src={c.image} alt={t(`certificates.items.${c.key}`)} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="object-contain p-2 transition group-hover:scale-[1.02]" />
                </div>
                <p className="mt-4 px-1 font-semibold text-navy-950">{t(`certificates.items.${c.key}`)}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
