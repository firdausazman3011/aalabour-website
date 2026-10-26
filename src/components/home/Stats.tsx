import { getLocale, getTranslations } from "next-intl/server";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";

export async function Stats() {
  const t = await getTranslations("home.stats");
  const locale = await getLocale();
  const items = [
    { value: <span>121/19</span>, label: t("license") },
    { value: <Counter to={1800} prefix="RM " locale={locale} />, label: t("salary") },
    { value: <Counter to={100} suffix="%" locale={locale} />, label: t("loan") },
    { value: <Counter to={160000} suffix="+" locale={locale} />, label: t("visitors") },
  ];
  return (
    <div className="container-x relative z-10 -mt-14">
      <Reveal className="grid grid-cols-2 overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-lift lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={i} className="border-sand-200 p-6 text-center even:border-l sm:p-8 lg:border-l lg:first:border-l-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0">
            <p className="text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">{it.value}</p>
            <p className="mt-2 text-xs text-muted sm:text-sm">{it.label}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
