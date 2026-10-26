"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gallery, galleryCategories, type GalleryCategory } from "@/content/site";
import { cn } from "@/lib/cn";
import { SmartImage } from "./ui/SmartImage";

export function GalleryGrid() {
  const t = useTranslations("gallery.categories");
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const items = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);

  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, step]);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {(["all", ...galleryCategories] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-semibold transition",
              filter === c ? "text-white" : "bg-white text-navy-900 ring-1 ring-sand-200 hover:bg-sand-100",
            )}
          >
            {filter === c && <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-navy-950" />}
            <span className="relative">{t(c)}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        <AnimatePresence mode="popLayout">
          {items.map((g, i) => (
            <motion.button
              layout
              key={g.src}
              type="button"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={() => setIndex(i)}
              className={cn(
                "group relative mb-3 block w-full overflow-hidden rounded-2xl bg-navy-900 sm:mb-4",
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-square",
              )}
              aria-label={t(g.category)}
            >
              <SmartImage src={g.src} alt={t(g.category)} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-2 bottom-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-950 opacity-0 transition group-hover:opacity-100">
                {t(g.category)}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {index !== null && items[index] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur"
            onClick={() => setIndex(null)}
          >
            <motion.div
              key={items[index].src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage src={items[index].src} alt={t(items[index].category)} fill sizes="100vw" className="object-contain" />
            </motion.div>
            <button type="button" aria-label="Close" onClick={() => setIndex(null)} className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="size-6" />
            </button>
            <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6">
              <ChevronRight className="size-6" />
            </button>
            <p className="absolute bottom-6 text-sm text-white/70">{index + 1} / {items.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
