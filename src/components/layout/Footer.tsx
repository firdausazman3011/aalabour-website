import { getTranslations } from "next-intl/server";
import { SmartImage } from "../ui/SmartImage";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { company } from "@/content/site";
import { navItems } from "./navItems";
import { LineIcon, TelegramIcon } from "./icons";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <div className="grid-bg absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center overflow-hidden rounded-full bg-white">
              <SmartImage src="/images/logo.png" alt="" width={48} height={48} className="size-12 object-contain" />
            </span>
            <div className="leading-tight text-white">
              <p className="text-lg font-extrabold">AA Labour</p>
              <p className="text-xs text-navy-300">Cambodia Supply Co., Ltd.</p>
            </div>
          </div>
          <p className="mt-6 max-w-sm text-pretty">{t("footer.tagline")}</p>
          <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white">
            {t("common.licensed")}
          </p>
          <div className="mt-6 flex gap-3">
            <a href={company.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="grid size-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-[#229ED9]">
              <TelegramIcon className="size-5" />
            </a>
            <a href={company.line} target="_blank" rel="noopener noreferrer" aria-label="Line" className="grid size-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-[#06C755]">
              <LineIcon className="size-5" />
            </a>
            <a href={`mailto:${company.email}`} aria-label={t("common.emailUs")} className="grid size-11 place-items-center rounded-full bg-white/5 text-white transition hover:bg-brand-600">
              <Mail className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="mb-5 text-sm font-bold text-white">{t("footer.quickLinks")}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm lg:grid-cols-1">
            {[...navItems, { href: "/certificates", key: "certificates" } as const].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-sm font-bold text-white">{t("footer.contact")}</p>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>
                {company.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block transition hover:text-white">{p.display}</a>
                ))}
                <a href={`tel:${company.officePhone.tel}`} className="block transition hover:text-white">{company.officePhone.display}</a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <a href={`mailto:${company.email}`} className="break-all transition hover:text-white">{company.email}</a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>{t("contact.addressValue")}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" />
              <span>{t("contact.hoursValue")}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-navy-300 sm:flex-row sm:justify-between">
          <p>© {year} {company.name} {t("footer.rights")}</p>
          <p>{t("common.licensed")}</p>
        </div>
      </div>
    </footer>
  );
}
