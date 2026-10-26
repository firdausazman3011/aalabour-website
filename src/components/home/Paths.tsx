import { getTranslations } from "next-intl/server";
import { ArrowRight, Check, HardHat, Handshake } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export async function Paths() {
  const t = await getTranslations("home.paths");
  const cards = [
    { key: "worker", href: "/workers", icon: HardHat, dark: false },
    { key: "employer", href: "/employers", icon: Handshake, dark: true },
  ] as const;

  return (
    <Section>
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="grid gap-6 lg:grid-cols-2">
        {cards.map(({ key, href, icon: Icon, dark }, i) => (
          <Reveal key={key} delay={i * 0.1}>
            <Link
              href={href}
              className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1 sm:p-10 ${
                dark ? "bg-navy-900 text-white shadow-lift" : "border border-sand-200 bg-white shadow-soft hover:shadow-lift"
              }`}
            >
              <div className={`absolute -top-20 -right-20 size-64 rounded-full blur-3xl transition group-hover:scale-125 ${dark ? "bg-brand-600/30" : "bg-navy-100"}`} />
              <div className="relative flex items-center gap-4">
                <span className={`grid size-14 place-items-center rounded-2xl ${dark ? "bg-white/10" : "bg-brand-50 text-brand-600"}`}>
                  <Icon className="size-7" />
                </span>
                <span className={`text-sm font-bold ${dark ? "text-brand-500" : "text-brand-600"}`}>{t(`${key}.label`)}</span>
              </div>
              <h3 className="relative mt-8 text-2xl font-extrabold tracking-tight sm:text-3xl">{t(`${key}.title`)}</h3>
              <p className={`relative mt-3 ${dark ? "text-navy-200" : "text-muted"}`}>{t(`${key}.desc`)}</p>
              <ul className="relative mt-8 grid gap-3">
                {(t.raw(`${key}.points`) as string[]).map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${dark ? "bg-emerald-400/15 text-emerald-300" : "bg-emerald-50 text-success"}`}>
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm sm:text-base">{p}</span>
                  </li>
                ))}
              </ul>
              <span className={`relative mt-10 inline-flex items-center gap-2 font-bold ${dark ? "text-white" : "text-navy-950"}`}>
                {t(`${key}.cta`)}
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
