import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

export const metadata: Metadata = {
  title: "Exhibitor Services & Operational Manual | Tanzania Buildcon 2027",
  description:
    "Essential guidance for international and domestic exhibitors — visa assistance, official invitation letters, stand fabrication, freight logistics, and on-site support at Diamond Jubilee Hall, Dar es Salaam.",
  alternates: { canonical: "/exhibitor-services" },
};

export default function ExhibitorServicesPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Exhibitor Services & Logistics"
        intro="Comprehensive operational guidelines, technical specifications, and logistics support to ensure a seamless exhibition experience at Diamond Jubilee Hall, Dar es Salaam."
        image={{
          src: "/images/sectors/engineer-blueprint.jpg",
          alt: "Engineer reviewing technical exhibition specifications",
        }}
      />

      <ExhibitorServicesClientView />
    </main>
  );
}