"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { jobKeys } from "@/content/site";
import { cn } from "@/lib/cn";

type Variant = "worker" | "employer" | "contact";
type Status = "idle" | "sending" | "success" | "error";

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

const subjects: Record<Variant, string> = {
  worker: "New worker application",
  employer: "New employer request",
  contact: "New website enquiry",
};

export function LeadForm({ variant, defaultJob }: { variant: Variant; defaultJob?: string }) {
  const t = useTranslations();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.botcheck) return;

    setStatus("sending");
    if (!accessKey) {
      // No key configured yet (local preview / first Vercel deploy): simulate success.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      form.reset();
      return;
    }
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[AA Labour] ${subjects[variant]}`,
          from_name: "AA Labour website",
          form_type: variant,
          page_language: document.documentElement.lang,
          ...data,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const submitLabel =
    variant === "worker" ? t("form.submitWorker") : variant === "employer" ? t("form.submitEmployer") : t("form.submit");
  const industries = t.raw("employers.industries.items") as { name: string }[];

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate={false}>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      {variant === "employer" && (
        <Field label={t("form.company")} className="sm:col-span-2">
          <input name="company" required className="field" autoComplete="organization" />
        </Field>
      )}

      <Field label={t("form.name")}>
        <input name="name" required className="field" autoComplete="name" />
      </Field>
      <Field label={t("form.phone")}>
        <input name="phone" type="tel" required className="field" autoComplete="tel" inputMode="tel" />
      </Field>

      {variant !== "worker" && (
        <Field label={t("form.email")} className={variant === "contact" ? "sm:col-span-2" : undefined}>
          <input name="email" type="email" required className="field" autoComplete="email" />
        </Field>
      )}

      {variant === "worker" && (
        <>
          <Field label={t("form.age")}>
            <input name="age" type="number" min={18} max={45} required className="field" inputMode="numeric" />
          </Field>
          <Field label={t("form.gender")}>
            <select name="gender" required className="field" defaultValue="">
              <option value="" disabled>{t("form.select")}</option>
              <option value="male">{t("form.genderMale")}</option>
              <option value="female">{t("form.genderFemale")}</option>
            </select>
          </Field>
          <Field label={t("form.job")} className="sm:col-span-2">
            <select name="job" required className="field" defaultValue={defaultJob ?? ""}>
              <option value="" disabled>{t("form.select")}</option>
              {jobKeys.map((k) => (
                <option key={k} value={k}>{t(`home.jobs.items.${k}.name`)}</option>
              ))}
            </select>
          </Field>
        </>
      )}

      {variant === "employer" && (
        <>
          <Field label={t("form.country")}>
            <input name="country" required className="field" autoComplete="country-name" />
          </Field>
          <Field label={t("form.industry")}>
            <select name="industry" required className="field" defaultValue="">
              <option value="" disabled>{t("form.select")}</option>
              {industries.map((i) => (
                <option key={i.name} value={i.name}>{i.name}</option>
              ))}
            </select>
          </Field>
          <Field label={t("form.quantity")} className="sm:col-span-2">
            <input name="quantity" type="number" min={1} required className="field" inputMode="numeric" />
          </Field>
        </>
      )}

      {variant === "contact" && (
        <Field label={t("form.subject")} className="sm:col-span-2">
          <input name="subject_line" required className="field" />
        </Field>
      )}

      <Field
        label={variant === "contact" ? t("form.message") : `${t("form.message")} (${t("form.optional")})`}
        className="sm:col-span-2"
      >
        <textarea name="message" rows={4} required={variant === "contact"} className="field resize-y" />
      </Field>

      <div className="sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn-primary w-full !py-4 text-base disabled:opacity-70">
          {status === "sending" ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-4" />}
          {status === "sending" ? t("form.sending") : submitLabel}
        </button>
        <p className="mt-3 text-center text-xs text-muted">{t("form.privacy")}</p>
        {!accessKey && <p className="mt-1 text-center text-xs text-amber-700">{t("form.preview")}</p>}
      </div>

      <AnimatePresence>
        {(status === "success" || status === "error") && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn(
              "flex items-start gap-3 rounded-2xl p-4 text-sm sm:col-span-2",
              status === "success" ? "bg-emerald-50 text-success" : "bg-red-50 text-brand-700",
            )}
          >
            {status === "success" ? <CheckCircle2 className="size-5 shrink-0" /> : <TriangleAlert className="size-5 shrink-0" />}
            {status === "success" ? t("form.success") : t("form.error")}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={cn("grid gap-1.5", className)}>
      <span className="text-sm font-semibold text-navy-900">{label}</span>
      {children}
    </label>
  );
}
