import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";

export const metadata: Metadata = {
  title: "Who Should Exhibit | Tanzania Buildcon 2027",
  description:
    "Explore target exhibitor profiles — from international manufacturers and machinery suppliers to local Tanzanian producers and technology providers.",
  alternates: { canonical: "/who-should-exhibit" },
};

export default function WhoShouldExhibitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Who Should Exhibit at Tanzania Buildcon"
        intro="Connecting the full commercial value chain — international manufacturers, regional equipment suppliers, and Tanzanian producers meeting key buyers across East Africa."
        image={{
          src: "/images/sectors/crane-machinery.jpg",
          alt: "Industrial machinery and construction equipment display",
        }}
      />

      <WhoShouldExhibitClientView />
    </main>
  );
}