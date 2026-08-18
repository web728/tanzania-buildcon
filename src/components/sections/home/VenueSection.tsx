import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionMotif } from "@/components/brand/SectionMotif";

export function VenueSection() {
  return (
    <section className="relative overflow-hidden bg-brand-light py-24 sm:py-28">
      <SectionMotif position="top-left" size="md" opacity={0.06} />
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.1] tracking-tight text-brand-dark">
              {event.venue.name}
            </h2>
            <p className="mt-3 text-base font-semibold text-brand-body">{event.dates.display}</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-body">
              {event.name} takes place at {event.venue.name}, an established exhibition and
              events venue in the heart of {event.venue.city} — Tanzania&apos;s principal
              commercial and trading centre.
            </p>
            <div className="mt-8">
              <Button href="/plan-your-visit" variant="ghost">
                Plan Your Visit
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-brand-border">
            <iframe
              title={`Map of ${event.venue.name}, ${event.venue.city}`}
              src={event.venue.mapEmbedUrl}
              className="h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
