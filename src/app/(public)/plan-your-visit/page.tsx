import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CompassIcon, BriefcaseIcon, TruckIcon, StampIcon } from "@/components/icons/MiscIcons";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description: `Dates, venue, travel and practical information for visiting ${event.name} in Dar es Salaam, Tanzania.`,
  alternates: { canonical: "/plan-your-visit" },
};

const FAQS = [
  {
    q: "Is there an entry fee for trade visitors?",
    a: "Trade entry policy and any applicable fees will be confirmed here ahead of the show. Registered visitors will receive full details by email.",
  },
  {
    q: "Do I need a visa to visit Tanzania?",
    a: "Visa requirements depend on your nationality. Please refer to the official Tanzania Immigration Department for current entry requirements before travelling.",
  },
  {
    q: "What are the exhibition opening hours?",
    a: "Daily opening hours will be published here once confirmed by the organisers.",
  },
  {
    q: "How do I get to Diamond Jubilee Hall?",
    a: "Transport and airport transfer guidance will be published here closer to the show.",
  },
];

export default function PlanYourVisitPage() {
  return (
    <>
      <PageHero
        title="Plan Your Visit"
        intro={`Everything you need to know before visiting ${event.name}.`}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-brand-border bg-brand-light p-6">
              <CompassIcon className="h-6 w-6 text-brand-blue" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-body">Dates</p>
              <p className="mt-1 text-base font-bold text-brand-dark">{event.dates.display}</p>
            </div>
            <div className="rounded-xl border border-brand-border bg-brand-light p-6">
              <BriefcaseIcon className="h-6 w-6 text-brand-blue" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-body">Venue</p>
              <p className="mt-1 text-base font-bold text-brand-dark">{event.venue.name}</p>
            </div>
            <div className="rounded-xl border border-brand-border bg-brand-light p-6">
              <TruckIcon className="h-6 w-6 text-brand-blue" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-body">City</p>
              <p className="mt-1 text-base font-bold text-brand-dark">{event.venue.city}, {event.venue.country}</p>
            </div>
            <div className="rounded-xl border border-brand-border bg-brand-light p-6">
              <StampIcon className="h-6 w-6 text-brand-blue" />
              <p className="mt-3 text-xs font-bold uppercase tracking-wide text-brand-body">Format</p>
              <p className="mt-1 text-base font-bold text-brand-dark">{event.format}</p>
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-xl border border-brand-border">
            <iframe
              title={`Map of ${event.venue.name}, ${event.venue.city}`}
              src={event.venue.mapEmbedUrl}
              className="h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Container>
      </section>

      <section className="bg-brand-light py-20 sm:py-24">
        <Container>
          <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">Visitor FAQ</h2>
          <div className="mt-8 flex flex-col divide-y divide-brand-border rounded-xl border border-brand-border bg-white">
            {FAQS.map((faq) => (
              <div key={faq.q} className="p-6">
                <p className="text-base font-bold text-brand-dark">{faq.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-brand-body">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Button href={event.cta.registerVisit} size="lg">
              Register to Visit
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
