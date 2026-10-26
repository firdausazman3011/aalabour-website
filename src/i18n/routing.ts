import { defineRouting } from "next-intl/routing";

export const locales = ["en", "km", "ms", "ja", "zh"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, { label: string; short: string }> = {
  en: { label: "English", short: "EN" },
  km: { label: "ភាសាខ្មែរ", short: "ខ្មែរ" },
  ms: { label: "Bahasa Melayu", short: "MS" },
  ja: { label: "日本語", short: "日本" },
  zh: { label: "中文", short: "中文" },
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});
