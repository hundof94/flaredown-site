import { cn } from "@/lib/utils";

export function StatCard({
  value,
  label,
  suffix = "",
  className,
}: {
  value: string | number;
  label: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center", className)}>
      <div className="font-display font-bold text-h2 text-primary leading-none">
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix}
      </div>
      <div className="text-meta text-ink-3 mt-1">{label}</div>
    </div>
  );
}
