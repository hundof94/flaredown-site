import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { EvidenceBadge } from "./EvidenceBadge";
import { cn } from "@/lib/utils";
import type { Study } from "@/lib/types";

export function StudyRow({
  study,
  className,
}: {
  study: Study;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-start gap-3 py-4 border-b border-ink/8 last:border-0",
        className
      )}
    >
      <div className="sm:w-16 text-center flex-shrink-0">
        <span className="text-xs font-bold text-ink-3 block">{study.year}</span>
        {study.isNew && (
          <span className="inline-block mt-1 px-1.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded">
            NEW
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h4 className="font-semibold text-ink text-sm leading-snug">{study.title}</h4>
        </div>
        <p className="text-xs text-ink-3 mb-2 italic">{study.journal}</p>
        <p className="text-sm text-ink-2 leading-relaxed">{study.summary}</p>
      </div>
      <div className="flex sm:flex-col items-start gap-2 sm:w-32 flex-shrink-0">
        <EvidenceBadge level={study.evidenceLevel} />
        <Link
          href={study.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-secondary hover:text-secondary-dark font-medium mt-auto"
        >
          View study <ExternalLink size={11} />
        </Link>
      </div>
    </div>
  );
}
