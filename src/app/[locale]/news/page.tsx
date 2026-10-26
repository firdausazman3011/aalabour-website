import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Check, Megaphone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CtaBand } from "@/components/CtaBand";
import { newsImages } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { pageMeta, type PageProps } from "@/lib/meta";

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  return pageMeta(locale, "/news", "nav.news", "news.hero.subtitle");
}

type NewsItem = { title: string; summary: string; points: string[]; note: string };

export default async function NewsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const items = t.raw("news.items") as NewsItem[];

  return (
    <>
      <PageHero eyebrow={t("news.hero.eyebrow")} title={t("news.hero.title")} subtitle={t("news.hero.subtitle")} />
      <Section>
        <div className="grid gap-8">
          {items.map((n, i) => (
            <Reveal key={n.title} className="card grid overflow-hidden md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-72 bg-navy-900">
                <SmartImage src={newsImages[i]} alt={n.title} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><Megaphone className="size-5" /></span>
                  <StatusBadge status="active" label={`🇲🇾 ${t("status.active")}`} />
                </div>
                <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-navy-950">{n.title}</h2>
                <p className="mt-2 text-muted">{n.summary}</p>
                <ul className="mt-6 grid gap-2.5">
                  {n.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-navy-950">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={3} /> {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">{n.note}</p>
                <Link href="/workers#apply" className="btn-primary mt-6">
                  {t("news.apply")} <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
