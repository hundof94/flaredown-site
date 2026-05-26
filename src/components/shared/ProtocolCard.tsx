import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { EvidenceBadge } from "./EvidenceBadge";
import { cn } from "@/lib/utils";
import type { Protocol } from "@/lib/types";

export function ProtocolCard({
  protocol,
  className,
}: {
  protocol: Protocol;
  className?: string;
}) {
  return (
    <Link
      href={`/protocols/${protocol.slug}`}
      className={cn(
        "group block bg-surface rounded-card p-6 border border-ink/8 hover:border-primary/30 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl" role="img" aria-label={protocol.title}>
          {protocol.emoji}
        </span>
        <EvidenceBadge level={protocol.evidenceLevel} />
      </div>

      <div className="mb-1">
        <span className="text-xs font-semibold text-ink-3 uppercase tracking-wide">
          {protocol.category}
        </span>
      </div>

      <h3 className="font-display text-h3 text-ink mb-2 leading-snug group-hover:text-primary transition-colors">
        {protocol.title}
      </h3>

      <p className="text-meta text-ink-2 leading-relaxed mb-4 line-clamp-3">
        {protocol.summary}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-ink-3">
          <Users size={13} />
          <span className="text-xs">{protocol.reportCount.toLocaleString()} reports</span>
        </div>
        <div className="flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          View protocol <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  );
}
