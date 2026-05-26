import { StatCard } from "@/components/shared/StatCard";
import { SITE_STATS } from "@/lib/mock-data";

export function StatsStrip() {
  return (
    <section className="bg-ink py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard
            value={SITE_STATS.members}
            label="Members"
            className="[&>div:first-child]:text-primary"
          />
          <StatCard
            value={`${(SITE_STATS.postsAnalyzed / 1000).toFixed(0)}k`}
            label="Posts analyzed"
            className="[&>div:first-child]:text-primary"
          />
          <StatCard
            value={SITE_STATS.protocols}
            label="Validated protocols"
            className="[&>div:first-child]:text-primary"
          />
          <StatCard
            value={SITE_STATS.improvementRate}
            suffix="%"
            label="Report improvement"
            className="[&>div:first-child]:text-primary"
          />
        </div>
      </div>
    </section>
  );
}
