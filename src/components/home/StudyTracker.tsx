import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StudyRow } from "@/components/shared/StudyRow";
import { STUDIES } from "@/lib/mock-data";

export function StudyTracker() {
  const recent = STUDIES.slice(0, 3);

  return (
    <section className="bg-ink py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              Research Tracker
            </p>
            <h2 className="font-display text-h2 text-white">
              Latest studies
            </h2>
            <p className="text-body text-white/60 mt-2 max-w-xl">
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

        <div className="bg-white/5 rounded-card p-6 border border-white/10">
          {recent.map((study) => (
            <StudyRow
              key={study.id}
              study={study}
              className="[&_h4]:text-white [&_.text-ink-2]:text-white/70 [&_.text-ink-3]:text-white/50 border-white/10"
            />
          ))}
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
