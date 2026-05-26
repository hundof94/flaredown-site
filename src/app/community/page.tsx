"use client";

import { useState } from "react";
import { TrendingUp, Quote } from "lucide-react";
import { MEMBER_STORIES } from "@/lib/mock-data";

const FILTERS = ["All", "Diet", "Medication", "Lifestyle", "Supplements", "Mind-Body"];

export default function CommunityPage() {
  const [filter, setFilter] = useState("All");
  const featured = MEMBER_STORIES.find((s) => s.isFeatured)!;
  const rest = MEMBER_STORIES.filter((s) => !s.isFeatured);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Community
        </p>
        <h1 className="font-display text-h1 text-ink mb-3">Community wins</h1>
        <p className="text-body text-ink-2 max-w-xl">
          Real member stories, unfiltered. What worked, how long it took, and what changed.
        </p>
      </div>

      {/* Featured story */}
      <div className="bg-primary rounded-card p-8 mb-10 text-white relative overflow-hidden">
        <div className="absolute top-4 right-6 opacity-10">
          <Quote size={80} />
        </div>
        <div className="relative">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-pill mb-4 uppercase tracking-wide">
            Featured story
          </span>
          <blockquote className="font-display text-h3 text-white leading-relaxed mb-6 max-w-2xl">
            &ldquo;{featured.excerpt}&rdquo;
          </blockquote>
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <div className="font-bold text-white">{featured.author}</div>
              <div className="text-white/70 text-sm">{featured.duration} on {featured.protocol}</div>
            </div>
            <div className="flex items-center gap-2 bg-white/15 px-4 py-2 rounded-pill">
              <TrendingUp size={16} />
              <span className="font-bold text-sm">{featured.improvement}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-pill text-sm font-medium transition-colors ${
              filter === f
                ? "bg-primary text-white"
                : "bg-surface text-ink-2 border border-ink/15 hover:border-primary/30 hover:text-primary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Story grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((story) => (
          <div
            key={story.id}
            className="bg-surface rounded-card p-6 border border-ink/8 hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {story.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm text-ink">{story.author}</div>
                <div className="text-xs text-ink-3">{story.duration}</div>
              </div>
            </div>
            <p className="text-sm text-ink-2 leading-relaxed mb-4 italic">&ldquo;{story.excerpt}&rdquo;</p>
            <div className="border-t border-ink/8 pt-3">
              <div className="text-xs text-ink-3 mb-1">Protocol</div>
              <div className="text-sm font-semibold text-ink">{story.protocol}</div>
              <div className="flex items-center gap-1.5 mt-2 text-secondary">
                <TrendingUp size={13} />
                <span className="text-xs font-semibold">{story.improvement}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-surface rounded-card p-8 border border-ink/8 text-center">
        <h3 className="font-display text-h3 text-ink mb-2">Share your story</h3>
        <p className="text-body text-ink-2 mb-6 max-w-md mx-auto">
          Your experience could help someone else find relief. All stories are reviewed before publishing.
        </p>
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors">
          Submit your story
        </button>
      </div>
    </div>
  );
}
