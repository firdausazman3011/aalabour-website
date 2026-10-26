"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";
import { Banknote, ShieldCheck } from "lucide-react";

export function HeroFloat() {
  const t = useTranslations("home.stats");
  const reduce = useReducedMotion();
  const float = (d: number) => (reduce ? {} : { y: [0, -8, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay: d } });

  return (
    <>
      <motion.div animate={float(0)} className="absolute -bottom-6 left-2 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 text-navy-950 shadow-lift sm:-left-6">
        <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-success">
          <Banknote className="size-6" />
        </span>
        <span>
          <span className="block text-xl font-extrabold">RM 1,800</span>
          <span className="block max-w-36 text-xs leading-snug text-muted">{t("salary")}</span>
        </span>
      </motion.div>
      <motion.div animate={float(1.2)} className="absolute -top-5 right-2 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 text-navy-950 shadow-lift sm:-right-3">
        <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <ShieldCheck className="size-6" />
        </span>
        <span>
          <span className="block text-xl font-extrabold">100%</span>
          <span className="block max-w-36 text-xs leading-snug text-muted">{t("loan")}</span>
        </span>
      </motion.div>
    </>
  );
}
