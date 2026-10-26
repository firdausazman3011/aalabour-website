import { getTranslations } from "next-intl/server";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { company, mapEmbedUrl, mapLinkUrl } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { LineIcon, TelegramIcon } from "./layout/icons";

export async function ContactDetails() {
  const t = await getTranslations();
  const rows = [
    {
      icon: Phone,
      label: t("contact.phone"),
      body: (
        <>
          {company.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="block font-semibold text-navy-950 hover:text-brand-600">{p.display}</a>
          ))}
          <span className="mt-1 block text-sm text-muted">
            {t("contact.office")}: <a href={`tel:${company.officePhone.tel}`} className="hover:text-brand-600">{company.officePhone.display}</a>
          </span>
        </>
      ),
    },
    {
      icon: Mail,
      label: t("contact.email"),
      body: <a href={`mailto:${company.email}`} className="font-semibold break-all text-navy-950 hover:text-brand-600">{company.email}</a>,
    },
    { icon: MapPin, label: t("contact.address"), body: <span className="text-navy-950">{t("contact.addressValue")}</span> },
    { icon: Clock, label: t("contact.hours"), body: <span className="text-navy-950">{t("contact.hoursValue")}</span> },
  ];

  return (
    <div className="grid gap-4">
      {rows.map(({ icon: Icon, label, body }, i) => (
        <Reveal key={label} delay={i * 0.06} className="flex gap-4 rounded-2xl border border-sand-200 bg-white p-5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
            <div className="mt-1">{body}</div>
          </div>
        </Reveal>
      ))}
      <Reveal delay={0.25} className="grid grid-cols-2 gap-3">
        <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="btn bg-[#229ED9] text-white hover:brightness-110">
          <TelegramIcon className="size-5" /> Telegram
        </a>
        <a href={company.line} target="_blank" rel="noopener noreferrer" className="btn bg-[#06C755] text-white hover:brightness-110">
          <LineIcon className="size-5" /> Line
        </a>
      </Reveal>
    </div>
  );
}

export async function MapEmbed({ className = "" }: { className?: string }) {
  const t = await getTranslations();
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-sand-200 bg-sand-100 shadow-soft ${className}`}>
      <iframe
        title={t("contact.map")}
        src={mapEmbedUrl}
        className="absolute inset-0 size-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={mapLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy-950 shadow-lift hover:bg-sand-100"
      >
        {t("common.openInMaps")} <ExternalLink className="size-4" />
      </a>
    </div>
  );
}
