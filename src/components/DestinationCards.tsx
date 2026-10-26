import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { Reveal } from "./ui/Reveal";
import { SmartImage } from "./ui/SmartImage";
import { StatusBadge } from "./ui/StatusBadge";

export async function DestinationCards() {
  const t = await getTranslations();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {destinations.map((d, i) => (
        <Reveal key={d.key} delay={i * 0.08}>
          <Link
            href={`/destinations#${d.key}`}
            className={`group flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-lift ${
              d.status === "active" ? "border-emerald-200 shadow-soft ring-4 ring-emerald-50" : "border-sand-200"
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
              {d.image ? (
                <SmartImage src={d.image} alt={t(`destinations.${d.key}.name`)} fill sizes="(min-width:1024px) 25vw, 50vw" className={`object-cover transition duration-700 group-hover:scale-105 ${d.status !== "active" ? "grayscale-[40%]" : ""}`} />
              ) : (
                <div className="grid-bg absolute inset-0 bg-gradient-to-br from-navy-700 to-navy-950" />
              )}
              <span className="absolute top-4 left-4 text-4xl drop-shadow">{d.flag}</span>
              {"credit" in d && (
                // Plain text here: the whole card is already a link, and links cannot nest.
                <span className="absolute right-2 bottom-2 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90">{d.credit.text}</span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-extrabold text-navy-950">{t(`destinations.${d.key}.name`)}</h3>
                <ArrowUpRight className="size-5 text-muted transition group-hover:text-brand-600" />
              </div>
              <div className="mt-3">
                <StatusBadge status={d.status} label={t(`status.${d.status}`)} />
              </div>
              <p className="mt-4 line-clamp-3 text-sm text-muted">{t(`destinations.${d.key}.summary`)}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
