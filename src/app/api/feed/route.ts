import { NextResponse } from "next/server";
import type { FeedItem, SourceType } from "@/lib/types";

// ─── helpers ──────────────────────────────────────────────────────────────────

function relativeTime(createdUtcSeconds: number): string {
  const diff = Date.now() / 1000 - createdUtcSeconds;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function pubmedDateLabel(pubdate: string): string {
  if (!pubdate) return "recently";
  const [year, month] = pubdate.split(" ");
  return month ? `${month} ${year}` : year;
}

// ─── Reddit ───────────────────────────────────────────────────────────────────

async function fetchReddit(): Promise<FeedItem[]> {
  const subreddits = ["PsoriaticArthritis", "psoriasis"];
  const items: FeedItem[] = [];

  for (const sub of subreddits) {
    try {
      const res = await fetch(
        `https://www.reddit.com/r/${sub}/hot.json?limit=25&raw_json=1`,
        {
          headers: {
            "User-Agent": "FlareDown/2.0 (health-research aggregator; contact@flaredown.health)",
          },
          next: { revalidate: 1800 }, // cache 30 min
        }
      );

      if (!res.ok) continue;
      const data = await res.json();
      interface RedditPost {
        id: string;
        author: string;
        is_self: boolean;
        selftext: string;
        score: number;
        created_utc: number;
        permalink: string;
      }
      const posts: { data: RedditPost }[] = data.data?.children ?? [];

      for (const { data: post } of posts) {
        // Only self-posts with meaningful text
        if (!post.is_self) continue;
        const text = (post.selftext ?? "").trim();
        if (text.length < 80 || text.startsWith("[deleted]") || text.startsWith("[removed]")) continue;
        if (post.score < 3) continue;

        items.push({
          id: `reddit-${post.id}`,
          source: "reddit" as SourceType,
          author: `u/${post.author}`,
          text: text.slice(0, 320).replace(/\n+/g, " ").trim(),
          engagementCount: post.score,
          timestamp: relativeTime(post.created_utc),
          url: `https://www.reddit.com${post.permalink}`,
        });
      }
    } catch (err) {
      console.error(`Reddit fetch error (r/${sub}):`, err);
    }
  }

  // Deduplicate and sort by score
  return items
    .sort((a, b) => b.engagementCount - a.engagementCount)
    .slice(0, 10);
}

// ─── PubMed ───────────────────────────────────────────────────────────────────

async function fetchPubMed(): Promise<FeedItem[]> {
  try {
    // Search last 90 days
    const searchRes = await fetch(
      "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=psoriatic+arthritis&sort=date&datetype=pdat&reldate=90&retmax=8&retmode=json",
      { next: { revalidate: 3600 } }
    );
    if (!searchRes.ok) return [];

    const searchData = await searchRes.json();
    const ids: string[] = searchData.esearchresult?.idlist ?? [];
    if (!ids.length) return [];

    const summaryRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(",")}&retmode=json`,
      { next: { revalidate: 3600 } }
    );
    if (!summaryRes.ok) return [];

    const summaryData = await summaryRes.json();
    const result = summaryData.result ?? {};

    return ids
      .filter((id) => result[id] && result[id].title)
      .map((id) => {
        const s = result[id];
        const journal: string = s.fulljournalname || s.source || "Medical Journal";
        const title: string = s.title.replace(/\.$/, "");
        const authors: string = (s.authors ?? [])
          .slice(0, 2)
          .map((a: { name?: string }) => a.name)
          .join(", ");
        const year = (s.pubdate ?? "").split(" ")[0];

        return {
          id: `pubmed-${id}`,
          source: "study" as SourceType,
          author: journal,
          text: `${title}${authors ? `. ${authors}` : ""}${year ? ` (${year})` : ""}`,
          engagementCount: 0,
          timestamp: pubmedDateLabel(s.pubdate),
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`,
        };
      })
      .slice(0, 5);
  } catch (err) {
    console.error("PubMed fetch error:", err);
    return [];
  }
}

// ─── X / Twitter ──────────────────────────────────────────────────────────────

async function fetchTwitter(): Promise<FeedItem[]> {
  const token = process.env.X_BEARER_TOKEN;
  if (!token) return []; // skip if no key configured

  try {
    const query = encodeURIComponent(
      "psoriatic arthritis -is:retweet lang:en -is:reply"
    );
    const res = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${query}&max_results=10&tweet.fields=created_at,public_metrics,author_id&expansions=author_id&user.fields=username,name`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: { revalidate: 1800 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();

    const users: Record<string, { username: string; name: string }> = {};
    for (const user of data.includes?.users ?? []) {
      users[user.id] = { username: user.username, name: user.name };
    }

    interface Tweet {
      id: string;
      text: string;
      author_id: string;
      created_at: string;
      public_metrics?: { like_count?: number; retweet_count?: number };
    }
    return (data.data ?? []).map((tweet: Tweet) => {
      const user = users[tweet.author_id] ?? { username: "unknown", name: "X user" };
      const createdAt = new Date(tweet.created_at).getTime() / 1000;
      return {
        id: `x-${tweet.id}`,
        source: "x" as SourceType,
        author: `@${user.username}`,
        text: tweet.text.replace(/https:\/\/t\.co\/\S+/g, "").trim(),
        engagementCount:
          (tweet.public_metrics?.like_count ?? 0) +
          (tweet.public_metrics?.retweet_count ?? 0),
        timestamp: relativeTime(createdAt),
        url: `https://x.com/${user.username}/status/${tweet.id}`,
      };
    });
  } catch (err) {
    console.error("X/Twitter fetch error:", err);
    return [];
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET() {
  const [redditResult, pubmedResult, twitterResult] = await Promise.allSettled([
    fetchReddit(),
    fetchPubMed(),
    fetchTwitter(),
  ]);

  const reddit = redditResult.status === "fulfilled" ? redditResult.value : [];
  const studies = pubmedResult.status === "fulfilled" ? pubmedResult.value : [];
  const twitter = twitterResult.status === "fulfilled" ? twitterResult.value : [];

  // Interleave sources: 2 reddit → 1 study → 1 twitter → repeat
  const feed: FeedItem[] = [];
  const ri = [...reddit];
  const si = [...studies];
  const ti = [...twitter];

  while (ri.length || si.length || ti.length) {
    if (ri.length) feed.push(ri.shift()!);
    if (ri.length) feed.push(ri.shift()!);
    if (si.length) feed.push(si.shift()!);
    if (ti.length) feed.push(ti.shift()!);
  }

  return NextResponse.json(feed, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
