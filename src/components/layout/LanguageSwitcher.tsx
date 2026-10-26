"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LanguageSwitcher({ light = false, full = false }: { light?: boolean; full?: boolean }) {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const select = (next: Locale) => {
    setOpen(false);
    startTransition(() => router.replace(pathname, { locale: next, scroll: false }));
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition",
          light ? "text-white hover:bg-white/10" : "text-navy-900 hover:bg-navy-50",
          full && "w-full justify-between border border-sand-200 bg-white px-4 py-3",
          pending && "opacity-60",
        )}
      >
        <span className="flex items-center gap-2">
          <Globe className="size-4" aria-hidden />
          {full ? localeNames[locale].label : localeNames[locale].short}
        </span>
        <ChevronDown className={cn("size-4 transition", open && "rotate-180")} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 mt-2 min-w-48 overflow-hidden rounded-2xl border border-sand-200 bg-white p-1.5 shadow-lift",
              full ? "inset-x-0" : "right-0",
            )}
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === locale}
                  lang={l}
                  onClick={() => select(l)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-left text-sm text-navy-900 transition hover:bg-sand-100",
                    l === locale && "bg-navy-50 font-semibold",
                  )}
                >
                  {localeNames[l].label}
                  {l === locale && <Check className="size-4 text-brand-600" aria-hidden />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
