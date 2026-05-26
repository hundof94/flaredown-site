"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink, ThumbsUp, RefreshCw, AlertCircle } from "lucide-react";
import Link from "next/link";
import { LiveDot } from "@/components/shared/LiveDot";
import { SourceBadge } from "@/components/shared/SourceBadge";
import { FeedGridSkeleton } from "@/components/shared/FeedSkeleton";
import type { FeedItem, SourceType } from "@/lib/types";
import { cn } from "@/lib/utils";

const TABS: { label: string; value: SourceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Reddit", value: "reddit" },
  { label: "X / Twitter", value: "x" },
  { label: "Research", value: "study" },
  { label: "Forums", value: "forum" },
];

const SOURCE_ACCENT: Record<SourceType, string> = {
  reddit: "border-l-[#FF4500]/50",
  x: "border-l-ink/30",
  study: "border-l-secondary/50",
  forum: "border-l-amber-400/50",
};

export function LiveFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SourceType | "all">("all");
  const [visible, setVisible] = useState(6);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/feed", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: FeedItem[] = await res.json();
      setItems(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Feed fetch error:", err);
      setError("Could not load live feed. Showing cached content.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchFeed();
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchFeed(true), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchFeed]);

  const filtered =
    activeTab === "all" ? items : items.filter((i) => i.source === activeTab);
  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const countFor = (tab: SourceType | "all") =>
    tab === "all" ? items.length : items.filter((i) => i.source === tab).length;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <LiveDot />
          <h2 className="font-display text-h2 text-ink">Live community signal</h2>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <span className="hidden sm:block text-xs text-ink-3">
              Updated {lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
          <button
            onClick={() => { fetchFeed(true); setVisible(6); }}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-xs text-ink-3 hover:text-primary transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-4">
          <AlertCircle size={13} />
          {error}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8 border-b border-ink/8 pb-4">
        {TABS.map((tab) => {
          const count = countFor(tab.value);
          return (
            <button
              key={tab.value}
              onClick={() => { setActiveTab(tab.value); setVisible(6); }}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-pill text-sm font-medium transition-all duration-200",
                activeTab === tab.value
                  ? "bg-surface-2 text-ink border border-ink/20"
                  : "bg-surface text-ink-2 border border-ink/10 hover:border-ink/20 hover:text-ink"
              )}
            >
              {tab.label}
              {!loading && (
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  activeTab === tab.value ? "bg-ink/15 text-ink-2" : "bg-ink/8 text-ink-3"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feed grid */}
      {loading ? (
        <FeedGridSkeleton count={6} />
      ) : shown.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 animate-stagger">
            {shown.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex flex-col bg-surface rounded-card p-5 border border-ink/8 border-l-4 hover:shadow-lg hover:border-ink/20 hover:-translate-y-0.5 transition-all duration-200",
                  SOURCE_ACCENT[item.source]
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <SourceBadge source={item.source} />
                  <span className="text-xs font-semibold text-ink-2 truncate">
                    {item.author}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs text-ink-3 flex-shrink-0">
                    {item.timestamp}
                    <ExternalLink
                      size={11}
                      className="opacity-0 group-hover:opacity-70 transition-opacity"
                    />
                  </span>
                </div>

                <p className="text-sm text-ink-2 leading-relaxed flex-1 line-clamp-4">
                  {item.text}
                </p>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink/6">
                  {item.engagementCount > 0 ? (
                    <div className="flex items-center gap-1.5 text-ink-3">
                      <ThumbsUp size={12} />
                      <span className="text-xs">{item.engagementCount.toLocaleString()}</span>
                    </div>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View original <ExternalLink size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

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
        </>
      ) : (
        <div className="text-center py-20 text-ink-3">
          <p className="font-display text-h3 mb-2">No posts found</p>
          <p className="text-meta">
            {activeTab !== "all" ? "Try switching to All" : "Check back soon"}
          </p>
        </div>
      )}
    </section>
  );
}
