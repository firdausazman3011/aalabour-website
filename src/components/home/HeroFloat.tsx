"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Banknote, ShieldCheck } from "lucide-react";

// Sits below the hero photo rather than over it, so nobody in the team photo is covered.
export function HeroFloat() {
  const t = useTranslations("home.stats");
  const reduce = useReducedMotion();
  const float = (d: number) => (reduce ? {} : { y: [0, -6, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: d } });

  const cards = [
    { value: "RM 1,800", label: t("salary"), icon: Banknote, tone: "bg-emerald-50 text-success" },
    { value: "100%", label: t("loan"), icon: ShieldCheck, tone: "bg-brand-50 text-brand-600" },
  ];

  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4">
      {cards.map(({ value, label, icon: Icon, tone }, i) => (
        <motion.div key={value} animate={float(i * 1.2)} className="flex items-center gap-3 rounded-2xl bg-white p-3 text-navy-950 shadow-lift sm:p-4">
          <span className={`grid size-10 shrink-0 place-items-center rounded-xl sm:size-11 ${tone}`}>
            <Icon className="size-5 sm:size-6" />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-extrabold sm:text-xl">{value}</span>
            <span className="block text-xs leading-snug text-muted">{label}</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}
