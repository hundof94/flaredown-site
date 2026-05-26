"use client";

import { cn } from "@/lib/utils";
import type { HeatmapDay } from "@/lib/types";

const INTENSITY_STYLES = [
  "bg-ink/6",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/65",
  "bg-primary",
];

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function FlareHeatmap({ data }: { data: HeatmapDay[] }) {
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div>
      <div className="flex gap-1 mb-1">
        {DAYS.map((d, i) => (
          <span key={i} className="text-[10px] text-ink-3 w-5 text-center">
            {d}
          </span>
        ))}
      </div>
      <div className="flex gap-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: intensity ${day.intensity}`}
                className={cn(
                  "w-5 h-5 rounded-sm",
                  INTENSITY_STYLES[day.intensity]
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] text-ink-3">Less</span>
        {INTENSITY_STYLES.map((style, i) => (
          <div key={i} className={cn("w-3 h-3 rounded-sm", style)} />
        ))}
        <span className="text-[10px] text-ink-3">More flares</span>
      </div>
    </div>
  );
}
