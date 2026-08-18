import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SectorCard } from "@/components/ui/SectorCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { exhibitionSectors } from "@/data/exhibitionProfile";

export function ExhibitionProfileSection() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <SectionHeading
          title="Products. Machinery. Materials. Technologies."
          intro="Fifteen product sectors covering the full building and construction supply chain — from raw materials and structural systems to finishing, safety and energy solutions."
        />

        <ScrollReveal className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {exhibitionSectors.map((sector, index) => (
            <SectorCard key={sector.slug} name={sector.name} slug={sector.slug} index={index} />
          ))}
        </ScrollReveal>

        <div className="mt-12">
          <Button href="/exhibition-profile" variant="ghost">
            View Exhibition Profile
          </Button>
        </div>
      </Container>
    </section>
  );
}
