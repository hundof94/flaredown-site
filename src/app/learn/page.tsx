import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

const ARTICLES = [
  {
    slug: "ldntherapy-complete-guide",
    category: "Medication",
    title: "The Complete Guide to Low-Dose Naltrexone for Psoriatic Arthritis",
    excerpt: "How an off-label addiction treatment became one of the most discussed PsA interventions — and what the research actually says.",
    readTime: "18 min",
    isFeatured: true,
  },
  {
    slug: "nightshade-elimination",
    category: "Diet",
    title: "Nightshade Elimination: The Evidence and the Controversy",
    excerpt: "The community swears by it. Most doctors dismiss it. We dug into 40 studies and 2,000 member reports to find the truth.",
    readTime: "12 min",
    isFeatured: false,
  },
  {
    slug: "sleep-and-inflammation",
    category: "Lifestyle",
    title: "Why Sleep is the Most Underrated Intervention for PsA",
    excerpt: "Sleep fragmentation raises TNF-α by 40%. Here's exactly what to do about it.",
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
  {
    slug: "vitamin-d-deep-dive",
    category: "Supplements",
    title: "Vitamin D3 Dosing for Autoimmune Arthritis: A Practical Guide",
    excerpt: "The standard 600 IU recommendation was built for bones, not immune function. What the immune research actually suggests.",
    readTime: "11 min",
    isFeatured: false,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Medication: "text-primary bg-primary/8",
  Diet: "text-secondary bg-secondary/8",
  Lifestyle: "text-amber-700 bg-amber-50",
  Research: "text-ink-2 bg-ink/6",
  Supplements: "text-purple-700 bg-purple-50",
};

export default function LearnPage() {
  const featured = ARTICLES.find((a) => a.isFeatured)!;
  const rest = ARTICLES.filter((a) => !a.isFeatured);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          Deep Dives
        </p>
        <h1 className="font-display text-h1 text-ink mb-3">Long-form research</h1>
        <p className="text-body text-ink-2 max-w-xl">
          Thorough, honest analysis of what works and why. No hype, no sponsored content.
        </p>
      </div>

      <Link
        href={`/learn/${featured.slug}`}
        className="group block bg-surface rounded-card p-8 border border-ink/8 hover:border-primary/30 hover:shadow-md transition-all mb-10"
      >
        <span
          className={`inline-block px-2.5 py-1 rounded-pill text-xs font-semibold mb-3 ${CATEGORY_COLORS[featured.category]}`}
        >
          {featured.category}
        </span>
        <h2 className="font-display text-h1 text-ink group-hover:text-primary transition-colors mb-3 max-w-3xl">
          {featured.title}
        </h2>
        <p className="text-body text-ink-2 mb-5 max-w-2xl">{featured.excerpt}</p>
        <div className="flex items-center gap-4 text-sm text-ink-3">
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {featured.readTime} read
          </span>
          <span className="flex items-center gap-1 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Read article <ArrowRight size={14} />
          </span>
        </div>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {rest.map((article) => (
          <Link
            key={article.slug}
            href={`/learn/${article.slug}`}
            className="group bg-surface rounded-card p-6 border border-ink/8 hover:border-primary/30 hover:shadow-sm transition-all block"
          >
            <span
              className={`inline-block px-2.5 py-1 rounded-pill text-xs font-semibold mb-3 ${CATEGORY_COLORS[article.category] ?? "text-ink-2 bg-ink/6"}`}
            >
              {article.category}
            </span>
            <h3 className="font-display text-h3 text-ink group-hover:text-primary transition-colors mb-2 leading-snug">
              {article.title}
            </h3>
            <p className="text-meta text-ink-2 leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-1.5 text-ink-3 text-xs">
              <Clock size={12} />
              <span>{article.readTime} read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
