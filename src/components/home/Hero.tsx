import { getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, Briefcase, Building2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SmartImage } from "../ui/SmartImage";
import { HeroFloat } from "./HeroFloat";

export async function Hero() {
  const t = await getTranslations("home.hero");
  const c = await getTranslations("common");

  return (
    <section className="relative overflow-hidden bg-navy-950 pt-32 pb-28 text-white sm:pt-40 lg:pb-36">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_30%_20%,black,transparent_70%)]" />
      <div className="absolute -top-32 -left-32 size-[480px] rounded-full bg-navy-500/30 blur-[120px]" />
      <div className="absolute right-0 bottom-0 size-[520px] rounded-full bg-brand-600/20 blur-[140px]" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="animate-fade-up">
            <Link href="/destinations" className="group mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pr-4 pl-1.5 text-sm backdrop-blur transition hover:bg-white/10">
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                🇲🇾
              </span>
              {t("badge")}
              <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
            <p className="eyebrow mb-5 text-brand-500">{t("eyebrow")}</p>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {t("title")}
            </h1>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.18s" }}>
            <p className="mt-6 max-w-xl text-lg text-pretty text-navy-200">{t("subtitle")}</p>
          </div>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "0.26s" }}>
            <Link href="/workers" className="btn-primary !py-4 text-base">
              <Briefcase className="size-5" /> {t("ctaWorker")}
            </Link>
            <Link href="/employers" className="btn-light !py-4 text-base">
              <Building2 className="size-5" /> {t("ctaEmployer")}
            </Link>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: "0.34s" }}>
            <p className="mt-8 flex items-center gap-2 text-sm text-navy-300">
              <BadgeCheck className="size-5 text-emerald-400" /> {c("licensed")}
            </p>
          </div>
        </div>

        <div className="animate-fade-up relative" style={{ animationDelay: "0.15s" }}>
          <div className="relative aspect-[4/3.2] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
            <SmartImage src="/images/team-office.jpg" alt="AA Labour team at the Phnom Penh head office" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent" />
          </div>
          <HeroFloat />
        </div>
      </div>
    </section>
  );
}
