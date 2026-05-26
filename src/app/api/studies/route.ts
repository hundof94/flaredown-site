import { NextResponse } from "next/server";
import type { Study, EvidenceLevel } from "@/lib/types";

// Map publication types / MeSH terms to evidence levels
function inferEvidenceLevel(pubTypes: string[]): EvidenceLevel {
  const types = pubTypes.map((t) => t.toLowerCase());
  if (types.some((t) => t.includes("meta-analysis") || t.includes("systematic review")))
    return "High";
  if (types.some((t) => t.includes("randomized") || t.includes("clinical trial")))
    return "Moderate";
  if (types.some((t) => t.includes("cohort") || t.includes("observational")))
    return "Moderate";
  return "Low";
}

function slugify(title: string, pmid: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) +
    `-${pmid}`
  );
}

function inferTopic(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("diet") || t.includes("omega") || t.includes("nutrition") || t.includes("gut"))
    return "Diet";
  if (t.includes("vitamin") || t.includes("supplement") || t.includes("fish oil"))
    return "Supplements";
  if (t.includes("sleep") || t.includes("fatigue") || t.includes("exercise") || t.includes("lifestyle"))
    return "Lifestyle";
  if (t.includes("biologic") || t.includes("methotrexate") || t.includes("drug") || t.includes("treatment"))
    return "Medication";
  if (t.includes("microbiome") || t.includes("immune") || t.includes("cytokine"))
    return "Research";
  return "Research";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "";
  const year = searchParams.get("year") || "";
  const query = searchParams.get("q") || "";

  // Build PubMed search query
  let searchTerm = "psoriatic arthritis";
  if (topic && topic !== "All") searchTerm += ` AND ${topic.toLowerCase()}`;
  if (year && year !== "All") searchTerm += ` AND ${year}[pdat]`;
  if (query) searchTerm += ` AND ${query}`;

  try {
    const searchRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerm)}&sort=date&datetype=pdat&reldate=730&retmax=20&retmode=json`,
      { next: { revalidate: 3600 } }
    );

    if (!searchRes.ok) {
      return NextResponse.json({ error: "PubMed search failed" }, { status: 502 });
    }

    const searchData = await searchRes.json();
    const ids: string[] = searchData.esearchresult?.idlist ?? [];

    if (!ids.length) {
      return NextResponse.json([]);
    }

    const summaryRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`,
      { next: { revalidate: 3600 } }
    );

    if (!summaryRes.ok) {
      return NextResponse.json({ error: "PubMed summary failed" }, { status: 502 });
    }

    const summaryData = await summaryRes.json();
    const result = summaryData.result ?? {};

    const studies: Study[] = ids
      .filter((id) => result[id]?.title)
      .map((id) => {
        const s = result[id];
        const pubTypes: string[] = (s.pubtype ?? []).map((p: any) =>
          typeof p === "string" ? p : p.value ?? ""
        );
        const pubYear = parseInt((s.pubdate ?? "").split(" ")[0]) || new Date().getFullYear();
        const isThisYear = pubYear >= new Date().getFullYear() - 1;

        return {
          id,
          slug: slugify(s.title, id),
          title: s.title.replace(/\.$/, ""),
          journal: s.fulljournalname || s.source || "Medical Journal",
          year: pubYear,
          topic: inferTopic(s.title),
          evidenceLevel: inferEvidenceLevel(pubTypes),
          summary:
            s.authors?.length
              ? `${s.authors.slice(0, 3).map((a: any) => a.name).join(", ")}${s.authors.length > 3 ? " et al." : ""}`
              : "Authors not available",
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
          isNew: isThisYear,
        };
      });

    return NextResponse.json(studies, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (err) {
    console.error("Studies API error:", err);
    return NextResponse.json({ error: "Failed to fetch studies" }, { status: 500 });
  }
}
