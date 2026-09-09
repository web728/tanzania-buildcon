import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";

export const metadata: Metadata = {
  title: "Who Should Visit | Tanzania Buildcon 2027",
  description:
    "Meet the people who buy, build, specify, and source — architects, civil contractors, developers, and wholesale importers at Tanzania Buildcon International Expo 2027.",
  alternates: { canonical: "/who-should-visit" },
};

export default function WhoShouldVisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="The People Who Buy, Build, Specify & Source"
        intro="Engineered specifically for professionals responsible for procurement, structural design, commercial distribution, and project specification across East Africa."
        image={{
          src: "/images/sectors/architects-engineers.jpg",
          alt: "Engineers and trade visitors at building expo",
        }}
      />

      <WhoShouldVisitClientView />
    </main>
  );
}