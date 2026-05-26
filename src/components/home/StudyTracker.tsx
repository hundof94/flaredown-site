"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";
import { StudyRow } from "@/components/shared/StudyRow";
import type { Study } from "@/lib/types";

function StudyRowSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 py-4 border-b border-ink/8 last:border-0 animate-pulse">
      <div className="sm:w-16 flex-shrink-0">
        <div className="h-4 w-10 bg-ink/10 rounded mx-auto" />
      </div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 w-3/4 bg-ink/10 rounded" />
        <div className="h-3 w-1/3 bg-ink/8 rounded" />
        <div className="h-3.5 w-full bg-ink/8 rounded" />
      </div>
      <div className="sm:w-32 flex-shrink-0">
        <div className="h-5 w-16 bg-ink/10 rounded-pill" />
      </div>
    </div>
  );
}

export function StudyTracker() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/studies", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Study[] = await res.json();
        setStudies(data.slice(0, 3));
      } catch (err) {
        console.error("Studies fetch error:", err);
        setError("Could not load studies.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="bg-surface-2 py-20 border-y border-ink/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Research Tracker
            </p>
            <h2 className="font-display text-h2 text-ink">
              Latest studies
            </h2>
            <p className="text-body text-ink-2 mt-2 max-w-xl">
              We monitor journals weekly and cross-reference findings with community reports.
            </p>
          </div>
          <Link
            href="/studies"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
          >
            All studies <ArrowRight size={14} />
          </Link>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-4">
            <AlertCircle size={13} />
            {error}
          </div>
        )}

        <div className="bg-surface rounded-card p-6 border border-ink/10">
          {loading ? (
            <>
              <StudyRowSkeleton />
              <StudyRowSkeleton />
              <StudyRowSkeleton />
            </>
          ) : studies.length > 0 ? (
            studies.map((study) => (
              <StudyRow key={study.id} study={study} />
            ))
          ) : (
            <p className="text-sm text-ink-3 text-center py-8">No studies found.</p>
          )}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/studies"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold"
          >
            View all studies <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
