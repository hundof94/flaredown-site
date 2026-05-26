import { HeroSection } from "@/components/home/HeroSection";
import { LiveFeed } from "@/components/home/LiveFeed";
import { StatsStrip } from "@/components/home/StatsStrip";
import { ProtocolsGrid } from "@/components/home/ProtocolsGrid";
import { DeepDivesSection } from "@/components/home/DeepDivesSection";
import { StudyTracker } from "@/components/home/StudyTracker";
import { CommunityPulse } from "@/components/home/CommunityPulse";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveFeed />
      <StatsStrip />
      <ProtocolsGrid />
      <DeepDivesSection />
      <StudyTracker />
      <CommunityPulse />
    </>
  );
}
