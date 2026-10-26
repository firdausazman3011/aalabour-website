import { getTranslations } from "next-intl/server";
import { Section, SectionHeading } from "../ui/Section";
import { Steps } from "../Steps";

export async function Process() {
  const t = await getTranslations("home.process");
  return (
    <Section tone="dark" className="relative overflow-hidden">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} dark />
      <Steps steps={t.raw("steps")} dark />
    </Section>
  );
}
