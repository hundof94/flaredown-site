import { notFound } from "next/navigation";
import { ArrowLeft, Users, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { EvidenceBadge } from "@/components/shared/EvidenceBadge";
import { PROTOCOLS } from "@/lib/mock-data";

const PROTOCOL_DETAILS: Record<string, {
  steps: string[];
  cautions: string[];
  communityReports: { author: string; duration: string; text: string; upvotes: number }[];
}> = {
  "low-dose-naltrexone": {
    steps: [
      "Consult your doctor — LDN requires a prescription. Many GPs and integrative medicine doctors will prescribe it off-label.",
      "Start at 1.5mg nightly (compounding pharmacy required). Take 30–60 minutes before bed.",
      "After 2 weeks with no side effects, increase to 3mg. Maximum dose is typically 4.5mg.",
      "Give it 6–12 weeks for full effect. Many members report little change in weeks 1–4.",
      "Track symptoms weekly. Use the FlareDown tracker to log joint pain, stiffness, and skin changes.",
      "Do NOT take if you are on full opioid medications — LDN blocks opioid receptors.",
    ],
    cautions: [
      "Not compatible with full opioid medications",
      "Vivid dreams are common in the first 2–4 weeks",
      "Requires a compounding pharmacy — not available as a standard dispensed medication",
      "Always inform your rheumatologist",
    ],
    communityReports: [
      {
        author: "u/joint_freedom",
        duration: "8 months",
        text: "Morning stiffness went from 90 minutes to under 10. Took 8 weeks to kick in. Best decision I made alongside my biologic.",
        upvotes: 412,
      },
      {
        author: "psa_warrior_42",
        duration: "4 months",
        text: "Started 1.5mg, now at 3mg. Fatigue is dramatically better. Joint swelling down maybe 50%. Not a cure but a real tool.",
        upvotes: 287,
      },
      {
        author: "FightingFlares",
        duration: "14 months",
        text: "Tried it for 6 months, saw modest improvement. Combined with diet changes, the effect multiplied. Hard to separate the two.",
        upvotes: 198,
      },
    ],
  },
  "anti-inflammatory-diet": {
    steps: [
      "Eliminate nightshades (tomatoes, peppers, eggplant, potatoes) for a minimum 8-week trial.",
      "Remove gluten entirely — cross-contamination matters. Read labels carefully.",
      "Eliminate seed oils (canola, sunflower, corn, soybean). Use olive oil, coconut oil, or butter instead.",
      "Increase omega-3 intake: wild-caught salmon 3x/week, or 2–3g EPA+DHA from fish oil daily.",
      "Add anti-inflammatory foods: turmeric (with black pepper), ginger, leafy greens.",
      "Reintroduce eliminated foods one at a time after 8 weeks to identify specific triggers.",
    ],
    cautions: [
      "This is an elimination protocol — consult a dietitian if you have other dietary restrictions",
      "8 weeks minimum before judging results; gut microbiome changes take time",
      "Track carefully — without a log, it's hard to connect foods to symptom changes",
    ],
    communityReports: [
      {
        author: "NightshadeExperiment",
        duration: "6 months",
        text: "Gave up on nightshades after 3 weeks before — didn't see results. Tried again for 10 weeks. Week 8 something shifted. Skin 60% better.",
        upvotes: 531,
      },
      {
        author: "CleanEaterPsA",
        duration: "10 months",
        text: "The seed oil elimination was the surprising one for me. Bigger impact than nightshades. Joints less angry.",
        upvotes: 342,
      },
    ],
  },
};

export function generateStaticParams() {
  return PROTOCOLS.map((p) => ({ slug: p.slug }));
}

export default function ProtocolDetailPage({ params }: { params: { slug: string } }) {
  const protocol = PROTOCOLS.find((p) => p.slug === params.slug);
  if (!protocol) notFound();

  const details = PROTOCOL_DETAILS[params.slug] ?? {
    steps: [
      "Research this protocol thoroughly with your healthcare provider.",
      "Start with the lowest effective dose or intensity.",
      "Track your symptoms consistently using the FlareDown tracker.",
      "Give the protocol at least 6–8 weeks before evaluating results.",
    ],
    cautions: ["Always consult your rheumatologist before starting any new protocol."],
    communityReports: [],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
      <Link
        href="/protocols"
        className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Back to protocols
      </Link>

      <div className="flex items-start gap-4 mb-3">
        <span className="text-5xl">{protocol.emoji}</span>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-ink-3 uppercase tracking-wide">
              {protocol.category}
            </span>
            <EvidenceBadge level={protocol.evidenceLevel} />
          </div>
          <h1 className="font-display text-h1 text-ink leading-tight">{protocol.title}</h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-ink-3 mb-8">
        <span className="flex items-center gap-1.5">
          <Users size={14} /> {protocol.reportCount.toLocaleString()} community reports
        </span>
        <span className="flex items-center gap-1.5">
          <TrendingUp size={14} /> {protocol.improvementRate}% report improvement
        </span>
      </div>

      {/* Quick summary */}
      <div className="bg-primary/8 border border-primary/20 rounded-card p-6 mb-10">
        <h2 className="font-semibold text-ink mb-2">Quick summary</h2>
        <p className="text-body text-ink-2">{protocol.summary}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {protocol.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-pill"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="mb-10">
        <h2 className="font-display text-h2 text-ink mb-6">Step-by-step</h2>
        <ol className="space-y-4">
          {details.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-body text-ink-2 pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Cautions */}
      {details.cautions.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-card p-5 mb-10">
          <h3 className="font-semibold text-amber-400 mb-3">Important cautions</h3>
          <ul className="space-y-2">
            {details.cautions.map((caution, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-300/80">
                <CheckCircle2 size={15} className="flex-shrink-0 mt-0.5" />
                {caution}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Community reports */}
      {details.communityReports.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-h2 text-ink mb-6">Community reports</h2>
          <div className="space-y-4">
            {details.communityReports.map((report, i) => (
              <div key={i} className="bg-surface rounded-card p-5 border border-ink/8">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm text-ink">{report.author}</span>
                  <span className="text-xs text-ink-3">{report.duration}</span>
                </div>
                <p className="text-sm text-ink-2 leading-relaxed">{report.text}</p>
                <div className="mt-3 flex items-center gap-1.5 text-ink-3 text-xs">
                  <TrendingUp size={12} />
                  <span>{report.upvotes.toLocaleString()} found helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit form teaser */}
      <div className="bg-surface rounded-card p-8 border border-ink/8 text-center">
        <h3 className="font-display text-h3 text-ink mb-2">Tried this protocol?</h3>
        <p className="text-body text-ink-2 mb-6">
          Share your experience to help others find what works.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-pill hover:bg-primary-dark transition-colors"
        >
          Join & share your experience
        </Link>
      </div>
    </div>
  );
}
