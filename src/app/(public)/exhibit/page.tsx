import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BenefitCard } from "@/components/ui/BenefitCard";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Why Exhibit",
  description:
    "Exhibit at this construction expo Tanzania to meet new buyers and develop distribution — the business case for building materials exhibition Tanzania and construction machinery exhibition Tanzania participants entering the Tanzanian construction market.",
  alternates: { canonical: "/exhibit" },
};

const BENEFITS = [
  { title: "Find New Customers", body: "Present your products directly to companies involved in construction, projects, procurement and distribution." },
  { title: "Develop Distribution", body: "Meet potential importers, distributors, wholesalers, dealers and market representatives." },
  { title: "Meet Contractors", body: "Connect with building, civil, road and specialist contractors active across Tanzania." },
  { title: "Reach Developers", body: "Engage real estate, industrial and hospitality developers driving new construction projects." },
  { title: "Connect With Specifiers", body: "Reach architects, engineers and consultants who influence product selection." },
  { title: "Launch Products", body: "Demonstrate product quality, applications, equipment and technical capabilities face-to-face." },
  { title: "Build Market Awareness", body: "Introduce your company to an expanding construction-industry audience." },
  { title: "Develop Direct Relationships", body: "Meet existing customers while developing new distribution, sales and business relationships." },
];

const PARTICIPATION_OPTIONS = ["Shell Scheme", "Raw Space", "Group Participation", "International Participation"];

export default function ExhibitPage() {
  return (
    <>
      <PageHero
        title="Why Exhibit at Tanzania Buildcon?"
        intro="Tanzania Buildcon provides manufacturers, exporters and suppliers with three focused business days to present their products to professionals active across Tanzania's construction, distribution and project markets."
        image={{ src: "/images/sectors/engineer-blueprint.jpg", alt: "Engineer reviewing construction blueprints on site" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading title="Take Your Business to the Tanzanian Construction Market" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <BenefitCard key={b.title} title={b.title} description={b.body} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-dark py-20 text-white sm:py-24">
        <Container>
          <SectionHeading
            title="Your Three-Day Business Platform in Tanzania"
            light
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTICIPATION_OPTIONS.map((option) => (
              <div key={option} className="rounded-xl border border-white/15 bg-white/5 p-6">
                <p className="text-base font-bold">{option}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm text-white/70">
            Stand pricing and floor plan availability are confirmed directly with our exhibition
            sales team. Submit an enquiry and we will respond with full participation details.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={event.cta.bookStand} size="lg">
              Book Your Stand
            </Button>
            <Button href="/who-should-exhibit" variant="outline" size="lg">
              Who Should Exhibit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
