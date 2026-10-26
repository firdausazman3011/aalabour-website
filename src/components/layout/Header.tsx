"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { company } from "@/content/site";
import { cn } from "@/lib/cn";
import { SmartImage } from "../ui/SmartImage";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "./navItems";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        solid ? "border-b border-sand-200/80 bg-white/90 shadow-soft backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={company.name}>
          <span className="relative grid size-11 place-items-center overflow-hidden rounded-full bg-white shadow-soft">
            <SmartImage src="/images/logo.png" alt="" width={44} height={44} className="size-11 object-contain" priority />
          </span>
          <span className={cn("hidden leading-tight sm:block lg:hidden xl:block", solid ? "text-navy-950" : "text-white")}>
            <span className="block text-base font-extrabold tracking-tight">AA Labour</span>
            <span className={cn("block text-[11px] font-medium", solid ? "text-muted" : "text-navy-200")}>Cambodia Supply Co., Ltd.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition",
                  solid ? "text-navy-900 hover:bg-navy-50" : "text-white/90 hover:bg-white/10 hover:text-white",
                )}
              >
                {t(item.key)}
                {active && (
                  <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher light={!solid} />
          <Link href="/workers#apply" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex lg:hidden xl:inline-flex">
            {t("applyNow")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? t("close") : t("menu")}
            className={cn("grid size-11 place-items-center rounded-full transition lg:hidden", solid ? "text-navy-900 hover:bg-navy-50" : "text-white hover:bg-white/10")}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-sand-200 bg-white lg:hidden"
          >
            <nav className="container-x flex max-h-[calc(100dvh-72px)] flex-col gap-1 overflow-y-auto py-4" aria-label="Mobile">
              {[{ href: "/", key: "home" } as const, ...navItems, { href: "/certificates", key: "certificates" } as const].map((item, i) => (
                <motion.div key={item.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-lg font-semibold text-navy-950 transition hover:bg-sand-100",
                      pathname === item.href && "bg-navy-50 text-brand-600",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 grid gap-3 border-t border-sand-200 pt-4">
                <LanguageSwitcher full />
                <Link href="/workers#apply" className="btn-primary">{t("applyNow")}</Link>
                <a href={`tel:${company.phones[0].tel}`} className="btn-ghost">
                  <Phone className="size-4" /> {company.phones[0].display}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
