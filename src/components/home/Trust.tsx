import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { certificates } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

export async function Trust() {
  const t = await getTranslations();
  return (
    <Section>
      <SectionHeading eyebrow={t("common.licensed")} title={t("home.trust.title")} subtitle={t("home.trust.subtitle")} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {certificates.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.06} className={i === 4 ? "col-span-2 sm:col-span-1" : undefined}>
            <Link href="/certificates" className="group block rounded-2xl border border-sand-200 bg-white p-3 transition hover:-translate-y-1 hover:shadow-lift">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-sand-100">
                <SmartImage src={c.image} alt={t(`certificates.items.${c.key}`)} fill sizes="(min-width:1024px) 18vw, 45vw" className="object-cover object-top" />
              </div>
              <p className="mt-3 line-clamp-2 px-1 text-xs font-semibold text-navy-900 sm:text-sm">{t(`certificates.items.${c.key}`)}</p>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/certificates" className="btn-ghost">
          {t("home.trust.cta")} <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
