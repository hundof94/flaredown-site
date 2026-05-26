import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

const ARTICLES = [
  {
    slug: "ldntherapy-complete-guide",
    category: "Medication",
    title: "The Complete Guide to Low-Dose Naltrexone for Psoriatic Arthritis",
    excerpt: "How an off-label addiction treatment became one of the most discussed PsA interventions in patient communities — and what the research actually says.",
    readTime: "18 min",
    isFeatured: true,
  },
  {
    slug: "nightshade-elimination",
    category: "Diet",
    title: "Nightshade Elimination: The Evidence and the Controversy",
    excerpt: "The community swears by it. Most doctors dismiss it. We dug into 40 studies and 2,000 member reports.",
    readTime: "12 min",
    isFeatured: false,
  },
  {
    slug: "sleep-and-inflammation",
    category: "Lifestyle",
    title: "Why Sleep is the Most Underrated Intervention for PsA",
    excerpt: "Sleep fragmentation raises TNF-α by 40%. Here's exactly how to fix it.",
    readTime: "9 min",
    isFeatured: false,
  },
  {
    slug: "gut-microbiome-psa",
    category: "Research",
    title: "Your Gut Microbiome May Be Running Your PsA",
    excerpt: "New sequencing data shows consistent microbial signatures in PsA patients — and what this means for treatment.",
    readTime: "15 min",
    isFeatured: false,
  },
];

export function DeepDivesSection() {
  const featured = ARTICLES.find((a) => a.isFeatured)!;
  const rest = ARTICLES.filter((a) => !a.isFeatured);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-ink/8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Deep Dives
          </p>
          <h2 className="font-display text-h2 text-ink">Long-form research</h2>
        </div>
        <Link
          href="/learn"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
        >
          All articles <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Link
          href={`/learn/${featured.slug}`}
          className="group lg:col-span-2 bg-surface rounded-card p-8 border border-ink/8 hover:border-primary/30 hover:shadow-md transition-all duration-200 block"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {featured.category}
          </span>
          <h3 className="font-display text-h2 text-ink mt-2 mb-3 group-hover:text-primary transition-colors">
            {featured.title}
          </h3>
          <p className="text-body text-ink-2 leading-relaxed mb-6">{featured.excerpt}</p>
          <div className="flex items-center gap-2 text-ink-3 text-sm">
            <Clock size={14} />
            <span>{featured.readTime} read</span>
          </div>
        </Link>

        <div className="flex flex-col gap-4">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="group bg-surface rounded-card p-5 border border-ink/8 hover:border-primary/30 hover:shadow-sm transition-all duration-200 block flex-1"
            >
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                {article.category}
              </span>
              <h4 className="font-display text-base text-ink mt-1 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h4>
              <div className="flex items-center gap-1.5 text-ink-3 text-xs mt-auto">
                <Clock size={12} />
                <span>{article.readTime} read</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
