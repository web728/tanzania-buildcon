import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";

export const metadata: Metadata = {
  title: "Why Exhibit | Tanzania Buildcon 2027",
  description:
    "Present products directly to contractors, developers, importers, and specifiers at Tanzania Buildcon International Expo 2027 at Diamond Jubilee Hall, Dar es Salaam.",
  alternates: { canonical: "/exhibit" },
};

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Take Your Business to the Tanzanian Construction Market"
        intro="Three focused business days connecting manufacturers, exporters, and suppliers with the key professionals responsible for buying, specifying, and distributing building products across East Africa."
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Engineer reviewing construction blueprints on site",
        }}
      />

      <ExhibitClientView />
    </main>
  );
}