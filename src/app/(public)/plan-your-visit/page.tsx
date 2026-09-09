import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PlanYourVisitClientView } from "@/components/visit/PlanYourVisitClientView";

export const metadata: Metadata = {
  title: "Plan Your Visit | Tanzania Buildcon 2027",
  description: `Essential travel, venue navigation, and visitor guidance for attending ${event.name} from ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/plan-your-visit" },
};

export default function PlanYourVisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Plan Your Visit to Dar es Salaam"
        intro="Practical visitor information, venue access, entry parameters, and travel essentials for Tanzania Buildcon International Expo 2027."
        image={{
          src: "/images/venue/building-exterior.jpg",
          alt: "Diamond Jubilee Hall, Dar es Salaam",
        }}
      />

      <PlanYourVisitClientView />
    </main>
  );
}