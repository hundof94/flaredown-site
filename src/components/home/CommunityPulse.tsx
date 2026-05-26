import { TriggerBars } from "./TriggerBars";
import { FlareHeatmap } from "./FlareHeatmap";
import { generateHeatmapData } from "@/lib/mock-data";

export function CommunityPulse() {
  const heatmapData = generateHeatmapData();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Community Data
        </p>
        <h2 className="font-display text-h2 text-ink">Community pulse</h2>
        <p className="text-body text-ink-2 mt-2 max-w-xl">
          Aggregate data from 14,000+ members tracking their triggers and flares in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-surface rounded-card p-6 border border-ink/8">
          <h3 className="font-display text-h3 text-ink mb-6">Top triggers reported</h3>
          <TriggerBars />
          <p className="text-xs text-ink-3 mt-4">
            Based on {(14287).toLocaleString()} member logs
          </p>
        </div>

        <div className="bg-surface rounded-card p-6 border border-ink/8">
          <h3 className="font-display text-h3 text-ink mb-6">Community flare activity</h3>
          <p className="text-meta text-ink-3 mb-4">Past 90 days — aggregate flare intensity</p>
          <div className="overflow-x-auto">
            <FlareHeatmap data={heatmapData} />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/8 pt-4">
            <div className="text-center">
              <div className="font-bold text-lg text-ink">12.4%</div>
              <div className="text-xs text-ink-3">High-flare days</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-ink">3.2</div>
              <div className="text-xs text-ink-3">Avg days/month</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-secondary">↓ 8%</div>
              <div className="text-xs text-ink-3">vs. last month</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
