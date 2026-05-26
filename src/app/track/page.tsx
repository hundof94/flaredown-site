"use client";

import { useState } from "react";
import { Plus, Activity, BarChart2 } from "lucide-react";
import { FlareHeatmap } from "@/components/home/FlareHeatmap";
import { TriggerBars } from "@/components/home/TriggerBars";
import { generateHeatmapData } from "@/lib/mock-data";
import Link from "next/link";

const SYMPTOMS = ["Joint pain", "Swelling", "Stiffness", "Fatigue", "Skin plaques", "Brain fog"];
const TRIGGER_OPTIONS = ["Stress", "Poor sleep", "Nightshades", "Alcohol", "Seed oils", "Sugar", "Gluten", "Dairy", "Exercise", "Weather change"];

export default function TrackPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState(3);
  const [submitted, setSubmitted] = useState(false);

  const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  const heatmapData = generateHeatmapData();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Personal Tracker
        </p>
        <h1 className="font-display text-h1 text-ink mb-3">Track your triggers</h1>
        <p className="text-body text-ink-2 max-w-xl">
          Log daily symptoms and potential triggers. Over time, patterns emerge that help you take control.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          {submitted ? (
            <div className="bg-secondary/8 border border-secondary/20 rounded-card p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center mx-auto mb-4">
                <Activity size={24} className="text-secondary" />
              </div>
              <h3 className="font-display text-h3 text-ink mb-2">Logged!</h3>
              <p className="text-sm text-ink-2 mb-4">Today&apos;s entry saved. Keep logging daily for patterns.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-sm text-primary font-semibold hover:underline"
              >
                Log another entry
              </button>
            </div>
          ) : (
            <div className="bg-surface rounded-card p-6 border border-ink/8">
              <h2 className="font-display text-h3 text-ink mb-5 flex items-center gap-2">
                <Plus size={18} className="text-primary" /> Today&apos;s log
              </h2>

              <div className="mb-5">
                <label className="text-sm font-semibold text-ink-2 block mb-2">
                  Overall pain level
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={painLevel}
                    onChange={(e) => setPainLevel(Number(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <span className="font-bold text-lg text-primary w-6 text-center">{painLevel}</span>
                </div>
                <div className="flex justify-between text-xs text-ink-3 mt-1">
                  <span>No pain</span><span>Severe</span>
                </div>
              </div>

              <div className="mb-5">
                <label className="text-sm font-semibold text-ink-2 block mb-2">Symptoms today</label>
                <div className="flex flex-wrap gap-2">
                  {SYMPTOMS.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleItem(s, selectedSymptoms, setSelectedSymptoms)}
                      className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-colors ${
                        selectedSymptoms.includes(s)
                          ? "bg-primary text-white"
                          : "bg-background border border-ink/15 text-ink-2 hover:border-primary/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-semibold text-ink-2 block mb-2">Potential triggers</label>
                <div className="flex flex-wrap gap-2">
                  {TRIGGER_OPTIONS.map((t) => (
                    <button
                      key={t}
                      onClick={() => toggleItem(t, selectedTriggers, setSelectedTriggers)}
                      className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-colors ${
                        selectedTriggers.includes(t)
                          ? "bg-secondary text-white"
                          : "bg-background border border-ink/15 text-ink-2 hover:border-secondary/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSubmitted(true)}
                className="w-full py-3 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors"
              >
                Save today&apos;s log
              </button>
            </div>
          )}

          <div className="mt-4 bg-surface rounded-card p-4 border border-ink/8 text-center">
            <p className="text-xs text-ink-3 mb-2">Want full tracking & insights?</p>
            <Link
              href="/signup"
              className="text-sm text-primary font-semibold hover:underline"
            >
              Create a free account →
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-card p-6 border border-ink/8">
            <h3 className="font-display text-h3 text-ink mb-2 flex items-center gap-2">
              <BarChart2 size={18} className="text-primary" /> Your flare history
            </h3>
            <p className="text-xs text-ink-3 mb-4">Past 90 days (demo data)</p>
            <div className="overflow-x-auto">
              <FlareHeatmap data={heatmapData} />
            </div>
          </div>

          <div className="bg-surface rounded-card p-6 border border-ink/8">
            <h3 className="font-display text-h3 text-ink mb-2">Your top triggers</h3>
            <p className="text-xs text-ink-3 mb-4">Community averages shown — log for 4 weeks to see your personal data</p>
            <TriggerBars />
          </div>

          <div className="bg-ink/4 rounded-card p-5 border border-ink/8">
            <h4 className="font-semibold text-ink mb-1">Correlation insight</h4>
            <p className="text-sm text-ink-2">
              Members who logged poor sleep within 24 hours had <strong>2.3× more joint pain</strong> the following day. Log consistently to find your personal correlations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
