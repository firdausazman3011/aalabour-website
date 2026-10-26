import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("nav");
  return (
    <section className="grid min-h-[70vh] place-items-center bg-navy-950 px-4 pt-24 text-center text-white">
      <div>
        <p className="text-8xl font-extrabold text-brand-600">404</p>
        <Link href="/" className="btn-light mt-8">{t("home")}</Link>
      </div>
    </section>
  );
}
