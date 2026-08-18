import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { marketFacts, marketSources, opportunityCategories } from "@/data/marketFacts";

export const metadata: Metadata = {
  title: "Why Tanzania",
  description:
    "Tanzania infrastructure development, construction sector growth and Dar es Salaam's commercial importance — why the Tanzania construction market and Tanzania construction industry are the opportunity behind Tanzania Buildcon International Expo.",
  alternates: { canonical: "/why-tanzania" },
};

const DEVELOPMENT_AREAS = [
  {
    title: "Construction Growth",
    body: "Tanzania's construction activity recorded 6.5% growth in Q3 2025, supported by increased activity and local production of materials including cement, iron and steel.",
  },
  {
    title: "Road & Rail Development",
    body: "Tanzania Railways Corporation is developing the country's Standard Gauge Railway network, alongside continuing TANROADS-led road and infrastructure projects.",
  },
  {
    title: "Trade & Logistics",
    body: "Dar es Salaam Port handles approximately 95% of Tanzania's international trade, anchoring the country's import, export and distribution infrastructure.",
  },
  {
    title: "Urban & Industrial Development",
    body: "Ongoing residential, commercial and industrial development is generating consistent demand for building materials, machinery and construction technologies.",
  },
];

export default function WhyTanzaniaPage() {
  return (
    <>
      <PageHero
        title="Opportunity Driven by Development"
        intro="Sustained construction growth, expanding infrastructure investment and Dar es Salaam's position as Tanzania's principal commercial centre are creating consistent demand across the building and construction supply chain."
        image={{ src: "/images/home/skyline-construction.jpg", alt: "City skyline under construction" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading title="Tanzania — A Construction Market on the Move" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {marketFacts.map((fact) => (
              <StatCard key={fact.id} fact={fact} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <Container>
          <SectionHeading title="Tanzania's Principal Commercial Centre" />
          <p className="mt-6 max-w-3xl leading-relaxed text-brand-body">
            Dar es Salaam is Tanzania&apos;s principal commercial and trading centre and home to an
            extensive network of contractors, developers, importers, distributors, architects,
            engineers, consultants, industrial companies and professional buyers. Its established
            trade and logistics infrastructure makes the city a natural meeting point for
            companies supplying Tanzania&apos;s building and construction market.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {DEVELOPMENT_AREAS.map((area) => (
              <div key={area.title} className="rounded-xl border border-brand-border bg-white p-7">
                <h3 className="text-lg font-bold text-brand-dark">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-body">{area.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading title="Sectors Driving Demand" />
          <div className="mt-8 flex flex-wrap gap-3">
            {opportunityCategories.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-brand-border bg-brand-light px-4 py-2 text-sm font-medium text-brand-dark"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="mt-14 rounded-xl border border-brand-border bg-brand-light p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-body">
              Market Sources
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {marketSources.map((source) => (
                <li key={source.name} className="text-sm text-brand-body">
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 underline decoration-brand-border underline-offset-2 hover:text-brand-blue"
                    >
                      {source.name}
                    </a>
                  ) : (
                    source.name
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <Button href={event.cta.bookStand} size="lg">
              Book a Stand
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
