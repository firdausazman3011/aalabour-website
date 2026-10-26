import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CtaBand } from "@/components/CtaBand";
import { destinations } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/destinations", "destinations.hero.title", "destinations.hero.subtitle");
}

const factKeys = ["capital", "population", "language", "currency", "timezone", "salary"] as const;

export default async function DestinationsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageHero eyebrow={t("destinations.hero.eyebrow")} title={t("destinations.hero.title")} subtitle={t("destinations.hero.subtitle")} />

      <div className="sticky top-[72px] z-30 border-b border-sand-200 bg-white/90 backdrop-blur">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          {destinations.map((d) => (
            <a key={d.key} href={`#${d.key}`} className="shrink-0 rounded-full border border-sand-200 px-4 py-2 text-sm font-semibold text-navy-900 transition hover:bg-navy-50">
              {d.flag} {t(`destinations.${d.key}.name`)}
            </a>
          ))}
        </div>
      </div>

      {destinations.map((d, idx) => {
        const base = `destinations.${d.key}`;
        const full = d.key !== "singapore";
        return (
          <Section key={d.key} id={d.key} tone={idx % 2 ? "default" : "white"} className="scroll-mt-32">
            <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-5xl">{d.flag}</span>
                  <StatusBadge status={d.status} label={t(`status.${d.status}`)} />
                </div>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">{t(`${base}.name`)}</h2>
                <p className="mt-4 text-lg text-pretty text-muted">{t(`${base}.summary`)}</p>
                {full && (
                  <dl className="mt-8 grid grid-cols-2 gap-3">
                    {factKeys.map((k) => (
                      <div key={k} className={`rounded-2xl border border-sand-200 bg-sand-50 p-4 ${k === "salary" || k === "language" ? "col-span-2" : ""}`}>
                        <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{t(`destinations.labels.${k}`)}</dt>
                        <dd className="mt-1 font-semibold text-navy-950">{t(`${base}.${k}`)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {d.status === "active" ? (
                  <Link href="/workers#apply" className="btn-primary mt-8">
                    {t("nav.applyNow")} <ArrowRight className="size-4" />
                  </Link>
                ) : null}
              </Reveal>
              {full ? (
                <Reveal delay={0.1} className="grid gap-6">
                  {d.image && (
                    <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-navy-900 shadow-lift">
                      <SmartImage src={d.image} alt={t(`${base}.name`)} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                    </div>
                  )}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {(["sectors", "why"] as const).map((k) => (
                      <div key={k} className="card p-6">
                        <h3 className="font-bold text-navy-950">{t(`destinations.labels.${k}`)}</h3>
                        <ul className="mt-4 grid gap-2.5">
                          {(t.raw(`${base}.${k}`) as string[]).map((s) => (
                            <li key={s} className="flex items-start gap-2.5 text-sm text-muted">
                              <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} /> {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ) : (
                <Reveal delay={0.1} className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-navy-900 shadow-lift">
                  {d.image && <SmartImage src={d.image} alt={t(`${base}.name`)} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />}
                  {"credit" in d && (
              <a href={d.credit.href} target="_blank" rel="noopener noreferrer" className="absolute right-2 bottom-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 hover:bg-black/70">
                {d.credit.text}
              </a>
              )}
                </Reveal>
              )}
            </div>
          </Section>
        );
      })}

      <CtaBand />
    </>
  );
}
