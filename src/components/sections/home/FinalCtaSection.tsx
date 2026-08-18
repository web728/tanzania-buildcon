import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandMotif } from "@/components/brand/BrandMotif";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden bg-brand-blue py-24 text-white sm:py-28">
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[480px] w-[480px]">
        <BrandMotif variant="half" position="right" opacity={0.2} rotation={4} className="h-full w-full" />
      </div>
      <Container className="relative z-10 text-center">
        <h2 className="mx-auto max-w-3xl text-[clamp(1.75rem,4.5vw,3rem)] font-extrabold leading-[1.1] tracking-tight">
          Build Your Next Business Opportunity in Tanzania
        </h2>
        <p className="mt-4 text-lg font-semibold">
          {event.dates.display} · {event.venue.fullLocation}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href={event.cta.bookStand} variant="outline" size="lg">
            Book a Stand
          </Button>
          <Button href={event.cta.registerVisit} variant="outline" size="lg">
            Register to Visit
          </Button>
        </div>
      </Container>
    </section>
  );
}
