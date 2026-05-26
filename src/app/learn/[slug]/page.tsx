import { ArrowLeft, Clock, Users } from "lucide-react";
import Link from "next/link";

const ARTICLES: Record<string, {
  category: string;
  title: string;
  readTime: string;
  reportCount: number;
  sections: { heading: string; content: string }[];
}> = {
  "ldntherapy-complete-guide": {
    category: "Medication",
    title: "The Complete Guide to Low-Dose Naltrexone for Psoriatic Arthritis",
    readTime: "18 min",
    reportCount: 847,
    sections: [
      {
        heading: "What is Low-Dose Naltrexone?",
        content: "Naltrexone is an FDA-approved opioid antagonist used at 50mg to treat opioid and alcohol dependence. At dramatically lower doses — typically 1.5mg to 4.5mg — it has an entirely different mechanism that appears to modulate the immune system. This off-label application has attracted significant interest in autoimmune conditions.",
      },
      {
        heading: "The proposed mechanism",
        content: "At low doses, naltrexone briefly blocks opioid receptors (for about 4–6 hours), which triggers a rebound increase in endorphin production. Crucially, it also appears to act directly on glial cells — the immune cells of the central nervous system — reducing their production of pro-inflammatory cytokines including TNF-α and IL-6, which are central to PsA pathology.",
      },
      {
        heading: "What the evidence says",
        content: "Formal RCT evidence for LDN in PsA specifically is limited — most trials have focused on Crohn's disease, fibromyalgia, and multiple sclerosis. A 2018 pilot study showed significant reduction in pain scores in autoimmune arthritis. Community evidence is substantial: in our survey of 847 members who tried LDN, 68% reported meaningful improvement in joint symptoms after 8–12 weeks.",
      },
      {
        heading: "Dosing protocol",
        content: "The standard approach is to start at 1.5mg nightly (taken 30–60 minutes before sleep) and slowly titrate up. Many people stay at 3mg; some go to 4.5mg. LDN must be obtained from a compounding pharmacy as it's not available in standard doses. The compounding cost is typically $30–60/month.",
      },
      {
        heading: "Side effects",
        content: "The most commonly reported side effect is vivid or unusual dreams, occurring in about 30% of users in the first 2–4 weeks. This typically resolves. Some users report initial sleep disruption; shifting the dose earlier in the evening can help. LDN is generally considered very safe, with no significant organ toxicity at these doses.",
      },
      {
        heading: "Contraindications",
        content: "LDN is absolutely contraindicated with full opioid medications. If you take any opioid pain medication, LDN is not an option. Inform your rheumatologist before starting, as it may interact with some immunosuppressants.",
      },
    ],
  },
  "nightshade-elimination": {
    category: "Diet",
    title: "Nightshade Elimination: The Evidence and the Controversy",
    readTime: "12 min",
    reportCount: 1243,
    sections: [
      {
        heading: "What are nightshades?",
        content: "Nightshades (Solanaceae) include tomatoes, peppers (all types), eggplant, potatoes (but not sweet potatoes), goji berries, and tobacco. They contain alkaloids — including solanine, capsaicin, and nicotine — that some researchers believe may influence gut permeability and immune activation.",
      },
      {
        heading: "The theoretical mechanism",
        content: "Nightshade alkaloids, particularly glycoalkaloids in potatoes and solanine in eggplant, may increase intestinal permeability ('leaky gut') in susceptible individuals. In theory, this allows bacterial products to cross the gut barrier and trigger systemic inflammation. However, the direct causal link to PsA specifically has not been demonstrated in controlled trials.",
      },
      {
        heading: "What 2,000 member reports say",
        content: "In our analysis of member logs, 58% reported nightshades as a trigger for symptom flares. However, this must be interpreted carefully — self-reported food-symptom associations are prone to confirmation bias. Of those who completed a strict 8-week elimination trial with detailed logging, 43% reported meaningful improvement in skin or joint symptoms.",
      },
      {
        heading: "Why most doctors dismiss it",
        content: "There are no large-scale, well-controlled RCTs testing nightshade elimination in PsA. Most rheumatologists rightly apply evidence-based medicine standards and cannot recommend an intervention without this level of proof. The dismissal is scientifically defensible — but may be premature given the emerging gut-inflammation-arthritis research.",
      },
      {
        heading: "How to do it properly",
        content: "A nightshade elimination trial requires strict adherence for a minimum of 8 weeks. Cross-contamination matters — many sauces, spice blends, and restaurant foods contain nightshades. Keep a daily symptom log. After 8 weeks, reintroduce one nightshade at a time, waiting 3 days between each reintroduction to identify your specific triggers.",
      },
    ],
  },
};

const FALLBACK = {
  category: "Research",
  title: "Deep Dive",
  readTime: "10 min",
  reportCount: 0,
  sections: [
    {
      heading: "Coming soon",
      content: "This deep dive article is being researched and written. Check back soon.",
    },
  ],
};

export default function LearnArticlePage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug] ?? { ...FALLBACK, title: params.slug.replace(/-/g, " ") };

  const TOC = article.sections.map((s) => ({
    id: s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    label: s.heading,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Back to deep dives
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <article className="lg:col-span-3">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {article.category}
          </span>
          <h1 className="font-display text-h1 text-ink mt-2 mb-4 leading-tight">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-ink-3 mb-8 pb-8 border-b border-ink/8">
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {article.readTime} read
            </span>
            {article.reportCount > 0 && (
              <span className="flex items-center gap-1.5">
                <Users size={14} /> {article.reportCount.toLocaleString()} community reports
              </span>
            )}
          </div>

          <div className="space-y-10">
            {article.sections.map((section) => {
              const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <div key={id} id={id}>
                  <h2 className="font-display text-h2 text-ink mb-4">{section.heading}</h2>
                  <p className="text-body text-ink-2 leading-relaxed">{section.content}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-primary/8 border border-primary/20 rounded-card">
            <h3 className="font-semibold text-ink mb-2">Track this protocol</h3>
            <p className="text-sm text-ink-2 mb-4">
              Log your experience with this approach and contribute to the community knowledge base.
            </p>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-pill text-sm hover:bg-primary-dark transition-colors"
            >
              Start tracking
            </Link>
          </div>
        </article>

        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-surface rounded-card p-5 border border-ink/8">
              <h4 className="text-xs font-bold text-ink-3 uppercase tracking-widest mb-4">
                Contents
              </h4>
              <nav className="space-y-2">
                {TOC.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-ink-2 hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-3"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
