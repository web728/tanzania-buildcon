import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BenefitCard } from "@/components/ui/BenefitCard";
import { Button } from "@/components/ui/Button";
import {
  TargetIcon,
  HandshakeIcon,
  GrowthIcon,
  CompassIcon,
  BlueprintIcon,
  PresentationIcon,
  LinkIcon,
} from "@/components/icons/MiscIcons";

export const metadata: Metadata = {
  title: "Why Visit",
  description:
    "Meet construction suppliers Tanzania and building product suppliers Tanzania trust, source new products directly and develop business relationships at this construction trade fair Tanzania hosts in Dar es Salaam.",
  alternates: { canonical: "/visit" },
};

const BENEFITS = [
  { title: "Source New Products", icon: TargetIcon, body: "Discover building materials, machinery, equipment and technologies from participating suppliers." },
  { title: "Meet Manufacturers Directly", icon: HandshakeIcon, body: "Discuss products, specifications, pricing and supply requirements directly with manufacturers and authorised suppliers." },
  { title: "Compare Products & Suppliers", icon: CompassIcon, body: "Evaluate alternative products, technologies and suppliers efficiently in one location." },
  { title: "Discover New Brands", icon: PresentationIcon, body: "Identify manufacturers and products seeking business opportunities in the Tanzanian market." },
  { title: "Discuss Technical Requirements", icon: BlueprintIcon, body: "Get direct technical guidance from manufacturers and suppliers on your specific project needs." },
  { title: "Develop Business Relationships", icon: LinkIcon, body: "Build direct business contacts for current requirements and future projects." },
];

export default function VisitPage() {
  return (
    <>
      <PageHero title="Visit Tanzania Buildcon" intro={event.brandLines.visitor} />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading title="Source Products. Meet Suppliers. Develop Business." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <BenefitCard key={b.title} title={b.title} description={b.body} icon={b.icon} />
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={event.cta.registerVisit} size="lg">
              Register to Visit
            </Button>
            <Button href="/who-should-visit" variant="ghost" size="lg">
              <GrowthIcon className="h-4 w-4" />
              Who Should Visit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
