import { getTranslations } from "next-intl/server";
import { Quote, UserRound } from "lucide-react";
import { ceoPortrait } from "@/content/site";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

export async function CeoMessage() {
  const t = await getTranslations("home.ceo");
  return (
    <Section tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 hidden rotate-3 rounded-[2.5rem] bg-brand-600/10 sm:block" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-800 to-navy-950 shadow-lift">
            {ceoPortrait ? (
              <SmartImage src={ceoPortrait} alt={t("name")} fill sizes="(min-width:1024px) 35vw, 90vw" className="object-cover object-[42%_center]" />
            ) : (
              <div className="grid-bg flex h-full flex-col items-center justify-center gap-4 text-white/60">
                <UserRound className="size-24" strokeWidth={1} />
                <span className="text-sm">{t("photoPending")}</span>
              </div>
            )}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/95 p-5 backdrop-blur">
              <p className="text-lg font-extrabold text-navy-950">{t("name")}</p>
              <p className="text-sm text-muted">{t("role")}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-4">{t("eyebrow")}</p>
          <Quote className="mb-4 size-12 text-brand-600/20" strokeWidth={1.5} />
          <h2 className="text-3xl font-extrabold tracking-tight text-balance text-navy-950 sm:text-4xl">“{t("title")}”</h2>
          <div className="mt-8 space-y-5 text-lg text-muted">
            {(t.raw("paragraphs") as string[]).map((p) => (
              <p key={p} className="text-pretty">{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
