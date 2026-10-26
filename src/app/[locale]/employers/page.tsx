import { getTranslations, setRequestLocale } from "next-intl/server";
import { ClipboardList, Factory, GraduationCap, Handshake, Headset, Plane, UserCheck, Workflow } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Steps } from "@/components/Steps";
import { LeadForm } from "@/components/forms/LeadForm";
import { ContactDetails } from "@/components/ContactBlock";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/employers", "employers.hero.title", "employers.hero.subtitle");
}

const serviceIcons = [ClipboardList, UserCheck, Workflow, Plane, Headset, GraduationCap];

export default async function EmployersPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero eyebrow={t("employers.hero.eyebrow")} title={t("employers.hero.title")} subtitle={t("employers.hero.subtitle")} />

      <Section tone="white">
        <SectionHeading title={t("employers.services.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(t.raw("employers.services.items") as { title: string; desc: string }[]).map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.06} className="card group p-7 transition hover:-translate-y-1 hover:shadow-lift">
                <span className="grid size-12 place-items-center rounded-2xl bg-navy-950 text-white transition group-hover:bg-brand-600"><Icon className="size-6" /></span>
                <h3 className="mt-6 text-lg font-bold text-navy-950">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading title={t("employers.industries.title")} subtitle={t("employers.industries.subtitle")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw("employers.industries.items") as { name: string; roles: string }[]).map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 4) * 0.05} className="rounded-3xl border border-sand-200 bg-white p-6">
              <Factory className="size-6 text-brand-600" strokeWidth={1.75} />
              <h3 className="mt-4 font-bold text-navy-950">{ind.name}</h3>
              <p className="mt-2 text-sm text-muted">{ind.roles}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeading title={t("employers.process.title")} dark />
        <Steps steps={t.raw("employers.process.steps")} dark />
      </Section>

      <Section id="request" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Reveal className="mb-10 rounded-[2rem] bg-brand-600 p-8 text-white">
              <Handshake className="size-10" strokeWidth={1.5} />
              <h2 className="mt-5 text-2xl font-extrabold">{t("employers.welcome.title")}</h2>
              <p className="mt-3 text-white/85">{t("employers.welcome.text")}</p>
            </Reveal>
            <ContactDetails />
          </div>
          <div>
            <SectionHeading align="left" title={t("employers.form.title")} subtitle={t("employers.form.subtitle")} />
            <Reveal className="card p-6 sm:p-8">
              <LeadForm variant="employer" />
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
