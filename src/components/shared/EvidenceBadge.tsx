import { cn } from "@/lib/utils";
import type { EvidenceLevel } from "@/lib/types";

const STYLES: Record<EvidenceLevel, string> = {
  High: "bg-secondary/15 text-secondary border border-secondary/25",
  Moderate: "bg-primary/15 text-primary border border-primary/25",
  Low: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  Anecdotal: "bg-ink/8 text-ink-3 border border-ink/15",
};

export function EvidenceBadge({
  level,
  className,
}: {
  level: EvidenceLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-pill text-xs font-semibold",
        STYLES[level],
        className
      )}
    >
      {level === "High" && "●"} {level} evidence
    </span>
  );
}
