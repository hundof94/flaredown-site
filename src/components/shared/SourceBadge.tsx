import { cn } from "@/lib/utils";
import type { SourceType } from "@/lib/types";

const CONFIG: Record<SourceType, { label: string; className: string }> = {
  reddit: {
    label: "Reddit",
    className: "bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20",
  },
  x: {
    label: "X",
    className: "bg-black/8 text-ink border border-ink/15",
  },
  study: {
    label: "Study",
    className: "bg-secondary/10 text-secondary border border-secondary/20",
  },
  forum: {
    label: "Forum",
    className: "bg-amber-100 text-amber-700 border border-amber-200",
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
