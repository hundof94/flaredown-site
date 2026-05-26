"use client";

import { useState } from "react";
import { ExternalLink, ThumbsUp, RefreshCw } from "lucide-react";
import Link from "next/link";
import { LiveDot } from "@/components/shared/LiveDot";
import { SourceBadge } from "@/components/shared/SourceBadge";
import { FEED_ITEMS } from "@/lib/mock-data";
import type { SourceType } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS: { label: string; value: SourceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Reddit", value: "reddit" },
  { label: "X / Twitter", value: "x" },
  { label: "Research", value: "study" },
  { label: "Forums", value: "forum" },
];

const SOURCE_ACCENT: Record<SourceType, string> = {
  reddit: "border-l-[#FF4500]/40",
  x: "border-l-ink/30",
  study: "border-l-secondary/40",
  forum: "border-l-amber-400/40",
};

export function LiveFeed() {
  const [activeTab, setActiveTab] = useState<SourceType | "all">("all");
  const [visible, setVisible] = useState(6);

  const filtered = activeTab === "all"
    ? FEED_ITEMS
    : FEED_ITEMS.filter((item) => item.source === activeTab);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <LiveDot />
          <h2 className="font-display text-h2 text-ink">Live community signal</h2>
        </div>
        <button
          onClick={() => setVisible(6)}
          className="hidden sm:flex items-center gap-1.5 text-xs text-ink-3 hover:text-primary transition-colors"
          title="Refresh feed"
        >
          <RefreshCw size={13} />
          Refresh
        </button>
      </div>
      {/* Placeholder notice */}
      <p className="text-xs text-ink-3 mb-6 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 inline-block">
        ⚠️ Sample content only — links open the source community, not specific posts. Real-time scraping connects in Phase 2.
      </p>

      {/* Source filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8 border-b border-ink/8 pb-4">
        {TABS.map((tab) => {
          const count = tab.value === "all"
            ? FEED_ITEMS.length
            : FEED_ITEMS.filter((i) => i.source === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => { setActiveTab(tab.value); setVisible(6); }}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200",
                activeTab === tab.value
                  ? "bg-ink text-white shadow-sm"
                  : "bg-surface text-ink-2 border border-ink/15 hover:border-ink/30 hover:text-ink"
              )}
            >
              {tab.label}
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded-full",
                activeTab === tab.value ? "bg-white/20 text-white" : "bg-ink/8 text-ink-3"
              )}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feed grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-stagger">
        {shown.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group flex flex-col bg-surface rounded-card p-5 border border-ink/8 border-l-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200",
              SOURCE_ACCENT[item.source]
            )}
          >
            {/* Card header */}
            <div className="flex items-center gap-2 mb-3">
              <SourceBadge source={item.source} />
              <span className="text-xs font-semibold text-ink-2 truncate">{item.author}</span>
              <span className="ml-auto flex items-center gap-1 text-xs text-ink-3 flex-shrink-0">
                {item.timestamp}
                <ExternalLink
                  size={11}
                  className="opacity-0 group-hover:opacity-70 transition-opacity"
                />
              </span>
            </div>

            {/* Text */}
            <p className="text-sm text-ink-2 leading-relaxed flex-1">
              {item.text}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink/6">
              <div className="flex items-center gap-1.5 text-ink-3">
                <ThumbsUp size={12} />
                <span className="text-xs">{item.engagementCount.toLocaleString()}</span>
              </div>
              <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                View original <ExternalLink size={10} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setVisible((v) => v + 6)}
            className="px-6 py-2.5 border border-ink/15 rounded-pill text-sm text-ink-2 font-medium hover:border-primary/30 hover:text-primary transition-colors"
          >
            Load more ({filtered.length - visible} remaining)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-ink-3">
          <p className="text-h3 font-display mb-2">No posts yet</p>
          <p className="text-meta">Check back soon</p>
        </div>
      )}
    </section>
  );
}
