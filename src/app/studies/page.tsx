"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, AlertCircle } from "lucide-react";
import { StudyRow } from "@/components/shared/StudyRow";
import type { Study, EvidenceLevel } from "@/lib/types";

const TOPICS = ["All", "Diet", "Supplements", "Lifestyle", "Medication", "Research"];
const EVIDENCE_LEVELS: ("All" | EvidenceLevel)[] = ["All", "High", "Moderate", "Low"];
const YEARS = ["All", "2025", "2024", "2023", "2022"];

function StudyRowSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 py-4 border-b border-ink/8 last:border-0 animate-pulse">
      <div className="sm:w-16 flex-shrink-0">
        <div className="h-4 w-10 bg-ink/10 rounded mx-auto" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 w-3/4 bg-ink/10 rounded" />
        <div className="h-3 w-1/3 bg-ink/8 rounded" />
        <div className="h-3.5 w-5/6 bg-ink/8 rounded" />
      </div>
      <div className="sm:w-32 flex-shrink-0">
        <div className="h-5 w-16 bg-ink/10 rounded-pill" />
      </div>
    </div>
  );
}

export default function StudiesPage() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const [evidence, setEvidence] = useState<"All" | EvidenceLevel>("All");
  const [year, setYear] = useState("All");

  const fetchStudies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (topic !== "All") params.set("topic", topic);
      if (year !== "All") params.set("year", year);
      if (search.trim()) params.set("q", search.trim());

      const res = await fetch(`/api/studies?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Study[] = await res.json();
      setStudies(data);
    } catch (err) {
      console.error("Studies fetch error:", err);
      setError("Could not load studies. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [topic, year, search]);

  useEffect(() => {
    const t = setTimeout(() => fetchStudies(), search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchStudies, search]);

  // Client-side evidence filter (PubMed doesn't filter by this)
  const filtered =
    evidence === "All" ? studies : studies.filter((s) => s.evidenceLevel === evidence);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Research Library
        </p>
        <h1 className="font-display text-h1 text-ink mb-3">Clinical studies</h1>
        <p className="text-body text-ink-2 max-w-xl">
          Live from PubMed — tracking research relevant to Psoriatic Arthritis management.
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
              onChange={(e) => { setTopic(e.target.value); }}
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
              onChange={(e) => { setYear(e.target.value); }}
              className="px-3 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>{y === "All" ? "All years" : y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-4">
          <AlertCircle size={13} />
          {error}
        </div>
      )}

      <div className="bg-surface rounded-card border border-ink/8 px-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <StudyRowSkeleton key={i} />)
        ) : filtered.length > 0 ? (
          filtered.map((study) => (
            <StudyRow key={study.id} study={study} />
          ))
        ) : (
          <div className="text-center py-20 text-ink-3">
            <p className="text-h3 font-display mb-2">No studies found</p>
            <p className="text-meta">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {!loading && (
        <p className="text-xs text-ink-3 mt-4 text-center">
          Showing {filtered.length} {filtered.length !== studies.length ? `of ${studies.length} ` : ""}studies · Live from PubMed
        </p>
      )}
    </div>
  );
}
