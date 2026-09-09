import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhyTanzaniaClientView } from "@/components/about/WhyTanzaniaClientView";

export const metadata: Metadata = {
  title: "Why Tanzania | Market Opportunity & Growth Overview",
  description:
    "Explore Tanzania's building and construction market growth, infrastructure projects, and Dar es Salaam's trade dominance driving demand at Tanzania Buildcon 2027.",
  alternates: { canonical: "/why-tanzania" },
};

export default function WhyTanzaniaPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Tanzania — A Construction Market on the Move"
        intro="Sustained economic expansion, multi-billion-dollar transportation infrastructure, and surging demand for building materials and machinery across East Africa."
        image={{
          src: "/images/home/skyline-construction.jpg",
          alt: "Dar es Salaam Skyline and Infrastructure",
        }}
      />

      <WhyTanzaniaClientView />
    </main>
  );
}