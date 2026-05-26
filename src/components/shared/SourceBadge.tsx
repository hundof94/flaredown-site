import { cn } from "@/lib/utils";
import type { SourceType } from "@/lib/types";

const CONFIG: Record<SourceType, { label: string; className: string }> = {
  reddit: {
    label: "Reddit",
    className: "bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20",
  },
  x: {
    label: "X",
    className: "bg-ink/10 text-ink border border-ink/20",
  },
  study: {
    label: "Study",
    className: "bg-secondary/15 text-secondary border border-secondary/25",
  },
  forum: {
    label: "Forum",
    className: "bg-amber-500/15 text-amber-400 border border-amber-500/25",
  },
};

export function SourceBadge({
  source,
  className,
}: {
  source: SourceType;
  className?: string;
}) {
  const config = CONFIG[source];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-pill text-xs font-semibold",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
