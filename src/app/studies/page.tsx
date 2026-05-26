"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { StudyRow } from "@/components/shared/StudyRow";
import { STUDIES } from "@/lib/mock-data";
import type { EvidenceLevel } from "@/lib/types";

const TOPICS = ["All", "Diet", "Supplements", "Lifestyle", "Medication", "Research"];
const EVIDENCE_LEVELS: ("All" | EvidenceLevel)[] = ["All", "High", "Moderate", "Low"];
const YEARS = ["All", "2024", "2023", "2022", "2021"];

export default function StudiesPage() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [evidence, setEvidence] = useState<"All" | EvidenceLevel>("All");
  const [year, setYear] = useState("All");

  const filtered = STUDIES.filter((s) => {
    const matchSearch =
      !search ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.journal.toLowerCase().includes(search.toLowerCase()) ||
      s.summary.toLowerCase().includes(search.toLowerCase());
    const matchTopic = topic === "All" || s.topic === topic;
    const matchEvidence = evidence === "All" || s.evidenceLevel === evidence;
    const matchYear = year === "All" || s.year.toString() === year;
    return matchSearch && matchTopic && matchEvidence && matchYear;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Research Library
        </p>
        <h1 className="font-display text-h1 text-ink mb-3">Clinical studies</h1>
        <p className="text-body text-ink-2 max-w-xl">
          We monitor major journals weekly, tracking research relevant to Psoriatic Arthritis management.
        </p>
      </div>

      <div className="bg-surface rounded-card p-5 border border-ink/8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              type="text"
              placeholder="Search studies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All topics" : t}</option>
              ))}
            </select>
            <select
              value={evidence}
              onChange={(e) => setEvidence(e.target.value as "All" | EvidenceLevel)}
              className="px-3 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {EVIDENCE_LEVELS.map((l) => (
                <option key={l} value={l}>{l === "All" ? "All evidence" : `${l} evidence`}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="px-3 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y === "All" ? "All years" : y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-card border border-ink/8 px-6">
        {filtered.length > 0 ? (
          filtered.map((study) => (
            <StudyRow key={study.id} study={study} />
          ))
        ) : (
          <div className="text-center py-20 text-ink-3">
            <p className="text-h3 font-display mb-2">No studies found</p>
            <p className="text-meta">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <p className="text-xs text-ink-3 mt-4 text-center">
        Showing {filtered.length} of {STUDIES.length} studies · Updated weekly
      </p>
    </div>
  );
}
