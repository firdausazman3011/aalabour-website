import { cn } from "@/lib/cn";
import type { DestinationStatus } from "@/content/site";

const styles: Record<DestinationStatus, string> = {
  active: "bg-emerald-50 text-success ring-emerald-200",
  inactive: "bg-slate-100 text-slate-600 ring-slate-200",
  suspended: "bg-amber-50 text-amber-700 ring-amber-200",
  comingSoon: "bg-navy-50 text-navy-700 ring-navy-200",
};

export function StatusBadge({ status, label }: { status: DestinationStatus; label: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1", styles[status])}>
      <span className={cn("size-1.5 rounded-full bg-current", status === "active" && "animate-pulse")} />
      {label}
    </span>
  );
}
