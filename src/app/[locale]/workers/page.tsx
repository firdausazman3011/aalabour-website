import { getTranslations, setRequestLocale } from "next-intl/server";
import { BadgeCheck, Banknote, BedDouble, CheckCircle2, FileText, HeartHandshake, Landmark, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Faq } from "@/components/Faq";
import { Steps } from "@/components/Steps";
import { LeadForm } from "@/components/forms/LeadForm";
import { LineIcon, TelegramIcon } from "@/components/layout/icons";
import { company } from "@/content/site";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/workers", "workers.hero.title", "workers.hero.subtitle");
}

const benefitIcons = [Banknote, Landmark, BedDouble, BadgeCheck, HeartHandshake, ShieldCheck];

export default async function WorkersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero eyebrow={t("workers.hero.eyebrow")} title={t("workers.hero.title")} subtitle={t("workers.hero.subtitle")} />

      <Section tone="white">
        <SectionHeading title={t("workers.benefits.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(t.raw("workers.benefits.items") as { title: string; desc: string }[]).map((b, i) => {
            const Icon = benefitIcons[i];
            return (
              <Reveal key={b.title} delay={(i % 3) * 0.06} className="card flex gap-5 p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-success"><Icon className="size-6" /></span>
                <div>
                  <h3 className="font-bold text-navy-950">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted">{b.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          {(["requirements", "documents"] as const).map((key, i) => (
            <Reveal key={key} delay={i * 0.1} className={`rounded-[2rem] p-8 sm:p-10 ${i === 0 ? "bg-navy-900 text-white" : "card"}`}>
              <div className="flex items-center gap-3">
                {i === 0 ? <CheckCircle2 className="size-7 text-brand-500" /> : <FileText className="size-7 text-brand-600" />}
                <h2 className="text-2xl font-extrabold">{t(`workers.${key}.title`)}</h2>
              </div>
              <ul className="mt-6 grid gap-3">
                {(t.raw(`workers.${key}.items`) as string[]).map((item, n) => (
                  <li key={item} className={`flex items-center gap-4 rounded-2xl p-4 ${i === 0 ? "bg-white/5" : "bg-sand-50"}`}>
                    <span className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${i === 0 ? "bg-brand-600 text-white" : "bg-navy-950 text-white"}`}>{n + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeading title={t("home.process.title")} subtitle={t("home.process.subtitle")} dark />
        <Steps steps={t.raw("home.process.steps")} dark />
      </Section>

      <Section tone="white">
        <SectionHeading title={t("workers.training.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw("workers.training.items") as { title: string; desc: string }[]).map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="rounded-3xl border border-sand-200 bg-sand-50 p-6">
              <p className="text-3xl font-extrabold text-brand-600/30">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-bold text-navy-950">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="apply" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading align="left" title={t("workers.form.title")} subtitle={t("workers.form.subtitle")} />
            <Reveal className="grid gap-3 sm:grid-cols-2">
              <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="btn bg-[#229ED9] !py-4 text-white hover:brightness-110">
                <TelegramIcon className="size-5" /> {t("common.chatTelegram")}
              </a>
              <a href={company.line} target="_blank" rel="noopener noreferrer" className="btn bg-[#06C755] !py-4 text-white hover:brightness-110">
                <LineIcon className="size-5" /> {t("common.chatLine")}
              </a>
            </Reveal>
            <div className="mt-10">
              <h3 className="mb-4 text-xl font-extrabold text-navy-950">{t("faq.title")}</h3>
              <Faq items={t.raw("faq.items")} />
            </div>
          </div>
          <Reveal delay={0.1} className="card h-fit p-6 sm:p-8 lg:sticky lg:top-28">
            <LeadForm variant="worker" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
