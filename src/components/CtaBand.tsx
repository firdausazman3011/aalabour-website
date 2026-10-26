import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { company } from "@/content/site";
import { Reveal } from "./ui/Reveal";
import { LineIcon, TelegramIcon } from "./layout/icons";

export async function CtaBand() {
  const t = await getTranslations();
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-brand-600 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="absolute -bottom-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-navy-950/30 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">{t("home.cta.title")}</h2>
            <p className="mt-5 text-lg text-pretty text-white/85">{t("home.cta.subtitle")}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="btn bg-white !py-4 text-base text-navy-950 hover:bg-sand-100">
                <TelegramIcon className="size-5 text-[#229ED9]" /> {t("common.chatTelegram")}
              </a>
              <a href={company.line} target="_blank" rel="noopener noreferrer" className="btn-light !py-4 text-base">
                <LineIcon className="size-5" /> {t("common.chatLine")}
              </a>
              <a href={`tel:${company.phones[0].tel}`} className="btn-light !py-4 text-base">
                <Phone className="size-5" /> {company.phones[0].display}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
