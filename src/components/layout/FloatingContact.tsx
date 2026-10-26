"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Phone, X } from "lucide-react";
import { company } from "@/content/site";
import { LineIcon, TelegramIcon } from "./icons";

export function FloatingContact() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  const actions = [
    { href: company.telegram, label: t("chatTelegram"), icon: <TelegramIcon className="size-5" />, className: "bg-[#229ED9]" },
    { href: company.line, label: t("chatLine"), icon: <LineIcon className="size-5" />, className: "bg-[#06C755]" },
    { href: `tel:${company.phones[0].tel}`, label: `${t("callUs")} · ${company.phones[0].display}`, icon: <Phone className="size-5" />, className: "bg-navy-900" },
  ];

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open &&
          actions.map((a, i) => (
            <motion.a
              key={a.href}
              href={a.href}
              target={a.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={{ delay: (actions.length - i - 1) * 0.04 }}
              className="flex items-center gap-3 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-semibold text-navy-950 shadow-lift"
            >
              <span className={`grid size-10 place-items-center rounded-full text-white ${a.className}`}>{a.icon}</span>
              {a.label}
            </motion.a>
          ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t("contactQuick")}
        className="relative grid size-15 place-items-center rounded-full bg-brand-600 text-white shadow-[0_12px_32px_-8px_rgb(208_32_42/0.7)] transition hover:bg-brand-700"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/40 [animation-duration:2.5s]" />}
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </div>
  );
}
