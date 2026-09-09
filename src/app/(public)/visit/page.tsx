import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";

export const metadata: Metadata = {
  title: "Why Visit | Tanzania Buildcon 2027",
  description:
    "Source products directly from global manufacturers, compare building suppliers, and develop business partnerships at Tanzania Buildcon International Expo 2027 in Dar es Salaam.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Source Products. Meet Suppliers. Develop Business."
        intro="Three focused exhibition days connecting architects, contractors, developers, and trade buyers directly with leading international and regional building material manufacturers."
        image={{
          src: "/images/sectors/architects-engineers.jpg",
          alt: "Trade visitors and buyers sourcing building materials",
        }}
      />

      <VisitClientView />
    </main>
  );
}