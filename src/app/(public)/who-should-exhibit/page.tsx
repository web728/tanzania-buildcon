import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { whoShouldExhibit } from "@/data/visitorProfile";

export const metadata: Metadata = {
  title: "Who Should Exhibit",
  description:
    "Manufacturers, exporters, importers and distributors of building materials, machinery and construction technologies relevant to Tanzania Buildcon International Expo.",
  alternates: { canonical: "/who-should-exhibit" },
};

export default function WhoShouldExhibitPage() {
  return (
    <>
      <PageHero
        title={`${event.shortName} is Relevant For`}
        intro="From international manufacturers to Tanzanian producers, distributors and technology providers — companies across the building and construction supply chain."
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {whoShouldExhibit.map((item) => (
              <div
                key={item}
                className="flex min-h-[88px] items-center rounded-xl border border-brand-border bg-brand-light px-5 py-4"
              >
                <span className="text-sm font-bold text-brand-dark">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={event.cta.bookStand} size="lg">
              Book Your Stand
            </Button>
            <Button href="/exhibition-profile" variant="ghost" size="lg">
              View Exhibition Profile
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
