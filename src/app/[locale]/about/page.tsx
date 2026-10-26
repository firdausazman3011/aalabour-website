import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Eye, FileCheck2, GraduationCap, HandHeart, Plane, Target, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/CtaBand";
import { Link } from "@/i18n/navigation";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/about", "nav.about", "about.hero.subtitle");
}

const serviceIcons = [Plane, GraduationCap, FileCheck2, Users];

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const c = await getTranslations("common");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="space-y-5 text-lg text-muted">
            {(t.raw("intro") as string[]).map((p) => (
              <p key={p} className="text-pretty">{p}</p>
            ))}
            <Link href="/certificates" className="btn-ghost mt-4">
              <FileCheck2 className="size-4" /> {c("licensed")} <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-navy-900 shadow-lift">
                <SmartImage src="/images/team-office.jpg" alt={t("team.caption")} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 text-sm text-muted">
                <span className="font-semibold text-navy-950">{t("team.title")}.</span> {t("team.caption")}
              </figcaption>
            </figure>
          </Reveal>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-6">
          {["about-2.png", "about-3.png", "about-4.png"].map((file, i) => (
            <Reveal key={file} delay={i * 0.08} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 sm:rounded-3xl">
              <SmartImage src={`/images/about/${file}`} alt={t("team.caption")} fill sizes="(min-width:1024px) 30vw, 33vw" className="object-cover" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {([["vision", Eye], ["purpose", Target]] as const).map(([key, Icon], i) => (
            <Reveal key={key} delay={i * 0.1} className={`rounded-[2rem] p-8 sm:p-10 ${i === 0 ? "bg-navy-900 text-white" : "card"}`}>
              <Icon className={`size-10 ${i === 0 ? "text-brand-500" : "text-brand-600"}`} strokeWidth={1.5} />
              <h2 className="mt-6 text-2xl font-extrabold">{t(`${key}.title`)}</h2>
              <p className={`mt-4 text-lg text-pretty ${i === 0 ? "text-navy-200" : "text-muted"}`}>{t(`${key}.text`)}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading align="left" title={t("mission.title")} />
          <ol className="grid gap-4">
            {(t.raw("mission.items") as string[]).map((m, i) => (
              <Reveal as="li" key={m} delay={i * 0.05} className="flex gap-5 rounded-2xl border border-sand-200 bg-sand-50 p-5">
                <span className="text-2xl font-extrabold text-brand-600/40">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-navy-950">{m}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section>
        <SectionHeading title={t("services.title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw("services.items") as { title: string; desc: string }[]).map((s, i) => {
            const Icon = serviceIcons[i];
            return (
              <Reveal key={s.title} delay={i * 0.06} className="card p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600"><Icon className="size-6" /></span>
                <h3 className="mt-6 text-lg font-bold text-navy-950">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="dark">
        <SectionHeading title={t("values.title")} dark />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw("values.items") as { title: string }[]).map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-7">
              <HandHeart className="size-8 shrink-0 text-brand-500" strokeWidth={1.5} />
              <h3 className="text-lg font-bold">{v.title}</h3>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
