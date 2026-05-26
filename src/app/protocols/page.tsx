"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { ProtocolCard } from "@/components/shared/ProtocolCard";
import { PROTOCOLS } from "@/lib/mock-data";
import type { EvidenceLevel } from "@/lib/types";

const CATEGORIES = ["All", "Medication", "Diet", "Supplements", "Physical", "Lifestyle", "Mind-Body"];
const EVIDENCE_LEVELS: ("All" | EvidenceLevel)[] = ["All", "High", "Moderate", "Low", "Anecdotal"];

export default function ProtocolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [evidence, setEvidence] = useState<"All" | EvidenceLevel>("All");

  const filtered = PROTOCOLS.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCategory = category === "All" || p.category === category;
    const matchEvidence = evidence === "All" || p.evidenceLevel === evidence;
    return matchSearch && matchCategory && matchEvidence;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Protocol Directory
        </p>
        <h1 className="font-display text-h1 text-ink mb-3">
          Community-tested protocols
        </h1>
        <p className="text-body text-ink-2 max-w-xl">
          {PROTOCOLS.length} protocols sourced from community reports and cross-referenced with clinical evidence.
        </p>
      </div>

      <div className="bg-surface rounded-card p-5 border border-ink/8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              type="text"
              placeholder="Search protocols..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All categories" : c}
                </option>
              ))}
            </select>

            <select
              value={evidence}
              onChange={(e) => setEvidence(e.target.value as "All" | EvidenceLevel)}
              className="px-3 py-2.5 bg-background border border-ink/15 rounded-lg text-sm text-ink focus:outline-none focus:border-primary/50 cursor-pointer"
            >
              {EVIDENCE_LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l === "All" ? "All evidence levels" : `${l} evidence`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-ink-3">
          <p className="text-h3 font-display mb-2">No protocols found</p>
          <p className="text-meta">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
