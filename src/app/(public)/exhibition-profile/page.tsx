import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/sections/ExhibitionProfileExplorer";

export const metadata: Metadata = {
  title: "Exhibition Profile",
  description:
    "Fifteen sectors covering building materials Tanzania and construction machinery Tanzania buyers source, plus hardware, steel, HVAC, plumbing and electrical Tanzania suppliers — the full building and construction supply chain in one exhibition profile.",
  alternates: { canonical: "/exhibition-profile" },
};

export default function ExhibitionProfilePage() {
  return (
    <>
      <PageHero
        title="Products. Machinery. Materials. Technologies."
        intro="Fifteen product sectors covering the full building and construction supply chain — from raw materials and structural systems to finishing, safety and energy solutions."
        image={{ src: "/images/sectors/crane-machinery.jpg", alt: "Construction crane against a clear sky" }}
      />

      <section className="bg-brand-light py-20 sm:py-24">
        <Container>
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </>
  );
}
