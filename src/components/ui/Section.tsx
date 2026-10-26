import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "white" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "white" && "bg-white",
        tone === "dark" && "bg-navy-950 text-white",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl sm:mb-16", align === "center" && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className={cn("text-3xl font-extrabold tracking-tight text-balance sm:text-4xl", dark ? "text-white" : "text-navy-950")}>
        {title}
      </h2>
      {subtitle && <p className={cn("mt-4 text-lg text-pretty", dark ? "text-navy-200" : "text-muted")}>{subtitle}</p>}
    </Reveal>
  );
}
