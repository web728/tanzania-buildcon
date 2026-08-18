import type { Metadata } from "next";
import Image from "next/image";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Organisers",
  description: `${event.name} is jointly organised by ${event.organisers[0].name} and ${event.organisers[1].name}.`,
  alternates: { canonical: "/organisers" },
};

export default function OrganisersPage() {
  return (
    <>
      <PageHero
        title="Jointly Organised By"
        intro={`${event.name} is jointly organised by ${event.organisers[0].name} and ${event.organisers[1].name}.`}
      />

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2">
            {event.organisers.map((org) => (
              <div key={org.name} className="rounded-xl border border-brand-border bg-brand-light p-8">
                <div className="relative h-16 w-48">
                  <Image src={org.logo} alt={org.name} fill sizes="200px" className="object-contain object-left" />
                </div>
                <p className="mt-6 text-lg font-bold text-brand-dark">{org.name}</p>
                {org.url ? (
                  <a
                    href={org.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-brand-blue hover:underline"
                  >
                    Visit website
                  </a>
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-brand-body">
            {event.name} is developed and delivered jointly by {event.organisers[0].name} and{" "}
            {event.organisers[1].name}, bringing together international trade fair organisation
            with dedicated exhibition and trade services for the Tanzanian building and
            construction market.
          </p>
        </Container>
      </section>
    </>
  );
}
