export type EvidenceLevel = "High" | "Moderate" | "Low" | "Anecdotal";
export type SourceType = "reddit" | "x" | "study" | "forum";

export interface Protocol {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  category: string;
  evidenceLevel: EvidenceLevel;
  reportCount: number;
  summary: string;
  improvementRate: number;
  tags: string[];
}

export interface FeedItem {
  id: string;
  source: SourceType;
  author: string;
  text: string;
  engagementCount: number;
  timestamp: string;
  url: string;
}

export interface Study {
  id: string;
  slug: string;
  title: string;
  journal: string;
  year: number;
  topic: string;
  evidenceLevel: EvidenceLevel;
  summary: string;
  url: string;
  isNew: boolean;
}

export interface MemberStory {
  id: string;
  author: string;
  duration: string;
  protocol: string;
  improvement: string;
  excerpt: string;
  isFeatured: boolean;
}

export interface TriggerData {
  name: string;
  percentage: number;
}

export interface HeatmapDay {
  date: string;
  intensity: 0 | 1 | 2 | 3 | 4;
}
