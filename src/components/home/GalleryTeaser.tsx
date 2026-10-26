import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { SmartImage } from "../ui/SmartImage";

const picks = [
  { src: "/images/gallery/memories-2.jpg", span: "row-span-2" },
  { src: "/images/gallery/cleaning-1.jpg", span: "" },
  { src: "/images/gallery/rubber-1.jpg", span: "" },
  { src: "/images/gallery/management-1.jpg", span: "" },
  { src: "/images/gallery/memories-4.jpg", span: "" },
];

export async function GalleryTeaser() {
  const t = await getTranslations("home.gallery");
  return (
    <Section tone="white">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />
      <div className="grid auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-3">
        {picks.map((p, i) => (
          <Reveal key={p.src} delay={i * 0.06} className={`relative overflow-hidden rounded-3xl bg-navy-900 ${p.span}`}>
            <SmartImage src={p.src} alt="" fill sizes="(min-width:1024px) 33vw, 50vw" className="object-cover transition duration-700 hover:scale-105" />
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/gallery" className="btn-dark">
          {t("cta")} <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
