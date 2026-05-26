import Link from "next/link";
import { ThumbsUp, ExternalLink } from "lucide-react";
import { SourceBadge } from "./SourceBadge";
import { cn } from "@/lib/utils";
import type { FeedItem } from "@/lib/types";

export function FeedCard({
  item,
  className,
}: {
  item: FeedItem;
  className?: string;
}) {
  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block bg-surface rounded-card p-4 border border-ink/8 animate-slide-up hover:border-primary/30 hover:shadow-sm transition-all duration-200",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <SourceBadge source={item.source} />
        <span className="text-xs text-ink-3 font-medium">{item.author}</span>
        <span className="ml-auto flex items-center gap-1 text-xs text-ink-3">
          {item.timestamp}
          <ExternalLink size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
        </span>
      </div>
      <p className="text-sm text-ink-2 leading-relaxed">{item.text}</p>
      <div className="flex items-center gap-1.5 mt-3 text-ink-3">
        <ThumbsUp size={13} />
        <span className="text-xs">{item.engagementCount.toLocaleString()}</span>
      </div>
    </Link>
  );
}
