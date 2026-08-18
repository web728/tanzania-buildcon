import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Venue",
  description: `${event.venue.fullLocation} hosts this construction exhibition Dar es Salaam and building expo Dar es Salaam — the venue for ${event.name}, ${event.dates.display}.`,
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  return (
    <>
      <PageHero
        title={`${event.venue.name}, ${event.venue.city}`}
        intro={`${event.dates.display} · ${event.format} · ${event.industry}`}
        image={{ src: "/images/venue/building-exterior.jpg", alt: "Modern commercial building exterior" }}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">
                {event.venue.name}
              </h2>
              <p className="mt-5 leading-relaxed text-brand-body">
                {event.name} will take place at {event.venue.name}, an established exhibition
                and events venue located in the heart of {event.venue.city}.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-brand-body">Dates</dt>
                  <dd className="mt-1 text-base font-bold text-brand-dark">{event.dates.display}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-brand-body">Format</dt>
                  <dd className="mt-1 text-base font-bold text-brand-dark">{event.format}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-brand-body">City</dt>
                  <dd className="mt-1 text-base font-bold text-brand-dark">{event.venue.city}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wide text-brand-body">Industry</dt>
                  <dd className="mt-1 text-base font-bold text-brand-dark">{event.industry}</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/plan-your-visit" variant="ghost">
                  Plan Your Visit
                </Button>
                <Button href={event.venue.mapLinkUrl} variant="ghost" external>
                  Open in Google Maps
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-brand-border">
              <iframe
                title={`Map of ${event.venue.name}, ${event.venue.city}`}
                src={event.venue.mapEmbedUrl}
                className="h-[440px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
