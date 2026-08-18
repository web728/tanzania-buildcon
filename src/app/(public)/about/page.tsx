import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About the Expo",
  description: `About ${event.name} — a dedicated international B2B trade exhibition for the building and construction industry, ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/about" },
};

const VISION_POINTS = [
  "Quality exhibitors",
  "Relevant trade visitors",
  "International participation",
  "Strong Tanzanian business participation",
  "Professional organisation",
  "Market-driven content",
  "Consistent annual development",
];

const EVENT_FACTS: { label: string; value: string }[] = [
  { label: "Event", value: event.name },
  { label: "Dates", value: event.dates.display },
  { label: "Venue", value: event.venue.name },
  { label: "City", value: event.venue.city },
  { label: "Country", value: event.venue.country },
  { label: "Format", value: event.format },
  { label: "Industry", value: event.industry },
  { label: "Website", value: event.websiteDisplay },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Tanzania Buildcon International Expo"
        intro={event.brandLines.supporting}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            <p className="text-lg leading-relaxed text-brand-body">
              {event.name} is a dedicated international B2B trade exhibition for the building and
              construction industry. The event connects manufacturers, exporters and suppliers
              with contractors, developers, importers, distributors, architects, engineers,
              consultants, procurement professionals and other trade buyers.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-brand-body">
              Tanzania Buildcon is being developed as a long-term annual business platform where
              products meet markets, manufacturers meet buyers and companies build direct
              commercial relationships in Tanzania.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-dark">
                A Focused B2B Marketplace
              </h2>
              <p className="mt-4 leading-relaxed text-brand-body">
                To create a focused B2B marketplace connecting suppliers with the professionals
                responsible for purchasing, distribution, specification and construction.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-brand-dark">
                Building Tanzania&apos;s Construction Trade Platform
              </h2>
              <p className="mt-4 leading-relaxed text-brand-body">
                Tanzania Buildcon has been conceived with a long-term vision to develop into an
                important annual meeting platform for Tanzania&apos;s building and construction
                industry. The show will grow through:
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {VISION_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-brand-body">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-green" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <Container>
          <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">
            Event Facts
          </h2>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-brand-border bg-brand-border sm:grid-cols-2 lg:grid-cols-4">
            {EVENT_FACTS.map((fact) => (
              <div key={fact.label} className="bg-white p-6">
                <dt className="text-xs font-bold uppercase tracking-wide text-brand-body">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-base font-bold text-brand-dark">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/why-tanzania" variant="ghost">
              Why Tanzania
            </Button>
            <Button href="/organisers" variant="ghost">
              Organisers
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
