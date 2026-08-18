import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VisitorRegistrationForm } from "@/components/forms/VisitorRegistrationForm";

export const metadata: Metadata = {
  title: "Register to Visit",
  description: `Register for free trade access to ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/register-to-visit" },
};

export default function RegisterToVisitPage() {
  return (
    <>
      <PageHero title="Register to Visit" intro={event.brandLines.visitor} />

      <section className="bg-white py-20 sm:py-24">
        <Container className="max-w-3xl">
          <VisitorRegistrationForm />
        </Container>
      </section>
    </>
  );
}
