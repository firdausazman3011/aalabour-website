import { getTranslations } from "next-intl/server";
import { jobKeys } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

export async function Jobs() {
  const t = await getTranslations("home.jobs");
  return (
    <Section tone="white">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {jobKeys.map((key, i) => (
          <Reveal key={key} delay={(i % 4) * 0.06}>
            <Link href="/workers#apply" className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-navy-900">
              <SmartImage
                src={`/images/jobs/${key}.png`}
                alt={t(`items.${key}.name`)}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <h3 className="text-base font-extrabold sm:text-xl">{t(`items.${key}.name`)}</h3>
                <p className="mt-1 line-clamp-3 text-xs text-navy-100/90 sm:text-sm">{t(`items.${key}.desc`)}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
