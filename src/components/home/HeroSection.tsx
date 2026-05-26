import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LiveDot } from "@/components/shared/LiveDot";

export function HeroSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-pill mb-4">
            <LiveDot />
            <span>14,287 members tracking symptoms globally</span>
          </div>
          <h1 className="font-display text-hero text-ink leading-tight text-balance">
            The most specific guide to taming Psoriatic Arthritis
          </h1>
          <p className="text-body text-ink-2 mt-3 max-w-xl">
            Community signal from Reddit, X, research papers, and forums — cross-referenced with clinical evidence.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 flex-shrink-0">
          <Link
            href="/protocols"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors text-sm shadow-sm"
          >
            Browse protocols <ArrowRight size={15} />
          </Link>
          <Link
            href="/track"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface text-ink font-semibold rounded-pill border border-ink/15 hover:border-primary/30 hover:text-primary transition-colors text-sm"
          >
            Track triggers
          </Link>
        </div>
      </div>
    </section>
  );
}
