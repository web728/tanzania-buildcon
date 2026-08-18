import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BenefitCard } from "@/components/ui/BenefitCard";
import { BrandMotif } from "@/components/brand/BrandMotif";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const BENEFITS = [
  "Meet New Buyers",
  "Find Distributors & Agents",
  "Generate Business Enquiries",
  "Introduce Your Brand",
  "Reach Contractors & Developers",
  "Meet Architects & Engineers",
  "Showcase Products & Technologies",
  "Strengthen Market Presence",
];

export function WhyExhibitSection() {
  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 text-white sm:py-28">
      <Image
        src="/images/sectors/crane-machinery.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-[0.12]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-brand-dark/60" />
      <div className="pointer-events-none absolute -left-32 top-0 h-full w-[520px] opacity-40">
        <BrandMotif variant="half" position="left" opacity={0.18} rotation={-6} className="h-full w-full" />
      </div>
      <Container className="relative z-10">
        <SectionHeading
          title="Take Your Business to the Tanzanian Construction Market"
          intro="Three focused business days to present your products directly to the contractors, developers, architects and buyers active across Tanzania's construction market."
          light
        />

        <ScrollReveal className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <BenefitCard key={b} title={b} light />
          ))}
        </ScrollReveal>

        <div className="mt-12">
          <Button href="/book-a-stand" size="lg">
            Book Your Stand
          </Button>
        </div>
      </Container>
    </section>
  );
}
